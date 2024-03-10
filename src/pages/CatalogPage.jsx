import CarCards from "../components/CarCards/CarCards";
import Modal from "../components/Modal/Modal";
import FilterForm from "src/components/FilterForm/FilterForm";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { pageIncrement } from "src/redux/cars/cars.reducer";

const LoadMore = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 50px auto;
  border: none;
  cursor: pointer;
  background-color: transparent;

  font-family: "Manrope", sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 1.5;
  text-decoration: underline;
  text-decoration-skip-ink: none;
  color: #3470ff;
`;

const CatalogPage = () => {
  const cars = useSelector((state) => state.carsStore.cars);
  const isOpenModal = useSelector((state) => state.modal.isOpenModal);
  const page = useSelector((state) => state.carsStore.page);
  const dispatch = useDispatch();

  return (
    <>
      <div
        style={{
          paddingLeft: "15px",
          paddingRight: "15px",
        }}
      >
        <FilterForm />
        <CarCards page={page} />
        {page * 12 === cars?.length && (
          <LoadMore onClick={() => dispatch(pageIncrement(page + 1))}>
            Load More
          </LoadMore>
        )}
      </div>
      {isOpenModal && <Modal />}
    </>
  );
};

export default CatalogPage;
