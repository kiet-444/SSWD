import useAuth from "hook/useAuth";
import axios from "api/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const useUploadProductImageApi = () => {
  const token = useAuth();
  const navigate = useNavigate();

  const uploadImages = async (productId, imageFiles) => {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    };

    const formData = new FormData();
    imageFiles.forEach((file) => {
      formData.append("images", file);
    });

    try {
      const response = await axios.put(
        `products/${productId}/images`,
        formData,
        { headers }
      );
      if (response?.data?.success) {
        
        toast.success("Images uploaded successfully");
        // navigate("/admin/nft-marketplace/");
        // Optionally, navigate to another page after successful upload
        // navigate("/admin/nft-marketplace/");
      } else {
        toast.error(response?.data?.message || "Failed to upload images");
      }
    } catch (error) {
      toast.error("Failed to upload images");
      console.error("Failed to upload images", error);
    }
  };

  return uploadImages;
};
