<?php

namespace App\Repositories;

use App\Model\Official;
use App\Repositories\Traits\BaseRepository;
use App\User;
use Illuminate\Support\Facades\DB;

class OfficialRepository
{
    use BaseRepository;

    protected $model;
    protected $userRepo;
    protected $tournamentRepo;

    public function __construct(UserRepository $userRepo,TournamentRepository $tournamentRepo) {
        $this->model = new Official();
        $this->userRepo = $userRepo;
        $this->tournamentRepo = $tournamentRepo;
    }

    public function destroyById($ids){

        $delete = $this->model->whereIn('id',$ids)->delete();

        return $delete;
    }

    public function store($request){

        $validatedData = $request->validate([
            'user_id' => ['required','integer'],
            'tournament_id' => ['required','integer'],
        ]);

        $rule = DB::table('officials')
                ->where('user_id',$validatedData['user_id'])
                ->where('tournament_id',$validatedData['tournament_id'])
                ->exists();

        if($rule){
            abort(500,'The user is already an official of this tournamnet.');
        }

        $user = $this->userRepo->findOrFail($validatedData['user_id']);
        $tournament = $this->tournamentRepo->findOrFail($validatedData['tournament_id']);
        
        $official = new Official();
        $official->user_id = $validatedData['user_id'];
        $official->tournament_id = $validatedData['tournament_id'];
        $official->save();

        return $official;
         
    }

    public function destroyByIds($request){
        $validatedData = $request->validate([
            'ids'=>['required'],
            'ids.*'=>['numeric'],

        ]);

        $delete = $this->model->whereIn('id',$validatedData['ids'])->delete();
        return $delete;
    }

    public function destroyByUserIds($request){
        $delete = $this->model->where('tournament_id',$request['tournament_id'])->whereIn('user_id',$request['user_ids'])->delete();
        return $delete;
    }



    
}
