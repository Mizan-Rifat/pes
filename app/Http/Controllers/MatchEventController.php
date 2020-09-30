<?php

namespace App\Http\Controllers;

use App\Http\Resources\MatchEventsResource;
use App\Model\MatchDetails;
use App\Model\MatchEvent;
use App\Repositories\ResultRepository;
use Illuminate\Http\Request;

class MatchEventController extends Controller
{
    protected $resultRepo;

    public function __construct(ResultRepository $resultRepo) {
        $this->resultRepo = $resultRepo;
    }

    public function addEvent(Request $request){

      $event = $this->resultRepo->addMatchEvent($request);

        return response()->json([
            'message'=>'Event Created',
            'data'=>new MatchEventsResource($event)
        ],200);
    }

    public function update(Request $request,MatchEvent $event){
        $updatedEvent = $this->resultRepo->updateMatchEvent($request,$event);
        
        return response()->json([
            'message'=>'Update Successfull',
            'data'=>new MatchEventsResource($updatedEvent)
        ],200);
    }

    public function delete(MatchEvent $matchEvent){

        $delete = $matchEvent->delete();

        if($delete){
            return response()->json([
                'data'=>$matchEvent->id,
                'message' => 'Event(s) removed successfully.',
            ],200);
            }else{
                return response()->json([
                    'message' => 'Event(s) not removed.',
                ],500);
            }
    }


}
