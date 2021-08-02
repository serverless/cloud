import { BookingManager } from "../managers/booking-manager";

test('Should run a test', () => {
    const date = BookingManager.parseDate('2021-07-30')
    console.log(date.toJSON())
    expect(date).toBeTruthy()
})
