<?php

namespace App\Repositories;

use App\Http\Resources\ClubResource;
use App\Model\Club;
use App\Model\Player;
use App\Repositories\Traits\BaseRepository;
use App\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class ClubRepository
{

    use BaseRepository;

    protected $model;

    public function __construct() {
        $this->model = new Club();
    }

    public function getByReference($reference,$with=[]){
        return $this->model
                    ->where('id',$reference)
                    ->orWhere('slug',$reference)
                    ->with($with)
                    ->firstOrFail();
    }

    public function sendInvitation($request){
// return $request;
        $validatedData = $request->validate([
            'club_ids.*' => ['integer','distinct','exists:clubs,id'],
            'tournament_ids.*' => ['integer','distinct','exists:tournaments,id'],
        ]);
            // dd($validatedData);
            $clubs_ids = collect($validatedData['club_ids']);
            $tournament_ids = collect($validatedData['tournament_ids']);

            $join = $clubs_ids->crossJoin($tournament_ids)->map(function($item){
                return [
                    'club_id' => $item[0],
                    'tournament_id' => $item[1],
                    'invitation'=>2
                ];
            })->toArray();

           

            $insert = DB::table('club_tournament')
                ->insert($join);
            
            return $insert;

    }


    public function addClubInTournament($request){
        $validatedData = $request->validate([
            'club_id' => ['required','integer'],
            'tournament_id' => ['required','integer'],
        ]);

        $rule = DB::table('club_tournament')
                ->where('club_id',$validatedData['club_id'])
                ->where('tournament_id',$validatedData['tournament_id'])
                ->exists();

        if($rule){
            abort(500,'The club is already added.');
        }

        $insert = DB::table('club_tournament')
                ->insert($validatedData);

        return $insert;

    }


    public function removeClubsFromTournament($request){

        $delete = DB::table('club_tournament')
                ->whereIn('club_id',$request['club_ids'])
                ->where('tournament_id',$request['tournament_id'])
                ->delete();

        return $delete;

    }
    public function removePlayersFromClub($request){

        $club_id = Auth::user()->club->id;

        $validatedData = $request->validate([
            'club_id' => ['required','integer','in:'.$club_id],
            'player_ids'=>['required','array'],
            'player_ids.*'=>['integer'],
        ]);

        $delete = DB::table('players')
                ->whereIn('id',$validatedData['player_ids'])
                ->where('club_id',$validatedData['club_id'])
                ->delete();

        return $delete;

    }

    public function addPlayerToSquad($request){

        $club_id = Auth::user()->club->id;

        $validatedData = $request->validate([
            'club_id' => ['required','integer','in:'.$club_id],
            'playermodel_id' => ['required','bail','integer','exists:playermodels,id',
                                    Rule::unique('players')->where(function ($query) use($club_id){
                                        return $query->where('club_id', $club_id);
                                    })    
                                ],
            'jersey' => ['required','integer',Rule::unique('players')->where(function ($query) use($club_id){
                return $query->where('club_id', $club_id);
            })],
        ],
        [
            'playermodel_id.unique' => 'The Player Is Already In This Squad.'
        ]
        );


        $player = Player::create($validatedData);

        return $player;
    }


    public function updateClub($request){

        $user = User::with('club')->find(Auth::id());
        $club = $user->club;

        $validatedData = $request->validate([
            'id'=>['required','numeric',function($attribute,$value,$fail) use($club){
                if($value != $club->id){
                    $fail('You don\'t have permission to do this.');
                }
            }],
            'name' => ['max:20','min:2',Rule::unique('clubs')->ignore($club)],
            // 'name' => ['max:20','min:2','unique:clubs,name,'.Auth::user()->club['name']],
            'owner_id' => ['string'],
            'model_id'=>['numeric'],

        ]);

        $club->update($validatedData);

        return $club;
    }

    public function createClub($request){
        $validatedData = $request->validate([
            'name' => ['required','max:20','min:2','unique:clubs,name,','regex:/[a-zA-Z][a-zA-Z ]+/'],
            'owner_id' => ['required','string','regex:/^\d{3}-\d{3}-\d{3}$/'],
            'model_id'=>['required','numeric'],
        ]);
        $validatedData['name'] = strtoupper($validatedData['name']);
        $validatedData['slug'] = str_replace(' ','',(strtolower($validatedData['name'])));
        $validatedData['owner_user_id'] = Auth::id();

        $club = $this->model->create($validatedData);

        return $club;
    }
    
    
}
