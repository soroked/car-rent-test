import css from "./HomePage.module.css";
import defaultImg from "../assets/defaultCarImg.jpg";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className={css.hero}>
        <h1 className={css.title}>CaRent</h1>
        <p className={css.appel}>Dive into the world of cars!</p>
      </div>
      <div className={css.info}>
        <img src={defaultImg} width="250" alt="" />
        <p className={css.heroText}>
          Explore our new cars{" "}
          <a onClick={() => navigate("/catalog")} className={css.catalog}>
            Catalog
          </a>
        </p>
      </div>
    </div>
  );
};

export default HomePage;
