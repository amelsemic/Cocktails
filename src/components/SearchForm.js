import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
/* import { useGlobalContext } from '../context' */
import { useContext } from "react";
import { AppContext } from "../context";

const SearchForm = () => {
  const ctx = useContext(AppContext);

  const searchValue = useRef("");
  useEffect(() => {
    searchValue.current.focus();
  }, []);

  const inputChangeHandler = (event) => {
    /* console.log(event.target.value); */
    ctx.setSearchTerm(event.target.value);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <section className="section search">
      <form className="search-form" onSubmit={formSubmitHandler}>
        <div className="form-control">
          <label htmlFor="text">Search your favourite cocktail...</label>
          <input
            ref={searchValue}
            id="name"
            type="text"
            onChange={inputChangeHandler}
          />
        </div>
      </form>
    </section>
  );
};

export default SearchForm;
