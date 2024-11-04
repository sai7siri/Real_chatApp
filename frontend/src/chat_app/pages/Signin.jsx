import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useSignIn } from "../customHooks.js/useSignin";
import { useAuthContext } from "../Context/authUser";


function SignIn() {
  const navigate = useNavigate();
  const { setAuthUser } = useAuthContext();

  const {loading , login}=useSignIn();

  const [form, setForm] = useState({
    userName: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.userName || !form.password) {
      return toast.error("plz fill fields");
    }
      try{

        const {success, message ,data} = await login(form);

        if(success){
          toast.success(message);
          localStorage.setItem("authuser" , JSON.stringify(data));
          setAuthUser(data);
          navigate('/home');
        }else{
          toast.error(message);
        }
      }catch(err){
        return toast.error("something happened");

      }
  };

  return (
    <div className="container flex items-center justify-center h-screen">
      <div className="max-w-md w-full bg-gray-200 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-neutral-100 p-4">
        <h1 className="font-bold text-center text-2xl">Signin</h1>

        <form onSubmit={handleSubmit} className="">
          <div className="flex flex-col py-3">
            <label htmlFor="userName" className="font-mono text-white">
              userName
            </label>
            <input
              id="userName"
              name="userName"
              value={form.userName || ""}
              onChange={handleChange}
              type="text"
              placeholder="enter userName"
              className="input input-bordered"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="pass" className="font-mono text-white">
              Password
            </label>
            <input
              id="pass"
              name="password"
              value={form.password || ""}
              onChange={handleChange}
              type="password"
              placeholder="enter password"
              className="input input-bordered"
            />
          </div>

          <button type="submit" className="btn btn-accent w-full my-4">
            {loading ? <span className="loading loading-spinner"></span> : "submit"}
          </button>
        </form>
        <div>
          <span className="font-medium font-serif ">
            don't have an account ?
          </span>
          <Link
            to="/signup"
            className="hover:underline underline-offset-4 hover:text-white ml-1 font-serif"
          >
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
