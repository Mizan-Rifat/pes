<?php

namespace App\Repositories\Traits;

use App\Model\MatchDetails;
use Illuminate\Support\Facades\DB;

trait EventRepository
{
    public function updateMatchEvent($request){

        $validatedData = $request->validate([

            'id'=>['required','numeric'],
            'event_id' => ['min:1','max:3','numeric'],
            'player_id'=>['numeric','exists:players,id'],
            'minute'=>['min:1','max:120','numeric'],
            'assist_player_id'=>['numeric','exists:players,id','different:player_id'],

        ]);

        $event = MatchDetails::findOrFail($request->id);

        $event->update($validatedData);

        return $event;
    }

    public function addMatchEvent($request){

        $validatedData = $request->validate([
            'fixture_id'=>['required','numeric','exists:fixtures,id'],
            'club_id'=>['required','numeric','exists:clubs,id'],
            'player_id'=>['required','numeric','exists:players,id'],
            'event_id'=>['required','numeric','max:3','min:1'],
            'minute'=>['required','numeric','max:120','min:1'],
            'assist_player_id'=>['numeric','exists:players,id','different:player_id'],
        ]);


        return MatchDetails::create($validatedData);
    }

    public function deleteMatchEvent($request){

        $validatedData = $request->validate([
            'id'=>['required','numeric'],
        ]);

        return MatchDetails::destroy($validatedData['id']);
    }

}