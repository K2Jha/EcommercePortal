import angular from "angular";
import uiRouter from "angular-ui-router";
import checkoutComponent from "./checkout.component";

let checkoutModule = angular
    .module("checkout", [uiRouter])

.config(($stateProvider, $urlRouterProvider) => {
    "ngInject";

    $urlRouterProvider.otherwise("/");

    $stateProvider.state("checkout", {
        url: "/checkout",
        component: "checkout",
    });
})

.component("checkout", checkoutComponent).name;

export default checkoutModule;