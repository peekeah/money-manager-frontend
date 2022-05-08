import { Box, Button, Modal } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";

export default function AddIncome() {
  const [formData, setFormData] = useState({
    date: "",
    amount: "",
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
    formDataCopy.date = new Date().toISOString();
    setFormData(formDataCopy);
    try {
      const response = await axios.post(
        "https://money-management-3.herokuapp.com/income/create",
        formDataCopy
      );
    } catch (error) {
      console.log(error);
    }
    window.alert("Addded Successfully!");
    setFormData({
      date: "",
      amount: "",
    });
  };

  return (
    <>
      <div className="container d-flex justify-content-center m-5">
        <Button
          variant="contained"
          color="success"
          size="medium"
          onClick={handleModalOpen}
        >
          Add Income
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
              
              <div className="d-flex justify-content-center mt-4">
                <button className="btn btn-success" type="submit">
                  Add Income
                </button>
              </div>
            </form>
          </Box>
        </Modal>
      </div>
    </>
  );
}
