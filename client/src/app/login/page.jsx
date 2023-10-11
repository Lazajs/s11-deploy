'use client';
import { useState } from 'react';
import Link from 'next/link';

function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  function handleSubmit(e) {
    e.preventDefault();
    // Perform login logic here
    console.log('Submitted:', formData);
  }

  return (
    <main className="flex flex-col items-center mt-10">
      <div className="flex flex-col items-center w-[300px] xl:w-[800px] xl:h-[594px] xl:border-[6px] border-fifth rounded-[20px]">
        {/* Form */}
        <form onSubmit={handleSubmit} className="w-[330px]">
          <h1 className="border border-2 rounded-2xl outline-none px-4 py-2 mb-16 mx-auto w-[90%] xl:w-[100%] xl:text-[20px] xl:mt-12">
            Logo
          </h1>
          {/* Email */}
          <div className="mb-6 xl:mt-20">
            <div className="flex items-center">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email || ''}
                onChange={handleChange}
                required
                placeholder="Email"
                className="border border-2 rounded-2xl outline-none px-4 py-2 mb-16 mx-auto w-[100%] xl:text-[20px] xl:mb-4"
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-4 xl:mb-8">
            <div className="flex items-center">
              <div className="border border-2 rounded-2xl outline-none px-4 py-2 mx-auto w-[100%] xl:text-[20px]">
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password || ''}
                  onChange={handleChange}
                  required
                  placeholder="Password"
                  className="w-full mr-2 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="xl:w-[477px]">
            <button
              type="submit"
              className="border border-2 rounded-2xl outline-none px-4 py-2 mb-16 mx-auto w-[100%] xl:text-[20px] xl:w-[330px]"
            >
              Continue
            </button>
          </div>
        </form>

        {/* Google */}
        <div className="mt-12">
          <Link
            href="/"
            className="flex items-center justify-start button border border-sixth border-2 rounded-2xl px-4 space-x-6 w-[330px] h-[41px] xl:hidden"
          >
            <p>Continuar con Google</p>
          </Link>
        </div>
        {/* Guest */}
        <Link
          href="/"
          className="flex items-center justify-start button border border-sixth border-2 rounded-2xl px-4 space-x-6 w-[330px] h-[41px] mt-4 xl:hidden"
        >
          ¿No tienes cuenta? <span className="underline">Regístrate</span>
        </Link>
      </div>
    </main>
  );
}

export default LoginPage;
