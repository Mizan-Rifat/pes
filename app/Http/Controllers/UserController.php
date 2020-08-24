<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Repositories\UserRepository;
use App\User;
use Illuminate\Http\Request;
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

    public function getUser($id){
        $user = $this->userRepo->with('club.players')->findOrFail($id);
        return new UserResource($user);
    }

    public function update(Request $request){

        $user = $this->userRepo->updateUsers($request);

        return response()->json([
            'message'=>'Update Successfull',
            'user'=>new UserResource($user)
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

  


}
