<?php

namespace App\Policies;

use App\Model\Tournament;
use App\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Support\Facades\Auth;

class TournamentPolicy
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
        
    }

    public function update(User $user, Tournament $tournament)
    {
        
    }

    public function delete(User $user, Tournament $tournament)
    {
        //
    }
    public function addClubInTournament(){
        
    }
    public function removeClubFromTournament(){
        
    }

}
