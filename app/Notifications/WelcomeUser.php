<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\BroadcastMessage;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class WelcomeUser extends Notification
{
    use Queueable;

    protected $type = 5;

  
    public function __construct()
    {
        //
    }

    public function via($notifiable)
    {
        return ['database','broadcast'];
    }

    

    public function toDatabase($notifiable){
        return [
            'type'=>$this->type,
        ];
    }

    public function toBroadcast($notifiable)
    {
        return new BroadcastMessage([
            'data'=>[
                'type'=>$this->type,
            ]
        ]);
    }

    public function toArray($notifiable)
    {
        return [
            //
        ];
    }
}
