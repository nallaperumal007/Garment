import React from "react";
import MasterForm from "../components/MasterForm";

export default function Masters() {
  return (
    <div>
      <h3>Unit Master</h3>
      <MasterForm type="unit" />
      <h3>Line Master</h3>
      <MasterForm type="line" />
      <h3>Shift Master</h3>
      <MasterForm type="shift" />
    </div>
  );
}
