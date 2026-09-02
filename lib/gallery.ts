import { supabase } from "./supabase";

export interface MatchGalleryImage {
  id: number;
  match_id: number;
  image_url: string;
  created_at: string;
}

/* =========================================================
   OBTENER FOTOS DE UN PARTIDO
========================================================= */

export async function getMatchGallery(
  matchId: number
) {
  const { data, error } = await supabase
    .from("match_gallery")
    .select("*")
    .eq("match_id", matchId)
    .order("created_at", {
      ascending: true,
    });

  if (error) throw error;

  return (data ?? []) as MatchGalleryImage[];
}

/* =========================================================
   AGREGAR FOTO A LA GALERÍA
========================================================= */

export async function addMatchGalleryImage(
  matchId: number,
  imageUrl: string
) {
  const { data, error } = await supabase
    .from("match_gallery")
    .insert({
      match_id: matchId,
      image_url: imageUrl,
    })
    .select()
    .single();

  if (error) throw error;

  return data as MatchGalleryImage;
}

/* =========================================================
   ELIMINAR FOTO DE LA GALERÍA
========================================================= */

export async function deleteMatchGalleryImage(
  id: number
) {
  const { error } = await supabase
    .from("match_gallery")
    .delete()
    .eq("id", id);

  if (error) throw error;
}