'use client';

import EventPostedPopup from '@/components/create-event/EventPostedPopup';
import { Icon } from '@iconify/react';
import Image from 'next/image';
import React, { useState } from 'react';

function CreateEvent() {
  const [formData, setFormData] = useState({
    imgUrls: [],
    description: '',
    title: '',
    place: '',
    schedule: '',
    duration: '',
    category: [],
    price: 0,
    minAge: 0,
    type: 'presencial',
  });

  const [openEventPostedPopup, setOpenEventPostedPopup] = useState(false);

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [location, setLocation] = useState('');
  const [neighborhood, setNeighborhood] = useState('');

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleNeighborhoodChange = (e) => {
    setNeighborhood(e.target.value);
  };

  const handleInputChange = ({ target: { name, value, type } }) => {
    let newValue = value;

    if (type === 'number') {
      newValue = parseFloat(value);
    }
    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const handleTimeChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageUpload = (e) => {
    const files = e.target.files;
    const imageUrls = [];

    for (let i = 0; i < files.length; i++) {
      imageUrls.push(URL.createObjectURL(files[i]));
    }

    setFormData({
      ...formData,
      imgUrls: imageUrls,
    });

    setSelectedFiles([...selectedFiles, ...files]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Verificar si el botón de envío se presionó
    if (e.nativeEvent.submitter.name === 'publicar') {
      const combinedPlace = `${location}, ${neighborhood}`;
      const scheduleTime = new Date(`2000-01-01T${formData.schedule}`);
      const endTime = new Date(`2000-01-01T${formData.endTime}`);
      const duration = (endTime - scheduleTime) / (1000 * 60);
      const updatedFormData = {
        ...formData,
        place: combinedPlace,
        duration,
      };
      console.log(updatedFormData);
      fetch('https://jsonserverong.onrender.com/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedFormData),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Error al crear el evento');
          }
        })
        .then((data) => {
          console.log('Evento creado con éxito', data);
          setFormData({
            imgUrls: [],
            description: '',
            title: '',
            place: '',
            schedule: '',
            endTime: '', // Añade endTime a la inicialización
            duration: '',
            category: [],
            price: 0,
            minAge: 0,
            type: 'presencial',
          });

          setLocation('');
          setNeighborhood('');
          setSelectedFiles([]);
          setIconos({});
        })
        .catch((error) => {
          console.error('Error al crear el evento', error);
        });
    }
  };

  const [, setMode] = useState({ online: true, pago: false, atp: false });

  const handleModeChange = (newMode) => {
    const updatedFormData = { ...formData };

    if (newMode === 'atp') {
      updatedFormData.minAge = 0;
    } else if (newMode === '+18') {
      updatedFormData.minAge = 18;
    } else if (newMode === 'online') {
      updatedFormData.type = 'online';
    } else if (newMode === 'presencial') {
      updatedFormData.type = 'presencial';
    } else if (newMode === 'pago') {
      updatedFormData.price = 1;
    } else if (newMode === 'gratis') {
      updatedFormData.price = 0;
    }
    setMode((prevMode) => ({ ...prevMode, [newMode]: !prevMode[newMode] }));

    setFormData(updatedFormData);
  };

  const isOnline = formData.type === 'online';
  const isOnline2 = formData.price === 0;
  const isOnline3 = formData.minAge === 0;

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

    setFormData((prevData) => {
      let updatedCategory = [...prevData.category];

      if (updatedCategory.includes(category)) {
        updatedCategory = updatedCategory.filter((c) => c !== category);
      } else {
        updatedCategory.push(category);
      }

      return {
        ...prevData,
        category: updatedCategory,
      };
    });
  };

  const handleOpenEventPostedPopup = () => {
    setTimeout(() => {
      setOpenEventPostedPopup(true);
    }, 5000);
  };

  const handleCloseEventPostedPopup = () => {
    setOpenEventPostedPopup(false);
  };

  const eventPopup = {
    isOpen: openEventPostedPopup,
    isClose: handleCloseEventPostedPopup,
  };

  return (
    <div className="max-w-7xl mx-auto my-32">
      <h2 className="font-semibold text-[2rem] mb-5">Crea tu evento</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2">
          <div className="w-[28rem] flex flex-col gap-8">
            <div>
              <label htmlFor="title" className="block mb-3">
                ¿Cuál es el nombre de tu evento?
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Nombre del evento"
                className="mt-1 p-2 w-full border-2 rounded-md"
                required
              />
            </div>
            <div className="flex justify-between">
              <div>
                <label htmlFor="" className="block mb-3">
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
                <label htmlFor="schedule" className="block mb-3">
                  Empieza
                </label>
                <input
                  type="time"
                  id="schedule"
                  name="schedule"
                  value={formData.schedule}
                  onChange={handleTimeChange}
                  className="mt-1 p-2 w-full border-2 rounded-md"
                  required
                />
              </div>
              <div>
                <label htmlFor="endTime" className="block mb-3">
                  Termina
                </label>
                <input
                  type="time"
                  id="endTime"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleTimeChange}
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
                value={location}
                onChange={handleLocationChange}
                placeholder="Dirección"
                className="mt-1 p-2 w-full border-2 rounded-md"
                required
              />
            </div>
            <div>
              <label htmlFor="neighborhood" className="block mb-3">
                Barrio
              </label>
              <input
                type="text"
                id="neighborhood"
                name="neighborhood"
                value={neighborhood}
                onChange={handleNeighborhoodChange}
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
                    name="imgUrls"
                    onChange={handleImageUpload}
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
                    <li key={index}>{file.name}</li>
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
            <div className="flex justify-between w-[35rem] items-end">
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
                      value="online"
                    >
                      Online
                    </button>
                    <div className="border-l border-[#54595F]"></div>
                    <button
                      onClick={() => handleModeChange('presencial')}
                      className={`w-[8rem] z-10 ${
                        isOnline ? 'text-[#3C76A6]' : 'text-[#D03719]'
                      }`}
                      name="presencial"
                      value="presencial"
                    >
                      Presencial
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
                      value="atp"
                    >
                      ATP
                    </button>
                    <div className="border-l border-[#54595F]"></div>
                    <button
                      onClick={() => handleModeChange('+18')}
                      className={`w-[8rem] z-10 ${
                        isOnline3 ? 'text-[#3C76A6]' : 'text-[#D03719]'
                      }`}
                      name="+18"
                      value="+18"
                    >
                      + 18
                    </button>
                  </div>
                </div>
                <div className="w-[17.125rem] bg-[rgb(231,239,247)] rounded-full relative">
                  <div
                    className={`bg-white absolute top-0 w-[8rem] h-full rounded-full border z-0 transition-all ${
                      isOnline2 ? 'left-[9.1rem]' : 'left-0'
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
                      onClick={() => handleModeChange('gratis')}
                      className={`w-[8rem] z-10 ${
                        isOnline2 ? 'text-[#3C76A6]' : 'text-[#D03719]'
                      }`}
                      name="gratis"
                      value={0}
                    >
                      Gratis
                    </button>
                  </div>
                </div>
              </div>
              <div className={`${isOnline2 ? 'hidden' : ''}`}>
                <label htmlFor="price" className="block mb-1 text-[#666]">
                  Valor
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="$"
                  className="mt-1 p-2 w-[11rem] border-2 rounded-md"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block mb-3">
                ¿En que categorias entra tu evento?
              </label>
              <div className="flex flex-wrap gap-8">
                {categories.map((category, index) => (
                  <div key={index} className="">
                    <button
                      onClick={() => handleIconChange(category)}
                      className={`flex items-center gap-3 p-2 rounded-md ${
                        iconos[category] === 'check'
                          ? 'bg-[#E7EFF7] text-[#306699]'
                          : 'bg-[#EEE] text-[#666]'
                      }`}
                    >
                      {category}
                      {iconos[category] === 'check' ? (
                        <Icon icon="ph:x" />
                      ) : (
                        <Icon icon="ph:check-bold" />
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-5 w-[28rem]">
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
                  placeholder="Respuesta 1"
                  className="mt-1 p-2 w-full border-2 rounded"
                />
              </div>
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
                  placeholder="Respuesta 2"
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
                  placeholder="Respuesta 3"
                  className="mt-1 p-2 w-full border-2 rounded"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="w-[28rem] mt-12">
          <button
            type="submit"
            name="publicar"
            onClick={handleOpenEventPostedPopup}
            className="w-full px-4 py-2 bg-[#D03719] text-xl text-white font-bold rounded-full"
          >
            Publicar
          </button>
          {openEventPostedPopup && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-black opacity-50 z-40"></div>
              <Image src='/cargando.png' width={100} height={100} className='animate-spin-slow z-50' />
            </div>
          )}
          <EventPostedPopup {...eventPopup} />
        </div>
      </form>
    </div>
  );
}

export default CreateEvent;
