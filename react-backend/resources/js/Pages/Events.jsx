import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link } from '@inertiajs/react';

export default function Events({ auth, canLogin, events, locations, categories }) {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const filteredEvents = events.filter((event) => {
    const locationFilter = !selectedLocation || (event.location.id === parseInt(selectedLocation, 10));
    const categoryFilter = !selectedCategory || (event.category.id === parseInt(selectedCategory, 10));
    return locationFilter && categoryFilter;
  });

  return (
    <>
      {!auth.user ? (
        <GuestLayout
          user={auth.user}
          header={<h2 className="">Login to access the full event page!</h2>}
        >
          <Head title="Events" />
          <div className="">
            <div>
              <label>
                Location:
                <select onChange={(e) => setSelectedLocation(e.target.value)}>
                  <option value="">All Locations</option>
                  {locations.map((location) => (
                    <option key={location.id} value={location.id}>
                      {location.name}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Category:
                <select onChange={(e) => setSelectedCategory(e.target.value)}>
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className='event-grid'>
              {filteredEvents.map((event) => (
                <Link
                  key={event.id}
                  href={`/about_event/${event.id}`}
                  className="event-card"
                >
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
                </Link>
              ))}
            </div>
          </div>
        </GuestLayout>
      ) : (
        <AuthenticatedLayout user={auth.user}>
          <Head title="Events" />
          <div className="">
            <div>
              <label>
                Location:
                <select onChange={(e) => setSelectedLocation(e.target.value)}>
                  <option value="">All Locations</option>
                  {locations.map((location) => (
                    <option key={location.id} value={location.id}>
                      {location.name}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Category:
                <select onChange={(e) => setSelectedCategory(e.target.value)}>
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className='event-grid'>
              {filteredEvents.map((event) => (
                <Link
                  key={event.id}
                  href={`/about_event/${event.id}`}
                  className="event-card"
                >
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
                </Link>
              ))}
            </div>
          </div>
        </AuthenticatedLayout>
      )}
    </>
  );
}
