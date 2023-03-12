import { DomainEvent } from '../../XXXDomain/shared/DomainEvent';
import { DomainEventListener } from './DomainEventListener';

export class DomainEventPublisher {
  async publish(event: DomainEvent): Promise<void> {
    try {
      DomainEventListener.emit(event.name, event);
    } catch (e) {
      throw new Error();
    }
  }
}
