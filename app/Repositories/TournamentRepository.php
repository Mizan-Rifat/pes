<?php

namespace App\Repositories;

use App\Model\Tournament;
use App\Repositories\Traits\BaseRepository;
use App\Repositories\Traits\PlayerStatsRepository;
use App\Repositories\Traits\PointTableRepository;

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

    

    public function getTournament($key,$value,$with=[]){
        return $this->model->where($key,$value)->with($with)->firstOrFail();

    }

    public function getFixtures($reference){
        return $this->fixtureRepo()->getFixturesByTournament($reference);
    }

    public function createTournament($request){

        $request['type'] = $request['format'];

        unset($request['format']);

        $validatedData = $request->validate([
            'name' => ['required','regex:/^[\pL\s\-]+$/u','unique:tournaments,name,'.$request->id],
            'slug'=>['required','alpha','unique:tournaments,slug,'.$request->id],
            'type'=>['required','min:1','max:3','numeric'],
            'leg'=>['required','min:1','max:2','numeric'],
            'rounds'=>['required','min:1','max:18','numeric'],
            'active'=>['required','min:0','max:1','numeric'],
        ]);

        $tournament = $this->model->create($validatedData);
        
        return $tournament;
    }
    
  

    public function getTournamentWithGroups($tournament_id){

        $tournament = $this->model->with('groups')->find($tournament_id);

        $groups = $tournament->groups->mapToGroups(function($item,$key){
            
            return [$item['pivot']['group_'] => $item];
            
        });

        unset($tournament->groups);

        $tournament->groups = $groups;

        return $tournament;

    }

    public function getResults($tournament_id){
        $results = $this->fixtureRepo()
                    ->getCompletedFixturesByTournament($tournament_id,[
                        'team1',
                        'team2',
                        'result'
                    ]);
                    
        return $results;
    }
    public function getOfficials($tournament_id){
        $officials = $this->model->find($tournament_id)->officials()->get();
                    
        return $officials;
    }


    public function getPlayers($tournament_id){
        $clubs = Tournament::find($tournament_id)->clubs()->with('players')->get();


        $allPlayers =collect([]);

        $players = $clubs->map(function($club) use($allPlayers){
            return $club->players->map(function($player)use($allPlayers){
                return $allPlayers->push($player);
            });
        });
        return $allPlayers;
    }

    public function updateInfo($request){

        $validatedData = $request->validate([
            'id'=>['required','numeric'],
            'name' => ['regex:/^[\pL\s\-]+$/u','unique:tournaments,name,'.$request->id],
            'slug'=>['alpha','unique:tournaments,slug,'.$request->id],
            'type'=>['min:1','max:3','numeric'],
            'leg'=>['min:1','max:2','numeric'],
            'rounds'=>['min:1','max:18','numeric'],
            'active'=>['min:0','max:1','numeric'],
        ]);

        $tournament = $this->model->findOrFail($validatedData['id']);

        unset($validatedData['id']);

        $tournament->update($validatedData);

        return $tournament;

    }

    


    

    
    
}
