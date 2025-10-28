import { Reservation } from '@/domain/reservation/reservation.entity';
import { IReservationRepository } from '@/repositories/IReservationRepository';
import { injectable } from 'tsyringe';

@injectable()
export class InMemoryReservationRepository implements IReservationRepository {
  private readonly reservations: Map<string, Reservation> = new Map();

  async save(reservation: Reservation): Promise<void> {
    this.reservations.set(reservation.props.id, reservation);
  }

  async findByDate(restaurantId: string, date: Date): Promise<Reservation[]> {
    const allReservations = Array.from(this.reservations.values());
    return allReservations.filter(
      (res) =>
        res.props.restaurantId === restaurantId &&
        res.props.date.getFullYear() === date.getFullYear() &&
        res.props.date.getMonth() === date.getMonth() &&
        res.props.date.getDate() === date.getDate()
    );
  }

  async findById(id: string): Promise<Reservation | null> {
    return this.reservations.get(id) || null;
  }

  async update(reservation: Reservation): Promise<void> {
    // In a real DB, this would be an UPDATE query.
    // Here, we just overwrite the existing entry.
    this.reservations.set(reservation.props.id, reservation);
  }
}
