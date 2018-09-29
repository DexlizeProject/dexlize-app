export const feePercent = raw => {
  const {
    init_fee_percent,
    base_fee_percent,
    start_time,
    lock_up_period
  } = raw;
  const now = (Date.now() / 1000);
  if ((init_fee_percent === base_fee_percent) || (now >= start_time + lock_up_period)) return base_fee_percent;

  return Math.ceil(parseFloat(2 * lock_up_period * (init_fee_percent- base_fee_percent) / ((now - start_time) + lock_up_period) + 2 * base_fee_percent - init_fee_percent)).toFixed(0);
};

export const hexTransform = raw => {
  return Number('0x' + raw.slice(2).match(/\w{2}/g).reverse().join('')) / 10000;
};

export const assetTransform = raw => {
    return parseInt(raw.substring(0, raw.length - 4) * 10000 + 0.5);
};
