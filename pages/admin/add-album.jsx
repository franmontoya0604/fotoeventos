import CheckInput from "@components/admin/CheckInput";
import Input from "@components/admin/Input";
import InputPassword from "@components/admin/InputPassword";
import dayjs from "dayjs";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { useCreateAlbum } from "../../hooks/albums";
import Layout from "./layout/index";

const formSchema = Yup.object().shape({
  name: Yup.string()
    .required("Required")
    .min(2, "Too Short!")
    .max(100, "Too Long!"),
  content: Yup.string(),
  password: Yup.string()
    .required("Required")

    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "La contraseña debe contener al menos 8 caracteres, una mayuscula, una minuscula, un numero y un caracter especial."
    ),
  imageUrl: Yup.string(),
  eventDate: Yup.string(),
  print: Yup.bool(),
  package: Yup.bool(),
  price: Yup.number().required("Required").positive(),
  pricePrint: Yup.number().positive(),
  pricePackage: Yup.number().positive(),
});

const initialValues = {
  name: "",
  content: "",
  password: "",
  imageUrl: "",
  eventDate: dayjs("2022-01-25"),
  print: false,
  package: false,
  price: 10,
  pricePrint: 15,
  pricePackage: 30,
};

function AddAlbum(props) {
  const [image, setImage] = useState("");
  const [imageName, setImageName] = useState("");
  const { createAlbum, isLoading: isUpdating } = useCreateAlbum();

  const formik = useFormik({
    validationSchema: formSchema,
    enableReinitialize: true,
    initialValues,
    validateOnMount: true,
    onSubmit: (values) => {
      createAlbum(values, {
        onSuccess: () => {
          alert("creadps");
        },
        onError: (e) => {
          console.error("ERROR", e);
        },
      });
    },
  });

  return (
    <div className="min-h-screen bg-base-200 flex items-center">
      <div className="card mx-auto w-full max-w-md  shadow-xl">
        <div className="py-12 p-10 bg-base-100 rounded-xl">
          <h2 className="text-2xl font-semibold mb-2 text-center">
            Crear album
          </h2>
          <form onSubmit={formik.handleSubmit}>
            {/* Error Message container if any, after submitting form */}
            <p className="mb-2 text-error text-center"></p>

            <div className="mb-4 ">
              <Input
                formik={formik}
                title="Titulo"
                value={formik.values.name}
                name="name"
                errors={formik.errors.name}
              />

              <Input
                formik={formik}
                title="Descripción"
                value={formik.values.content}
                name="content"
                textArea={true}
              />

              <InputPassword
                formik={formik}
                title="Contraseña"
                value={formik.values.password}
                name="password"
                errors={formik.errors.password}
              />

              <Input
                formik={formik}
                title="Fecha del evento"
                value={formik.values.eventDate}
                name="eventDate"
                type="date"
              />

              <label className="label mt-4">
                <span className="label-text text-base-content">
                  Foto de portada
                </span>
              </label>
              <label className="justify-center flex">
                <input
                  accept={".png, .jpg"}
                  id="contained-button-file"
                  type="file"
                  name="urlImage"
                  onChange={(e) => {
                    setImageName(e?.target?.files[0]?.name);
                    setImage(e?.target?.files[0]);
                  }}
                  className="hidden"
                />
                <div
                  className={
                    image
                      ? "w-36 h-36 cursor-pointer"
                      : "border-dashed rounded-sm border-2 w-36 h-36 cursor-pointer"
                  }
                >
                  <img
                    className={image ? "w-36 h-36" : "hidden"}
                    src={image ? URL.createObjectURL(image) : ""}
                  />
                  <div>{image ? imageName : "Seleccionar"}</div>
                </div>
              </label>

              <CheckInput
                formik={formik}
                title="Precio del paquete"
                check={formik.values.package}
                //setCheck={setCheckPackage}
                name="pricePackage"
                checkName="package"
                value={formik.values.pricePackage}
              />
              <CheckInput
                formik={formik}
                title="Precio de la foto impresa"
                check={formik.values.print}
                //setCheck={setCheckPackage}
                name="pricePrint"
                checkName="print"
                value={formik.values.pricePrint}
              />

              <Input
                formik={formik}
                title="Precio"
                value={formik.values.price}
                name="price"
                errors={formik.errors.price}
              />
            </div>

            <button
              type="submit"
              onClick={formik.handleSubmit}
              isDisabled={!formik.isValid}
              className={
                "btn mt-8 w-full btn-primary" + (isUpdating ? " Cargando" : "")
              }
            >
              Crear
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

AddAlbum.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default AddAlbum;
//campos : titulo,descripcion,fecha del evento,portada, dos check pra ver si es precio en paquete o inpreso y al lado el capo del precio para cada uno, y campo con precio normal, en el segundo paso se agregan las imagenes
