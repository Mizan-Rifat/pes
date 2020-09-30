<?php

namespace App\Http\Controllers;

use App\Http\Resources\ClubResource;
use App\Http\Resources\FixtureResource;
use App\Http\Resources\MatchResultResource;
use App\Http\Resources\OfficialResource;
use App\Http\Resources\PlayerResource;
use App\Http\Resources\ResultResource;
use App\Http\Resources\TournamentResource;
use App\Model\Fixture;
use App\Model\Tournament;
use App\Repositories\OfficialRepository;
use App\Repositories\TournamentRepository;
use Illuminate\Http\Request;

class TournamentController extends Controller
{

    protected $tournamentRepo;
    protected $officialRepo;

    public function __construct(TournamentRepository $tournamentRepo,OfficialRepository $officialRepo) {
 
        $this->tournamentRepo = $tournamentRepo;
        $this->officialRepo = $officialRepo;
    }

    public function index(){
        $tournaments = $this->tournamentRepo->withCount('clubs')->get();
        return TournamentResource::collection($tournaments);
    }

    public function create(Request $request){

        $this->authorize('create',Tournament::class);

        $tournament = $this->tournamentRepo->createTournament($request);
        
        return response()->json([
            'message'=>'Tournament Created Successfully',
            'data'=>new TournamentResource($tournament)
        ],200); 
    }

    public function destroy(Tournament $tournament){

        $this->authorize('delete',$tournament);

        $delete = $tournament->delete();
        
        if($delete){
            return response()->json([
                'message' => 'Tournament(s) removed successfully.',
                'data'=>$tournament->id
            ],200);
            }else{
                return response()->json([
                    'message' => 'Tournament(s) not removed.',
                ],500);
            }
    }

    public function update(Request $request,Tournament $tournament){

        $this->authorize('update',$tournament);

        $updatedTournament = $this->tournamentRepo->updateInfo($request,$tournament);

        return response()->json([
            'message'=>'Tournament Info Updated Successfully.',
            'data'=> new TournamentResource($updatedTournament)
        ],200);
    }

    public function show($ref){

        $with = [];
        if(isset(request()['details'])){
            $with=['clubs.owner','officials'];
        }

        $tournament = $this->tournamentRepo->getTournament($ref,$with);
        
        return new TournamentResource($tournament);

    }

    public function getSubmittedFixtures(Request $request){
        $fixtures = $this->tournamentRepo->getSubmittedFixtures($request);
        return FixtureResource::collection($fixtures);
    }



    


    public function getPoinTable($tournament_id){
        $pointTable = $this->tournamentRepo->getTournamentPointsTable($tournament_id);
        return response()->json([
            'data'=>$pointTable
        ]);
    }


    public function getPlayerStats($tournament_id){
        $stats = $this->tournamentRepo->getstats($tournament_id);
        request()->merge(['stats'=>1]);
        
        return response()->json([
            'data'=>PlayerResource::collection($stats)
        ]);
    }


    public function getPlayers(Request $request){
        $validatedData = $request->validate([
            'tournament_id'=>['required','integer']
        ]);

        return $this->tournamentRepo->getPlayers($validatedData['tournament_id']);
    }


    public function getTournamentGroups(Request $request){
        $validatedData = $request->validate([
            'tournament_id'=>['required','integer']
        ]);

        return $this->tournamentRepo->getTournamentGroups($validatedData['tournament_id'])->map(function($group){
            return ClubResource::collection($group);
        });
    }
    



}
