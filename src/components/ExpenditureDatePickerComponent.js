import React, { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TextField } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import axios from "axios";

function DatePickerComponent({ setFilteredList }) {
  const [startDate, setStartDate] = useState(new Date("2018-08-01"));
  const [endDate, setEndDate] = useState(new Date());
  const URL = "https://money-management-3.herokuapp.com";

  const handleSubmit = (e) => {
    const body = { from: startDate.toISOString(), to: endDate.toISOString() };
    const getData = async () => {
      const response = await axios.post(`${URL}/expenditure/filter`, body);
      setFilteredList(response.data);
    };
    getData();
  };

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <div className="d-flex mx-auto col-4 gap-3 justify-content-center">
          <div>
            <DatePicker
              disableFuture
              label="Start Date"
              openTo="year"
              views={["year", "month", "day"]}
              value={startDate}
              minDate={new Date("2018-08-01")}
              maxDate={new Date()}
              sx={{ width: "30%" }}
              onChange={(newStartDate) => {
                setStartDate(newStartDate);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </div>
          <div>
            <DatePicker
              disableFuture
              label="End Date"
              openTo="year"
              views={["year", "month", "day"]}
              value={endDate}
              minDate={startDate}
              maxDate={new Date()}
              onChange={(newEndDate) => {
                setEndDate(newEndDate);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </div>
          <div className="d-flex align-items-center">
            <button className="btn btn-info" onClick={handleSubmit}>
              Filter
            </button>
          </div>
        </div>
      </LocalizationProvider>
    </>
  );
}

export default DatePickerComponent;
