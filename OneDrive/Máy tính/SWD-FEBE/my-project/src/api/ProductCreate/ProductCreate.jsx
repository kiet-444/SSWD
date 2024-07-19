import useAuth from "hook/useAuth";
import axios from "api/axios"; // Adjust the import path if necessary
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const useProductCreateApi = () => {
  const token = useAuth();
  const navigate = useNavigate();

  const create = async (formData, label) => {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data", // Ensure the correct content type
    };

    // Log FormData entries before sending the request
    for (const pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    try {
      const endpoint = "products";
      if (endpoint) {
        const response = await axios.post(endpoint, formData, { headers });
        if (response?.data?.success) {
          toast.success(`Create ${label} Successfully`);
          navigate("/admin/nft-marketplace/");
        } else {
          toast.error(response?.data?.message);
        }
      } else {
        toast.error("Invalid label provided");
        console.error("Invalid label provided");
      }
    } catch (error) {
      toast.error(`Failed to create ${label?.toLowerCase()}`);
      console.error(`Failed to create ${label?.toLowerCase()}`, error);
    }
  };

  return create;
};
