<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\BroadcastMessage;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class AddedInTournament extends Notification
{
    use Queueable;

    protected $type =6;
    protected $club;
    protected $tournament;



    public function __construct($tournament,$club)
    {
        $this->tournament = $tournament;
        $this->club = $club;

    }

    public function via($notifiable)
    {
        return ['database','broadcast'];
    }

    

    public function toDatabase($notifiable){
        return [
            'type'=>$this->type,
            'tournament'=>$this->tournament,
            'club'=>$this->club
        ];
    }

    public function toBroadcast($notifiable)
    {
        return new BroadcastMessage([
            'data'=>[
                'type'=>$this->type,
                'tournament'=>$this->tournament,
                'club'=>$this->club
            ]
        ]);
    }

    
    public function toArray($notifiable)
    {
        return [
            
        ];
    }
}
