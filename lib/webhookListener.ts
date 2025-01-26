/* eslint-disable @typescript-eslint/no-explicit-any */
// utils/eventManager.ts

// Listener Set

const listeners: Set<(data: any) => void> = new Set();


export function addListener(listener: (data: any) => void) {
    listeners.add(listener);

    return () => listeners.delete(listener);
}

export function notifyListeners(data: any) {
    listeners.forEach((listener) => listener(data));
}
