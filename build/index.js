"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.service = exports.Registry = void 0;
const etcd3_1 = require("etcd3");
const register_1 = require("./controllers/register");
const watch_1 = require("./controllers/watch");
const get_1 = require("./controllers/get");
const interfaces_1 = require("./interfaces");
Object.defineProperty(exports, "service", { enumerable: true, get: function () { return interfaces_1.service; } });
class Registry {
    constructor(opts) {
        this._etcd = new etcd3_1.Etcd3(opts);
    }
    get etcd() {
        if (!this._etcd)
            throw new Error('Not connected to etcd instance');
        return this._etcd;
    }
    register(serviceName, config, opts) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, register_1.register)(serviceName, config, opts, this.etcd);
        });
    }
    getOne(serviceName) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, get_1.getOne)(serviceName, this.etcd);
        });
    }
    getPrefix(prefix) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, get_1.getPrefix)(prefix, this.etcd);
        });
    }
    watchOne(serviceName) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, watch_1.watchOne)(serviceName, this.etcd);
        });
    }
    watchPrefix(prefix) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, watch_1.watchPrefix)(prefix, this.etcd);
        });
    }
}
exports.Registry = Registry;
