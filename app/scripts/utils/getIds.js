export default function getIds(arr) {
  return arr ? arr.map(item => item.id) : []
}
