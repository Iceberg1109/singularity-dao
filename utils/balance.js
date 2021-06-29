import BigNumber from "bignumber.js";

/**
 *
 * @param {BigNumber | String | Number} balance
 * @param {BigNumber | String | Number} decimals
 * @param {Number} precision
 * @returns {String} fraction
 */
export const toFraction = (balance, decimals, precision = 8) => {
  const numerator = BigNumber(balance.toString());
  const denominator = BigNumber(10).exponentiatedBy(decimals);
  const value = numerator.dividedBy(denominator).decimalPlaces(precision).toString();
  return value;
};

/**
 * 
 * @param {BigNumber | String | Number} balance 
 * @param {BigNumber | String | Number} decimals 
 * @returns {String} balance
 */
export const fromFraction = (balance, decimals) => {
  balance = BigNumber(balance.toString());
  decimals = BigNumber(10).exponentiatedBy(decimals);
  return balance.multipliedBy(decimals).toString();
};
