<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Providers\RouteServiceProvider;
use App\Repositories\AdminRepository;
use App\Repositories\UserRepository;
use App\User;
use Illuminate\Auth\SessionGuard;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    private $userRepo;
    private $adminRepo;
    private $sessionGuard;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = RouteServiceProvider::HOME;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(UserRepository $userRepo,AdminRepository $adminRepo)
    {
        $this->userRepo = $userRepo;
        $this->adminRepo = $adminRepo;
        $this->middleware('guest')->except('logout');
    }

    protected function authenticated(Request $request, $user)
    {
        $user = $this->userRepo->getCurrentUser();

        if(Auth::guard()->name == 'admin'){
            $user = $this->adminRepo->getCurrentAdmin();
        }

        return new UserResource($user);
    }
}
