import Section from "../Section/Section";
import Container from "../Container/Container";
import Form from "../Form/Form";
import { useState } from "react";
import { getPhotos } from "../../services/photos";
import toast, { Toaster } from "react-hot-toast";
import type { Photo } from "../../types/photo";
import PhotosGallery from "../PhotosGallery/PhotosGallery";
import Loader from "../Loader/Loader";
import Text from "../Text/Text";
import Modal from "../Modal/Modal";

export default function App() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const handleSubmit = async (query: string) => {
    try {
      setPhotos([]);
      setIsError(false);
      setIsLoading(true);

      const responce = await getPhotos(query);

      setIsLoading(false);

      if (responce.length === 0) {
        toast.error("No photos found for your request.");
        return;
      }

      setPhotos(responce);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectedPhoto = (photo: Photo) => {
    setSelectedPhoto(photo);
  };

  const modalClose = () => {
    setSelectedPhoto(null);
  };

  return (
    <>
      <Section>
        <Container>
          <Form onSubmit={handleSubmit} />
          {photos.length > 0 && (
            <PhotosGallery photos={photos} onSelect={handleSelectedPhoto} />
          )}
          {selectedPhoto && (
            <Modal onClose={modalClose}>
              <img src={selectedPhoto.src.large} alt={selectedPhoto.alt} />
            </Modal>
          )}
          {isLoading && <Loader />}
          {isError && <Text>There was an error, please try again...</Text>}
        </Container>
        <Toaster />
      </Section>
    </>
  );
}
