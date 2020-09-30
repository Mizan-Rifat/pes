<?php

namespace App\Policies;

use App\Model\Player;
use App\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Support\Facades\Auth;

class PlayerPolicy
{
    use HandlesAuthorization;

    public function before()
    {
        if (Auth::guard('admin')->check()) {
            return true;
        }
    }

    public function add(User $user,int $club_id){
        return $user->club->id == $club_id;
    }
    public function remove(User $user,Player $player){
        return $user->club->id == $player->club_id;
    }
    public function update(User $user,Player $player){
        return $user->club->id == $player->club_id;
    }
}
