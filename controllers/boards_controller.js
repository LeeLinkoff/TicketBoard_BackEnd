const { Router } = require('express')
const router = Router()

const { Ticket, BugTicket, PlanningTicket } = require('../models')

router.get('/:group', async (req,res) => {
    const group = req.params.group
    try {
        const openPlans = await PlanningTicket.find({group: req.params.group, open: true}).sort({createdAt: 'asc'}).lean()
        const openBugs = await BugTicket.find({group: req.params.group, open: true}).sort({createdAt: 'asc'}).lean()
        const resolved = await Ticket.find({group: req.params.group, open: false}).sort({updatedAt: 'desc'})
        res.json({
            open: [...openPlans, ... openBugs],
            resolved
        })
    } catch (err) {
        console.log(err)
        res.send(500)
    }
})

module.exports = router