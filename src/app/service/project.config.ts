import { environment } from "src/environments/environment";


export default class ProjectConfig {

  static readonly project = environment.project;

  static readonly server_config = {
    serverUrl: ProjectConfig.project,
    project: ProjectConfig.project,
    masterKey: 'tpylcdro5cfaz89rm7e8yk',
    clientKey: `${environment.project}-${environment.clientType}`,
    apiKey: 'Fyxtch9NkpmQq',
    // serverUrl: ProjectConfig.project,
    // project: ProjectConfig.project,
    // masterKey: 'p8zFUKma6y',
    // clientKey: `${ProjectConfig.project}-store`,
    // apiKey: 'hnAipIhzDN',
  };


}
