import { NavLink } from "react-router-dom";
import "./Adminmenu.css"; // Optional
import { NavDropdown } from "react-bootstrap";

export const Adminmenu = () => {
  return (
    <div className="admin-menu p-3  shadow rounded">
      <NavDropdown.Item as={NavLink} to="/dashboard/admin">
        Profile
      </NavDropdown.Item>
      <NavDropdown.Item as={NavLink} to="/dashboard/admin/createcategory">
        Create Category
      </NavDropdown.Item>
      <NavDropdown.Item as={NavLink} to="/dashboard/admin/createproduct">
        Create Product
      </NavDropdown.Item>
      <NavDropdown.Item as={NavLink} to="/dashboard/admin/products">
        View Products
      </NavDropdown.Item>

      <NavDropdown.Item as={NavLink} to="/dashboard/admin/user">
        Users
      </NavDropdown.Item>
    </div>
  );
};
