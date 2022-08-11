import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { addToCart, updateCartItem } from "../../../firestore";
import { CartItem } from "../../../models/cartItem";
import { Product } from "../../../models/product";
import {
  productInfoState,
  productState,
  userInfoState,
} from "../../../recoil/atoms";

function ProductCard({ data }: any) {
  const userInfo = useRecoilValue(userInfoState);
  const [productState, setProductInfo] = useRecoilState(productInfoState);

  const colorCircle =
    data.type.toLowerCase() === "veg" ? (
      <i className="bi bi-circle-fill greenColor"></i>
    ) : data.type.toLowerCase() === "egg" ? (
      <i className="bi bi-circle-fill yellowColor"></i>
    ) : (
      <i className="bi bi-circle-fill redColor"></i>
    );

  return (
    <>
      <div
        key={data.id}
        className="menuCard d-flex justify-content-between flex-wrap"
      >
        <div className="d-flex flex-column itemDescription">
          <div>
            <div className="h5">{data.name}</div>
            <div>
              {colorCircle} {data.type.toUpperCase()}
            </div>
          </div>
          <div className="py-2">&#8377;{`${data.price}.00`}</div>
          <button
            type="button"
            className="btn btn-outline-warning mt-auto p-2 w-50 addCart"
            // onClick={() => onAddToCart(data)}
            // onClick={async () => {
            //   setProductInfo(data);
            // }}
          >
            Edit Details
          </button>
        </div>
        <div className="menuCardImg position-relative">
          <img
            alt=""
            className="img-fluid img-rounded"
            src={
              data.img ??
              "https://media.istockphoto.com/photos/table-top-view-of-spicy-food-picture-id1316145932?b=1&k=20&m=1316145932&s=170667a&w=0&h=feyrNSTglzksHoEDSsnrG47UoY_XX4PtayUPpSMunQI="
            }
          />
        </div>
      </div>
    </>
  );
}

export default React.memo(ProductCard);
