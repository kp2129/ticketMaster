<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Event;
use App\Models\Seat;
use App\Models\TicketType;
use App\Models\Location;
use App\Models\Category;
use Inertia\Inertia;
use Inertia\Response;

class EventController extends Controller
{
    public function getEvents()
    {
        $events = Event::with('location', 'category')->get();
        $locations = Location::all();
        $categories = Category::all();

        return Inertia::render('Events', [
            'events' => $events,
            'locations' => $locations,
            'categories' => $categories,
        ]);
    }

    public function getEventByID($id)
    {
        $event = Event::with('location', 'category')->find($id);
        $seats = Seat::where('event_id', $id)->get();
        $ticketType = TicketType::all();

        if (!$event) {
            return redirect()->route('events');
        }

        return Inertia::render('AboutEvent', [
            'event' => $event,
            'seats' => $seats,
            'ticket_types' => $ticketType,
        ]);
    }
}
