<?php

namespace App\Repositories\Traits;

use App\Model\Club;
use App\Model\Tournament;
use Illuminate\Support\Facades\DB;

trait PointTableRepository
{

    public function getTournamentPointsTable($tournament_id){

        $tournament = Tournament::with([
            'fixtures'=>function($query){
                $query->where('completed',1)->with('result'); 
            },
            'clubs'
        ])->find($tournament_id);

        $clubIdArray = $tournament->clubs->pluck('id');

        $pointsTable = $clubIdArray->map(function($club_id) use($tournament){
            return $this->get_club_stats($tournament->fixtures,$club_id);
        });

        $criteria = ["points" => "desc", "gd" => "desc",'gs'=>'desc','ga'=>'desc'];
        $comparer = $this->makeComparer($criteria);
        $sorted = $pointsTable->sort($comparer);
        $actual = $sorted->values()->toArray();

        return $actual;

    }

    public function getPlayedMatches($fixtures,$club_id){

        return $fixtures->filter(function($item) use($club_id){
            return $item->team1_id == $club_id || $item->team2_id == $club_id;
        });
    
    }

    public function get_club_stats($fixtures,$club_id)
    {

        $playedMatches = $this->getPlayedMatches($fixtures,$club_id);

        $matchesArray = $playedMatches->pluck('id');

        $matchCount = count($matchesArray);

        $club = Club::find($club_id);
        $clubName = $club->name;
        $clubLogo = $club->logo;

        $win = $playedMatches->where('result.match_status',1)->count();
        
        $draw = $playedMatches->where('result.match_status',0)->count();

        $lose = $matchCount - ($win + $draw);


        $points = ($win * 3) + ($draw * 1);


        $goalGS = DB::table('match_details')
            ->whereIn('fixture_id', $matchesArray)
            ->where('club_id', $club_id)
            ->where('event_id', 1)
            ->get()->count();

        $goalGA = DB::table('match_details')
            ->whereIn('fixture_id', $matchesArray)
            ->where('club_id','!=', $club_id)
            ->where('event_id', 1)
            ->get()->count();

        $goalGD = $goalGS - $goalGA;

        $pointsTable = collect([
            'clubName' => $clubName,
            'clubLogo' => $clubLogo,
            'played' => $matchCount,
            'win' => $win,
            'draw' => $draw,
            'lose' => $lose,
            'gs' => $goalGS,
            'ga' => $goalGA,
            'gd' => $goalGD,
            'points' => $points
        ]);

        return $pointsTable;
    }

    public function makeComparer($criteria){
        $comparer = function ($first, $second) use ($criteria) {
            foreach ($criteria as $key => $orderType) {

                $orderType = strtolower($orderType);
                if ($first[$key] < $second[$key]) {
                    return $orderType === "asc" ? -1 : 1;
                } else if ($first[$key] > $second[$key]) {
                    return $orderType === "asc" ? 1 : -1;
                }
            }

            return 0;
        };
        return $comparer;
    }

    

}
