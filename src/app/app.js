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
    .config($ngReduxProvider => {
        $ngReduxProvider.createStore(() => {
            return createStore(
                RootReducer, {},
                compose(applyMiddleware(thunk, ...middlewares))
            );
        });
    })
    .component("app", AppComponent)
    .run([
        "$rootScope",
        "$location",
        "$cookies",
        function($rootScope, $location, $cookies) {
            let cookie = $cookies.get("globals");
            if (cookie == null) {
                $rootScope.globals = {};
            } else $rootScope.globals = JSON.parse($cookies.get("globals"));

            $rootScope.$on("$locationChangeStart", function(event, next, current) {
                if ($location.path() !== "/" && !$rootScope.globals.currentUser) {
                    event.preventDefault();
                    $location.path("/");
                }
            });
        },
    ]);