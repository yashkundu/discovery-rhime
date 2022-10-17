import {Etcd3, IOptions} from 'etcd3'
import {register as registerService} from './controllers/register'
import { watchOne as watchOneService, watchPrefix as watchPrefixServices } from './controllers/watch';
import {service, config, options} from './interfaces'

class Registry {
    private _etcd: Etcd3;

    constructor(opts: IOptions){
        this._etcd = new Etcd3(opts)
    }

    get etcd(){
        if(!this._etcd)
            throw new Error('Not connected to etcd instance');
        return this._etcd;
    }

    async register(serviceName: service, config: config, opts: options){
        await registerService(serviceName, config, opts, this._etcd)
    }

    async watchOne(serviceName: service){
        return watchOneService(serviceName, this._etcd)
    }

    async watchPrefix(prefix: string){
        return watchPrefixServices(prefix, this._etcd)
    }


}

export {Registry, service, config, options}