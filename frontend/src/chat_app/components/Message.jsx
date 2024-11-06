import { useEffect, useRef } from "react";
import { useAuthContext } from "../Context/authUser";
import useConversation from "../zustand/useConversation";

const Message = ({ data}) => {

  const scrollRef = useRef();
  const {authUser} = useAuthContext();
  const {selectedUser , messages} = useConversation();


  const converted =(time)=>{
    const date = new Date(time);
    const options = {
      hour : "2-digit",
      minute : "2-digit",
      hour12 : true
    }
    return date.toLocaleTimeString(undefined , options);
  }

  useEffect(()=>{
    scrollRef?.current?.scrollIntoView({behavior : "smooth"})
  } , [messages]);


  return (
    <>
      <div ref={scrollRef} className={`chat ${authUser?._id === data?.senderId ? "chat-end" : "chat-start" }`}>
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Profile"
              src={ authUser?._id === data?.senderId ? authUser?.profile : selectedUser?.profile }
            />
          </div>
        </div>
        <div className="chat-bubble">{data?.message}</div>
        <div className="chat-footer opacity-50 text-slate-100 font-medium ">{converted(data?.createdAt)}</div>
      </div>
    </>
  );
};

export default Message;
