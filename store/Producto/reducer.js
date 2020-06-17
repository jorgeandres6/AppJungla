const initialState = { carrito: [] };

export default carritoReducer = (state = initialState, action) => {
    switch (action.type){
        case 'ADD_ITEM':
            return {
                ...state, 
                carrito: state.carrito.concat(action.item)
            }
        default:
            return state;
    }
    //return state;
};

//export const selectActiveWord = state => state.carritoReducer.carrito;