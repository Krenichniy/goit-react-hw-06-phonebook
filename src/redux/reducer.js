import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
const contactSlice = createSlice({
    name: 'items', 
    initialState: [],
    reducers: {
        addContact: {
            reducer: (store, { payload }) => [...store, payload],
            prepare: contact => ({ payload: { ...contact, id: nanoid(10) } }),
        }, 
        removeContact: (store, { payload }) =>
            store.filter(userTel=> userTel.id !== payload),
    }
})

export const { addContact, removeContact } = contactSlice.actions;
export default contactSlice.reducer;