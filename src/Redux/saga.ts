import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { getProductList } from "./CallApiSaga/products";
import { Product, setProductList } from "./ProductSlice";

// generator function

function* fetchProductList() {
  try {
    const productlist: Product[] = yield call(getProductList);
    yield put(setProductList(productlist));
  } catch (error) {
    console.log(error);
  }
}
function* mySaga() {
  yield takeEvery("products/requestProducts", fetchProductList);
}
export default mySaga;
