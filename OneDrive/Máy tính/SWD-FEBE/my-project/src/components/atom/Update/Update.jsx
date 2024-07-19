import { useState, useEffect } from "react";
import { Input, Typography } from "@material-tailwind/react";
import BackButton from "../BackButton/BackButton";
import Card from "components/card";
import { useUpdateApi } from "api/UpdateApi/UpdateApi";
import { useParams } from "react-router-dom";
import axios from "api/axios";
import useAuth from "hook/useAuth";
import { ToastContainer } from "react-toastify";
import { SelectDefault } from "../SelectOptions/SelectDefault";
import { useCategoryApi } from "views/admin/tables/components/CategoryApi/useCategoryApi";
import { useProccessFeeApi } from "views/admin/tables/components/ProccessFeeApi/useProccessFeeApi";
export default function Update({ label, valueCateSgory }) {
  const [name, setName] = useState("");
  const [pricePerGram, setpricePerGram] = useState("");
  const [priceOfGem, setpriceOfGem] = useState("");
  const [size, setSize] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [FeeValue, setFeeValue] = useState("");
  const [categoryID, setCategoriesValue] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [address,setAddress] = useState("");
  const [FeeRate,setFeeRate] = useState("");
  const listCate = useCategoryApi();
  const update = useUpdateApi();
  const showListFee = useProccessFeeApi();
  const { updateId } = useParams();
  const token = useAuth();
  const [itemDetail, setItemDetail] = useState({});

  const handleFeeSelect = (feeId) => {
    setFeeValue(feeId); // Update selected category ID
  };

  const fetchApiId = async () => {
    const endpoint = label === "Type" ? "producttype" :  label === "Processing Fee" ? "processingFee" : label.toLowerCase();
    const headers = { Authorization: `Bearer ${token}` };
    try {
      
      const response = await axios.get(`${endpoint}/${updateId}`, { headers });
      if (response?.data?.success) {
        const detail =
          label === "Type"
            ? response?.data?.productType
            : label === "stores"
            ? response?.data?.store
            : label === "customers"
            ? response?.data?.customer
            : label === "Processing Fee"
            ? response?.data?.fee
            : response?.data?.[label.toLowerCase()];

        setItemDetail(detail);
        setName(detail.name || "");
        setFeeRate(detail.feeRate || "");
        setpricePerGram(detail.pricePerGram || "");
        setpriceOfGem(detail.priceOfGem || "");
        setSize(detail.size || "");
        setDescription(detail.description || "");
        setCategory(detail.categoryID || "");
        setAddress(detail.address)
        setFeeValue(detail.processingFeeId);
        setPhone(detail.phone || "");
        setLocation(detail.location || "");
      }
    } catch (error) {
      console.error(`Failed to fetch ${label} details`, error);
    }
  };
 
  useEffect(() => {
    fetchApiId();
  }, []);

  const handleCategorySelect = (categoryId) => {
    setCategoriesValue(categoryId); // Update selected category ID
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    update(
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
      FeeRate,
      label
    );
  };

  return (
    <>
      <Card className="mx-auto mt-8 w-fit rounded-3xl bg-white py-5 px-5 shadow-md">
        <div color="transparent">
          <div className="flex justify-between">
            <Typography variant="h4" color="blue-gray" className="w-fit">
              {label}
            </Typography>
            <BackButton />
          </div>
          <form
            className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
            onSubmit={handleSubmit}
          >
            <div className="mb-1 flex flex-col gap-6">
              <div className="-mb-3 flex items-center">
                <Typography variant="h6" color="blue-gray" className="mr-1">
                  Name
                </Typography>
                <Typography variant="h6" color="red">
                  *
                </Typography>
              </div>
              <Input
                size="lg"
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {label === "Category" ? (
                <div className="relative mb-3 h-[200px] rounded-md border-2 border-gray-900">
                  <textarea
                    value={description}
                    className="bg-transparent peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary peer block min-h-full w-full rounded border-0 px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 motion-reduce:transition-none dark:text-white [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
                    placeholder="Enter description..."
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              ) : label === "Type" ? (
                <>
                  <div className="-mb-3 flex items-center">
                    <Typography variant="h6" color="blue-gray" className="mr-1">
                      {label === "Type" ? "Category" : "Weight"}
                    </Typography>
                    <Typography variant="h6" color="red">
                      *
                    </Typography>
                  </div>
                  <SelectDefault
                    label={"CategoryInType"}
                    defaultValue={category}
                    ListCate={listCate}
                    onSelectCategory={handleCategorySelect}
                  />
                  <div className="relative mb-3 h-[200px] rounded-md border-2 border-gray-900">
                    <textarea
                      value={description}
                      className="bg-transparent peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary peer block min-h-full w-full rounded border-0 px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 motion-reduce:transition-none dark:text-white [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
                      placeholder="Enter description..."
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                </>
              ) : (            
                <>
                {label === "Processing Fee" ? "" : 
                <>
                  <div className="-mb-3 flex items-center">
                    <Typography variant="h6" color="blue-gray" className="mr-1">
                      {label === "Type"
                        ? "Category"
                        : label === "stores" || label === "customers"
                        ? "Phone"
                        : "Price"}
                    </Typography>
                    <Typography variant="h6" color="red">
                      *
                    </Typography>
                  </div>
                  <Input
                    type="number"
                    size="lg"
                    className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    value={
                      label === "stores" || label === "customers" 
                        ? phone
                        : label === "Material"
                        ? pricePerGram
                        : priceOfGem
                    }
                    onChange={
                      label === "stores" || label === "customers" 
                        ? (e) => setPhone(e.target.value)
                        : label === "Material"
                        ? (e) => setpricePerGram(e.target.value)
                        : (e) => setpriceOfGem(e.target.value)
                    }
                  />
                  </>
                  }
                  {label === "Gemstone" && (
                    <>
                      <div className="-mb-3 flex items-center">
                        <Typography
                          variant="h6"
                          color="blue-gray"
                          className="mr-1"
                        >
                          Size
                        </Typography>
                        <Typography variant="h6" color="red">
                          *
                        </Typography>
                      </div>
                      <Input
                        type={"text"}
                        size="lg"
                        value={size}
                        className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                        onChange={(e) => setSize(e.target.value)}
                      />
                    </>
                  )}

                  <div className="-mb-3 flex items-center">
                    <Typography variant="h6" color="blue-gray" className="mr-1">
                      {label === "Type"
                        ? "Description"
                        : label === "stores"
                        ? "Location"
                        : label === "customers"
                        ? "Address"
                        : "Fee"}
                    </Typography>
                    <Typography variant="h6" color="red">
                      *
                    </Typography>
                  </div>
                  {label === "Material" || label === "Gemstone" ? (
                    <SelectDefault
                      label={"Material&Gemstone"}
                      ListFee={showListFee}
                      defaultValue={FeeValue}
                      onSelectFee={handleFeeSelect}
                    />
                  ) : (
                    <Input
                      size="lg"
                      className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                      value={label === "stores" ? location : label === "customers" ? address : label === "Processing Fee" ? FeeRate: size}
                      onChange={
                        label === "stores"
                          ? (e) => setLocation(e.target.value) :
                        label === "customers"
                          ? (e) => setAddress(e.target.value) :
                        label === "Processing Fee"
                          ? (e) => setFeeRate(e.target.value)
                          : (e) => setSize(e.target.value)
                      }
                    />
                  )}
                </>
              )}
              <button
                type="submit"
                className="z-50 rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 px-3 py-2.5 text-center text-sm font-medium text-white me-2 hover:bg-gradient-to-bl focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </Card>
    </>
  );
}
