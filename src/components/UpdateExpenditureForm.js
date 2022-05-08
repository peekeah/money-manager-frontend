import axios from "axios";
import React, { useState, useEffect } from "react";

function UpdateExpenditureForm({
  item,
  filteredData,
  setFilteredData,
  handleModalClose,
}) {
  const [data, setData] = useState({
    _id: "",
    date: "",
    amount: "",
    category: "",
    description: "",
    source: "",
  });

  useEffect(() => {
    console.log(data);
    setData(item);
  }, []);

  useEffect(() => {
    console.log(data)
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // setData((prevState) => ({ ...prevState, [name]: value }));
   
    // console.log(name, value);
    let newData = {...data};
    newData[name] = value;
    // debugger
    setData(newData);

  };

  const handleSubmit = (e) => {
    console.log(data)
    console.log("submitted");
    setFilteredData(data);
    handleModalClose();
  };

  return (
    <>
      <div className="mb-3 row">
        <label className="col-sm-4 col-form-label">Amount{data.amount}</label>
        <div className="col-sm-8">
          <input
            type="number"
            className="form-control-plaintext"
            value={data.amount}
            name="amount"
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="mb-3 row">
        <label className="col-sm-4 col-form-label">Category</label>
        <div className="col-sm-8">
          <input
            type="text"
            className="form-control"
            name="category"
            value={data.category}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="mb-3 row">
        <label className="col-sm-4 col-form-label">Description</label>
        <div className="col-sm-8">
          <input
            type="text"
            className="form-control"
            name="description"
            value={data.description}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="mb-3 row">
        <label className="col-sm-4 col-form-label">Source</label>
        <div className="col-sm-8">
          <input
            type="text"
            className="form-control"
            name="source"
            value={data.source}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="mx-auto">
        <button className="btn btn-primary" onClick={handleSubmit}>
          Add Expenditure
        </button>
      </div>
    </>
  );
}

export default UpdateExpenditureForm;
