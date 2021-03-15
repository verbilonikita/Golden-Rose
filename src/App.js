//Icons
import { AiOutlineShoppingCart, AiFillCreditCard, AiOutlineSearch, AiOutlineHeart, AiFillHeart, AiOutlineInfoCircle } from "react-icons/ai";
import { BiCake, BiTrash } from "react-icons/bi";
import { useEffect, useState } from "react";

//Modules
import Search from "./view/search";
import Pay from "./view/pay";
import Cart from "./view/cart";
import { Catalogue } from "./view/catalogue";
import * as effectHooks from "./controller/effectHooks";

//Redux
import * as ACTIONS from "./redux/actions";
import { connect } from "react-redux";

function App(props) {
  const [cartItemsNum, setcartItemsNum] = useState(0);

  useEffect(() => {
    effectHooks.updateCart(props, setcartItemsNum);
  }, [props.cart]);

  return (
    <div className="app">
      <section className="menu">
        <h1 className="menu__header">
          <span>Golden</span> Rose
        </h1>
        <nav className="nav">
          <a
            href="#"
            className="nav__item item-cart link"
            onClick={async (e) => {
              props.pageChanger(1);
            }}>
            <AiOutlineShoppingCart />
            <div className="item-cart-num" style={cartItemsNum ? { display: "block" } : { display: "none" }}>
              {cartItemsNum ? cartItemsNum : ""}
            </div>
          </a>
          {props.currentPage === 2 ? (
            <a href="#" className="nav__item item-card link">
              <AiFillCreditCard onClick={() => props.pageChanger(2)} />
            </a>
          ) : (
            ""
          )}
          <a href="#" className="nav__item item-catalogue link" onClick={() => props.pageChanger(4)}>
            <BiCake />
          </a>
          <a href="#" className="nav__item item-search link" onClick={() => props.pageChanger(3)}>
            <AiOutlineSearch />
          </a>
        </nav>
      </section>
      <section className="main">
        {props.currentPage === 1 ? (
          <Cart state={props} bin={<BiTrash />} />
        ) : props.currentPage === 2 ? (
          <Pay state={props} />
        ) : props.currentPage === 3 ? (
          <Search state={props} heartEmpty={<AiOutlineHeart />} heartFill={<AiFillHeart />} iconInfo={<AiOutlineInfoCircle />} />
        ) : props.currentPage === 4 ? (
          <Catalogue state={props} heartEmpty={<AiOutlineHeart />} heartFill={<AiFillHeart />} iconInfo={<AiOutlineInfoCircle />} />
        ) : (
          ""
        )}
      </section>
    </div>
  );
}

//Redux
function mapStateToProps(state) {
  return {
    ...state,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    currentRequest: (type) => dispatch(ACTIONS.request(type)),
    pageChanger: (page) => dispatch(ACTIONS.pageChanger(page)),
    setMenuRecipes: (query) => dispatch(ACTIONS.setMenu(query)),
    setMenuItem: (item) => dispatch(ACTIONS.currentMenuItem(item)),
    addBookmark: (item) => dispatch(ACTIONS.addBookmark(item)),
    addToCart: (items) => dispatch(ACTIONS.addToCart(items)),
    updateBookmark: (item) => dispatch(ACTIONS.updateBookmark(item)),
    updateCart: (item) => dispatch(ACTIONS.updateCart(item)),
    addIngredients: (num) => dispatch(ACTIONS.addIngredients(num)),
    anyMarkup: (markup) => dispatch(ACTIONS.markup(markup)),
    clearMarkup: () => dispatch(ACTIONS.clearMarkup()),
    clearBookmark: () => dispatch(ACTIONS.clearBookmark()),
    randomRecipe: (item) => dispatch(ACTIONS.randomRecipe(item)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
