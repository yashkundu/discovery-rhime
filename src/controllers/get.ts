import { service } from "../interfaces"
import { Etcd3 } from "etcd3"

const getOne = async (serviceName: service, etcd:Etcd3) => {
    try {
        const res = await etcd.get(serviceName).string()
        return res
    } catch (error) {
        console.log(`Failed to get ${serviceName} service address`);
        throw error
    }
}

const getPrefix = async (prefix: string, etcd:Etcd3) => {
    try {
        const res = await etcd.getAll().prefix(prefix).exec()
        const finalRes = res.kvs.map(kv => ({
            key: kv.key.toString(),
            value: kv.value.toString()
        }))
        return finalRes
    } catch (error) {
        console.log(`Failed to get ${prefix} prefix address`);
        throw error
    }
}

export {getOne, getPrefix}