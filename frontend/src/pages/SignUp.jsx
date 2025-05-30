import React from "react";
import AuthForm from "../components/common/AuthForm";
import { signupSchema } from "../schemas/authSchema";
import { signupFields } from "../fields/authFields";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const SignUp = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/signup",
        data
      );
      alert("Sign Up successfull");
      console.log(res.data);
      login(res.data); // Assumes { user, token } from backend api
      navigate("/signin");
    } catch (err) {
      alert(err.response?.data?.error || "Signup failed");
    }
  };
  return (
    <>
      <AuthForm
        title="Sign Up"
        schema={signupSchema}
        fields={signupFields}
        onSubmit={onSubmit}
      />
    </>
  );
};

export default SignUp;
