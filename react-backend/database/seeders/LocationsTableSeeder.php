<?php

namespace Database\Seeders;
use Illuminate\Support\Facades\DB;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;


class LocationsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        DB::table('locations')->insert([
            ['name' => 'Riga Plaze'],
            ['name' => 'Estrāde'],
            ['name' => 'Sporta Centrs'],
        ]);
    }
}
