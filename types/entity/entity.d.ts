import { ObjectID } from 'typeorm';
declare abstract class ServiceEntity {
    _id: ObjectID;
    name: string;
    _keywords: string[];
    _createdAt: Date;
    _updatedAt: Date;
    updateModificationDate(): void;
}
export default ServiceEntity;
