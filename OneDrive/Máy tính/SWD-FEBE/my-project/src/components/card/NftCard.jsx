import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { useState } from "react";
import Card from "components/card";
import { GoTrash } from "react-icons/go";
import { Link } from "react-router-dom";

const NftCard = ({ productId, index, name, materialID, gemstoneID, price, imageLink, extra, handleDelete }) => {
  const [heart, setHeart] = useState(true);

  const truncateName = (str, num) => {
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + '...';
  };

  return (
    <Card
      key={index}
      extra={`flex flex-col w-full h-full !p-4 3xl:p-![18px] bg-white ${extra}`}
    >
      <div className="w-full h-full">
        <div className="relative w-full">
          <img
            src={imageLink[0]?.imageLink}
            className="mb-3 h-full w-full rounded-xl 3xl:h-full 3xl:w-full"
            alt=""
          />
          {/* <button
            onClick={() => setHeart(!heart)}
            className="absolute flex items-center justify-center p-2 bg-white rounded-full top-3 right-3 text-brand-500 hover:cursor-pointer"
          >
            <div className="flex items-center justify-center w-full h-full text-xl rounded-full hover:bg-gray-50 dark:text-navy-900">
              {heart ? (
                <IoHeartOutline />
              ) : (
                <IoHeart className="text-brand-500" />
              )}
            </div>
          </button> */}
        </div>

        <div className="flex items-center justify-between px-1 mb-3 md:flex-col md:items-start lg:flex-row lg:justify-between xl:flex-col xl:items-start 3xl:flex-row 3xl:justify-between">
          <div className="mb-2">
            <p className="text-lg font-bold text-navy-700 dark:text-white">
              {truncateName(name, 30)}
            </p>
            
            <p className="mt-1 text-sm font-medium text-gray-600 md:mt-2">
              Material : {materialID?.name}
            </p>
            <p className="mt-1 text-sm font-medium text-gray-600 md:mt-2">
              Gemstone : {gemstoneID?.name}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between md:flex-col md:items-start lg:flex-row lg:justify-between xl:flex-col 2xl:items-start 3xl:flex-row 3xl:items-center 3xl:justify-between">
          <div className="flex">
            <p className="mb-2 text-sm font-bold text-brand-500 dark:text-white">
              Current price: {price}
            </p>
          </div>
          <div className="flex w-full justify-between">
            <Link to={`/admin/nft-marketplace/${productId}`}>
              <button
                className="linear rounded-[20px] bg-brand-900 px-4 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-800 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:opacity-90"
              >
                View Detail
              </button>
            </Link>
            <button
              className="py-2 px-3 border-2 border-red-300 rounded-full bg-red-400 text-red-700"
              onClick={() => handleDelete(productId)}
            >
              <GoTrash />
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default NftCard;