import { Service } from './types';
import {
  ObjectID,
  ObjectIdColumn,
  Column,
  BeforeUpdate,
} from 'typeorm';

abstract class ServiceEntity implements Service {
  @ObjectIdColumn()
  _id : ObjectID;

  @Column()
  name : string;

  @Column()
  _keywords : string[] = [];
  
  @Column()
  _createdAt : Date = new Date();

  @Column()
  _updatedAt : Date = new Date();

  @BeforeUpdate()
  updateModificationDate() {
    this._updatedAt = new Date();
  }
}

export default ServiceEntity;
