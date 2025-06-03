import React from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthForm from "../components/common/AuthForm";
import { Typography } from "@mui/material";
import axios from "axios";
import { loginSchema } from "../schemas/authSchema";
import { loginFields } from "../fields/authFields";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
// const loginSchema = z.object({
//   email: z.string().email("Invalid email"),
//   password: z.string().min(6, "Password must be at least 6 characters"),
// });
// const signUpSchema = z.object({
//   name: z.string().name("Name required"),
//   ...loginSchema,
// });
// const loginFields = [
//   {
//     name: "email",
//     label: "Email",
//     type: "email",
//   },
//   {
//     name: "password",
//     label: "Password",
//     type: "password",
//   },
// ];
// const signInFields = [
//   {
//     name: "name",
//     ...loginFields,
//   },
// ];

const SignIn = () => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  const { user, login } = useAuth();
  const navigate = useNavigate();
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log(email, password);
  //   const dummyUser = {
  //     email: "abc@gmail.com",
  //     token: "true",
  //   };
  //   localStorage.setItem("user", JSON.stringify(dummyUser));
  //   navigate("/");
  // };
  useEffect(() => {
    if (user) {
      navigate("/", { replace: true }); // or dashboard
    }
  }, [user, navigate]);
  const onSubmit = async (data) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        data
      );
      alert("Login successfull");
      console.log(res.data);
      // localStorage.setItem("user", JSON.stringify(res.data));
      login(res.data);
      navigate("/", { replace: true });
    } catch (err) {
      alert(err.response?.data?.error || "Login failed");
    }
  };
  return (
    // <div>
    //   <form action="" onSubmit={handleSubmit}>
    //     <input
    //       type="email"
    //       name="email"
    //       value={email}
    //       onChange={(e) => setEmail(e.target.value)}
    //       placeholder="Email"
    //       id=""
    //     />
    //     <input
    //       type="password"
    //       name=""
    //       id=""
    //       value={password}
    //       onChange={(e) => setPassword(e.target.value)}
    //       placeholder="Password"
    //     />
    //     <button type="submit">Login</button>
    //   </form>
    // </div>
    <>
      <AuthForm
        title="Login"
        schema={loginSchema}
        fields={loginFields}
        onSubmit={onSubmit}
      />
      <Typography align="center">
        Don’t have an account? <Link to="/signup">Sign up</Link>
      </Typography>
    </>
  );
};

export default SignIn;
