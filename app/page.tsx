"use client";

import { useContactsStore } from "../store/useContactStore";
import ContactList from "../components/ContactList";
import ContactDetails from "../components/ContactDetails";
import ContactForm from "../components/ContactForm";

export default function Page() {
  const { contacts, selectedContactId } =
    useContactsStore();

  const selectedContact =
    contacts.find((c) => c.id === selectedContactId) ||
    null;

return (
  <div className="grid grid-cols-2 h-screen overflow-hidden">

    {/* LEFT */}
    <div className="h-full overflow-hidden flex flex-col">
      <ContactList />
    </div>

    {/* RIGHT */}
    <div className="h-full overflow-hidden">
      <div className="p-4">
        <ContactDetails contact={selectedContact} />
      </div>
    </div>

  </div>
);}