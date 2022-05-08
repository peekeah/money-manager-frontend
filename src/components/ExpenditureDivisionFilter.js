import React, { useEffect, useState } from "react";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

function ExpenditureDivisionFilter({ data, filteredData, setFilteredData }) {
  const [personalDivRadio, setPersonalDivRadio] = useState(false);
  const [workDivRadio, setWorkDivRadio] = useState(false);
  const [radioDivision, setRadioDivision] = useState(null);

  const [personalDivisionCheck, setPersonalDivisionCheck] = useState([
    { title: "Entertainment", checked: true },
    { title: "Food", checked: true },
    { title: "Bills", checked: true },
    { title: "Pharmacy", checked: true },
    { title: "Groceries", checked: true },
    { title: "Merchandise", checked: true },
    { title: "Tuition", checked: true },
  ]);

  const [workDivCheck, setWorkDivCheck] = useState([
    { title: "Uber/Lyft", checked: true },
    { title: "Wire Transfer", checked: true },
    { title: "Travel", checked: true },
    { title: "Other", checked: true },
  ]);

  useEffect(() => {
    const newPersonalFilter = personalDivisionCheck
      .filter((item) => item.checked === true)
      .map((item) => item.title);

    const newData = data.filter((item) =>
      newPersonalFilter.includes(item.category)
    );
    setFilteredData(newData);
  }, [personalDivisionCheck]);

  useEffect(() => {
    const newWorkFilter = workDivCheck
      .filter((item) => item.checked === true)
      .map((item) => item.title);

    const newData = data.filter((item) =>
      newWorkFilter.includes(item.category)
    );
    setFilteredData(newData);
  }, [workDivCheck]);

  const handleRadioFilter = (e) => {
    setRadioDivision(e.target.value);

    const personalDivison = personalDivisionCheck.map((item) => item.title);
    const workDivision = workDivCheck.map((item) => item.title);

    const division = e.target.value;
    if (division === "personal") {
      setPersonalDivRadio(true);
      setWorkDivRadio(false);

      const newData = Object.values(data).filter((item) =>
        personalDivison.includes(item.category)
      );
      setFilteredData(newData);
    } else {
      setPersonalDivRadio(false);
      setWorkDivRadio(true);

      const newData = Object.values(data).filter((item) =>
        workDivision.includes(item.category)
      );
      setFilteredData(newData);
    }
  };

  const handlePersonalCheck = (e) => {
    const { name } = e.target;

    let personalCheckCopy = [...personalDivisionCheck];
    const index = Object.values(personalCheckCopy).findIndex(
      (item) => item.title === name
    );
    let selectedItem = personalCheckCopy[index];
    selectedItem.checked = !selectedItem.checked;
    personalCheckCopy[index] = selectedItem;

    setPersonalDivisionCheck(personalCheckCopy);
  };

  const handleWorkCheck = (e) => {
    const { name } = e.target;

    let workCheckCopy = [...workDivCheck];
    const index = Object.values(workCheckCopy).findIndex(
      (item) => item.title === name
    );

    let selectedItem = workCheckCopy[index];
    selectedItem.checked = !selectedItem.checked;
    workCheckCopy[index] = selectedItem;

    setWorkDivCheck(workCheckCopy);
  };

  return (
    <>
      <div className="mt-4 mx-auto col-lg-4 d-flex text-center justify-content-center">
        <FormControl>
          <FormLabel>Division</FormLabel>
          <RadioGroup
            row
            name="radioDivision"
            value={radioDivision}
            onChange={handleRadioFilter}
          >
            <FormControlLabel
              value="personal"
              control={<Radio />}
              label="Personal"
              key="personal"
            />
            <FormControlLabel
              value="work"
              control={<Radio />}
              label="Work"
              key="work"
            />
          </RadioGroup>
        </FormControl>
      </div>

      {!personalDivRadio && !workDivRadio ? (
        <></>
      ) : personalDivRadio && !workDivRadio ? (
        <>
          <FormGroup>
            <div className="mx-auto">
              {personalDivisionCheck.map((item, id) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      key={id}
                      checked={item.checked}
                      onChange={handlePersonalCheck}
                    />
                  }
                  label={item.title}
                  name={item.title}
                  key={id}
                />
              ))}
            </div>
          </FormGroup>
        </>
      ) : (
        <>
          <FormGroup>
            <div className="mx-auto">
              {workDivCheck.map((item, id) => (
                <FormControlLabel
                  control={<Checkbox key={id} checked={item.checked} />}
                  label={item.title}
                  name={item.title}
                  key={id}
                  onChange={handleWorkCheck}
                />
              ))}
              {}
            </div>
          </FormGroup>
        </>
      )}
    </>
  );
}

export default ExpenditureDivisionFilter;
