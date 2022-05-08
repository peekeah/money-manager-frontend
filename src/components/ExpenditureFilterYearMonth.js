import React, { useState } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import moment from "moment";

function ExpenditureFilterYearMonth({ data, filteredData, setFilteredData }) {
  const [yearFilteredData, setYearFilteredData] = useState({});

  const [selectValue, setSelectValue] = useState({
    month: "all",
    year: "all",
  });

  const handleYearChange = (e) => {
    const { name, value } = e.target;

    setSelectValue((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });

    if (value === "all") {
      setFilteredData({ ...data });
    } else {
      const newData = Object.values(data).filter(
        (item) => moment(item.posting_date).year() === value
      );

      setFilteredData(newData);
      setYearFilteredData(newData);
    }
  };

  const handleMonthChange = (e) => {
    const { name, value } = e.target;

    setSelectValue((prevState) => ({ ...prevState, [name]: value }));

    if ([name] === "all") {
      setFilteredData({ ...filteredData });
    } else {
      const newData = Object.values(yearFilteredData).filter(
        (item) => moment(item.posting_date).month() + 1 === e.target.value
      );
      setFilteredData(newData);
    }
  };

  return (
    <>
      <div className="col-4 d-flex gap-3 justify-content-center mx-auto mt-3">
        <div className="col-6">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Year</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectValue.year}
              label="year"
              name="year"
              onChange={handleYearChange}
            >
              <MenuItem value={"all"}>ALL</MenuItem>
              <MenuItem value={2018}>2018</MenuItem>
              <MenuItem value={2019}>2019</MenuItem>
              <MenuItem value={2020}>2020</MenuItem>
              <MenuItem value={2021}>2021</MenuItem>
              <MenuItem value={2022}>2022</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="col-6">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Month</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectValue.month}
              label="year"
              name="month"
              onChange={handleMonthChange}
            >
              <MenuItem value={"all"}>ALL</MenuItem>
              <MenuItem value={1}>January</MenuItem>
              <MenuItem value={2}>February</MenuItem>
              <MenuItem value={3}>March</MenuItem>
              <MenuItem value={4}>April</MenuItem>
              <MenuItem value={5}>May</MenuItem>
              <MenuItem value={6}>June</MenuItem>
              <MenuItem value={7}>July</MenuItem>
              <MenuItem value={8}>August</MenuItem>
              <MenuItem value={9}>September</MenuItem>
              <MenuItem value={10}>October</MenuItem>
              <MenuItem value={11}>November</MenuItem>
              <MenuItem value={12}>December</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
    </>
  );
}

export default ExpenditureFilterYearMonth;
