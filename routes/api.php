<?php

use App\Model\ClubTournament;
use App\Http\Resources\ClubResource;
use App\Http\Resources\MatchImageResource;
use App\Http\Resources\MatchResultResource;
use App\Http\Resources\OfficialResource;
use App\Http\Resources\PlayerResource;
use App\Http\Resources\UserResource;
use App\Model\Admin;
use App\Model\Club;
use App\Model\ClubModel;
use App\Model\Fixture;
use App\Model\MatchImage;
use App\Model\MatchRating;
use App\Model\Official;
use App\Model\Player;
use App\Model\Tournament;
use App\Notifications\AddedAsOfficial;
use App\Notifications\AddedInTournament;
use App\Notifications\FixtureCreated;
use App\Notifications\MatchResultApproved;
use App\Notifications\ResultSubmitted;
use App\Notifications\WelcomeUser;
use App\Repositories\ClubModelRepository;
use App\Repositories\TournamentRepository;
use App\User;
use Facade\FlareClient\Stacktrace\File;
use GuzzleHttp\Middleware;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Broadcast;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Notification;
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


// Route::middleware('auth:sanctum_admin')->get('/admin', function (Request $request) {
//     return $request->user();
// });
Route::middleware('auth:sanctum_admin')->get('/admin', 'AdminController@getCurrentAdmin');

Route::group(['middleware'=>'adminGuard'],function(){
    Route::post('/admin/login', 'Auth\LoginController@login');
    Route::post('/admin/logout', 'Auth\LoginController@logout');

});

