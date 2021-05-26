import { PropTypes } from "prop-types";

function PriceRatio({
    data,
    period,
    fractionDigits,
    showIcon,
    showPlus
}) {

  const getPriceRatio = (data, period) => {


      if ( ! data || ! data.dailySnapshots.length>0)
          return;
      
      const length = data.dailySnapshots.length,
          currentPrice = data.dailySnapshots[0].value,
          initialPrice = length > period ? data.dailySnapshots[period].value : data.dailySnapshots[length - 1].value;
        
        return ((currentPrice - initialPrice) / initialPrice * 100);
    }

    const ratio = getPriceRatio(data, period).toFixed(fractionDigits);

    return (
      <span className={ratio > 0 ? "text-success" : "text-danger"}>
        {showIcon && (ratio > 0 ?
          <i className="fas fa-arrow-up text-success" /> :
          <i className="fas fa-arrow-down text-danger" />)}
          {ratio > 0 && showPlus && '+'} {ratio}%
      </span>
    )

}

PriceRatio.defaultProps = {
    data: {},
    period: 24,
    fractionDigits: 1,
    showIcon: true,
    showPlus: false
};
  
PriceRatio.propTypes = {
    data: PropTypes.object,
    period: PropTypes.number,
    fractionDigits: PropTypes.number,
    showIcon: PropTypes.bool,
    showPlus: PropTypes.bool
};

export default PriceRatio;