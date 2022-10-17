/// <reference types="node" />
import { Etcd3, IOptions } from 'etcd3';
import { service, config, options } from './interfaces';
declare class Registry {
    private _etcd;
    constructor(opts: IOptions);
    get etcd(): Etcd3;
    register(serviceName: service, config: config, opts: options): Promise<void>;
    watchOne(serviceName: service): Promise<import("events")>;
    watchPrefix(prefix: string): Promise<import("events")>;
}
export { Registry };