Route::get('/test',function(Request $request){

    $user = User::with('club')->find(1);

    if($user->club){
        return 'a';
    }else{
        return 'b';
    }

    if(Auth::guard('admin')->check()){
        return 'asfdas';
    }else{
        return 'bbbbbbb';
    }
    
    Cache::put('info',[
        'season'=>'Sep21',
        'pre_season'=>true
    ]);


    // Notification::send(User::find(57),new WelcomeUser());

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

Route::group(['prefix'=>'','middleware'=>['auth']],function(){

});

Route::group(['prefix'=>'tournament'],function(){

    Route::get('/{ref}','TournamentController@show'); // ?slug / ?id
    Route::post('/create','TournamentController@create'); // ?slug / ?id
    Route::delete('/{tournament}','TournamentController@destroy'); // ?slug / ?id
    Route::put('/{tournament}','TournamentController@update');
    Route::get('/players','TournamentController@getPlayers'); // ?slug / ?id
    Route::get('/players/stats/{tournament_id}','TournamentController@getPlayerStats'); // ?slug / ?id
    Route::get('/standings/{tournament_id}','TournamentController@getPoinTable');
    
});

Route::get('/fixture/{fixture_id}','FixtureController@show'); // ?fixture_id

Route::post('/deletefixture','FixtureController@destroy'); // ?ids
Route::post('/updatefixture','FixtureController@updateFixture'); 
Route::post('/createfixture','FixtureController@createFixture'); 

Route::get('/club/fixtures','FixtureController@getFixturesByClub'); // ?club_id,tournament_id
Route::get('/club/fixtures/home','FixtureController@getClubHomeFixtures'); // ?club_id,tournament_id
Route::get('/club/fixtures/away','FixtureController@getClubAwayFixtures'); // ?club_id,tournament_id

// -----------Fixtures_End---------

// ----TOURNAMNET----------



Route::get('/tournaments','TournamentController@index');
Route::get('/tournament/groups','TournamentController@getTournamentGroups'); // ?tournament_id

// ?tournament_id


Route::get('/tournament/clubs/{id}','TournamentClubsController@getClubs');// ?tournament_id
Route::get('/tournament/clubs/details','TournamentController@getClubsWithDetails');// ?tournament_id

Route::post('/tournament/club/add','TournamentClubsController@addClubInTournament');// ?tournament_id ?club_id
Route::post('/tournament/club/remove','TournamentClubsController@removeClubFromTournament');// ?tournament_id ?club_ids

Route::get('/tournament/results/{tournament_id}','TournamentResultsController@index');


Route::get('/tournament/fixtures/{tournament_id}','FixtureController@index'); // ?tournament_id / ?tournament_slug
Route::post('/tournament/fixtures/create/{tournament}','FixtureController@create'); // ?tournament_id / ?tournament_slug
Route::get('/tournament/fixtures/submitted','TournamentController@getSubmittedFixtures'); // ?tournament_id / ?tournament_slug

Route::get('/tournament/officials/{tournament_id}','TournamentOfficialsController@index'); // ?tournament_id / ?tournament_slug
Route::post('/tournament/officials/add','TournamentOfficialsController@addOfficial'); // ?tournament_id / ?user_id
Route::post('/tournament/officials/remove','TournamentOfficialsController@removeOfficial'); // ?tournament_id / ?user_ids

// -----------Tournament_End----------


// -----------Clubs-----------
Route::get('/allclubs','ClubController@index');

Route::get('/club/{ref}','ClubController@show'); 

Route::get('/clubmodel/search','ClubController@searchModel');
Route::post('/clubs/sendinvitation','ClubController@sendInvitation'); 


Route::group(['prefix'=>'club'],function(){

    Route::get('/search','ClubController@search');                
    Route::post('/','ClubController@create');  
    Route::put('/{id}','ClubController@update'); 
    
});

Route::group(['prefix'=>'player'],function(){
    Route::post('/','PlayerController@addPlayer');  
    Route::put('/{player_id}','PlayerController@updatePlayer');  
    Route::delete('/{player}','PlayerController@removePlayer');
    Route::get('/search','PlayerController@search');   
    
});
Route::get('/clubmodels','ClubController@getAllModels');  


// -----------Clubs_End----------



// -----------results-----------

Route::get('/result','ResultController@getResultDetails');  // ?id return:single match details

Route::get('/result/submitted/{fixture_id}','ResultController@getSubmittedResultDetails');  // ?id return:single match details

Route::put('/result/event/{event}','MatchEventController@update'); 
Route::post('/result/event/add','MatchEventController@create'); 
Route::delete('/result/event/{event}','MatchEventController@delete'); 

Route::put('/result/rating/{rating}','MatchRatingController@update'); 
Route::post('/result/rating/add','MatchRatingController@create'); 
Route::delete('/result/rating/{rating}','MatchRatingController@delete'); 

Route::post('/result/image/add','ResultController@addImage'); 
Route::post('/result/image/delete','ResultController@deleteMatchImage'); 

Route::post('/result/ratings/update','ResultController@updateMatchRatings'); 
Route::post('/result/delete/rating','ResultController@deleteMatchRating'); 

Route::post('/result/add/rating','ResultController@addMatchRating'); 

Route::post('/result/add','ResultController@addMatchResult'); 

Route::get('/resultdetails','ResultController@getResultDetails');  // ?id return:events,ratings,team1,team2
Route::post('/result/approve','ResultController@approveResult');  // ?id return:events,ratings,team1,team2
Route::post('/resulttest','ResultController@test');  // ?id return:events,ratings,team1,team2


// -----------results_End----------


// -----------users-----------

Route::group(['prefix'=>'user'],function(){
    Route::get('/search','UserController@search');  // ?query
    Route::get('/user/details/{id}','UserController@getUser');
    Route::put('/{user}','UserController@update'); 
    Route::delete('/{user}','UserController@destroy'); 
});
Route::get('/users','UserController@index'); 

Route::middleware('auth:sanctum_user')->get('/user','UserController@getCurrentUser');


Route::group(['prefix'=>'notification'],function(){
    Route::put('/markasread/{id}','NotificationController@notificationMarkAsRead'); 
    Route::put('/markasunread/{id}','NotificationController@notificationMarkAsUnRead'); 
    Route::delete('/{id}','NotificationController@destroy'); 

});
  

Route::post('/ginfo/update','GinfoController@update'); 
Route::get('/ginfo','GinfoController@index'); 



// -----------users_End-----------



// ----------Players-----------


// -----------Clubs_End-----------



Route::get('/teams/logo','UserController@getTeamsLogo');

Broadcast::routes(['middleware' => ['auth:sanctum']]);