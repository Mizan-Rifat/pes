<?php

namespace App\Repositories;

use App\Model\Fixture;
use App\Model\MatchDetails;
use App\Model\MatchImage;
use App\Model\MatchRating;
use App\Model\Result;
use App\Repositories\Traits\BaseRepository;
use App\Repositories\Traits\EventRepository;
use App\Repositories\Traits\RatingRepository;
use File;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;


class ResultRepository
{
    use BaseRepository;
    use EventRepository;
    use RatingRepository;

    protected $model;

    public function __construct() {
        $this->model = new Result();
    }

    public function fixtureRepo(){
        return new FixtureRepository();
    }


public function addResultForApproval($request){

        $current_user = Auth::user();
        $current_user_club = $current_user->club;

        $validatedData =  Validator::make($request->all(),[

            'fixture_id'=>['required','integer',
                            Rule::exists('fixtures','id')->where(function($query){
                                $query->whereIn('completed',[0,3,4]);
                            })],

            'eventsImages'=>['required','array'],
            'team1ratingsImages'=>['required','array'],
            'team2ratingsImages'=>['required','array'],

            'eventsImages.*'=>['mimes:jpeg,jpg,png'],
            'team1ratingsImages.*'=>['mimes:jpeg,jpg,png'],
            'team2ratingsImages.*'=>['mimes:jpeg,jpg,png']
            
        ])->validate();


        $fixture = Fixture::find($validatedData['fixture_id']);

        $completed = 2;

        if($fixture->completed == 0){
            $completed = $fixture->team1_id == $current_user_club->id ? 3 : 4;
        }

        $eventsImages = collect($validatedData['eventsImages'])->map(function($item) use($current_user_club,$validatedData){
            $item->store('match_');
            return [
                'image'=>$item->hashName(),
                'fixture_id'=>$validatedData['fixture_id'],
                'submitted_by'=>$current_user_club->id,
                'field'=>1
            ];

        })->toArray();
        
        $team1ratingsImages = collect($validatedData['team1ratingsImages'])->map(function($item) use($current_user_club,$validatedData){
            $item->store('match_');
            return [
                'image'=>$item->hashName(),
                'fixture_id'=>$validatedData['fixture_id'],
                'submitted_by'=>$current_user_club->id,
                'field'=>2
            ];

        })->toArray();

        $team2ratingsImages = collect($validatedData['team2ratingsImages'])->map(function($item) use($current_user_club,$validatedData){
            $item->store('match_');
            return [
                'image'=>$item->hashName(),
                'fixture_id'=>$validatedData['fixture_id'],
                'submitted_by'=>$current_user_club->id,
                'field'=>3
            ];

        })->toArray();

        $images = [...$eventsImages,...$team1ratingsImages,...$team2ratingsImages];

        if($fixture->team1_id == $current_user_club->id){
            $events = json_decode($request->events, true);

            $ratings = json_decode($request->ratings, true);

            $eventRules = [
            '*.player_id' => 'required|numeric', 
            '*.event_id' => 'required|numeric|min:1|max:4', 
            '*.club_id' => 'required|numeric', 
            '*.minute' => 'required|numeric|max:120|min:1', 
            '*.assist_player_id' => 'numeric|different:team1.*.player_id|nullable', 
            '*.fixture_id' => ['required','numeric',Rule::in([$validatedData['fixture_id']])], 
            ];

            $ratingsRules = [
                '*.club_id'=>'required|numeric',
                '*.player_id'=>'required|numeric',
                '*.rating'=>'required|numeric|max:10|min:0',
                '*.fixture_id' => ['required','numeric',Rule::in([$validatedData['fixture_id']])],

            ];

            $validatedEvents = Validator::make($events, $eventRules)->validate();
            $validatedRatings = Validator::make($ratings, $ratingsRules)->validate();

            DB::table('match_events')->insert($validatedEvents);
            DB::table('match_ratings')->insert($validatedRatings);
        }

        

        DB::table('match_images')->insert($images);
        $fixture->completed = $completed;
        $fixture->save();
    
}

    public function deleteImage($request){
        $validatedData = $request->validate([
            'id'=>['required','numeric'],
        ]);

        unlink(public_path('/images/match_events/'.MatchImage::find($validatedData['id'])->image));

        return MatchImage::destroy($validatedData['id']);
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