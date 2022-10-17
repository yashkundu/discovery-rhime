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
exports.watchPrefix = exports.watchOne = void 0;
const events_1 = require("events");
const watchOne = (serviceName, etcd) => __awaiter(void 0, void 0, void 0, function* () {
    const watcher = new events_1.EventEmitter();
    try {
        const etcdWatcher = yield etcd.watch().key(serviceName).create();
        etcdWatcher.on('put', (kv) => {
            watcher.emit('put', kv);
        }).on('delete', (kv) => {
            watcher.emit('delete', kv);
        });
        console.log(`Successfully watching ${serviceName}`);
        return watcher;
    }
    catch (error) {
        console.log(`Failed to watch ${serviceName}`);
        throw error;
    }
});
exports.watchOne = watchOne;
const watchPrefix = (prefix, etcd) => __awaiter(void 0, void 0, void 0, function* () {
    const watcher = new events_1.EventEmitter();
    try {
        const etcdWatcher = yield etcd.watch().prefix(prefix).create();
        etcdWatcher.on('put', (kv) => {
            watcher.emit('put', kv);
        }).on('delete', (kv) => {
            watcher.emit('delete', kv);
        });
        console.log(`Successfully watching ${prefix} prefix`);
        return watcher;
    }
    catch (error) {
        console.log(`Failed to watch ${prefix} prefix`);
        throw error;
    }
});
exports.watchPrefix = watchPrefix;
