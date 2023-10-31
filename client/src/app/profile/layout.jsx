import ProfileNav from "@/components/ProfileNav";

export default function ProfileLayout ({children}) {
  return (
    <main className="py-28 px-24 flex gap-28">
      <ProfileNav />
      <aside>
        { children }
      </aside>
    </main>
  );
}