exports.get_percentile_value = (in_list, p) => {

}


exports.append_to_sorted_array = (array, value) => {
  let low = 0
  let high = array.length

  while (low < high) {
    const mid = low + high >>> 1
    if (array[mid] < value) low = mid + 1
    else high = mid
  }
  return array.splice(low, 0, value)
}
