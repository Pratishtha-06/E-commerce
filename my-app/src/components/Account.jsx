import { useContext } from "react";
import { UserContext } from "./Context";
import { useNavigate } from "react-router-dom";

function Account() {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();              
    navigate("/login");   // redirect to login page
  };

  if (!user) {
    return (
      <div className="container mt-4">
        <h3>You are not logged in.</h3>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h3>Account Details</h3>
      <p><strong>Email:</strong> {user}</p>
      <button className="btn btn-danger mb-3" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Account;
