import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import { auth } from "@service";

const Index = () => {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form);
    try {
      const response = await auth.sign_in(form);
      if (response) {
        localStorage.setItem("access_token", response?.data?.access_token);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const moveRegister = () => {
    navigate("/sign-up");
  };

  return (
    <>
      <div className="w-full h-screen flex items-center justify-center">
        <div className="w-full sm:w-[600px] p-5 bg-white shadow-md rounded-lg">
          <h1 className="text-center my-6 text-[40px]">Login</h1>
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <TextField
              type="email"
              fullWidth
              onChange={handleChange}
              label="Email"
              id="email"
              name="email"
            />

            <TextField
              type="password"
              fullWidth
              label="Password"
              onChange={handleChange}
              id="password"
              name="password"
            />

            <Button variant="contained" type="submit">
              Sign In
            </Button>

            <p onClick={moveRegister}>Register</p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Index;
