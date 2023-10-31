export default function Messages () {
  const eventCount = 6 // Calculate event count
  return (
    <section>
      <h2 className="text-2xl font-semibold text-[#1A1A1B]">Mensajes <span className="font-[600] text-sm text-[#636363]">| {eventCount} Eventos</span></h2>
    </section>
  );
}
