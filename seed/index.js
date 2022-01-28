const db = require('../db')
const Ticket = require('../models/Ticket')
const BugTicket = require('../models/BugTicket')
const PlanningTicket = require('../models/PlanningTicket')


const bugTickets = [
    {
        name: "Roger",
        description: "dusnt werk",
        error: "cant see",
        process: "dont care"
    },
    {
        name: "Morris",
        description: "dusnt werk",
        error: "cant see",
        process: "dont care at all"
    }
]

const tickets = [
    {
        type: "Planning",
        name: "Lauren",
        description: "I'm working to conceptualize my models."
    },
    {
        type: "Planning",
        name: "Elizabeth",
        description: "I'm trying to think about post-MVP concerns."
    }
]

const main = async () => {
    const deleted = await Ticket.deleteMany({})
    console.log(deleted)
    const bugs = await BugTicket.create(bugTickets)
    console.log(bugs)
    const plans = await Ticket.create(tickets)
    console.log(plans)
    process.exit()
}

main()