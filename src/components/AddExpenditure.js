import { Box, Button, Modal } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [formData, setFormData] = useState({
    posting_date: "",
    amount: "",
    category: "Entertainment",
    description: "",
    source: "Chase Debit Card",
  });

  const [open, setOpen] = React.useState(false);

  const handleModalOpen = () => setOpen(true);
  const handleModalClose = () => setOpen(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const category = [
    "Entertainment",
    "Food",
    "Bills",
    "Pharmacy",
    "Groceries",
    "Merchandise",
    "Tuition",
    "Uber/Lyft",
    "Wire Transfer",
    "Travel",
    "Other",
  ];

  const source = [
    "Chase Debit Card",
    "American Express Credit Card",
    "M&T Debit Card",
    "Discover Credit Card",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleModalClose();

    let formDataCopy = { ...formData };
    formDataCopy.posting_date = new Date().toISOString();
    formDataCopy.amount = formDataCopy.amount * -1;
    setFormData(formDataCopy);
    try {
      await axios.post(
        "https://money-management-3.herokuapp.com/expenditure/create",
        formDataCopy
      );
    } catch (error) {
      console.log(error);
    }
    window.alert("Addded Successfully!");
    setFormData({
      posting_date: "",
      amount: "",
      category: "Entertainment",
      description: "",
      source: "Chase Debit Card",
    });
  };

  return (
    <>
      <div className="container d-flex justify-content-center m-5">
        <Button
          variant="contained"
          color="error"
          size="medium"
          onClick={handleModalOpen}
        >
          Add Expenditure
        </Button>{" "}
        &nbsp; &nbsp;
        <Modal
          open={open}
          onClose={handleModalClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <form onSubmit={handleSubmit}>
              <div className="mb-3 row">
                <label className="col-sm-4 col-form-label required">
                  Amount
                </label>
                <div className="col-sm-8">
                  <input
                    type="number"
                    className="form-control-plaintext"
                    value={formData.amount}
                    name="amount"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label className="col-sm-4 col-form-label">Category</label>
                <div className="col-sm-8 d-flex">
                  <select
                    className="form-select form-select-md"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                  >
                    {category.map((item, index) => (
                      <option key={index}>{item}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mb-3 row">
                <label className="col-sm-4 col-form-label">Description</label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    className="form-control"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label className="col-sm-4 col-form-label">Source</label>
                <div className="col-sm-8">
                  <select
                    className="form-select form-select-md"
                    name="source"
                    value={formData.source}
                    onChange={handleChange}
                  >
                    {source.map((item, index) => (
                      <option key={index}>{item}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="d-flex justify-content-center mt-4">
                <button className="btn btn-danger" type="submit">
                  Add Expenditure
                </button>
              </div>
            </form>
          </Box>
        </Modal>
      </div>
    </>
  );
}
