import angular from "angular";
import uiRouter from "angular-ui-router";
import navigationComponent from "./navigationBar.component";

let navigationBarModule = angular
    .module("nav", [uiRouter])

// .config(($stateProvider, $urlRouterProvider) => {
//     "ngInject";

//     $urlRouterProvider.otherwise("/");

//     $stateProvider.state("cart", {
//         url: "/cart",
//         component: "cart",
//     });
// })

.component("navigationBar", navigationComponent).name;

export default navigationBarModule;