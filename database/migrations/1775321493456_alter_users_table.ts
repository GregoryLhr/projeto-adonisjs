import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      // renomear coluna
      table.renameColumn('full_name', 'name')

      // novos campos
      table.string('avatar').nullable()
      table.boolean('is_admin').notNullable().defaultTo(false)
      table.string('token').nullable()
      table.timestamp('deleted_at').nullable()
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.renameColumn('name', 'full_name')

      table.dropColumn('avatar')
      table.dropColumn('is_admin')
      table.dropColumn('token')
      table.dropColumn('deleted_at')
    })
  }
}