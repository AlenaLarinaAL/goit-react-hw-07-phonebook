import { Form, Button, Input, Label } from './ContactsEditor.styled';

import {
  useCreateContactMutation,
  useFetchContactsQuery,
} from 'store/contacts/contactsSlice';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

export const ContactsEditor = () => {
  const [createContact, { isLoading }] = useCreateContactMutation();
  const { data: contacts } = useFetchContactsQuery();

  const handleSubmit = event => {
    event.preventDefault();

    const name = event.target.elements.name.value;
    const number = event.target.elements.number.value;

    const isDuplicate = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (isDuplicate) {
      Notify.warning(`${name} is already in contacts`);
      event.target.reset();
      return;
    }

    createContact({ name, number });

    event.target.reset();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Label>
        Name
        <Input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </Label>

      <Label>
        Number
        <Input
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </Label>

      <Button type="submit" disabled={isLoading}>
        Add contact
      </Button>
    </Form>
  );
};
