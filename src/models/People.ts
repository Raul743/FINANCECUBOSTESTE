import { Column, Entity, OneToMany } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { Accounts } from './Accounts';

@Entity('people', { schema: 'public' })
export class People {
  @Column('uuid', { primary: true, name: 'id' })
  id: string;

  @Column('character varying', { name: 'name' })
  name: string;

  @Column('character varying', { name: 'document' })
  document: string;

  @Column('character varying', { name: 'password' })
  password: string;

  @Column('timestamp without time zone', {
    name: 'created_at',
    default: () => 'now()',
  })
  createdAt: Date;

  @Column('timestamp without time zone', {
    name: 'updated_at',
    default: () => 'now()',
  })
  updatedAt: Date;

  @OneToMany(() => Accounts, (accounts) => accounts.people)
  accounts: Accounts[];

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}
