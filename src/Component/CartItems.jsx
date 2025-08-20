import React from "react";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/esm/Button";
import { FaRupeeSign } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const CartItems = () => {
  const [cart, setCart] = useCart();
  const auth = useAuth();

  // Group items by ID to calculate quantities
  const cartItemsWithQuantity = cart.reduce((acc, item) => {
    const existingItem = acc.find((i) => i._id === item._id);
    if (existingItem) {
      existingItem.quantity += 1;
      existingItem.totalPrice += item.price;
    } else {
      acc.push({ ...item, quantity: 1, totalPrice: item.price });
    }
    return acc;
  }, []);

  // Calculate total price
  const getTotal = () => {
    return cart.reduce((acc, item) => acc + item.price, 0);
  };

  // Remove one instance of an item from cart
  const removeCartItem = (cid) => {
    // Find the index of the first occurrence of the item
    const index = cart.findIndex((item) => item._id === cid);

    if (index !== -1) {
      const updatedCart = [...cart];
      updatedCart.splice(index, 1); // Remove only one instance
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      toast.success("🗑️ One item removed from cart!");
    }
  };

  // Remove all instances of an item from cart
  const removeAllInstances = (cid) => {
    const updatedCart = cart.filter((item) => item._id !== cid);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.success("🗑️ All items removed from cart!");
  };

  return (
    <div>
      <Container className="text-center mt-4">
        <h2>Hello, {auth?.user?.name} 👋</h2>

        <h4>
          You have {cart.length} product{cart.length !== 1 ? "s" : ""} in your
          cart
        </h4>

        {cart.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Product Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cartItemsWithQuantity.map((item) => (
                <tr key={item._id}>
                  <td>
                    <img
                      src={`https://e-commerse-backend-ig4l.onrender.com/product/product-photo/${item._id}`}
                      height={80}
                      width={80}
                      alt={item.name}
                    />
                  </td>
                  <td>{item.name}</td>
                  <td>
                    <FaRupeeSign /> {item.price}
                  </td>
                  <td>{item.quantity}</td>
                  <td>
                    <FaRupeeSign /> {item.totalPrice}
                  </td>
                  <td>
                    <div className="d-flex gap-2">
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => removeCartItem(item._id)}
                      >
                        Remove One
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => removeAllInstances(item._id)}
                      >
                        Remove All
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={4}>Total Price:</td>
                <td colSpan={2}>
                  <FaRupeeSign /> {getTotal()}
                </td>
              </tr>
            </tfoot>
          </table>
        ) : (
          <p className="mt-3">🛒 Your cart is empty!</p>
        )}
      </Container>
    </div>
  );
};
