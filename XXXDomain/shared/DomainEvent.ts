import EventEmitter from 'events';

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

export interface DomainEvent {
  name: 'UserCreateEvent';
}

export class DomainEventPublisher {
  async publish(event: DomainEvent): Promise<void> {
    try {
      DomainEventListener.emit(event.name, event);
    } catch (e) {
      throw new Error();
    }
  }
}

export abstract class DomainEventStorable {
  private domainEvents: DomainEvent[] = [];

  protected addDomainEvent(domainEvent: DomainEvent) {
    this.domainEvents.push(domainEvent);
  }

  getDomainEvents(): DomainEvent[] {
    return this.domainEvents;
  }

  clearDomainEvents() {
    this.domainEvents = [];
  }
}
