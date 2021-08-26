// @ts-ignore
import { api, data } from '@serverless/cloud'
import { Destination, DestinationManager } from '../../managers/destination-manager'
import { ReadableUser, UserManager } from '../../managers/user-manager'
import { BookingErrors } from "../../managers/booking-manager";

const TEST_PASSWORD = 'Testing123'

let destination1: Destination
let destination2: Destination

let user1: ReadableUser
let user1Token: string

beforeAll(async () => {
    destination1 = await DestinationManager.createDestination({
       name: 'Test House',
       state: 'TX',
       city: 'Testville',
       description: 'a test house',
       costPerNightInCents: 2000,
       maxGuests: 2
    })

    destination2 = await DestinationManager.createDestination({
        name: 'Test Villa',
        state: 'TN',
        city: 'Testville',
        description: 'another test house',
        costPerNightInCents: 2000,
        maxGuests: 2
    })

    await data.set(
        `destination:${destination2.id}`,
        { available: false },
        {
            label2: `available:false`
        }
    )

    const { user, token } = await UserManager.createUser({
       firstName: 'Testy',
       lastName: 'McGee',
       email: 'foo@bar.com',
       password: TEST_PASSWORD
    })
    user1 = user
    user1Token = token
})

afterAll(async () => {
    await data.remove(`destination:${destination1.id}`)
    await data.remove(`destination:${destination2.id}`)
    await data.remove(`user:${user1.id}`)
})

describe('API Tests', () => {
    describe('Destination Routes', () => {
        test('Should return a destination', async () => {
            const { body } = await api.get(`/destination/${destination1.id}`).invoke()
            expect(body.destination).toBeTruthy()
            expect(body.destination.city).toEqual('Testville')
        })

        test('Should return list of available destinations', async () => {
            const { body } = await api.get('/destinations/available').invoke()
            expect(body.destinations.length).toEqual(1)
        })

        test('Should return list of all destinations', async () => {
            const { body } = await api.get('/destinations').invoke()
            expect(body.destinations.length).toEqual(2)
        })
    })

    describe('Booking Routes', () => {
        let bookingId: string

        afterAll(async () => {
            await data.remove(`booking:${bookingId}`)
        })

        test('Should create a new booking', async () => {
            const { body } = await api.put(`/booking/new?authorization=${user1Token}`).invoke({
                startDate: '2021-07-25',
                endDate: '2021-07-27',
                destinationId: destination1.id
            })
            expect(body.booking.id).toBeTruthy()
            bookingId = body.booking.id
        })

        test("Should return a user's bookings", async () => {
            const { body } = await api.get(`/booking/list?authorization=${user1Token}`).invoke()
            expect(body.bookings.length).toEqual(1)
        })

        test('Should not allow a subsequent booking in the same dates', async () => {
            const { body, status } = await api.put(`/booking/new?authorization=${user1Token}`).invoke({
                startDate: '2021-07-26',
                endDate: '2021-07-29',
                destinationId: destination1.id
            })

            expect(status).toEqual(400)
            expect(body.message).toEqual(BookingErrors.DESTINATION_UNAVAILABLE_FOR_DATE_RANGE)
        })

        test('Should not allow a booking for an unavailable destination', async () => {
            const { body, status } = await api.put(`/booking/new?authorization=${user1Token}`).invoke({
                startDate: '2021-07-25',
                endDate: '2021-07-27',
                destinationId: destination2.id
            })

            expect(status).toEqual(400)
            expect(body.message).toEqual(BookingErrors.UNAVAILABLE_DESTINATION)
        })
    })
})
