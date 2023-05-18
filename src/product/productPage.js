import React, { useState } from "react";
import Nav from "../layoutComponent/mainNav";
import AllProducts from "./allProducts";

const ProductPage = () => {
  const [showButton, setShowButton] = useState("All Products");

  const Button = (props) => {
    return (
      <button
        className="p-5 bg-lime-500 rounded w-full border mb-2 hover:bg-sky-500"
        onClick={() => setShowButton(props.name)}
      >
        {props.name}
      </button>
    );
  };
  return (
    <>
      <Nav />

      <div className="grid grid-cols-8">
        {/* We want the tools on the side to control the product listing on this page. 
        1. Main View of the Products or the Default view. 
        2. Then we want, categorized view. 
        3. On the top add item button that will open up a form on the middle.*/}
        {/* We want the filtering system on the table list of the product as well.  */}
        {/* Firstly we would want to make sure that the  */}

        <div className="col-span-1 border-r p-5 pt-2 shadow-xl h-screen">
          <Button name="All Products" />
          {/* Add Mor Side Buttons Here */}
        </div>

        <div className="col-span-7 bg-slate-100">
          {showButton === "All Products" ? (
            <AllProducts />
          ) : showButton === "Add New" ? (
            <div>Hello</div>
          ) : (
            <div className="div">Nothing Here</div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductPage;
