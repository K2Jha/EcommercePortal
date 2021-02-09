import * as CartActions from "../../actions/cart.action.js";
import {
    getProducts,
    addToCart,
    removeFromCart,
} from "../../actions/cart.action";
//import { stateGo } from "redux-ui-router";

class CheckOutController {
    constructor($state, $scope, $rootScope, $http, $ngRedux) {
        this.$scope = $scope;
        this.$state = $state;
        this.$http = $http;
        this.$rootScope = $rootScope;
        this.products = [];
        this.cartProducts = [];
        this.ngRedux = $ngRedux;
        let { unsubscribe } = this.ngRedux.connect(
            this.mapStateToThis,
            getProducts
        )(this);
        $scope.$on("$destroy", unsubscribe);
    }

    mapStateToThis(state) {
        return {
            finalProducts: state.cartReducer,
        };
    }
}
CheckOutController.$inject = ["$state", "$scope", "$rootScope", "$http", "$ngRedux"];

export default CheckOutController;