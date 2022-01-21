import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'proyectoEmpresa',
  connector: 'mongodb',
  //url: 'mongodb+srv://prog_web:ProgWebMintic@clusterprogweb.nkwjt.mongodb.net/proyectoEmpresa?retryWrites=true&w=majority',
  url: 'mongodb://prog_web:ProgWebMintic@clusterprogweb-shard-00-00.nkwjt.mongodb.net:27017,clusterprogweb-shard-00-01.nkwjt.mongodb.net:27017,clusterprogweb-shard-00-02.nkwjt.mongodb.net:27017/proyectoEmpresa?ssl=true&replicaSet=atlas-11tj0p-shard-0&authSource=admin&retryWrites=true&w=majority',
  host: '',
  port: 0,
  user: '',
  password: '',
  database: '',
  useNewUrlParser: true
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class ProyectoEmpresaDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'proyectoEmpresa';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.proyectoEmpresa', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
