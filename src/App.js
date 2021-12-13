import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import Filter from './components/Filter';
import Section from './components/Section';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getFilter } from './redux/filter/filter-selector';
import { getContacts } from './redux/contacts/contacts-selector';
import {
  addContact,
  deleteContact,
  localstorageContacts,
} from './redux/contacts/contacts-actions';

export default function App() {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);

  useEffect(() => {
    const contactsInStorage = localStorage.getItem('contacts');

    if (contactsInStorage) {
      dispatch(localstorageContacts(JSON.parse(contactsInStorage)));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContacts = ({ name, number }) => {
    const identicalName = findForbiddenName(name);

    if (identicalName === false) {
      dispatch(addContact({ name, number }));
    } else {
      alert(name + ' ' + 'is already in contacts');
    }
  };

  const findForbiddenName = name => {
    let forbiddenName = false;
    for (let i = 0; i < contacts.length; i += 1) {
      const normalizeContactsName = contacts[i].name.toLowerCase();
      const normalizeName = name.toLowerCase();
      if (normalizeContactsName === normalizeName) {
        return (forbiddenName = true);
      } else {
        forbiddenName = false;
      }
    }
    return forbiddenName;
  };

  const deleteContacts = contactId => {
    dispatch(deleteContact({ contactId }));
  };

  const getFindContact = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };

  const findContact = getFindContact();

  return (
    <Section>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContacts} />
      <h2>Contacts</h2>
      <Filter />
      <ContactList contacts={findContact} onDeleteContact={deleteContacts} />
    </Section>
  );
}
