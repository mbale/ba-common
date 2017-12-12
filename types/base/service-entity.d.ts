import { ObjectID } from 'typeorm';
/**
 * We need the type only during compile time
 * We don't want to include the whole class all the time
 *
 * @export
 * @interface Service
 */
export interface Service {
    _id: ObjectID;
    name: string;
    _keywords: string[];
    _createdAt: Date;
    _updatedAt: Date;
}
declare abstract class ServiceEntity implements Service {
    _id: ObjectID;
    name: string;
    _keywords: string[];
    _createdAt: Date;
    _updatedAt: Date;
    updateModificationDate(): void;
}
export default ServiceEntity;
