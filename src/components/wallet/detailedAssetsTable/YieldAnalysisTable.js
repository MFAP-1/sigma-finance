import React from "react";

function YieldAnalysisTable(props) {
  return (
    <div className="center-object">
      {props.loading ? (
        "LOADING TABLE"
      ) : (
        <table>
          <thead>
            <tr key="detailedAsset-tables-title-yield-analysis">
              <td colSpan="4">YIELD ANALYSIS</td>
            </tr>
            <tr key="detailedAsset-tables-header-yield-analysis">
              <th>Parameter</th>
              <th>Unit price</th>
              <th>Quantity</th>
              <th>Total Value</th>
            </tr>
          </thead>
          <tbody>
            <tr key="detailedAsset-tables-body1-yield-analysis">
              <th>Inital</th>
              <td>{props.initalUnitValue}</td>
              <td>{props.quantity}</td>
              <td> {props.totalInitialValue}</td>
            </tr>
            <tr key="detailedAsset-tables-body2-yield-analysis">
              <th>Current</th>
              <td>{props.currentUnitValue}</td>
              <td>{props.quantity}</td>
              <td> {props.totalCurrentValue}</td>
            </tr>
            <tr key="detailedAsset-tables-body3-yield-analysis">
              <th>Yield</th>
              <td>{props.unitYield}</td>
              <td>{props.quantity}</td>
              <td> {props.totalYield}</td>
            </tr>
            <tr key="detailedAsset-tables-body4-yield-analysis">
              <th colSpan="3">Total yield percentage(%)</th>
              <td>{props.totalYieldPercentage}%</td>
            </tr>
            <tr key="detailedAsset-tables-body4-yield-analysis">
              <th colSpan="3">Estimated yield percentage per year (%a.a.)</th>
              <td>{props.yieldPercentagePerYear}%</td>
            </tr>
            <tr key="detailedAsset-tables-body4-yield-analysis">
              <th colSpan="3">Estimated yield percentage per month (%a.m.)</th>
              <td>{props.yieldPercentagePerMonth}%</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
}

export default YieldAnalysisTable;
