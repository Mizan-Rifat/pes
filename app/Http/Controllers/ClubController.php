<?php

namespace App\Http\Controllers;

use App\Http\Resources\ClubResource;
use App\Http\Resources\PlayerResource;
use App\Model\ClubModel;
use App\Repositories\ClubModelRepository;
use App\Repositories\ClubRepository;
use Illuminate\Http\Request;

class ClubController extends Controller
{

    protected $clubRepo;
    protected $clubModelRepo;

    public function __construct(ClubRepository $clubRepo,ClubModelRepository $clubModelRepo) {
        $this->clubRepo = $clubRepo;
        $this->clubModelRepo = $clubModelRepo;
    }

    public function index(){
        $clubs = $this->clubRepo->with('owner','tournaments')->get();

        return ClubResource::collection($clubs);
    }

    public function getClub($reference){
        $club = $this->clubRepo->getByReference($reference,['owner','players','tournaments']);
        // return $club;
        return new ClubResource($club);
    }

    public function sendInvitation(Request $request){
        $insert = $this->clubRepo->sendInvitation($request);
        if($insert){
            return response()->json([
                'message'=>'Invitation Send Successfully',
            ],200);
        }else{
            return response()->json(['message'=>"Something Went Wrong"],500);
        }
    }

    public function addClubsInTournament(Request $request){
        $insert = $this->clubRepo->addClubInTournament($request);
        
        if($insert){
            return response()->json([
                'message'=>'Club Added Successfully',
                'club'=>new ClubResource($this->clubRepo->getByReference($request['club_id']))
            ],200);
        }else{
            return response()->json(['message'=>"Something Went Wrong"],500);
        }
    }


    public function removeClubsFromTournament(Request $request){
        $delete = $this->clubRepo->removeClubsFromTournament($request);

        if($delete){
            return response()->json([
                'message' => 'Club(s) removed successfully.',
            ],200);
            }else{
                return response()->json([
                    'message' => 'Club(s) not removed.',
                ],500);
            }
    }

    public function search(Request $request){
       
        return ClubResource::collection($this->clubRepo->search($request));
    }

    public function searchModel(Request $request){

        $data =$this->clubModelRepo->search($request);
        
       
        return response()->json([
            'data' => $data->map(function($item){
                $item->logo = asset('/images/teams/'.sprintf("%06d",$item->model_id).'.png');
                return $item;
            }),
        ]);
    }

    public function addPlayerToClub(Request $request){
        $player = $this->clubRepo->addPlayerToSquad($request);

        return response()->json([
            'message' => 'Player has added.',
            'data'=> new PlayerResource($player)
        ],200);
    }

    public function removePlayerFromClub(Request $request){
        $delete = $this->clubRepo->removePlayersFromClub($request);

        if($delete){
            return response()->json([
                'message' => 'Player(s) removed successfully.',
            ],200);
            }else{
                return response()->json([
                    'message' => 'Player(s) not removed.',
                ],500);
            }
    }

    public function getAllModels(){
        return ClubModel::all();
    }

    public function update(Request $request){
        $club = $this->clubRepo->updateClub($request);
       
        return response()->json([
            'message' => 'Updated Successfully.',
            'data'=> new ClubResource($club)
        ],200);
    }

    public function create(Request $request){
        return $this->clubRepo->createClub($request);
    }
}
