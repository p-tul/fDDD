import { Result, success, failure } from '@/utils/result';
import { ReservationError, PastDateError } from './reservation.errors';

export interface ReservationProps {
  id: string;
  restaurantId: string;
  userId: string;
  date: Date;
  partySize: number;
  status: 'Pending' | 'Confirmed' | 'Cancelled';
}

export class Reservation {
  private constructor(public readonly props: ReservationProps) {}

  public static create(params: {
    id: string;
    restaurantId: string;
    userId: string;
    date: Date;
    partySize: number;
  }): Result<Reservation, ReservationError> {

    if (params.date < new Date()) {
        return failure(new PastDateError());
    }

    const props: ReservationProps = {
      ...params,
      status: 'Pending',
    };

    const reservation = new Reservation(props);
    return success(reservation);
  }

  public confirm(): void {
    this.props.status = 'Confirmed';
  }

  public cancel(): void {
    this.props.status = 'Cancelled';
  }

  // Other business logic methods can go here...
}
