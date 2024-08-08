import { useWizard } from "react-use-wizard";

const Footer = ({ onClose, formik, isUpdating, eventDate, file }) => {
  const {
    nextStep,
    previousStep,
    isLoading,
    activeStep,
    stepCount,
    isLastStep,
    isFirstStep,
  } = useWizard();

  return (
    <div className="modal-action">
      {activeStep != 2 && !isFirstStep && (
        <button
          htmlFor="my-modal-6"
          className="btn btn-sm text-sm"
          onClick={() => previousStep()}
          disabled={isLoading || isFirstStep}
        >
          Anterior
        </button>
      )}
      {!isLastStep ? (
        <button
          type="submit"
          htmlFor="my-modal-6"
          className={"btn btn-sm text-sm" + (isUpdating ? " Cargando" : "")}
          onClick={() => {
            formik.handleSubmit(), nextStep();
          }}
          disabled={
            isLoading ||
            isLastStep ||
            !formik.isValid ||
            !eventDate ||
            isUpdating ||
            !file.length > 0
          }
        >
          {isUpdating ? "Cargando" : "Siguiente"}
        </button>
      ) : (
        <button
          htmlFor="my-modal-6"
          className="btn btn-sm text-sm"
          onClick={() => {
            onClose();
          }}
        >
          Cerrar
        </button>
      )}
    </div>
  );
};

export default Footer;
