import { useContext } from "react";
import { SessionContext } from "@/context/SessionProvider";

export default function useSession () {
  return useContext(SessionContext);
}