import { useState } from "react";
import Balancer from "react-wrap-balancer";

//TODO agregar ayudas en cada campo para que sea claro que se esta cobrando
//TODO Agregar switch de que sea gratis o pago
// TODO cuando el check esta off, deshabilitar todos los campos

export default function Monetization() {
  const [value, setValue] = useState({
    startDate: new Date(),
    endDate: new Date().setMonth(11),
  });

  const handleValueChange = (newValue) => {
    setValue(newValue);
  };
  return (
    <div className="mx-6">
      <h3 className="font-bold text-center">Monetización</h3>
      <p className="font-sans text-center">
        <Balancer>
          En este paso podrás configurar si quieres cobrar por la descarga de
          fotos y los precios.
        </Balancer>
      </p>
      <div className="flex justify-center flex-col items-center">
        <div className="form-control w-full max-w-xs mt-3">
          <label className="label ">
            <span className="label-text">¿Cobrar por las fotos?</span>
          </label>
          <input type="checkbox" className="toggle" />
        </div>
        <div className="form-control w-full max-w-xs mt-3">
          <label className="label">
            <span className="label-text">Precio por descarga de 1 foto:</span>
          </label>
          <label className="input-group">
            <span>$</span>
            <input
              type="number"
              min="0"
              max="10000"
              placeholder="300"
              className="input input-bordered"
            />
          </label>
        </div>
        <div className="form-control w-full max-w-xs mt-3">
          <label className="label">
            <span className="label-text">Precio por impresión de 1 foto:</span>
          </label>
          <label className="input-group">
            <span>$</span>
            <input
              type="number"
              min="0"
              max="10000"
              placeholder="700"
              className="input input-bordered"
            />
          </label>
        </div>
        <div className="form-control w-full max-w-xs mt-3">
          <label className="label">
            <span className="label-text">
              Descuento por cantidad (Más de 10):
            </span>
          </label>
          <label className="input-group">
            <input
              type="number"
              min="0"
              max="100"
              placeholder="30"
              step="1"
              className="input input-bordered"
            />
            <span>%</span>
          </label>
        </div>
        <div className="form-control w-full max-w-xs mt-3">
          <label className="label">
            <span className="label-text">Precio por etiqueta:</span>
          </label>
          <label className="input-group">
            <span>$</span>
            <input
              type="number"
              min="0"
              max="10000"
              placeholder="3000"
              className="input input-bordered"
            />
          </label>
        </div>
      </div>
    </div>
  );
}
