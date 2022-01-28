
const mongoose = require('mongoose')
const BaseTicket = require('./Ticket')

const BugTicketSchema = new mongoose.Schema({
    error: {type: String, required: true},
    process: {type: String, required: true}
})

module.exports = BaseTicket.discriminator('Bug', BugTicketSchema)