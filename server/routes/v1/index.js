const adminRouter = require('./adminRoutes')
const bookingRouter = require('./bookingRoutes')
const carRouter = require('./carRoutes')
const ownerRouter = require('./ownerRoutes')
const reviewRouter = require('./reviewRoutes')
const userRouter = require('./userRoutes')

const v1Router = require('express').Router()

v1Router.use("/user", userRouter)
v1Router.use("/admin", adminRouter)
v1Router.use("/owner", ownerRouter)
v1Router.use("/car", carRouter)
v1Router.use("/booking", bookingRouter)
v1Router.use("/review", reviewRouter)

module.exports = v1Router