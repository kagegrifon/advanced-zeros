module.exports = function getZerosCount(number, base) {
  const getSimpleFactors = (n) => {
    const factors = [];
    let i = 2;
    while (i ** 2 <= n) {
      if (n % i === 0) {
        factors.push(i);
        n /= i;
      } else {
        i += 1;
      }
    }
    if (n > 1) {
      factors.push(n);
    }
    return factors;
  };

  const calcFactorAmount = (num, factor) => {
    let factorAmount = 0;
    const powLimit = Math.floor(Math.log(num) / Math.log(factor));
    for (let i = 1; i <= powLimit; i++) {
      factorAmount += Math.floor(num / (factor ** i));
    }
    return factorAmount;
  };

  const simpleBaseFactors = getSimpleFactors(base);

  const simpleBaseFactorsAmount = {};
  simpleBaseFactors.forEach(factor =>
    simpleBaseFactorsAmount[factor] = simpleBaseFactorsAmount[factor] + 1 || 1
  );

  const factors = Object.keys(simpleBaseFactorsAmount);
  const factorsToZerosAmounts = factors.map(factor => {
    const amount = calcFactorAmount(number, +factor);
    const zerosAmount = Math.floor(amount / simpleBaseFactorsAmount[factor]);
    return zerosAmount;
  });

  const zeros = Math.min(...factorsToZerosAmounts);
  
  return zeros;
}