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

export const VaciarCarrito = () => (
    {
        type: 'VACIAR_CARRITO'
    }
);

export const AgregarUsuario = (correo,id,token) => (
    {
        type: 'AGREGAR_USUARIO',
        usuario: {
            correo: correo,
            id: id,
            token: token
        }
    }
);

export const EliminarUsuario = (usuario) => (
    {
        type: 'ELIMINAR_USUARIO',
        usuario 
    }
);

export const VaciarUsuarios = () => (
    {
        type: 'VACIAR_USUARIOS',
    }
);