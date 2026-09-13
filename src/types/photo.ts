export interface Photo {
  id: number;
  avg_color: string;
  alt: string;
  src: PhotoSrc;
}
interface PhotoSrc {
  large: string;
  original: string;
}
