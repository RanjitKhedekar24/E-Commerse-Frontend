// import { createContext, useContext, useEffect, useState } from "react";

// const CartContext=createContext()

// const CartProvider=({children})=>{
//     const [cart,setCart]=useState([])
// useEffect(()=>{
//     const existingcartitem=localStorage.getItem("cart")
//     if(existingcartitem)
//     {
//        setCart(JSON.parse(existingcartitem))
//     }
// },[])

// return (
//     <CartContext.Provider value={[cart,setCart]}>
//         {children}
//     </CartContext.Provider>
// )
// }
// const useCart=()=>useContext(CartContext)
// export {useCart,CartProvider}

import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Load cart from localStorage when app starts
  useEffect(() => {
    const existingCart = localStorage.getItem("cart");
    if (existingCart) {
      setCart(JSON.parse(existingCart));
    }
  }, []);

  // Keep localStorage in sync whenever cart changes
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      localStorage.removeItem("cart");
    }
  }, [cart]);

  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => useContext(CartContext);

export { useCart, CartProvider };
