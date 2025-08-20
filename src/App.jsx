import "bootstrap/dist/css/bootstrap.min.css";
import { Header } from "./Component/Header.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./Component/Home.jsx";
import { SignIn } from "./Component/SignIn.jsx";
import { SignUp } from "./Component/SignUp.jsx";
import { CartItems } from "./Component/CartItems.jsx";
import { ForgotPassword } from "./Component/ForgotPassword.jsx";
import { AdminRouter } from "./Admin/AdminRouters.jsx";
import { AdminDashboard } from "./Admin/AdminDashboard.jsx";
import { User } from "./Admin/User.jsx";
import { Createcategory } from "./Admin/Createcategory.jsx";
import { UpdateProduct } from "./Component/UpdateProduct.jsx";
import { CreateProduct } from "./Component/CreateProduct.jsx";
import { Product } from "./Admin/Products.jsx";

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/cartitems" element={<CartItems />} />
          <Route path="/forgotpass" element={<ForgotPassword />} />

          <Route path="/dashboard" element={<AdminRouter />}>
            <Route path="admin" element={<AdminDashboard />} />
            <Route path="admin/createcategory" element={<Createcategory />} />
            <Route path="admin/createproduct" element={<CreateProduct />} />
            <Route path="admin/products" element={<Product />} />
            <Route
              path="/dashboard/admin/UpdateProduct/:id"
              element={<UpdateProduct />}
            />

            <Route path="admin/user" element={<User />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};
