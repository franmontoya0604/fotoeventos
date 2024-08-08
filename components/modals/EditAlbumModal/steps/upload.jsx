import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import { useState } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import Balancer from "react-wrap-balancer";

// Import FilePond styles
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import "filepond/dist/filepond.min.css";
// TODO mover todo lo que sea filepond a un componente propio
// CUANDO SE EMPIEZA A SUBIT UNA FOTO, NO DEJAR CAMBIAR DE STEP O CERRAR LA VENTANA SIN ANTES PREGUNTAR PARA QUE NO SE PIERDAN LAS FOTOS

registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileValidateType
);

export default function Upload() {
  const [files, setFiles] = useState([]);

  const handleValueChange = (newValue) => {
    setValue(newValue);
  };
  return (
    <div className="mx-6">
      <h3 className="font-bold text-center">Carga de fotos</h3>
      <p className="font-sans text-center">
        <Balancer>
          En este paso podrás configurar si quieres cobrar por la descarga de
          fotos y los precios.
        </Balancer>
      </p>
      <div className="flex justify-center items-center">
        <div className="form-control w-full mx-2 mt-4">
          <FilePond
            files={files}
            onupdatefiles={setFiles}
            allowMultiple={true}
            maxParallelUploads="10"
            server={{
              url: "/api/media",
              timeout: 700000,
              process: {
                url: "/upload",
                method: "POST",
                headers: (file) => {
                  return {
                    filename: file.name,
                  };
                },
              },
              revert: "./revert",
              restore: "./restore/",
              load: "./load/",
              fetch: "./fetch/",
            }}
            className="multiple"
            name="files"
            labelIdle='Arrastra y suelta tus fotos o <span class="filepond--label-action">explora</span>'
            stylePanelLayout="compact"
            styleLoadIndicatorPosition="center bottom"
            styleProgressIndicatorPosition="right bottom"
            styleButtonRemoveItemPosition="left bottom"
            styleButtonProcessItemPosition="right bottom"
            credits="false"
            imagePreviewHeight="50%"
            imageResizeTargetWidth="150"
            imageResizeTargetHeight="150"
            allowRemove={false}
            allowRevert={false}
            labelInvalidField="Archivos invalidos"
            labelFileWaitingForSize="Esperando por tamaño"
            labelFileSizeNotAvailable="Tamaño no disponible"
            labelFileLoading="Cargando"
            labelFileLoadError="Error durante la carga"
            labelFileProcessing="Subiendo"
            labelFileProcessingComplete="Subida completa"
            labelFileProcessingAborted="Subida cancelada"
            labelFileProcessingError="Error durante la subida"
            labelFileProcessingRevertError="Error al cancelar"
            labelFileRemoveError="Error al remover"
            labelTapToCancel="toca para cancelar"
            labelTapToRetry="toca para reintentar"
            labelTapToUndo="toca para deshacer"
            labelButtonRemoveItem="Remover"
            labelButtonAbortItemLoad="Abortar"
            labelButtonRetryItemLoad="Reintentar"
            labelButtonAbortItemProcessing="Cancelar"
            labelButtonUndoItemProcessing="Deshacer"
            labelButtonRetryItemProcessing="Reintentar"
            labelButtonProcessItem="Subir"
            labelFileTypeNotAllowed="Tipo de archivo inválido"
            fileValidateTypeLabelExpectedTypes="Deben ser imágenes de tipo PNG o JPG"
            acceptedFileTypes={["image/png", "image/jpeg"]}
            onprocessfile={(error, file) => { }}
          />
        </div>
      </div>
    </div>
  );
}
