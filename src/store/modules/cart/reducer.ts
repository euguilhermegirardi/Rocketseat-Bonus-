import { Reducer } from "redux";
import produce from 'immer';

import { ActionTypes, ICartState } from './types';

const INITIAL_STATE: ICartState = {
  items: [],
  failedStockCheck: []
};

const cart: Reducer<ICartState> = (state = INITIAL_STATE, action) => {
  // state = current state + draft = rascunho.
  return produce(state, draft => {
    switch(action.type) {

      case ActionTypes.addProductToCartSuccess: {
        const { product } = action.payload;

        // Verify if the item that is being added to the cart is already in the cart,
        // to increase the quantity of the same item in the cart.
        const productInCartIndex = draft.items.findIndex(item =>
          item.product.id === product.id,
        );

        if (productInCartIndex >= 0) {
          draft.items[productInCartIndex].quantity++;
        } else {
          // Just add an item to the cart if there is no equal item already added.
          draft.items.push({
            product,
            quantity: 1,
          });
        }

        break;
      }

      case ActionTypes.addProductToCartFailure: {
        draft.failedStockCheck.push(action.payload.productId)

        break;
      }

      default: {
        return draft;
      }
    }
  });
}

export default cart;
