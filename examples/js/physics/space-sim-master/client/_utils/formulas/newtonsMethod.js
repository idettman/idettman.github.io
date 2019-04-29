/**
 * For iteratively finding the root of a function (input that resolves to 0)
 * @param  value     initial value
 * @param  step      for f: v => v - f(v) / f'(v)
 * @param  options
 * @param  meta
 * @return {number}
 */
const newtonsMethod = (value, step, options, meta) => {
  const {epsilon = 1e-6, maxIterations = 30} = options
  let {currentIteration = 0} = meta
  currentIteration += 1
  if (Math.abs(value) < epsilon || currentIteration >= maxIterations) return value
  return newtonsMethod(step(value), step, options, {currentIteration})
}
