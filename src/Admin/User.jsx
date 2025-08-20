import React, { useEffect, useState } from "react";
import { Table, Container, Spinner, Alert, Col, Badge } from "react-bootstrap";
import { Adminmenu } from "./Adminmenu";

export const User = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const res = await fetch(
        "https://e-commerse-backend-ig4l.onrender.com/auth/allusers"
      );
      const data = await res.json();

      if (data.success) {
        setUsers(data.users);
      } else {
        setError(data.message || "Failed to fetch users.");
      }
    } catch (err) {
      setError("⚠️ Server error while fetching users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Container className="py-5">
      <h2 className="mb-4 text-primary fw-bold text-center">
        👥 All Registered Users
      </h2>
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <Table bordered hover responsive className="shadow-sm rounded">
          <thead className="table-dark text-center">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Role</th>
              <th>Registered</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id} className="text-center align-middle">
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.address}</td>
                <td>
                  {user.role === "1" || user.role === "admin" ? (
                    <Badge bg="danger">Admin</Badge>
                  ) : (
                    <Badge bg="secondary">User</Badge>
                  )}
                </td>
                <td>
                  {new Date(user.createdAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

// import React, { useEffect } from "react";
// import { Col, Container, Row,Badge } from "react-bootstrap";
// import { Adminmenu } from "./Adminmenu";
// import { useState } from "react";
// import { useAuth } from "../context/auth";

// export const User = () => {
//   const [users, setUsers] = useState([]);
//   const auth = useAuth();
//   const getusers = async () => {
//     try {
//       const res = await fetch("https://e-commerse-backend-ig4l.onrender.com/auth/allusers").then(
//         (data) =>
//           data.json().then((data) => {
//             setUsers(data.users);
//           })
//       );
//     } catch (error) {
//       console.error("Error fetching users:", error);
//     }
//   };
//   useEffect(() => {
//     getusers();
//   }, []);
//   return (
//     <div>
//       <Container>
//         <Row>
//           <Col md={3}>
//             <Adminmenu />
//           </Col>
//           <table className="table">
//             <thead>
//               <tr>
//                 <th>#</th>
//                 <th>Name</th>
//                 <th>Email</th>
//                 <th>Phone</th>
//                 <th>Address</th>
//                 <th>Role</th>
//                 <th>Registered</th>
//               </tr>
//             </thead>
//             <tbody>
//               {users.map((user, index) => (
//                 <tr key={user._id}>
//                   <td>{index + 1}</td>
//                   <td>{user.name}</td>
//                   <td>{user.email}</td>
//                   <td>{user.phone}</td>
//                   <td>{user.address}</td>
//                   <td>
//                     {user.role === "1" || user.role === "admin" ? (
//                       <Badge bg="danger">Admin</Badge>
//                     ) : (
//                       <Badge bg="secondary">User</Badge>
//                     )}
//                   </td>
//                   <td>{new Date(user.createdAt).toLocaleDateString()}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </Row>
//       </Container>
//     </div>
//   );
// };
