<?php

namespace App\Repositories;

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

    public function update($request){

        $club_id = Auth::user()->club->id;

        $validatedData = $request->validate([
            'club_id'=>['required','integer','in:'.$club_id],
            'id'=>['required','integer'],
            'jersey' => ['integer',Rule::unique('players')->where(function ($query) use($club_id){
                return $query->where('club_id', $club_id);
            })],
        ]);

        $player = $this->model->findOrFail($validatedData['id']);

        $player->update(['jersey'=>$validatedData['jersey']]);

        return $player;

    }

    
}
