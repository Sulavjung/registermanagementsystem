import React, { useState } from "react";
import CurrentOrder from "./currentOrder";
import Categories from "./categories";

export default function MainScreenDisp() {
  const [order, setOrder] = useState([]);

  const handleAdd = (name, price, quantity, setQuantity) => {
    // check if the product already exists in the order
    const existingProduct = order.find((p) => p.name === name);
    if (existingProduct) {
      // if it exists, update the quantity
      const updatedProduct = {
        ...existingProduct,
        quantity: existingProduct.quantity + quantity,
      };
      const updatedOrder = order.map((p) =>
        p.name === name ? updatedProduct : p
      );
      setOrder(updatedOrder);
    } else {
      // if it doesn't exist, add it to the order
      const newProduct = { name, price, quantity };
      setOrder([...order, newProduct]);
    }
    setQuantity(1);
  };

  return (
    <>
      <div className="grid grid-cols-8 gap-4 px-6">
        <Categories handleAdd={handleAdd} />
        <CurrentOrder order={order} />
      </div>
    </>
  );
}
