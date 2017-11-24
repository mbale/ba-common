import { ObjectID } from 'typeorm';
export declare enum SourceType {
    Pinnacle = "pinnacle",
    OddsGG = "oddsgg",
}
export interface Source {
    type: SourceType;
    leagueId?: number;
    matchId?: number;
    _createdAt: Date;
}
export declare abstract class ServiceEntity {
    _id: ObjectID;
    name: string;
    _sources: Source[];
    _keywords: string[];
    _createdAt: Date;
    _updatedAt: Date;
    updateModificationDate(): void;
}
