const initialState = [];

// Contact reducer function
const contactReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_CONTACTS':
            // Update state with fetched contacts
            return action.payload;
        case 'ADD_CONTACT':
            // Add new contact to the state
            return [...state, action.payload];
        case 'UPDATE_CONTACT':
            // Update existing contact in the state
            const updatedState = state.map(contact => contact.id === action.payload.id ? action.payload : contact);
            state = updatedState;
            return state;
        case 'DELETE_CONTACT':
            // Delete contact from the state
            const filteredContacts = state.filter(contact => contact.id !== action.payload && contact);
            return filteredContacts;
        default:
            return state;
    }
}

export default contactReducer;
