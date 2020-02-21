import API from './config';

export const searchTags = () => {
    return fetch(`${API}/api/tags`, {
      method: "GET",
      }).then(res => res.json())
      .then(res => res.results);
  };
  
  export const searchAdvert = (query) => {
    return fetch(`${API}/api/anuncios`, {
      method: "GET"
    }).then(res => res.json())
      .then(res => res.results);
  };
  
  export const searchAdvertId = (_id) => {
    return fetch(`${API}/api/anuncios/${_id}`, {
      method: "GET"
    }).then(res => res.json())
    .then(res => res.result);
  };
  
  export const findAdverts = (query) => {
      return fetch(`${API}/api/anuncios${query}`, {
      method: "GET"
    }).then(res => res.json())
      .then(res => res.results);
  };
  
  export const createAdvert = (advert) => {
    return fetch(`${API}/api/anuncios`, {
      method: "POST",
      body: advert,
      headers: {
        'Content-Type': 'application/json'
    }}).then(res => res.json())
      .then(res => res.results);
  };
  
  export const updateAdvert = (advert, _id) => {
    return fetch(`${API}/api/anuncios/${_id}`, {
      method: "PUT",
      body: JSON.stringify(advert),
      headers: {
        'Content-Type': 'application/json'
    }}).then(res => res.json())
      .then(res => res.results);
  };