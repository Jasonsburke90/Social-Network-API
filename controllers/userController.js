const { ObjectId } = require("mongoose").Types;
const res = require("express/lib/response");
const { User, Thought } = require("../models");

module.exports = {
  // Get all users
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  //  Get a single user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__v")
      .then(async (user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json(user)
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  // Delete a User
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then(() => res.json({ message: "user deleted" }))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // Update a user
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    ).then((user) =>
      !user
        ? res.status(404).json({ message: "no user with this id!" })
        : res.json(user)
    );
  },
  // add a friend to a student
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $push: { friends: { _id: req.params.friendId } } },
      { runValidators: true, new: true }
    ).then((user) =>
      !user
        ? res.status(404).json({ message: "no user with this id!" })
        : res.json(user)
    );
  },
  // delete a friend from a student
  deleteFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    ).then((user) =>
      !user
        ? res.status(404).json({ message: "no user with this id!" })
        : res.json(user)
    );
  },
};
