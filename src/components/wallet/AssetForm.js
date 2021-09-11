import React from "react";

import TextInput from "../forms/TextInput";

function AssetForm(props) {
  return (
    <form onSubmit={props.handleSubmit}>
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
        />
        <TextInput
          type="text"
          id="assetFormAssetSymbol"
          label="Asset symbol"
          name="assetSymbol"
          placeholder="ex: AAPL"
          onChange={props.handleChange}
          value={props.state.assetSymbol}
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
        />
        <TextInput
          type="number"
          min="0"
          id="assetFormUnitPrice"
          label="Unit Price"
          name="unitPrice"
          onChange={props.handleChange}
          value={props.state.unitPrice}
        />
      </div>
      <TextInput
        type="date"
        id="assetFormDateBought"
        label="Date bought"
        name="dateBought"
        onChange={props.handleChange}
        value={props.state.dateBought}
      />
      {/* <CheckboxInput
        id="characterFormDebt"
        label="Is in debt?"
        name="debt"
        onChange={props.handleChange}
        value={props.state.debt}
      /> */}
      <button type="submit">Add asset</button>
    </form>
  );
}

export default AssetForm;
