<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Notifications\DatabaseNotification;
use Illuminate\Support\Facades\Auth;

class NotificationController extends Controller
{
  
    public function destroy($id)
    {
        DatabaseNotification::findOrFail($id)->delete();
        // Auth::user()->Notifications->find($id)->delete();
        return response()->json([
            'data'=>$id,
            'message' => 'success',
        ],200);
    }

    public function notificationMarkAsRead($id){
        DatabaseNotification::findOrFail($id)->markAsRead();
        // Auth::user()->Notifications->find($id)->markAsRead();
        return response()->json([
            'data'=>$id,
            'message' => 'success',
        ],200);

    }
    public function notificationMarkAsUnRead($id){
        DatabaseNotification::findOrFail($id)->markAsUnRead();
        // Auth::user()->Notifications->find($id)->markAsUnRead();
        return response()->json([
            'data'=>$id,
            'message' => 'success',
        ],200);

    }
  
}
