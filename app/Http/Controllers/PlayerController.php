<?php

namespace App\Http\Controllers;

use App\Http\Resources\PlayerResource;
use App\Repositories\PlayerModelRepository;
use App\Repositories\PlayerRepository;
use App\User;
use Illuminate\Http\Request;

class PlayerController extends Controller
{

    protected $playerRepo;
    protected $playerModelRepo;

    public function __construct(PlayerRepository $playerRepo,PlayerModelRepository $playerModelRepo) {
        $this->playerRepo = $playerRepo;
        $this->playerModelRepo = $playerModelRepo;
    }

    public function search(Request $request){

       return response()->json([
           'data' => $this->playerModelRepo->search($request),
       ]);
       
    }

    public function update(Request $request){
         $player = new PlayerResource($this->playerRepo->update($request));

         return response()->json([
            'message'=>'Player updated.',
            'data' => $player,
        ]);
    }
}
