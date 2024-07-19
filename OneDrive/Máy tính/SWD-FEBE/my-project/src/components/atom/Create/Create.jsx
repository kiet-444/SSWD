import { useState } from "react";
import { Input, Typography } from "@material-tailwind/react";
import BackButton from "../BackButton/BackButton";
import Card from "components/card";
import { useCreateApi } from "api/CreateApi/CreateApi";
import { ToastContainer } from "react-toastify";
import { SelectDefault } from "../SelectOptions/SelectDefault";
import { useCategoryApi } from "views/admin/tables/components/CategoryApi/useCategoryApi";
import { useProccessFeeApi } from "views/admin/tables/components/ProccessFeeApi/useProccessFeeApi";
export default function Create({ label }) {
  const [name, setName] = useState("");
  const [pricePerGram, setpricePerGram] = useState("");
  const [priceOfGem, setpriceOfGem] = useState("");
  const [size, setSize] = useState("");
  const [categoryID, setCategoriesValue] = useState(""); // State to hold selected category ID
  const [description, setDescription] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [feeRate, setFee] = useState("");
  const create = useCreateApi();
  const showListCate = useCategoryApi();
  const showListFee = useProccessFeeApi();
  const [FeeValue, setFeeValue] = useState("");
  const handleCategorySelect = (categoryId) => {
    setCategoriesValue(categoryId); // Update selected category ID
  };

  const handleFeeSelect = (feeId) => {
    setFeeValue(feeId); // Update selected category ID
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    create(
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
                onChange={(e) => setName(e.target.value)}
              />
              {label !== "Category" && label !== "Processing Fee" ? (
                <>
                  <div className="-mb-3 flex items-center">
                    <Typography variant="h6" color="blue-gray" className="mr-1">
                      {label === "Type"
                        ? "Category"
                        : label === "stores"
                        ? "Phone"
                        : "Price"}
                    </Typography>
                    <Typography variant="h6" color="red">
                      *
                    </Typography>
                  </div>
                  {label === "Type" ? (
                    <SelectDefault
                      label={"CategoryInType"}
                      ListCate={showListCate}
                      onSelectCategory={handleCategorySelect}
                    />
                  ) : (
                    <Input
                      type={label === "Type" ? "text" : "number"}
                      size="lg"
                      className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                      onChange={
                        label === "stores"
                          ? (e) => setPhone(e.target.value)
                          : label === "Gemstone"
                          ? (e) => setpriceOfGem(e.target.value)
                          : (e) => setpricePerGram(e.target.value)
                      }
                    />
                  )}
                </>
              ) : label === "Processing Fee" ? (
                ""
              ) : (
                <>
                  <div
                    className={`-mb-3 flex items-center ${
                      label === "Category" ? "hidden" : ""
                    }`}
                  >
                    <Typography variant="h6" color="blue-gray" className="mr-1">
                      {label === "Type" ? "Category" : "Weight"}
                    </Typography>
                    <Typography variant="h6" color="red">
                      *
                    </Typography>
                  </div>
                </>
              )}

              {label === "Gemstone" && (
                <>
                  <div className="-mb-3 flex items-center">
                    <Typography variant="h6" color="blue-gray" className="mr-1">
                      Size
                    </Typography>
                    <Typography variant="h6" color="red">
                      *
                    </Typography>
                  </div>
                  <Input
                    type={label === "Type" ? "text" : "text"}
                    size="lg"
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
                  {label === "Type" || label === "Category"
                    ? "Description"
                    : label === "stores"
                    ? "Location"
                    : "Fee rate"}
                </Typography>
                <Typography variant="h6" color="red">
                  *
                </Typography>
              </div>
              {label === "Category" || label === "Type" ? (
                <div className="relative mb-3 h-[200px] rounded-md border-2 border-gray-900">
                  <textarea
                    className="bg-transparent peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary peer block min-h-full w-full rounded border-0 px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 motion-reduce:transition-none dark:text-white [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
                    placeholder="Enter description..."
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>
              ) : label === "Material" || label === "Gemstone" ? (
                <SelectDefault
                  label={"Material&Gemstone"}
                  ListFee={showListFee}
                  onSelectFee={handleFeeSelect}
                />
              ) : (
                <Input
                  type={label === "Processing Fee" ? "number" : ""}
                  size="lg"
                  step={label === "Processing Fee" ? "0.1" : ""}
                  className="!border-t-blue-gray-200 focus:!border-t-gray-900 "
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  onChange={
                    label === "stores"
                      ? (e) => setLocation(e.target.value)
                      : label === "Processing Fee"
                      ? (e) => setFee(e.target.value)
                      : (e) => setSize(e.target.value)
                  }
                />
              )}
              <button
                type="submit"
                className="z-50 rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 px-3 py-2.5 text-center text-sm font-medium text-white me-2 hover:bg-gradient-to-bl focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </Card>
      <ToastContainer autoClose={2000} />
    </>
  );
}
