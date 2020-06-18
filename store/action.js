export const AgregarItem = (item) => (
        {
            type: 'ADD_ITEM',
            item
        }
);

export const AumentarItem = (indice) => (
    {
        type: 'INCREMENTAR',
        indice
    }
);

export const DisminuirItem = (indice) => (
    {
        type: 'DISMINUIR',
        indice
    }
);

export const EliminarItem = (indice) => (
    {
        type: 'ELIMINAR',
        indice
    }
);