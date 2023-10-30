export default function Calendar () {
  return (
    <section>
      <h2 className="text-2xl font-semibold text-[#1A1A1B]">Mis eventos <span className="font-[600] text-sm text-[#636363]">| {new Date().getFullYear()}</span></h2>
    </section>
  );
}
