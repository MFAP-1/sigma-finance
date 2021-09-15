import React from "react";

function YieldComparisonTable(props) {
  return (
    <div className="center-object">
      {props.loading ? (
        "LOADING TABLE"
      ) : (
        <table>
          <thead>
            <tr key="detailedAsset-tables-title-yield-comparison">
              <td colSpan="4">YIELD COMPARISON</td>
            </tr>
            <tr key="detailedAsset-tables-header-yield-comparison">
              <th>Parameter</th>
              <th>This Investment</th>
              <th>Savings acc*</th>
              <th>IPCA+0%*</th>
            </tr>
          </thead>
          <tbody>
            <tr key="detailedAsset-tables-body1-yield-comparison">
              <th>Current value</th>
              <td>{props.totalCurrentValue}</td>
              <td> {props.totalValueCorrectedBySavingsBrazil}</td>
              <td> {props.totalValueCorrectedByIPCA}</td>
            </tr>
            <tr key="detailedAsset-tables-body2-yield-comparison">
              <th>Yield percentage (%)</th>
              <td>{props.totalYieldPercentage}%</td>
              <td>{props.totalYieldPercentageSavingsBrazil}%</td>
              <td> {props.totalYieldPercentageIPCA}%</td>
            </tr>
            <tr key="detailedAsset-tables-body3-yield-comparison">
              <th>Percentage difference</th>
              <td>0.000%</td>
              <td
                style={{
                  backgroundColor:
                    props.differenceThisAndSavings >= 0 ? "lightgreen" : "red",
                }}
              >
                {props.differenceThisAndSavings}%
              </td>
              <td
                style={{
                  backgroundColor:
                    props.differenceThisAndIPCA >= 0 ? "lightgreen" : "red",
                }}
              >
                {props.differenceThisAndIPCA}%
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr key="detailedAsset-tables-body2-yield-comparison">
              <td colSpan="4" style={{ textAlign: "right" }}>
                <small>*Brazil's indicators</small>
              </td>
            </tr>
          </tfoot>
        </table>
      )}
    </div>
  );
}

export default YieldComparisonTable;
