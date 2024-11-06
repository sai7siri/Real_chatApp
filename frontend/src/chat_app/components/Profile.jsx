import { useAuthContext } from "../Context/authUser";
import { useSocketContext } from "../Context/socket";
import { useGetUsers } from "../customHooks.js/useGetUser";
import useConversation from "../zustand/useConversation";

function Profile({ search }) {
  const { users, loading } = useGetUsers();
  const { setSelectedUser , selectedUser } = useConversation();
  const { authUser } = useAuthContext();
  const {onlineUser} = useSocketContext();

  const filtered =
  users.length > 0 &&
  users.filter((person) => person.fullName.toLowerCase().includes(search));
  
  
  const handleSelectedUser = (person) => {
    setSelectedUser(person);
  };
    


  return (
    <div className="overflow-auto">
      {!loading ? (
        filtered && filtered.length > 0 ? (
          filtered.map((item, idx) => {
            const isOnline = onlineUser.includes(item._id)
            return (

            <div onClick={() => handleSelectedUser(item)} key={idx}>
              <div
                className={`flex items-center gap-3 p-2 text-white hover:bg-gray-800 hover:text-white rounded-md ${selectedUser && selectedUser._id === item._id ? "bg-gray-800 rounded-md text-white" : ""}`}
              >
                <div className={`${isOnline ? "online" : "offline"} w-12 avatar`}>
                  <img src={item?.profile} alt="" className="bg-cover w-full rounded-full" />
                </div>
                <span className="capitalize font-mono">{item?.fullName}</span>
              </div>
              <div className={`divider py-0 my-0 `}></div>
            </div>
            )
})
        ) : (
          <p className="text-white text-center">No Contacts 🧐</p>
        )
      ) : (
        <div className="loading loading-spinner"></div>
      )}
    </div>
  );
}

export default Profile;
