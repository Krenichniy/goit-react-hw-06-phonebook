import PropTypes from 'prop-types';
import {Container, Header,FormContainer, LabelContainer, UserInput, StyledBtn } from './Form.styled';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/reducer';

const Form = ({onNotValid }) => {
    const [name, setName] = useState('');
    const [tel, setTel] = useState('');

    const contacts = useSelector(state => state.contacts);
    const dispatch = useDispatch();
 


   const handleChange= (event) => {
        const { name, value } = event.currentTarget;
        name === 'name' ? setName(value) : setTel(value);
    }  

  
    const formValidation = ( event, showMessage)=> {
        event.preventDefault();
        const userName = name;
        const userTel = tel;
        if (!userName || !userTel) {
            return showMessage('Please fill all fields');
        }

        const newContact = { userName, userTel };
         const isExist = Object.keys(newContact).find(key => {
            const subString = newContact[key].toLocaleUpperCase();
            const contact = contacts.find(el => el[key].toLocaleUpperCase().includes(subString));
            if (contact) return !showMessage(`${contact[key]} is already in contacts`);
            else return false
         })
        
        if (isExist) return true;
        dispatch(addContact(newContact));

        reset();
    }

    const reset = ()=> {
        setName('');
        setTel('');
    }

        return (
            <>
                <Container>
            <Header>Phonebook</Header>
            <FormContainer onSubmit={(event) => {formValidation(event, onNotValid)}}>
                <LabelContainer >
                    Name
                    <UserInput
                        type="text"
                        name="name"
                        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                        required
                        value={name}
                        onChange={handleChange} />
                </LabelContainer>

                <LabelContainer >
                    Phone Number
                    <UserInput
                        type="tel"
                        name="tel"
                        pattern="[0-9]{3}-[0-9]{2}-[0-9]{2}"
                        title="Tel may contain only numbers. For example 654-59-78"
                        required
                        value={tel}
                        onChange={handleChange} />
                    </LabelContainer>
                    <StyledBtn type='submit'>Add contact</StyledBtn>
                    </FormContainer>
                    </Container>
                </>
        )
}
    
    Form.propTypes = {
        onNotValid: PropTypes.func.isRequired,
    };
export default Form;