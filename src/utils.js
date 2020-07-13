export const msNormalize = (ms) => {
  const msec = String(ms % 10000);
  const sec = String(Math.floor(ms / 10000));
  return `${sec.padStart(2, '0')} : ${msec.padStart(2, '0').slice(0, 2)}`;
};
