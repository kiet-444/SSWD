import React from "react";
import { Menu } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

const DropDownCate = ({ list, onSelect }) => {
  const categories = groupByCategory(list);

  function groupByCategory(productTypes) {
    const categories = {};
    productTypes.forEach((productType) => {
      const categoryId = productType?.categoryID?._id;
      if (!categories[categoryId]) {
        categories[categoryId] = {
          ...productType?.categoryID,
          productTypes: [],
        };
      }
      categories[categoryId]?.productTypes?.push(productType);
    });
    return Object.values(categories);
  }

  return (
    <div>
      {categories.map((category) => (
        <Menu as="div" className="relative inline-block text-left" key={category._id}>
          <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
            {category.name}
            <ChevronDownIcon className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
          </Menu.Button>
          <Menu.Items className="origin-top-right absolute z-10 right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <p
             
                    onClick={() => onSelect(null)}
                    className={`${
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                    } block px-4 py-2 text-sm`}
                  >
                    All
                  </p>
                )}
              </Menu.Item>
              {category.productTypes.map((productType) => (
                <Menu.Item key={productType?._id}>
                  {({ active }) => (
                    <p
                   
                      onClick={() => onSelect(productType)}
                      className={`${
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                      } block px-4 py-2 text-sm`}
                    >
                      {productType.name}
                    </p>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Menu>
      ))}
    </div>
  );
};

export default DropDownCate;
