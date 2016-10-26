// checkIn.js
var Event = require('../../schemas/eventsSchema');

module.exports = (eventId, userId) => {
	return Event.findOneAndUpdate({
		'_id': eventId
	}, {
		$push: {
			'checkedInUsers': userId
		}
	}).exec();
}