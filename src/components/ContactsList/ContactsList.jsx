import PropTypes from 'prop-types';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { getFiltredList } from 'redux/selectors';
import { Container } from '../Form/Form.styled';
import {StyledItem, StyledName, StyledNumber,StyledBtn} from './Contacts.styled'

const ContactsList = () => {
    const contacts = useSelector(getFiltredList);
    return (
            <Container>
        <ul>
             {contacts.map((el) => (
                 <StyledItem key={el.id}>
                     <StyledName>{el.name}</StyledName>:    
                     <StyledNumber>{el.tel}</StyledNumber>
                     <StyledBtn onClick={()=> removeItem(el.id)}>Delete contact</StyledBtn>
                     </StyledItem>))}
                </ul>
            </Container>
    )
}

ContactsList.propType = {
    renderList: PropTypes.array.isRequired, 
    removeItem: PropTypes.func.isRequired
}


export default memo(ContactsList);