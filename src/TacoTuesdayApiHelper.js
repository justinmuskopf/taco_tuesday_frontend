export default class TacoTuesdayApiHelper {
    static done = false;

    static formEndpoint = endpoint => 'http://api.tacotuesdayapi.com:7430/taco-tuesday/v1/' + endpoint;

    static get(endpoint) {
        return fetch(TacoTuesdayApiHelper.formEndpoint(endpoint))
            .then(response => {
                if (response.ok) {
                    TacoTuesdayApiHelper.done = true;
                    return response.json()
                } else {
                    throw new Error('Invalid response! ' + response)
                }
            });
    }

    static getTacos = () => TacoTuesdayApiHelper.get('tacos');

    static getAllFullOrders = () => TacoTuesdayApiHelper.get('orders/full');
    static getFullOrderById = id => TacoTuesdayApiHelper.get('orders/full/' + id);

    static getAllIndividualOrders = () => TacoTuesdayApiHelper.get('orders/individual');
    static getIndividualOrderById = id => TacoTuesdayApiHelper.get('orders/individual/' + id);

    static getAllEmployees = () => TacoTuesdayApiHelper.get('employees');
}