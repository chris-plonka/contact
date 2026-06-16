import { create } from "zustand";

type Contact = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  company: string;
  avatar_path?: string | null;
};

type Store = {
  contacts: Contact[];

  selectedContactId: string | null;
  selectContact: (id: string) => void;

  setContacts: (contacts: Contact[]) => void;
  addContact: (contact: Contact) => void;
};

export const useContactsStore = create<Store>((set) => ({
  contacts: [],

  selectedContactId: null,

  selectContact: (id) =>
    set(() => ({
      selectedContactId: id,
    })),

  setContacts: (contacts) =>
    set(() => ({
      contacts,
    })),

  addContact: (contact) =>
    set((state) => ({
      contacts: [contact, ...state.contacts],
    })),
}));