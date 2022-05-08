import axios from "axios";
import React, { useEffect, useState } from "react";
import MaterialTable from "@material-table/core";
import moment from "moment";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Modal } from "@mui/material";
import DatePickerComponent from "./ExpenditureDatePickerComponent";
import ExpenditureFilterYearMonth from "./ExpenditureFilterYearMonth";
import ExpenditureDivisionFilter from "./ExpenditureDivisionFilter";

export default function Expenditure() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [counter, setCounter] = useState(0);
  const [open, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    posting_date: "",
    amount: "",
    category: "",
    description: "",
    source: "",
  });

  const columns = [
    {
      title: "Sr No.",
      render: (row) => row.tableData.id + 1,
    },
    { title: "Date", render: (row) => moment(row.posting_date).format("LL") },
    { title: "Amount", field: "amount" },
    { title: "Category", field: "category" },
    { title: "Description", field: "description" },
    { title: "Source", field: "source" },
  ];

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

  useEffect(() => {
    setCounter(counter + 1);
  }, []);

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get(
          "https://money-management-3.herokuapp.com/expenditure"
        );
        const data = response.data
        setData(response.data);
        setFilteredData(data);
      } catch (error) {
        console.error(error);
      }
    }
    getData();
  }, [counter]);

  const handleModalOpen = () => setOpenModal(true);
  const handleModalClose = () => setOpenModal(false);

  const handleDelete = async (e, rowData) => {
    const { _id, posting_date } = rowData;
    let dateString = new Date(posting_date);
    let twelveHoursBack = new Date(
      moment(new Date().setHours(new Date().getHours() - 12)).format()
    );

    if (dateString >= twelveHoursBack) {
      await axios.delete(
        `https://money-management-3.herokuapp.com/expenditure/delete/${_id}`
      );

      let incomeListCopy = data.filter((data) => data._id !== _id);
      setFilteredData(incomeListCopy);
      window.alert("sucessfully deleted");
    } else {
      window.alert("you cannot delete 12 hours before entry");
    }
  };

  const selectedItem = (e, rowData) => {
    const dateString = new Date(rowData.posting_date);
    let twelveHoursBack = new Date(
      moment(new Date().setHours(new Date().getHours() - 12)).format()
    );
    if (dateString >= twelveHoursBack) {
      handleModalOpen();
      setFormData(rowData);
    } else {
      window.alert("you cannot update 12 hours before entry");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    handleModalClose();

    const { _id, ...body } = formData;
    if (body.amount > 0) {
      body.amount = body.amount * -1;
    }
    await axios.put(
      `https://money-management-3.herokuapp.com/expenditure/update/${_id}`,
      body
    );
    setCounter(counter + 1);
    window.alert("sucessfully updated");
  };

  if (filteredData)
    return (
      <>
        <div className="mt-4">
          <DatePickerComponent setFilteredList={setFilteredData} />
        </div>

        <ExpenditureFilterYearMonth
          data={data}
          filteredData={filteredData}
          setFilteredData={setFilteredData}
        />

        <ExpenditureDivisionFilter
          data={data}
          setFilteredData={setFilteredData}
          filteredData={filteredData}
        />

        <MaterialTable
          data={filteredData}
          columns={columns}
          actions={[
            {
              icon: EditIcon,
              tooltip: "Edit Entry",
              onClick: (event, rowData) => selectedItem(event, rowData),
            },
            {
              icon: DeleteIcon,
              tooltip: "Delete Entry",
              onClick: handleDelete,
            },
          ]}
          options={{
            actionsColumnIndex: -1,
          }}
          title={"Expenditure"}
          fixedHeader
          pagination
        />

        <Modal
          open={open}
          onClose={handleModalClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <form onSubmit={handleSubmit}>
              <div className="mb-3 row">
                <label className="col-sm-4 col-form-label">Amount</label>
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
                <div className="col-sm-8 d-flex">
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
                <button className="btn btn-primary" type="submit">
                  Update
                </button>
              </div>
            </form>
          </Box>
        </Modal>
      </>
    );
}
