<?php

namespace App\Repositories;

use App\Model\Tournament;
use App\Repositories\Traits\BaseRepository;
use App\Repositories\Traits\PointTableRepository;

class TournamentRepository
{

    use BaseRepository;
    use PointTableRepository;
    

    protected $model;

    public function __construct() {
        $this->model = new Tournament();
    }

    public function fixtureRepo(){
        return new FixtureRepository();
    }

    

    public function getTournament($key,$value){
        return $this->model->where($key,$value)->with('clubs')->firstOrFail();

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


    

    
    
}
