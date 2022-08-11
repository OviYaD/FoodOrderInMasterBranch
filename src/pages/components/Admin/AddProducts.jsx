import React, { useState, useEffect } from "react";
// import { useHistory } from "react-router-dom";
import { db } from "../../../firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";

const productsCollectionRef = collection(db, "products");

function AddProducts() {
  const [product, setProduct] = useState({
    item: "",
    type: "",
    price: "",
    offer: "",
  });
  const [msg, setMsg] = useState("");
  const [products, checkproduct] = useState([]);
  const [checkedState, setCheckedState] = useState(new Array());

  const handleOnChange = (position) => {
    if (!checkedState.includes(position)) {
      checkedState.push(position);
    } else {
      checkedState.pop(position);
    }
    console.log(checkedState, position);
  };

  const changeMe = (e) => {
    e.preventDefault();
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

  const handleCancel = () => {};
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
    await addDoc(productsCollectionRef, {
      product_name: product["item"],
      product_type: product["type"],
      price: product["price"],
      offer: product["offer"],
      category: checkedState,
    });
    alert("Product Added Successfully");
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
        <h2>ADD PRODUCTS</h2>
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
              <label htmlFor="price" className="form-label m-2 h5">
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
            <div className="form-group">
              <label htmlFor="offer" className="form-label m-2 h5">
                Offer:
              </label>
              <input
                type="text"
                name="offer"
                placeholder="Offer in %"
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
            <br />
          </div>
          <button className="btn btn-primary  h4">ADD PRODUCT</button>
          <button className="btn btn-danger  h4" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </>
  );
}

export default React.memo(AddProducts);
