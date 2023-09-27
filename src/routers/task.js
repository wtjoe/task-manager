const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
const Task = require('../models/task')


router.post('/tasks', auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })

    try {
        await task.save()
        res.status(201).send(task)
    } catch(e) {
        res.status(400).send(e)
    }
})

router.get('/tasks', auth, async (req, res) => {

    try {
        await req.user.populate(['tasks'])
        res.send(req.user.tasks)
    } catch (e) {
        res.status(500).send()
        console.log(e)
    }

})

router.get('/tasks/:id', auth, async (req, res) => {

    try {
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id })
        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch(e) {
        res.status(500).send()
    }
})



router.patch('/tasks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(404).send({ error: 'Invalid updates provided!'})
    }

    try {
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id })

        if(!task) {
            return res.status(404).send()
        }

        updates.forEach((update) => task[update] = req.body[update])

        await task.save()

        res.send(task)
    } catch(e) {
        res.status(400).send()
        console.log(e)
    }
})



router.delete('/tasks/:id', auth, async (req, res) => {
    try {
    
        if(!task) {
            return res.status(404).send()
        }

        const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id })

        res.send(task)

    } catch(e) {
        res.status(500).send()
        console.log(e)
    }
})

module.exports = router