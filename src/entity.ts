import {
  ObjectID,
  ObjectIdColumn,
  Column,
  BeforeUpdate,
  BeforeInsert,
} from 'typeorm';

export enum SourceType {
  Pinnacle = 'pinnacle',
  OddsGG = 'oddsgg',
}

export interface Source {
  type: SourceType;
  leagueId?: number;
  matchId?: number;
  _createdAt: Date;
}

export abstract class ServiceEntity {
  @ObjectIdColumn()
  _id : ObjectID;

  @Column()
  name : string;

  @Column()
  _sources : Source[];

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
