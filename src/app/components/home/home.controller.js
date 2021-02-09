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
        this.products = this.$ngRedux.getState().productReducer;
    }

    // mapStateToThis(state) {
    //     return {
    //         products: state.ProductReducer,
    //     };
    // }

    addToCart(data) {
        //console.log("product added", id);
        //this.cartProducts.push(id);
        //console.log(this.cartProducts);
        this.$ngRedux.dispatch({ type: "ADD_TO_CART", payload: data });
    }

    getAllProducts() {
        this.products = that.$ngRedux.getState().productReducer;
        console.log(this.products);
    }
}
HomeController.$inject = ["$state", "$scope", "$rootScope", "$http", "$ngRedux"];

export default HomeController;