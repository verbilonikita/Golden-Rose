import React, { useEffect, useState } from "react";
import { Menu } from "./menu";

//Main Screen
function Search(props) {
  const [error, setError] = useState("");

  useEffect(() => {
    setError("");
  }, [props.state.searchRecipe]);

  return (
    <section className="search">
      <form
        className="search__form"
        onSubmit={async (e) => {
          try {
            e.preventDefault();
            const value = e.target.children[0].value;
            e.target.children[0].value = "";
            const data = await Menu(value);
            console.log(data);
            props.state.setMenuRecipes(data);
            const randomNum = Math.floor(Math.random() * data.length);
            const randomRecipe = data.filter((_, i) => i === randomNum);
            props.state.randomRecipe(...randomRecipe);
          } catch (err) {
            const newErr = String(err).slice(7).toUpperCase();
            setError(newErr);
          }
        }}
      >
        <input className="search__input" type="text"></input>
      </form>
      {error ? <Error error={error} /> : ""}
      {props.state.searchRecipe && !error ? <Item state={props.state} /> : ""}
      {!error && !props.state.searchRecipe ? <Initial /> : ""}
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
      <div className="item1 item">
        <img
          className="item1__img item-pic"
          src={props.state.searchRecipe?.image_url}
        ></img>
        <h4 className="item1__name item-name">
          {props.state.searchRecipe?.title}
        </h4>
        <a
          className="item1__link  item-link"
          onClick={() => {
            console.log(props.state);
            if (
              props.state.cart.some(
                (el) => el.title === props.state.searchRecipe.title
              )
            ) {
              return;
            }

            if (props.state.cart.length >= 0) {
              props.state.addToCart(props.state.searchRecipe);
            }
          }}
        >
          Order Now
        </a>
      </div>
      <a
        className="item-btn"
        onClick={() => {
          const data =
            props.state.listOfCakes[
              Math.floor(Math.random() * props.state.listOfCakes.length)
            ];
          props.state.randomRecipe(data);
        }}
      >
        Get Another Recipe
      </a>
    </section>
  );
}
