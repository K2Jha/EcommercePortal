import angular from "angular";
import Home from "./home/home";
import Login from "./login/login";
import Cart from "./cart/cart";
import Checkout from "./checkout/checkout";
import NavigationBar from "./navigationBar/navigationBar";

let componentModule = angular.module("app.components", [Home, Login, Cart, Checkout, NavigationBar]).name;

export default componentModule;