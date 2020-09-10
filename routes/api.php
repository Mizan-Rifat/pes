<?php

use App\Model\ClubTournament;
use App\Http\Resources\ClubResource;
use App\Http\Resources\MatchImageResource;
use App\Http\Resources\MatchResultResource;
use App\Http\Resources\OfficialResource;
use App\Http\Resources\PlayerResource;
use App\Http\Resources\UserResource;
use App\Model\Club;
use App\Model\ClubModel;
use App\Model\Fixture;
use App\Model\MatchImage;
use App\Model\MatchRating;
use App\Model\Official;
use App\Model\Player;
use App\Model\Tournament;
use App\Repositories\ClubModelRepository;
use App\Repositories\TournamentRepository;
use App\User;
use Facade\FlareClient\Stacktrace\File;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::middleware('auth:sanctum_admin')->get('/admin', function (Request $request) {
    return $request->user();
});

Route::get('/test',function(Request $request){
    return Fixture::find(34)->team1_id;

});

Route::get('/rename',function(Request $request){
    $path = public_path('/images/teams');
    $files = scandir($path);

    // return str_replace('e_','',$files[3]);
    
    array_splice($files, 0, 2);

    collect($files)->map(function($item){
        // rename(public_path('/images/teams/'.$item),public_path('images/teams/'.str_replace('e_','',$item)));
        rename(public_path('/images/teams/'.$item),public_path('images/teams/'.str_replace('_f_l','',$item)));
    });

    // rename(public_path('/images/teams/e_000001_r_l.png'),public_path('images/teams/000001.png'));
  
});
Route::get('/test2','TournamentController@getFixtureById');


// ----FIXTURES----------

Route::get('/fixture','FixtureController@getFixtureById'); // ?fixture_id
Route::get('/createfixtures','FixtureController@createFixtures'); // ?tournament_id
Route::post('/deletefixture','FixtureController@destroy'); // ?ids
Route::post('/updatefixture','FixtureController@updateFixture'); 
Route::post('/createfixture','FixtureController@createFixture'); 

Route::get('/club/fixtures','FixtureController@getFixturesByClub'); // ?club_id,tournament_id
Route::get('/club/fixtures/home','FixtureController@getClubHomeFixtures'); // ?club_id,tournament_id
Route::get('/club/fixtures/away','FixtureController@getClubAwayFixtures'); // ?club_id,tournament_id

// -----------Fixtures_End---------

// ----TOURNAMNET----------



Route::get('/alltournaments','TournamentController@index');
Route::get('/tournament','TournamentController@getTournament'); // ?slug / ?id
Route::post('/tournament/create','TournamentController@create'); // ?slug / ?id
Route::post('/tournament/delete','TournamentController@destroy'); // ?slug / ?id
Route::get('/tournament/details','TournamentController@getTournamentDeatils'); // ?slug / ?id
Route::get('/tournament/players','TournamentController@getPlayers'); // ?slug / ?id
Route::get('/tournament/players/stats','TournamentController@getPlayerStats'); // ?slug / ?id

Route::get('/tournament/groups','TournamentController@getTournamentGroups'); // ?tournament_id

Route::get('/tournament/standings','TournamentController@getPoinTable');// ?tournament_id


Route::get('/tournament/clubs','TournamentController@getClubs');// ?tournament_id
Route::get('/tournament/clubs/details','TournamentController@getClubsWithDetails');// ?tournament_id
Route::post('/tournament/clubs/add','ClubController@addClubsInTournament');// ?tournament_id ?club_id
Route::post('/tournament/clubs/remove','ClubController@removeClubsFromTournament');// ?tournament_id ?club_ids

Route::post('/tournament/update/info','TournamentController@update');

Route::get('/tournament/results','TournamentController@getResults');// ?tournament_id
Route::get('/tournament/fixtures','TournamentController@getFixtures'); // ?tournament_id / ?tournament_slug

Route::get('/tournament/officials','TournamentController@getOfficials'); // ?tournament_id / ?tournament_slug
Route::post('/tournament/officials/add','TournamentController@addOfficials'); // ?tournament_id / ?user_id
Route::post('/tournament/officials/remove','TournamentController@removeOfficials'); // ?tournament_id / ?user_ids

// -----------Tournament_End----------


// -----------Clubs-----------
Route::get('/allclubs','ClubController@index'); 
Route::get('/club/{reference}','ClubController@getClub'); 
Route::get('/club/search','ClubController@search');  // ?query
Route::get('/clubmodel/search','ClubController@searchModel');  // ?query
Route::post('/club/create','ClubController@create');  // ?query
Route::post('/club/info/update','ClubController@update');  // ?query
Route::post('/clubs/sendinvitation','ClubController@sendInvitation');  // ?query
Route::post('/club/add/player','ClubController@addPlayerToClub');  
Route::post('/club/player/update','PlayerController@update');  
Route::post('/club/player/remove','ClubController@removePlayerFromClub');  
Route::get('/clubmodels','ClubController@getAllModels');  


// -----------Clubs_End----------

// -----------results-----------

Route::get('/result','ResultController@getResultDetails');  // ?id return:single match details
Route::get('/result/submitted','ResultController@getSubmittedResultDetails');  // ?id return:single match details

Route::post('/result/update/event','ResultController@matchEventUpdate'); 
Route::post('/result/delete/event','ResultController@deleteMatchEvent'); 

Route::post('/result/delete/rating','ResultController@deleteMatchRating'); 
Route::post('/result/add/event','ResultController@addMatchEvent'); 
Route::post('/result/add/rating','ResultController@addMatchRating'); 
Route::post('/result/add','ResultController@addMatchResult'); 

Route::get('/resultdetails','ResultController@getResultDetails');  // ?id return:events,ratings,team1,team2
Route::post('/result/approve','ResultController@approveResult');  // ?id return:events,ratings,team1,team2


// -----------results_End----------


// -----------users-----------

Route::get('/users/search','UserController@search');  // ?query
Route::get('/user/details/{id}','UserController@getUser');  
Route::get('/allusers','UserController@getAllUsers'); 
Route::post('/updateuser','UserController@update'); 
Route::post('/deleteuser','UserController@destroy'); 
Route::post('/blockusers','UserController@block');
Route::middleware('auth:sanctum_user')->get('/user','UserController@getCurrentUser');

// -----------users_End-----------



// ----------Players-----------

Route::get('/players/search','PlayerController@search');  // ?query
// Route::post('/players/update','PlayerController@update');  // ?query


// -----------Clubs_End-----------



Route::get('/teams/logo','UserController@getTeamsLogo');