<?php

namespace App\Repositories;

use App\Model\Club;
use App\Model\Player;
use App\Repositories\Traits\BaseRepository;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class PlayerRepository
{
    use BaseRepository;

    protected $model;

    public function __construct() {
        $this->model = new Player();
    }

    public function updatePlayer($request,$id){

        $player = $this->model->findOrFail($id);

        $validatedData = $request->validate([
            'jersey' => ['integer',Rule::unique('players')->where(function ($query) use($player){
                return $query->where('club_id', $player->club_id);
            })],
        ]);

        $player->update(['jersey'=>$validatedData['jersey']]);

        return $player;

    }

    public function addPlayerInSquad($request){

        $club_id = $request['club_id'];

        $validatedData = $request->validate([
            'club_id' => ['required','integer','in:'.$club_id],
            'playermodel_id' => ['required','bail','integer','exists:playermodels,id',
                                    Rule::unique('players')->where(function ($query) use($club_id){
                                        return $query->where('club_id', $club_id);
                                    })    
                                ],
            'jersey' => ['required','integer',Rule::unique('players')->where(function ($query) use($club_id){
                return $query->where('club_id', $club_id);
            })],
        ],
        [
            'playermodel_id.unique' => 'The Player Is Already In This Squad.'
        ]
        );


        $player = Player::create($validatedData);

        return $player;
    }


    
}
