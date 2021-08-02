// @ts-ignore
import { data } from '@serverless/cloud'
import { DateTime } from 'luxon'
import { v4 } from 'uuid'
import { prop } from 'ramda'

import { Optional } from '../util'
import { DestinationManager } from "./destination-manager";

export type Booking = {
    id: string
    userId: string
    startDate: string
    endDate: string
    totalCostInCents: number
    destinationId: string
}

export enum BookingErrors {
    MISSING_USER_ID = 'MISSING_USER_ID',
    MISSING_START_DATE = 'MISSING_START_DATE',
    MISSING_END_DATE = 'MISSING_END_DATE',
    MISSING_DESTINATION = 'MISSING_DESTINATION',
    INVALID_DESTINATION_ID = 'INVALID_DESTINATION_ID',
    INVALID_START_DATE = 'INVALID_START_DATE',
    INVALID_END_DATE = 'INVALID_END_DATE',
    UNAVAILABLE_DESTINATION = 'UNAVAILABLE_DESTINATION',
    DESTINATION_UNAVAILABLE_FOR_DATE_RANGE = 'DESTINATION_UNAVAILABLE_FOR_DATE_RANGE',
}

const parseDate = (date: string) => DateTime.fromFormat(date, 'yyyy-MM-dd', { zone: 'utc' })

const verifyNewBooking = async (params: any): Promise<Booking> => {
    if (!params.userId) {
        throw new Error(BookingErrors.MISSING_USER_ID)
    }

    if (!params.startDate) {
        throw new Error(BookingErrors.MISSING_START_DATE)
    }

    if (!params.endDate) {
        throw new Error(BookingErrors.MISSING_END_DATE)
    }

    if (!params.destinationId) {
       throw new Error(BookingErrors.MISSING_DESTINATION)
    }

    const destination = await DestinationManager.getById(params.destinationId)

    if (!destination) {
        throw new Error(BookingErrors.INVALID_DESTINATION_ID)
    }

    if (!destination.available) {
        throw new Error(BookingErrors.UNAVAILABLE_DESTINATION)
    }

    const parsedStart = BookingManager.parseDate(params.startDate)
    const parsedEnd = BookingManager.parseDate(params.endDate)

    if (!parsedStart.isValid) {
        throw new Error(BookingErrors.INVALID_START_DATE)
    }

    if (!parsedEnd.isValid) {
        throw new Error(BookingErrors.INVALID_END_DATE)
    }

    const isDateRangeBooked = await BookingManager.checkIfBookedForDateRange(params.destinationId, parsedStart.toJSON(), parsedEnd.toJSON())
    if (isDateRangeBooked) {
        throw new Error(BookingErrors.DESTINATION_UNAVAILABLE_FOR_DATE_RANGE)
    }

    const bookingId = v4()

    return {
        id: bookingId,
        userId: params.userId,
        startDate: parsedStart.toJSON(),
        endDate: parsedEnd.toJSON(),
        destinationId: params.destinationId
    } as Booking
}

const createBookingForDestination = async (params: any): Promise<Booking> => {
    const newBooking = await BookingManager.verifyNewBooking(params)
    const { cents: totalCostInCents } = await DestinationManager.calculateCost(params.destinationId, params.startDate, params.endDate)
    return await data.set(
        `booking:${newBooking.id}`,
        { ...newBooking, totalCostInCents },
        {
            label1: `user:${newBooking.userId}`,
            label2: `booking:destination:${newBooking.destinationId}`
        }
    )
}

const checkIfBookedForDateRange = async (destinationId: string, startDate: string, endDate: string): Promise<boolean> => {
    const bookingsRes = await data.getByLabel('label2', `booking:destination:${destinationId}`)
    if (!bookingsRes || !bookingsRes.items) {
        return false
    }
    const bookings = bookingsRes.items.map(prop('value'))
    const existingBookingsInDateRange = bookings.filter((booking) => {
        const end = new Date(booking.endDate)
        const start = new Date(booking.startDate)
        const requestedStart = new Date(startDate)
        const requestedEnd = new Date(endDate)
        return requestedStart <= end || requestedEnd >= start
    })
    return existingBookingsInDateRange.length > 0
}

const getBookingsForUser = async (userId: string): Promise<Booking[]> => {
    const bookings = await data.getByLabel('label1', `user:${userId}`)
    return (bookings.items || []).map(prop('value'))
}

const getById = async (bookingId: string): Promise<Optional<Booking>> => {
    return await data.get(`booking:${bookingId}`)
}

const deleteById = async (bookingId: string): Promise<void> => {
   await data.remove(`booking:${bookingId}`)
}

export const BookingManager = {
    parseDate,
    checkIfBookedForDateRange,
    deleteById,
    getById,
    verifyNewBooking,
    createBookingForDestination,
    getBookingsForUser
}
