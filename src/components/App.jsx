import React, {useState, useEffect, useCallback} from 'react';
import Form from './Form';
import Filter from './Filter';
import ContactsList from './ContactsList';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { nanoid } from 'nanoid'
import styled from 'styled-components';
import { useSelector } from "react-redux";
let isFirstTimeAppStarted = true;
const App = () => {
  const userContacts = useSelector(state => state.contacts);
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

const STORAGE_KEY = 'contacts';
  useEffect(() => {
    setContacts(getDataFromStorage())
  }, [])
  
  useEffect(() => {
    if (isFirstTimeAppStarted) { isFirstTimeAppStarted = false; return };

    updateStorage(contacts)
  }, [contacts])

  const showValidationMessage = (message) => {
      Notify.warning(message);
  }

  
 

 const onFilterChange = (event ) => {
    const { value } = event.currentTarget;
    setFilter(value);
  }

  const removeItem = useCallback((id) => {
    setContacts(prevContacts => prevContacts.filter(contact => contact.id !== id));
    updateStorage(contacts);
  }, [contacts])
 
   const updateStorage = (contacts) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts))
  }

  const getDataFromStorage = () => {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  }

        return (
          <Container>
            <Form  onNotValid={ showValidationMessage} />
            <Filter  filter ={filter} onFilterChange={ onFilterChange} />
            <ContactsList renderList={renderList} removeItem={ removeItem} />
      </Container>
    );
};


const Container = styled.div`
          height: 100vh;
          color: #010101;
          text-align:center;
`

export default App;