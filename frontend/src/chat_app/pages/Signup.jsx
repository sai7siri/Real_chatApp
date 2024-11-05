import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSignUp } from "../customHooks.js/useSignUp";
import { toast } from "react-hot-toast";

function Signup() {
  const navigate = useNavigate();

  const [sGender, setSGender] = useState("");

  const { loading, signup } = useSignUp();

  const [form, setForm] = useState({
    fullName: "",
    userName: "",
    password: "",
    gender: "",
  });

  const formEmpty = () => {
    setForm({
      fullName: "",
      userName: "",
      password: "",
      gender: "",
    });
    setSGender(" ");
  };

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleGender = (genderr) => {
    setSGender(genderr);
    setForm({ ...form, gender: genderr });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.fullName || !form.userName || !form.password || !form.gender) {
      return toast.error("all fields required");
    }
    try {
      const { success, message } = await signup(form);
      if (success) {
        toast.success(message);
        navigate('/signin');
      } else if (!success) {
        toast.error(message);
      }
    } catch (err) {
      return toast.error("something went wrong");
    }
  };

  return (
    <div className="container flex items-center justify-center h-screen">
      <div className="max-w-md w-full bg-gray-200 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-neutral-100-100 p-4 mx-auto">
        <h1 className="font-bold text-center text-2xl">SignUp</h1>

        <form onSubmit={handleSubmit} className="">
          <div className="flex flex-col">
            <label htmlFor="name" className="font-mono text-white">
              fullName
            </label>
            <input
              id="name"
              name="fullName"
              value={form.fullName}
              onChange={handleOnchange}
              type="text"
              placeholder="enter fullName"
              className="input input-bordered"
            />
          </div>

          <div className="flex flex-col py-3">
            <label htmlFor="userName" className="font-mono text-white">
              userName
            </label>
            <input
              id="userName"
              name="userName"
              value={form.userName}
              onChange={handleOnchange}
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
              value={form.password}
              onChange={handleOnchange}
              type="password"
              placeholder="enter password"
              className="input input-bordered"
            />
          </div>

          <div className="flex items-center gap-4 py-3">
            <div className="flex items-center gap-2">
              <span className="text-white font-serif">Male</span>
              <input
                type="checkbox"
                checked={sGender === "male"}
                className="checkbox checkbox-warning"
                onChange={() => handleGender("male")}
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-white font-serif">Female</span>
              <input
                type="checkbox"
                checked={sGender === "female"}
                className="checkbox checkbox-warning"
                onChange={() => handleGender("female")}
              />
            </div>
          </div>

          <button className="btn btn-accent w-full my-2">
            {loading ? (
              <span className="loading loading-spinner text-success"></span>
            ) : (
              "Signup"
            )}
          </button>
        </form>
        <div>
          <span className="font-medium font-serif ">
            already have an account ?
          </span>
          <Link
            to="/signin"
            className="hover:underline underline-offset-4 text-white ml-1 font-serif"
          >
            Signin
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
