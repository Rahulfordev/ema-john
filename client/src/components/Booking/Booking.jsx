import React, { useContext, useEffect, useState } from "react";
import axios from "axios"; // Import Axios
import { AuthContext } from "../providers/AuthProvider";
import useFetch from "../../Hooks/useFetch";

const Booking = () => {
  const { user } = useContext(AuthContext);
  const [booking, setBooking] = useState([]);
  console.log(booking.length);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/booking?email=` + user?.email,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          }
        );
        setBooking(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [user]);
  return (
    <div>
      {booking.map((book) => (
        <li key={book._id}>
          {book.displayName} from:
          {new Date(book.startDate).toLocaleDateString()} to:
          {new Date(book.endDate).toLocaleDateString()}
        </li>
      ))}
    </div>
  );
};

export default Booking;
