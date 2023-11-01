'use client';
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation';

export default function Events() {
  const searchParams = useSearchParams()

  const [eventsData, setEventsData] = useState([]);

  const place = searchParams.getAll('place');
  const price = searchParams.get('price');
  const minAge = searchParams.get('minAge');
  const categories = searchParams.getAll('category');

  const type = searchParams.getAll('type');

  const queryStringParts = [];

  if (place.length > 0) {
    queryStringParts.push(`place=${place.join('&place=')}`);
  }
  
  if (price) {
    queryStringParts.push(`price=${price}`);
  }
  
  if (minAge) {
    queryStringParts.push(`minAge=${minAge}`);
  }
  
  if (categories.length > 0) {
    queryStringParts.push(`category=${categories.join('&category=')}`);
  }
  
  if (type.length > 0) {
    queryStringParts.push(`type=${type.join('&type=')}`);
  }

  const queryString = queryStringParts.join('&');
  
  useEffect(() => {
    const apiUrl = `http://localhost:5000/api/v1/event?${queryString}`;
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setEventsData(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [queryString]);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-semibold mb-4">Events Page</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {eventsData.map((event) => (
          <div key={event.id} className="border p-4 rounded shadow-md">
          <h2 className="text-xl font-semibold mb-2">{event.title}</h2>
          <p className="text-gray-700">{event.description}</p>
          <div className="mt-4">
            <span className="text-gray-500">Category: {event.category}</span>
          </div>
          <div className="mt-2">
            <span className="text-gray-500">Creator: {event.creator}</span>
          </div>
          <div className="mt-2">
            <span className="text-gray-500">Schedule: {event.schedule} hours</span>
          </div>
          <div className="mt-2">
            <span className="text-gray-500">Place: {event.place}</span>
          </div>
          <div className="mt-2">
            <span className="text-gray-500">Price: ${event.price}</span>
          </div>
          <div className="mt-2">
            <span className="text-gray-500">Minimum Age: {event.minAge}+</span>
          </div>
          <div className="mt-2">
            <span className="text-gray-500">Type: {event.type}</span>
          </div>
          <div className="mt-4">
            <a href={event.link} target="_blank" rel="noopener noreferrer" className="text-blue-600">More Info</a>
          </div>
        </div>
        ))}
      </div>
    </div>
  );
}
