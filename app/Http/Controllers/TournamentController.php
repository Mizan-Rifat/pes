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
        // return $tournaments;
        return TournamentResource::collection($tournaments);
    }

    

    public function create(Request $request){
        $tournament = $this->tournamentRepo->createTournament($request);
        
        return response()->json([
            'message'=>'Tournament Created Successfully',
            'data'=>new TournamentResource($tournament)
        ],200); 
    }

   

    public function destroy(Request $request){

        $delete = $this->tournamentRepo->destroy($request['ids']);
        
        if($delete){
            return response()->json([
                'message' => 'Tournament(s) removed successfully.',
            ],200);
            }else{
                return response()->json([
                    'message' => 'Tournament(s) not removed.',
                ],500);
            }
    }

    public function getTournament($ref){

        if(request()->slug != null){
            $key = 'slug';
            $value = request()->slug;
        }else{
            $key = 'id';
            $value = request()->id;
        }

        return Tournament::where('id',$ref)->orWhere('slug',$ref)->first();
        
        return new TournamentResource($this->tournamentRepo->getTournament($key,$value));

    }

    public function getTournamentDeatils(){
        if(request()->slug != null){
            $key = 'slug';
            $value = request()->slug;
        }else{
            $key = 'id';
            $value = request()->id;
        }

        $tournament = $this->tournamentRepo->getTournament($key,$value,['clubs.owner','officials']);

        $tournament->groups = $tournament->groups->map(function($group){
            return ClubResource::collection($group);
        });

        
        return new TournamentResource($tournament);
    }

    public function getClubsWithDetails(){
        $clubs = $this->tournamentRepo
                ->find(request('tournament_id'))
                ->clubs()
                ->with('owner')
                ->where('invitation','>',0)
                ->get();

        return ClubResource::collection($clubs);
        
    }

    public function getClubs(){
        $clubs = $this->tournamentRepo
                ->find(request('tournament_id'))
                ->clubs()
                ->where('invitation','>',0)
                ->get();


        return ClubResource::collection($clubs);
    }

    public function getResults(){

        $results = $this->tournamentRepo->getResults(request('tournament_id'));

        return ResultResource::collection($results);
        
    }

    public function getFixtures(Request $request){

        $validatedData = $request->validate([
            'tournament_id' => ['required','integer'],
            'admin'=>['integer']
        ]);


        $fixtures = $this->tournamentRepo->getFixtures($validatedData);

        return  FixtureResource::collection($fixtures);
    }

    public function getSubmittedFixtures(Request $request){
        $fixtures = $this->tournamentRepo->getSubmittedFixtures($request);
        return FixtureResource::collection($fixtures);
    }

    public function getOfficials(){
        $officials = $this->tournamentRepo->getOfficials(request('tournament_id'));

        return OfficialResource::collection($officials);
    }

    public function addOfficials(Request $request){
        $official = $this->officialRepo->store($request);

        return response()->json([
            'message'=>'Official Added Successfully',
            'data'=>new OfficialResource($official)
        ],200);
    }

    public function removeOfficials(Request $request){
       $delete = $this->officialRepo->destroyByIds($request);

       if($delete){
        return response()->json([
            'data'=>$request['ids'],
            'message' => 'Official(s) removed successfully.',
        ],200);
        }else{
            return response()->json([
                'message' => 'Official(s) not removed.',
            ],500);
        }
    }

    public function update(Request $request){
        $tournament = $this->tournamentRepo->updateInfo($request);

        return response()->json([
            'message'=>'Tournament Info Updated Successfully.',
            'tournament'=> new TournamentResource($tournament)
        ],200);
    }


    public function getPoinTable(Request $request){
        $validatedData = $request->validate([
            'tournament_id'=>['required','integer']
        ]);

        return $this->tournamentRepo->getTournamentPointsTable($validatedData['tournament_id']);
    }


    public function getPlayerStats(Request $request){
        
        $validatedData = $request->validate([
            'tournament_id'=>['required','integer']
        ]);
        $request->merge(['stats'=>1]);

        // return $this->tournamentRepo->getstats($validatedData['tournament_id']);

        return PlayerResource::collection($this->tournamentRepo->getstats($validatedData['tournament_id']));
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
