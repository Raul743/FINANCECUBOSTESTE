import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { Accounts } from './Accounts';
import { Cards } from './Cards';

@Entity('account_card', { schema: 'public' })
export class AccountCard {
  @Column('uuid', {
    primary: true,
    name: 'id',
    default: () => 'uuid_generate_v4()',
  })
  id: string;

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

  @ManyToOne(() => Accounts, (accounts) => accounts.accountCards, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'account_id', referencedColumnName: 'id' }])
  account: Accounts;

  @ManyToOne(() => Cards, (cards) => cards.accountCards, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'card_id', referencedColumnName: 'id' }])
  card: Cards;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}
