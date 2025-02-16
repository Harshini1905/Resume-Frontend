import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate,Link } from "react-router-dom";
import { updateEmail, updatePersonalInfo } from "../../ReduxManager/dataStoreSlice"; // Import Redux actions

function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const email = useSelector((state) => state.dataStore.personalInfo.email);
  const name = useSelector((state) => state.dataStore.personalInfo.firstName); // Use firstName from Redux
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated");
    const storedEmail = localStorage.getItem("userEmail") || "";
    const storedName = localStorage.getItem("userName") || "";

    if (authStatus === "true" && storedEmail) {
      setIsLoggedIn(true);
      dispatch(updateEmail(storedEmail)); // Update email in Redux

      if (storedName) {
        dispatch(updatePersonalInfo({ key: "firstName", value: storedName })); // Update name in Redux
      }
    } else {
      setIsLoggedIn(false);
    }
  }, [dispatch]);


  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    setIsLoggedIn(false);
    dispatch(updateEmail("")); // Clear Redux state
    navigate("/"); // Redirect to homepage
  };

  return (
    <div style={{ backgroundColor: "#bfe9db", color: "#07588a", zIndex: 10 }}>
      <nav className="navbar navbar-expand-lg navbar-light p-0 m-0">
        <div className="container-fluid">
          <div className="navbar-brand" style={{ fontSize: "30px", fontWeight: "600" }}>
            Resume Builder
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link to="/" className="nav-link">Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/about" className="nav-link">About Us</Link>
              </li>

              {!isLoggedIn ? (
                <>
                  <li className="nav-item">
                    <Link to="/login" className="nav-link">Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/signup" className="nav-link">Sign Up</Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                     <span className="nav-link">
                        Welcome, {name || email || "Guest"}
                     </span>
                     </li>

                  <li className="nav-item">
                    <button onClick={handleLogout} className="btn btn-link nav-link">Logout</button>
                  </li>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
