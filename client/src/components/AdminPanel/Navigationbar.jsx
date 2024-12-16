import { Button, Navbar } from "flowbite-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const Navigationbar = () => {
  const navigate = useNavigate();

  const handleLog = () => {
    localStorage.clear("email");
    localStorage.clear("role");
    navigate("/");
  };

  return (
    <div>
      <Navbar fluid mx-4 className="bg-gray-800 p-4 ">
        <Navbar.Brand>
          <img src="/logo.svg" className="mr-3 h-6 sm:h-9 " />
        </Navbar.Brand>
        <div className="flex md:order-2 " onClick={handleLog}>
          <Button className="">Logout</Button>
        </div>
        <Navbar.Collapse></Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Navigationbar;
