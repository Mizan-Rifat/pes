<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

class PlayerController extends Controller
{
    public function bal(){
        return User::find(1);
    }
}
