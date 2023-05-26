module.exports = function (User, router, jwt, Sequelize, dbConnection, bcrypt, saltRounds, Dictionary, secret, authorizationCheck, RSA_PRIVATE_KEY) {

    //START USER LIST
    router.route('/list/:id_company')
        .get(authorizationCheck, (req, res) => { // GET
            try {
                const company = parseInt(req.params.id_company);
                if (isNaN(company)) throw new Error(Dictionary.unknown_company('es'));
                const list = User.findAll({
                    where: { id_company: company }, attributes: ['id', 'username', 'email']
                })
                return res.status(200).json({ message: '', hasErr: false, data: list })
            } catch (error) {

            }
        })

        .post(async (req, res) => { // POST
            res.status(401).json({data:{0:0}, message: Dictionary.not_autorized('es') })
        })

        .put(async (req, res) => { // PUT
            res.status(401).json({data:{0:0}, message: Dictionary.not_autorized('es') })
        })

        .delete(async (req, res) => { // DELETE
            res.status(401).json({data:{0:0}, message: Dictionary.not_autorized('es') })
        })
    //END USER LIST

    //START LOGIN USER
    router.route('/login') // to login an existing user

        .get(async (req, res) => { // GET
            res.status(401).json({data:{0:0}, message: Dictionary.not_autorized('es') })
        })

        .post(async (req, res) => { // POST
            let pass;
            let user_;
            try {
                user_ = req.body.email.replace(/(')/g, '\'');
                pass = req.body.password.replace(/(')/g, '\'');
            } catch (error) {
                if (process.env.devmode) return res.status(200).json({ message: error.stack || error.message, hasErr: true });
                return res.status(200).json({ message: Dictionary.unknown_error('es'), hasErr: true });
            }

            dbConnection.transaction({ isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED }, async (t) => {
                const hash = await User.findOne({ where: { username: user_ }, attributes: ['password'], transaction: t });
                const compare = await bcrypt.compare(pass, hash.password);
                if (!compare) throw new Error(Dictionary.wrong_user_pass('es'));
                const user = await User.findOne({ where: { username: user_ }, attributes: ['id', 'username'], transaction: t });
                return user
            }).then((user) => {
                if (!user?.id) {
                    return res.status(401).json({data:{0:0}, message: Dictionary.wrong_user_pass('es'), hasErr: true });
                } else {
                    RSA_PRIVATE_KEY
                    return res.status(200).json({ data: user, message: '', hasErr: false });
                }
            }).catch((err) => {
                if (process.env.devmode) return res.status(401).json({data:{0:0}, message: err.stack || err.message, hasErr: true })
                return res.status(401).json({data:{0:0}, message: Dictionary.wrong_user_pass('es'), hasErr: true })
            })
        })

        .put(async (req, res) => { // PUT
            res.status(401).json({data:{0:0}, message: Dictionary.not_autorized('es') })
        })

        .delete(async (req, res) => { // DELETE
            res.status(401).json({data:{0:0}, message: Dictionary.not_autorized('es') })
        })
    //END LOGIN USER


    //START REGISTER USER
    router.route('/register') // to register a new user.

        .get((req, res) => { // GET
            res.status(401).json({data:{0:0}, message: Dictionary.not_autorized('es') })
        })

        .post(async (req, res) => { // POST
            try {
                const { email, password } = req.body;
                const createdUser = await dbConnection.transaction({ isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED }, async (t) => {
                    const username = req.body.username.replace(/(')/g, '\'');
                    const pass = password.replace(/(')/g, '\'');
                    const salt = await bcrypt.genSalt(saltRounds);
                    const hash = await bcrypt.hash(pass, salt);
                    const user = await User.create({ email: email, password: hash, username: username }, { transaction: t });
                    return user
                }) 
                if (!createdUser?.id) return res.status(401).json({data:{0:0}, message: Dictionary.fail_registration('es'), hasErr: true });
                const jwtBearerToken = jwt.sign({}, RSA_PRIVATE_KEY, {
                    algorithm: 'RS256',
                    expiresIn: 120,
                    subject: createdUser.id
                });
                res.cookie("SESSIONID", jwtBearerToken, {httpOnly:true, secure:true});
                res.status(200).json({ message: '', data: createdUser, hasErr: false });
            } catch (error) {
                if (process.env.devmode) return res.status(200).json({  message: error.stack || error.message, hasErr: true })
                res.status(200).json({  message: Dictionary.fail_registration('es'), hasErr: true })
            }
        })

        .put((req, res) => { // PUT
            res.status(401).json({data:{0:0}, message: Dictionary.not_autorized('es') })
        })

        .delete(async (req, res) => { // DELETE
            res.status(401).json({data:{0:0}, message: Dictionary.not_autorized('es') })
        })
    //END REGISTER USER

    //START JTW TOKEN VERIFICATION
    router.route('/authorize')
        .get((req, res) => { // GET
            res.status(401).json({data:{0:0}, message: Dictionary.not_autorized('es') })
        })

        .post(async (req, res) => { // POST
            try {
                if (req.headers["authorization"]) {
                    const bearerHeader = req.headers["authorization"][1];
                    // const token = req.body.token;
                    // Verify token
                    jwt.verify(token, secret, (err, decoded) => {
                        if (err) {
                            return res.status(401).json({data:{0:0}, message: 'Invalid token', hasErr: true });
                        }

                        // Find user by ID
                        const user = users.find(u => u.id === decoded.id);
                        if (!user) {
                            return res.status(401).json({data:{0:0}, message: 'Invalid token', hasErr: true });
                        }

                        // Return user data
                        return res.status(200).json({ id: user.id, email: user.email, username: user.username });
                    })
                } else {
                    return res.status(401).json({data:{0:0}, message: Dictionary.invalid_token('es'), hasErr: true });
                }

            } catch (error) {
                if (process.env.devmode) return res.status(200).json({  message: error.stack || error.message, hasErr: true })
                res.status(200).json({  message: Dictionary.unknown_error('es'), hasErr: true })
            }
        })

        .put((req, res) => { // PUT
            res.status(401).json({data:{0:0}, message: Dictionary.not_autorized('es') })
        })

        .delete(async (req, res) => { // DELETE
            res.status(401).json({data:{0:0}, message: Dictionary.not_autorized('es') })
        })
    //END JTW TOKEN VERIFICATION

    //START USER EDITION
    router.route('/edit')
        .get((req, res) => { // GET
            res.status(401).json({data:{0:0}, message: Dictionary.not_autorized('es') })
        })

        .post(async (req, res) => { // POST
            res.status(401).json({data:{0:0}, message: Dictionary.not_autorized('es') })
        })

        .put(async (req, res) => { // PUT
            try {
                let { _email, _password, _username, id_company } = req.body;
                const createdUser = await dbConnection.transaction({ isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED }, async (t) => {
                    const username = req.body.username.replace(/(')/g, '\'');
                    const pass = _password.replace(/(')/g, '\'');
                    const salt = await bcrypt.genSalt(saltRounds);
                    const hash = await bcrypt.hash(pass, salt);
                    const user = await User.create({
                        email: email,
                        password: hash,
                        username: username,
                        id_company: id_company,
                        delete: false
                    }, { transaction: t });
                    return user
                })
                if (!createdUser) return res.status(401).json({data:{0:0}, message: Dictionary.wrong_user_pass('es'), hasErr: true });
                res.status(200).json({ message: req.body.email + ' ' + req.body.password });
            } catch (error) {
                if (process.env.devmode) return res.status(200).json({  message: error.stack || error.message, hasErr: true })
                res.status(200).json({  message: Dictionary.unknown_error('es'), hasErr: true })
            }
        })

        .delete(async (req, res) => { // DELETE
            res.status(401).json({data:{0:0}, message: Dictionary.not_autorized('es') })
        })
    //END REGISTER USER
}