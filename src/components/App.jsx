import { nanoid } from 'nanoid';
import { Component } from 'react';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parseContacts = JSON.parse(contacts);

    if (parseContacts) {
      this.setState({ contacts: parseContacts });
    }
  }

  componentDidUpdate(prevState, prevProps) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  handleAddContact = data => {
    const stateContacts = [...this.state.contacts];
    const existContact = this.state.contacts.filter(contact => {
      return contact.name.toLowerCase().includes(data.name.toLowerCase());
    });

    if (existContact.length > 0) {
      alert(`${data.name}, is already in your contacts`);
      return;
    }

    const id = nanoid(5);

    this.setState({
      contacts: [
        ...stateContacts,
        { id: id, name: data.name, number: data.number },
      ],
    });
  };

  filterContacts = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    const normalizedFilter = this.state.filter.toLowerCase();
    const visibleContact = this.state.contacts.filter(contact => {
      return contact.name.toLowerCase().includes(normalizedFilter);
    });

    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.handleAddContact} />
        <h2>Contacts</h2>
        <Filter
          value={this.state.filter}
          inputFilterContact={this.filterContacts}
        />
        <ContactList
          contacts={visibleContact}
          onDeleteContact={this.deleteContact}
        />
      </div>
    );
  }
}
