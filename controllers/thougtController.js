const { ObjectID } = require('mongoose').Types;
const { User, Thought } = require('../models');


module.exports = {

async getThought(req, res) {
    try {
        const thoughts = await Thought.find();
        const thoughtsObj = { thoughts }
        res.json(thoughtsObj)
    } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
},

async getSingleThought(req, res) {
    try {
        const user = await Thought.findOne({ _id: req.params.userId })

        if(!user) {
            return res.status(404).json({ message: 'No user with that Id' })
        }

        res.json({ user })

    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
      }
},

async createThought(req, res) {
    try {
        const thought = await Thought.create(req.body);

        const user = await User.findOneAndUpdate({_id: req.params.userId}, {"$push": {thoughts: thought.id}})
        console.log(thought.id)
        
        res.json(thought)
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
      }
},

async updateThought(req, res) {
    try {
        const user = await Thought.findOneAndUpdate(req.body);
        if(!user) {
            return res.status(404).json({ message: 'No user with that Id' })
        }
        res.json({ user })
    }catch (err) {
        console.log(err);
        return res.status(500).json(err);
      }
},

async deleteThought(req, res) {
    try {
        const user = await Thought.findByIdAndDelete({ _id: req.params.userId });
        if(!user) {
            return res.status(404).json({ message: 'No user with that Id' })
        }
        res.json({ user })
    }catch (err) {
        console.log(err);
        return res.status(500).json(err);
      }
},
async createReaction(req, res) {
    try {
        const user = await Thought.findOneAndUpdate(
            { _id: req.params.studentId },
            { $addToSet: { reactions: req.body }},
            { runValidators: true, new: true }
            );
            if(!user) {
                return res.status(404).json({ message: 'No thought with that Id' })
            }
            res.json(user)
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
      }
},
async deleteReaction(req, res) {
    try {
        const user = await Thought.findOneAndUpdate(
            { _id: req.params.studentId },
            { $pull: { reactions: { reactionId: req.params.reactionId }}},
            { runValidators: true, new: true }
            );
            if(!user) {
                return res.status(404).json({ message: 'No thought with that Id' })
            }
        res.json({ user })
    }catch (err) {
        console.log(err);
        return res.status(500).json(err);
      }
},
}