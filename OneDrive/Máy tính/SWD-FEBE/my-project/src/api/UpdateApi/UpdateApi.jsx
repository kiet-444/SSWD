import useAuth from "hook/useAuth";
import axios from "api/axios"; // Adjust the import path if necessary
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export const useUpdateApi = () => {
  const token = useAuth();
  const navigate = useNavigate();

  const update = async (
    name,
    FeeValue,
    phone,
    address,
    description,
    categoryID,
    priceOfGem,
    pricePerGram,
    size,
    updateId,
    feeRate,
    label
  ) => {
    const param = {
      name,
      processingFeeId: FeeValue,
      phone,
      address,
      description,
      categoryID,
      priceOfGem,
      pricePerGram,
      feeRate,
      size,
    };
    const headers = { Authorization: `Bearer ${token}` };
    console.log(label);
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
          : label === "customers"
          ? "customers"
          : label === "Processing Fee"
          ? "processingFee"
          : "";
      if (endpoint) {
        const response = await axios.put(`${endpoint}/${updateId}`, param, {
          headers,
        });
        console.log(response.data);
        if (response.data.success) {
          toast.success(`Update ${label} Successfully`);
          if(label==="customers"){
            navigate("/admin/customers/");
          }else
          if(label==="Processing Fee"){
            navigate("/admin/fee/");
          }else
          navigate("/admin/data-tables/");
        }
      } else {
        toast.error(`Update ${label} failed`);
        console.error("Invalid label provided");
      }
    } catch (error) {
      toast.error(`Failed to update ${label.toLowerCase()}`);
      console.error(`Failed to update ${label.toLowerCase()}`, error);
      navigate("/admin/data-tables/");
    }
  };

  return update;
};
