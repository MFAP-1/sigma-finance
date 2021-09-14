import React from "react";

function BasicInformationTable(props) {
  return (
    <table>
      <thead>
        <tr>
          <td colSpan="7">BASIC INFORMATION</td>
          <td colSpan="2">TIME FRAME</td>
        </tr>
        <tr key="detailedAsset-table-header-basic-information">
          <th>Asset Type</th>
          <th>Asset Name</th>
          <th>Asset Asymbol</th>
          <th>Currency</th>
          <th>Invest. Indicator</th>
          <th>Quantity</th>
          <th>Comments</th>
          <th>Date bought</th>
          <th>Investment time</th>
        </tr>
      </thead>
      <tbody>
        <tr key="detailedAsset-table-body-basic-information">
          <td>{props.assetType}</td>
          <td> {props.assetName}</td>
          <td>{props.assetSymbol}</td>
          <td>{props.currency}</td>
          <td>{props.investmentIndicator}</td>
          <td>{props.quantity}</td>
          <td>{props.additionalComments}</td>
          <td>{props.dateBought}</td>
          <td>{props.investmentDuration} days</td>
        </tr>
      </tbody>
    </table>
  );
}

export default BasicInformationTable;
