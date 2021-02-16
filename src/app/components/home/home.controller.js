import { getNewProducts } from "../../actions/product.action";
class HomeController {
    constructor($state, $scope, $rootScope, $http, $ngRedux) {
        this.$scope = $scope;
        this.$state = $state;
        this.$http = $http;
        this.$roorScope = $rootScope;
        this.products = [];
        this.cartProducts = [];
        this.$ngRedux = $ngRedux;
        let { unsubscribe } = this.$ngRedux.connect(this.mapStateToThis)(this);
        this.$scope.$on("$destroy", unsubscribe);
        this.getProducts();
    }
    $onInit() {
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
            });
    }
}
HomeController.$inject = ["$state", "$scope", "$rootScope", "$http", "$ngRedux"];

export default HomeController;