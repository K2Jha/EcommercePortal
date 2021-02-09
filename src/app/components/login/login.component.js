import template from "./login.html";
import controller from "./login.controller";
import "./login.css";
//import authenticateService from "./authenticate.service";

let loginComponent = {
    bindings: {},
    template,
    controller,
    controllerAs: "vm",
};

export default loginComponent;