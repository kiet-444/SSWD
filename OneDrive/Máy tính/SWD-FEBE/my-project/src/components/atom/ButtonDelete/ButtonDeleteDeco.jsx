import React from "react";
import Dropdown from "components/dropdown";
import { BsTrash } from "react-icons/bs";

import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; 
function ButtonCss(props) {
  const { handleDelete, transparent } = props;
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const NoDropdown = "NoDropdown";
  return (
    <>
    <Dropdown
      NoDrop = {NoDropdown}
      button={
        <button
          onClick={handleDelete} // Trigger the delete function
          className={`flex items-center text-xl hover:cursor-pointer ${
            transparent
              ? "bg-none text-white hover:bg-none active:bg-none"
              : "bg-lightPrimary p-2 text-brand-500 hover:bg-gray-100 dark:bg-navy-700 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10"
          } linear justify-center rounded-lg font-bold transition duration-200`}
        >
          <BsTrash className="h-6 w-6" />
        </button>
      }
      animation={"origin-top-right transition-all duration-300 ease-in-out"}
      classNames={`${transparent ? "top-8" : "top-11"} right-0 w-max`}
      children={
        <div className="z-50 w-max rounded-xl bg-white py-3 px-4 text-sm shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          {/* Additional menu items can be added here */}
        </div>
      }
    />
   
    </>
  );
}

export default ButtonCss;
