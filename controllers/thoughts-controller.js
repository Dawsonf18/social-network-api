const { Thoughts, User } = require('../models')

const thoughtsController = {
    // add 'thoughts' (comments) to user
    addThought({ params, body }, res) {
        console.log(params)
            .then(({ _id }) => {
                return User.findByIdAndUpdate(
                    { _id: params.thoughtsId },
                    { $push: { thoughts: _id } },
                    { new: true }
                );
            })
            .then(dbUserData => {
                console.log(dbUserData);
                if (!dbUserData) {
                    res.status(404).json({ message: 'No User found with this ID!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },

    addReaction({ params, body }, res) {
        User.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body } },
            { new: true, runValidators: true }
        )
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No User found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },

    //remove thought
    removeThought({ params }, res) {
        Thoughts.findOneAndDelete({ _id: params.thoughtId })
        .then(deletedThought => {
            if (!deletedThought) {
                return res.status(404).json({ message: 'No Thought with that id'})
            }
            return User.findOneAndUpdate(
                { _id: params.UserId },
                { $pull: { thoughts: params.thoughtId } },
                { new: true }
            );
        })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this ID'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },
        //remove reaction
        removeReaction({ params }, res) {
            Thoughts.findOneAndUpdate(
                { _id: params.thoughtId },
                { $pull: { reactions: { reactionsId: params.reactionsId} } },
                { new: true }
            )
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.json(err));
        }
};

module.exports = thoughtsController;