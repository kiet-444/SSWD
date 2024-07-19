import React from "react";
import Card from "components/card";
import { FaChevronDown } from "react-icons/fa";
import { IoCashOutline } from "react-icons/io5";
import { CiBank } from "react-icons/ci";
import { SelectDefault } from "../SelectOptions/SelectDefault";
export default function TableOrder({ data }) {
  const Detail = data;
  console.log(Detail?.bankPaid);

  return (
    <div>
      <Card extra={"w-full h-full p-4 sm:overflow-x-auto"}>
        <table className="w-full table-fixed">
          <thead className="border-b text-gray-600 ">
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>Customer</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Profit</th>
            </tr>
          </thead>
          <tbody className="border-b text-center text-sm font-bold text-navy-700 dark:text-white">
            {Detail.orderDetails &&
              Detail?.orderDetails?.map((detail) => (
                <tr className="text-center" key={detail._id}>
                  <td>{detail.productID.name}</td>
                  <td className="flex justify-center">
                    <img
                      src={detail?.productID?.imageIDs[0]?.imageLink}
                      alt={detail.productID.name}
                      className="h-16 w-16 object-cover"
                    />
                  </td>
                  <td>{Detail.customerID.name}</td>
                  <td>{detail.productID.quantity}</td>
                  <td>{detail.totalPrice}</td>
                  <td>{detail.totalProfit}</td>
                </tr>
              ))}
          </tbody>
        </table>
        <Card className="mt-3 px-4">
          <div className="mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <h2 className="text-gray-600">Quantity: {Detail?.quantity} </h2>
              <div className="text-center text-sm font-bold text-navy-700 dark:text-white">
                <div className="flex flex-col justify-center gap-2">              
                      <div className="flex  items-center text-xl">
                        <IoCashOutline className="text-[25px]" /> <p>Cash : </p>
                        <p className="ml-3"> {Detail?.cashPaid}</p>
                      </div>
                 
                      <div className="flex  items-center text-xl">
                        <CiBank className="text-[28px]"/> <p>Bank :</p>
                        <p className="ml-3">
                           {Detail?.bankPaid}</p>
                      </div>       
                </div>
              </div>
            </div>
            <div>
              <p className="text-md text-center font-bold text-navy-700 dark:text-white">
                Excess amount : {Detail?.excessAmount}
              </p>
              <p className="text-md text-center font-bold text-navy-700 dark:text-white">
                Remain amount : {Detail?.remainingAmount}
              </p>
              <p className="text-md text-center font-bold text-navy-700 dark:text-white">
                Total profit : {Detail?.totalProfit}
              </p>
              <p className="text-center text-2xl font-bold text-navy-700 dark:text-white">
                Total Price : {Detail?.totalPrice}
              </p>
            </div>
          </div>
        </Card>
      </Card>
      <Card
        extra={`p-5 border my-2 border-slate-200/60 dark:border-darkmode-400`}
      >
        <div className="border-slate-200/60 rounded-md rounded-[10px] border border p-5 p-5">
          <div className="border-slate-200/60 flex w-full border-b-4 p-5 text-center">
            <div className="my-auto">
              <FaChevronDown />
            </div>
            <div className="pl-2">Information of customer</div>
          </div>
          <div className="mt-5">
            <div className="mb-5">
              <div className="mt-3 flex w-full flex-col gap-10 lg:grid lg:grid-cols-12">
                <div className="z-0 col-span-4 lg:!mb-0">
                  <div className="flex items-center">
                    <label className="mb-1 block text-center text-lg font-medium text-gray-900 dark:text-white">
                      Customer detail
                    </label>
                  </div>
                </div>
                <div className="z-0 col-span-8 lg:!mb-0">
                  <div className="dark:bg-darkmode-900 dark:border-darkmode-400/20 rounded-md border bg-gray-200 p-5 dark:text-gray-700">
                    <div className="mt-5 block items-center first:mt-0 sm:flex">
                      <label class="mb-2 inline-block sm:mb-0 sm:mr-5 sm:w-20 sm:text-right">
                        Name
                      </label>
                      <input
                        type="text"
                        name="weight"
                        value={Detail?.customerID?.name}
                        className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        placeholder="123456789"
                        required
                      />
                    </div>
                    <div className="mt-5 block items-center first:mt-0 sm:flex">
                      <label class="mb-2 inline-block sm:mb-0 sm:mr-5 sm:w-20 sm:text-right">
                        Age
                      </label>
                      <input
                        type="number"
                        name="weight"
                        value={Detail?.customerID?.age}
                        className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        placeholder="123456789"
                        required
                      />
                    </div>
                    <div className="mt-5 block items-center first:mt-0 sm:flex">
                      <label class="mb-2 inline-block sm:mb-0 sm:mr-5 sm:w-20 sm:text-right">
                        Phone number
                      </label>
                      <input
                        type="number"
                        value={Detail?.customerID?.phone}
                        className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        placeholder="123456789"
                        required
                      />
                    </div>
                    <div className="mt-5 block items-center first:mt-0 sm:flex">
                      <label class="mb-2 inline-block sm:mb-0 sm:mr-5 sm:w-20 sm:text-right">
                        Address
                      </label>
                      <input
                        type="text"
                        value={Detail?.customerID?.address}
                        className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        placeholder="123456789"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
      <Card
        extra={`p-5 border my-2 border-slate-200/60 dark:border-darkmode-400`}
      >
        <div className="border-slate-200/60 rounded-md rounded-[10px] border border p-5 p-5">
          <div className="border-slate-200/60 flex w-full border-b-4 p-5 text-center">
            <div className="my-auto">
              <FaChevronDown />
            </div>
            <div className="pl-2">Store Information</div>
          </div>
          <div className="mt-5">
            <div className="mb-5">
              <div className="mt-3 flex w-full flex-col gap-10 lg:grid lg:grid-cols-12">
                <div className="z-0 col-span-4 lg:!mb-0">
                  <div className="flex items-center">
                    <label className="mb-1 block text-center text-lg font-medium text-gray-900 dark:text-white">
                      Store detail
                    </label>
                  </div>
                </div>
                <div className="z-0 col-span-8 lg:!mb-0">
                  <div className="dark:bg-darkmode-900 dark:border-darkmode-400/20 rounded-md border bg-gray-200 p-5 dark:text-gray-700">
                    <div className="mt-5 block items-center first:mt-0 sm:flex">
                      <label class="mb-2 inline-block sm:mb-0 sm:mr-5 sm:w-20 sm:text-right">
                        Name
                      </label>
                      <input
                        type="text"
                        name="weight"
                        value={Detail?.storeID?.name}
                        className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        placeholder="123456789"
                        required
                      />
                    </div>

                    <div className="mt-5 block items-center first:mt-0 sm:flex">
                      <label class="mb-2 inline-block sm:mb-0 sm:mr-5 sm:w-20 sm:text-right">
                        Phone number
                      </label>
                      <input
                        type="number"
                        value={Detail?.storeID?.phone}
                        className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        placeholder="123456789"
                        required
                      />
                    </div>
                    <div className="mt-5 block items-center first:mt-0 sm:flex">
                      <label class="mb-2 inline-block sm:mb-0 sm:mr-5 sm:w-20 sm:text-right">
                        Location
                      </label>
                      <input
                        type="text"
                        value={Detail?.storeID?.location}
                        className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        placeholder="123456789"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
      <Card
        extra={`p-5 border border-slate-200/60 dark:border-darkmode-400`}
      >
        <div className="border-slate-200/60 rounded-md rounded-[10px] border border p-5 p-5">
          <div className="border-slate-200/60 flex w-full border-b-4 p-5 text-center">
            <div className="my-auto">
              <FaChevronDown />
            </div>
            <div className="pl-2">Order Description</div>
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
                    Description that describes your product in more detail and
                    clearly to make the user understand your product.
                  </p>
                </div>
                <div className="z-0 col-span-8 lg:!mb-0">
                  <div className="dark:bg-darkmode-900 dark:border-darkmode-400/20 rounded-md border bg-gray-200 p-5 dark:text-gray-700">
                    <div className="mt-5 block items-center first:mt-0 sm:flex">
                      <textarea
                        className="h-full w-full p-2"
                        name="description"
                        value={Detail?.description}
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
      <Card
        extra={`p-5 border border-slate-200/60 dark:border-darkmode-400`}
      >
        <div className="border-slate-200/60 rounded-md rounded-[10px] border border p-5 p-5">
          <div className="border-slate-200/60 flex w-full border-b-4 p-5 text-center">
            <div className="my-auto">
              <FaChevronDown />
            </div>
            <div className="pl-2">Status</div>
          </div>
          <div className="mt-5">
            <div className="mb-5">
              <div className="mt-3 flex w-full flex-col gap-10 lg:grid lg:grid-cols-12">
                <div className="z-0 col-span-4 lg:!mb-0">
                  <div className="flex items-center">
                    <label className="mb-1 block text-center text-sm font-medium text-gray-900 dark:text-white">
                      Status
                    </label>
                    <div className="bg-slate-200 ml-2 rounded-md border bg-gray-200 px-2 py-0.5 text-xs text-gray-600">
                      Required
                    </div>
                  </div>
                
                </div>
                <div className="z-0 col-span-8 lg:!mb-0">
                  <div className="dark:bg-darkmode-900 dark:border-darkmode-400/20 rounded-md border bg-gray-200 p-5 dark:text-gray-700">
                    <div className="mt-5 block items-center first:mt-0 sm:flex">
                    <SelectDefault label={"status"} defaultValue={Detail}/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
