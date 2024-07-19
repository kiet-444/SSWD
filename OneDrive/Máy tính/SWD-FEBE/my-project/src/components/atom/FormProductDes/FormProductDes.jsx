import React from "react";
import Card from "components/card";
import { FaChevronDown } from "react-icons/fa";
import { SelectDefault } from "../SelectOptions/SelectDefault";
export default function FormProductDes({ data, formData,setFormData ,handleInputChange,edit,label }) {
  const productinfo = data;
  return (
    <Card
      extra={`p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400`}
    >
      <div className="border-slate-200/60 rounded-md rounded-[10px] border border p-5 p-5">
        <div className="border-slate-200/60 flex w-full border-b-4 p-5 text-center">
          <div className="my-auto">
            <FaChevronDown />
          </div>
          <div className="pl-2">Variant Information</div>
        </div>
        <div className="mt-5">
          <div class="mb-5">
            <div className="mt-3 flex w-full w-full  flex-col gap-10 lg:grid lg:grid-cols-12">
              <div className="z-0 col-span-4 lg:!mb-0">
                <div className="flex items-center">
                  <label class="mb-1 block text-center text-sm font-medium text-gray-900 dark:text-white">
                    Product Weight
                  </label>
                  <div className="bg-slate-200 ml-2 rounded-md border bg-gray-200 px-2 py-0.5	 text-xs text-gray-600">
                    Required
                  </div>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-gray-700">
                  Enter the weight by weighing the product after it is packaged
                  .
                </p>
              </div>
              <div className="z-0 col-span-8 lg:!mb-0">
                <div className="grid-cols-4 gap-1 sm:grid">
                  {/* <SelectDefault label={"Weight"} /> */}
                  <input
                    type="number"
                    name="weight"
                    value={formData ? formData.weight : productinfo?.weight}
                    onChange={handleInputChange}
                    className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    placeholder="123456789"
                    required
                   
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="mb-5">
            <div className="mt-3 flex w-full w-full  flex-col gap-10 lg:grid lg:grid-cols-12">
              <div className="z-0 col-span-4 lg:!mb-0">
                <div className="flex items-center">
                  <label class="mb-1 block text-center text-sm font-medium text-gray-900 dark:text-white">
                    Product Size
                  </label>
                  <div className="bg-slate-200 ml-2 rounded-md border bg-gray-200 px-2 py-0.5	 text-xs text-gray-600">
                    Required
                  </div>
                </div>
              </div>
              <div className="col-span-8 lg:!mb-0">
                <div className="flex">
                  <input
                    type="number"
                    name="size"
                    value={formData ? formData.size : productinfo?.size}
                    onChange={handleInputChange}
                    className="dark:shadow-sm-light w-1.5/6 block rounded-sm border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    placeholder="123456789"
                    required
                   
                  />
                  <div className="border-slate-200 dark:bg-darkmode-900/20 dark:border-darkmode-900/20 dark:text-slate-400 [&:not(:first-child)]:border-l-transparent rounded-none border bg-gray-300 py-2 px-3 text-gray-700 shadow-sm first:rounded-l last:rounded-r">
                    mm
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="mb-5">
            <div className="mt-3 flex w-full w-full  flex-col gap-10 lg:grid lg:grid-cols-12">
              <div className="z-0 col-span-4 lg:!mb-0">
                <div className="flex items-center">
                  <label class="mb-1 block text-center text-sm font-medium text-gray-900 dark:text-white">
                    Product Color
                  </label>
                  <div className="bg-slate-200 ml-2 rounded-md border bg-gray-200 px-2 py-0.5	 text-xs text-gray-600">
                    Required
                  </div>
                </div>
              </div>
              <div className="col-span-8 lg:!mb-0">
                <div className="flex">
                  <input
                    type="text"
                    name="color"
                    value={formData ? formData?.color : productinfo?.color}
                    onChange={handleInputChange}
                    className="dark:shadow-sm-light w-1.5/6 block rounded-sm border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    placeholder="123456789"
                    required
                  
                  />
                </div>
              </div>
            </div>
          </div>
          { label === "pagedetail" &&
          <div class="mt-7">
            <div className="mt-3 flex w-full w-full  flex-col gap-10 lg:grid lg:grid-cols-12">
              <div className="z-0 col-span-4 lg:!mb-0">
                <div className="flex items-center">
                  <label class="block text-center text-sm font-medium text-gray-900 dark:text-white">
                    Produc Price
                  </label>
                  <div className="bg-slate-200 ml-2 rounded-md border bg-gray-200 px-2 py-0.5 text-xs text-gray-600">
                    Required
                  </div>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-gray-700">
                  You can add a new subcategory or choose from the existing
                  subcategory list.
                </p>
              </div>
              <div className="col-span-8 lg:!mb-0">
                <div className="flex">
                  <div className="border-slate-200 dark:bg-darkmode-900/20 dark:border-darkmode-900/20 dark:text-slate-400 [&:not(:first-child)]:border-l-transparent rounded-none border bg-gray-200 py-2 px-3 text-gray-700 shadow-sm first:rounded-l last:rounded-r">
                    $
                  </div>
                  <input
                    type="number"
                    name="price"
                    value={productinfo?.price}
              
                    className="dark:shadow-sm-light block w-1/3 rounded-sm border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    placeholder="123456789"
                    required
                 
                  />
                </div>
              </div>
            </div>
          </div>
}
        </div>
      </div>
    </Card>
  );
}
