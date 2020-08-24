<?php

namespace App\Repositories;

use App\Repositories\Traits\BaseRepository;
use App\User;

class UserRepository
{
    use BaseRepository;

    protected $model;

    public function __construct() {
        $this->model = new User();
    }

    public function updateUsers($request){

        $validatedData = $request->validate([
            'name' => ['required','max:20','min:2'],
            'email' => ['required','email'],
            'blocked' => ['nullable','boolean'],
            'password' => ['confirmed','min:6'],
        ]);

        $user = $this->model->with('club')->findOrFail($request->id);

        $user->update($validatedData);

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
