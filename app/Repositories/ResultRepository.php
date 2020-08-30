<?php

namespace App\Repositories;

use App\Model\MatchDetails;
use App\Model\MatchRating;
use App\Model\Result;
use App\Repositories\Traits\BaseRepository;
use Illuminate\Support\Facades\DB;

class ResultRepository
{
    use BaseRepository;

    protected $model;

    public function __construct() {
        $this->model = new Result();
    }

    public function fixtureRepo(){
        return new FixtureRepository();
    }

    public function matchEventUpdate($request){

        $validatedData = $request->validate([

            'id'=>['required','numeric'],
            'event_id' => ['min:1','max:3','numeric'],
            'player_id'=>['numeric','exists:players,id'],
            'minute'=>['min:1','max:120','numeric'],
            'assist_player_id'=>['numeric','exists:players,id','different:player_id'],

        ]);

        $event = MatchDetails::findOrFail($request->id);

        $event->update($validatedData);

        return $event;
    }

    public function addMatchEvent($request){

        $validatedData = $request->validate([
            'fixture_id'=>['required','numeric','exists:fixtures,id'],
            'club_id'=>['required','numeric','exists:clubs,id'],
            'player_id'=>['required','numeric','exists:players,id'],
            'event_id'=>['required','numeric','max:3','min:1'],
            'minute'=>['required','numeric','max:120','min:1'],
            'assist_player_id'=>['numeric','exists:players,id','different:player_id'],
        ]);


        return MatchDetails::create($validatedData);
    }
    
    public function addMatchRating($request){

        

        $validatedData = $request->validate([
            'fixture_id'=>['required','numeric','exists:fixtures,id'],
            'club_id'=>['required','numeric','exists:clubs,id'],
            'player_id'=>['required','numeric','exists:players,id'],
            'rating'=>['required','numeric','max:10','min:0'],
        ]);


        return MatchRating::create($validatedData);
    }
    public function deleteMatchEvent($request){

        $validatedData = $request->validate([
            'id'=>['required','numeric'],
        ]);

        return MatchDetails::destroy($validatedData['id']);
    }
    public function deleteMatchRating($request){

        $validatedData = $request->validate([
            'id'=>['required','numeric'],
        ]);

        return MatchRating::destroy($validatedData['id']);
    }


    public function addMatchResult($request){
        
        $validatedData = $request->validate([
            'fixture_id'=>['required','integer','exists:fixtures,id,completed,0'],

            'ratings'=>['array','min:22'],
            'events.*.event_id' => ['required','integer'],
            'events.*.player_id' => ['required','integer'],
            'events.*.club_id' => ['required','integer'],
            'events.*.minute' => ['required','integer','max:120','min:1'],
            'events.*.assist_player_id' => ['integer','different:events.*.player_id','nullable'],
            
            'ratings.*.club_id'=>['required','integer',],
            'ratings.*.player_id'=>['required','integer',],
            'ratings.*.rating'=>['required','integer','max:10','min:0'],

            
        ]);
        $fixture = $this->fixtureRepo()->findOrFail($validatedData['fixture_id']);
        

        $match_status = 0;
        $team1_goals = 0;
        $team2_goals = 0;

        if(isset($validatedData['events'])){

            $events = collect($validatedData['events']);

            foreach ($validatedData['events'] as $index => $event) {
           
                $validatedData['events'][$index] = array_merge($event,['fixture_id'=>$validatedData['fixture_id']]);
               
            }

            $team1_goal = $events
                        ->where('event_id',1)
                        ->where('club_id',$fixture->team1_id)
                        ->count();

            $team1_own_goal = $events
                            ->where('event_id',4)
                            ->where('club_id',$fixture->team1_id)
                            ->count();

            $team2_goal = $events
                        ->where('event_id',1)
                        ->where('club_id',$fixture->team2_id)
                        ->count();

            $team2_own_goal = $events
                            ->where('event_id',4)
                            ->where('club_id',$fixture->team2_id)
                            ->count();


            $team1_goals = $team1_goal + $team2_own_goal;
            $team2_goals = $team2_goal + $team1_own_goal;
                    


            if($team1_goals > $team2_goals){
                $match_status = $fixture->team1_id;
            }
            if($team1_goals < $team2_goals){
                $match_status = $fixture->team2_id;
            }
            // dd($validatedData['events']);
            DB::table('match_details')->insert($validatedData['events']);
            
            DB::table('match_results')->insert([
                'fixture_id'=>$validatedData['fixture_id'],
                'match_status'=>$match_status,
                'team1_goals'=>$team1_goals,
                'team2_goals'=>$team2_goals,
            ]);
        }

        if(isset($validatedData['ratings'])){

            foreach ($validatedData['ratings'] as $index => $rating) {
                unset($rating['tableData']);
           
                $validatedData['ratings'][$index] = array_merge($rating,['fixture_id'=>$validatedData['fixture_id']]);
               
            }


            DB::table('match_ratings')->insert($validatedData['ratings']);
        }

        $fixture->completed = 1;
        $fixture->save();


    }

 
    
}
