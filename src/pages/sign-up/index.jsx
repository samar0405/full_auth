import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import { auth } from "@service";
import SignUpModal from "../../components/modal/sign-up-modal";
const Index = () => {
  const [form, setForm] = useState({});
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await auth.sign_up(form);
      if (response.status === 200) {
        setModal(true);
        localStorage.setItem("email", form.email);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleModalClose = () => {
    setModal(false);
    navigate("/somewhere");
  };

  return (
    <>
      <SignUpModal open={modal} toggle={handleModalClose} />
      <div className="w-full h-screen flex items-center justify-center">
        <div className="w-full sm:w-[600px] p-5 bg-white shadow-md rounded-lg">
          <h1 className="text-center my-6 text-[40px]">Register</h1>
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
              type="text"
              fullWidth
              label="Full Name"
              id="full_name"
              name="full_name"
              onChange={handleChange}
            />
            <TextField
              type="password"
              fullWidth
              label="Password"
              onChange={handleChange}
              id="password"
              name="password"
            />
            <TextField
              type="text"
              fullWidth
              label="Phone Number"
              id="phone_number"
              name="phone_number"
              onChange={handleChange}
            />
            <Button variant="contained" type="submit">
              Sign Up
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Index;
