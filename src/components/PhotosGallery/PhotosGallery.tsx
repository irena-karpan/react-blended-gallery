import type { Photo } from "../../types/photo";
import Grid from "../Grid/Grid";
// import GridItem from "../GridItem/GridItem";
import PhotosGalleryItem from "../PhotosGalleryItem/PhotosGalleryItem";

interface PhotosGalleryProps {
  photos: Photo[];
  onSelect: (selectedPhotoObj: Photo) => void;
}

export default function PhotosGallery({
  photos,
  onSelect,
}: PhotosGalleryProps) {
  return (
    <Grid>
      {photos.map((element) => (
        <PhotosGalleryItem
          key={element.id}
          photo={element}
          onSelect={onSelect}
        />
      ))}
    </Grid>
  );
}
