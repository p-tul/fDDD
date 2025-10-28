export class RestaurantCapacityExceededError extends Error {
  constructor() {
    super('Restaurant capacity would be exceeded.');
    this.name = 'RestaurantCapacityExceededError';
  }
}

export class ConflictingReservationError extends Error {
  constructor() {
    super('Another reservation exists at the requested time.');
    this.name = 'ConflictingReservationError';
  }
}

export class PastDateError extends Error {
  constructor() {
    super('Cannot make a reservation in the past.');
    this.name = 'PastDateError';
  }
}

export class ReservationNotFoundError extends Error {
  constructor() {
    super('Reservation not found.');
    this.name = 'ReservationNotFoundError';
  }
}

export type ReservationError =
  | RestaurantCapacityExceededError
  | ConflictingReservationError
  | PastDateError
  | ReservationNotFoundError;
