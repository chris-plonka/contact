"use client";

import { useEffect, useRef } from "react";
import { supabase } from "../lib/supabase";
import { useContactsStore } from "../store/useContactStore";

export default function ContactList({ listRef }: any) {
  const {
    contacts,
    selectedContactId,
    selectContact,
    setContacts,
  } = useContactsStore();

 const prevLength = useRef(0);
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("contacts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) { console.error(error);
return;}

      setContacts(data || []);
    };

    fetchData();

    const channel = supabase
      .channel("contacts")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "contacts" },
        fetchData
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [setContacts]);

 // SCROLL TO TOP ONLY WHEN NEW CONTACT ADDED
  useEffect(() => {
    if (contacts.length > prevLength.current) {
      listRef?.current?.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  prevLength.current = contacts.length;
  }, [contacts]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!contacts.length) return;

      const currentIndex = contacts.findIndex(
        (c) => c.id === selectedContactId
      );

if (currentIndex === -1) return;

      if (e.key === "ArrowDown") {
        const next =
          currentIndex < contacts.length - 1
            ? currentIndex + 1
            : 0;

        selectContact(contacts[next].id);
      }

      if (e.key === "ArrowUp") {
        const prev =
          currentIndex > 0
            ? currentIndex - 1
            : contacts.length - 1;

        selectContact(contacts[prev].id);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [contacts, selectedContactId, selectContact]);

  return (
    <div
      ref={listRef}
      
      className="flex flex-col h-full bg-white rounded-xl shadow"
      style={{
    scrollbarWidth: "none",
  }}
    >
 
      <h2 className="sticky top-0 bg-white/90 backdrop-blur py-3 font-bold border-b z-10">Contacts</h2>
    <div className="flex-1 overflow-y-auto">
      {contacts.map((c) => {
        const isActive = c.id === selectedContactId;

        return (
           
          <div
            key={c.id}
            onClick={() => selectContact(c.id)}
            className={`p-2 border-b cursor-pointer transition-all duration-200 rounded-md
              ${isActive ? "bg-blue-50 shadow-sm border-l-4 border-blue-500" : "hover:bg-gray-50"}
            `}
          >
            <div className="font-medium">
              {c.first_name} {c.last_name}
            </div>

            <div className="text-xs text-gray-500">
              {c.email}
            </div>
          </div>
        );
      })}
    </div>

  </div>
  );
}