import NiceModal, { useModal } from "@ebay/nice-modal-react";
import Upload from "./upload";
import { useQueryClient } from "react-query";

export default NiceModal.create(() => {

  const modal = useModal();
  const onClose = () => {
    modal.remove();
  };

  return (
    <>
      <label htmlFor="my-modal-6" className="btn hidden" />
      <input type="checkbox" id="my-modal-6" checked className="modal-toggle" />
      <div className="modal">
        <div className="modal-box  w-7/12 max-w-5xl h-4/5 min-h-[80%] flex flex-col justify-between">
          <label
            htmlFor="my-modal-3"
            className="btn btn-sm btn-circle absolute right-2 top-2"
            onClick={() => {
              onClose();
            }}>
            ✕
          </label>
          <Upload />
        </div>
      </div>
    </>
  );
});
