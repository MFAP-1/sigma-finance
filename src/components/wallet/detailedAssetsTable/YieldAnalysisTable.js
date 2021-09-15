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
              <th>Initial</th>
              <td>{props.initalUnitValue}</td>
              <td>{props.quantity}</td>
              <td> {props.totalInitialValue}</td>
            </tr>
            <tr key="detailedAsset-tables-body2-yield-analysis">
              <th>
                Current{props.dateManualUpdate !== "" ? <span>*</span> : ""}
              </th>
              <td>{props.currentUnitValue}</td>
              <td>{props.quantity}</td>
              <td> {props.totalCurrentValue}</td>
            </tr>
            <tr key="detailedAsset-tables-body3-yield-analysis">
              <th>Yield</th>
              <td>{props.unitYield}</td>
              <td>-</td>
              <td> {props.totalYield}</td>
            </tr>
            <tr key="detailedAsset-tables-body4-yield-analysis">
              <th colSpan="3" style={{ textAlign: "right" }}>
                Total yield percentage (%)
              </th>
              <td>{props.totalYieldPercentage}%</td>
            </tr>
            <tr key="detailedAsset-tables-body5-yield-analysis">
              <th colSpan="3" style={{ textAlign: "right" }}>
                Estimated yield percentage per year (%a.a.)
              </th>
              <td>{props.yieldPercentagePerYear}%</td>
            </tr>
            <tr key="detailedAsset-tables-body6-yield-analysis">
              <th colSpan="3" style={{ textAlign: "right" }}>
                Estimated yield percentage per month (%a.m.)
              </th>
              <td>{props.yieldPercentagePerMonth}%</td>
            </tr>
          </tbody>
          {props.dateManualUpdate !== "" ? (
            <tfoot>
              <tr key="detailedAsset-tables-footer-yield-analysis">
                <td colSpan="4" style={{ textAlign: "right" }}>
                  <small>*Last updated at {props.dateManualUpdate}</small>
                </td>
              </tr>
            </tfoot>
          ) : (
            ""
          )}
        </table>
      )}
    </div>
  );
}

export default YieldAnalysisTable;
