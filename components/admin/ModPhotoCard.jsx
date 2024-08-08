import { useCallback, useState } from "react";
import { FiCheckCircle, FiSave, FiTrash2 } from "react-icons/fi";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import TagInput from "../../components/ui/TagInput";
import { useSavePhoto, useUpdatePhotoTags } from "../../hooks/tags";

function ModPhotoCard({ photo }) {
  const {
    UpdatePhotoTags,
    isLoading: isLoading,
    isError: isUpdatingError,
  } = useUpdatePhotoTags();
  const {
    SavePhoto,
    isLoading: isSavingPhoto,
    isError: isSavingPhotoError,
  } = useSavePhoto();
  //
  const [tags, setTags] = useState([]);
  const [saved, setSaved] = useState(false);
  const [isRejectingPhoto, setisRejectingPhoto] = useState(false);
  const handleTagsChange = useCallback((event, tags) => {
    UpdatePhotoTags({ photo, tags });
    setTags(tags);
  }, []);
  //
  const handleSavePhoto = useCallback((event, tags) => {
    photo.status = "APPROVED";
    SavePhoto(
      { photo },
      {
        onSuccess: () => setSaved(true),
      }
    );
    setTags(tags);
  }, []);
  const handleRejectPhoto = useCallback((event, tags) => {
    setisRejectingPhoto(true);
    photo.status = "DISCARDED";
    SavePhoto(
      { photo },
      {
        onSuccess: () => setSaved(true),
      }
    );
    setTags(tags);
  }, []);
  return (
    <div className="card card-compact w-96 bg-base-100 shadow-xl h-fit">
      <figure>
        <Zoom>
          <img src={photo.mod_url} alt={photo.original_name} />
        </Zoom>
      </figure>
      <div className="card-body">
        <div className="card-actions">
          <div className="btn-group absolute top-0 right-0 rounded-none rounded-tr-lg rounded-bl-lg">
            {saved && <FiCheckCircle className="w-5 text-green-500 m-2" />}
            {!saved && (
              <>
                <button
                  className={`btn btn-sm bg-white border-white text-green-500 rounded-none  ${isSavingPhoto ? "Guardando" : ""
                    }`}
                  onClick={handleSavePhoto}
                >
                  <FiSave className="w-5 text-green-500" />
                </button>
                <button
                  className={`btn btn-sm bg-white border-white text-red-500 rounded-none  ${isRejectingPhoto ? "Cargando" : ""
                    }`}
                  onClick={handleRejectPhoto}
                >
                  <FiTrash2 className="w-5 text-red-500" />
                </button>
              </>
            )}
          </div>
          <div className="w-full">
            <TagInput
              tags={tags}
              onTagsChange={handleTagsChange}
              placeholder="Etiquetar..."
              tagCloseButtonProps={{ isSaving: isLoading }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default ModPhotoCard;
