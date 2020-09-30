<?php

namespace App\Providers;

use App\Model\Club;
use App\Model\Player;
use App\Model\Tournament;
use App\Policies\ClubPolicy;
use App\Policies\PlayerPolicy;
use App\Policies\TournamentPolicy;
use App\Policies\UserPolicy;
use App\User;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [

        User::class => UserPolicy::class,
        Tournament::class => TournamentPolicy::class,
        Player::class => PlayerPolicy::class,
        Club::class => ClubPolicy::class
        
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        //
    }
}
