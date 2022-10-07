import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Transactions1664991255263 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'transactions',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'receiverAccount_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'senderAccount_id',
            type: 'uuid',
          },
          {
            name: 'type',
            type: 'enum',
            enumName: 'typeTransactions',
            enum: ['credit', 'debit'],
          },
          {
            name: 'value',
            type: 'numeric',
          },
          {
            name: 'description',
            type: 'varchar',
          },
          {
            name: 'counter',
            type: 'int',
            default: 0,
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'FKPSenderAccountCard',
            referencedTableName: 'accounts',
            referencedColumnNames: ['id'],
            columnNames: ['senderAccount_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'FKPReceiverAccountCard',
            referencedTableName: 'accounts',
            referencedColumnNames: ['id'],
            columnNames: ['receiverAccount_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('transactions');
  }
}
