import { IMAGES } from "../data/images";

export function getImage(p) {
  if (!p) return null;
  if (!p.promoted) return IMAGES.normal[p.type] || null;
  return IMAGES.promoted[p.type] || IMAGES.normal[p.type] || null;
}
