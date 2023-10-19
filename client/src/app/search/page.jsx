import React from 'react';

function SearchPage() {
  const array = [];

  for (let i = 1; i <= 4; i++) {
    array.push(i);
  }

  return (
    <main className="flex max-w-[78.4375rem] mx-auto flex-col items-center justify-between gap-14 p-10">
      <div className="bg-gray-300 w-full h-[21.75rem] rounded-[1.5625rem] mt-28">
        1
      </div>
      <div className="bg-gray-200 lg:w-[33.5625rem] w-full h-[3.3125rem] rounded-xl">
        2
      </div>
      <div className="grid grid-cols-4 gap-x-[4.5625rem] gap-y-[8rem] w-full">
        {array.map((i) => (
          <div key={i} className="bg-gray-200 w-full h-[3.3125rem] rounded-xl">
            {i}
          </div>
        ))}
        <div className="grid gap-[2.75rem]">
          {array.map((i) => (
            <div
              key={i}
              className="bg-gray-200 w-full h-[3.3125rem] rounded-xl"
            >
              {i}
            </div>
          ))}
        </div>
        {array.map((i, index) => {
          if (index < 3) {
            return (
              <div
                key={i}
                className="bg-gray-300 lg:w-[16.1875rem] w-36 lg:h-[15.375rem] h-[6.375rem] rounded-[1.5625rem] flex flex-col-reverse items-center"
              >
                <div className="bg-gray-200 w-6/12 h-[3.3125rem] rounded-xl mb-4">
                  {i}
                </div>
              </div>
            );
          } else {
            return null;
          }
        })}
      </div>
    </main>
  );
}

export default SearchPage;
