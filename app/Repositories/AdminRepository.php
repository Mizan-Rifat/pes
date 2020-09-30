<?php

namespace App\Repositories;

use App\Model\Admin;
use App\Repositories\Traits\BaseRepository;
use App\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AdminRepository
{
    use BaseRepository;

    protected $model;

    public function __construct() {
        $this->model = new Admin();
    }

    public function getCurrentAdmin(){
        $admin = Auth::guard('admin')->user()->with('notifications')->first();
        return $admin;
    }


    
}
