const { User } = require('../models');
const { checkPass, hashPass } = require('../helpers/encryptor');

class Controller {

    static async index(req, res, next) {
        try {
            const length = 5;
            let capca = '';
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

            for (let i = 0; i < length; i++) {
                capca += characters.charAt(Math.floor(Math.random() * characters.length));
            }

            res.render('index', { capca });


        } catch (err) {
            res.send(err)
        }
    }
    static async login(req, res, next) {
        try {

            const { username, password, capca, capcainput } = req.body;

            if (capca !== capcainput) {
                res.send('Invalid Security code')
            }

            const user = await User.findOne({ where: { username } });
            if (!user) {
                res.send('Invalid username or password')

            }

            const isValidPass = checkPass(password, user.password);

            if (!isValidPass) {
                res.send('Invalid username or password')

            }

            res.redirect('/users')

        } catch (err) {
            res.send(err)

        }
    }

    static async getRegister(req, res, next) {
        try {
            res.render('register')
        } catch (err) {
            res.send(err)
        }
    }

    static async register(req, res, next) {
        try {
            const { username, password } = req.body;

            if (!username || !password) {
                res.send('Please fill all fields')
            }

            const user = await User.create({ username, password });

            res.redirect('/');

        } catch (err) {
            res.send(err)
        }
    }

    static async users(req, res, next) {
        try {
            const users = await User.findAll();

            res.render('user', { users });
        } catch (err) {
            res.send(err);
        }
    }
    static async editUsers(req, res, next) {
        try {
            const users = await User.findOne({ where: { id: +req.params.id } })

            res.render('user-edit', { users });
        } catch (err) {
            res.send(err);
        }
    }

    static async editUsersDo(req, res, next) {
        try {
            const id = +req.params.id;
            const { username, password } = req.body;

            const passhash = await hashPass(password);

            const users = await User.update({ username, passhash }, { where: { id } });

            res.redirect('/users');
        } catch (err) {
            res.send(err);
        }
    }

    static async delUsers(req, res, next) {
        try {
            const id = +req.params.id;
            const delusers = await User.destroy({ where: { id } });

            res.redirect('/users');
        } catch (err) {
            res.send(err);
        }
    }

}

module.exports = Controller;