/**
 * Function to merge objects (right into left)
 *
 * @param left Left object
 * @param right Right object
 */
const mergeObjects = (left, right) => {
  if (!(left instanceof Object) || !(right instanceof Object)) {
    return
  }

  for (const key of Object.keys(right)) {
    if (left[key] === undefined) {
      left[key] = right[key]
    } else {
      mergeObjects(left[key], right[key])
    }
  }
}

/**
 * Function to merge an array of objects
 *
 * @param objects Objects
 * @return {{}} Merging result
 */
const merge = (...objects) => {
  const result = {}

  for (const object of objects) {
    mergeObjects(result, object)
  }

  return result
}

export { merge }
