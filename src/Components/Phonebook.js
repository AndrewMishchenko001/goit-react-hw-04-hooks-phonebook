import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Section from "./Section.js/Section";
import ContactsForm from "./ContactForm/ContactsForm";
import Filter from "./Filter/Filter";
import ContactList from "./ContactList/ContactList";
import contactsData from "./ContactList/contactsData.json";
import s from "./ContactForm/ContactForm.module.css";

export default function Phonebook() {
  const [filter, setFilter] = useState("");

  const useLocalStorage = (key, initialValue) => {
    const [state, setState] = useState(() => {
      return JSON.parse(window.localStorage.getItem(key)) || initialValue;
    });
  };

  const [contacts, setContacts] = useLocalStorage("contacts", contactsData);

  const formSubmitHandler = (data) => {
    if (
      contacts.some(
        ({ name }) => name.toLowerCase() === data.name.toLowerCase()
      )
    ) {
      alert(`${data.name} is already in your phonebook!`);
    } else if (contacts.find(({ number }) => number === data.number)) {
      alert(`${data.name} is already in your phonebook!`);
    } else {
      data.id = uuidv4();
      setContacts((state) => ({ contacts: [data, ...contacts] }));
    }
  };

  const deleteContacts = (id) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter((contact) => contact.id !== id),
    }));
  };

  const getFilter = (e) => {
    this.setState({ filter: e.currentTarget.value.toLowerCase() });
  };

  const getFiltredContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter((person) =>
      person.name.toLowerCase().includes(filter)
    );
  };

  return (
    <div className={s.container}>
      <Section title="Phonebook">
        <ContactsForm onSubmit={formSubmitHandler} />
      </Section>
      <Section title="Contacts">
        <Filter value={filter} onChange={getFilter} />
        <ContactList
          contacts={getFiltredContacts()}
          onDeleteContacts={deleteContacts}
        />
      </Section>
    </div>
  );
}
