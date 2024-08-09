import React from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "./Homepage";
import LoginAdmin from "./LoginAdmin";
import LoginUser from "./LoginUser";
import Navbar from "./Navbar";
import SignupAdmin from "./SignupAdmin";
import SignupUser from "./SignupUser";
import NewOrder from "./NewOrder";
import MyOrders from "./MyOrders";
import AllOrders from "./AllOrders";
import MapComponent from "./MapComponent";
import ProtectedRoute from "./ProtectedRoute";
import { AuthProvider } from "./AuthContext";

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/loginadmin" element={<LoginAdmin />} />
            <Route path="/loginuser" element={<LoginUser />} />
            <Route path="/signupadmin" element={<SignupAdmin />} />
            <Route path="/signupuser" element={<SignupUser />} />
            <Route path="/map" element={<MapComponent />} />

            {/* Protected Routes */}
            <Route path="/new-order" element={
              <ProtectedRoute element={<NewOrder />} allowedRoles={['user']} />
            } />
            <Route path="/myorders" element={
              <ProtectedRoute element={<MyOrders />} allowedRoles={['user']} />
            } /> 
            <Route path="/allorders" element={
              <ProtectedRoute element={<AllOrders />} allowedRoles={['admin']} />
            } />
            
            {/* Add other routes as needed */}
          </Routes>
        </main>
      </div>
    </AuthProvider>
  );
}

export default App;
