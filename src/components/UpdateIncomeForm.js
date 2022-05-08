import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";

function UpdateIncomeForm({
  item,
  filteredList,
  setFilteredList,
  handleModalClose,
}) {
  const URL = "https://money-management-3.herokuapp.com/income/update";
  const [formData, setFormData] = useState({
    _id: "",
    amount: "",
    date: "",
  });

  useEffect(() => {
    setFormData(item);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleSubmit = async () => {

    let dateString = new Date(item.date);
    let twelveHoursBack = new Date(
      moment(new Date().setHours(new Date().getHours() - 12)).format()
    );

    if (dateString >= twelveHoursBack) {
      let filteredListCopy = { ...filteredList };
      const index = Object.values(filteredListCopy).findIndex(
        (s) => s._id === item._id
      );
      filteredListCopy[index] = formData;
      setFilteredList(filteredListCopy);

      //api call
      const { _id, ...remainingData } = formData;
      const res = await axios.put(`${URL}/${_id}`, remainingData);
      window.alert("sucessfully updated");
    } else {
      window.alert("you cannot update entry before 12 hours");
    }     
    
    handleModalClose();
  };

  return (
    <div>
      <label>Amount</label> &nbsp;
      <input
        type="number"
        name="amount"
        value={formData.amount}
        onChange={handleChange}
      />
      <div className="d-flex justify-content-center"></div>
      <button className="btn btn-success mt-3" onClick={handleSubmit}>
        Update Income
      </button>
    </div>
  );
}

export default UpdateIncomeForm;
