<?php

namespace App\Repositories;

use App\Model\Fixture;
use App\Model\MatchDetails;
use App\Model\MatchRating;
use App\Model\Result;
use App\Repositories\Traits\BaseRepository;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;


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




public function addResultForApproval($request){

        Validator::make($request->all(),[

            'fixture_id'=>['required','integer',
                            Rule::exists('fixtures','id')->where(function($query){
                                $query->whereIn('completed',[0,2]);
                            })],

            'eventsImages'=>['required','array'],
            'team1ratingsImages'=>['required','array'],
            'team2ratingsImages'=>['required','array'],

            'eventsImages.*'=>['mimes:jpeg,jpg,png'],
            'team1ratingsImages.*'=>['mimes:jpeg,jpg,png'],
            'team2ratingsImages.*'=>['mimes:jpeg,jpg,png']
            
        ])->validate();

        $fixture = Fixture::find($request['fixture_id']);

        if($fixture->team1_id != Auth::id() && $fixture->team2_id != Auth::id()){
            abort(403,'Permission Denied');
        }

        $eventsImages = collect($request['eventsImages'])->map(function($item) use($request){
            $item->store('events');
            return [
                'image'=>$item->hashName(),
                'fixture_id'=>$request['fixture_id'],
                'submitted_by'=>Auth::id(),
                'field'=>1
            ];

        })->toArray();
        
        $team1ratingsImages = collect($request['team1ratingsImages'])->map(function($item) use($request){
            $item->store('ratings');
            return [
                'image'=>$item->hashName(),
                'fixture_id'=>$request['fixture_id'],
                'submitted_by'=>Auth::id(),
                'field'=>2
            ];

        })->toArray();

        $team2ratingsImages = collect($request['team2ratingsImages'])->map(function($item) use($request){
            $item->store('ratings');
            return [
                'image'=>$item->hashName(),
                'fixture_id'=>$request['fixture_id'],
                'submitted_by'=>Auth::id(),
                'field'=>3
            ];

        })->toArray();

        $images = [...$eventsImages,...$team1ratingsImages,...$team2ratingsImages];

        


        if($fixture->team1_id == Auth::id()){
            $events = collect(json_decode($request->events, true))->collapse()->map(function($item) use($request){
                $item['fixture_id'] = $request['fixture_id'];
                unset($item['tableData']);
                return $item;
            })->toArray();

            $ratings = collect(json_decode($request->ratings, true))->collapse()->map(function($item) use($request){
                            $item['fixture_id'] = $request['fixture_id'];

                            unset($item['tableData']);
                            return $item;
                        })->toArray();

            $eventRules = [
            '*.player_id' => 'required|numeric', 
            '*.club_id' => 'required|numeric', 
            '*.minute' => 'required|numeric|max:120|min:1', 
            '*.minute' => 'numeric|different:team1.*.player_id|nullable', 
            ];

            $ratingsRules = [
                '*.club_id'=>'required|numeric',
                '*.player_id'=>'required|numeric',
                '*.rating'=>'required|numeric|max:10|min:0',

            ];

            Validator::make($events, $eventRules)->validate();
            Validator::make($ratings, $ratingsRules)->validate();

            DB::table('match_details')->insert($events);
            DB::table('match_ratings')->insert($ratings);
        }

        DB::table('match_images')->insert($images);
        $fixture->completed = 2;
        $fixture->save();
    

}

public function approveResult($request){

    $validatedData = $request->validate([

        'fixture_id'=>['required','integer',
                            Rule::exists('fixtures','id')->where(function($query){
                                $query->whereIn('completed',[2]);
                            })],
    ]);

    $fixture = $this->fixtureRepo()->with('events')->findOrFail($validatedData['fixture_id']);

    $events = $fixture->events;

    $match_status = 0;
    $team1_goals = 0;
    $team2_goals = 0;

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

    DB::table('match_results')->insert([
        'fixture_id'=>$validatedData['fixture_id'],
        'match_status'=>$match_status,
        'team1_goals'=>$team1_goals,
        'team2_goals'=>$team2_goals,
    ]);

    $fixture->completed = 1;
    $fixture->save();


}



}