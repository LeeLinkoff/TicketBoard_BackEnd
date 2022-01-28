const { Router } = require('express')
const router = Router()

const { Ticket, BugTicket, PlanningTicket } = require('../models')

router.get('/', async (req, res) => {
    try {
        const tix = await Ticket.find()
        res.status(200).json(tix)
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
})

router.route('/:group')
    .post(async (req, res) => {
        const ticket = {
            ...req.body,
            group: req.body.group || req.params.group
        }
        try {
            const newTicket = await Ticket.create(ticket)
            res.status(201).json(newTicket)
        } catch (err) {
            console.log(err)
            res.sendStatus(400)
        }
    })

router.patch('/:id', async (req, res) => {
    try {
        const note = {
            author: req.body.resolver,
            content: req.body.content || 'resolved'
        }

        console.log('Adding note:', note)
        
        const resolvedTicket = await Ticket.findByIdAndUpdate(
            req.params.id, 
            { 
                $set: {open: false}, 
                $push: { notes: { $each: [note], $position: 0} }
            }, 
            {new: true}
        )
        console.log(resolvedTicket)
        res.status(201).json(resolvedTicket)
    } catch (err) {
        res.status(500).send({message: err.message})
    }
})

router.patch('/:id/comment', async (req, res) => {
    try {
        const note = {
            author: req.body.resolver,
            content: req.body.content || 'resolved'
        }

        console.log('Adding note:', note)
        
        const commentedTicket = await Ticket.findByIdAndUpdate(
            req.params.id, 
            { 
                $push: { notes: { $each: [note], $position: 0} }
            }, 
            {new: true}
        )
        console.log(commentedTicket)
        res.status(201).json(commentedTicket)
    } catch (err) {
        res.status(500).send({message: err.message})
    }
})

router.patch('/:id/reopen', async (req, res) => {
    console.log(req.body)
    try {
        const resolvedTicket = await Ticket.findByIdAndUpdate(req.params.id, {$set: {open: true}}, {new: true})
        console.log(resolvedTicket)
        res.status(201).send(resolvedTicket)
    } catch (error) {
        console.log(error)
        res.status(500).send({message: err.message})
    }
})

module.exports = router