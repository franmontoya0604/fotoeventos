import { useWizard } from "react-use-wizard";

const Header = () => {
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
    <div className="w-full">
      <ul className="steps mx-auto w-full">
        {/* TODO Marcar steps cuando se completan o se da un error step-success */}
        <li className={"step" + (activeStep >= 0 ? " step-accent" : "")}></li>
        <li className={"step" + (activeStep >= 1 ? " step-accent" : "")}></li>
        {/* <li className={"step" + (activeStep >= 2 ? " step-accent" : "")}></li> */}
      </ul>
    </div>
  );
};

export default Header;
