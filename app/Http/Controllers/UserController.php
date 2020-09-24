<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Repositories\UserRepository;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpKernel\Exception\HttpException;

class UserController extends Controller
{
    private $userRepo;

    public function __construct(UserRepository $userRepo) {
        $this->userRepo = $userRepo;
    }

    public function getAllUsers(){
        $users = $this->userRepo->with('club')->get();
        return UserResource::collection($users);
    }

    public function getCurrentUser(){
      
        $user = $this->userRepo->getCurrentUser();
        return new UserResource($user);
    
    }
    
    public function getUser($id){
        $user = $this->userRepo->with('club.players')->findOrFail($id);
        return new UserResource($user);
    }

    public function update(Request $request){

        $user = $this->userRepo->updateUser($request);

        return response()->json([
            'message'=>'Update Successfull',
            'data'=>new UserResource($user)
        ],200);
        
    }


    public function destroy(Request $request){

        $delete = $this->userRepo->destroyById($request->id);

        if($delete){
            return response()->json([
                'message' => count($request->id) > 1 ? 'Users  removed successfully.' : 'User removed successfully.',
            ],200);
        }else{
            return response()->json([
                'message' => count($request->id) > 1 ? 'Users not deleted.' : 'User not deleted.',
            ],500);
        }
    }

    public function block(Request $request){
        $this->userRepo->blockById($request->ids);

        return response()->json([
            'message' => 'Operation successfull.',
        ],200);

       
    }

    public function search(Request $request){

        $users = $this->userRepo->searchUser($request->get('query'));

        return UserResource::collection($users);
    }

    public function getTeamsLogo(){
        $path = public_path('/images/teams');
        $files = scandir($path);
        
        array_splice($files, 0, 2);

        return collect($files)->map(function($item){
            return asset('/images/teams/'.$item);
        });
    }

    public function notificationMarkAsRead($id){
        Auth::user()->Notifications->find($id)->markAsRead();
        return response()->json([
            'data'=>$id,
            'message' => 'success',
        ],200);

    }
    public function notificationMarkAsUnRead($id){
        Auth::user()->Notifications->find($id)->markAsUnRead();
        return response()->json([
            'data'=>$id,
            'message' => 'success',
        ],200);

    }
    public function notificationDelete($id){
        Auth::user()->Notifications->find($id)->delete();
        return response()->json([
            'data'=>$id,
            'message' => 'success',
        ],200);

    }

  


}
