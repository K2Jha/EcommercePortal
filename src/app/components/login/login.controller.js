import {
    getProducts,
    addToCart,
    removeFromCart,
} from "../../actions/cart.action";
class LoginCtrl {
    constructor(
        $scope,
        $state,
        $stateParams,
        $timeout,
        $rootScope,
        $http,
        $window,
        $cookies,
        $ngRedux,
    ) {
        this.$scope = $scope;
        this.$state = $state;
        this.$stateParams = $stateParams;
        this.$timeout = $timeout;
        //this.$rootScope = $rootScope;
        this.$http = $http;
        this.loginForm = true;
        this.registration = false;
        this.window = $window;
        this.$cookies = $cookies;
        this.$ngRedux = $ngRedux
        let { unsubscribe } = this.$ngRedux.connect(
            this.mapStateToThis,
            getProducts,
        )(this);
        this.$scope.$on("$destroy", unsubscribe);

        this.Login = function(username, password, callback) {
            $timeout(function() {
                var response = { success: username === "test@g.com" && password === "test" };
                if (!response.success) {
                    return (response.message = "Username or password is incorrect");
                }
                return callback(response);
            }, 1000);
        }
        this.SetCredentials = function(username, password) {
            $rootScope.globals = {
                currentUser: {
                    username: username,
                    password: password,
                },
            };

            // $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata; // jshint ignore:line
            this.window.localStorage["globals"] = JSON.stringify($rootScope.globals);
        }
    }
    logIn() {
        console.log("email", this.emailInput);
        console.log("hgfjhgjfh", this.passwordInput);
        var that = this;
        that.dataLoading = true;
        that.Login(
            that.emailInput,
            that.passwordInput,
            function(response) {

                if (response.success) {
                    that.SetCredentials(
                        that.emailInput,
                        that.passwordInput
                    );
                    that.$ngRedux.dispatch({ type: "GET_ALL_PRODUCTS" });
                    that.$state.go("home");
                } else {
                    that.error = response.message;
                    that.dataLoading = false;
                }
            }
        );
    }
    goToRegistration() {
        this.loginForm = false;
        this.registration = true;
    }
    register() {
        this.$state.go("home");
    }
}
LoginCtrl.$inject = [
    "$scope",
    "$state",
    "$stateParams",
    "$timeout",
    "$rootScope",
    "$http",
    "$window",
    "$cookies",
    "$ngRedux",

];

export default LoginCtrl;