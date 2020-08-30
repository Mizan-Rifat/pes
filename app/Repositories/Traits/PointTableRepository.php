<?php

namespace App\Repositories\Traits;

use App\Http\Resources\ClubResource;
use App\Model\Club;
use App\Model\Tournament;
use Illuminate\Support\Facades\DB;
use App\Repositories\TournamentRepository;

trait PointTableRepository
{

    public function getTournamentPointsTable($tournament_id){

        $tournament = Tournament::with([
            'fixtures'=>function($query){
                $query->where('completed',1)->with('result'); 
            },
            'clubs',
        ])->find($tournament_id);

        $clubs = $tournament->clubs;
        // return $tournament;

        if($tournament->type == 3){
            return $this->getGroupPointTable($tournament); 
        }

        $clubsStats = $clubs->map(function($club) use($tournament){
            return $this->get_club_stats($tournament->fixtures,$club);
        });

        $pointsTable = $this->sortPointTable($clubsStats);

        return $pointsTable;

    }

    public function getGroupPointTable($tournament){

        $groups = $this->getGroups($tournament->clubs);

        return $pointsTable = $groups->mapWithKeys(function($group,$key) use($tournament){
            $stats = $group->map(function($club) use($tournament){
                return $this->get_club_stats($tournament->fixtures,$club);
            });

            $groupPointTable = $this->sortPointTable($stats);

            return [$key => $groupPointTable];
        });
    }

    

    public function get_club_stats($fixtures,$club)
    {

        $playedMatches = $this->getPlayedMatches($fixtures,$club['id']);

        $matchesArray = $playedMatches->pluck('id');

        $matchCount = count($matchesArray);

        $win = $playedMatches->where('result.match_status',$club['id'])->count();
        
        $draw = $playedMatches->where('result.match_status',0)->count();

        $lose = $matchCount - ($win + $draw);


        $points = ($win * 3) + ($draw * 1);


        $goalGS = DB::table('match_details')
            ->whereIn('fixture_id', $matchesArray)
            ->where('club_id', $club['id'])
            ->where('event_id', 1)
            ->get()->count();

        $goalGA = DB::table('match_details')
            ->whereIn('fixture_id', $matchesArray)
            ->where('club_id','!=', $club['id'])
            ->where('event_id', 1)
            ->get()->count();

        $goalGD = $goalGS - $goalGA;

        $pointsTable = collect([
            'club' => new ClubResource($club),
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

    public function getPlayedMatches($fixtures,$club_id){

        return $fixtures->filter(function($item) use($club_id){
            return $item->team1_id == $club_id || $item->team2_id == $club_id;
        });
    
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

    public function sortPointTable($clubsStats){
        $criteria = ["points" => "desc", "gd" => "desc",'gs'=>'desc','ga'=>'desc'];
        $comparer = $this->makeComparer($criteria);
        $sorted = $clubsStats->sort($comparer);
        $pointsTable = $sorted->values()->toArray();
        return $pointsTable;
    }

    public function getGroups($clubs){

        $groups = $clubs->mapToGroups(function($item,$key){
            
            return ['group'.$item['pivot']['group_'] => $item];
            
        });

        return $groups;
    }

    

}
