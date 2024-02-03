import { useState, useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import GuestLayout from '@/Layouts/GuestLayout';
import { IconArmchair } from '@tabler/icons-react';

export default function AboutEvent({ auth, event, seats, clientSecret }) {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const isSeatAvailable = (row, col) => {
    const seat = seats.find((seat) => seat.row === row && seat.column === col);
    return seat ? seat.is_available === 1 : false;
  };

  const handleSeatClick = (row, col) => {
    const isSelected = selectedSeats.some((seat) => seat.row === row && seat.column === col);
    const isAvailable = isSeatAvailable(row, col);

    if (isAvailable) {
      if (isSelected) {
        setSelectedSeats((prevSeats) =>
          prevSeats.filter((seat) => !(seat.row === row && seat.column === col))
        );
      } else {
        const seatId = seats.find((seat) => seat.row === row && seat.column === col).id;
        setSelectedSeats((prevSeats) => [...prevSeats, { row, column: col, id: seatId }]);
      }
    }
  };

  const isSeatSelected = (row, col) => {
    return selectedSeats.some((seat) => seat.row === row && seat.column === col);
  };

  const { postData, setData, post, errors, reset } = useForm({
    selectedSeats: selectedSeats.map((seat) => seat.id),
    eventId: event.id,
  });


  useEffect(() => {
    setData('selectedSeats', selectedSeats.map((seat) => ({ id: seat.id })));
  }, [selectedSeats]);


  useEffect(() => {
    const calculateTotalAmount = () => {
      const seatPrices = selectedSeats.map((seat) =>
        seats.find((s) => s.id === seat.id).price
      );
      const totalAmount = seatPrices.reduce((acc, price) => acc + parseFloat(price), 0);
      setTotalAmount(totalAmount);
    };

    calculateTotalAmount();
  }, [selectedSeats, seats]);

  const handlePurchase = (e) => {
    e.preventDefault();

    post('/purchase', postData);
  };

  return (
    <>
      {!auth.user ? (
        <GuestLayout
          user={auth.user}
          header={<h2 className="">Login to access the full event page!</h2>}
        >
          <Head title={event.name} />
          <div className="">
            <div className="event-card">
              <div>
                <strong>{event.name}</strong>
                <img
                  className=""
                  src={event.img || 'fallback_image_url'}
                  alt={event.name || 'Image Alt Text'}
                />
              </div>
              <div>
                <p>{event.description}</p>
                <p>Start Date: {event.start_date}</p>
                <p>End Date: {event.end_date}</p>
                <p>Location: {event.location.name}</p>
              </div>
            </div>
            <div>Login to buy ticket!</div>
          </div>
        </GuestLayout>
      ) : (
        <AuthenticatedLayout user={auth.user}>
          <Head title={event.name} />
          <div className="">
            <div className="event-card">
              <div>
                <strong>{event.name}</strong>
                <img
                  className=""
                  src={event.img || 'fallback_image_url'}
                  alt={event.name || 'Image Alt Text'}
                />
              </div>
              <div>
                <p>{event.description}</p>
                <p>Start Date: {event.start_date}</p>
                <p>End Date: {event.end_date}</p>
                <p>Location: {event.location.name}</p>
              </div>
            </div>
            <div className="seats-flex">
              {Array.from({ length: event.row }, (_, rowIndex) => (
                <div key={rowIndex} className="seat-row">
                  {Array.from({ length: event.column }, (_, colIndex) => (
                    <div
                      key={colIndex}
                      className={`seat ${isSeatAvailable(rowIndex + 1, colIndex + 1)
                        ? 'available'
                        : 'occupied'
                        } ${isSeatSelected(rowIndex + 1, colIndex + 1) ? 'selected' : ''}`}
                      onClick={() => handleSeatClick(rowIndex + 1, colIndex + 1)}
                    >
                      <IconArmchair />
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div>
              <p>
                Selected Seats: {selectedSeats.map((seat) => `${seat.row}-${seat.column}`).join(', ')}
              </p>
              <p>Total Amount: ${totalAmount.toFixed(2)}</p>
              <button onClick={handlePurchase}>Purchase Selected Seats</button>
            </div>
            
          </div>
        </AuthenticatedLayout>
      )}
    </>
  );
}
