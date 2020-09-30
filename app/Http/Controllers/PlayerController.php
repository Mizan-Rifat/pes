<?php

namespace App\Http\Controllers;

use App\Http\Resources\PlayerModelresource;
use App\Http\Resources\PlayerResource;
use App\Model\Player;
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
           'data' => PlayerModelresource::collection($this->playerModelRepo->search($request)),
       ]);
       
    }

    public function addPlayer(Request $request){

        $this->authorize('add',[Player::class,$request->club_id]);

        $player = $this->playerRepo->addPlayerInSquad($request);

        return response()->json([
            'data'=>new PlayerResource($player),
            'message'=> ' Player added.'
        ]);
        
    }
    public function updatePlayer(Request $request,$player_id){

        $player = Player::with('details')->findOrFail($player_id);

        $this->authorize('update',$player);

        $updatedPlayer = $this->playerRepo->updatePlayer($request,$player->id);

        return response()->json([
            'data'=>new PlayerResource($updatedPlayer),
            'message'=> ' Player Updated.'
        ]);
        
    }
    public function removePlayer(Player $player){

        $this->authorize('remove',$player);
        
        $player->delete();

        return response()->json([
            'data'=>$player->id,
            'message'=> ' Player removed.'
        ]);
        
    }

}
