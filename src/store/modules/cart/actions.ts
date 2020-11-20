import { IProduct } from './types';

export function addProductToCart(product: IProduct) {
  return {
    type: 'ADD_PRODUCT_TO_CART',
    // payload: all the params that I receive in the function.
    payload: {
      product,
    }
  }
}
