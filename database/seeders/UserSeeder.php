<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            'id' => Str::uuid(),
            'fullName' => 'Administartor',
            'username' => 'Admin 1',
            'email' => 'john@example.com',
            'password' => Hash::make('password123'),
            'address' => '123 Main St, City, Country',
            'phone' => '1234567890',
            'type' => 1,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
