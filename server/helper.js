exports.get_percentile_value = (in_list, p) => {
  const p_idx = Math.round(p * in_list.length / 100) - 1
  return in_list[p_idx]
}

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
