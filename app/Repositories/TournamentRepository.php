<?php

namespace App\Repositories;

use App\Http\Resources\ClubResource;
use App\Model\Tournament;
use App\Repositories\Traits\BaseRepository;
use App\Repositories\Traits\PlayerStatsRepository;
use App\Repositories\Traits\PointTableRepository;
use Illuminate\Support\Facades\Validator;

class TournamentRepository
{

    use BaseRepository;
    use PointTableRepository;
    use PlayerStatsRepository;
    

    protected $model;

    public function __construct() {
        $this->model = new Tournament();
    }

    public function fixtureRepo(){
        return new FixtureRepository();
    }
    
    public function playerRepo(){
        return new PlayerRepository();
    }

    

    public function getTournament($ref,$with){
        
        $tournament = $this->model
                        ->where('id',$ref)
                        ->orWhere('slug',$ref)
                        ->with($with)
                        ->firstOrFail();

        if($tournament->type == 3){
            $tournament->groups = $this->getTournamentGroups($tournament->id);
        }
        
        return $tournament;

    }

    public function getFixtures($data){
        return $this->fixtureRepo()->getFixturesByTournament($data);
    }

    public function getSubmittedFixtures($request){

        $validatedData = Validator::make($request->all(),[
            'tournament_id' => ['required','integer'],
        ]);

        if($validatedData->fails()){
            abort(404,'Not Found.');
        }

        $fixtures = $this->model
                    ->findOrFail($validatedData['tournament_id'])
                    ->fixtures()
                    ->where('completed',2)
                    ->with('team1','team2')
                    ->get();


        return $fixtures;
    }

    public function createTournament($request){

        $request['type'] = $request['format'];

        unset($request['format']);

        $validatedData = $request->validate([
            'name' => ['required','regex:/^[a-zA-Z ]+$/','unique:tournaments,name,'],
            'slug'=>['required','regex:/^[a-z]+$/','alpha','unique:tournaments,slug'],
            'type'=>['required','min:1','max:3','numeric'],
            'leg'=>['required','min:1','max:2','numeric'],
            'rounds'=>['required','min:1','max:18','numeric'],
            'active'=>['required','min:0','max:1','numeric'],
        ]);

        $tournament = $this->model->create($validatedData);
        
        return $tournament;
    }
    
  

    public function getTournamentGroups($tournament_id){

        $tournament = $this->model->with('clubs')->find($tournament_id);

        $groups = $this->getGroups($tournament->clubs);

        return $groups;

    }

    




    public function getPlayers($tournament_id){
        $clubs = Tournament::find($tournament_id)->clubs()->with('players.club')->get();


        $allPlayers =collect([]);

        $players = $clubs->map(function($club) use($allPlayers){
            return $club->players->map(function($player)use($allPlayers){
                return $allPlayers->push($player);
            });
        });
        return $allPlayers;
    }

    public function updateInfo($request,$tournament){

        $request['type'] = $request['format'];

        unset($request['format']);

        $validatedData = $request->validate([
            'name' => ['regex:/^[\pL\s\-]+$/u','unique:tournaments,name,'.$tournament->id],
            'slug'=>['alpha','unique:tournaments,slug,'.$tournament->id],
            'type'=>['min:1','max:3','numeric'],
            'leg'=>['min:1','max:2','numeric'],
            'rounds'=>['min:1','max:18','numeric'],
            'active'=>['min:0','max:1','numeric'],
        ]);

        $tournament->update($validatedData);

        return $tournament;

    }


    public function getstats($tournament_id){
        $players = $this->getPlayers($tournament_id);

         $results = $this->model->find($tournament_id)->fixtures()->where('completed',1)->with('events','ratings')->get();

         $events = $results->pluck('events')->collapse();
          $ratings = $results->pluck('ratings')->collapse();


       return $players->map(function($player) use($events,$ratings){
            $player->stats = $this->getSinglePlayerStats($events,$ratings,$player->id);
            return $player;
        })->filter(function($item){
            return $item->stats['match_played'] != 0;
        })->sortByDesc('stats.goals');

        
    }

    public function getSinglePlayerStats($events,$ratings,$player_id){

        
        $player['match_played'] = $ratings->where('player_id',$player_id)->where('rating','!=',0)->count();
        $player['goals'] = $events->where('player_id',$player_id)->where('event_id',1)->count();
        $player['yellow_cards'] = $events->where('player_id',$player_id)->where('event_id',2)->count();
        $player['red_cards'] = $events->where('player_id',$player_id)->where('event_id',3)->count();
        $player['own_goals'] = $events->where('player_id',$player_id)->where('event_id',4)->count();
        $player['ratings'] = $ratings->where('player_id',$player_id)->sum('rating');

        return $player;

    }

    


    

    
    
}
