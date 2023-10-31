import Icons from "@/components/ProfileNav/Icons";

const {Heart} = Icons

export default function Favorites () {
  return (
    <section>
      <h2 className="text-2xl font-semibold text-[#1A1A1B]">Favoritos <span className="font-[600] text-sm text-[#636363]">| <span className="inline-block"><Heart /></span></span></h2>

    </section>
  );
}
