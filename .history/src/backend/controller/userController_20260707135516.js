const User = require("../model/User")

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password")
    res.json(users)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const updateUserRole = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }
    user.role = req.body.role || user.role
    const updatedUser = await user.save()
    res.json({ _id: updatedUser._id, name: updatedUser.name, email: updatedUser.email, role: updatedUser.role })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }
    await user.deleteOne()
    res.json({ message: "User deleted" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = { getAllUsers, updateUserRole, deleteUser }
