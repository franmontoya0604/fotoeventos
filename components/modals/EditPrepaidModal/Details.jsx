import Input from "@components/admin/Input";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import { registerPlugin } from "react-filepond";
import Datepicker from "react-tailwindcss-datepicker";
import Balancer from "react-wrap-balancer";

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
        <Balancer>
          En este primer paso ingresa los detalles del album a editar.
        </Balancer>
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
              <span className="label-text">URL:</span>
            </label>
            <div>https://www.fotoeventos.ar/slugphotographer/</div>
            <input
              type={"text"}
              placeholder=""
              className="input input-primary input-bordered w-full"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.slug}
              defaultValue={slug(formik.values.name, "-")}
              id="slug"
              name="slug"
            />
          </div>
        </div>
      </div>
    </form>
  );
}
