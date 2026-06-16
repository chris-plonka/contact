import { useEffect } from "react";
import { supabase } from "../lib/supabase";

export function useRealtimeContacts() {
  useEffect(() => {
    const channel = supabase
      .channel("contacts")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "contacts",
        },
        (payload) => {
          console.log(payload);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);
}

