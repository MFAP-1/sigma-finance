import React from "react";

import TextInput from "../forms/TextInput";
import SelectInput from "../forms/SelectInput";
import RadioInput from "../forms/RadioInput";

import "./assetForm.css";

import getTodayDate from "../../scripts/getTodayDate";

function AssetForm(props) {
  return (
    <form onSubmit={props.handleSubmit} className="asset-form">
      <div className="asset-form-couple-div">
        <SelectInput
          name="assetType"
          className="input-margin-bottom"
          id="selectInputAssetType"
          value={props.state.assetType}
          onChange={props.handleChange}
          items={[
            "Stock",
            "Stock Fund",
            "Bond",
            "Crypto",
            "Savings account",
            "ETF",
            "Other",
          ]}
          placeholder="Asset Type"
          required
        />
        <SelectInput
          name="currency"
          id="selectInputCurrency"
          className="input-margin-bottom"
          value={props.state.currency}
          onChange={props.handleChange}
          items={["USD", "BRL", "EUR"]}
          placeholder="Currency"
          required
        />
      </div>
      {props.state.assetType !== "Bond" ? null : (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <RadioInput
            name="investmentIndicator"
            id="assetFormRadioInput1"
            value="IPCA"
            checked={props.state.investmentIndicator === "IPCA"}
            onChange={props.handleChange}
            label="IPCA"
          />
          <RadioInput
            name="investmentIndicator"
            id="assetFormRadioInput3"
            value="CDI"
            checked={props.state.investmentIndicator === "CDI"}
            onChange={props.handleChange}
            label="CDI"
          />
          <RadioInput
            name="investmentIndicator"
            id="assetFormRadioInput2"
            value="Selic"
            checked={props.state.investmentIndicator === "Selic"}
            onChange={props.handleChange}
            label="Selic"
          />
        </div>
      )}
      <div className="asset-form-couple-div">
        <TextInput
          type="text"
          id="assetFormAssetName"
          className="input-margin-bottom"
          label="Asset name"
          name="assetName"
          onChange={props.handleChange}
          value={props.state.assetName}
          required
        />
        <TextInput
          type="text"
          id="assetFormAssetSymbol"
          className="input-margin-bottom"
          label="Asset symbol"
          name="assetSymbol"
          placeholder="ex: AAPL"
          onChange={props.handleChange}
          value={props.state.assetSymbol}
          required
        />
      </div>
      <div className="asset-form-couple-div">
        <TextInput
          type="number"
          min="0"
          step="0.001"
          id="assetFormQuantity"
          className="input-margin-bottom"
          label="Quantity"
          name="quantity"
          onChange={props.handleChange}
          value={props.state.quantity}
          required
        />
        <TextInput
          type="number"
          min="0"
          step="0.01"
          id="assetFormUnitPrice"
          className="input-margin-bottom"
          label="Unit Price"
          name="unitPrice"
          onChange={props.handleChange}
          value={props.state.unitPrice}
          required
        />
      </div>
      <TextInput
        type="date"
        id="assetFormDateBought"
        className="input-margin-bottom"
        max={getTodayDate()}
        label="Date bought"
        name="dateBought"
        onChange={props.handleChange}
        value={props.state.dateBought}
        required
      />
      <textarea
        id="assetFormAdditionalCommenting"
        name="additionalComments"
        onChange={props.handleChange}
        value={props.state.additionalComments}
        placeholder="Add any additional comment or information here"
      ></textarea>
      <button type="submit">Add asset</button>
    </form>
  );
}

export default AssetForm;
