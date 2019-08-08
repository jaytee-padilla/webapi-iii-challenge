const express = require('express');
const router = express.Router();

// import database
const UserDb = require('./userDb');
const PostDb = require('../posts/postDb');

// CRUD
// POST
// add user
router.post('/', validateUser, (req, res) => {
	UserDb.insert(req.body)
		.then(user => {
			res.status(201).json({message: "User added successfully"});
		})
		.catch(error => {
			res.status(500).json({message: "Error adding user"});
		});
});

// add post by user
router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
	req.body.user_id = req.params.id;

	PostDb.insert(req.body)
	.then(post => {
		res.status(201).json({message: "Post added successfully"});
	})
	.catch(error => {
		res.status(500).json({message: "Error adding post"})
	});
});


// GET
// get users
router.get('/', (req, res) => {
	UserDb.get()
		.then(users => {
			res.status(200).json(users);
		})
		.catch(error => {
			res.status(500).json({message: "Error retrieving users"});
		})
});

// get specific user
router.get('/:id', validateUserId, (req, res) => {
	res.status(200).json(req.user);
});

// get specific user's posts
router.get('/:id/posts', validateUserId, (req, res) => {
	UserDb.getUserPosts(req.user.id)
		.then(posts => {
			res.status(200).json(posts);
		})
		.catch(error => {
			res.status(500).json({message: "Error retrieving user's posts"})
		});
});


// DELETE
// delete specific user
router.delete('/:id', validateUserId, (req, res) => {
	UserDb.remove(req.user.id)
		.then(user => {
			res.status(200).json({message: "User deleted successfully"});
		})
		.catch(error => {
			res.status(500).json({message: "Error deleting specified user"})
		});
});


// PUT
router.put('/:id', validateUser, validateUserId, (req, res) => {
	UserDb.update(req.params.id, req.body)
	.then(updatedUser => {
		res.status(200).json({message: "User updated successfully"});
	})
	.catch(error => {
		res.status(500).json({message: "Error updating specified user"});
	});
});


// ** custom middleware **
function validateUserId(req, res, next) {
	const userId = req.params.id;

	UserDb.getById(userId)
		.then(user => {
			if(!user) {
				return res.status(400).json({message: "User id does not exist"});
			}

			req.user = user;
			next();
		})
		.catch(error => {
			res.status(500).json({message: "Error retrieving specified user"});
		});
};

function validateUser(req, res, next) {
	// if the request body is missing
	// if the request body is missing the required "name" property
	if(!req.body) {
		return res.status(400).json({message: "Missing user data"});
	} else if(!req.body.name) {
		return res.status(400).json({message: "missing required name field"});
	} else {
		next();
	}
};

function validatePost(req, res, next) {
	// if the request body is missing
	// if the request body is missing the required "text" property
	if(!req.body) {
		return res.status(400).json({message: "Missing post data"});
	} else if(!req.body.text) {
		return res.status(400).json({message: "missing required text field"});
	} else {
		next();
	}
};

module.exports = router;
