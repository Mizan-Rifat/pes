<?php

namespace App\Repositories\Traits;

use App\Model\MatchEvent;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

trait EventRepository
{
    

    public function createEvents($events,$fixture_id){

        $eventRules = [
            '*.player_id' => 'required|numeric', 
            '*.event_id' => 'required|numeric|min:1|max:4', 
            '*.club_id' => 'required|numeric', 
            '*.minute' => 'required|numeric|max:120|min:1', 
            '*.assist_player_id' => 'numeric|different:*.player_id|nullable', 
            ];
        
        $validatedData = Validator::make($events,$eventRules)->validate();

        $allEvents = collect($validatedData)->map(function($item) use($fixture_id){
            $item['fixture_id'] = $fixture_id;
            return $item;
        })->toArray();
        
        return MatchEvent::insert($allEvents);
    }

    public function addMatchEvent($request){

        $eventRules = [
            'player_id' => 'required|numeric', 
            'event_id' => 'required|numeric|min:1|max:4', 
            'club_id' => 'required|numeric', 
            'minute' => 'required|numeric|max:120|min:1', 
            'assist_player_id' => 'numeric|different:*.player_id|nullable', 
            'fixture_id' => 'required|numeric', 
            ];
        
        $validatedData = $request->validate($eventRules);
        
        $event = MatchEvent::create($validatedData);
        return $event;
    }

    public function updateMatchEvent($request,$event){

        $validatedData = $request->validate([

            'id'=>['required','numeric'],
            'event_id' => ['min:1','max:3','numeric'],
            'player_id'=>['numeric','exists:players,id'],
            'minute'=>['min:1','max:120','numeric'],
            'assist_player_id'=>['numeric','exists:players,id','different:player_id'],

        ]);

        $event->update($validatedData);

        return $event;
    }

    public function deleteMatchEvent($request){

        $validatedData = $request->validate([
            'id'=>['required','numeric'],
        ]);

        return MatchEvent::destroy($validatedData['id']);
    }

}