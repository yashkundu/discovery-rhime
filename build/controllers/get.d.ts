import { service } from "../interfaces";
import { Etcd3 } from "etcd3";
declare const getOne: (serviceName: service, etcd: Etcd3) => Promise<string | null>;
declare const getPrefix: (prefix: string, etcd: Etcd3) => Promise<{
    key: string;
    value: string;
}[]>;
export { getOne, getPrefix };
