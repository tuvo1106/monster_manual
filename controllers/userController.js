const users = []

exports.getAllUsers = (req, res) => {
  res
    .status(200)
    .json({ status: "success", results: users.length, data: users })
}

exports.getUser = (req, res) => {
  user = users.find(e => e.name === req.params.id)
  res.status(200).json({ status: "success", data: user })
}

exports.createUser = (req, res) => {
  res.status(201).json({ status: "success" })
}

exports.updateUser = (req, res) => {
  res.status(200).json({ status: "success", data: "modified" })
}

exports.deleteUser = (req, res) => {
  res.status(204).json({ status: "success", data: null })
}
