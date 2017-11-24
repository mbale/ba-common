import { ServiceEntity } from './entity';
import { MongoRepository } from 'typeorm'; 
import { Container } from 'typedi';

export abstract class BaseTask {
  public repository : MongoRepository<ServiceEntity> = null;

  constructor(repository : MongoRepository<ServiceEntity>) {
    this.repository = repository;
  }

  // public abstract async run(jobData? : JobData) : Promise<JobResult>;
}
