export default class TacoTuesdayApiHelper {
    static formEndpoint = endpoint => 'http://api.tacotuesdayapi.com:7430/taco-tuesday/v1/' + endpoint;

    static get(endpoint, headers) {
        return fetch(TacoTuesdayApiHelper.formEndpoint(endpoint), {headers: headers})
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error('Invalid response! ' + response)
                }
            });
    }

    static getWithApiKey(endpoint, headers) {
        headers.apiKey = '';
        return TacoTuesdayApiHelper.get(endpoint, headers);
    }

    static getTacos = () => TacoTuesdayApiHelper.get('tacos');

    static getAllFullOrders = () => TacoTuesdayApiHelper.get('orders/full', {'sortByDate': true});
    static getFullOrderById = id => TacoTuesdayApiHelper.get('orders/full/' + id);

    static getAllIndividualOrders = () => TacoTuesdayApiHelper.get('orders/individual');
    static getIndividualOrderById = id => TacoTuesdayApiHelper.get('orders/individual/' + id);

    static getAllEmployees = () => TacoTuesdayApiHelper.getWithApiKey('employees');

    static tacos = TacoTuesdayApiHelper.getTacos();

    static tacoTypeToName(tacoType) {
        for (const tacoObject in TacoTuesdayApiHelper.tacos) {
            if (!(tacoObject.hasOwnProperty('type') && tacoObject.hasOwnProperty('name'))) {
                throw new Error('Invalid Taco returned from API: ' + tacoObject);
            }

            if (tacoObject.type === tacoType) {
                return tacoObject.name;
            }
        }

        return tacoType;
    }
}