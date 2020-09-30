<?php

namespace App\Http\Controllers;

use App\Http\Resources\ClubResource;
use App\Model\Club;
use App\Model\Tournament;
use App\Repositories\ClubRepository;
use App\Repositories\TournamentRepository;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class TournamentClubsController extends Controller
{

    protected $tournamentRepo;
    protected $clubRepo;

    public function __construct(TournamentRepository $tournamentRepo,ClubRepository $clubRepo) {
 
        $this->tournamentRepo = $tournamentRepo;
        $this->clubRepo = $clubRepo;
    }

    public function getClubs($id){
        $with = [];

        if(isset(request()->owner)){
            $with = ['owner'];
        }

        $clubs = $this->tournamentRepo
                ->findOrFail($id)
                ->clubs()
                ->with($with)
                // ->where('invitation','>',0)
                ->get();


        return ClubResource::collection($clubs);
    }

    public function addClubInTournament(Request $request){

        $this->authorize('addClubInTournament',Tournament::class);

        $validatedData = $request->validate([
            'club_id' => ['required','integer',
                            Rule::unique('club_tournament')->where(function ($query) use($request){
                                return $query->where('tournament_id', $request['tournament_id']);
                            })            
                        ],
            'tournament_id' => ['required','integer'],
        ]);

        $tournament = $this->tournamentRepo->findOrFail($validatedData['tournament_id']);
        $club = $this->clubRepo->findOrFail($validatedData['club_id']);

        $tournament->clubs()->attach($validatedData['club_id']);

        
        return response()->json([
            'message'=>'Club Added Successfully',
            'data'=>new ClubResource($club)
        ],200);

    }
    public function removeClubFromTournament(Request $request){

        $this->authorize('removeClubFromTournament',Tournament::class);

        $validatedData = $request->validate([
            'club_id' => ['required','integer'],
            'tournament_id' => ['required','integer'],
        ]);

        $tournament = $this->tournamentRepo->findOrFail($validatedData['tournament_id']);
        $tournament->clubs()->detach($validatedData['club_id']);

        return response()->json([
            'message'=>'Club Removed Successfully',
            'data'=>['club_id'=>$validatedData['club_id']]
        ],200);

    }
}
