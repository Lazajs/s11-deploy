import React from 'react';

function Profile () {
  return (
    <div className="w-full h-screen grid place-items-center">
      <div className="bg-gray-300 w-[50rem] h-[37rem] rounded-3xl flex">
        <div className='p-10 flex flex-col gap-5'>
          <div className='w-40 h-40 bg-gray-100 rounded-full'></div>
          <div className='w-full h-[1.625rem] bg-gray-100 rounded-full'></div>
        </div>
        <div className='w-96 py-10 flex flex-col justify-between'>
          <div className='w-full h-[3.3125rem] bg-gray-500 rounded-3xl'></div>
          <div className='w-full h-[3.3125rem] bg-gray-100 rounded-3xl'></div>
          <div className='w-full h-[6.5625rem] bg-gray-100 rounded-3xl'></div>
          <div className='w-full flex justify-between'>
            <div className='w-12 h-12 rounded-full bg-gray-700'></div>
            <div className='w-12 h-12 rounded-full bg-gray-700'></div>
            <div className='w-12 h-12 rounded-full bg-gray-700'></div>
            <div className='w-12 h-12 rounded-full bg-gray-700'></div>
          </div>
          <div className='w-full h-[3.3125rem] bg-gray-100 rounded-3xl'></div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
