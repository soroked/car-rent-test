import { useEffect, useState } from "react";
import css from "./CarCards.module.css";
import defaultImg from "../../assets/defaultCarImg.jpg";
import HeartSvg from "../../assets/HeartSvg";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "src/redux/modal/modal.reducer";
import { fetchCars } from "src/redux/cars/cars.reducer";

// eslint-disable-next-line react/prop-types
const CarCards = ({ page }) => {
  const cars = useSelector((state) => state.carsStore.cars);
  // const isLoading = useSelector((state) => state.carsStore.isLOading);
  // const error = useSelector((state) => state.carsStore.error);
  const filter = useSelector((state) => state.filter.filter);
  const [filteredCars, setFilteredCars] = useState([]);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favoriteCars")) ?? []
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCars({ page }));
  }, [dispatch, page]);

  useEffect(() => {
    const filteredCarsVar = cars?.filter(
      ({ make }) => make.toLowerCase() === filter.toLowerCase()
    );
    if (filteredCarsVar?.length > 0) {
      setFilteredCars(filteredCarsVar);
    } else {
      setFilteredCars(cars);
    }
  }, [cars, filter]);

  const toggleFavorite = (car) => {
    const favoriteCars = JSON.parse(localStorage.getItem("favoriteCars")) ?? [];

    const isFavoriteCar =
      favoriteCars.length > 0
        ? favoriteCars.find((favorite) => favorite.id === car.id)
        : false;

    if (isFavoriteCar) {
      const newFavoriteCars = favoriteCars.filter(
        (favorite) => car.id !== favorite.id
      );
      localStorage.setItem("favoriteCars", JSON.stringify(newFavoriteCars));
      setFavorites(newFavoriteCars);
    } else {
      localStorage.setItem(
        "favoriteCars",
        JSON.stringify([...favoriteCars, car])
      );
      setFavorites([...favoriteCars, car]);
    }

    // clean local storage
    if (JSON.parse(localStorage.getItem("favoriteCars")).length === 0) {
      localStorage.removeItem("favoriteCars");
    }
  };

  const isCarFavorite = (id) => {
    const isFavorite = favorites.find((car) => car.id === id);
    return isFavorite ? "#3470ff" : null;
  };

  return (
    <ul className={css.carCardsContainer} style={{}}>
      {filteredCars?.map((car) => (
        <li key={car.id}>
          <div className={css.carCardImgContainer}>
            <img
              className={css.carCardImage}
              src={car.img ?? defaultImg}
              alt={car.make}
            />
            <HeartSvg
              onClick={() => {
                toggleFavorite(car);
              }}
              fillColor={isCarFavorite(car.id)}
            />
          </div>
          <div>
            <div className={css.carCardHeader}>
              <p className={css.carCardHeaderName}>
                {car.make} <span className={css.secondColor}>{car.model}</span>,{" "}
                {car.year}
              </p>
              <p className={css.carCardHeaderPrice}>{car.rentalPrice}</p>
            </div>
            <div className={css.carCardInfo}>
              <span>{car.address.split(",")[1]}</span>
              <span>{car.address.split(",")[2]}</span>
              <span>{car.rentalCompany}</span>
              <span>{car.type}</span>
              <span>{car.model}</span>
              <span>{car.id}</span>
              <span>{car.accessories[0]}</span>
            </div>
          </div>
          <button
            className={css.carCardButton}
            onClick={() => dispatch(openModal(car))}
          >
            Learn more
          </button>
        </li>
      ))}
    </ul>
  );
};

export default CarCards;
