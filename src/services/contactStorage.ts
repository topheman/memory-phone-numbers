import type { Contact } from "../types/contact";

const STORAGE_KEY = "memory-phonenumbers-contacts";

export const contactStorage = {
  getAll(): Contact[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? (JSON.parse(data) as Contact[]) : [];
    } catch {
      console.error("Failed to parse contacts from localStorage");
      return [];
    }
  },

  save(contacts: Contact[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
  },

  add(contact: Omit<Contact, "id">): Contact {
    const contacts = this.getAll();
    const newContact: Contact = {
      ...contact,
      id: crypto.randomUUID(),
    };
    contacts.push(newContact);
    this.save(contacts);
    return newContact;
  },

  update(id: string, updates: Partial<Omit<Contact, "id">>): Contact | null {
    const contacts = this.getAll();
    const index = contacts.findIndex((c) => c.id === id);
    if (index === -1) return null;

    contacts[index] = { ...contacts[index], ...updates };
    this.save(contacts);
    return contacts[index];
  },

  delete(id: string): boolean {
    const contacts = this.getAll();
    const filtered = contacts.filter((c) => c.id !== id);
    if (filtered.length === contacts.length) return false;

    this.save(filtered);
    return true;
  },

  clear(): void {
    localStorage.removeItem(STORAGE_KEY);
  },
};
