
/*
 * calculate percentile by using "The nearest-rank method"
 * - in_list is non-decreasing array
 * - p is percentile threshold
 */
exports.get_percentile_value = (in_list, p) => {
  if (p === 0)
    return in_list[0]
  else {
    const p_idx = Math.ceil(p * in_list.length / 100) - 1
    return in_list[p_idx]
  }
}

/*
 * - append a number to sorted array
 * - find the point to append and do splice
 */
exports.append_to_sorted_array = (array, value) => {
  let low = 0
  let high = array.length

  // find the append point in binary search style
  while (low < high) {
    const mid = low + high >>> 1
    if (array[mid] < value) low = mid + 1
    else high = mid
  }
  array.splice(low, 0, value)
}
