<?php

namespace App\Http\Controllers;

use App\Http\Resources\ClubResource;
use App\Http\Resources\PlayerResource;
use App\Model\Club;
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

    public function show($ref){
        $with = ['owner','players','tournaments'];

        $club = $this->clubRepo
                ->where('id',$ref)
                ->orWhere('slug',$ref)
                ->with($with)
                ->firstOrFail();
                
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

    public function update(Request $request,Club $club){
        $this->authorize('update',$club);

        $updatedClub = $this->clubRepo->updateClub($request,$club);
       
        return response()->json([
            'message' => 'Updated Successfully.',
            'data'=> new ClubResource($updatedClub)
        ],200);
    }

    public function create(Request $request){

        $this->authorize('create',Club::class);

        $club = $this->clubRepo->createClub($request);
       
        return response()->json([
            'message' => 'Club Created',
            'data'=> new ClubResource($club)
        ],200);
    }
}
