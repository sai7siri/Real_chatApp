import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./authUser";
import {io} from "socket.io-client";
import {startpoint} from "../customHooks.js/apiStatrtPoint"

const SocketContext = createContext();

export const useSocketContext=()=>{
   return useContext(SocketContext);
}

export const SocketContextProvider=({children})=>{
   const [socket , setSocket] = useState(null);
   const [onlineUser , setOnlineUser] = useState([]);
   const {authUser} = useAuthContext();
   
   useEffect(()=>{
         if(authUser){
            const socket = io(`${startpoint}` , {
               credentials : true,
               query : {
                  userId : authUser?._id
               }
            });
            setSocket(socket);
            socket.on("getOnlineUsers" , (user)=>{
               setOnlineUser(user)
            });

            socket.on("disconnect", () => {
                setOnlineUser((prev) =>
                 prev.filter((id) => id !== authUser._id)
               );
             });

            return ()=> socket.close();

         } else {
            if(socket){
               socket.close();
               setSocket(null);

            }
         }
   }, [authUser])

   return <SocketContext.Provider value={{ socket , onlineUser }}>{children}</SocketContext.Provider>
}