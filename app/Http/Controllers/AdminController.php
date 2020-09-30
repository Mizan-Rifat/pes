<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Model\Admin;
use App\Repositories\AdminRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdminController extends Controller
{
    private $adminRepo;

    public function __construct(AdminRepository $adminRepo) {
        $this->adminRepo = $adminRepo;
    }

    public function getCurrentAdmin(){
        $admin = $this->adminRepo->getCurrentAdmin();

        return new UserResource($admin);
    }
}
