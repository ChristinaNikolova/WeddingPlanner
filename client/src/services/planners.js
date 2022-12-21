import { api } from "./api";
import { requester } from "./requester";

export const all = () => {
    return requester(`${api.planners}`, 'GET')
        .then((res) => res.json())
        .catch((err) => console.error(err));
}

export const create = (description, date, budget, location, bride, groom) => {
    return requester(`${api.planners}`, 'POST', { description, date, budget, location, bride, groom })
        .then((res) => res.json())
        .catch((err) => console.error(err));
}