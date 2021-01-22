/** @format */

const User = require('./user.js');
const Event = require('./event.js');
const Club = require('./club.js');
const Venue = require('./venue.js');
const AccessLevel = require('./accessLevel.js');
const Story = require('./story.js');
const Timetable = require('./timetable.js');

const fieldResolvers = {};

const schemas = [User, Event, Club, AccessLevel,Story, Timetable];

schemas.forEach((s) => {
	Object.assign(fieldResolvers, s.fieldResolvers);
});
module.exports = fieldResolvers;
