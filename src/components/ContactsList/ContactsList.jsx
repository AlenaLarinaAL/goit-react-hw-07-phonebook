import { List, Item, Span, Button } from './ContactsList.styled';
import { MdDelete } from 'react-icons/md';
import { filterContacts } from 'store/selectors/selectors';
import {
  useDeleteContactMutation,
  useFetchContactsQuery,
} from 'store/contacts/contactsSlice';
import { useSelector } from 'react-redux';
import { Spinner } from 'components/Loader/Loader';
import { Notify } from 'notiflix';

export const ContactsList = () => {
  const filter = useSelector(filterContacts);
  const { data: contacts = [], isFetching, error } = useFetchContactsQuery();
  const [deleteContact] = useDeleteContactMutation();

  const deleteContactId = async id => {
    try {
      await deleteContact(id);
      Notify.success('Contact successfully deleted!');
    } catch (error) {
      Notify.failure('Oops! Something went wrong:(');
    }
  };

  const filteredContacts = contacts.filter(({ name }) =>
    name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>
      {isFetching && <Spinner />}
      {error && <p>{error}</p>}
      <List>
        {filteredContacts.map(({ id, name, number }) => {
          return (
            <Item key={id}>
              <Span>
                {name}: {number}
              </Span>
              <Button onClick={() => deleteContactId(id)}>
                <MdDelete size={15} />
              </Button>
            </Item>
          );
        })}
      </List>
    </>
  );
};
