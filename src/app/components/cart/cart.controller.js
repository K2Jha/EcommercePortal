class CartController {
    constructor($state, $scope, $rootScope, $http, $ngRedux) {
        this.$scope = $scope;
        this.$state = $state;
        this.$http = $http;
        this.$roorScope = $rootScope;
        this.products = [];
        this.cartProducts = [];
        this.ngRedux = $ngRedux;
        let { unsubscribe } = this.ngRedux.connect(this.mapStateToThis)(this);
        $scope.$on("$destroy", unsubscribe);
        this.userId = 1;
    }
    mapStateToThis(state) {
        return {
            cartProducts: state.cartReducer,
        };
    }

    removeFromCart(id) {
        this.ngRedux.dispatch({ type: "REMOVE_FROM_CART", payload: id });
    }

    proceedToCheckout() {
        this.$state.go("checkout");
    }
}
CartController.$inject = ["$state", "$scope", "$rootScope", "$http", "$ngRedux"];

export default CartController;