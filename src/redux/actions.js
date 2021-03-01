export const showCakes = () => {
  return {};
};

export const pageChanger = (page) => {
  return {
    type: "changePage",
    payload: {
      currentPage: page,
    },
  };
};

export const setMenu = (menu) => {
  return {
    type: "buildMenu",
    payload: {
      listOfCakes: menu,
    },
  };
};

export const currentMenuItem = (item) => {
  return {
    type: "currentMenuItem",
    payload: {
      currentMenuItem: item,
    },
  };
};

export const addBookmark = (item) => {
  return {
    type: "addBookmark",
    payload: {
      bookmark: item,
    },
  };
};

export const addIngredients = (num) => {
  return {
    type: "addIngredients",
    payload: {
      ingredient: num,
    },
  };
};

export const clearBookmark = () => {
  return {
    type: "clearBookmark",
  };
};

export const markup = (markup) => {
  return {
    type: "markup",
    payload: {
      markup: markup,
    },
  };
};

export const clearMarkup = () => {
  return {
    type: "clearMarkup",
    payload: {
      markup: "",
    },
  };
};

export const updateBookmark = (item) => {
  return {
    type: "updateBookmark",
    payload: {
      bookmarks: item,
    },
  };
};

export const request = (item) => {
  return {
    type: "currentRequest",
    payload: {
      request: item,
    },
  };
};

export const addToCart = (items) => {
  return {
    type: "addToCart",
    payload: {
      cart: items,
    },
  };
};

export const updateCart = (items) => {
  return {
    type: "updateCart",
    payload: {
      cart: items,
    },
  };
};

export const randomRecipe = (item) => {
  return {
    type: "searchRecipe",
    payload: {
      randomRecipe: item,
    },
  };
};
