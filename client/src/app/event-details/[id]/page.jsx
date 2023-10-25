'use client';
import Image from 'next/image';
import React from 'react';
import { Icon } from '@iconify/react';

function EventDetails() {
  return (
    <section className="max-w-7xl mx-auto my-32">
      <div className="flex justify-between">
        <div className="w-[41.5rem] flex flex-col gap-8">
          <div className="w-full">
            <Image
              src="/event-details/1.png"
              width={664}
              height={500}
              alt=""
              className="rounded-3xl"
            />
          </div>
          <div className="w-full flex flex-col gap-3">
            <h2 className="font-semibold text-[2rem]">
              Tour fotográfico por la ciudad
            </h2>
            <p className="whitespace-pre-line">
              Unite a nosotros en un emocionante recorrido por la fascinante
              Ciudad de Buenos Aires, donde la historia y la belleza se unen en
              un solo lugar. En este exclusivo evento, exploraremos los lugares
              más emblemáticos de la ciudad, desde los históricos barrios de San
              Telmo y La Boca hasta los icónicos monumentos de la Plaza de Mayo.
              A lo largo del tour, un talentoso fotógrafo profesional capturará
              los momentos más especiales de tu experiencia, para que puedas
              llevar contigo recuerdos inolvidables de este viaje. Acompáñanos y
              descubre los secretos de Buenos Aires mientras inmortalizamos
              juntos este paseo único en la vida. ¡Prepárate para explorar,
              aprender y capturar la magia de esta ciudad!
            </p>
          </div>
        </div>
        <div className="w-[24rem] flex flex-col justify-between">
          <div className="w-full flex items-center gap-5 px-5 h-[7.2rem] rounded-xl bg-[#E7EFF7] shadow-inner shadow-[#DCF3E7]">
            <Image
              src="/event-details/imgProfile.png"
              width={75}
              height={75}
              alt=""
            />
            <div>
              <span className="font-bold text-[1.375rem]">Jazmín Zhou</span>
              <div className="flex">
                <Icon
                  icon="ic:round-star"
                  className="w-[35px] h-[35px] text-[#EAAC08]"
                />
                <Icon
                  icon="ic:round-star"
                  className="w-[35px] h-[35px] text-[#EAAC08]"
                />
                <Icon
                  icon="ic:round-star"
                  className="w-[35px] h-[35px] text-[#EAAC08]"
                />
                <Icon
                  icon="ic:round-star"
                  className="w-[35px] h-[35px] text-[#EAAC08]"
                />
              </div>
            </div>
          </div>
          <div className="w-full my-5 flex flex-col gap-5">
            <span className='font-bold text-[1.375rem]'>Información del evento</span>
            <ul className='font-medium'>
              <li>Fecha: 15 de Noviembre 2023</li>
              <li>Horario: 12 AM</li>
              <li>Ubicación:</li>
              <li>Entrada: gratuita</li>
            </ul>
          </div>
          <div className="w-full h-[3.3rem] rounded-xl bg-gray-300"></div>
          <div className="w-full h-[17.3rem] rounded-xl bg-gray-400">
            <div></div>
            <button className='bg-[#D03719] w-full text-[1.375rem] font-bold text-white py-2 rounded-full'>Reservar</button>
          </div>
        </div>
      </div>
      <div className="w-full mt-10 flex flex-col gap-5">
        <h2 className="text-center">QA</h2>
        <div className="w-full h-12 bg-gray-300 rounded-xl"></div>
        <div className="w-full h-12 bg-gray-300 rounded-xl"></div>
        <div className="w-full h-12 bg-gray-300 rounded-xl"></div>
        <div className="w-full flex justify-between">
          <div className="w-[40rem]"></div>
          <div className="w-[40rem] flex flex-col gap-5">
            <div className="w-full h-12 bg-gray-300 rounded-xl"></div>
            <div className="w-full h-12 bg-gray-300 rounded-xl"></div>
            <div className="w-full h-12 bg-gray-300 rounded-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EventDetails;
