import { Reservation } from '@/domain/reservation/reservation.entity';
import { PastDateError } from '@/domain/reservation/reservation.errors';

describe('Reservation Entity', () => {
  it('should create a reservation successfully for a future date', () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 1);

    const result = Reservation.create({
      id: 'a-valid-uuid',
      restaurantId: 'restaurant-1',
      userId: 'user-1',
      date: futureDate,
      partySize: 2,
    });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.value).toBeInstanceOf(Reservation);
      expect(result.value.props.status).toBe('Pending');
    }
  });

  it('should fail to create a reservation for a past date', () => {
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 1);

    const result = Reservation.create({
      id: 'a-valid-uuid',
      restaurantId: 'restaurant-1',
      userId: 'user-1',
      date: pastDate,
      partySize: 2,
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error).toBeInstanceOf(PastDateError);
    }
  });
});
