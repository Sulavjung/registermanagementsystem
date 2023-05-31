import React, { useState, useEffect } from "react";
import axios from "axios";
import AddNew from "./addNew";
import UpdateProduct from "./update";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTerm, setFilterTerm] = useState("");
  const [currentProduct, setCurrentProduct] = useState(null);
  const [showAddNew, setShowAddNew] = useState(0);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_DB_HOST}products`,
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
        setSortedProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchProducts();
  }, []);

  const handleSort = (sortBy) => {
    const sorted = [...sortedProducts].sort((a, b) => {
      if (a[sortBy] < b[sortBy]) return -1;
      if (a[sortBy] > b[sortBy]) return 1;
      return 0;
    });
    setSortedProducts(sorted);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilter = (event) => {
    setFilterTerm(event.target.value);
  };

  const filteredProducts = sortedProducts.filter((product) => {
    return (
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterTerm === "" || product.category === filterTerm)
    );
  });

  const rows = filteredProducts.map((product) => (
    <tr
      key={product.id}
      className="border-gray-400 border-b hover:bg-gray-100 cursor-pointer"
      onClick={() => {
        setCurrentProduct(product);
        setShowAddNew(showAddNew + 1);
      }}
    >
      <td className="py-4 px-6 border-b">{product.id}</td>
      <td className="py-4 px-6 border-b">{product.name}</td>
      <td className="py-4 px-6 border-b">{product.category}</td>
      <td className="py-4 px-6 border-b">{product.price}</td>
      <td className="py-4 px-6 border-b">{product.barcode}</td>
    </tr>
  ));

  return (
    <div className="grid grid-cols-6">
      <div className="col-span-4 container mx-auto px-4 mt-4  h-screen overflow-auto">
        <h1 className="text-2xl font-bold mb-4">All Products</h1>
        <div className="flex mb-4">
          <input
            type="text"
            placeholder="Search by name"
            value={searchTerm}
            onChange={handleSearch}
            className="border-2 border-gray-300 bg-white h-10 px-5 pr-10 rounded-lg text-sm focus:outline-none shadow"
          />
          <select
            onChange={handleFilter}
            value={filterTerm}
            className="ml-4 border-2 border-gray-300 bg-white h-10 px-8 pr-10 rounded-lg text-sm focus:outline-none shadow"
          >
            {Array.from(
              new Set(products.map((product) => product.category))
            ).map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <table className="table-fixed w-full">
          <thead>
            <tr>
              <th
                className="py-4 px-6 bg-gray-100 font-bold uppercase text-sm text-gray-600 border-b border-gray-400 cursor-pointer"
                onClick={() => handleSort("id")}
              >
                Id
              </th>
              <th
                className="py-4 px-6 bg-gray-100 font-bold uppercase text-sm text-gray-600 border-b border-gray-400 cursor-pointer"
                onClick={() => handleSort("name")}
              >
                Name
              </th>
              <th
                className="py-4 px-6 bg-gray-100 font-bold uppercase text-sm text-gray-600 border-b border-gray-400 cursor-pointer"
                onClick={() => handleSort("category")}
              >
                Category
              </th>
              <th
                className="py-4 px-6 bg-gray-100 font-bold uppercase text-sm text-gray-600 border-b border-gray-400 cursor-pointer"
                onClick={() => handleSort("price")}
              >
                Price
              </th>
              <th
                className="py-4 px-6 bg-gray-100 font-bold uppercase text-sm text-gray-600 border-b border-gray-400 cursor-pointer"
                onClick={() => handleSort("barcode")}
              >
                Barcode
              </th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </div>

      <div className="col-span-2">
        <div>
          {showAddNew === 0 ? (
            <AddNew setShowAddNew={setShowAddNew} />
          ) : showAddNew >= 1 ? (
            <UpdateProduct
              key={currentProduct ? currentProduct.id : null}
              product={currentProduct}
              setShowAddNew={setShowAddNew}
            />
          ) : (
            <div> Hi, you made wrong. </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
