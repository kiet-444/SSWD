import React, { useState, useEffect } from "react";

export function SelectDefault({
  label,
  ListCate,
  ListMaterial,
  ListGemstone,
  ListType,
  ListFee,
  onSelectCategory,
  onSelectType,
  onSelectGemstone,
  onSelectMaterial,
  onSelectFee,
  onSelectRole,
  defaultValue,
}) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedMaterial, setSelectedMaterial] = useState("");
  const [selectedGemstone, setSelectedGemstone] = useState("");
  const [selectedFee, setSelectedFee] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  useEffect(() => {
    if (defaultValue) {
      if (label === "Category") {
        setSelectedCategory(defaultValue._id);
      } else if (label === "Type") {
        setSelectedType(defaultValue._id);
      } else if (label === "Material" || label === "Material&Gemstone") {
        setSelectedMaterial(defaultValue._id);
      } else if (label === "Gemstone" || label === "Material&Gemstone") {
        setSelectedGemstone(defaultValue._id);
      }else if (label === "users") {
        setSelectedRole(defaultValue);
      }
    }
  }, [defaultValue, label]);
console.log(defaultValue);
  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    setSelectedCategory(categoryId);
    onSelectCategory(categoryId);
  };
  const handleFeeChange = (e) => {
    const feeId = e.target.value;
    setSelectedFee(feeId);
    onSelectFee(feeId);
  };

  const handleTypeChange = (e) => {
    const typeId = e.target.value;
    setSelectedType(typeId);
    onSelectType(typeId);
  };

  const handleMaterialChange = (e) => {
    const material = e.target.value;
    setSelectedMaterial(material);
    onSelectMaterial(material);
  };

  const handleGemstoneChange = (e) => {
    const gemstone = e.target.value;
    setSelectedGemstone(gemstone);
    onSelectGemstone(gemstone);
  };

  const handleRoleChange = (e) => {
    const role = e.target.value;
    setSelectedRole(role);
    onSelectRole(role);
  };

  const maxVisibleOptions = 5;

  return (
    <form
      className={
        label === "Weight"
          ? "w-full"
          : label === "Size"
          ? "w-20"
          : label === "Material"
          ? "w-full pl-2"
          : label === "Gemstone"
          ? "w-full pl-2"
          : label === "status"
          ? "w-full"
          : ""
      }
    >
      {label === "CategoryInType" && (
        <select
          id="categories"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          size={Math.min(maxVisibleOptions, ListCate?.length)}
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="">
            {defaultValue ? defaultValue.name : "Select a category"}
          </option>
          {ListCate &&
            ListCate?.filter(
              (category) => category?._id !== defaultValue?._id
            ).map((category) => (
              <option key={category?._id} value={category?._id}>
                {category?.name}
              </option>
            ))}
        </select>
      )}

      {label === "Type" && (
        <select
          id="types"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          size={Math.min(maxVisibleOptions, ListType?.length)}
          value={selectedType}
          onChange={handleTypeChange}
        >
          <option value="">
            {defaultValue ? defaultValue.name : "Select a type"}
          </option>
          {ListType &&
            ListType.filter((type) => type._id !== defaultValue?._id).map(
              (type) => (
                <option key={type._id} value={type._id}>
                  {type.name}
                </option>
              )
            )}
        </select>
      )}

      {label === "Material" && (
        <select
          id="types"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          size={Math.min(maxVisibleOptions, ListMaterial?.length)}
          value={selectedMaterial}
          onChange={handleMaterialChange}
        >
          <option value="">
            {defaultValue ? defaultValue.name : "Select a type"}
          </option>
          {ListMaterial &&
            ListMaterial.filter((type) => type._id !== defaultValue?._id).map(
              (type) => (
                <option key={type._id} value={type._id}>
                  {type.name}
                </option>
              )
            )}
        </select>
      )}
      {label === "Gemstone" && (
        <select
          id="types"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          size={Math.min(maxVisibleOptions, ListGemstone?.length)}
          value={selectedGemstone}
          onChange={handleGemstoneChange}
        >
          <option value="">
            {defaultValue ? defaultValue.name : "Select a type"}
          </option>
          {ListGemstone &&
            ListGemstone.filter((type) => type._id !== defaultValue?._id).map(
              (type) => (
                <option key={type._id} value={type._id}>
                  {type.name}
                </option>
              )
            )}
        </select>
      )}

      {label === "status" && (
        <select
          id="types"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          size={Math.min(maxVisibleOptions, ListGemstone?.length)}
          value={selectedGemstone}
          onChange={handleGemstoneChange}
          disabled
        >
          <option value="">{defaultValue?.status}</option>
        </select>
      )}

      {label === "Material&Gemstone" && (
        <select
          id="categories"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          size={Math.min(maxVisibleOptions, ListCate?.length)}
          value={selectedFee}
          onChange={handleFeeChange}
        >
          <option value="">
            {defaultValue ? defaultValue.name : "Select process fee"}
          </option>
          {ListFee &&
            ListFee?.filter((fee) => fee?._id !== defaultValue?._id).map(
              (fee) => (
                <option key={fee?._id} value={fee?._id}>
                  {fee?.name}
                </option>
              )
            )}
        </select>
      )}
       {label === "users" && (
        <select
          id="roles"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          value={selectedRole}
          onChange={handleRoleChange}
        >
          {defaultValue ?? <option value="" disabled>Select Role</option>}
          {defaultValue === "cust" ? <option value="cust" >Customer</option> : ""}
          <option value="Admin">Admin</option>
          <option value="staff">Staff</option>
       
        </select>
      )}
    </form>
  );
}
