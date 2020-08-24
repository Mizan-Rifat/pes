<?php

namespace App\Repositories;

use App\Http\Resources\ClubResource;
use App\Model\Club;
use App\Model\Player;
use App\Repositories\Traits\BaseRepository;
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

        $delete = DB::table('players')
                ->whereIn('id',$request['player_ids'])
                ->where('club_id',$request['club_id'])
                ->delete();

        return $delete;

    }

    public function addPlayerToSquad($request){

        $request['playermodel_id'] = $request['name'];

        unset($request['name']);

        $validatedData = $request->validate([
            'club_id' => ['required','integer','exists:clubs,id'],
            'playermodel_id' => ['required','bail','integer','exists:playermodels,id',
                                    Rule::unique('players')->where(function ($query) use($request){
                                        return $query->where('club_id', $request['club_id']);
                                    })    
                                ],
            'jersey' => ['required','integer',Rule::unique('players')->where(function ($query) use($request){
                return $query->where('club_id', $request['club_id']);
            })],
        ],
        [
            'playermodel_id.unique' => 'The Player Is Already In This Squad.'
        ]
        );

        $player = Player::create($validatedData);

        return $player;
    }


    
}
