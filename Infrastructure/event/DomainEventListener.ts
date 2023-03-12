import EventEmitter from 'events';
import { DomainEvent } from '../../XXXDomain/shared/DomainEvent';

const emitter = new EventEmitter();
emitter.setMaxListeners(0);

export class DomainEventListener {
  static on<T extends DomainEvent>(
    eventName: T['name'],
    callback: (event: T) => void
  ) {
    emitter.on(eventName, callback);
  }

  static emit(eventName: DomainEvent['name'], event: DomainEvent) {
    emitter.emit(eventName, event);
  }
}
