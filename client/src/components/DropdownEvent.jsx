import Image from 'next/image';
import React from 'react';

const DropdownEvent = () => {
  const places = [
    {
      id: 1,
      category: 'En interior',
      image: '/Interior.png',
    },
    {
      id: 2,
      category: 'Aire libre',
      image: '/AireLibre.png',
    },
    {
      id: 3,
      category: 'En línea',
      image: '/EnLinea.png',
    },
    {
      id: 4,
      category: 'Cualquier lugar',
      image: '/CualquierLugar.png',
    },
  ];
  return (
    <div className="absolute bg-white top-[5.3rem] z-50 flex justify-between w-full p-5 gap-5 rounded-3xl shadow-lg">
      <div>
        <p className="font-medium text-black mb-8">Lugar</p>
        <div className="grid grid-cols-2 gap-5 text-[#54595F]">
          {places.map((place) => (
            <div key={place} className="flex flex-col gap-4">
              <Image src={place.image} width={150} height={150} alt="" />
              <span>{place.category}</span>
            </div>
          ))}
        </div>
      </div>
      <div className='flex border border-[#54595f9d] my-20'></div>
      <div>
        <p className="font-medium text-black mb-8">Público</p>
        <div className="flex gap-5">
          <div className="flex flex-col gap-4">
            <Image src="/TodasEdades.png" width={230} height={150} alt="" />
            <span>Todas las edades</span>
          </div>
          <div className="flex flex-col gap-4">
            <Image src="/18.png" width={150} height={150} alt="" />
            <span>+18</span>
          </div>
        </div>
        <div className='mt-5'>
          <p className="font-medium text-black mb-8">Entrada</p>
          <div className="flex items-center bg-[#EEEEEE] rounded-full w-full p-1">
            <div className="relative w-full">
              <div className="flex items-center justify-between w-full h-full">
                <div
                  className={`hover:bg-white rounded-full w-full flex justify-center hover:shadow-[0_4px_6px_-1px_rgba(0,0,0,0.3)] transition-all`}
                >
                  <button className="flex flex-col text-[#26261E] font-semibold py-3">
                    Gratis
                  </button>
                </div>
                <div
                  className={`hover:bg-white rounded-full w-full flex justify-center hover:shadow-[0_4px_6px_-1px_rgba(0,0,0,0.3)] transition-all`}
                >
                  <button className="flex flex-col text-[#26261E] font-semibold py-3">
                    Pago
                  </button>
                </div>
                <div
                  className={`hover:bg-white rounded-full w-full flex justify-center hover:shadow-[0_4px_6px_-1px_rgba(0,0,0,0.3)] transition-all`}
                >
                  <button className="flex flex-col text-[#26261E] font-semibold py-3">
                    Ambos
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DropdownEvent;
