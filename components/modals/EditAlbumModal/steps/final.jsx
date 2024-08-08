import { useModal } from "@ebay/nice-modal-react";
import { useState } from "react";
import Balancer from "react-wrap-balancer";
import UploadPhotosModal from "../../UploadPhotosModal";

export default function Final({ onClose, album }) {
  const uploadPhotos = useModal(UploadPhotosModal, { album });
  const [value, setValue] = useState({
    startDate: new Date(),
    endDate: new Date().setMonth(11),
  });

  const handleValueChange = (newValue) => {
    setValue(newValue);
  };
  const triggerUploadPhotos = () => {
    onClose();
    uploadPhotos.show({ albumId: 12 });
  };
  return (
    <div className="mt-9 mx-6">
      <h3 className="font-bold text-center">Todo Listo!</h3>
      <p className="font-sans text-center">
        <Balancer>
          En este paso podrás configurar si quieres cobrar por la descarga de
          fotos y los precios.
        </Balancer>
      </p>
      <div className="flex justify-center flex-col items-center mt-4">
        <button
          className="btn btn-primary"
          onClick={() => {
            triggerUploadPhotos();
          }}
        >
          Subir fotos ahora
        </button>
      </div>
      <div></div>
    </div>
  );
}
