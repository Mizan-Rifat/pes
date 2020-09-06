<?php

namespace App\Repositories;

use App\Repositories\Traits\BaseRepository;
use App\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserRepository
{
    use BaseRepository;

    protected $model;

    public function __construct() {
        $this->model = new User();
    }

    public function updateUser($request){

        $validatedData = $request->validate([
            'id'=>['required','numeric'],
            'name' => ['max:20','min:2'],
            'email' => ['email','unique:users,email,'.Auth::id()],
            'blocked' => ['nullable','boolean'],
            'old_password' => [
                'nullable', function ($attribute, $value, $fail) {
                    if (!Hash::check($value, Auth::user()->password)) {
                        $fail('Old Password didn\'t match');
                    }
                },
            ],
            'password' => ['nullable','confirmed','min:8'],
            'fbID'=>['nullable','unique:users,fbID,'.Auth::id()]
        ]);

        unset($validatedData['old_password']);

        if(isset($validatedData['password'])){
            $validatedData['password'] = Hash::make($validatedData['password']);
        }

        if($validatedData['id'] != Auth::id()){
            abort(403,"You don't have permission for this operation.");
        }

        $user = $this->model->with('club.players')->findOrFail($validatedData['id']);

        // $user->update($validatedData);

        return $user;
    }
    

    public function destroyById($ids){

        $delete = $this->model->whereIn('id',$ids)->delete();

        return $delete;
    }

    public function blockById($ids){

        $users = $this->model->findOrFail($ids);

        $users->map(function($user){
            $user->toggleBlock();
        });

        

    }

    public function searchUser($query){
        $users = $this->model->where('name', 'LIKE', '%' . $query . '%')->limit(5)->get();

        return $users;
    }

    
}
