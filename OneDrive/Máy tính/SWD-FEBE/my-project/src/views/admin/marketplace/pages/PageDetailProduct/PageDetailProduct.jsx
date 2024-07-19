import React, { useEffect, useState } from "react";
import Card from "components/card";
import FormProductInfo from "components/atom/FormProductInfo/FormProductInfo";
import FormProductDes from "components/atom/FormProductDes/FormProductDes";
import FormComponent from "components/atom/FormComponent/FormComponent";
import BackButton from "components/atom/BackButton/BackButton";
import { Button } from "@material-tailwind/react";
import { MdFileUpload } from "react-icons/md";
import { useParams } from "react-router-dom";
import axios from "api/axios";
import useAuth from "hook/useAuth";
import Description from "components/atom/Description/Description";
import { FaRegEdit } from "react-icons/fa";
import { useMaterialApi } from "views/admin/tables/components/MaterialApi/useMaterialApi";
import { useProducTypeApi } from "views/admin/tables/components/ProductTypeApi/useProductTypeApi";
import { useGemstoneApi } from "views/admin/tables/components/GemstoneApi/useGemstoneApi";
import { useUpdateProductApi } from "api/UpdateProductApi/UpdateProductApi";
import { useUploadProductImageApi } from "api/UpdateProductApi/UpdateImgApi";
import { ToastContainer } from "react-toastify";
import { useRefresh } from "context/RefreshProvider";
export default function PageDetailProduct({ label }) {
  const token = useAuth();
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const { productId } = useParams();
  const [List, setList] = useState();
  const ListMaterial = useMaterialApi();
  const ListGem = useGemstoneApi();
  const ListType = useProducTypeApi();
  const [hover, setHover] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editImage, setEditImage] = useState(false);
  const [imageFiles, setImageFiles] = useState([]); // State for image files
  const updateProduct = useUpdateProductApi();
  const uploadImages = useUploadProductImageApi();
  const { shouldRefresh } = useRefresh();
  const [previewImages, setPreviewImages] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    size: "",
    weight: "",
    description: "",
    color: "",
    quantity: "",
    materialID: "",
    gemstoneID: "",
    productTypeID: "",
    materialWeight: "",
  });
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(files);

    // Create preview URLs for the selected images
    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages(previews);

    // Upload images immediately
    handlefetchImageUpload(files);
  };

  const handleUpload = () => {
    setEdit(false);
    setEditImage(!editImage);
  };
  const handlefetchImageUpload = async (files) => {
    try {
      await uploadImages(productId, files);
      // Refresh the product data to get the updated image list
      
    } catch (error) {
      console.error("Error uploading images:", error);
    }finally{      
      await fetchApi();
      setEditImage(!editImage)
    }
  };
  const fetchApi = async () => {
    try {
      const response = await axios.get(`products/${productId}`, { headers });
      if (response?.data?.success) {
        console.log(response?.data?.product);
        setList(response?.data?.product);
        setFormData({
          name: response.data.product.name,
          size: response.data.product.size,
          weight: response.data.product.weight,
          description: response.data.product.description,
          color: response.data.product.color,
          quantity: response.data.product.quantity,
          materialID: response.data.product.materialID,
          gemstoneID: response.data.product.gemstoneID,
          productTypeID: response.data.product.productTypeID,
          materialWeight: response.data.product.materialWeight,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(formData);
  const handleEdit = () => {
    setEditImage(false);
    setEdit(!edit);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate =async () => {
    const data = formData; // Assuming formData is already a FormData object
    await updateProduct(data, label, productId);
    setEdit(!edit)
    await fetchApi();
  };

  useEffect(() => {
    fetchApi();
  }, [shouldRefresh]);

  const buttons = [
    {
      name: edit ? "Update information" : "Update Image",
      handle: edit ? handleUpdate : handlefetchImageUpload,
    },
    { name: "Cancel", handle: handleEdit },
  ];

  return (
    <div className="flex w-full flex-col gap-5">
      <div className="flex justify-between">
        <BackButton extra={`mt-2 ml-2`} />
        <div className="flex">
          <button
            type="button"
            className="mt-3 flex rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 px-5 py-2.5 text-center text-sm font-medium text-white me-2 hover:bg-gradient-to-bl focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 "
            onClick={handleEdit}
          >
            <FaRegEdit className="cursor-pointer text-2xl text-gray-600" />
            <p className="text-md text-black-900 mt-1 text-center">
              Edit information
            </p>
          </button>
          <button
            type="button"
            className="mt-3 flex rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 px-5 py-2.5 text-center text-sm font-medium text-white me-2 hover:bg-gradient-to-bl focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 "
            onClick={handleUpload}
          >
            <FaRegEdit className="cursor-pointer text-2xl text-gray-600" />
            <p className="text-md text-black-900 mt-1 text-center">
              Edit Image
            </p>
          </button>
        </div>
      </div>
      <div className="mt-3 flex w-full w-full flex-col gap-5 lg:grid lg:grid-cols-9">
        <div className="z-0 col-span-3 h-full lg:!mb-0">
          <Card extra={"h-full p-4"}>
            <div
              className="relative col-span-5 h-full w-full rounded-xl bg-lightPrimary dark:!bg-navy-700 2xl:col-span-6"
              onMouseEnter={editImage ?  () => setHover(true) : ""}
              onMouseLeave={editImage ? () => setHover(false) : ""}
            >
              <label className="relative flex h-full w-full cursor-pointer flex-col items-center rounded-xl border-[2px] border-dashed border-gray-200 dark:!border-navy-700 lg:pb-0">
                <img
                  src={previewImages[0] || List?.imageIDs[0]?.imageLink}
                  className="mb-3 h-[305.438px] w-[321.513px] rounded-xl object-cover 3xl:h-full 3xl:w-full"
                  alt=""
                />
                <div className="flex gap-4">
                  {(previewImages.length > 1 ? previewImages : List?.imageIDs)
                    ?.slice(1, 3)
                    ?.map((image, index) => (
                      <img
                        key={index}
                        src={
                          typeof image === "string" ? image : image?.imageLink
                        }
                        className="mb-3 h-[110.175px] w-full rounded-xl border border-gray-200 object-cover shadow-lg 3xl:h-full 3xl:w-full"
                        alt=""
                      />
                    ))}
                  {previewImages.length <= 1 &&
                    (!List?.imageIDs || List.imageIDs.length <= 1) && (
                      <>
                        <div className="flex h-[90px] w-[90px] flex-col items-center rounded-xl border-[2px] border-dashed border-gray-200 bg-white py-[100px] px-[65px] dark:!border-navy-700 lg:pb-0"></div>
                        <div className="flex h-full w-full flex-col items-center rounded-xl border-[2px] border-dashed border-gray-200 bg-white py-[100px] px-[65px] dark:!border-navy-700 lg:pb-0"></div>
                      </>
                    )}
                </div>
                {hover && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center rounded-xl bg-gray-50 bg-opacity-50">
                    <MdFileUpload className="text-[80px] text-brand-500 dark:text-white" />
                    <h4 className="text-xl font-bold text-brand-500 dark:text-white">
                      Upload Files
                    </h4>
                    <p className="mt-2 text-sm font-medium text-gray-600">
                      PNG, JPG and GIF files are allowed
                    </p>
                    <input
                      type="file"
                      multiple
                      onChange={handleImageUpload}
                      className="absolute inset-0 cursor-pointer opacity-0"
                    />
                  </div>
                )}
              </label>
            </div>
          </Card>
        </div>
        <div className="z-0 col-span-9 lg:!mb-0">
          <FormProductInfo
            formData={edit ? formData : ""}
            setFormData={setFormData}
            ListType={edit ? ListType : ""}
            data={List}
            edit={edit}
            handleInputChange={handleInputChange}
          />
        </div>
        <div className="z-0 col-span-12 lg:!mb-0">
          <FormProductDes
            formData={edit ? formData : ""}
            setFormData={setFormData}
            label={"pagedetail"}
            data={List}
            edit={edit}
            handleInputChange={handleInputChange}
          />
        </div>
        <div className="z-0 col-span-12 lg:!mb-0">
          <FormComponent
            formData={edit ? formData : ""}
            setFormData={setFormData}
            ListMaterial={edit ? ListMaterial : ""}
            ListGemstone={edit ? ListGem : ""}
            data={List}
            label={"ProductDetail"}
            edit={edit}
            handleInputChange={handleInputChange}
          />
        </div>
        <div className="z-0 col-span-12 lg:!mb-0">
          <Description
            formData={edit ? formData : ""}
            setFormData={setFormData}
            handleInputChange={handleInputChange}
            data={List}
            edit={edit}
          />
        </div>
      </div>
      {edit && (
        <div className="float-right mt-3 flex flex-wrap justify-end gap-4 text-right">
          {buttons.map((item, index) => (
            <Button
              key={index}
              className={
                item.name === "Update information"
                  ? "w-auto"
                  : "inline-gray-400 w-auto bg-white text-gray-400 outline"
              }
              onClick={item.handle}
            >
              {item.name}
            </Button>
          ))}
        </div>
      )}
      {editImage && (
        <div className="float-right mt-3 flex flex-wrap justify-end gap-4 text-right">
          {buttons.map((item, index) => (
            <Button
              key={index}
              className={
                item.name === "Update Image"
                  ? "w-auto"
                  : "inline-gray-400 w-auto bg-white text-gray-400 outline"
              }
              onClick={item.handle}
            >
              {item.name}
            </Button>
          ))}
        </div>
      )}
       <ToastContainer autoClose={2000} />
    </div>
    
  );
}
