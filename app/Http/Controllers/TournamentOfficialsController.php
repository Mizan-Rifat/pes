<?php

namespace App\Http\Controllers;

use App\Http\Resources\OfficialResource;
use App\Http\Resources\UserResource;
use App\Notifications\AddedAsOfficial;
use App\Repositories\OfficialRepository;
use App\Repositories\TournamentRepository;
use App\Repositories\UserRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Notification;
use Illuminate\Validation\Rule;

class TournamentOfficialsController extends Controller
{
    protected $tournamentRepo;
    protected $userRepo;

    public function __construct(TournamentRepository $tournamentRepo,UserRepository $userRepo) {
 
        $this->tournamentRepo = $tournamentRepo;
        $this->userRepo = $userRepo;
    }

    public function index($tournament_id){
        $officials = $this->tournamentRepo->findOrFail($tournament_id)
                    ->officials()
                    ->get();


        return UserResource::collection($officials);
    }

    public function addOfficial(Request $request){

        $validatedData = $request->validate([
            'user_id' => ['required','integer',
                            Rule::unique('officials')->where(function ($query) use($request){
                                return $query->where('tournament_id', $request['tournament_id']);
                            })            
                        ],
            'tournament_id' => ['required','integer'],
        ],
        [
            'unique'=>"The User is already added as an official."
        ]  

        );

        $tournament = $this->tournamentRepo->findOrFail($validatedData['tournament_id']);
        $official = $this->userRepo->findOrFail($validatedData['user_id']);

        $tournament->officials()->attach($validatedData['user_id']);

        Notification::send($official,new AddedAsOfficial($tournament->name));

        
        return response()->json([
            'message'=>'Offical Added Successfully',
            'data'=>new UserResource($official)
        ],200);
    }

    public function removeOfficial(Request $request){
        $validatedData = $request->validate([
            'user_id' => ['required','integer'],
            'tournament_id' => ['required','integer'],
        ]);

        $tournament = $this->tournamentRepo->findOrFail($validatedData['tournament_id']);

        $tournament->officials()->detach($validatedData['user_id']);

        
        return response()->json([
            'message'=>'Offical removed Successfully',
            'data'=>$validatedData['user_id']
        ],200);
    }
}
