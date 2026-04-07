import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
    async index({ request }: HttpContext){
        const page = request.input('page', 1)
        const limit = request.input('limit', 10)

        const users = await User.query().paginate(page, limit)

        return users
    }
}