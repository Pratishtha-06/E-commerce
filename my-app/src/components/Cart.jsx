import { useContext ,useEffect,useState } from 'react';
import '../App.css';
import { UserContext } from './Context';
import { useNavigate } from 'react-router-dom';

function Cart() {
const { cart, removeFromCart , user } = useContext(UserContext);
const [popupMessage, setPopupMessage] = useState("");
const [showPopup, setShowPopup] = useState(false);
const navigate = useNavigate();


 const handleRemoveFromCart = (item) => {
    removeFromCart(item.id);

    const API_URL = process.env.REACT_APP_API_URL;

    axios
      .delete(`${API_URL}/cart`, { data: { userEmail: user.email, itemId: item.id } })
      .then((res) => console.log(res.data))
      .catch((err) => console.error(err));

    // Show popup
    setPopupMessage(`${item.name} removed from cart!`);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2000);
  };

  useEffect(()=>{
  if (!user) {
    navigate("/login");

  }},[user,navigate]);


  return (
    <div className="container mt-4">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p className='cartEmpty'>Cart is empty</p>
      ) : (
        cart.map((item, index) => (
          <div key={index} className="card mb-3">
            <div className="card-body d-flex ">
              
              <img src={item.image} alt={item.name} style={{width:'15%' , height:'15%'}}></img>
              <div className='ms-5'>
              <h5>{item.name}</h5>
              <div>Price : ₹{item.price}</div>
              <button className='AddCart mt-3 rounded-1' onClick={()=>handleRemoveFromCart(item)}>
                Remove from cart</button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
export default Cart;