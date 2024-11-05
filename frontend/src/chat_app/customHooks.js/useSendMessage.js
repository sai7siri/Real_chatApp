import toast from "react-hot-toast"
import { startpoint } from "./apiStatrtPoint"
import useConversation from "../zustand/useConversation"


export const useSendMessage=()=>{
   const { selectedUser ,setMessages, messages} = useConversation();

   const sendMessage = async ( data )=>{
      const url = `${startpoint}/api/v2/chat/send/${selectedUser?._id}`
      try{
         const res = await fetch(url , {
            method : "POST",
            credentials : "include",
            headers : {
               "Content-Type" : "application/json",
               "Authorization" : `${sessionStorage.getItem('token')}`
            },
            body : JSON.stringify( data ) 
         });
        
      if (!res.ok) {
         throw new Error("Failed to send message");
       }
 
       const result = await res.json();
       
   // const newMessages = messages &&  messages?.length >= 0 ? [...messages, result] : result;
   const newMessages = messages?.length > 0 ? [...messages, result] : [result];
       setMessages(newMessages);

      }catch(err){
         console.log(err);
         toast.error("something went wrong ")
      }
   }

   return {sendMessage}
}