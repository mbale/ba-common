import {
  ObjectID,
  ObjectIdColumn,
  Column,
  BeforeUpdate,
} from 'typeorm';

/**
 * We need the type only during compile time
 * We don't want to include the whole class all the time
 * 
 * @export
 * @interface Service
 */
export interface Service {
  _id : ObjectID;
  name : string;
  _keywords : string[];
  _createdAt : Date;
  _updatedAt : Date;
}

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
