import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "./Context";
import Filter from "./filters";
import { useNavigate } from "react-router-dom";

function Home() {
  const { addToCart, user, cart, removeFromCart } = useContext(UserContext);
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [category, setCategory] = useState("All");
  const [priceRange, setPriceRange] = useState("All");
  const [popupMessage, setPopupMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  // Fetch items
  useEffect(() => {

     const API_URL =import.meta.env.VITE_API_URL;
    axios.get(`${API_URL}/items`)
      .then((res) => {
        setItems(res.data);
        setFilteredItems(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  // Filter items by category and price
  useEffect(() => {
    let filtered = [...items];

    // Category filter
    if (category !== "All") {
      filtered = filtered.filter((item) => item.category === category);
    }

    // Price filter
    if (priceRange !== "All") {
      const [min, max] = priceRange.split("-").map(Number);
      filtered = filtered.filter((item) => {
        if (!max) return item.price >= min; // For 1001+ case
        return item.price >= min && item.price <= max;
      });
    }

    setFilteredItems(filtered);
  }, [category, priceRange, items]);

  const handleAddToCart = async (item) => {
  if (!user) {
    navigate("/login");
    return;
  }

  addToCart(item);

  // Send user and item to backend cart API
  axios.post(`https://e-commerce-1-6nfx.onrender.com/cart`, { userEmail: user, item })
    .then((res) => console.log(res.data))
    .catch((err) => console.error(err));

  setPopupMessage(`${item.name} added to cart!`);
  setShowPopup(true);
  setTimeout(() => setShowPopup(false), 2000);
};

  const categories = ["All", ...new Set(items.map((item) => item.category))];

  return (
    <div className="container mt-4">
      <Filter
        categories={categories}
        selectedCategory={category}
        onCategoryChange={setCategory}
        selectedPrice={priceRange}
        onPriceChange={setPriceRange}
      />

      {/* Popup */}
      {showPopup && (
        <div
          className="popup-notification"
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            padding: "10px 20px",
            backgroundColor: "#28a745",
            color: "#fff",
            borderRadius: "5px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
            zIndex: 1000,
          }}
        >
          {popupMessage}
        </div>
      )}

      <div className="row">
        {filteredItems.length !== 0 ? (filteredItems.map((item) => (
          <div key={item.id} className="col-md-3 mb-4">
            <div className="card h-100">
              <img src={item.image} alt={item.name} className="card-img-top h-100" />
              <div className="card-body d-flex flex-column">
                <h5>{item.name}</h5>
                <p>{item.description}</p>
                <div className="mt-auto d-flex justify-content-between align-items-center">
                  <b>₹{item.price}</b>
                  {cart.some((i) => i.id === item.id) ? (
                    <button className="btn btn-danger" onClick={() => removeFromCart(item.id)}>
                      Remove
                    </button>
                  ) : (
                    <button className="AddCart rounded-1" onClick={() => handleAddToCart(item)}>
                      Add to cart
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))):(
          <div style={{position:'relative' , left:'50%',width:'fit-content'}}>No available items</div>
        )}
      </div>
    </div>
  );
}

export default Home;
