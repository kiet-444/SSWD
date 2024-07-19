import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000"; // Replace with your actual API URL

const api = axios.create({
  baseURL: API_URL,
});

const apiEndpoints = {
  getAllBrand: async () => {
    try {
      const response = await api.get("admin/brand/list");
      return response.data
    }
    catch (error) {
      console.error("Error fetching brand:", error);
      throw error;
    }

  },

  createBrand: async (newBrand) => {
    try {
      const formData = new FormData();
      formData.append("brandName", newBrand.brandName);
      const accessToken = localStorage.getItem("token");
      const response = await api.post("/admin/brand/create", formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error inserting book:", error);
      throw error;
    }

  },

  updateBrand: async (newBrand) => {
    console.log("Updating", newBrand)

    try {
      const formData = new FormData();
      formData.append("brandName", newBrand.brandName);
      const accessToken = localStorage.getItem("token");
      const response = await api.post(`/admin/brand/update/${newBrand._id}`, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    }
    catch (error) {
      console.error("Error inserting book:", error);
      throw error;
    }
  },

  deleteBrand: async (values) => {
    try {
      const accessToken = localStorage.getItem("token");
      const response = await api.delete(`/admin/brand/delete/${values}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return response;
    } catch (error) {
      console.error("Error deleting brand:", error);
      throw error;
    }
  },

  getAllUser: async () => {
    try {
      const accessToken = localStorage.getItem("token");
      const response = await api.get("admin/getMembers", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data
    }
    catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  },

  getAllWatch: async () => {
    try {
      const response = await api.get("admin/watch/list");
      return response.data
    }
    catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  }

};

export default apiEndpoints;
