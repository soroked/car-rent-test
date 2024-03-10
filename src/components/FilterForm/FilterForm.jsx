import makes from "src/assets/makes";
import price from "src/assets/price";
import css from "src/components/FilterForm/FilterForm.module.css";
import Select from "react-select";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { setFilter } from "src/redux/filter.reducer";

const customStyles = {
  control: (provided) => ({
    // class attribute : class=" css-i32vvf-control"
    ...provided,
    background: "#f7f7fb",
    display: "flex",
    borderRadius: "14px",

    // flexWrap: "nowrap",
    cursor: "pointer",
    borderColor: "transparent",
    width: "224px",
    height: "48px",
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "black",
  }),
  menu: (provided) => ({
    // 'menu' is from the div class too.
    ...provided,
    background: "white",
    width: "224px",
    height: "272px",
    borderRadius: "14px",

    fontFamily: "Manrope, sans-serif",
    fontWeight: 500,
    fontSize: "16px",
    lineHeight: 1.25,
    color: "rgba(18, 20, 23, 0.2)",
    overflow: "hidden",
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    width: 0,
  }),
  dropdownIndicator: (base, state) => ({
    ...base,
    transition: "all .2s ease",
    transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : null,
  }),
};

const customStylesPrice = {
  control: (provided) => ({
    // class attribute : class=" css-i32vvf-control"
    ...provided,
    background: "#f7f7fb",
    display: "flex",
    borderRadius: "14px",

    // flexWrap: "nowrap",
    cursor: "pointer",
    borderColor: "transparent",
    width: "125px",
    height: "48px",
  }),
  menu: (provided) => ({
    // 'menu' is from the div class too.
    ...provided,
    background: "white",
    width: "125px",
    height: "272px",
    borderRadius: "14px",

    fontFamily: "Manrope, sans-serif",
    fontWeight: 500,
    fontSize: "16px",
    lineHeight: 1.25,
    color: "rgba(18, 20, 23, 0.2)",
    overflow: "hidden",
  }),
};

const Form = styled.form`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  column-gap: 29px;
  padding-bottom: 50px;
  padding-top: 30px;
`;

const SearchButton = styled.button`
  border-radius: 12px;
  padding: 14px 44px;
  width: 136px;
  height: 48px;
  background: #3470ff;
  border: none;
  cursor: pointer;

  font-family: Manrope, sans-serif;
  font-weight: 600;
  font-size: 14px;
  line-height: 1.42857;
  color: #fff;

  &:hover {
    scale: 1.03;
    color: "white";
    background-color: #2049a9;
    transition: 0.3s;
  },
`;
const Label = styled.label`
  font-family: "Manrope", sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 1.28571;
  color: #8a8a89;
`;

const FilterForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setFilter(e.target.car.value));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div className={css.formControls}>
        <div>
          <Label>Car brand</Label>
          <Select
            id="car"
            name="car"
            styles={customStyles}
            options={makes}
            placeholder="Enter the text"
          />
        </div>
        <div>
          <Label>Price/1hour</Label>
          <Select
            id="price"
            name="price"
            styles={{ ...customStyles, ...customStylesPrice }}
            options={price}
            placeholder="To $"
          />
        </div>
        <div>
          <Label>Car milage / km</Label>
          <div>
            <input className={css.input} placeholder="From" />
            <input className={(css.input, css.inputLeft)} placeholder="To" />
          </div>
        </div>
      </div>
      <SearchButton type="submit">Search</SearchButton>
    </Form>
  );
};

export default FilterForm;
