import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { useDeletePrepaid } from "@hooks/prepaids";

export default NiceModal.create((props) => {
  const modal = useModal();
  const onClose = () => {
    modal.remove();
  };

  const albumId = props.albumId;
  const id = props.prepaid.id;

  const {
    deletePrepaid,
    isLoading: isUpdating,
    isSuccess,
  } = useDeletePrepaid(albumId);

  return (
    <>
      <label htmlFor="my-modal-6" className="btn hidden" />
      <input type="checkbox" id="my-modal-6" checked className="modal-toggle" />
      <div className="modal">
        <div className="modal-box  w-4/12 max-w-5xl h-2/5 min-h-[30%] flex flex-col justify-center">
          {isUpdating ? (
            <div>Cargando...</div>
          ) : (
            <>
              <label
                htmlFor="my-modal-3"
                className="btn btn-sm btn-circle absolute right-2 top-2"
                onClick={() => {
                  onClose();
                }}
              >
                ✕
              </label>
              <div className="justify-center flex-col flex">
                <div className="mb-8 text-center">
                  ¿Esta seguro que quiere eliminar el prepago?
                </div>
                <button
                  htmlFor="my-modal-6"
                  className="btn btn-sm text-sm mx-4 mb-4"
                  onClick={async () => {
                    const deleted = await deletePrepaid(id);

                    onClose();
                  }}
                >
                  Eliminar
                </button>

                <button
                  htmlFor="my-modal-6"
                  className="btn btn-sm text-sm mx-4"
                  onClick={() => {
                    onClose();
                  }}
                >
                  Cerrar
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
});
