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
exports.register = void 0;
const register = (serviceName, config, opts, etcd) => __awaiter(void 0, void 0, void 0, function* () {
    if (!opts)
        opts = {};
    if (!opts.ttl)
        opts.ttl = 0;
    opts.ttl = Math.max(opts.ttl, 20);
    const interval = opts.ttl - 5;
    const registerService = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield etcd.lease(opts.ttl, { autoKeepAlive: false }).put(serviceName).value(JSON.stringify(config));
            console.log(`${serviceName} registered to registry`);
        }
        catch (error) {
            console.log(`${serviceName} failed to register to registry`);
            register(serviceName, config, opts, etcd);
            throw error;
        }
    });
    try {
        yield registerService();
        setInterval(registerService, interval * 1000);
    }
    catch (error) {
        // :(
    }
});
exports.register = register;
