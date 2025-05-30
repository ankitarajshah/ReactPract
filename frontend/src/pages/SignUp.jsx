import React from "react";
import AuthForm from "../components/common/AuthForm";
import { signupSchema } from "../../schemas/authSchema";
import { signupFields } from "../../fields/authFields";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const SignUp = () => {
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/signup",
        data
      );
      alert("Sign Up successfull");
      console.log(res.data);
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
