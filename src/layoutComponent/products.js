import React, { useState, useEffect } from "react";
import axios from "axios";

function Products(props) {
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState([1]);

  const Product = ({ name, price }) => {
    const handleClick = () => {
      props.handleAdd(name, price, quantity);
    };
    return (
      <div className="shadow rounded bg-white p-4">
        <button className="w-full block text-start" onClick={handleClick}>
          <h2 className="text-lg font-bold pb-1">{name}</h2>
          <p className="text-gray-500 text-end">${price}</p>
        </button>
      </div>
    );
  };
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get(
          `http://localhost:3000/products/category/${props.category}`,
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods":
                "GET,PUT,POST,DELETE,PATCH,OPTIONS",
              "Content-Type": "application/json",
            },
          }
        );
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchProducts();
  }, [props.category]);

  return (
    <>
      <div className="grid grid-cols-4 gap-4">
        {products.map((product) => (
          <Product key={product.id} name={product.name} price={product.price} />
        ))}
      </div>
    </>
  );
}

export default Products;
