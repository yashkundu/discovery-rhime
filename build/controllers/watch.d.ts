/// <reference types="node" />
import { service } from "../interfaces";
import { Etcd3 } from "etcd3";
import { EventEmitter } from "events";
declare const watchOne: (serviceName: service, etcd: Etcd3) => Promise<EventEmitter>;
declare const watchPrefix: (prefix: string, etcd: Etcd3) => Promise<EventEmitter>;
export { watchOne, watchPrefix };
