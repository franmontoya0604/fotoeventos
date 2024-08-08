import Input from "@components/admin/Input";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import { FilePond, registerPlugin } from "react-filepond";
import Datepicker from "react-tailwindcss-datepicker";
import Balancer from "react-wrap-balancer";
import slug from "slug";

// Import FilePond styles
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import "filepond/dist/filepond.min.css";

registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileValidateType
);

export default function Details({ formik, value, setValue, files, setFiles }) {
  const handleValueChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <form className="mx-6" onSubmit={formik.handleSubmit}>
      <h3 className="font-bold text-center">Detalles</h3>
      <p className="font-sans text-center">
        <Balancer>En este primer paso ingresa los detalles del album.</Balancer>
      </p>
      <div className="grid grid-cols-2 gap-3 w-4/5 mx-auto">
        <div className="ml-6">
          <Input
            formik={formik}
            title="Título"
            value={formik.values.name}
            name="name"
            errors={formik.errors.name}
            touched={formik.touched.name}
            slugTouched={formik.touched.slug}
          />
          <Input
            formik={formik}
            title="Descripción"
            value={formik.values.content}
            name="content"
            textArea={true}
          />

          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Fecha del evento:</span>
            </label>
            <Datepicker
              value={value}
              onChange={handleValueChange}
              asSingle={true}
              useRange={false}
              displayFormat={"DD/MM/YYYY"}
              i18n={"es"}
              readOnly={true}
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Estado:</span>
            </label>
            <select
              className="select select-bordered"
              name="status"
              value={formik.values.status}
              onChange={formik.handleChange}
            >
              <option value="" disabled selected>
                Seleccionar
              </option>
              <option value="DRAFT">Borrador</option>
              <option value="HIDDEN">Oculto</option>
              <option value="PUBLISHED">Publicado</option>
            </select>
          </div>
        </div>
        <div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Caratula:</span>
            </label>
            <FilePond
              files={files}
              onupdatefiles={setFiles}
              allowMultiple={false}
              server={{
                url: "/api/media",
                timeout: 70000,
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
              name="files"
              labelIdle='Arrastra y suelta tu caratula o <br><span class="filepond--label-action">explora</span>'
              stylePanelLayout="compact"
              stylePanelAspectRatio="1:1"
              styleLoadIndicatorPosition="center bottom"
              styleProgressIndicatorPosition="right bottom"
              styleButtonRemoveItemPosition="left bottom"
              styleButtonProcessItemPosition="right bottom"
              credits="false"
              imagePreviewHeight="170"
              imageResizeTargetWidth="200"
              imageResizeTargetHeight="200"
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
              accept="image/png, image/jpeg, image/gif"
            />
          </div>
        </div>
        <div className="form-control w-full max-w-xs ml-6">
          <label className="label pb-0 pt-3 pl-0">
            <span className="label-text">URL:</span>
          </label>
          <div className="flex flex-row ">
            <div className="flex items-center pr-1">
              {/*TODO agregar slug del fotografo */}
              https://www.fotoeventos.ar/slug/
            </div>
            <input
              type={"text"}
              placeholder=""
              className="input input-primary input-bordered w-44 h-10"
              onChange={(e) => {
                formik.setFieldValue(
                  "slug",
                  slug(e.target.value, {
                    remove: /[`~!@#$%^&*()\+=\[\]{};:'"\\|\/,.<>?]/g,
                    replacement: "-",
                    lower: true,
                  })
                );
                formik.handleChange(e);
              }}
              onBlur={(e) => {
                formik.handleBlur();
              }}
              value={slug(formik.values.slug, {
                remove: /[`~!@#$%^&*()\+=\[\]{};:'"\\|\/,.<>?]/g,
                replacement: "-",
                lower: true,
              })}
              id="slug"
              name="slug"
            />
          </div>
        </div>
      </div>
    </form>
  );
}
