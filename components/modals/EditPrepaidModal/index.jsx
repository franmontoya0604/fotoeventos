import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { useEditPrepaid } from "@hooks/prepaids";
import dayjs from "dayjs";
import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import Details from "./Details";
import Final from "./steps/final";

dayjs.locale("es");

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
  //print: Yup.bool(),
  //package: Yup.bool(),
  //price: Yup.number().required("Required").positive(),
  //pricePrint: Yup.number().positive(),
  //pricePackage: Yup.number().positive(),
});

export default NiceModal.create((props) => {
  const initialValues = {
    name: props.album.name,
    content: props.album.content,
    status: props.album.status,
    //password: "",
    //imageUrl: "",
    //eventDate: props.album.eventDate,
    //print: false,
    //package: false,
    //price: 0,
    //pricePrint: 0,
    //pricePackage: 0,
  };

  const modal = useModal();
  const onClose = () => {
    modal.remove();
  };

  const albumId = props.albumId;

  const { editPrepaid, isLoading: isUpdating } = useEditPrepaid(albumId);

  const formik = useFormik({
    validationSchema: formSchema,
    enableReinitialize: true,
    initialValues,
    validateOnMount: true,
    onSubmit: (values) => {
      values.id = props.prepaid.id;

      const prepaid = editPrepaid(values, {
        onSuccess: () => {
          alert("Prepago editado con exito");
        },
        onError: () => {
          console.info("ERROR");
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

          <Details formik={formik} value={value} />

          {isUpdating ? <div>Guardando...</div> : <Final onClose={onClose} />}
        </div>
        {/* <div className="modal-action">
          <button
            htmlFor="my-modal-6"
            className="btn btn-sm text-sm"
            onClick={() => {
              onClose();
            }}
          >
            Cerrar
          </button>
        </div> */}
      </div>
    </>
  );
});
