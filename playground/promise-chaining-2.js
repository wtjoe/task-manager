require('../src/db/mongoose')
const Task = require('../src/models/task')


// Task.findByIdAndDelete('64948d158f840079d5968b72').then((task) => {
//     console.log(task)
//     return Task.countDocuments({ completed: false })
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })

const deleteTaskAndCount = async (id) => {
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({ completed: false })
    return count
}

deleteTaskAndCount('64b450ba8f54e39854782043').then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})