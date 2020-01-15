// lib/utils.js

export const calcProportion = (value, sourceRange, destRange) => {
/* helper function
    * sourceRange.max, min  provides basis for the ratio
    *  ex. scale if the value is within max or min
    *      apply that to a destRange max,min
    */
  const sourceDiff = sourceRange.max - sourceRange.min
  if (value > sourceRange.max) {
    return destRange.max
  } else if (value < sourceRange.min) {
    return destRange.min
  } else {
    return (value - sourceRange.min) / sourceDiff *
      (destRange.max - destRange.min) + destRange.min
  }
}
