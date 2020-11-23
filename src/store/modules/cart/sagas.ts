import { all, takeLatest, select, call, put } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';

import { IState } from '../..';
import { addProductToCartRequest, addProductToCartSuccess, addProductToCartFailure } from './actions';
import api from '../../../services/api';
import { ActionTypes } from './types';

// Action's return
type CheckProductStockRequest = ReturnType<typeof addProductToCartRequest>;

interface IStockResponse {
  id: number;
  quantity: number;
}

function* checkProductStock({ payload }: CheckProductStockRequest) {
  const { product } = payload;

  // 'select' is used to get information from the state.
  const currentQuantity: number = yield select((state: IState) => {
    return state.cart.items.find(item => item.product.id === product.id)?.quantity ?? 0;
  });

  const availableStockResponse: AxiosResponse<IStockResponse> = yield call(api.get, `stock/${product.id}`);

  if (availableStockResponse.data.quantity > currentQuantity) {
    // 'put' is equal to 'dispatch', to dispatch an action.
    yield put(addProductToCartSuccess(product));
  } else {
    yield put(addProductToCartFailure(product.id));
  }
}

export default all([
  // Which action I want to hear to check the stock?
  // Which function I want to invoke to check the stock?
  takeLatest(ActionTypes.addProductToCartRequest, checkProductStock)
]);
