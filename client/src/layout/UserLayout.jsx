import React, { useState } from "react";
import GuestHeader from "../components/user/GuestHeader";
import Footer from "../components/user/Footer";
import { Outlet } from "react-router-dom";
import UserHeader from "../components/user/UserHeader";

const UserLayout = () => {
  const [isUserAuth, setIsUserAuth] = useState(false);
  return (
    <div>
      {isUserAuth ? <UserHeader /> : <GuestHeader />}
      <Outlet />
      <Footer />
    </div>
  );
};

export default UserLayout;
