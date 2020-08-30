<?php

use App\Model\ClubTournament;
use App\Http\Resources\ClubResource;
use App\Http\Resources\MatchResultResource;
use App\Http\Resources\OfficialResource;
use App\Http\Resources\PlayerResource;
use App\Http\Resources\UserResource;
use App\Model\Club;
use App\Model\Fixture;
use App\Model\MatchRating;
use App\Model\Official;
use App\Model\Player;
use App\Model\Tournament;
use App\Repositories\TournamentRepository;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/test',function(Request $request){

    $tr =new TournamentRepository();
    $player = $tr->getTournamentGroups(9);

    return $player;
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
Route::get('/clubs/search','ClubController@search');  // ?query
Route::post('/clubs/sendinvitation','ClubController@sendInvitation');  // ?query
Route::post('/club/add/player','ClubController@addPlayerToClub');  
Route::post('/club/remove/player','ClubController@removePlayerFromClub');  


// -----------Clubs_End----------

// -----------results-----------

Route::get('/result','ResultController@getResultDetails');  // ?id return:single match details

Route::post('/result/update/event','ResultController@matchEventUpdate'); 
Route::post('/result/delete/event','ResultController@deleteMatchEvent'); 
Route::post('/result/delete/rating','ResultController@deleteMatchRating'); 
Route::post('/result/add/event','ResultController@addMatchEvent'); 
Route::post('/result/add/rating','ResultController@addMatchRating'); 
Route::post('/result/add','ResultController@addMatchResult'); 

Route::get('/resultdetails','ResultController@getResultDetails');  // ?id return:events,ratings,team1,team2


// -----------results_End----------


// -----------users-----------

Route::get('/users/search','UserController@search');  // ?query
Route::get('/user/details/{id}','UserController@getUser');  
Route::get('/allusers','UserController@getAllUsers'); 
Route::post('/updateuser','UserController@update'); 
Route::post('/deleteuser','UserController@destroy'); 
Route::post('/blockusers','UserController@block'); 


// -----------users_End-----------



// ----------Players-----------

Route::get('/players/search','PlayerController@search');  // ?query
Route::post('/players/update','PlayerController@update');  // ?query


// -----------Clubs_End-----------