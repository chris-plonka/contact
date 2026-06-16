"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useContactsStore } from "../store/useContactStore";
import AvatarUpload from "./AvatarUpload";
import Image from "next/image";

type ContactFormData = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  company: string;
  avatar_path: string;
};

export default function ContactForm() {
  const { addContact } = useContactsStore();

  const [form, setForm] = useState<ContactFormData>({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    company: "",
    avatar_path: "",
  });

  const submit = async () => {
    const { data, error } = await supabase
      .from("contacts")
      .insert(form)
      .select()
      .single();

    if (error) {
      console.error(error);
      return;
    }

    if (data) {
  addContact(data);

  setForm({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    company: "",
    avatar_path: "",
  });
}
  }
const avatarUrl = form.avatar_path
  ? supabase.storage
      .from("avatars")
      .getPublicUrl(form.avatar_path)
      .data.publicUrl
  : null;

  return (
    <div className="bg-white p-4 rounded-xl shadow space-y-3">
      <h2 className="font-bold">Add Contact</h2>

      <input
        className="border p-2 w-full"
        placeholder="First Name"
        value={form.first_name}
        onChange={(e) =>
          setForm({
            ...form,
            first_name: e.target.value,
          })
        }
      />

      <input
        className="border p-2 w-full"
        placeholder="Last Name"
        value={form.last_name}
        onChange={(e) =>
          setForm({
            ...form,
            last_name: e.target.value,
          })
        }
      />

      <input
        className="border p-2 w-full"
        placeholder="Email"
        value={form.email}
        onChange={(e) =>
          setForm({
            ...form,
            email: e.target.value,
          })
        }
      />

      <input
        className="border p-2 w-full"
        placeholder="Phone"
        value={form.phone}
        onChange={(e) =>
          setForm({
            ...form,
            phone: e.target.value,
          })
        }
      />

      <input
        className="border p-2 w-full"
        placeholder="Company"
        value={form.company}
        onChange={(e) =>
          setForm({
            ...form,
            company: e.target.value,
          })
        }
      />

      <div>
        <label className="block mb-1 font-medium">
          Avatar
        </label>

        <AvatarUpload
          onUploaded={(path) =>
            setForm((prev) => ({
              ...prev,
              avatar_path: path,
            }))
          }
        />

        {avatarUrl && (
  <div className="mt-2">
    <Image
  src={avatarUrl}
  alt="Avatar preview"
  width={80}
  height={80}
  className="object-cover border"
/>

    <p className="text-sm text-green-600 mt-1">
      Avatar uploaded ✓
    </p>
  </div>
)}
</div>
      <button
        onClick={submit}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
      >
        Save
      </button>
    </div>
  );
}