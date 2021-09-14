import React from "react";

import TextInput from "../../forms/TextInput";

import "../assetForm.css";

import getTodayDate from "../../../scripts/getTodayDate";

function ManualUpdateForm(props) {
  return (
    <form onSubmit={props.handleSubmit} className="asset-form">
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
        <table>
          <thead>
            <tr key="manual-update-form-table-header">
              <th>Asset Type</th>
              <th>Currency</th>
              <th>Asset Name</th>
              <th>Asset Symbol</th>
            </tr>
          </thead>
          <tbody>
            <tr key="manual-update-form-table-body">
              <td>{props.state.assetType}</td>
              <td>{props.state.currency}</td>
              <td>{props.state.assetName}</td>
              <td>{props.state.assetSymbol}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
        <TextInput
          type="number"
          min="0"
          step="0.01"
          id="assetFormInitialUnitPrice"
          className="input-margin-bottom"
          label="Initial Unit Price"
          name="unitPrice"
          value={props.state.unitPrice}
          required
        />
        <TextInput
          type="number"
          min="0"
          step="0.01"
          id="assetFormCurrentUnitPrice"
          className="input-margin-bottom"
          label="Current Unit Price"
          name="manualUpdatedUnitPrice"
          onChange={props.handleChange}
          value={props.state.manualUpdatedUnitPrice}
          required
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
        <TextInput
          type="date"
          id="assetFormDateBought"
          className="input-margin-bottom"
          max={getTodayDate()}
          label="Inital Date"
          name="dateBought"
          value={props.state.dateBought}
          required
        />
        <TextInput
          type="date"
          id="assetFormDateUpdated"
          className="input-margin-bottom"
          max={getTodayDate()}
          label="Date of this update"
          name="dateManualUpdate"
          onChange={props.handleChange}
          value={props.state.dateManualUpdate}
          required
        />
      </div>
      <button type="submit">Update asset</button>
    </form>
  );
}

export default ManualUpdateForm;
