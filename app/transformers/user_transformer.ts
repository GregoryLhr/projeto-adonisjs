import type User from '#models/user'
import { BaseTransformer } from '@adonisjs/core/transformers'

export default class UserTransformer extends BaseTransformer<User> {
  toObject() {
    const user = this.resource
    const data = this.pick(user, [
      'id',
      'name',
      'email',
      'isAdmin',
      'token',
      'createdAt',
      'updatedAt',
      'initials',
    ])

    const baseUrl = 'http://localhost:3333'

    return {
      ...data,

      avatar: user.avatar
        ? `${baseUrl}${user.avatar}`
        : `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name ?? "User")}`,
    }
  }
}
