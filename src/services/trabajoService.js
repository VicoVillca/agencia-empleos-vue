import api from './api';

export const getTrabajos = async (params = {}) => {
    const response = await api.get('/trabajos', { params });
    return response.data;
};

export const getTrabajo = async (id) => {
    // Usamos _expand=categoria para traer también la información de la categoría de JSON Server
    const response = await api.get(`/trabajos/${id}?_expand=categoria`);
    return response.data;
};

export const createTrabajo = async (data) => {
    // JSON server necesita parsear categoriaId como Number
    data.categoriaId = Number(data.categoriaId);
    const response = await api.post('/trabajos', data);
    return response.data;
};

export const updateTrabajo = async (id, data) => {
    data.categoriaId = Number(data.categoriaId);
    const response = await api.put(`/trabajos/${id}`, data);
    return response.data;
};

export const deleteTrabajo = async (id) => {
    const response = await api.delete(`/trabajos/${id}`);
    return response.data;
};
