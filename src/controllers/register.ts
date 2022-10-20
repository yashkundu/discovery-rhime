import { Etcd3 } from "etcd3"
import { config, options, service } from "../interfaces"

const register = async (serviceName: service, config: config,  opts: options, etcd: Etcd3) => {
    if(!opts) opts = {}

    if(!opts.ttl) opts.ttl = 0;

    opts.ttl = Math.max(opts.ttl, 20);
    // const interval = opts.ttl - 5;

    const registerService = async () => {
        try {
            // lease is kept automatically alive by periodacally sending keepAlive
            // make autoKeepAlive: false for alternative behaviour
            await etcd.lease(opts.ttl as number).put(serviceName).value(JSON.stringify(config))
            console.log(`${serviceName} registered to registry`);
            
        } catch (error) {
            console.log(`${serviceName} failed to register to registry`);
            register(serviceName, config, opts, etcd)
            throw error
        }
    }

    try{
        await registerService()
        // Good alternative of the below is to keep the lease alive by calling keep-alive :)
        // setInterval(registerService, interval*1000)
    } catch(error) {
        // :(
    }
}


export {register}