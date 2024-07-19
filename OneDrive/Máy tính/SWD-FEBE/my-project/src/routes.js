import React from "react";

// Admin Imports
import MainDashboard from "views/admin/default";
import NFTMarketplace from "views/admin/marketplace";
import Profile from "views/admin/profile";
import Create from "components/atom/Create/Create";
import DataTables from "./views/admin/tables/item";
import DataTablesOrder from "./views/admin/tables/order";
import Update from "components/atom/Update/Update";
import { BsCart2 } from "react-icons/bs";
import { AiOutlineShopping } from "react-icons/ai";
import { IoStorefrontOutline } from "react-icons/io5";
import DataTablesStore from "./views/admin/tables/store";
import DataTablesUsers from "./views/admin/tables/user";
// import RTLDefault from "views/rtl/default";
import ProcessFee from "views/admin/tables/processFee";
import PageDetailProduct from "views/admin/marketplace/pages/PageDetailProduct/PageDetailProduct";
import OrderDetail from "views/admin/marketplace/pages/OrderDetail/OrderDetail";
// Auth Imports
import UpdateUser from "components/atom/Update/UpdateUser";
import CreateUser from "components/atom/Create/CreateUser";
import { FaChalkboardUser } from "react-icons/fa6";
import { TbMoneybag } from "react-icons/tb";
import SignIn from "views/auth/SignIn";
import CreateProduct from "views/admin/marketplace/pages/CreateProduct/CreateProduct";
import { FaRegUser } from "react-icons/fa";
import DataTableCustomer from "./views/admin/tables/customer";
import GoogleCallback from "views/auth/GoogleCallback";
// Icon Imports
import {
  MdHome,
  MdOutlineShoppingCart,
  MdBarChart,
  MdPerson,
  MdLock,
} from "react-icons/md";

const routes = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  {
    name: "Product",
    layout: "/admin",
    path: "nft-marketplace",
    icon: <AiOutlineShopping className="h-6 w-6" />,
    component: <NFTMarketplace />,
    secondary: true,
  },
  {
    show: "hidden",
    name: "Product detail",
    layout: "/admin",
    path: "nft-marketplace/:productId",
    component: <PageDetailProduct label={"Detail"} />,
  },
  {
    name: "Data Item",
    layout: "/admin",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "data-tables/",
    component: <DataTables />,
  },
  {
    name: "Proccess Fee",
    layout: "/admin",
    icon: <TbMoneybag className="h-6 w-6" />,
    path: "fee/",
    component: <ProcessFee label={"fee"} />,
  },
  {
    name: "Orders",
    layout: "/admin",
    icon: <BsCart2 className="h-6 w-6" />,
    path: "orders/",
    component: <DataTablesOrder />,
  },
  {
    show: "hidden",
    name: "Orders",
    layout: "/admin",
    icon: <BsCart2 className="h-6 w-6" />,
    path: "orders/orders/update/:updateId",
    component: <OrderDetail label={"orders"} />,
  },
  {
    name: "Customers",
    layout: "/admin",
    icon: <FaRegUser className="h-6 w-6" />,
    path: "customers/",
    component: <DataTableCustomer />,
  },
  {
    name: "Users",
    layout: "/admin",
    icon: <FaChalkboardUser className="h-6 w-6" />,
    path: "users/",
    component: <DataTablesUsers />,
  },
  {
    name: "Stores managment",
    layout: "/admin",
    icon: <IoStorefrontOutline className="h-6 w-6" />,
    path: "stores/",
    component: <DataTablesStore />,
  },

  {
    show: "hidden",
    name: "Add store",
    layout: "/admin",
    icon: <IoStorefrontOutline className="h-6 w-6" />,
    path: "stores/stores/create/",
    component: <Create label={"stores"} />,
  },
  {
    show: "hidden",
    name: "Add User",
    layout: "/admin",
    icon: <IoStorefrontOutline className="h-6 w-6" />,
    path: "users/users/create/",
    component: <CreateUser label={"users"} />,
  },
  {
    show: "hidden",
    name: "Update User",
    layout: "/admin",
    icon: <IoStorefrontOutline className="h-6 w-6" />,
    path: "users/users/update/:updateId",
    component: <UpdateUser label={"users"} />,
  },
  {
    show: "hidden",
    name: "Update store",
    layout: "/admin",
    icon: <IoStorefrontOutline className="h-6 w-6" />,
    path: "stores/stores/update/:updateId",
    component: <Update label={"stores"} />,
  },
  {
    show: "hidden",
    name: "Update Customer",
    layout: "/admin",
    icon: <IoStorefrontOutline className="h-6 w-6" />,
    path: "customers/customer/update/:updateId",
    component: <Update label={"customers"} />,
  },

  {
    show: "hidden",
    name: "Add product",
    layout: "/admin",
    path: "nft-marketplace/product/create",
    component: <CreateProduct label={"product"} />,
  },

  {
    show: "hidden",
    name: "create material",
    layout: "/admin",
    path: "data-tables/material/create",
    component: <Create label={"Material"} />,
  },
  {
    show: "hidden",
    name: "create fee",
    layout: "/admin",
    path: "fee/fee/create",
    component: <Create label={"Processing Fee"} />,
  },
  {
    show: "hidden",
    name: "Update fee",
    layout: "/admin",
    path: "fee/fee/update/:updateId",
    component: <Update label={"Processing Fee"} />,
  },
  {
    show: "hidden",
    name: "create Type",
    layout: "/admin",
    path: "data-tables/type/create",
    component: <Create label={"Type"} />,
  },
  {
    show: "hidden",
    name: "create gemstone",
    layout: "/admin",
    path: "data-tables/gemstone/create",
    component: <Create label={"Gemstone"} />,
  },
  {
    show: "hidden",
    name: "create category",
    layout: "/admin",
    path: "data-tables/category/create",
    component: <Create label={"Category"} />,
  },
  {
    show: "hidden",
    name: "update material",
    layout: "/admin",
    path: "data-tables/material/update/:updateId",
    component: <Update label={"Material"} />,
  },
  {
    show: "hidden",
    name: "update gemstone",
    layout: "/admin",
    path: "data-tables/gemstone/update/:updateId",
    component: <Update label={"Gemstone"} />,
  },
  {
    show: "hidden",
    name: "update type",
    layout: "/admin",
    path: "data-tables/producttype/update/:updateId",
    component: <Update label={"Type"} />,
  },
  {
    show: "hidden",
    name: "update type",
    layout: "/admin",
    path: "data-tables/category/update/:updateId",
    component: <Update label={"Category"} />,
  },
  {
    show: "hidden",
    name: "Profile",
    layout: "/admin",
    path: "profile",
    icon: <MdPerson className="h-6 w-6" />,
    component: <Profile />,
  },
  {
    name: "Sign In",
    layout: "/auth",
    path: "sign-in",
    icon: <MdLock className="h-6 w-6" />,
    component: <SignIn />,
  },
  {
    name: "Google Callback",
    layout: "/",
    path: "authGoogle",
    component: <GoogleCallback />,
  },
];
export default routes;
