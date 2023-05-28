import React, { useState, useEffect } from "react";
import axios from "axios";

const Search = (props) => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showList, setShowList] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:3006/products").then((response) => {
      setProducts(response.data);
    });
  }, []);

  const filteredProducts = products.filter(
    (product) =>
      product.name
        .toLowerCase()
        .replace(/\s/g, "")
        .includes(searchQuery.toLowerCase().replace(/\s/g, "")) ||
      product.barcode
        .toLowerCase()
        .replace(/\s/g, "")
        .includes(searchQuery.toLowerCase().replace(/\s/g, ""))
  );

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
    if (event.target.value) {
      setShowList(true);
    } else {
      setShowList(false);
    }
  };

  const handleBlur = () => {
    setShowList(false);
  };

  return (
    <div>
      <div class="relative rounded-full bg-gray-100 shadow">
        <input
          type="text"
          value={searchQuery}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Search..."
          class="rounded-full bg-transparent py-2 pl-10 pr-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow"
        />
        <div class="absolute inset-y-0 left-0 flex items-center pl-3"></div>
        <button
          type="submit"
          class="absolute inset-y-0 right-0 bg-lime-500 hover:bg-lime-700 text-white font-semibold py-2 px-4 rounded-full shadow"
        >
          <svg
            class="h-5 w-5 text-gray-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15.5 15.5L20 20M10 17a7 7 0 1 1 7-7 7 7 0 0 1-7 7z"
            ></path>
          </svg>
        </button>
      </div>
      {showList && (
        <div className="absolute z-10 top-full right-5 w-80 bg-sky-100 shadow-lg rounded-lg overflow-hidden border">
          <ul>
            {filteredProducts.slice(0, 10).map((product) => (
              <li
                key={product.id}
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium">{product.name}</span>
                  <span className="font-medium">${product.price}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Search;
