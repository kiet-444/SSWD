import useAuth from "hook/useAuth";
import axios from "api/axios"; // Adjust the import path if necessary
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const useCreateApi = () => {
  const token = useAuth();
  const navigate = useNavigate();

  const create = async (
    name,
    feeRate,
    size,
    priceOfGem,
    pricePerGram,
    phone,
    location,
    categoryID,
    FeeValue,
    label,
    description
  ) => {
    const param = {
      name,
      feeRate,
      size,
      priceOfGem,
      pricePerGram,
      phone,
      location,
      categoryID,
      processingFeeId : FeeValue,
      description,
    };
    const headers = { Authorization: `Bearer ${token}` };

    try {
      const endpoint =
        label === "Material"
          ? "material"
          : label === "Gemstone"
          ? "gemstone"
          : label === "Category"
          ? "category"
          : label === "Type"
          ? "producttype"
          : label === "stores"
          ? "stores"
          : label === "Processing Fee"
          ? "processingFee"
          : ""
        console.log(param);
      if (endpoint) {
        const response = await axios.post(endpoint, param, { headers });
        if (response?.data?.success) {
            
          toast.success(`Create ${label} Successfully`);
          if(label === "stores"){
            navigate("/admin/stores/");
          }else if ( label === "Processing Fee"){
            navigate("/admin/fee/");
          }
          else{
            navigate("/admin/data-tables/");
          }
        } else {
          toast.error(response?.data?.message);
        }
      } else {
        toast.error("Invalid label provided");
        console.error("Invalid label provided");
      }
    } catch (error) {
      toast.error(`Failed to create ${label.toLowerCase()}`);
      console.error(`Failed to create ${label.toLowerCase()}`, error);
    }
  };

  return create;
};
