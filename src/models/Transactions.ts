import { Column, Entity, JoinColumn, ManyToOne, BaseEntity } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { Accounts } from './Accounts';

@Entity('transactions', { schema: 'public' })
export class Transactions extends BaseEntity {
  @Column('uuid', {
    primary: true,
    name: 'id',
    default: () => 'uuid_generate_v4()',
  })
  id: string;

  @Column('enum', { name: 'type', enum: ['credit', 'debit'] })
  type: 'credit' | 'debit';

  @Column('numeric', { name: 'value' })
  value: string;

  @Column('character varying', { name: 'description' })
  description: string;

  @Column('integer', { name: 'counter', default: () => '0' })
  counter: number;

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

  @ManyToOne(() => Accounts, (accounts) => accounts.transactions, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'receiverAccount_id', referencedColumnName: 'id' }])
  receiverAccount: Accounts;

  @ManyToOne(() => Accounts, (accounts) => accounts.transactions2, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'senderAccount_id', referencedColumnName: 'id' }])
  senderAccount: Accounts;

  constructor() {
    super();
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}
