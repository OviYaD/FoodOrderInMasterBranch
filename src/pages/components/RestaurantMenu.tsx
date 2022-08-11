import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { productState, userInfoState } from "../../recoil/atoms";
import ProductCard from "./Admin/ProductCard";
import MenuCard from "./MenuCard";

function RestaurantMenu() {
  const userInfo = useRecoilValue(userInfoState);
  const products: any = useRecoilValue(productState);
  const [loading, setLoading] = useState(false);
  const [userEmail, setEmail] = useState("");

  useEffect(() => {
    setEmail(userInfo?.mail);
  });

  return loading === false ? (
    //  Breakfast
    <div
      className="container-fluid menuLayout"
      style={{
        backgroundColor: "white",
        marginTop: "-20px",
        paddingTop: "20px",
      }}
    >
      <div key={"breakfast"} className="container d-flex flex-column">
        <div className="h3 tt" id={"breakfast"}>
          Breakfast
        </div>
        <div className="menuCardWrapper d-flex flex-wrap">
          {userEmail === "admin@gmail.com"
            ? products.breakfast.map((i: any) => (
                <ProductCard data={i} key={i.id} />
              ))
            : products.breakfast.map((i: any) => (
                <MenuCard data={i} key={i.id} />
              ))}
        </div>
      </div>

      {/* LUNCH  */}
      <div key={"lunch"} className="container d-flex flex-column">
        <div className="h3 tt" id={"lunch"}>
          Lunch
        </div>
        <div className="menuCardWrapper d-flex flex-wrap">
          {userEmail === "admin@gmail.com"
            ? products.lunch.map((i: any) => (
                <ProductCard data={i} key={i.id} />
              ))
            : products.lunch.map((i: any) => <MenuCard data={i} key={i.id} />)}
        </div>
      </div>

      {/* Dinner */}
      <div key={"dinner"} className="container d-flex flex-column">
        <div className="h3 tt" id={"dinner"}>
          Dinner
        </div>
        <div className="menuCardWrapper d-flex flex-wrap">
          {userEmail === "admin@gmail.com"
            ? products.dinner.map((i: any) => (
                <ProductCard data={i} key={i.id} />
              ))
            : products.dinner.map((i: any) => <MenuCard data={i} key={i.id} />)}
        </div>
      </div>
    </div>
  ) : (
    <div className="spinnerBlock d-flex justify-content-center">
      <div className="spinner-grow text-secondary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <div className="spinner-grow text-danger" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <div className="spinner-grow text-warning" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}

export default React.memo(RestaurantMenu);
