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

    useEffect(() => {
      window.localStorage.setItem(key, JSON.stringify(state));
      const localstorageArrayLength =
        JSON.parse(window.localStorage.getItem(key)).length === 0;
      if (localstorageArrayLength) {
        setState(initialValue);
      }
    }, [initialValue, key, state]);
    return [state, setState];
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
      setContacts((state) => [data, ...state]);
    }
  };

  const deleteContacts = (id) => {
    setContacts((s) => s.filter((contact) => contact.id !== id));
  };

  const getFilter = (e) => {
    setFilter(e.currentTarget.value.toLowerCase());
  };

  const getFiltredContacts = () => {
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
