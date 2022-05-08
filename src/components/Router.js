import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Appbar from "./Appbar";
import Dashboard from "./Dashboard";
import Expenditure from "./Expenditure";
import Income from "./Income";

export default function Router() {
  return (
    <BrowserRouter>
      <Appbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/income" element={<Income />} />
        <Route path="/expenditure" element={<Expenditure />} />
      </Routes>
    </BrowserRouter>
  );
}
