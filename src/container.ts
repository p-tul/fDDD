import { container } from 'tsyringe';
import { IReservationRepository } from '@/repositories/IReservationRepository';
import { InMemoryReservationRepository } from '@/providers/persistence/inMemory.reservation.repository';

// Register the concrete implementation for the repository interface
container.register(IReservationRepository, {
  useClass: InMemoryReservationRepository,
});
