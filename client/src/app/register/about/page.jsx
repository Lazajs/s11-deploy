'use client';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import CheckboxInput from '../../../components/CheckboxInput';

function AboutPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    birthDate: '',
    password: '',
    confirmPassword: '',
  });
  const [selectedInterests, setSelectedInterests] = useState([]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleInterestChange = (event) => {
    const interest = event.target.value;
    if (event.target.checked) {
      setSelectedInterests([...selectedInterests, interest]);
    } else {
      setSelectedInterests(
        selectedInterests.filter((item) => item !== interest),
      );
    }
  };

  function handleSubmit(e) {
    e.preventDefault();
    // Perform register logic here
    console.log('Submitted:', formData);
    if (selectedInterests.length > 0) {
      // Realizar la acción de registro
      console.log('Intereses seleccionados:', selectedInterests);
    } else {
      alert('Debes seleccionar al menos un interés antes de registrarte.');
    }
  }

  return (
    <main className="flex justify-center">
      <div className="w-[304px] flex flex-col items-center justify-center py-8">
        <div className="flex flex-row-reverse w-full">
          <Icon icon="ph:x" className="text-[#54595F] w-[26px] h-[26px]" />
        </div>
        {/* Title */}
        <div className="mb-6 w-full">
          <h1 className="font-semibold text-[26.5px] text-left">
            Acerca de vos
          </h1>
        </div>

        <div>
          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Name */}
            <div className="mb-6">
              <div className="flex flex-col font-medium">
                <label htmlFor="name" className="text-[11px] mb-2.5">
                  Nombre
                </label>
                <input
                  type="name"
                  id="name"
                  name="name"
                  value={formData.name || ''}
                  onChange={handleChange}
                  required
                  placeholder="Nombre"
                  className="border border-[#1E1E1E] rounded-md outline-none px-4 py-2 w-[303px] h-[38px] text-[9.5px] placeholder:text-[#808080] placeholder:font-normal"
                />
              </div>
            </div>
            {/* Birth Date */}
            <div className="mb-6">
              <div className="flex flex-col font-medium">
                <label htmlFor="birthDate" className="text-[11px] mb-2.5">
                  Fecha de nacimiento
                </label>
                <input
                  type="birthDate"
                  id="birthDate"
                  name="birthDate"
                  value={formData.birthDate || ''}
                  onChange={handleChange}
                  required
                  placeholder="25/12/1989"
                  className="border border-[#ADADAD] rounded-md outline-none px-4 py-2 w-[303px] h-[38px] text-[9.5px] placeholder:text-[#808080] placeholder:font-normal"
                />
              </div>
            </div>
            {/* Interests */}
            <div className="flex flex-col text-[11px] font-medium">
              <p className="mb-4">¿Qué tipos de eventos te interesan?</p>
              <CheckboxInput
                label="Gastronómicos"
                name="gastronomicos"
                checked={selectedInterests.includes('gastronómicos')}
                onChange={handleInterestChange}
              />
              <CheckboxInput
                label="Culturales"
                name="culturales"
                checked={selectedInterests.includes('culturales')}
                onChange={handleInterestChange}
              />
              <CheckboxInput
                label="Deportivos"
                name="deportivos"
                checked={selectedInterests.includes('deportivos')}
                onChange={handleInterestChange}
              />
              <CheckboxInput
                label="Educativos"
                name="educativos"
                checked={selectedInterests.includes('educativos')}
                onChange={handleInterestChange}
              />
              <CheckboxInput
                label="Familiares y niños"
                name="familiares"
                checked={selectedInterests.includes('familiares')}
                onChange={handleInterestChange}
              />
              <CheckboxInput
                label="Conferencias y convenciones"
                name="conferencias"
                checked={selectedInterests.includes('conferencias')}
                onChange={handleInterestChange}
              />
              <CheckboxInput
                label="Causas benéficas"
                name="causas"
                checked={selectedInterests.includes('causas')}
                onChange={handleInterestChange}
              />
              <CheckboxInput
                label="Sociales y de entretenimiento"
                name="sociales"
                checked={selectedInterests.includes('sociales')}
                onChange={handleInterestChange}
              />
              <CheckboxInput
                label="Moda y belleza"
                name="moda"
                checked={selectedInterests.includes('moda')}
                onChange={handleInterestChange}
              />
            </div>
            {/* Submit */}
            <div className="mt-8 w-[303px] h-[36px]">
              <button
                type="submit"
                className="border rounded-md bg-[#659DCB] outline-none w-full h-full text-white text-[11px]"
              >
                Registrarse
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

export default AboutPage;
