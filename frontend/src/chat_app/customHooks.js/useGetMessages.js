import { useEffect, useState } from "react"
import { startpoint } from "./apiStatrtPoint";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";


export const useGetMessages=()=>{
   const [loading , setLoading] = useState(false);

   const { setMessages , selectedUser } = useConversation();

   const getMessages = async ()=>{
      
      if(!selectedUser) return;
      setLoading(true);
      const url = `${startpoint}/api/v2/chat/getmsg/${selectedUser?._id}`
      try{
         const res = await fetch(url , {
            method : "GET",
            credentials : "include",
            headers : {
               "Content-Type" : "application/json",
               "Authorization" : `${sessionStorage.getItem('token')}`
            },
         });

         if(!res.ok) throw new Error("failed to fetch messages");
         const result = await res.json();

         setMessages(result.messages);

      }catch(err){
         toast.error("something went wrong")
      }finally{
         setLoading(false);
      }
   }

   useEffect(()=>{
      getMessages();
   } , [selectedUser]);

   return{ loading }
}