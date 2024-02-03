<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use App\Models\Event;
use App\Models\Seat;
use App\Models\Location;
use App\Models\Category;
use Inertia\Inertia;
use Inertia\Response;

class CreateEventController extends Controller
{
    public function storeData(Request $request): Response
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string', 'max:255'],
            'start_date' => ['required', 'date', 'after_or_equal:' . now()->addMinutes(30)->toDateTimeString()],
            'end_date' => ['required', 'date', 'after_or_equal:start_date', 'before_or_equal:' . now()->addWeek()],
            'location_id' => ['required', 'integer', Rule::exists(Location::class, 'id')],
            'category_id' => ['required', 'integer', Rule::exists(Category::class, 'id')],
            'img' => ['required', 'url'],
            'row' => ['required', 'integer', 'min:1', 'max:20'],
            'column' => ['required', 'integer', 'min:5', 'max:15'], 
        ]);

        $event = Event::create([
            'name' => $request->input('name'),
            'description' => $request->input('description'),
            'start_date' => $request->input('start_date'),
            'end_date' => $request->input('end_date'),
            'location_id' => $request->input('location_id'),
            'category_id' => $request->input('category_id'),
            'row' => $request->input('row'),
            'column' => $request->input('column'),
            'img' => $request->input('img'),
        ]);

        for ($i = 1; $i <= $event->row; $i++) {
            for ($j = 1; $j <= $event->column; $j++) {
                Seat::create([
                    'event_id' => $event->id,
                    'row' => $i,
                    'column' => $j,
                ]);
            }
        }

        return Inertia::render('Admin/CreateEvent');
    }
}
