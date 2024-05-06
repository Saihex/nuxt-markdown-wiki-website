interface EventListener {
  event: string; // Event name
  handler: EventListenerOrEventListenerObject; // Event handler function type
}

interface EventCollection {
  events: EventListener[];
  addEvent(event: string, handler: EventListenerOrEventListenerObject): void;
  removeAllEvents(): void;
}

class EventCollectionImpl implements EventCollection {
  events: EventListener[] = [];

  addEvent(event: string, handler: EventListenerOrEventListenerObject): void {
    const newEventListener: EventListener = { event, handler };
    this.events.push(newEventListener);
    window.addEventListener(event, handler);
  }

  removeAllEvents(): void {
    this.events.forEach(({ event, handler }) => {
      window.removeEventListener(event, handler);
      console.log(`Removed event ${event}`);
    });
    this.events = [];
  }
}

export const create_event_collection = function (): EventCollection {
    return new EventCollectionImpl();
};