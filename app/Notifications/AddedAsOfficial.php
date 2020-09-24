<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\BroadcastMessage;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class AddedAsOfficial extends Notification
{
    use Queueable;

    protected $type = 7;
    protected $tournament;



    public function __construct($tournament)
    {
        $this->tournament = $tournament;

    }

    public function via($notifiable)
    {
        return ['database','broadcast'];
    }

    

    public function toDatabase($notifiable){
        return [
            'type'=>$this->type,
            'tournament'=>$this->tournament,
        ];
    }

    public function toBroadcast($notifiable)
    {
        return new BroadcastMessage([
            'data'=>[
                'type'=>$this->type,
                'tournament'=>$this->tournament,
            ]
        ]);
    }

    
    public function toArray($notifiable)
    {
        return [
            
        ];
    }
}
