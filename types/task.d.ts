import { ServiceEntity } from './entity';
import { MongoRepository } from 'typeorm';
export declare abstract class BaseTask {
    repository: MongoRepository<ServiceEntity>;
    constructor(repository: MongoRepository<ServiceEntity>);
}
