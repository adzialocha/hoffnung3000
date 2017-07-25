export default function randomId() {
  return `new-${Date.now()}-${Math.random().toString(36).substring(7)}`
}
