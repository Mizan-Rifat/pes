<?php

namespace App\Http\Controllers;

use App\Http\Resources\PlayerModelCollection;
use App\Http\Resources\PlayerModelresource;
use App\Model\PlayerModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class PlayerModelController extends Controller
{
    public function index(Request $request){
        $qb = PlayerModel::query();

        if($request->has('search')){

            $qb->where('name','LIKE','%'.$request->search.'%')
            ->orWhere('position','LIKE','%'.$request->search.'%')
            ->orWhere('id',$request->search);
            // ->orWhere('id','LIKE','%'.$request->search.'%');

        }


        $players = $qb->get();
        // $players = $qb->paginate($request->has('limit') ? $request->limit : 10);

        return new PlayerModelCollection($players);
    }

    public function store(Request $request){

        // return $data = $request->data;

        $validatedRequest = $request->validate([
            'image' => 'required | image | max:1000',
            'data' => 'required',
        ]);

        $data = json_decode($validatedRequest['data'], true);
        
        $rules = [
            'name'=>['required',],
            'model_id'=>['required','numeric',['numeric','unique:playermodels,id']],
            'position'=>['required'],
            'type'=>['required','numeric','max:4','min:1']
        ];

        $validatedData = Validator::make($data, $rules)->validate();

        $validatedRequest['image']->storeAs('players',$validatedData['model_id'].'.png');

        

        $player = PlayerModel::create($validatedData);

        return response()->json([
            'data' => new PlayerModelresource($player),
            'message'=> 'Player Model Added.'
        ]);
    }

    public function update(Request $requset,PlayerModel $playerModel){


        $validatedData = $requset->validate([
            'name'=>['regex:/^[a-zA-Z ]+$/'],
            'model_id'=>['numeric','unique:playermodels,id,'.$playerModel->id],
            'position'=>['regex:/^[a-zA-Z]+$/'],
            'type'=>['numeric','max:4','min:1']
        ]);

        $playerModel->update($validatedData);

        return response()->json([
            'data'=>new PlayerModelresource($playerModel),
            'message' => 'Player updated successfully.',
        ],200);
    }

  

    public function destroy(PlayerModel $playerModel){

        $delete = $playerModel->delete();

        Storage::delete('/players/'.$playerModel->model_id.'.png');


        if($delete){
            return response()->json([
                'data'=>$playerModel->id,
                'message' => 'Player removed successfully.',
            ],200);
            }else{
                return response()->json([
                    'message' => 'Player not removed.',
                ],500);
            }
        
    }
}
