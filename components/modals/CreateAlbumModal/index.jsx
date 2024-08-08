import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { useCreateAlbum } from "@hooks/albums";
import dayjs from "dayjs";
import { useFormik } from "formik";
import { useState } from "react";
import { Wizard } from "react-use-wizard";
import * as Yup from "yup";
import Details from "./steps/details";
import Final from "./steps/final";
import Footer from "./steps/footer";
import Header from "./steps/header";

const formSchema = Yup.object().shape({
  name: Yup.string()
    .required("Required")

    .max(100, "Too Long!"),
  content: Yup.string(),
  /*password: Yup.string()
    .required("Required")

    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "La contraseña debe contener al menos 8 caracteres, una mayuscula, una minuscula, un numero y un caracter especial."
    ),*/

  eventDate: Yup.string(),
  status: Yup.string().required(),
  slug: Yup.string().required(),
  //print: Yup.bool(),
  //package: Yup.bool(),
  //price: Yup.number().required("Required").positive(),
  //pricePrint: Yup.number().positive(),
  //pricePackage: Yup.number().positive(),
});

const initialValues = {
  name: "",
  content: "",
  slug: "",
  //password: "",
  //imageUrl: "",
  //eventDate: dayjs("2022-01-25"),
  //print: false,
  //package: false,
  //price: 0,
  //pricePrint: 0,
  //pricePackage: 0,
};

export default NiceModal.create((props) => {
  const [files, setFiles] = useState([]);
  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  });

  const modal = useModal();
  const onClose = () => {
    modal.remove();
  };

  const { createAlbum, isLoading: isUpdating } = useCreateAlbum();

  const formik = useFormik({
    validationSchema: formSchema,
    enableReinitialize: true,
    initialValues,
    validateOnMount: true,
    onSubmit: (values) => {
      values.eventDate = dayjs(value.endDate);
      values.fileId = JSON.parse(files[0]?.serverId).fileId;

      const albumCreated = createAlbum(values, {
        onSuccess: () => {
          // alert("Album creado con exito");
        },
        onError: (err) => {
          alert(err.response.data.error);
        },
      });
    },
  });

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
            }}
          >
            ✕
          </label>
          <Wizard
            footer={
              <Footer
                onClose={onClose}
                formik={formik}
                isUpdating={isUpdating}
                eventDate={value.endDate}
                file={files}
              />
            }
            header={<Header />}
          >
            {/*TODO añadir loader */}

            <Details
              formik={formik}
              value={value}
              setValue={setValue}
              files={files}
              setFiles={setFiles}
            />

            {/* <Monetization /> */}
            {isUpdating ? (
              <div className="place-content-center">Guardando...</div>
            ) : (
              <Final onClose={onClose} />
            )}
          </Wizard>
        </div>
      </div>
    </>
  );
});
