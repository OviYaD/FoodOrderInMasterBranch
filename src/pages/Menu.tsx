import { userInfo } from "os";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { CartItem } from "../models/cartItem";
import { cartItemsState, userInfoState } from "../recoil/atoms";
import Cart from "./components/Cart";
import CheckNavbar from "./components/checkNavbar";
import RestaurantMenu from "./components/RestaurantMenu";

function Menu() {
  const userInfo = useRecoilValue(userInfoState);
  const [userEmail, setEmail] = useState("");
  const list: CartItem[] = useRecoilValue(cartItemsState);
  useEffect(() => setEmail(userInfo?.mail));
  return (
    <div>
      <CheckNavbar />
      <RestaurantMenu />
      {list.length > 0 && userEmail !== "admin@gmail.com" ? <Cart /> : <></>}
    </div>
  );
}

export default React.memo(Menu);
