const initialState = { carrito: [] };

export default carritoReducer = (state = initialState, action) => {
    switch (action.type){
        case 'ADD_ITEM':
            return {
                ...state, 
                carrito: state.carrito.concat(action.item)
            }
         case 'INCREMENTAR':
            let arr = state.carrito.slice();
            arr[action.indice].cantidad++;
            arr[action.indice].total=arr[action.indice].cantidad*(arr[action.indice].costo+arr[action.indice].cf_opciones);
            return ({
                ...state, 
                carrito: arr
            })
         case 'DISMINUIR':
            let arrd = state.carrito.slice();
            arrd[action.indice].cantidad--;
            arrd[action.indice].total=arrd[action.indice].cantidad*(arrd[action.indice].costo+arrd[action.indice].cf_opciones);
            return ({
                ...state, 
                carrito: arrd
            })
         case 'ELIMINAR':
            let arre = state.carrito.slice();
            arre.splice(action.indice,1);
            return ({
                ...state, 
                carrito: arre
            })
        default:
            return state;
    }
    //return state;
};

//export const selectActiveWord = state => state.carritoReducer.carrito;