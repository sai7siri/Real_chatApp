import { useState } from "react"
import { startpoint } from "./apiStatrtPoint";


 export default function useSignIn(){

   const [loading , setLoading] = useState(false);

   const login =async ( data )=>{
      const url = `${startpoint}/api/v1/auth/login`;
      setLoading(true);
      try{
         const res = await fetch(url , {
            method : "POST",
            credentials : "include",
            headers : {
               "Content-Type" : "application/json"
            },
            body : JSON.stringify(data)
         });
         setLoading(false);
         const response = await res.json();
         return response;
      }catch(err){
         setLoading(false);
         return err;
      }

   }

   return {loading , login}
}
