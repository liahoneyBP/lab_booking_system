const Lab = require('./lab')
const User = require('./user')

Lab.deleteMany()
  .then(() => {
    console.log('Deleted rooms')
    process.exit()
  })

User.deleteMany()
  .then(() => {
    console.log('Deleted users')
    process.exit()
  })