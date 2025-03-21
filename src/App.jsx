import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Bill from "./pages/Bill";
import Register from "./pages/Auth/Register";

function App() {
  const storedAuth = JSON.parse(localStorage.getItem("storedUser"));

  return (
    <BrowserRouter>
      <Routes>
        {storedAuth ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/bills" element={<Bill />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        ) : (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
