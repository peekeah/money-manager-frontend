import React from "react";
import AddIncome from "./AddIncome";
import AddExpenditure from "./AddExpenditure";

export default function Dashboard() {
  return (
    <div
      style={{ height: "80vh" }}
      className="container col-lg-6 d-lg-flex align-items-center"
    >
      <AddIncome />
      <AddExpenditure />
    </div>
  );
}
