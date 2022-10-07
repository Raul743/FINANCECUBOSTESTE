import { Column, Entity, OneToMany } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { AccountCard } from './AccountCard';

@Entity('cards', { schema: 'public' })
export class Cards {
  @Column('uuid', { primary: true, name: 'id' })
  id: string;

  @Column('enum', { name: 'type', enum: ['physical', 'virtual'] })
  type: 'physical' | 'virtual';

  @Column('character varying', { name: 'number' })
  number: string;

  @Column('character varying', { name: 'cvv' })
  cvv: string;

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

  @OneToMany(() => AccountCard, (accountCard) => accountCard.card)
  accountCards: AccountCard[];

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}
