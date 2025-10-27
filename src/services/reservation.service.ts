import { inject, injectable } from 'tsyringe';
import { v4 as uuidv4 } from 'uuid';
import { Reservation } from '@/domain/reservation/reservation.entity';
import { IReservationRepository } from '@/repositories/IReservationRepository';
import { Result, success, failure } from '@/utils/result';
import { CreateReservationRequest } from '@/contracts/requests/create-reservation.schema';
import { ReservationError, ConflictingReservationError } from '@/domain/reservation/reservation.errors';

// A simple restaurant capacity store for this example
const restaurantCapacities: Record<string, number> = {};

@injectable()
export class ReservationService {
  constructor(
    @inject(IReservationRepository) 
    private readonly reservationRepository: IReservationRepository
  ) {}

  public async createReservation(
    request: CreateReservationRequest
  ): Promise<Result<Reservation, ReservationError>> {
    // In a real app, you'd fetch this from a Restaurant service/repository
    const restaurantCapacity = restaurantCapacities[request.restaurantId] || 10;

    const requestDate = new Date(request.date);

    // 1. Check for conflicting reservations (Infrastructure concern)
    const existingReservations = await this.reservationRepository.findByDate(
      request.restaurantId,
      requestDate
    );

    const totalGuestsOnDate = existingReservations.reduce(
      (sum, res) => sum + res.props.partySize,
      0
    );

    if (totalGuestsOnDate + request.partySize > restaurantCapacity) {
      return failure(new ConflictingReservationError());
    }

    // 2. Create the domain entity (Core domain concern)
    const reservationResult = Reservation.create({
      id: uuidv4(),
      restaurantId: request.restaurantId,
      userId: request.userId,
      date: requestDate,
      partySize: request.partySize,
    });

    if (!reservationResult.success) {
      return reservationResult;
    }

    // 3. Persist the new reservation (Infrastructure concern)
    await this.reservationRepository.save(reservationResult.value);

    return success(reservationResult.value);
  }
}
