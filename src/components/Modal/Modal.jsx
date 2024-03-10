/* eslint-disable react/prop-types */
import { useEffect } from "react";
import css from "./Modal.module.css";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "src/redux/modal/modal.reducer";
import CloseIcon from "src/assets/close.svg";

// eslint-disable-next-line react/prop-types
const Modal = () => {
  const data = useSelector((state) => state.modal.modalData);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.code === "Escape") {
        dispatch(closeModal());
      }
    };

    window.addEventListener("keydown", handleEscKey);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleEscKey);
      document.body.style.overflow = "auto";
    };
  }, [dispatch]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      dispatch(closeModal());
    }
  };

  const setDelimiter = (milage) => {
    const firstThree = String(milage).slice(-3);
    return `${String(milage).slice(0, -3)},${firstThree}`;
  };

  return (
    <div className={css.backdrop} onClick={handleOverlayClick}>
      <div className={css.modal}>
        <div>
          <img
            src={CloseIcon}
            className={css.closeBtn}
            onClick={() => dispatch(closeModal())}
            alt="close icon"
          />
          {/* <CloseIcon /> */}
          <img className={css.carModalImg} src={data.img} alt={data.model} />
          <div className={css.carModalHeader}>
            <p className={css.carModalHeaderName}>
              {data.make} <span className={css.secondColor}>{data.model}</span>,{" "}
              {data.year}
            </p>
          </div>
        </div>
        <div className={css.scroll}>
          <div className={css.carModalInfo}>
            <span>{data.address.split(",")[1]}</span>
            <span>{data.address.split(",")[2]}</span>
            <span>Id: {data.id}</span>
            <span>Year: {data.year}</span>
            <span>Type: {data.type}</span>
            <span>Fuel Consumption: {data.fuelConsumption}</span>
            <span>Engine Size: {data.engineSize}</span>
          </div>
          <p className={css.description}>{data.description}</p>
          <div className={css.accessories}>
            <p className={css.modalH}>Accessories and functionalities:</p>
            <div className={css.carModalInfo}>
              {data.accessories.map((accessory, index) => (
                <span key={index}>{accessory}</span>
              ))}
            </div>
            <div className={css.carModalInfo}>
              {data.functionalities.map((functionality, index) => (
                <span key={index}>{functionality}</span>
              ))}
            </div>
          </div>
          <div>
            <p className={css.modalH}>Rental Conditions: </p>
            <div className={css.modalConditions}>
              {data.rentalConditions.split("\n").map((cond, index) => {
                <span key={index}>{cond}</span>;
              })}
              <span>Mileage: {setDelimiter(data.mileage)}</span>
              <span>Price: {data.rentalPrice}</span>
            </div>
          </div>
          <button className={css.rentalButton}>
            <a href="tel:+380730000000">Rental cars</a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
