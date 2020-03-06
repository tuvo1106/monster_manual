module.exports = fn => {
  // anon func
  return (req, res, next) => {
    fn(req, res, next).catch(next)
  }
}
