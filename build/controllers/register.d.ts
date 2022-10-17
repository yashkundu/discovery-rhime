import { Etcd3 } from "etcd3";
import { config, options, service } from "../interfaces";
declare const register: (serviceName: service, config: config, opts: options, etcd: Etcd3) => Promise<void>;
export { register };
