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

Route::get('api/pes', function () {
    $clubrepo = new ClubRepository;
    return $clubrepo->test();

    
    $user = User::where('id',1)->with('club')->first();
    return new UserResource($user);

    $players = Player::with('club','details')->get();
    return PlayerResource::collection($players);


    return new PlayerResource(Player::where('id',1)->with('club','model')->first());


    return new ClubResource(Club::where('id',1)->with('owner','tournaments')->first());
    $club = Club::where('id',1)->with('owner')->first(); 
    return($club->owner['name']);
    dd(Club::where('id',1)->with('owner')->get());
});



Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
Route::get('/test', 'TournamentController@test');
