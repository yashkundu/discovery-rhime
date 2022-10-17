import { service } from "../interfaces"
import { Etcd3 } from "etcd3"
import { EventEmitter } from "events"

const watchOne = async (serviceName: service, etcd:Etcd3) => {
    const watcher = new EventEmitter()

    try {
        const etcdWatcher = await etcd.watch().key(serviceName).create()
        etcdWatcher.on('put', (kv) => {
            watcher.emit('put', kv)
        }).on('delete', (kv) => {
            watcher.emit('delete', kv)
        })
        console.log(`Successfully watching ${serviceName}`);
        return watcher
    } catch (error) {
        console.log(`Failed to watch ${serviceName}`);
        throw error
    }
}

const watchPrefix = async (prefix: string, etcd:Etcd3) => {
    const watcher = new EventEmitter()

    try {
        const etcdWatcher = await etcd.watch().prefix(prefix).create()
        etcdWatcher.on('put', (kv) => {
            watcher.emit('put', kv)
        }).on('delete', (kv) => {
            watcher.emit('delete', kv)
        })
        console.log(`Successfully watching ${prefix} prefix`);
        return watcher
    } catch (error) {
        console.log(`Failed to watch ${prefix} prefix`);
        throw error
    }
}

export {watchOne, watchPrefix}