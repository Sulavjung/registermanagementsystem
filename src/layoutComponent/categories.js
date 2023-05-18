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
    const selectedClass = "border-2 shadow-xxl bg-green-400";

    return (
      <div
        className={`bg-white p-4 m-2 shadow rounded-lg text-start ${
          category === categorySelected ? selectedClass : ""
        }`}
        key={category}
      >
        <button
          className="w-full block text-start"
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
      const response = await fetch("http://localhost:3000/categories");
      const data = await response.json();
      const uniqueCategories = [...new Set(data)];
      setCategories(uniqueCategories);
    }

    fetchCategories();
  }, []);

  return (
    <>
      <div className="col-span-1 h-screen overflow-auto mt-2">
        {categories.map((category) => Category(category))}
      </div>
      <div className="col-span-5 py-2 border-l px-1 overflow-scroll h-screen">
        <Products category={categorySelected} handleAdd={props.handleAdd} />
      </div>
    </>
  );
}

export default Categories;
