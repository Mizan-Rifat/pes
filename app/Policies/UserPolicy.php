<?php

namespace App\Policies;

use App\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Support\Facades\Auth;

class UserPolicy
{
    use HandlesAuthorization;

    public function before()
    {
        if (Auth::guard('admin')->check()) {
            return true;
        }
    }

   
    public function update(User $user, User $model)
    {
        return $user->id == $model->id;
    }

    public function delete()
    {

    }
}
