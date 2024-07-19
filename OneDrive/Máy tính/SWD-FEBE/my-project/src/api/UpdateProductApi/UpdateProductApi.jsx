import useAuth from "hook/useAuth";
import axios from "api/axios"; // Adjust the import path if necessary
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const useUpdateProductApi = () => {
  const token = useAuth();
  const navigate = useNavigate();

  const update = async (formData, label, productId) => {
    const headers = {
      Authorization: `Bearer ${token}`,
   
    };
console.log(formData);
    try {
      const response = await axios.put(`products/${productId}`, formData, { headers });
      if (response?.data?.success) {
        toast.success(`Update ${label} Successfully`);
        // navigate("/admin/nft-marketplace/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(`Failed to update ${label.toLowerCase()}`);
      console.error(`Failed to update ${label.toLowerCase()}`, error);
    }
  };

  return update;
};
