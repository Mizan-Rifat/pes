<?php

namespace App\Http\Controllers;

use App\Http\Resources\ResultResource;
use App\Repositories\ResultRepository;
use App\Repositories\TournamentRepository;
use Illuminate\Http\Request;

class TournamentResultsController extends Controller
{
    protected $tournamentRepo;
    protected $resultRepo;

    public function __construct(TournamentRepository $tournamentRepo,ResultRepository $resultRepo) {
 
        $this->tournamentRepo = $tournamentRepo;
        $this->resultRepo = $resultRepo;
    }

    public function index($tournament_id){

        $with =['team1','team2','result'];
        
        $results = $this->tournamentRepo->findOrFail($tournament_id)
                    ->fixtures()
                    ->where('completed',1)
                    ->with($with)
                    ->get();

        return ResultResource::collection($results);
    }
}
