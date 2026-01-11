import type { Contact } from "../types/contact";

interface ContactItemProps {
  contact: Contact;
  onEdit: (contact: Contact) => void;
  onDelete: (id: string) => void;
}

export function ContactItem({ contact, onEdit, onDelete }: ContactItemProps) {
  return (
    <div
      className={`flex items-center justify-between rounded-xl bg-gray-800 p-4`}
    >
      <div className="min-w-0 flex-1">
        <p className="truncate font-medium text-white">{contact.name}</p>
        <p className="truncate text-sm text-gray-400">{contact.number}</p>
      </div>

      <div className="ml-4 flex gap-2">
        <button
          onClick={() => onEdit(contact)}
          className={`
            rounded-lg bg-blue-600 p-2 text-white transition-colors
            hover:bg-blue-500
            active:scale-95
          `}
          aria-label={`Edit ${contact.name}`}
        >
          ✏️
        </button>
        <button
          onClick={() => onDelete(contact.id)}
          className={`
            rounded-lg bg-red-600 p-2 text-white transition-colors
            hover:bg-red-500
            active:scale-95
          `}
          aria-label={`Delete ${contact.name}`}
        >
          🗑️
        </button>
      </div>
    </div>
  );
}
