import React from 'react';

export default function EventDetails({ event, onClose }) {
  const handleChairClick = (seatNumber) => {
    // Implement logic to handle chair selection
    console.log(`Selected seat: ${seatNumber}`);
  };

  return (
    <div className="event-details-overlay">
      <div className="event-details-container">
        <button onClick={onClose} className="close-button">
          Close
        </button>
        <h2>{event.name}</h2>
        <img
          className="event-details-image"
          src={event.img || 'fallback_image_url'}
          alt={event.name || 'Image Alt Text'}
        />
        <p>{event.description}</p>
        <p>Start Date: {event.start_date}</p>
        <p>End Date: {event.end_date}</p>
        <p>Location: {event.location.name}</p>
        <div className="chair-grid">
          {Array.from({ length: event.ticket_count || 0 }, (_, index) => (
            <span
              key={index}
              className="chair-icon"
              onClick={() => handleChairClick(index + 1)}
            >
              🪑
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}