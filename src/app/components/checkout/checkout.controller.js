class CheckOutController {
    constructor($state, $scope, $rootScope, $http, $ngRedux) {
        this.$scope = $scope;
        this.$state = $state;
        this.$http = $http;
        this.$rootScope = $rootScope;
        this.products = [];
        this.cartProducts = [];
        this.ngRedux = $ngRedux;
        this.totalAmount = 0;
        let { unsubscribe } = this.ngRedux.connect(
            this.mapStateToThis
        )(this);
        $scope.$on("$destroy", unsubscribe);
        this.totalAmount = (this.calculateTotalAmount(this.finalProducts).toFixed(2));
    }

    mapStateToThis(state) {
        return {
            finalProducts: state.cartReducer,
        };
    }
    calculateTotalAmount(finalProducts) {
        let sum = 0;
        finalProducts.forEach(element => {
            sum += element.price;
        });
        return sum;
    }
}
CheckOutController.$inject = ["$state", "$scope", "$rootScope", "$http", "$ngRedux"];

export default CheckOutController;