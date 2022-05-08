import axios from "axios";
import React, { useEffect, useState } from "react";
import MaterialTable from "@material-table/core";
import moment from "moment";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Modal } from "@mui/material";
import DatePickerComponent from "./IncomeDatePickerComponent";
import IncomeFilterYearMonth from "./IncomeFilterYearMonth";

function Income() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [counter, setCounter] = useState(0);
  const [open, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    date: "",
    amount: "",
  });

  const columns = [
    {
      title: "Sr No.",
      field: "_id",
      render: (row) => row.tableData.id + 1,
    },
    {
      title: "Date",
      field: "date",
      render: (row) => moment(row.date).format("LL"),
    },
    { title: "Amount", field: "amount" },
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

  useEffect(() => {
    setCounter(counter + 1);
  }, []);

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get(
          "https://money-management-3.herokuapp.com/income"
        );
        setData(response.data);
        setFilteredData(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    getData();
  }, [counter]);

  const handleModalOpen = () => setOpenModal(true);
  const handleModalClose = () => setOpenModal(false);

  const handleDelete = async (e, rowData) => {
    const { _id, date } = rowData;
    let dateString = new Date(date);
    let twelveHoursBack = new Date(
      moment(new Date().setHours(new Date().getHours() - 12)).format()
    );

    if (dateString >= twelveHoursBack) {
      await axios.delete(
        `https://money-management-3.herokuapp.com/income/delete/${_id}`
      );

      let dataCopy = data.filter((data) => data._id !== _id);
      setFilteredData(dataCopy);
      window.alert("sucessfully deleted");
    } else {
      window.alert("you cannot delete 12 hours before entry");
    }
  };

  const selectedItem = (e, rowData) => {
    const dateString = new Date(rowData.date);
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
    await axios.put(
      `https://money-management-3.herokuapp.com/income/update/${_id}`,
      body
    );
    setCounter(counter + 1);
    window.alert("sucessfully updated");
  };

  return (
    <>
      <div className="mt-4">
        <DatePickerComponent setFilteredList={setFilteredData} />
      </div>

      <IncomeFilterYearMonth
        incomeList={data}
        filteredList={filteredData}
        setFilteredList={setFilteredData}
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
        title={"Income"}
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
            <div className="mx-auto">
              <button className="btn btn-primary" type="submit">
                Add Income
              </button>
            </div>
          </form>
        </Box>
      </Modal>
    </>
  );
}

export default Income;
