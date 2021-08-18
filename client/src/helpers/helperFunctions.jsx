function filterExpById(array, id) {
  let res

  array.forEach((item) => {
    if (item.id === id) res = item
  })
  return res
}

module.exports = {
  filterExpById,
}
