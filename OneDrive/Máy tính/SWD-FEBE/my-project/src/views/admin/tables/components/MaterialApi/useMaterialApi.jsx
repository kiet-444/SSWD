import { useEffect, useState } from 'react';
import useAuth from 'hook/useAuth';
import axios from 'api/axios'; // Adjust the import path if necessary
import { useRefresh } from 'context/RefreshProvider';
export const useMaterialApi = () => {
  const [listMaterial, setListMaterial] = useState([]);
  const token = useAuth();
  const {shouldRefresh} = useRefresh();
  const fetchApi = async () => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const response = await axios.get('material', { headers });
     
      if(response.data.success)
        setListMaterial(response?.data?.materials);

    } catch (error) {
      console.error('Failed to fetch material data', error);
    }
  };

  useEffect(() => {
  fetchApi();
  }, [token,shouldRefresh]);

  return listMaterial;
};
