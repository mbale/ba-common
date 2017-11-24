import { ObjectID } from 'typeorm';
export interface IServiceEntity {
    _id: ObjectID;
    name: string;
    _keywords: string[];
    _createdAt: Date;
    _updatedAt: Date;
}
declare abstract class ServiceEntity implements IServiceEntity {
    _id: ObjectID;
    name: string;
    _keywords: string[];
    _createdAt: Date;
    _updatedAt: Date;
    updateModificationDate(): void;
}
export default ServiceEntity;
