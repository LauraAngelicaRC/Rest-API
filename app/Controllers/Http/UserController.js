'use strict'

const User = use('App/Models/User');

class UserController {
    async login({ request, auth }) {
        const { email, password } = request.all();
        const token = await auth.attempt(email, password);
        return token;
    }

    async store({ request }) {
        const { email, password } = request.all();
        const user = await User.create({
            email,
            password,
            username: email
        });
        return user;
    };

    async update({ params, request }) {
        const { id } = params;
        const usernam = await User.find(id);
        usernam.merge(request.only('username'));
        await usernam.save();
        return usernam;
    };
}

module.exports = UserController