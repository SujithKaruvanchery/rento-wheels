import React from "react";
import GuestHeader from "./components/user/GuestHeader";
import Footer from "./components/user/Footer";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <div>
      <GuestHeader />
      <Footer />
    </div>
  );
};

export default App;
