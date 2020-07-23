<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'name' => 'Mizan',
            'email' => 'mizan@mail.com',
            'email_verified_at' => now(),
            'password' => '$2y$10$e9ELeHkXLzuu5GoG4kCPK.Rf/ERCZvfK.L8QKOSzFW7ltfZp2zqHu', // 123
            'remember_token' => Str::random(10),
            
        ]);

        
        factory(\App\User::class,39)->create();
        
    }
}
