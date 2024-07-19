import React from 'react'
import { FaChevronDown } from "react-icons/fa";
import Card from "components/card";

export default function Description({data,setFormData,formData,handleInputChange,edit}) {
    const productinfo = data
  return (
    <Card
    extra={`p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400`}
  >
    <div className="border-slate-200/60 rounded-md rounded-[10px] border border p-5 p-5">
      <div className="border-slate-200/60 flex w-full border-b-4 p-5 text-center">
        <div className="my-auto">
          <FaChevronDown />
        </div>
        <div className="pl-2">Product Description</div>
      </div>
      <div className="mt-5">
        <div className="mb-5">
          <div className="mt-3 flex w-full flex-col gap-10 lg:grid lg:grid-cols-12">
            <div className="z-0 col-span-4 lg:!mb-0">
              <div className="flex items-center">
                <label className="mb-1 block text-center text-sm font-medium text-gray-900 dark:text-white">
                  Description
                </label>
                <div className="bg-slate-200 ml-2 rounded-md border bg-gray-200 px-2 py-0.5 text-xs text-gray-600">
                  Required
                </div>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-gray-700">
                Description that describes your product in more detail
                and clearly to make the user understand your product.
              </p>
            </div>
            <div className="z-0 col-span-8 lg:!mb-0">
              <div className="dark:bg-darkmode-900 dark:border-darkmode-400/20 rounded-md border bg-gray-200 p-5 dark:text-gray-700">
                <div className="mt-5 block items-center first:mt-0 sm:flex">
                  <textarea
                    className="h-full w-full p-2"
                    name="description"
                    value={formData ? formData?.description : productinfo?.description}
                    onChange={handleInputChange}
                    
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Card>
  )
}
