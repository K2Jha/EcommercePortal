import angular from "angular";
import uiRouter from "angular-ui-router";
import Components from "./components/component";
import AppComponent from "./app.component";
import { createStore, compose, applyMiddleware } from "redux";
//import backendCallMiddleware from "./middlewares/index"
import ngRedux from "ng-redux";
import { createLogger } from 'redux-logger';
import ngCookies from "angular-cookies";
import { RootReducer } from "./reducers";
import thunk from "redux-thunk";
import './app.css';
const logger = createLogger({});
const middlewares = [];
middlewares.push(thunk);
middlewares.push(logger);
angular
    .module("app", [uiRouter, Components, ngRedux, ngCookies])
    .config(($ngReduxProvider) => {
        $ngReduxProvider.createStore(() => {
            return createStore(RootReducer, {}, compose(applyMiddleware(...middlewares)));
        });
    })
    .component("app", AppComponent)
    // .run([
    //     "$rootScope",
    //     "$location",
    //     "$cookies",
    //     "$window",
    //     "$http",
    //     function($rootScope, $location, $cookies, $window, $http) {
    //         // keep user logged in after page refresh
    //         $rootScope.globals = JSON.parse($window.localStorage["globals"] || {});
    //         if ($rootScope.globals.currentUser) {
    //             $http.defaults.headers.common["Authorization"] =
    //                 "Basic " + $rootScope.globals.currentUser.username; // jshint ignore:line
    //         }

//         $rootScope.$on("$locationChangeStart", function(event, next, current) {
//             // redirect to login page if not logged in
//             if ($location.path() !== "/" && !$rootScope.globals.currentUser) {
//                 $location.path("/");
//             }
//         });
//     },
// ]);