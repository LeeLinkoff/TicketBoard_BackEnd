const mongoose = require('mongoose')
const {Schema} = mongoose

const TicketSchema = new Schema({
    group: {type: String, required: true},
    type: {type: String, required: true, enum: ["Bug","Planning"]},
    name: {type: String, required: true},
    description: {type: String, required: true},
    open: {type: Boolean, required: true, default: true},
    notes: [new Schema({
        author: { type: String, required: true },
        content: { type: String, required: true }
    }, {timestamps: {createdAt: 'createdAt'}})]
}, {timestamps: true, toJSON: {virtuals: true}, discriminatorKey: 'type'})

TicketSchema.virtual('resolver').get(function(){
    return !this.open && this.notes.length ?
        this.notes[0].author :
        false
})

module.exports = mongoose.model('Ticket', TicketSchema) 
// , {discriminatorKey: 'type', collection: 'tickets'}
