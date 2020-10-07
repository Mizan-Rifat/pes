<?php

namespace App\Http\Controllers;

use App\Http\Resources\ClubModelResource;
use App\Model\ClubModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class ClubModelController extends Controller
{
    public function index(){
        $clubModels = ClubModel::all();

        return ClubModelResource::collection($clubModels);
    }

    public function store(Request $request){

        $validatedRequest = $request->validate([
            'logo' => 'required | image | max:1000',
            'data' => 'required',
        ]);

        $data = json_decode($validatedRequest['data'], true);
        
        $rules = [
            'name'=>['required',],
            'model_id'=>['required','numeric',['numeric','unique:playermodels,id']],
        ];

        $validatedData = Validator::make($data, $rules)->validate();
        
        $validatedData['logo'] = $validatedRequest['logo']->hashName();

        $validatedRequest['logo']->storeAs('club_logo',$validatedData['logo']);

        $club = ClubModel::create($validatedData);

        return response()->json([
            'data' => new ClubModelresource($club),
            'message'=> 'Player Model Added.'
        ]);
    }

    public function update(Request $request,ClubModel $clubModel){

        
        $validatedData = $request->validate([
            'name'=>['regex:/^[a-zA-Z ]+$/'],
            'model_id'=>['numeric',['numeric','unique:playermodels,id,'.$clubModel->id]],
        ]);

        $clubModel->update($validatedData);

        return response()->json([
            'data'=>new ClubModelResource($clubModel),
            'message' => 'Club updated successfully.',
        ],200);
    }

    public function destroy(ClubModel $clubModel){
        $delete = $clubModel->delete();

        Storage::delete('/club_logo/'.$clubModel->logo);

        if($delete){
            return response()->json([
                'data'=>$clubModel->id,
                'message' => 'Club removed successfully.',
            ],200);
            }else{
                return response()->json([
                    'message' => 'Club not removed.',
                ],500);
            }
    }
}
