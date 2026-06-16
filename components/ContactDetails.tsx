"use client";

import { supabase } from "../lib/supabase";

type Contact = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  company: string;
  avatar_path?: string | null;
};

export default function ContactDetails({
  contact,
}: {
  contact: Contact | null;
}) {
  if (!contact) {
    return (
      <div className="bg-white p-4 rounded-xl shadow">
        Select a contact
      </div>
    );
  }

  const avatarUrl = contact.avatar_path
    ? supabase.storage
        .from("avatars")
        .getPublicUrl(contact.avatar_path).data.publicUrl
    : null;

  return (
    <div className="bg-white w-8 md:w-12 lg:w-24 aspect-square p-6 rounded-xl shadow">
      {avatarUrl ? (
        <img
          src={avatarUrl}
          className="w-2/3 h-2/3 object-cover"
        />
      ) : (
        <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center">
          {contact.first_name?.[0]}
          {contact.last_name?.[0]}
        </div>
      )}

      <h2 className="text-xl font-bold mt-2">
        {contact.first_name} {contact.last_name}
      </h2>

      <p><a href={`mailto:${contact.email}?subject=Hello ${contact.first_name}`} className="text-white bg-blue-600">{contact.email}</a></p>
      <p>{contact.phone}</p>
      <p>{contact.company}</p>
    </div>
  );
}