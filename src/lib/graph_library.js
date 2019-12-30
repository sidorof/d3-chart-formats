// graph_library.js
/*
 * This is where extraneous helper functions will be implemented.
 */

const createTranslate = (leftValues, topValues) => {
  const prefix = 'translate( '
  return prefix + leftValues + ', ' + topValues + ' )'
}

export { createTranslate }
