import { supabase } from "./supabase";

export async function uploadPlayerImage(file: File) {
  const extension = file.name.split(".").pop();

  const fileName = `${Date.now()}.${extension}`;

  const { error } = await supabase.storage
    .from("Players")
    .upload(fileName, file);

  if (error) throw error;

  const { data } = supabase.storage
    .from("Players")
    .getPublicUrl(fileName);

  return data.publicUrl;
}