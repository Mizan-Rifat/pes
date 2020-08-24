<?php

namespace App\Repositories;

use App\Model\Player;
use App\Repositories\Traits\BaseRepository;
use Illuminate\Validation\Rule;

class PlayerRepository
{
    use BaseRepository;

    protected $model;

    public function __construct() {
        $this->model = new Player();
    }

    public function update($request){
        $validatedData = $request->validate([
            'id'=>['required','integer'],
            'club_id'=>['required','integer','exists:clubs,id'],
            'jersey' => ['integer',Rule::unique('players')->where(function ($query) use($request){
                return $query->where('club_id', $request['club_id']);
            })],
        ]);

        $player = $this->model->findOrFail($validatedData['id']);

        $player->update(['jersey'=>$validatedData['jersey']]);

        return $player;

    }

    
}
