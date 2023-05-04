import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'


const getAll = async () => (await axios.get(baseUrl)).data;                      
                      
const create = async (newObject) => (await axios.post(baseUrl, newObject)).data;

const remove = async (id) => (await axios.delete(`${baseUrl}/${id}`)).data;

const update = async (id, newObject) => (await axios.put(`${baseUrl}/${id}`, newObject)).data;

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
