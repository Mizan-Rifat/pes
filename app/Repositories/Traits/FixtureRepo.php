<?php

namespace App\Repositories\Traits;
use Illuminate\Support\Facades\DB;

trait FixtureRepo
{

    public function createRoundRobinFixtures($tournament_id,$teamNames,$tournamentLeg=null,$flag=1,$group=null)
    {
        // $flag = 1 ->league,2->championsLeague
        
        $teamsCount = sizeof($teamNames);

        $totalRounds = $teamsCount - 1;
        $matchesPerRound = $teamsCount / 2;
        $rounds = array();
        for ($i = 0; $i < $totalRounds; $i++) {
            $rounds[$i] = array();
        }

        for ($round = 0; $round < $totalRounds; $round++) {
            for ($match = 0; $match < $matchesPerRound; $match++) {
                $home = ($round + $match) % ($teamsCount - 1);
                $away = ($teamsCount - 1 - $match + $round) % ($teamsCount - 1);
                if ($match == 0) {
                    $away = $teamsCount - 1;
                }
                $home = $this->team_name($home + 1, $teamNames);
                $away = $this->team_name($away + 1, $teamNames);
                $rounds[$round][$match] = "{$home},{$away}";
            }
        }


        $fixs = [];

        foreach ($rounds as $key=>$round) {

            foreach ($round as $rnd) {
                if ($tournamentLeg != null) {
                    $leg = 1;
                }else{
                    $leg=null;
                }
                $arr = explode(',', $rnd);

                // array_push($fixs,$arr);
                array_push($fixs,[
                    'team1_id' => $arr[0],
                    'team2_id' => $arr[1],
                    'round' => $flag == 2 ? 1 : $key + 1,
                    'leg' => $leg,
                    'group' => $group
                ]);
           
            }
        }


        if ($tournamentLeg == 2) {

            foreach ($rounds as $key=>$round) {

                foreach ($round as $rnd) {
                   
                    $arr = explode(',', $rnd);
                    // array_push($fixs,$arr);
                    array_push($fixs,[
                        'team1_id' => $arr[1],
                        'team2_id' => $arr[0],
                        'round' => $flag == 2 ? 1 : $totalRounds + $key + 1,
                        'leg' => 2,
                        'group' => $group
                    ]);

                }
            }
        }
        
        // $this->insertToDB($fixs,$tournament_id,$group);
        return $fixs;
        

    }

    public function createKnockoutFixtures($tournament_id,$teamNames,$tournamentRound,$tournamentLeg=null){

        $teamsCount = sizeof($teamNames);

        $totalRounds = log(count($teamNames),2);

        $matchesPerRound = $teamsCount / 2;
        $rounds = array();

        for ($i = 0; $i < $matchesPerRound; $i++) {
            $rounds[$i] = array();
        }

        for ($match = 0; $match < $matchesPerRound; $match++) {
            $home = $match % ($teamsCount - 1);
            $away = ($teamsCount - 1 - $match) % ($teamsCount - 1);
            if ($match == 0) {
                $away = $teamsCount - 1;
            }
            $home = $this->team_name($home + 1, $teamNames);
            $away = $this->team_name($away + 1, $teamNames);
            $rounds[$match] = "{$home},{$away}";
        }
        $fixs = [];

        foreach ($rounds as $key=>$round) {
            $arr = explode(',', $round);
            array_push($fixs,[
                'team1_id' => $arr[0],
                'team2_id' => $arr[1],
                'round' => $tournamentRound,
                'leg' => 1,
                'group'=>null
            ]);
      
        }

        if($tournamentLeg == 2){
            foreach ($rounds as $key=>$round) {
                $arr = explode(',', $round);
                array_push($fixs,[
                    'team1_id' => $arr[1],
                    'team2_id' => $arr[0],
                    'round' => $tournamentRound,
                    'leg' => 2,
                    'group' => null
                ]);
          
            }
        }

        for ($i=$tournamentRound - 1,$j=2; $i >= 1,$j < $totalRounds+1 ; $i--,$j++) { 
            array_push($fixs,...$this->createTBDFixture(pow(2,$i),$tournamentLeg,$j)); 
        }

        // $this->insertToDB($fixs,$tournament_id);
        
        return $fixs;
    }

    public function createRRKFixture($tournament_id,$tournamentLeg){

        $tournament = $this->tournamentRepo->getTournamentWithGroups($tournament_id);

        $totalRounds = $tournament->round - 1;

         $tournament->groups->map(function($group,$key)use($tournament_id,$tournamentLeg){
        
            $clubIds = $group->map(function($club){
                return $club['id'];
            })->toArray();

            // dump($this->createRoundRobinFixtures($tournament_id,$clubIds,$tournamentLeg,2,$key));
            $this->createRoundRobinFixtures($tournament_id,$clubIds,$tournamentLeg,2,$key);
            
        });
        $fixs = [];

        for ($i=$totalRounds,$j=2; $i >= 1,$j < $totalRounds+2 ; $i--,$j++) { 
            array_push($fixs,...$this->createTBDFixture(pow(2,$i),$tournamentLeg,$j)); 
        }

        // $this->insertToDB($fixs,$tournament_id);
        return $fixs;

    }

    public function createTBDFixture($teamNo,$leg,$round){
        $count = $teamNo / 2;
        $totalRounds = $count * $leg;
        $fixs = [];
        for ($i=1; $i <= $totalRounds; $i++) { 
            array_push($fixs,
            [
                'team1_id' => 0,
                'team2_id' => 0,
                'round' => $round,
                'leg' => $i > $count ? 2 : 1,
                'group'=>null
            ]);
        }

        return $fixs;
    }
    

    public function team_name($num, $names)
    {
        $i = $num - 1;
        if (sizeof($names) > $i && strlen(trim($names[$i])) > 0) {
            return trim($names[$i]);
        } else {
            return $num;
        }
    }

    public function insertToDB($fixtures,$tournament_id){
        
        foreach($fixtures as $fix){
            DB::table('fixtures')->insert([
                'team1_id' => $fix['team1_id'],
                'team2_id' => $fix['team2_id'],
                'host_id' => $fix['team1_id'],
                'tournament_id' => $tournament_id,
                'round' => $fix['round'],
                'leg' => $fix['leg'],
                'group_'=>$fix['group'] 
            ]);
        }

    }


    public function create($request){

        $request['team1_id'] = $request['team1'];
        $request['team2_id'] = $request['team2'];
        $request['group_'] = $request['group'];

        unset($request['team1'],$request['team2'],$request['group']);


       $validatedData = $request->validate([
           'tournament_id'=>['required','integer'],
           'team1_id' => ['required','integer'],
           'team2_id' => ['required','integer','different:team1_id'],
           'date' => ['required','date','nullable'],
           'group_' => ['required','integer','nullable'],
           'round' => ['required','integer'],
           'leg' => ['required','integer'],
       ]);   
       

       $fixture = $this->model->create($validatedData);

       return $fixture;
    }
}
