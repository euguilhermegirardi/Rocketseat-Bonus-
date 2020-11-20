import { Reducer } from "redux";

import { ICartState } from './types';

const INITIAL_STATE: ICartState = {
    items: []
};

const cart: Reducer<ICartState> = (state = INITIAL_STATE, action) => {
  switch(action.type) {

    case 'ADD_PRODUCT_TO_CART': {
      const { product } = action.payload;

      // Return a new state.
      return {
        // Copy the current state.
        ...state,

        // Rewrite the 'items' information.
        items: [
          // Copy all the items that I have.
          ...state.items,
          // Add a new item.
          {
            product,
            quantity: 1,
          }
        ]
      };
    }

      default: {
        return state;
      }
  }
}

export default cart;
