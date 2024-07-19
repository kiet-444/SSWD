export const columnsDataDevelopment = [
  {
    Header: "NAME",
    accessor: "name",
  },
  {
    Header: "TECH",
    accessor: "tech",
  },
  {
    Header: "DATE",
    accessor: "date",
  },
  {
    Header: "PROGRESS",
    accessor: "progress",
  },
];

export const columnsDataCheck = [
  {
    Header: "NAME",
    accessor: "name",
  },
  {
    Header: "PROGRESS",
    accessor: "progress",
  },
  {
    Header: "QUANTITY",
    accessor: "quantity",
  },
  {
    Header: "DATE",
    accessor: "date",
  },
];

export const columnsDataGemstone = [
  {
    Header: "NAME",
    accessor: "name",
  },
  {
    Header: "PRICE",
    accessor: "priceOfGem",
  },
  {
    Header: "SIZE",
    accessor: "size",
  },
  {
    Header: "FEE",
    accessor: "processingFeeId.feeRate",
  },
];

export const columnsDataMaterial = [
  {
    Header: "NAME",
    accessor: "name",
  },
  {
    Header: "PRICE",
    accessor: "pricePerGram",
  },
  {
    Header: "FEE",
    accessor: "processingFeeId.feeRate",
  },
];

export const columnsDataOrder =  [
  {
    Header: "ID",
    accessor: "_id",
  },
  {
    Header: "PRICE",
    accessor: "totalPrice",
  },
  {
    Header: "CUSTOMER",
    accessor: "customerID.name",
  },
  {
    Header: "NOP",
    accessor: "orderDetails.length",
  },
  {
    Header: "STORE",
    accessor: "storeID.location",
  },
  {
    Header: "STATUS",
    accessor: "status",
  },
];

export const columnsDataStore =  [
  {
    Header: "NAME",
    accessor: "name",
  },
  {
    Header: "PHONE",
    accessor: "phone",
  },
  {
    Header: "LOCATION",
    accessor: "location",
  },
  {
    Header: "INVOICE",
    accessor: "invoice",
  },
];

export const columnsDataUser =  [
 
  {
    Header: "ID",
    accessor: "id",
  },
  {
    Header: "NAME",
    accessor: "name",
  },
  // {
  //   Header: "USERNAME/GOOGLE",
  //   accessor: "username",
  // },
 
  {
    Header: "ROLE",
    accessor: "role",
  },

];

export const columnsDataCustomer =  [
  {
    Header: "NAME",
    accessor: "name",
  },
  {
    Header: "PHONE",
    accessor: "phone",
  },
  {
    Header: "ADDRESS",
    accessor: "address",
  },
  {
    Header: "INVOICE",
    accessor: "invoice",
  },

];

export const columnsDataFee = [
  {
    Header: "NAME",
    accessor: "name",
  },
  {
    Header: "FEE RATE",
    accessor: "feeRate",
  },
  
];


export const columnsDataColumns = [
  {
    Header: "NAME",
    accessor: "name",
  },
  {
    Header: "PROGRESS",
    accessor: "progress",
  },
  {
    Header: "QUANTITY",
    accessor: "quantity",
  },
  {
    Header: "DATE",
    accessor: "date",
  },
];

export const columnsDataComplex = [
  {
    Header: "NAME",
    accessor: "name",
  },
  {
    Header: "CATEGORY",
    accessor: "categoryID.name",
  },

  {
    Header: "ACTION",
    accessor: "DELETE",
  },
];


export const columnsDataCategory = [
  {
    Header: "NAME",
    accessor: "name",
  },
  {
    Header: "DESCRIPTION",
    accessor: "description",
  },
  {
    Header: "ACTION",
    accessor: "action", // Custom accessor for actions like delete
  },
];
