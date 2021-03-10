export const updateCart = (props, setcartItemsNum) => {
  if (props.cart.length > 0) {
    setcartItemsNum(props.cart.length);
  }
  if (props.cart.length === 0) {
    setcartItemsNum(0);
  }
};
