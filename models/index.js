const db = require('../db')

module.exports = {
    Ticket: require('./Ticket'),
    BugTicket: require('./BugTicket'),
    PlanningTicket: require('./PlanningTicket')
}