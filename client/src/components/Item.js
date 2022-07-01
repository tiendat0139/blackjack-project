import React from "react";
import "../css/Store.css";

const Item = ({ item }) => {
  return (
    <>
      <div className="item">
        <div className="itemimage">
          <img src={item.image} alt="" />
        </div>
        <p>{item.item_name}</p>
        <p>{item.price}</p>
      </div>
    </>
  );
};
export default Item;
