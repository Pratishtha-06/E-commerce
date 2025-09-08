import React from "react";

function Filter({ categories, selectedCategory, onCategoryChange, selectedPrice, onPriceChange }) {
  return (
    <div className="mb-4 d-flex gap-3 align-items-center">
      {/* Category Filter */}
      <div>
        <label className="me-2">Category:</label>
        <select value={selectedCategory} onChange={(e) => onCategoryChange(e.target.value)}>
          {categories.map((cat, index) => (
            <option key={index} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Price Filter */}
      <div>
        <label className="me-2">Price:</label>
        <select value={selectedPrice} onChange={(e) => onPriceChange(e.target.value)}>
          <option value="All">All</option>
          <option value="0-500">0 - 500</option>
          <option value="501-1000">501 - 1000</option>
          <option value="1001-5000">1001+</option>
        </select>
      </div>
    </div>
  );
}

export default Filter;
