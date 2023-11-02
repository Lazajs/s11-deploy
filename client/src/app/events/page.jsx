'use client';
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation';

const imageUrls = [
  "https://i0.wp.com/greenburghnaturecenter.org/wp-content/uploads/2023/05/cropped-469143d3-20a9-40d8-91ed-b037ad6c293b.jpg?w=1080&ssl=1",
  "https://www.thesu.org.uk/pageassets/events/events.jpg",
  "https://photo980x880.mnstatic.com/d9820a70fa57cf2afd487db88b68e5d1/floralis-generica-barrio-de-la-recoleta-347403.jpg",
  "https://i0.wp.com/localmedia.org/wp-content/uploads/2021/06/events-1.png?resize=1200%2C595&ssl=1",
  "https://media.timeout.com/images/105809413/image.jpg",
  "https://images.pagina12.com.ar/styles/focal_content_1200x1050/public/2022-07/582784-planetario-202.jpg?h=1c2f7d91&itok=r0FGwmrf",
  "https://www.tangol.com/blog/Fotos/Notas/los-5-mejores-museos-de-la-ciudad_106_202110260954440.JPG"
];


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
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/event?${queryString}`;
    
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setEventsData(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [queryString]);

  const getRandomImageUrl = () => {
    const randomIndex = Math.floor(Math.random() * imageUrls.length);
    return imageUrls[randomIndex];
  };

  return (
    <div className="container mx-auto py-8">
      {eventsData.length > 0 && (
        <div className="text-center mb-4">
          <h1 className="text-2xl font-semibold">Eventos encontrados:</h1>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {eventsData.length > 0 ? (
          eventsData.map((event) => (
            <div key={event.id} className="max-w-sm rounded-lg overflow-hidden shadow-md bg-white">
              <div className="h-40 relative">
                <div className="w-full h-40 overflow-hidden">
                  <img
                    src={getRandomImageUrl()}
                    alt="Event Image"
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800">{event.title}</h3>
                <p className="text-sm text-gray-600 mt-2">Fecha: {event.days[0]} - {event.days[1]}</p>
                <p className="text-sm text-gray-600">Lugar: {event.place}</p>
                <p className="text-sm text-gray-600">Precio: ${event.price ? event.price : 'gratis'}</p>
                <p className="text-sm text-gray-600">Edad mínima: +{event.minAge}</p>
                <p className="text-sm text-gray-600">Tipo: {event.type}</p>
                <p className="text-gray-700 mt-3">{event.description}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-xl font-semibold text-gray-800">No se encontraron eventos.</div>
        )}
      </div>
    </div>
  );
}
