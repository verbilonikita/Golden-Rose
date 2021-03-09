import React, { useEffect, useState } from "react";
import { Menu, RenderMenu } from "./menu";

//Main Screen
function Search(props) {
  const [error, setError] = useState("");

  useEffect(() => {
    if (props.state.markup) setMenu(props.state.request);
  }, [props.state.favouriteCakes]);

  //Set Menu

  async function setMenu(value) {
    try {
      props.state.currentRequest(value);
      const data = await Menu(value);
      props.state.setMenuRecipes(data);
      const markup = await RenderMenu(data, props);
      props.state.anyMarkup(markup);
      setError("");
    } catch (err) {
      const newErr = String(err).slice(7).toUpperCase();
      props.state.anyMarkup("");
      setError(newErr);
    }
  }

  return (
    <section className="search">
      <form
        className="search__form"
        onSubmit={(e) => {
          e.preventDefault();
          const value = e.target.children[0].value;
          e.target.children[0].value = "";
          setMenu(value);
        }}
      >
        <input className="search__input" type="text"></input>
      </form>
      {error ? <Error error={error} /> : ""}
      {props.state.markup ? <Item state={props.state} /> : ""}
      {!error && !props.state.markup ? <Initial /> : ""}
    </section>
  );
}

export default Search;

// Initial Screen onload
function Initial() {
  return (
    <div className="search__start">
      <h2 className="search__header">Find a cake to try!</h2>
      <div className="search__start-back"></div>
    </div>
  );
}

//Error Screen (nothing found);
function Error(state) {
  return (
    <div className="search__error">
      <h3 className="error-header">{state.error}</h3>
      <div className="error-img"></div>
    </div>
  );
}

// Items (if something is found);
function Item(props) {
  return (
    <section className="search__preview">
      {props.state.markup ? props.state.markup.map((el) => el) : ""}
    </section>
  );
}
