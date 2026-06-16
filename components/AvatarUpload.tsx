"use client";

import { supabase } from "../lib/supabase";

type Props = {
  onUploaded: (path: string) => void;
};

export default function AvatarUpload({
  onUploaded,
}: Props) {
  const uploadAvatar = async (
    file: File
  ) => {
    const path =
      `${Date.now()}-${file.name}`;

    const { error } =
      await supabase.storage
        .from("avatars")
        .upload(path, file);

    if (error) {
      console.error(error);
      return;
    }

    onUploaded(path);
  };

  return (
    <input
      type="file"
      accept="image/*"
      onChange={(e) => {
        const file =
          e.target.files?.[0];

        if (file) {
          uploadAvatar(file);
        }
      }}
    />
  );
}