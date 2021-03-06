const router = require('express').Router()
const {User, Order} = require('../db/models')
module.exports = router

//default route is /api/users
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })

    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId)

    res.json(user)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const email = req.body.email
    const password = req.body.password
    const username = req.body.email

    const newUser = await User.create({password, email, username})
    res.json(newUser)
  } catch (err) {
    next(err)
  }
})

router.put('/:userId', async (req, res, next) => {
  try {
    const user = await User.update(req.body, {
      where: {
        id: req.params.userId
      }
    })

    res.json(user)
  } catch (err) {
    next(err)
  }
})

// destroy user, order, and order items
// router.delete('/:userId', async (req, res, next) => {
//   try {
//     const Order = await Order.destroy(
//       {
//         where: {
//           id: req.params.userId
//       }
//     })

//     res.json(user)
//   } catch(err) {
//     next(err)
//   }
// })
