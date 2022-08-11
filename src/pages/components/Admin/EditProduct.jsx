import React, { useState, useEffect } from "react";
// import { useHistory } from "react-router-dom";
import { Product, productConverter } from "../../../models/product";
import { useRecoilValue } from "recoil";
import { db } from "../../../firebase";
import { collection, getDocs, addDoc, doc, setDoc } from "firebase/firestore";
import { productInfoState } from "../../../recoil/atoms";
const productsCollectionRef = collection(db, "products");

function EditProducts() {
  const productInfo = useRecoilValue(productInfoState);
  const [product, setProduct] = useState({
    item: productInfo.type,
    price: productInfo.price,
    offer: productInfo.offer,
  });
  const [msg, setMsg] = useState("");
  const [products, checkproduct] = useState([]);
  const [checkedState, setCheckedState] = useState(new Array());

  // useEffect(() => {
  //   // console.log(userInfo);
  //   setUser({
  //     item: productInfo?.item,
  //     type: productInfo?.type,
  //     price: productInfo?.price,
  //     offer: productInfo?.offer,
  //   });
  // });

  const handleOnChange = (position) => {
    if (!checkedState.includes(position)) {
      checkedState.push(position);
    } else {
      checkedState.pop(position);
    }
    console.log(checkedState, position);
  };

  const changeMe = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };
  const emptyField = () => {
    setProduct({
      ...product,
      ["item"]: "",
      ["type"]: "",
      ["price"]: "",
      ["offer"]: "",
    });
  };
  const success = {
    padding: "10px 15px",
    border: "1px solid green",
    color: "green",
  };
  const fail = { padding: "10px 15px", border: "1px solid red", color: "red" };
  const addProduct = async (e) => {
    e.preventDefault();
    console.log(products);
    console.log(checkedState);
    try {
      const productRef = doc(db, "products", productInfo?.id).withConverter(
        productConverter
      );

      await setDoc(
        productRef,
        new Product(
          productInfo.id,
          product.item,
          product.type,
          product.price,
          product.offer,
          checkedState
        )
      );
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    // await addDoc(productsCollectionRef, {
    //   product_name: product["item"],
    //   product_type: product["type"],
    //   price: product["price"],
    //   offer: product["offer"],
    //   category: checkedState,
    // });
    // alert("Product Added Successfully");
    emptyField();
    for (var i = 0; i < 3; i++) {
      if (checkedState[i]) {
        handleOnChange(i);
      }
    }
  };
  return (
    <>
      <img
        className="img-fluid col-md-12 bg obj-fit-cover"
        style={{ minHeight: "100vh" }}
        src="https://i.pinimg.com/originals/33/ef/8b/33ef8b9c0b902154a6cd4103a21275ef.jpg"
        alt=""
      />
      <form className="form1" onSubmit={addProduct}>
        <h2>EDIT PRODUCTS</h2>
        <br />
        <div className="d-flex flex-column">
          <div className="form-group">
            <div className="form-group">
              <label htmlFor="item" className="form-label m-2 h5">
                Food Item:
              </label>
              <input
                type="text"
                name="item"
                placeholder="Food Item"
                className="form-control"
                value={product.item}
                onChange={changeMe}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="type" className="form-label m-2 h5">
                Food Type:
              </label>
              <input
                type="text"
                name="type"
                placeholder="Veg or Non-veg"
                className="form-control"
                value={product.type}
                onChange={changeMe}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label m-2 h5">
                Price:
              </label>
              <input
                type="text"
                name="price"
                placeholder="price"
                className="form-control"
                value={product.price}
                onChange={changeMe}
                required
              />
            </div>
            <div className="form-group"></div>
            <label htmlFor="address" className="form-label m-2 h5">
              Category:
            </label>
            <br />
            <input
              type="checkbox"
              id="0"
              name="breakfast"
              value="breakfast"
              onChange={() => handleOnChange("breakfast")}
            />
            <label htmlFor="0" className="form-label m-2 h5">
              breakfast
            </label>
            <br />

            <input
              type="checkbox"
              id="1"
              name="lunch"
              value="lunch"
              onChange={() => handleOnChange("lunch")}
            />
            <label htmlFor="1" className="form-label m-2 h5">
              Lunch
            </label>
            <br />

            <input
              type="checkbox"
              id="2"
              name="dinner"
              value="dinner"
              onChange={() => handleOnChange("dinner")}
            />
            <label htmlFor="2" className="form-label m-2 h5">
              Dinner
            </label>
          </div>
          <button className="btn btn-primary my-3 h4">ADD PRODUCT</button>
        </div>
      </form>
    </>
  );
}

export default React.memo(EditProducts);
