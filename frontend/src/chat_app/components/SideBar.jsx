import React, { useState } from "react";
import Search from "./Search.jsx";
import Profile from "./Profile.jsx";
import { useAuthContext } from "../Context/authUser.jsx";
import toast from "react-hot-toast";
import useConversation from "../zustand/useConversation.js";
import { startpoint } from "../customHooks.js/apiStatrtPoint.js";


function SideBar() {
  const [search, setSearch] = useState("");
  const { setAuthUser } = useAuthContext();
  const { setSelectedUser } = useConversation();

  const handleLogout = async () => {
      localStorage.removeItem("authuser");
      sessionStorage.removeItem('token');
      setAuthUser(null);
      setSelectedUser(null);
  };

  return (
    <div className="min-h-[450px] h-full border-r border-gray-400 p-3 flex flex-col">
      <Search setSearch={setSearch} />
      <div className="divider my-0 w-full"></div>

      <div className="max-h-[330px] w-full flex-1 overflow-auto scrollbar-thin scrollbar-track-slate-500 scrollbar-thumb-white">
        <Profile search={search} />
      </div>

      <div className="max-w-40 self-center w-full font-serif">
        <button onClick={handleLogout} className="btn btn-error w-full">
          Logout
        </button>
      </div>
    </div>
  );
}

export default SideBar;
