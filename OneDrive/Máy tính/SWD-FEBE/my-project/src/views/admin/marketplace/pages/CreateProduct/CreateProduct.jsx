import React, { useState } from "react";
import Card from "components/card";
import FormProductInfo from "components/atom/FormProductInfo/FormProductInfo";
import FormProductDes from "components/atom/FormProductDes/FormProductDes";
import FormComponent from "components/atom/FormComponent/FormComponent";
import BackButton from "components/atom/BackButton/BackButton";
import { Button } from "@material-tailwind/react";
import { MdFileUpload } from "react-icons/md";
import { useProductCreateApi } from "api/ProductCreate/ProductCreate";
import { FaChevronDown } from "react-icons/fa";
import { useProducTypeApi } from "views/admin/tables/components/ProductTypeApi/useProductTypeApi";
import { useGemstoneApi } from "views/admin/tables/components/GemstoneApi/useGemstoneApi";
import { useMaterialApi } from "views/admin/tables/components/MaterialApi/useMaterialApi";
import Description from "components/atom/Description/Description";
export default function CreateProduct({ label }) {
  const ListType = useProducTypeApi();
  const ListMaterial = useMaterialApi();
  const ListGemstone = useGemstoneApi();
  const create = useProductCreateApi();
  const [formData, setFormData] = useState({
    name: "",
    images: [],
    color: "",
    weight: "",
    price: "",
    size: "",
    quantity: "",
    gemstoneID: "",
    productTypeID: "",
    materialWeight:"",
    description: "",
    materialID: "",
  });

  const [imagePreviews, setImagePreviews] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData();
    for (const key in formData) {
      if (key === "images") {
        formData[key].forEach((file, index) => {
          form.append("images", file); // Correctly appending image files
          console.log(`Appending file: ${file.name}`);
        });
      } else {
        form.append(key, formData[key]);
      }
    }

    // Log FormData entries
    for (const pair of form.entries()) {
      console.log(pair[0], pair[1]);
    }

    create(form, label);
  };
console.log(formData);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, images: files });

    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const button = [
    { name: "Submit" },
    { name: "Submit & Add more product" },
    { name: "Cancel" },
  ];

  return (
    <div className="flex w-full flex-col gap-5">
      <BackButton extra={`mt-2 ml-2`} />
      <form onSubmit={handleSubmit}>
        <div className="mt-3 flex w-full flex-col gap-5 lg:grid lg:grid-cols-9">
          <div className="z-0 col-span-3 h-full lg:!mb-0">
            <Card extra={"h-full p-4"}>
              <div className="col-span-5 h-full w-full rounded-xl bg-lightPrimary dark:!bg-navy-700 2xl:col-span-6">
                <label className="flex h-full w-full flex-col items-center justify-center rounded-xl border-[2px] border-dashed border-gray-200 py-3 dark:!border-navy-700 lg:pb-0">
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
                    className="hidden"
                    onChange={handleImageChange}
                    required
                  />
                </label>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {imagePreviews.map((src, index) => (
                  <div key={index} className="relative">
                    <img
                      src={src}
                      alt={`preview ${index}`}
                      className="h-32 w-32 object-cover"
                    />
                  </div>
                ))}
              </div>
            </Card>
          </div>
          <div className="z-0 col-span-9 lg:!mb-0">
            <FormProductInfo
              ListType={ListType}
              formData={formData}
              handleInputChange={handleInputChange}
              setFormData={setFormData}
            />
          </div>
          <div className="z-0 col-span-12 lg:!mb-0">
            <FormProductDes
              formData={formData}
              handleInputChange={handleInputChange}
            />
          </div>
          <div className="z-0 col-span-12 lg:!mb-0">
            <FormComponent
              formData={formData}
              handleInputChange={handleInputChange}
              ListMaterial={ListMaterial}
              ListGemstone={ListGemstone}
              setFormData={setFormData}
            />
          </div>
          <div className="z-0 col-span-12 lg:!mb-0">
           <Description  formData={formData}
              handleInputChange={handleInputChange}
              setFormData={setFormData}/>
          </div>
        </div>
        <div className="float-right mt-3 flex flex-wrap justify-end gap-4 text-right">
          {button.map((item, index) => (
            <Button
              type="submit"
              key={index}
              className={
                item.name === "Submit"
                  ? "w-auto"
                  : "inline-gray-400 w-auto bg-white text-gray-400 outline"
              }
            >
              {item.name}
            </Button>
          ))}
        </div>
      </form>
    </div>
  );
}
