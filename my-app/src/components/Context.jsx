import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

 function UserProvider({ children }) {
 
  const [user, setUser] = useState(() => localStorage.getItem("userEmail") || "");

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

 useEffect(() => {
    if (user) {
      localStorage.setItem(`cart_${user}`, JSON.stringify(cart));
    }
  }, [cart, user]);


  const login = (email) => {
    setUser(email);
    localStorage.setItem("userEmail", email); // save login info
  };

  
 
  const logout = () => {
    setUser("");
     localStorage.removeItem("userEmail");
  };

  const addToCart = (item) => setCart(prev => [...prev, item]);
  const removeFromCart = (id) => setCart(prev => prev.filter(item => item.id !== id));

  return (
    <UserContext.Provider value={{ user, login, logout, cart, addToCart, removeFromCart }}>
      {children}
    </UserContext.Provider>
  );
}
export default UserProvider;