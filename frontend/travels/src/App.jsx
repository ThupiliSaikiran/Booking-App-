import { useState, useEffect } from "react";
import "./App.css";
// import LoginForm from "./components/LoginForm";
// import RegisterForm from "./components/RegisterForm";
// import BusList from "./components/BusList";
// import BusSeats from "./components/BusSeats";
// import UserBookings from "./components/UserBookings";
// import Wrapper from "./components/Wrapper";

import { Routes, Route } from "react-router-dom";

import Wrapper from "./newComponents/Wrapper";
import BusList from "./newComponents/BusList";
import RegisterForm from "./newComponents/RegisterForm";
import LoginForm from "./newComponents/LoginForm";
import BusSeats from "./newComponents/BusSeats";
import UserBookings from "./newComponents/UserBookings";


function App() {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  // Load token from localStorage on refresh
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUserId = localStorage.getItem("userId");
    if (storedToken) {
      setToken(storedToken);
      setUserId(storedUserId);
    }
  }, []);

  const handleLogin = (token, userId) => {
    setToken(token);
    setUserId(userId);
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
  };

  const handleLogout = () => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
  };

  return (
    <>
      {/* <Wrapper handleLogout={handleLogout} token={token}>
        <Routes>
          <Route path="/" element={<BusList />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
          <Route path="/bus/:busId" element={<BusSeats token={token} />} />
          <Route
            path="/my-bookings"
            element={<UserBookings token={token} userId={userId} />}
          />
        </Routes>
      </Wrapper> */}
       <Wrapper handleLogout={handleLogout} token={token}>
        <Routes>
          <Route path="/" element={<BusList />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
          <Route path="/bus/:busId" element={<BusSeats token={token} />} />
          <Route
            path="/my-bookings"
            element={<UserBookings token={token} userId={userId} />}
          />
        </Routes>
      </Wrapper>
    </>
  );
}

export default App;
