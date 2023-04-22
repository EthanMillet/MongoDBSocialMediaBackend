const { ObjectID } = require('mongoose').Types;
const { User, Thought } = require('../models');


module.exports = {

async getUsers(req, res) {
    try {
        const users = await User.find();
        const userObj = { users }
        res.json(userObj)
    } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
},

async getSingleUser(req, res) {
    try {
        const user = await User.findOne({ _id: req.params.userId })

        if(!user) {
            return res.status(404).json({ message: 'No user with that Id' })
        }

        res.json({ user })

    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
      }
},

async createUser(req, res) {
    try {
        const user = await User.create(req.body);
        res.json(user)
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
      }
},

async updateUser(req, res) {
    try {
        const user = await User.findOneAndUpdate(req.body);
        if(!user) {
            return res.status(404).json({ message: 'No user with that Id' })
        }
        res.json({ user })
    }catch (err) {
        console.log(err);
        return res.status(500).json(err);
      }
},

async deleteUser(req, res) {
    try {
        const user = await User.findByIdAndDelete({ _id: req.params.userId });
        if(!user) {
            return res.status(404).json({ message: 'No user with that Id' })
        }
        res.json({ user })
    }catch (err) {
        console.log(err);
        return res.status(500).json(err);
      }
},


}