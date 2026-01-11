import { useCallback, useSyncExternalStore } from "react";

import { contactStorage } from "../services/contactStorage";
import type { Contact } from "../types/contact";

// Simple pub/sub for localStorage changes
const listeners = new Set<() => void>();
const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};
const notify = () => listeners.forEach((l) => l());

const getSnapshot = () => {
  return JSON.stringify(contactStorage.getAll());
};

export function useContacts() {
  const contactsJson = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getSnapshot,
  );
  const contacts: Contact[] = JSON.parse(contactsJson);

  const addContact = useCallback((contact: Omit<Contact, "id">) => {
    const newContact = contactStorage.add(contact);
    notify();
    return newContact;
  }, []);

  const updateContact = useCallback(
    (id: string, updates: Partial<Omit<Contact, "id">>) => {
      const updated = contactStorage.update(id, updates);
      notify();
      return updated;
    },
    [],
  );

  const deleteContact = useCallback((id: string) => {
    const deleted = contactStorage.delete(id);
    notify();
    return deleted;
  }, []);

  return {
    contacts,
    addContact,
    updateContact,
    deleteContact,
  };
}
