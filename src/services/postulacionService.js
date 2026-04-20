import api from './api';

export const getPostulaciones = async (params = {}) => {
    const response = await api.get('/postulaciones', { params: { ...params, _expand: 'trabajo' } });
    return response.data;
};

export const getPostulacion = async (id) => {
    const response = await api.get(`/postulaciones/${id}?_expand=trabajo`);
    return response.data;
};

export const createPostulacion = async (data) => {
    data.trabajoId = Number(data.trabajoId);
    const response = await api.post('/postulaciones', data);
    return response.data;
};

export const updatePostulacion = async (id, data) => {
    data.trabajoId = Number(data.trabajoId);
    const response = await api.put(`/postulaciones/${id}`, data);
    return response.data;
};

export const deletePostulacion = async (id) => {
    const response = await api.delete(`/postulaciones/${id}`);
    return response.data;
};
