import { MoveSchema } from '#database/schema'
import { beforeCreate, belongsTo } from '@adonisjs/lucid/orm'
import { v4 as uuid } from 'uuid'
import Product from './product.ts'
import User from './user.ts'

export default class Move extends MoveSchema {
  @beforeCreate()
  public static assignUuid(move: Move) {
    if (!move.id) {
      move.id = uuid()
    }
  }

  @belongsTo(() => Product, {
    foreignKey: 'productId',
  })
  declare product: any

  @belongsTo(() => User, {
    foreignKey: 'userId',
  })
  declare user: any
}