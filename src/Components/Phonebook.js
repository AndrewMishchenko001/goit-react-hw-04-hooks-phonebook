import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import Section from "./Section.js/Section";
import ContactsForm from "./ContactForm/ContactsForm";
import Filter from "./Filter/Filter";
import ContactList from "./ContactList/ContactList";
import contactsData from "./ContactList/contactsData.json";
import s from "./ContactForm/ContactForm.module.css";

export default class Phonebook extends Component {
  state = {
    contacts: contactsData,
    filter: "",
  };

  formSubmitHandler = (data) => {
    if (
      this.state.contacts.some(
        ({ name }) => name.toLowerCase() === data.name.toLowerCase()
      )
    ) {
      alert(`${data.name} is already in your phonebook!`);
    } else if (
      this.state.contacts.find(({ number }) => number === data.number)
    ) {
      alert(`${data.name} is already in your phonebook!`);
    } else {
      data.id = uuidv4();
      this.setState(({ contacts }) => ({ contacts: [data, ...contacts] }));
    }
  };

  deleteContacts = (id) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter((contact) => contact.id !== id),
    }));
  };

  getFilter = (e) => {
    this.setState({ filter: e.currentTarget.value.toLowerCase() });
  };

  getFiltredContacts() {
    const { contacts, filter } = this.state;
    return contacts.filter((person) =>
      person.name.toLowerCase().includes(filter)
    );
  }

  render() {
    const { filter } = this.state;
    return (
      <div className={s.container}>
        <Section title="Phonebook">
          <ContactsForm onSubmit={this.formSubmitHandler} />
        </Section>
        <Section title="Contacts">
          <Filter value={filter} onChange={this.getFilter} />
          <ContactList
            contacts={this.getFiltredContacts()}
            onDeleteContacts={this.deleteContacts}
          />
        </Section>
      </div>
    );
  }
}
