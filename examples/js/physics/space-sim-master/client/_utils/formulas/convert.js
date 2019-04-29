export const toUnixMS = (julianDay) =>
  (julianDay - 2440587.5) * 86400000

export const toJulianDay = (unixMS) =>
  (unixMS / 86400000) + 2440587.5
