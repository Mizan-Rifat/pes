<?php

namespace App\Policies;

use App\Model\Club;
use App\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Support\Facades\Auth;

class ClubPolicy
{
    use HandlesAuthorization;

    public function before()
    {
        if (Auth::guard('admin')->check()) {
            return true;
        }
    }

    public function create(User $user)
    {
        if($user->club){
            return false;
        }else{
            return true;
        }
    }

    public function update(User $user, Club $club)
    {
        return $user->club->id == $club->id;
    }

    public function delete(User $user, Club $club)
    {
        //
    }
}
