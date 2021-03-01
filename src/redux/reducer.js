const initialStore = {
  currentPage: 0,
  currentCake: {},
  currentIngs: 0,
  currentMenuItem: {},
  listOfCakes: [],
  favouriteCakes: [],
  cart: [],
};

export default function reducer(state = initialStore, action) {
  if (action.type === "changePage") {
    return {
      ...state,
      currentPage: action.payload.currentPage,
    };
  }
  if (action.type === "buildMenu") {
    return {
      ...state,
      listOfCakes: action.payload.listOfCakes,
    };
  }
  if (action.type === "currentMenuItem") {
    return {
      ...state,
      currentMenuItem: action.payload.currentMenuItem,
    };
  }
  if (action.type === "addBookmark") {
    return {
      ...state,
      currentMenuItem: {
        ...state.currentMenuItem,
        bookmarked: true,
      },
      favouriteCakes: [...state.favouriteCakes, action.payload.bookmark],
    };
  }

  if (action.type === "addIngredients") {
    return {
      ...state,
      currentIngs: action.payload.ingredient,
    };
  }

  if (action.type === "clearBookmark") {
    return {
      ...state,
      favouriteCakes: [],
    };
  }

  if (action.type === "markup") {
    return {
      ...state,
      markup: action.payload.markup,
    };
  }

  if (action.type === "clearMarkup") {
    return {
      ...state,
      markup: "",
    };
  }

  if (action.type === "updateBookmark") {
    return {
      ...state,
      favouriteCakes: [...action.payload.bookmarks],
    };
  }

  if (action.type === "currentRequest") {
    return {
      ...state,
      request: action.payload.request,
    };
  }

  if (action.type === "addToCart") {
    return {
      ...state,
      cart: [...state.cart, action.payload.cart],
    };
  }

  if (action.type === "updateCart") {
    return {
      ...state,
      cart: [...action.payload.cart],
    };
  }

  if (action.type === "searchRecipe") {
    return {
      ...state,
      searchRecipe: action.payload.randomRecipe,
    };
  }

  return state;
}
