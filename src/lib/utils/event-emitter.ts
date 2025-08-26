type Listener = (...args: any[]) => void;

class EventEmitter {
  private events: Map<string, Set<Listener>> = new Map();

  on(event: string, listener: Listener): () => void {
    if (!this.events.has(event)) {
      this.events.set(event, new Set());
    }
    this.events.get(event)!.add(listener);

    // Return unsubscribe function
    return () => this.off(event, listener);
  }

  off(event: string, listener: Listener): void {
    if (this.events.has(event)) {
      const listeners = this.events.get(event)!;
      listeners.delete(listener);

      // Clean up empty sets to prevent memory leaks
      if (listeners.size === 0) {
        this.events.delete(event);
      }
    }
  }

  emit(event: string, ...args: any[]): void {
    if (this.events.has(event)) {
      // Create a copy to prevent issues if listeners are added/removed during emission
      const listeners = new Set(this.events.get(event));
      listeners.forEach((listener) => {
        try {
          listener(...args);
        } catch (error) {
          console.error(`Error in event listener for ${event}:`, error);
        }
      });
    }
  }

  once(event: string, listener: Listener): () => void {
    const onceWrapper: Listener = (...args) => {
      this.off(event, onceWrapper);
      listener(...args);
    };
    return this.on(event, onceWrapper);
  }

  removeAllListeners(event?: string): void {
    if (event) {
      this.events.delete(event);
    } else {
      this.events.clear();
    }
  }
}

export const eventEmitter = new EventEmitter();
