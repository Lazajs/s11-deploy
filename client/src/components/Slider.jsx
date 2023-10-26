'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import Image from 'next/image';

const Slider = () => {
  const events = [
    {
      id: 1,
      date: '15 de Noviembre 2023 - Horario: 12 AM',
      image: '/5.png',
      description: 'Clases de Tango en San Telmo.',
      bg: 'bg-[#EAAC08]',
    },
    {
      id: 2,
      date: '15 de Noviembre 2023 - Horario: 12 AM',
      image: '/6.png',
      description: 'Paseo por los espacios verdes de la ciudad.',
      bg: 'bg-[#306699]',
    },
    {
      id: 3,
      date: '15 de Noviembre 2023 - Horario: 12 AM',
      image: '/7.png',
      description: 'Visita guiada por el cementerio  de Recoleta.',
      bg: 'bg-[#7AAE34]',
    },
  ];
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={3}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
      {events.map((event) => (
        <SwiperSlide key={event} className="w-[30rem]">
          <div className="w-full relative flex items-end justify-center">
            <Image
              src={event.image}
              width={200}
              height={200}
              alt=""
              className="w-full h-[18.3rem] rounded-3xl"
            />
            <button
              type="button"
              className={`absolute py-3 px-9 ${event.bg} rounded-full mb-5 text-white font-bold`}
            >
              Reserva tu ticket
            </button>
          </div>
          <p className="font-bold text-[1.375rem] my-3">{event.date}</p>
          <p className="font-bold">{event.description}</p>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
