import React, { useState, useEffect } from "react";

const UpdateProduct = (props) => {
  const [name, setName] = useState(props.product.name);
  const [price, setPrice] = useState(props.product.price);
  const [barcode, setBarcode] = useState(props.product.barcode);
  const [category, setCategory] = useState(props.product.category);
  const [taxPercentage, setTaxPercentage] = useState(
    props.product.taxPercentage
  );
  const [isEmpty, setIsEmpty] = useState(false);
  const [categories, setCategories] = useState([]);

  const errorMessage = (message) => {
    return (
      <div>
        <p className="text-red-500">{message}</p>
      </div>
    );
  };
  useEffect(() => {
    async function fetchCategories() {
      const response = await fetch("http://localhost:3006/categories");
      const data = await response.json();
      const uniqueCategories = [...new Set(data)];
      setCategories(uniqueCategories);
    }

    fetchCategories();
  }, []);

  const checkEmptyFields = () => {
    if (
      name === "" ||
      price === "" ||
      barcode === "" ||
      category === "" ||
      taxPercentage === ""
    ) {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    checkEmptyFields();

    // Submit the form data to the server or perform any other action
    console.log("Form submitted:", {
      name,
      price,
      barcode,
      category,
      taxPercentage,
    });

    if (!isEmpty) {
      const data = {
        name,
        price,
        barcode,
        category,
        taxPercentage,
      };

      fetch(`http://localhost:3006/products/${props.product.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((responseData) => {
          console.log("Product updated:", responseData);
          // Optionally, clear the form fields and show a success message to the user
          setName("");
          setPrice("");
          setBarcode("");
          setCategory("");
          setTaxPercentage("");
          setIsEmpty(false);
        })
        .catch((error) => {
          console.error("Error updating product:", error);
          // Show an error message to the user
        });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="mx-auto p-5 max-w-xl w-full rounded shadow"
      >
        <button
          onClick={() => {
            props.setShowAddNew(0);
          }}
          className="bg-sky-100 text-black font-bold py-2 px-4 rounded-lg mb-5"
        >
          Add New
        </button>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {isEmpty && name === "" && errorMessage("! Please enter the name. ")}
        </div>

        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-700 font-bold mb-2">
            Price
          </label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {isEmpty &&
            price === "" &&
            errorMessage("! Please enter the price. ")}
        </div>

        <div className="mb-4">
          <label
            htmlFor="barcode"
            className="block text-gray-700 font-bold mb-2"
          >
            Barcode
          </label>
          <input
            type="text"
            id="barcode"
            value={barcode}
            onChange={(e) => {
              setBarcode(e.target.value);
            }}
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {isEmpty &&
            barcode === "" &&
            errorMessage("! Please scan the barcode. ")}
        </div>

        <div className="mb-4">
          <label
            htmlFor="category"
            className="block text-gray-700 font-bold mb-2"
          >
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {isEmpty &&
            category === "" &&
            errorMessage("! Please choose the category. ")}
        </div>

        <div className="mb-4">
          <label
            htmlFor="taxPercentage"
            className="block text-gray-700 font-bold mb-2"
          >
            Tax Percentage
          </label>
          <select
            id="taxPercentage"
            value={taxPercentage}
            onChange={(e) => {
              setTaxPercentage(e.target.value);
            }}
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select One</option>
            <option value="0.078">7.8%</option>
            <option value="0.09">9%</option>
            <option value="0.10">10%</option>
          </select>
          {isEmpty &&
            taxPercentage === "" &&
            errorMessage("! Please select tax Percentage. ")}
        </div>

        <button
          type="submit"
          className="bg-lime-500 hover:bg-lime-700 text-white font-bold py-2 px-4 rounded-xl float-right"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
