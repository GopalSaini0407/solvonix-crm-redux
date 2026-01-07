import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContacts } from "./contactSlice";

const ContactList = () => {
  const dispatch = useDispatch();

  const {
    contacts,
    loading,
    error,
  } = useSelector((state) => state.contacts);

  console.log(contacts);

  useEffect(() => {
    dispatch(fetchContacts({
      page:1
    }));
  }, [dispatch]);

  if (loading.fetch) return <p>Loading contacts...</p>;
  if (error.fetch) return <p>Error: {error.fetch}</p>;

  return (
    <div>
      <h2>Contacts</h2>
       {
        contacts.length===0 ? <p>No contacts found</p>:<ul>
        {contacts.map((contact) => (
          <li key={contact.id}>
            {contact.name} — {contact.email}
          </li>
        ))}
      </ul>
       }
    

      
    </div>
  );
};

export default ContactList;
