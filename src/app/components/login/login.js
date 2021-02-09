import angular from "angular";
import uiRouter from "angular-ui-router";
import loginComponent from "./login.component";
import ngCookies from 'angular-cookies';
//import { name as authenticateService } from "./authenticate.service"

let loginModule = angular
    .module("login", [uiRouter, ngCookies])

.config(($stateProvider, $urlRouterProvider) => {
        "ngInject";

        $urlRouterProvider.otherwise("/");

        $stateProvider.state("login", {
            url: "/",
            component: "login",
        });
    })
    .component("login", loginComponent).name;


export default loginModule;