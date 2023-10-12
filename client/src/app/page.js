export default function Home () {
  const img = [
    '1', '2', '3', '4'
  ]
  return (
    <main className="flex max-w-[78.4375rem] mx-auto flex-col items-center justify-between gap-14 p-10">
      <div className="bg-gray-300 w-full h-[21.75rem] rounded-[1.5625rem] mt-28">1</div>
      <div className="bg-gray-200 lg:w-[33.5625rem] w-full h-[3.3125rem] rounded-xl">2</div>
      <div className="grid lg:grid-cols-4 grid-cols-2 lg:gap-[4.5625rem] gap-4">
        {img.map((i) => (
          <div key={i} className="bg-gray-300 lg:w-[16.1875rem] w-36 lg:h-[15.375rem] h-[6.375rem] rounded-[1.5625rem]">{i}</div>
        ))}
      </div>
    </main>
  );
}
