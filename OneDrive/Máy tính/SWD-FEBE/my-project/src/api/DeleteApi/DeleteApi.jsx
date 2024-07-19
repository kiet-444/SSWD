// src/functions/useDeleteData.js
import { useCallback } from "react";
import axios from "api/axios"; // Adjust the import path if necessary
import useAuth from "hook/useAuth";
import { toast } from "react-toastify";
import { useMaterialApi } from "views/admin/tables/components/MaterialApi/useMaterialApi";
import { useNavigate } from "react-router-dom";
import { useRefresh } from "context/RefreshProvider";
const useDeleteData = () => {
  const token = useAuth();
  const { refresh } = useRefresh();
  // var refreshList = useMaterialApi();
  const navigate = useNavigate();
  const deleteData = useCallback(
    async (selectedRow, endpoint, label) => {
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      try {
        const response = await Promise.all(
          selectedRow.map((id) =>
            axios.delete(`${endpoint}/${id}`, { headers })
          )
        );
        const allSuccess = response.every((res) => res?.data?.success);
        
        if (allSuccess) {
          console.log(refresh);
          refresh();
          return toast.success("Delete successfully");
        } else {
          return toast.error(`Delete Failed`);
        }
      } catch (error) {
        console.error("Failed to delete selected rows", error);
        return { success: false, error };
      }
    },
    [token, navigate]
  );

  return deleteData;
};

export default useDeleteData;
