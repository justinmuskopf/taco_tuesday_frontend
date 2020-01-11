export default class TacoTuesdayApiHelper {
    formEndpoint = endpoint => 'http://api.tacotuesdayapi.com:7430/taco-tuesday/v1/' + endpoint;

    constructor() {
        if (TacoTuesdayApiHelper.instance != null) {
            throw new Error("Yeah, I don't think so Buster.");
        }

        this.fetchFullOrders();
        this.fetchOrderSummary();
    }

    static instance = null;
    static getInstance() {
        if (TacoTuesdayApiHelper.instance == null) {
            TacoTuesdayApiHelper.instance = new TacoTuesdayApiHelper();
        }

        return TacoTuesdayApiHelper.instance;
    };

    get(endpoint, headers) {
        return fetch(this.formEndpoint(endpoint), {headers: headers})
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error('Invalid response! ' + response)
                }
            });
    }

    getWithApiKey(endpoint, headers) {
        headers.apiKey = '';
        return TacoTuesdayApiHelper.get(endpoint, headers);
    }

    getTacos = () => this.get('tacos');

    subscriptionData = {};
    subscriptions = {};

    subscribe(subscription, callback) {
        if (!this.hasSubscription(subscription)) {
            this.createSubscription(subscription);
        }

        this.addSubscriber(subscription, callback);
        if (this.subscriptionHasData(subscription)) {
            callback(this.getSubscriptionData(subscription));
        }
    }

    subscribeToOrderSummary = (callback) => this.subscribe('orderSummary', callback);
    subscribeToFullOrders = (callback) => this.subscribe('fullOrders', callback);

    fetchSubscription = (getMethod, subscription) => getMethod().then((data) => {
        if (!this.hasSubscription(subscription)) {
            this.createSubscription(subscription);
        }

        this.setSubscriptionData(subscription, data);
        this.getSubscribers(subscription).forEach(s => s(data));
    });

    fetchOrderSummary = () => this.fetchSubscription(this.getOrderSummary, 'orderSummary');
    fetchFullOrders = () => this.fetchSubscription(this.getAllFullOrders, 'fullOrders');

    tacos = this.getTacos();

    tacoTypeToName(tacoType) {
        for (const tacoObject in this.tacos) {
            if (!tacoObject.hasOwnProperty('type') || !tacoObject.hasOwnProperty('name')) {
                throw new Error('Invalid Taco returned from API: ' + tacoObject);
            }

            if (tacoObject.type === tacoType) {
                return tacoObject.name;
            }
        }

        return tacoType;
    }

    // Subscription Helpers
    hasSubscription = (subscription) => this.subscriptions.hasOwnProperty(subscription);
    createSubscription = (subscription) => this.subscriptions[subscription] = [];
    addSubscriber = (subscription, callback) => this.subscriptions[subscription].push(callback);
    getSubscribers = (subscription) => this.subscriptions[subscription];

    subscriptionHasData = (subscription) => this.subscriptionData.hasOwnProperty(subscription);
    getSubscriptionData = (subscription) => this.subscriptionData[subscription];
    setSubscriptionData = (subscription, data) => this.subscriptionData[subscription] = data;

    // API GET Helpers
    getAllFullOrders = () => this.get('orders/full', {'sortByDate': true});
    getFullOrderById = id => this.get('orders/full/' + id);
    getAllIndividualOrders = () => this.get('orders/individual');
    getIndividualOrderById = id => this.get('orders/individual/' + id);
    getAllEmployees = () => this.getWithApiKey('employees');
    getOrderSummary = () => this.get('orders/summary');
}
