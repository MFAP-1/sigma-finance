import React from "react";

import LoadingAnimationLinear from "../../loading/LoadingAnimationLinear";

import formatMoney from "../../../scripts/formatMoney";
import sumCurrencies from "../../../scripts/sumCurrencies";

class TotalPortfolioValue extends React.Component {
  state = {
    totalValue: 0,
    loading: false,
    standBy: true,
  };

  componentDidUpdate = async (prevProps, prevState) => {
    if (prevProps.currency !== this.props.currency) {
      this.setState({ standBy: false, loading: true });
      const total = await sumCurrencies(
        this.props.totalValueUSD,
        this.props.totalValueBRL,
        this.props.totalValueEUR,
        this.props.currency
      );
      this.setState({ totalValue: total, loading: false });
    }
  };

  render() {
    return (
      <td>
        {this.state.standBy ? (
          "-"
        ) : this.state.loading ? (
          <LoadingAnimationLinear color={"white"} />
        ) : (
          formatMoney(this.state.totalValue, this.props.currency)
        )}
      </td>
    );
  }
}

export default TotalPortfolioValue;
