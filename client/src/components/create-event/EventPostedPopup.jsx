import { Icon } from '@iconify/react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const EventPostedPopup = ({ isOpen, isClose }) => {
  const [, setEventId] = useState(null);

  useEffect(() => {
    if (isOpen) {
      fetch('https://api-crm-cuaz.onrender.com/list')
        .then((response) => response.json())
        .then((data) => {
          if (data && data.length > 0) {
            const event = data[data.length - 1];
            setEventId(event.id);
          }
        })
        .catch((error) => {
          console.error('Error al obtener el último evento', error);
        });
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-white opacity-50 z-40"></div>
      <div className="bg-white w-[33.6875rem] rounded-3xl border border-gray-300 shadow-2xl relative z-50">
        <div className="flex absolute flex-row-reverse w-full pt-3 pr-4">
          <button onClick={isClose}>
            <Icon icon="ph:x" className="text-[#54595F] w-[20px] h-[20px]" />
          </button>
        </div>
        <div className="flex flex-col items-center py-10 gap-5">
          <Image src="/eventPosted.png" width={128} height={128} />
          <span className="font-semibold text-[2.5rem]">
            ¡Evento publicado!
          </span>
          <Link
            href={`/event-details/4`}
            className="bg-[#CADCED] text-lg text-[#28527C] font-bold py-2 px-12 rounded-[0.625rem]"
          >
            Ir al evento
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventPostedPopup;
