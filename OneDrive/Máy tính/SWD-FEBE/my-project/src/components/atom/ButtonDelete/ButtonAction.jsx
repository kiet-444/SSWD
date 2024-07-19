import React from "react";
import useAuth from "hook/useAuth";
import axios from "api/axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useRefresh } from "context/RefreshProvider";
export default function ButtonAction({ label, id, onDelete }) {
  const token = useAuth();
  const { refresh } = useRefresh();
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const endpoint =
    label === "Type" ? "producttype" : label === "Category" ? "category" : "";

  const fetchApi = async () => {
    try {
      const response = await axios.delete(`${endpoint}/${id}`, { headers });
  
      if (response?.data?.success) {
        toast.success(response?.data?.message);
        refresh();
        if (onDelete) onDelete(id); // Call the onDelete callback passed from parent component
      }
    } catch (error) {
      console.error("Failed to delete category", error);
      toast.error("Failed to delete category");
    }
  };

  const handleDelete = () => {
    fetchApi();    
  };

  return (
    <>
    <Link to={`${endpoint}/update/${id}`}>
      <button
        type="button"
        className="mb-2 rounded-lg bg-gradient-to-br from-[#00DBDE] to-[#FC00FF] px-3 py-1.5 text-center text-sm font-medium text-white me-2 hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-red-300 dark:focus:ring-red-800"
      >
        Update
      </button>
    </Link>
      <button
        type="button"
        className="mb-2 rounded-lg bg-gradient-to-r from-red-400 via-red-500 to-red-600 px-3 py-1.5 text-center text-sm font-medium text-white me-2 hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-red-300 dark:focus:ring-red-800"
        onClick={handleDelete}
      >
        Delete
      </button>
    </>
  );
}
