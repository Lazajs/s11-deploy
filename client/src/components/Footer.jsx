'use client';
import React from 'react';
import { Icon } from '@iconify/react';

const Footer = () => {
  return (
    <footer className="bg-[#1E1E1E] h-72 py-12 px-24 text-white flex justify-between items-center">
      <div className="flex flex-col items-center">
        <img src="/logo1.svg" alt="Logo" className="w-14 mb-2" />
        <img src="/logoFooter.svg" alt="Logo" className="w-48 h-14 mb-8" />
        <p className="font-semibold">@2023 Buenos Aires Explora</p>
      </div>
      <div className="flex flex-col h-full justify-start">
        <p className="font-semibold text-2xl mb-8">¡Seguinos en las redes!</p>
        <div className="border border-white rounded-full h-14 flex justify-around items-center px-6">
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noreferrer"
            className="hover:scale-125 transition-transform duration-500"
          >
            <Icon icon="mdi:instagram" className="w-8 h-8" />
          </a>
          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noreferrer"
            className="hover:scale-125 transition-transform duration-500"
          >
            <Icon icon="uil:facebook" className="w-8 h-8" />
          </a>
          <a
            href="https://www.youtube.com/"
            target="_blank"
            rel="noreferrer"
            className="hover:scale-125 transition-transform duration-500"
          >
            <Icon icon="ri:youtube-line" className="w-9 h-9" />
          </a>
          <a
            href="https://www.twitter.com/"
            target="_blank"
            rel="noreferrer"
            className="hover:scale-125 transition-transform duration-500"
          >
            <Icon icon="pajamas:twitter" className="w-7 h-7" />
          </a>
        </div>
      </div>
      <div className="flex flex-col h-full justify-start w-[350px]">
        <p className="font-semibold text-2xl mb-6">Contactanos</p>
        <div className="grid grid-cols-[2fr,5fr] break-words mb-4">
          <p className="font-semibold">Dirección:</p>
          <p>Av. Del Libertador 3600, CABA, Buenos Aires, Argentina</p>
        </div>
        <div className="grid grid-cols-[2fr,5fr] break-words mb-4">
          <p className="font-semibold">Teléfono:</p>
          <p>0800-111-1234</p>
        </div>
        <div className="grid grid-cols-[2fr,5fr] break-words">
          <p className="font-semibold">E-mail:</p>
          <p>BAinfo@mail.com</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
