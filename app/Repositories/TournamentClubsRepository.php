<?php

namespace App\Repositories;

use App\Model\ClubTournament;
use App\Repositories\Traits\BaseRepository;
use Illuminate\Support\Facades\DB;

class TournamentClubsRepository
{
    use BaseRepository;

    protected $model;

    public function __construct() {
        $this->model = new ClubTournament();
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
}
