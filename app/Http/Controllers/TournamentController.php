<?php

namespace App\Http\Controllers;

use App\Http\Resources\TournamentResource;
use App\Repositories\TournamentRepository;
use Illuminate\Http\Request;

class TournamentController extends Controller
{

    protected $tournamentRepo;

    public function __construct(TournamentRepository $tournamentRepo) {
 
        $this->tournamentRepo = $tournamentRepo;
    }

    public function getTournament(){

        if(request()->slug != null){
            $key = 'slug';
            $value = request()->slug;
        }else{
            $key = 'id';
            $value = request()->id;
        }
        
        return new TournamentResource($this->tournamentRepo->getTournament($key,$value));

    }

    public function test(){

        return $this->tournamentRepo->getTournamentPointsTable(1);

        return $this->tournamentRepo->getPlayedMatches(1,1);
        return $this->tournamentRepo->get_club_stats(1,1);
    }


}
