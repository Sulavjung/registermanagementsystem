import React, { useState, useEffect } from "react";
import axios from "axios";

function Products(props) {
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const handleButtonClick = (selectedQuantity) => {
    setQuantity(selectedQuantity);
  };

  const Product = ({ name, price }) => {
    const handleClick = () => {
      props.handleAdd(name, price, quantity, setQuantity);
    };
    return (
      <div className="shadow rounded bg-white p-4 pointer-effect">
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
          `http://localhost:3006/products/category/${props.category}`,
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
      <div>
        <div className="sticky top-0 flex justify-evenly z-10 py-4 bg-white shadow">
          {Array.from(Array(10).keys()).map((number) => (
            <button
              key={number + 1}
              className={`w-full mx-2 py-2 px-4 rounded shadow-xl font-bold pointer-effect ${
                quantity === number + 1
                  ? "bg-blue-500 text-white"
                  : "bg-rose-500 text-white"
              }`}
              onClick={() => handleButtonClick(number + 1)}
            >
              {number + 1}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-4 gap-4 pt-4">
          {products.map((product) => (
            <Product
              key={product.id}
              name={product.name}
              price={product.price}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Products;
