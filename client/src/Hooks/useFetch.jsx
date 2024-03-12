import { useEffect, useState } from "react";
import axios from "axios";

export default function useFetch(url) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    const fetchData = async (url) => {
      try {
        const response = await axios.get(url);
        setData(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };
    fetchData(url);
  }, [url]);

  return { data, error, loading, setData };
}
