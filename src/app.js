"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var http_1 = __importDefault(require("http"));
var socket_io_1 = __importDefault(require("socket.io"));
var app = express_1.default(), server = new http_1.default.Server(app), host = "localhost";
var main = {
    port: process.env.PORT || 3500,
    app: app, server: server, host: host,
    socket: socket_io_1.default(server)
};
var Server = /** @class */ (function () {
    function Server(main) {
        this.main = main;
    }
    Server.prototype.appConfig = function () {
        this.main.app
            .use(body_parser_1.default.json())
            .use(body_parser_1.default.urlencoded({ extended: true }));
    };
    Server.prototype.includeRoutes = function () {
    };
    Server.prototype.initDB = function () {
    };
    Server.prototype.appExecute = function () {
        var _this = this;
        this.appConfig();
        this.includeRoutes();
        this.initDB();
        var onListening = function () { return console.log("Conexion establecida en puerto: " + _this.main.port); };
        this.main.server.listen(this.main.port, onListening);
    };
    return Server;
}());
var start = new Server(main);
start.appExecute();
