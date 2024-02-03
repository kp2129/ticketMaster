<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Stripe\Stripe;
use Stripe\PaymentIntent;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Seat;

class PurchaseController extends Controller
{
    public function createPaymentIntent(Request $request): Response
    {
        $selectedSeats = $request->input('selectedSeats');
        $eventId = $request->input('eventId');

        // Calculate the total amount based on your seat prices or logic
        $amount = $this->calculateTotalAmount($selectedSeats);

        // Create a PaymentIntent with Stripe
        $stripeSecretKey = env('STRIPE_SECRET_KEY');
        Stripe::setApiKey($stripeSecretKey);
        
        $intent = PaymentIntent::create([
            'amount' => $amount * 100, // Stripe uses the amount in cents
            'currency' => 'eur',
        ]);

        return Inertia::render('about_event/' . $eventId, [
            'clientSecret' => $intent->client_secret,
            'totalAmount' => $amount,
            'stripePublishableKey' => env('STRIPE_PUBLISHABLE_KEY'),
        ]);
    }

    private function calculateTotalAmount($selectedSeats)
    {
        $seatPrices = Seat::whereIn('id', $selectedSeats)
            ->pluck('price')
            ->toArray();

        $totalAmount = array_sum($seatPrices);

        return $totalAmount;
    }
}
