import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'


const getAll = () => axios
                       .get(baseUrl)
                       .then(response => response.data);
                      
const create = newObject => axios
                              .post(baseUrl, newObject)
                              .then(response => {console.log('then of axios create'); return response.data});

const remove = id => axios
                       .delete(`${baseUrl}/${id}`)
                       //.then(response => response.data);


const update = (id, newObject) => axios
                                    .put(`${baseUrl}/${id}`, newObject)
                                    //.then(response => response.data);

// And that's how you do it using fetch() instead of axios
// -------------------------------------------------------

/*const getAll = () => fetch(baseUrl)
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

const remove = id => fetch(`${baseUrl}/${id}`, {
                        method:"DELETE"
                    })
                        .then(async response => {
                            const res = await response.text();
                            console.log('jjkkll');
                            console.log("Empty response (normaly) :", res);
                            return "test bobby"
                        });*/
export default {getAll, create, remove, update}
