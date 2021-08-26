import { data } from '@serverless/cloud'
import { prop } from 'ramda'
import { DateTime } from 'luxon'
import { v4 } from 'uuid'
import { Optional } from "../util";

export enum DestinationErrors {
    NOT_FOUND = 'NOT_FOUND',
    INVALID_DATE = 'INVALID_DATE'
}

export type Destination = {
    id: string,
    name: string,
    description?: string,
    state: string,
    city: string,
    costPerNightInCents: number,
    maxGuests: number,
    available: boolean,
    createdAt: string
}

type NewDestination = Omit<Destination, 'id'>

const getById = async (id: string): Promise<Optional<Destination>> => {
    const { items } = await data.get<Destination>(`destination:${id}`)
    if (!items.length) {
        return undefined
    }
    return items[0].value
}

const getAvailable = async (): Promise<Destination[]> => {
    const availDestinations = await data.getByLabel<Destination>('label2', 'available:true')
    return (availDestinations.items || []).map(prop('value'))
}

const getAll = async () => {
    const destinations = await data.get<Destination>('destination:*')
    return (destinations.items || []).map(prop('value'))
}

const verifyNewDestination = (params: any): NewDestination => {
    if (!params.name) {
        throw new Error('Name Required')
    }

    if (!params.state) {
        throw new Error('State Required')
    }

    if (!params.city) {
        throw new Error('City Required')
    }

    if (!params.costPerNightInCents) {
        throw new Error('Cost Required')
    }

    if (!params.maxGuests) {
        throw new Error('Max Guests Required')
    }
    return params as NewDestination
}

const createDestination = async (params: any): Promise<Destination> => {
    const newDestination = DestinationManager.verifyNewDestination(params)
    const newDestinationId = v4()
    return await data.set<Destination>(`destination:${newDestinationId}`, {
        ...newDestination,
        available: true,
        id: newDestinationId
    }, {
        label1: `cost:${newDestination.costPerNightInCents}`,
        label2: `available:true`,
    }) as Destination
}

const calculateCost = async (id: string, startDate: string, endDate: string): Promise<{ cents: number, dollarString: string }> => {
    const destination = await DestinationManager.getById(id)
    if (!destination) {
       throw new Error(DestinationErrors.NOT_FOUND)
    }

    const { costPerNightInCents } = destination
    const start = DateTime.fromFormat(startDate, 'yyyy-MM-dd')
    const end = DateTime.fromFormat(endDate, 'yyyy-MM-dd').minus({ days: 1 }) // cost is per night
    if (!start.isValid || !end.isValid) {
        throw new Error(DestinationErrors.INVALID_DATE)
    }
    const delta = end.diff(start, ['days'])
    const totalInCents = Math.floor(delta.days * costPerNightInCents)
    return {
        cents: totalInCents,
        dollarString: (totalInCents / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' })
    }
}

export const DestinationManager = {
    calculateCost,
    getById,
    getAvailable,
    getAll,
    createDestination,
    verifyNewDestination,
}
