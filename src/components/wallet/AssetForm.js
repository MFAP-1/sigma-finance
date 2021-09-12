import React from "react";

import TextInput from "../forms/TextInput";
import SelectInput from "../forms/SelectInput";

import "./assetForm.css";

function AssetForm(props) {
  return (
    <form onSubmit={props.handleSubmit}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
        <SelectInput
          name="assetType"
          id="selectInputAssetType"
          label="Asset Type"
          value={props.state.assetType}
          onChange={props.handleChange}
          items={[
            "Stock",
            "Stock Fund",
            "Bond",
            "Savings account",
            "ETFs",
            "Other",
          ]}
          placeholder="Select Asset Type"
          required
        />
        <SelectInput
          name="currency"
          id="selectInputCurrency"
          value={props.state.currency}
          onChange={props.handleChange}
          items={["USD", "EUR", "BRL"]}
          placeholder="Currency"
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
          type="text"
          id="assetFormAssetName"
          label="Name of the asset"
          name="assetName"
          onChange={props.handleChange}
          value={props.state.assetName}
          required
        />
        <TextInput
          type="text"
          id="assetFormAssetSymbol"
          label="Asset symbol"
          name="assetSymbol"
          placeholder="ex: AAPL"
          onChange={props.handleChange}
          value={props.state.assetSymbol}
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
          type="number"
          min="0"
          id="assetFormQuantity"
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
