import React, { Fragment, useEffect } from "react";
import { RootState } from "../Redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  DeleteProductCart,
  Product,
  requestProducts,
  setProductCart,
  setProductDetail,
} from "../Redux/ProductSlice";

const Test = () => {
  const handleChangeProduct = (index: number) => {
    dispatch(setProductDetail(productlist[index]));
  };
  // lấy store
  const { productlist, productdetails, productCart } = useSelector(
    (state: RootState) => state.products
  );
  // xử lý thêm , bớt product
  const handleAddProduct = (product: Product) => {
    dispatch(setProductCart(product));
    console.log(productCart);
  };
  const handledeleteProduct = (product: Product) => {
    dispatch(DeleteProductCart(product));
    console.log(productCart);
  };
  // xử lý số lượng
  const renderQuantity = (product: Product) => {
    const quantity = [];
    productCart.map((item: number) => {
      if (item === product.id) {
        return quantity.push(item);
      }
    });
    return quantity.length;
  };
  // hiển thị số lượng bên cart
  const ProductCartPage = new Set(productCart);
  const ArrayProductCartPage = [...ProductCartPage];
  console.log(ArrayProductCartPage);
  console.log(productCart);

  // lấy dữ liệu
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(requestProducts());
    dispatch(setProductDetail(productlist[0]));
  }, []);

  return (
    <Fragment>
      <div>
        {productlist.map((product: Product, index: number) => (
          <div key={product.id} onClick={() => handleChangeProduct(index)}>
            <p>{product.title}</p>
            <p>Số lượng: {renderQuantity(product)}</p>
            <button onClick={() => handleAddProduct(product)}>
              Add to cart
            </button>
            <button onClick={() => handledeleteProduct(product)}>
              delete cart
            </button>
          </div>
        ))}
      </div>
      <hr />
      <p>{productdetails?.title}</p>
      <hr />
      <h2>page cart</h2>
      {ArrayProductCartPage.map((idProduct) => (
        <div key={idProduct}>
          <p>
            {" "}
            {productlist.find((product) => product.id === idProduct)?.title}
          </p>
          <div>
            {productlist.map(
              (product: Product, index: number) =>
                product.id === idProduct && (
                  <div key={index} onClick={() => handleChangeProduct(index)}>
                    <p>Số lượng: {renderQuantity(product)}</p>
                    <button onClick={() => handleAddProduct(product)}>
                      Add to cart
                    </button>
                    <button onClick={() => handledeleteProduct(product)}>
                      delete cart
                    </button>
                  </div>
                )
            )}
          </div>
        </div>
      ))}
      <hr />
    </Fragment>
  );
};

export default Test;
