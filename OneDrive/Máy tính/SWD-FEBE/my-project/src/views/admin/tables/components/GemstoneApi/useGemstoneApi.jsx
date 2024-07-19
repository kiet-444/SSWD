import { useEffect, useState } from 'react';
import useAuth from 'hook/useAuth';
import axios from 'api/axios'; // Adjust the import path if necessary
import { useRefresh } from 'context/RefreshProvider';
export const useGemstoneApi = () => {
  const [listGem, setListGem] = useState([]);
  const token = useAuth();
  const {shouldRefresh} = useRefresh();
  const fetchApi = async () => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const response = await axios.get('gemstone', { headers });
      if(response?.data?.success)
      setListGem(response?.data?.gemstones);

    } catch (error) {
      console.error('Failed to fetch gemstone data', error);
    }
  };

  useEffect(() => {
    Promise.all([fetchApi()]);
  }, [token,shouldRefresh]);

  return listGem;
};
