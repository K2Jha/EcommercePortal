import * as CartActions from '../../actions/cart.action.js'
import {
    getProducts,
    addToCart,
    removeFromCart,
} from "../../actions/cart.action";
class HomeController {
    constructor($state, $scope, $rootScope, $http, $ngRedux) {
        this.$scope = $scope;
        this.$state = $state;
        this.$http = $http;
        this.$roorScope = $rootScope;
        this.products = [];
        this.cartProducts = [];
        this.$ngRedux = $ngRedux;
        let { unsubscribe } = this.$ngRedux.connect(
            this.mapStateToThis,
            addToCart
        )(this);
        this.$scope.$on("$destroy", unsubscribe);
        this.fetchProducts();
    }

    addToCart(data) {
        this.$ngRedux.dispatch({ type: "ADD_TO_CART", payload: data });
    }

    fetchProducts() {
        let that = this;
        that.$http
            .get("https://fakestoreapi.com/products")
            .then(function(response) {
                that.products = response.data;
                // that.$ngRedux.dispatch({ type: "ADD_TO_PRODUCTS", payload: response.data });
                // console.log(response.data);
            });
    }
}
HomeController.$inject = ["$state", "$scope", "$rootScope", "$http", "$ngRedux"];

export default HomeController;