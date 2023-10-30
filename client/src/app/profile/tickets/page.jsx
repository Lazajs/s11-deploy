import Icons from "@/components/ProfileNav/Icons";

const { Ticket: TicketIcon } = Icons

export default function Tickets () {
  return (
    <section>
      <h2 className="text-2xl font-semibold text-[#1A1A1B]">Mis entradas <span className="font-[600] text-sm text-[#636363]">| <span className="inline-block"><TicketIcon /></span></span></h2>
    </section>
  );
}
