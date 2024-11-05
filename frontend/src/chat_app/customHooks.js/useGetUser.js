import { useEffect, useState } from "react";
import { startpoint } from "./apiStatrtPoint";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuthContext } from "../Context/authUser";

export const useGetUsers = () => {
  const { authUser } = useAuthContext();

  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    setLoading(true);

    const url = `${startpoint}/api/v1/auth/users`;
    const token = sessionStorage.getItem('token'); // Get token from sessionStorage
  
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`, // Attach the token
        },
      });
  
        const {data} = await response.json(); 

        setUsers(data);

    } catch (err) {
      console.error('Something went wrong:', err); // Log any errors during fetch
    } finally {
      // Optional: Stop loading indicator
      setLoading(false); // Ensure loading state is updated
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return { loading, users };
};
