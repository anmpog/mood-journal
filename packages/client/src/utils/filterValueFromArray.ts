function filterValueFromArray<T, K extends keyof T>(
  arr: T[],
  fieldToFilterBy: keyof T,
  valueToFilter: T[K],
) {
  return arr.filter((value) => {
    return value[fieldToFilterBy] !== valueToFilter
  })
}

export default filterValueFromArray
