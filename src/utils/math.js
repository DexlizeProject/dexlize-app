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

export const sellKuybeyFeePrecent = raw => {
    let feeRatio = 0;
    const BASE_FEE_RATIO = 0.45; // 45%
    const START = 1538395200; // 10/01/2018 @ 12:00pm (UTC)
    const END =   1541073600; // 11/01/2018 @ 12:00pm (UTC)

    const NOW = (Date.now() / 1000);
    if (NOW <= START) {
        feeRatio = BASE_FEE_RATIO;
    } else if (now < END) {
        feeRatio = BASE_FEE_RATIO * (END-NOW) / (END-START);
    }

    return (feeRatio * 100).toFixed(0);
};

export const assetTransform = raw => {
    return parseInt(raw.substring(0, raw.length - 4) * 10000 + 0.5);
};
