// getFriends.js
var friendModels = require('../../models/friendModels');

module.exports = (req, res) => {
	if (!req.body.userId || !req.body.search) {
		res.status(400).send('Invalid Input');
		return;
	}
	friendModels.saveEvent(req.body.userId, req.body.search)
	.then( friends => {
		res.send(200).send(friends);
	})
	.catch( error => {
		console.log(error);
		res.status(400).send('An error occured');
	})
}