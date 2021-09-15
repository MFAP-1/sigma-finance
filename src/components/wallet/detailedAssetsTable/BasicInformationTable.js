import React from "react";

import LoadingAnimationLinear from "../../loading/LoadingAnimationLinear";

function BasicInformationTable(props) {
  return (
    <div className="center-object">
      <table>
        <thead>
          <tr key="detailedAsset-tables-title-basic-information">
            <td colSpan="6">BASIC INFORMATION</td>
            <td colSpan="2">TIME FRAME</td>
          </tr>
          <tr key="detailedAsset-tables-header-basic-information">
            <th>Asset Type</th>
            <th>Asset Name</th>
            <th>Asset Asymbol</th>
            <th>Currency</th>
            <th>Invest. Indicator</th>
            <th>Comments</th>
            <th>Date bought</th>
            <th>Investment time</th>
          </tr>
        </thead>
        <tbody>
          <tr key="detailedAsset-tables-body-basic-information">
            <td>{props.assetType}</td>
            <td> {props.assetName}</td>
            <td>{props.assetSymbol}</td>
            <td>{props.currency}</td>
            <td>
              {props.investmentIndicator ? props.investmentIndicator : "-"}
            </td>
            <td>{props.additionalComments}</td>
            <td>{props.dateBought}</td>
            <td>
              {props.loading ? (
                <LoadingAnimationLinear color={"black"} />
              ) : (
                props.investmentDuration
              )}{" "}
              days
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default BasicInformationTable;
