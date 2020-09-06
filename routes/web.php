<?php

use App\Http\Resources\ClubResource;
use App\Http\Resources\FixtureResource;
use App\Http\Resources\MatchResultResource;
use App\Http\Resources\PlayerResource;
use App\Http\Resources\TournamentResource;
use App\Http\Resources\UserResource;
use App\Model\Club;
use App\Model\Fixture;
use App\Model\MatchDetails;
use App\Model\MatchRating;
use App\Model\MatchResult;
use App\Model\Player;
use App\Model\PlayerModel;
use App\Model\Tournament;
use App\Repositories\ClubRepository;
use App\Repositories\FixtureRepository;
use App\Repositories\TournamentRepository;
use App\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::get('{reactRoutes}', function () {
    return view('main'); 
    })->where('reactRoutes', '^((?!api).)*$');

// Route::get('/', function () {
//     return view('main');
// });

Route::middleware('adminGuard')->post('/admin/login','Auth\LoginController@login');
Route::middleware('adminGuard')->post('/admin/logout','Auth\LoginController@logout');




Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
Route::get('/test', 'TournamentController@test');
