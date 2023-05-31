import React, { useState, useEffect } from "react";
import Products from "./products";

function Categories(props) {
  const [categories, setCategories] = useState([]);
  const [categorySelected, setCategorySelected] = useState("Home");

  const Category = (category) => {
    const handleClick = (name) => {
      setCategorySelected(name);
    };

    // Define a CSS class to apply to the selected button
    const selectedClass = "shadow text-white selectedButton";

    return (
      <div className="px-2">
        <button
          className={`w-full block bg-cyan-400 p-4 m-2 rounded-lg text-start pointer-effect bg-gradient-primary ${
            category === categorySelected ? selectedClass : ""
          }`}
          key={category}
          onClick={() => handleClick(category)}
        >
          <h2 className="text-lg font-medium" id={category}>
            {category}
          </h2>
        </button>
      </div>
    );
  };

  useEffect(() => {
    async function fetchCategories() {
      const response = await fetch(
        `${process.env.REACT_APP_DB_HOST}categories`
      );
      const data = await response.json();
      const uniqueCategories = [...new Set(data)];
      setCategories(uniqueCategories);
    }

    fetchCategories();
  }, []);

  return (
    <>
      <div className="col-span-1 mt-2 h-screen overflow-hidden">
        <div className="h-full overflow-y-auto pb-20">
          {categories.map((category) => Category(category))}
        </div>
      </div>
      <div className="col-span-5 py-2 border-l px-1 overflow-y-auto h-screen">
        <div className="h-full overflow-y-auto pb-20">
          <Products category={categorySelected} handleAdd={props.handleAdd} />
        </div>
      </div>
    </>
  );
}

export default Categories;
