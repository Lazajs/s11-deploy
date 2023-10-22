'use client';
import React from 'react';
import { Icon } from '@iconify/react';

const Navbar = () => {
  return (
    <header className="bg-white shadow-md shadow-blue-100 h-[85px]">
      <nav className="flex items-center justify-around h-full">
        <div className="flex items-center">
          <img src="/logo1.svg" alt="Logo" className="w-[39.4px]" />
          <img src="/logo2.svg" alt="Logo" className="h-[38px] ml-2" />
        </div>
        <div className="flex items-center bg-[#EEEEEE] rounded-full shadow-[0_4px_6px_-1px_rgba(0,0,0,0.3)] w-[441px] h-[50px] pr-1">
          <button
            type="text"
            className="rounded-full appearance-none outline-none w-full h-[full] flex items-center justify-between"
          >
            <span className="pl-6 text-[#737373] text-xl">
              ¿Qué estás buscando?
            </span>
            <div className="w-[45px] h-[45px] bg-[#D03719] rounded-full flex items-center justify-center">
              <Icon
                icon="tabler:search"
                className="w-[28px] h-[28px] text-white"
              />
            </div>
          </button>
        </div>
        <div className="flex items-center">
          <button className="text-[#D03719] font-semibold px-4 py-2">
            Creá tu evento
          </button>
          <button className="bg-[#659DCB] text-white font-semibold px-4 py-2 ml-2 rounded-full w-[171px]">
            Inicia sesión
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
