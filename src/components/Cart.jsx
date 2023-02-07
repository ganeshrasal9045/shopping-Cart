import React, { createContext, useEffect, useReducer } from "react";
import ContextCart from "./ContextCart";
import "./Cart.css";
import { products } from "./Products";
import { reducer } from "./Reducer";

export const cartContext = createContext();

const initialState = {
  item: products,
  totalAmount: 0,
  totalItem: 0,
};

const Cart = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // To delete the individual elements from an item cart
  const removeItem = (id) => {
    return dispatch({
      type: "REMOVE_ITEM",
      payload: id,
    });
  };

  // Clear All Cart
  const clearCart = () => {
    return dispatch({
      type: "CLEAR_CART",
    });
  };

  // Increment Item
  const increment = (id) => {
    return dispatch({
      type: "INCREMENT",
      payload: id,
    });
  };

  // Decrement Item
  const decrement = (id) => {
    return dispatch({
      type: "DECREMENT",
      payload: id,
    });
  };

  // we will use the useEffect to update the data
  useEffect(() => {
    dispatch({ type: "GET_TOTAL" });
    // console.log("Awesome")
  }, [state.item]);

  return (
    <>
      <cartContext.Provider
        value={{ ...state, removeItem, clearCart, increment, decrement }}
      >
        <ContextCart />
      </cartContext.Provider>
    </>
  );
};

export default Cart;
