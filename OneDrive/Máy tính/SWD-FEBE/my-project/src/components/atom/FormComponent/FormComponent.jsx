import React from "react";
import Card from "components/card";
import { FaChevronDown } from "react-icons/fa";
import { SelectDefault } from "../SelectOptions/SelectDefault";
export default function FormComponent({
  data,
  formData,
  ListMaterial,
  ListGemstone,
  handleInputChange,
  edit,
  setFormData,
  label,
}) {
  const productinfo = data;
  
  const handleMaterialSelect = (materialId) => {
    setFormData({ ...formData, materialID: materialId });
  };
  const handleGemstoneSelect = (gemstoneId) => {
    setFormData({ ...formData, gemstoneID: gemstoneId });
  };

  return (
    <Card
      extra={`p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400`}
    >
      <div className="border-slate-200/60 rounded-md rounded-[10px] border border p-5 p-5">
        <div className="border-slate-200/60 flex w-full border-b-4 p-5 text-center">
          <div className="my-auto">
            <FaChevronDown />
          </div>
          <div className="pl-2">Product Ingredient</div>
        </div>
        <div className="mt-5">
          <div class="mb-5">
            <div className="mt-3 flex w-full w-full  flex-col gap-10 lg:grid lg:grid-cols-12">
              <div className="z-0 col-span-4 lg:!mb-0">
                <div className="flex items-center">
                  <label class="mb-1 block text-center text-sm font-medium text-gray-900 dark:text-white">
                    Material
                  </label>
                  <div className="bg-slate-200 ml-2 rounded-md border bg-gray-200 px-2 py-0.5	 text-xs text-gray-600">
                    Required
                  </div>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-gray-700">
                  Material that includes size, name,weight in the product to
                  show the component that the product is made from
                </p>
              </div>
              <div className="z-0 col-span-8 lg:!mb-0">
                <div className="dark:bg-darkmode-900 dark:border-darkmode-400/20 rounded-md border bg-gray-200 p-5 dark:text-gray-700">
                  <div className="mt-5 block items-center first:mt-0 sm:flex">
                    <label class="mb-2 inline-block sm:mb-0 sm:mr-5 sm:w-20 sm:text-right">
                      Name
                    </label>
                    {ListMaterial || edit ? (
                      <div className="block w-full">
                      <SelectDefault
                        label="Material"
                        ListMaterial={ListMaterial}
                        defaultValue={""}
                        onSelectMaterial={handleMaterialSelect}
                      />
                      </div>
                    ) : (
                      <input
                        type="text"
                        value={productinfo?.materialID?.name}
                        onChange={handleInputChange}
                        class="dark:shadow-sm-light block w-4/6 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        placeholder="Ex : abcxyz"
                        required
                      />
                    )}
                  </div>
              
                  {label === "ProductDetail"  ? (
                    
                    <>
                    {(!edit &&
                      <div className="mt-5 block items-center first:mt-0 sm:flex">
                        <label class="mb-2 inline-block sm:mb-0 sm:mr-5 sm:w-20 sm:text-right">
                          Price/gram
                        </label>
                        <input
                          type="text"
                          value={productinfo?.materialID?.pricePerGram}
                          class="dark:shadow-sm-light block w-4/6 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                          placeholder="12"
                          required
                        />
                      </div>
                    )}
                      <div className="mt-5 block items-center first:mt-0 sm:flex">
                        <label class="mb-2 inline-block sm:mb-0 sm:mr-5 sm:w-20 sm:text-right">
                         Product Weight
                        </label>
                        <div className="flex">
                          <input
                            type="text"
                            value={
                              formData ? formData.materialWeight : productinfo?.materialWeight
                            }
                            onChange={handleInputChange}
                            className="dark:shadow-sm-light w-1.5/6 block rounded-sm border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                            placeholder="0.1mm"
                            required
                          />
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="mt-5 block items-center first:mt-0 sm:flex">
                        <label class="mb-2 inline-block sm:mb-0 sm:mr-5 sm:w-20 sm:text-right">
                        Product Weight
                        </label>
                        <input
                          type="text"
                          name="materialWeight"
                          value={
                            formData ? formData.materialWeight : productinfo?.materialWeight
                          }
                          onChange={handleInputChange}
                          class="dark:shadow-sm-light block w-4/6 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                          placeholder="12"
                          required
                        />
                      </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5">
          <div class="mb-5">
            <div className="mt-3 flex w-full w-full  flex-col gap-10 lg:grid lg:grid-cols-12">
              <div className="z-0 col-span-4 lg:!mb-0">
                <div className="flex items-center">
                  <label class="mb-1 block text-center text-sm font-medium text-gray-900 dark:text-white">
                    Gemstone
                  </label>
                  <div className="bg-slate-200 ml-2 rounded-md border bg-gray-200 px-2 py-0.5	 text-xs text-gray-600">
                    Required
                  </div>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-gray-700">
                  Gemstone is the rare stone that includes size, name,weight in
                  the product to show the component that the product is made
                  from
                </p>
              </div>
              <div className="z-0 col-span-8 lg:!mb-0">
                <div className="dark:bg-darkmode-900 dark:border-darkmode-400/20 rounded-md border bg-gray-200 p-5 dark:text-gray-700">
                  <div className="mt-5 block items-center first:mt-0 sm:flex">
                    <label class="mb-2 inline-block sm:mb-0 sm:mr-5 sm:w-20 sm:text-right">
                      Name
                    </label>
                    {ListGemstone || edit ? (
                      <SelectDefault
                        label="Gemstone"
                        ListGemstone={ListGemstone}
                        defaultValue={""}
                        onSelectGemstone={handleGemstoneSelect}
                      />
                    ) : (
                      <input
                        type="text"
                        value={productinfo?.gemstoneID?.name}
                        class="dark:shadow-sm-light block w-4/6 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        placeholder="Ex : abcxyz"
                        required
                      />
                    )}
                  </div>
                  {label === "ProductDetail" ? (
                    <>
                      <div className="mt-5 block items-center first:mt-0 sm:flex">
                        <label class="mb-2 inline-block sm:mb-0 sm:mr-5 sm:w-20 sm:text-right">
                          Size
                        </label>
                        <input
                          type="text"
                          value={productinfo?.gemstoneID?.size}
                          class="dark:shadow-sm-light block w-4/6 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                          placeholder="12"
                          required
                        />
                      </div>
                      <div className="mt-5 block items-center first:mt-0 sm:flex">
                        <label class="mb-2 inline-block sm:mb-0 sm:mr-5 sm:w-20 sm:text-right">
                          Price/Gem
                        </label>
                        <div className="flex">
                          <input
                            type="number"
                            value={productinfo?.gemstoneID?.priceOfGem}
                            className="dark:shadow-sm-light w-1.5/6 block rounded-sm border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                            placeholder="0.1mm"
                            required
                          />
                          <div className="border-slate-200 dark:bg-darkmode-900/20 dark:border-darkmode-900/20 dark:text-slate-400 [&:not(:first-child)]:border-l-transparent rounded-none border bg-gray-300 py-2 px-3 text-gray-700 shadow-sm first:rounded-l last:rounded-r">
                            mm
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
