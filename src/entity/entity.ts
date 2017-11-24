import {
  ObjectID,
  ObjectIdColumn,
  Column,
  BeforeUpdate,
  BeforeInsert,
} from 'typeorm';

export interface IServiceEntity {
  _id : ObjectID;
  name : string;
  _keywords : string[];
  _createdAt : Date;
  _updatedAt : Date;
}

abstract class ServiceEntity implements IServiceEntity {
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
