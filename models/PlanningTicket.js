const mongoose = require('mongoose')
const BaseTicket = require('./Ticket')

module.exports = BaseTicket.discriminator('Planning', new mongoose.Schema({}))