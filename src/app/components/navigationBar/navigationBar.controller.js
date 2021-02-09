class NavigationController {
    constructor($state, $scope, $rootScope, $http, $window, $ngRedux) {
        this.$scope = $scope;
        this.$state = $state;
        this.$http = $http;
        this.$roorScope = $rootScope;
        this.products = [];
        this.cartProducts = [];
        this.noOfProducts = 0;
        this.window = $window;
        this.$ngRedux = $ngRedux;
        let { unsubscribe } = this.$ngRedux.connect(this.mapStateToThis)(this);
        this.$scope.$on("$destroy", unsubscribe);
    }
    mapStateToThis(state) {
        return {
            noOfProducts: state.cartReducer.length,
        };
    }
    logOut() {
        console.log("logging out");
        this.window.localStorage.removeItem("user");
        this.$state.go("login");
    }

    removeFromCart() {}

    proceedToCheckout() {
        this.$state.go("checkout");
    }
}
NavigationController.$inject = ["$state", "$scope", "$rootScope", "$http", "$window", "$ngRedux"];

export default NavigationController;