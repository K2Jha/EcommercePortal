import angular from "angular";
import uiRouter from "angular-ui-router";
import Components from "./components/component";
import AppComponent from "./app.component";
import { createStore, compose, applyMiddleware } from "redux";
//import backendCallMiddleware from "./middlewares/index"
import ngRedux from "ng-redux";
import { createLogger } from "redux-logger";
import { RootReducer } from "./reducers";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import Storage from "localforage";
import autoMergeLevel1 from "redux-persist/lib/stateReconciler/autoMergeLevel1";
import './app.css';
const logger = createLogger({});
const middlewares = [];
middlewares.push(thunk);
middlewares.push(logger);


const persistConfig = {
    key: "root",
    storage: Storage,
    stateReconciler: autoMergeLevel1,
};
const persistedRootReducer = persistReducer(persistConfig, RootReducer);

const configureStore = () => {
    const store = createStore(
        persistedRootReducer,
        compose(applyMiddleware(thunk, ...middlewares))
    );
    const persistor = persistStore(store);

    return { store, persistor };
};
angular
    .module("app", [uiRouter, Components, ngRedux])
    .config($ngReduxProvider => {
        $ngReduxProvider.createStore(() => {
            let { store } = configureStore();
            return store;
        });
    })
    .component("app", AppComponent)
    .run([
        "$rootScope",
        "$location",
        "$window",
        function($rootScope, $location, $window) {
            let cookie = $window.localStorage.getItem("globals");
            if (cookie == null) {
                $rootScope.globals = {};
            } else
                $rootScope.globals = JSON.parse(
                    $window.localStorage.getItem("globals")
                );

            $rootScope.$on("$locationChangeStart", function(event, next, current) {
                if ($location.path() !== "/" && !$rootScope.globals.currentUser) {
                    event.preventDefault();
                    $window.localStorage["lastRoute"] = $location.path();
                    $location.path("/");
                }
            });
        },
    ]);