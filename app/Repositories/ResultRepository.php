<?php

namespace App\Repositories;

use App\Model\Fixture;
use App\Model\MatchDetails;
use App\Model\MatchImage;
use App\Model\MatchRating;
use App\Model\Result;
use App\Notifications\ResultSubmitted;
use App\Repositories\Traits\BaseRepository;
use App\Repositories\Traits\EventRepository;
use App\Repositories\Traits\MatchImageRepository;
use App\Repositories\Traits\RatingRepository;
use App\User;
use File;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;


class ResultRepository
{
    use BaseRepository;
    use EventRepository;
    use RatingRepository;
    use MatchImageRepository;

    protected $model;

    public function __construct() {
        $this->model = new Result();
    }

    public function fixtureRepo(){
        return new FixtureRepository();
    }

    public function approveResult($fixture){

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
            'fixture_id'=>$fixture->id,
            'match_status'=>$match_status,
            'team1_goals'=>$team1_goals,
            'team2_goals'=>$team2_goals,
        ]);

        $team1_owner = User::find($fixture->team1_id); 
        $team2_owner = User::find($fixture->team2_id); 

        Notification::send([$team1_owner,$team2_owner],new ResultSubmitted($fixture->id,$fixture->tournament['name'],$fixture->team1['name'],$fixture->team2['name']));

        $fixture->completed = 1;
        $fixture->save();


    }

  



}