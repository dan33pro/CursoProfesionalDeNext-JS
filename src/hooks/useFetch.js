import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch = (endPonit) => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const response = await axios.get(endPonit);
    setData(response.data);
  };

  useEffect(() => {
    try {
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return data;
};

export default useFetch;
