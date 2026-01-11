import { useState } from "react";

import { useContacts } from "../hooks/useContacts";
import type { Contact, Screen } from "../types/contact";

import { ContactForm } from "./ContactForm";
import { ContactItem } from "./ContactItem";

interface ContactListProps {
  onNavigate: (screen: Screen) => void;
}

export function ContactList({ onNavigate }: ContactListProps) {
  const { contacts, addContact, updateContact, deleteContact } = useContacts();
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const handleSave = (data: { name: string; number: string }) => {
    if (editingContact) {
      updateContact(editingContact.id, data);
      setEditingContact(null);
    } else {
      addContact(data);
      setIsAdding(false);
    }
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this contact?")) {
      deleteContact(id);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-900">
      {/* Header */}
      <header
        className={`
          sticky top-0 z-10 flex items-center gap-4 bg-gray-900/95 p-4
          backdrop-blur
        `}
      >
        <button
          onClick={() => onNavigate("splash")}
          className={`
            rounded-lg bg-gray-800 p-2 text-white transition-colors
            hover:bg-gray-700
          `}
          aria-label="Back to home"
        >
          ←
        </button>
        <h1 className="text-xl font-semibold text-white">Contacts</h1>
        <span className="ml-auto text-sm text-gray-500">
          {contacts.length} contact{contacts.length !== 1 && "s"}
        </span>
      </header>

      {/* Contact List */}
      <div className="flex-1 overflow-auto p-4">
        {contacts.length === 0 ? (
          <div
            className={`
              flex flex-col items-center justify-center py-16 text-center
            `}
          >
            <p className="mb-2 text-4xl">👥</p>
            <p className="text-gray-400">No contacts yet</p>
            <p className="text-sm text-gray-500">
              Add your first contact to start training!
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {contacts.map((contact) => (
              <ContactItem
                key={contact.id}
                contact={contact}
                onEdit={setEditingContact}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      <button
        onClick={() => setIsAdding(true)}
        className={`
          fixed right-6 bottom-6 z-10 flex h-14 w-14 items-center justify-center
          rounded-full bg-blue-600 text-white shadow-lg transition-all
          hover:bg-blue-500
          active:scale-90
        `}
        aria-label="Add contact"
      >
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 5v14M5 12h14"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Modal */}
      {(isAdding || editingContact) && (
        <ContactForm
          contact={editingContact}
          onSave={handleSave}
          onCancel={() => {
            setIsAdding(false);
            setEditingContact(null);
          }}
        />
      )}
    </div>
  );
}
