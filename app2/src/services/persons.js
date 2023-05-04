import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'


/*const getAll = () => axios
                       .get(baseUrl)
                       .then(response => response.data);*/
                      
/*const create = newObject => axios
                              .post(baseUrl, newObject)
                              .then(response => response.data);*/

const remove = id => axios
                       .delete(`${baseUrl}/${id}`)
                       .then(response => response.data);


const update = (id, newObject) => axios
                                    .put(`${baseUrl}/${id}`, newObject)
                                    .then(response => response.data);

// And that's how you do it using fetch() instead of axios
// -------------------------------------------------------

const getAll = () => fetch(baseUrl)
                        .then(async response => await response.json());

const create = newObject => fetch(baseUrl, {
                                method: "POST",
                                body: newObject,
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json'
                                }
                            })
                                .then(async response => await response.json());


export default {getAll, create, remove, update}
