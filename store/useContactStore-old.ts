import { create } from "zustand";

type Contact = {
  id: string;
  first_name: string;
  last_name: string;
  email?: string;
  phone?: string;
  company?: string;
  notes?: string;
  avatar_path?: string;
};

type State = {
  contacts: Contact[];
  selected: Contact | null;
  setContacts: (c: Contact[]) => void;
  selectContact: (c: Contact) => void;
  addContact: (c: Contact) => void;
};

export const useContactsStore = create<State>((set) => ({
  contacts: [],
  selected: null,

  setContacts: (contacts) => set({ contacts }),

  selectContact: (selected) => set({ selected }),

  addContact: (contact) =>
    set((state) => ({
      contacts: [contact, ...state.contacts],
    })),
}));