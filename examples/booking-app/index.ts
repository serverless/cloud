import { api, Request } from '@serverless/cloud'
import { BookingErrors, BookingManager } from './managers/booking-manager'
import { DestinationErrors, DestinationManager } from './managers/destination-manager'
import { UserErrors, UserManager } from './managers/user-manager'
import { Auth } from './auth'

type RequestWithToken = Request & {
  decoded: {
    id: string
  }
}

api.use('/booking/*', Auth.middleware)

api.post('/signup', async (req, res) => {
  const body = req.body
  if (!body) {
    return res.status(400).send({
      message: 'Body is required!'
    })
  }

  if (!body.email || !body.password || !body.firstName || !body.lastName) {
    return res.status(400).send({
      message: 'Email, password, firstName, lastName is required'
    })
  }

  try {
    const { user, token } = await UserManager.createUser(body)
    return res.status(200).send({
      user,
      token
    })
  } catch (e) {
    if (UserErrors[e.message]) {
      return res.status(400).send({
        message: e.message
      })
    }
    return res.status(500).send({
      message: e.message
    })
  }
})

api.post('/login', async (req, res) => {
  const body = req.body

  if (!body) {
    return res.status(400).send({
      message: 'Body is required!'
    })
  }

  if (!body.email || !body.password) {
    return res.status(400).send({
      message: 'Email and password are required'
    })
  }

  try {
    const token = await UserManager.loginUser(body)

    if (!token) {
      return res.status(404).send({
        message: `User with ${body.email} not found!`
      })
    }

    return res.status(200).send({ token })
  } catch (e) {
    if (e.message === 'Incorrect password' || e.message === 'User not found') {
      return res.status(400).send({
        message: 'Incorrect username or password'
      })
    }
    return res.status(500).send({
      message: e.message
    })
  } finally {}
})

api.get('/destination/:id/cost', async (req, res) => {
  const destinationId = req.params.id
  const startDate = String(req.query.startDate)
  const endDate = String(req.query.endDate)

  if (!startDate || !endDate) {
    return res.status(400).send({
      message: 'startDate and endDate must be defined in YYYY-MM-DD format'
    })
  }

  try {
    const { dollarString } = await DestinationManager.calculateCost(destinationId, startDate, endDate)
    return res.status(200).send({
      cost: dollarString
    })
  } catch (e) {
    if (DestinationErrors[e.message]) {
      if (e.message === DestinationErrors.NOT_FOUND) {
        return res.sendStatus(404)
      }
      return res.status(400).send({
        message: e.message
      })
    }
    return res.status(500).send({
      message: e.message
    })
  }
})

api.get('/destination/:id', async (req, res) => {
  const destinationId = req.params.id
  const destination = await DestinationManager.getById(destinationId)
  if (!destination) {
    return res.sendStatus(404)
  }
  return res.status(200).send({ destination })
})


api.get('/destinations', async (req, res) => {
  const destinations = await DestinationManager.getAll()
  return res.send({
    destinations
  })
})

api.get('/destinations/available', async (req, res) => {
  const destinations = await DestinationManager.getAvailable()
  return res.send({
    destinations
  })
})

api.get('/booking/list', async (req: RequestWithToken, res) => {
  const userId = req.decoded.id

  if (!userId) {
    return res.status(500).send({
      message: 'Something went wrong!'
    })
  }

  try {
    const userBookings = await BookingManager.getBookingsForUser(userId)
    return res.status(200).send({
      bookings: userBookings
    })
  } catch (e) {
    return res.status(500).send({
      message: e.message
    })
  }
})

api.put('/booking/new', async (req: RequestWithToken, res) => {
  const body = req.body
  if (!body) {
    return res.status(400).send({
      message: 'No body supplied'
    })
  }

  const userId = req.decoded.id


  try {
    const bookingParams = { ...body, userId }
    const createdBooking = await BookingManager.createBookingForDestination(bookingParams)
    return res.status(200).send({
      booking: createdBooking
    })
  } catch (e) {
    if (BookingErrors[e.message]) {
      return res.status(400).send({
        message: e.message
      })
    }
    return res.status(500).send({
      message: 'Something went wrong'
    })
  } finally {}
})

api.delete('/booking/:id', async (req: RequestWithToken, res) => {
  const userId = req.decoded.id
  const bookingId = req.params.id

  const booking = await BookingManager.getById(bookingId)

  if (!booking) {
    return res.status(404).send({
      message: `${bookingId} does not exist`
    })
  }

  if (booking.userId !== userId) {
    return res.status(400).send({
      message: 'Unauthorized deletion'
    })
  }

  await BookingManager.deleteById(bookingId)
  const userBookings = await BookingManager.getBookingsForUser(userId)
  return res.status(200).send({
    bookings: userBookings
  })
})

// eslint-disable-next-line
api.use((err, req, res, next) => {

  if (!err.statusCode) {
    err.statusCode = 500;
  }

  const error = {
    name: err.name,
    statusCode: err.statusCode,
    message: err.message,
  };

  res.status(err.statusCode).json(error);
});

