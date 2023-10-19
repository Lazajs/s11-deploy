import React from 'react'

function EventDetails() {
  return (
    <section className='max-w-7xl mx-auto my-32'>
      <div className='flex justify-between'>
        <div className='w-[41.5rem] flex flex-col gap-8'>
          <div className='w-full h-[21.75rem] bg-gray-400 rounded-3xl'></div>
          <div className='w-full h-[3.3rem] bg-gray-300 rounded-xl'></div>
          <div className='w-full h-[3.3rem] bg-gray-300 rounded-xl'></div>
          <div className='w-full h-[3.3rem] bg-gray-300 rounded-xl'></div>
          <div className='w-full h-[3.3rem] bg-gray-300 rounded-xl'></div>
          <div className='w-full h-[3.3rem] bg-gray-300 rounded-xl'></div>
        </div>
        <div className='w-[24rem] flex flex-col justify-between'>
          <div className='w-full flex items-center gap-5 px-5 h-[7.2rem] rounded-xl bg-gray-300'>
            <div className='w-[5.8rem] h-[5.8rem] bg-gray-400 rounded-full'></div>
            <div>
              <div className='h-1 w-[8.6rem] bg-gray-400'></div>
            </div>
          </div>
          <div className='w-full h-[3.3rem] rounded-xl bg-gray-300'></div>
          <div className='w-full h-[3.3rem] rounded-xl bg-gray-300'></div>
          <div className='w-full h-[3.3rem] rounded-xl bg-gray-300'></div>
          <div className='w-full h-[3.3rem] rounded-xl bg-gray-400'></div>
          <div className='w-full h-[17.3rem] rounded-xl bg-gray-400'></div>
        </div>
      </div>
      <div className='w-full mt-10 flex flex-col gap-5'>
        <h2 className='text-center'>QA</h2>
        <div className='w-full h-12 bg-gray-300 rounded-xl'></div>
        <div className='w-full h-12 bg-gray-300 rounded-xl'></div>
        <div className='w-full h-12 bg-gray-300 rounded-xl'></div>
        <div className='w-full flex justify-between'>
          <div className='w-[40rem]'></div>
          <div className='w-[40rem] flex flex-col gap-5'>
            <div className='w-full h-12 bg-gray-300 rounded-xl'></div>
            <div className='w-full h-12 bg-gray-300 rounded-xl'></div>
            <div className='w-full h-12 bg-gray-300 rounded-xl'></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default EventDetails