import React from 'react';
import useConversation from '../zustand/useConversation';
import { useSocketContext } from '../Context/socket';
import { useGetUsers } from '../customHooks.js/useGetUser';


function UserPro() {

  const { selectedUser } = useConversation();
  const {onlineUser} = useSocketContext();

  const isOnline =selectedUser && onlineUser.includes(selectedUser?._id);

  return (
   <div className="flex items-center text-white gap-3 bg-gray-900 px-4 py-2">

      <div className={`${isOnline ? "online" : "offline" } w-12 avatar `}>
        <img src={selectedUser?.profile} alt="profilee" className="bg-cover w-full rounded-xl" />
      </div>
      <h1 className="capitalize ">{selectedUser?.fullName}</h1>
    </div>
  )
}

export default UserPro;
