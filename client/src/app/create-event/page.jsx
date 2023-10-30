'use client';

import { Icon } from '@iconify/react';
import React, { useState } from 'react';

function CreateEvent() {
  const [formData, setFormData] = useState({
    eventName: '',
    date: '',
    startTime: '',
    endTime: '',
    location: '',
    neighborhood: '',
    photos: [],
    description: '',
    eventType: '',
    free: false,
    ageRestriction: '',
    categories: [],
    faq1: '',
    faq2: '',
    faq3: '',
  });

  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleInputChange = ({ target: { name, value, type, checked } }) => {
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);

    const fileNames = files.map((file) => file.name);
    setSelectedFiles(fileNames);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const [mode, setMode] = useState({ online: true, pago: false, atp: false });

const handleModeChange = (newMode) => {
 setMode(prevMode => ({ ...prevMode, [newMode]: !prevMode[newMode] }));
};

const isOnline = mode.online;
const isOnline2 = mode.pago;
const isOnline3 = mode.atp;

  const categories = [
    'Gastronomía',
    'Cultura',
    'Educación',
    'Deporte',
    'Sociales y de entretenimiento',
    'Causas benéficas',
    'Moda y belleza',
    'Familia y niños',
    'Conferencia y convenciones',
  ];

  const [iconos, setIconos] = useState({});

  const handleIconChange = (category) => {
    setIconos((prevIconos) => ({
      ...prevIconos,
      [category]: prevIconos[category] === 'check' ? 'star' : 'check',
    }));
  };

  return (
    <div className="max-w-7xl mx-auto my-32">
      <h2 className="font-semibold text-[2rem] mb-5">Crea tu evento</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2">
          <div className="w-[28rem] flex flex-col gap-8">
            <div>
              <label htmlFor="eventName" className="block mb-3">
                ¿Cuál es el nombre de tu evento?
              </label>
              <input
                type="text"
                id="eventName"
                name="eventName"
                value={formData.eventName}
                onChange={handleInputChange}
                placeholder="Nombre del evento"
                className="mt-1 p-2 w-full border-2 rounded-md"
                required
              />
            </div>
            <div className="flex justify-between">
              {/* Agregar otros campos de entrada (fecha, hora, lugar, barrio, etc.) de manera similar */}
              {/* Ejemplo: */}
              <div>
                <label htmlFor="date" className="block mb-3">
                  Día del evento
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border-2 rounded-md"
                  required
                />
              </div>
              {/* Campo Hora de Inicio */}
              <div>
                <label htmlFor="startTime" className="block mb-3">
                  Empieza
                </label>
                <input
                  type="time"
                  id="startTime"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border-2 rounded-md"
                  required
                />
              </div>

              {/* Campo Hora de Finalización */}
              <div>
                <label htmlFor="endTime" className="block mb-3">
                  Termina
                </label>
                <input
                  type="time"
                  id="endTime"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border-2 rounded-md"
                  required
                />
              </div>
            </div>

            {/* Campo Lugar */}
            <div>
              <label htmlFor="location" className="block mb-3">
                ¿En que lugar va a desarrollarse?
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="Dirección"
                className="mt-1 p-2 w-full border-2 rounded-md"
                required
              />
            </div>

            {/* Campo Barrio */}
            <div>
              <label htmlFor="neighborhood" className="block mb-3">
                Barrio
              </label>
              <input
                type="text"
                id="neighborhood"
                name="neighborhood"
                value={formData.neighborhood}
                onChange={handleInputChange}
                placeholder="Almagro"
                className="mt-1 p-2 w-full border-2 rounded-md"
                required
              />
            </div>

            <div>
              <label className="block mb-3">Agrega fotos del evento</label>
              <div className="mt-1 py-10 w-full border-2 rounded-md text-center">
                <label className="cursor-pointer flex flex-col items-center space-y-2">
                  <Icon
                    icon="mdi:image-outline"
                    className="w-[70px] h-[70px]"
                  />
                  <span className="text-gray-600">Arrastra tus fotos aqui</span>
                  <input
                    type="file"
                    id="photos"
                    name="photos"
                    onChange={handleFileChange}
                    multiple
                    className="hidden"
                  />
                  <span className="text-[#3C76A6] text-xs underline underline-offset-2">
                    Subir desde el dispositivo
                  </span>
                </label>
              </div>

              <div className="mt-2 w-1/2">
                <ul className="grid grid-rows-3 text-[#D03719] underline underline-offset-4">
                  {selectedFiles.map((file, index) => (
                    <li key={index}>{file}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block mb-3">
                Descripción del evento
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Escriba su texto aqui."
                className="mt-1 p-2 w-full border-2 rounded-md"
                rows="4"
              />
            </div>
          </div>

          <div className="flex flex-col gap-8">
            {/* Agregar botones de selección (online, presencial, pago, gratis, etc.) de manera similar */}
            {/* Ejemplo: */}
            <div className="flex flex-col gap-5">
              <label className="block mb-3">¿Tu evento es?</label>
              <div className="w-[17.125rem] bg-[rgb(231,239,247)] rounded-full relative">
                <div
                  className={`bg-white absolute top-0 w-[8rem] h-full rounded-full border z-0 transition-all ${
                    isOnline ? 'left-0' : 'left-[9.1rem]'
                  }`}
                ></div>
                <div className="flex justify-between py-3 font-semibold text-[#3C76A6]">
                  <button
                    onClick={() => handleModeChange('online')}
                    className={`w-[8rem] z-10 ${
                      isOnline ? 'text-[#D03719]' : 'text-[#3C76A6]'
                    }`}
                    name="online"
                  >
                    Online
                  </button>
                  <div className="border-l border-[#54595F]"></div>
                  <button
                    onClick={() => handleModeChange('online')}
                    className={`w-[8rem] z-10 ${
                      isOnline ? 'text-[#3C76A6]' : 'text-[#D03719]'
                    }`}
                    name="presencial"
                  >
                    Presencial
                  </button>
                </div>
              </div>
              <div className="w-[17.125rem] bg-[rgb(231,239,247)] rounded-full relative">
                <div
                  className={`bg-white absolute top-0 w-[8rem] h-full rounded-full border z-0 transition-all ${
                    isOnline2 ? 'left-0' : 'left-[9.1rem]'
                  }`}
                ></div>
                <div className="flex justify-between py-3 font-semibold text-[#3C76A6]">
                  <button
                    onClick={() => handleModeChange('pago')}
                    className={`w-[8rem] z-10 ${
                      isOnline2 ? 'text-[#D03719]' : 'text-[#3C76A6]'
                    }`}
                    name="pago"
                  >
                    Pago
                  </button>
                  <div className="border-l border-[#54595F]"></div>
                  <button
                    onClick={() => handleModeChange('pago')}
                    className={`w-[8rem] z-10 ${
                      isOnline2 ? 'text-[#3C76A6]' : 'text-[#D03719]'
                    }`}
                    name="gratis"
                  >
                    Gratis
                  </button>
                </div>
              </div>
              <div className="w-[17.125rem] bg-[rgb(231,239,247)] rounded-full relative">
                <div
                  className={`bg-white absolute top-0 w-[8rem] h-full rounded-full border z-0 transition-all ${
                    isOnline3 ? 'left-0' : 'left-[9.1rem]'
                  }`}
                ></div>
                <div className="flex justify-between py-3 font-semibold text-[#3C76A6]">
                  <button
                    onClick={() => handleModeChange('atp')}
                    className={`w-[8rem] z-10 ${
                      isOnline3 ? 'text-[#D03719]' : 'text-[#3C76A6]'
                    }`}
                    name="atp"
                  >
                    ATP
                  </button>
                  <div className="border-l border-[#54595F]"></div>
                  <button
                    onClick={() => handleModeChange('atp')}
                    className={`w-[8rem] z-10 ${
                      isOnline3 ? 'text-[#3C76A6]' : 'text-[#D03719]'
                    }`}
                    name="+18"
                  >
                    + 18
                  </button>
                </div>
              </div>
            </div>

            {/* Agregar botones de selección de categorías */}
            {/* Ejemplo: */}
            <div>
              <label className="block mb-3">
                ¿En que categorias entra tu evento?
              </label>
              <div className="flex flex-wrap gap-8">
                {categories.map((category, index) => (
                  <div key={index} className="">
                    <button
                      onClick={() => handleIconChange(category)}
                      className={`flex items-center gap-3 p-2 rounded-md ${iconos[category] === 'check' ? 'bg-[#E7EFF7] text-[#306699]' : 'bg-[#EEE] text-[#666]'}`}
                    >
                      {category}
                      {iconos[category] === 'check' ? <Icon icon="ph:x" /> : <Icon icon="ph:check-bold" />}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className='flex flex-col gap-5 w-[28rem]'>
              <h4>Crea tus preguntas frecuentes</h4>
              <div>
              <label htmlFor="faq1" className="block mb-3">
                Pregunta 1
              </label>
              <input
                type="text"
                id="faq1"
                name="faq1"
                value={formData.faq1}
                  onChange={handleInputChange}
                  placeholder='Respuesta 1'
                className="mt-1 p-2 w-full border-2 rounded"
              />
            </div>
            {/* Agregar otros campos de preguntas frecuentes de manera similar */}
            {/* Ejemplo: */}
            <div>
              <label htmlFor="faq2" className="block mb-3">
                Pregunta 2
              </label>
              <input
                type="text"
                id="faq2"
                name="faq2"
                value={formData.faq2}
                  onChange={handleInputChange}
                  placeholder='Respuesta 2'
                className="mt-1 p-2 w-full border-2 rounded"
              />
              </div>
              <div>
              <label htmlFor="faq2" className="block mb-3">
                Pregunta 3
              </label>
              <input
                type="text"
                id="faq2"
                name="faq2"
                value={formData.faq2}
                  onChange={handleInputChange}
                  placeholder='Respuesta 3'
                className="mt-1 p-2 w-full border-2 rounded"
              />
            </div>
            </div>
          </div>
        </div>

        <div className="w-[28rem] mt-12">
          <button
            type="submit"
            className="w-full px-4 py-2 bg-[#D03719] text-xl text-white font-bold rounded-full"
          >
            Publicar
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateEvent;
