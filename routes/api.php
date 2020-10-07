<?php

use App\Http\Resources\ClubModelResource;
use App\Model\ClubTournament;
use App\Http\Resources\ClubResource;
use App\Http\Resources\MatchImageResource;
use App\Http\Resources\MatchResultResource;
use App\Http\Resources\OfficialResource;
use App\Http\Resources\PlayerModelCollection;
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
use App\Model\PlayerModel;
use App\Model\Tournament;
use App\Notifications\AddedAsOfficial;
use App\Notifications\AddedInTournament;
use App\Notifications\FixtureCreated;
use App\Notifications\MatchResultApproved;
use App\Notifications\ResultSubmitted;
use App\Notifications\UserRegistered;
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

    return new ClubModelResource(ClubModel::find(1));
    Storage::delete('/images/sdf','4757.png');
    return;
    $qb = PlayerModel::query();
    if($request->has('q')){
        $qb->where('name','LIKE','%'.$request->q.'%')
        ->orWhere('position','LIKE','%'.$request->q.'%')
        ->orWhere('id','LIKE','%'.$request->q.'%');
    }
    if($request->has('sortby')){
        //Handle default parameter of get with second argument
        $qb->orderBy($request->get('sortBy'), $request->get('direction', 'ASC'));
    }

    return $qb->paginate();




    $players = PlayerModel::paginate(10);

    return new PlayerModelCollection($players);
//    Notification::send(User::first(),new UserRegistered(12));
    
    // Cache::put('info',[
    //     'season'=>'Sep21',
    //     'pre_season'=>true
    // ]);


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
Route::get('/fixture/details/{fixture_id}','FixtureController@getFixtureDetails');
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



Route::get('/clubmodel/search','ClubController@searchModel');
Route::post('/clubs/sendinvitation','ClubController@sendInvitation'); 


Route::group(['prefix'=>'club'],function(){

    Route::get('/search','ClubController@search');
    Route::get('/{ref}','ClubController@show');                 
    Route::post('/','ClubController@create');  
    Route::put('/{id}','ClubController@update'); 
    
});

Route::group(['prefix'=>'player'],function(){
    Route::post('/','PlayerController@addPlayer');  
    Route::put('/{player_id}','PlayerController@updatePlayer');  
    Route::delete('/{player}','PlayerController@removePlayer');
    Route::get('/search','PlayerController@search');   
    
});


Route::get('/playermodels','PlayerModelController@index');
Route::group(['prefix'=>'playermodel'],function(){
      
    Route::post('/','PlayerModelController@store');  
    Route::put('/{playerModel}','PlayerModelController@update');  
    Route::delete('/{playerModel}','PlayerModelController@destroy');
    Route::get('/search','PlayerController@search');   
    
});

Route::get('/clubmodels','ClubModelController@index');
Route::group(['prefix'=>'clubmodel'],function(){
      
    Route::post('/','ClubModelController@store');  
    Route::put('/{clubModel}','ClubModelController@update');  
    Route::delete('/{clubModel}','ClubModelController@destroy');   
    
});



// -----------Clubs_End----------



// -----------results-----------

Route::get('/result/{fixture_id}','ResultController@show');  // ?id return:single match details


Route::put('/result/event/{event}','MatchEventController@update'); 
Route::post('/result/event/add','MatchEventController@create'); 
Route::delete('/result/event/{event}','MatchEventController@delete'); 

Route::put('/result/rating/{rating}','MatchRatingController@update'); 
Route::post('/result/rating','MatchRatingController@create'); 
Route::delete('/result/rating/{rating}','MatchRatingController@delete'); 

Route::post('/result/image/add','MatchImageController@addImages'); 
Route::delete('/result/image/{image}','MatchImageController@removeImage'); 

Route::put('/result/submit/{fixture_id}','ResultController@submit'); 
Route::put('/result/approve/{fixture_id}','ResultController@approveResult');  // ?id return:events,ratings,team1,team2
Route::post('/result/reject','ResultController@rejectResult');  


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

Broadcast::routes();