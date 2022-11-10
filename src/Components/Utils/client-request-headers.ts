// const ClientRequestHeaders = () => {
const ClientRequestHeaders = new Headers();
// This might break CORS, check the port, or change the entire line to '*' instead of 'localhost:8000'
ClientRequestHeaders.set("Access-Control-Allow-Origin", "*");
// }

export default ClientRequestHeaders;
