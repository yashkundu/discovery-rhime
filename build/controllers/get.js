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
exports.getPrefix = exports.getOne = void 0;
const getOne = (serviceName, etcd) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield etcd.get(serviceName).string();
        return res;
    }
    catch (error) {
        console.log(`Failed to watch ${serviceName}`);
        throw error;
    }
});
exports.getOne = getOne;
const getPrefix = (prefix, etcd) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield etcd.getAll().prefix(prefix).exec();
        const finalRes = res.kvs.map(kv => ({
            key: kv.key.toString(),
            value: kv.value.toString()
        }));
        return finalRes;
    }
    catch (error) {
        console.log(`Failed to watch ${prefix} prefix`);
        throw error;
    }
});
exports.getPrefix = getPrefix;
