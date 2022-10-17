import { Etcd3 } from "etcd3"
import { config, options, service } from "../interfaces"

const register = async (serviceName: service, config: config,  opts: options, etcd: Etcd3) => {
    if(!opts) opts = {}

    if(!opts.ttl) opts.ttl = 0;

    opts.ttl = Math.max(opts.ttl, 20);
    const interval = opts.ttl - 5;

    const registerService = async () => {
        try {
            await etcd.lease(opts.ttl as number, {autoKeepAlive: false}).put(serviceName).value(JSON.stringify(config))
            console.log(`${serviceName} registered to registry`);
            
        } catch (error) {
            console.log(`${serviceName} failed to register to registry`);
            throw error
        }
    }

    await registerService()
    setInterval(registerService, interval*1000)

}


export {register}