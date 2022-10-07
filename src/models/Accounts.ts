import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  BaseEntity,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { AccountCard } from './AccountCard';
import { People } from './People';
import { Transactions } from './Transactions';

@Entity('accounts', { schema: 'public' })
export class Accounts extends BaseEntity {
  constructor() {
    super();
    if (!this.id) {
      this.id = uuidV4();
    }
  }
  @Column('uuid', { primary: true, name: 'id' })
  id: string;

  @Column('character varying', { name: 'branch' })
  branch: string;

  @Column('character varying', { name: 'account' })
  account: string;

  @Column('numeric', { name: 'balance' })
  balance: string;

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

  @OneToMany(() => AccountCard, (accountCard) => accountCard.account)
  accountCards: AccountCard[];

  @ManyToOne(() => People, (people) => people.accounts, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'people_id', referencedColumnName: 'id' }])
  people: People;

  @OneToMany(() => Transactions, (transactions) => transactions.receiverAccount)
  transactions: Transactions[];

  @OneToMany(() => Transactions, (transactions) => transactions.senderAccount)
  transactions2: Transactions[];
}
