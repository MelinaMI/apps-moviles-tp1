import { apiFetch } from "../api/apiClient";
//params = {} lo uso para los filtros opcionales
export function getAll(params = {}){
    const queryString = new URLSearchParams(params).toString();
    const url = queryString ? `/platforms?${queryString}` : '/platforms';
    return apiFetch(url);

}

export function getById(id) {
    if (!id) throw new Error("Se requiere un ID para obtener la plataforma.");
    return apiFetch(`/platforms/${id}`);
}

