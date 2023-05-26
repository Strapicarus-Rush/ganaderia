module.exports = function (Breteado, router, Sequelize, dbConnection, Dictionary, authorizationCheck) {

    //START LIST BRETEADO
    router.route('/list/:id_company')

        .get(authorizationCheck, async (req, res) => { // GET
            try {
                const company = parseInt(req.params.id_company);
                if (isNaN(company)) throw new Error(Dictionary.unknown_company('es'));
                const list = Breteado.findAll({
                    where: { id_company: company }
                })
                return res.status(200).json({ message: '', hasErr: false, data: list })
            } catch (err) {
                if (process.env.devmode) return res.status(200).json({ message: err.stack || err.message || err, hasErr: true })
                return res.status(200).json({ message: Dictionary.fail_list('es'), hasErr: true })
            }
        })

        .post(async (req, res) => { // POST
            res.status(401).json({data:{0:0}, message: Dictionary.not_autorized('es') });
        })

        .put(async (req, res) => { // PUT
            res.status(401).json({data:{0:0}, message: Dictionary.not_autorized('es') });
        })

        .delete(async (req, res) => { // DELETE
            res.status(401).json({data:{0:0}, message: Dictionary.not_autorized('es') });
        })
    //END LIST BRETEADO


    //START REGISTER BRETEADO
    router.route('/register')

        .get((req, res) => { // GET
            res.status(401).json({data:{0:0}, message: Dictionary.not_autorized('es') })
        })

        .post(authorizationCheck, async (req, res) => { // POST
            try {
                const { id_company, id_animal, id_operation, date, period } = req.body;
                const createdBreteado = await dbConnection.transaction({ isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED }, async (t) => {
                    const breteado = await Breteado.create(
                        {
                            id_company: id_company,
                            id_animal: id_animal,
                            id_operation: id_operation,
                            date: date,
                            period: period,
                            deleted: false
                        }, { transaction: t });
                    return breteado
                })
                if (!createdBreteado) return res.status(401).json({data:{0:0}, message: Dictionary.fail_registration('es'), hasErr: true });
                return res.status(200).json({ message: Dictionary.success_registration('es'), data: createdBreteado });
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
    //END REGISTER BRETEADO

    //START BRETEADO GET
    router.route('/get/:id/:id_company')

        .get(authorizationCheck, async (req, res) => { // GET
            try {
                const company = parseInt(req.params.id_company);
                const id = parseInt(req.params.id);
                if (isNaN(company)) throw new Error(Dictionary.unknown_company('es'));
                if (isNaN(id)) throw new Error(Dictionary.unknown_identity('es'));
                const breteado = Breteado.findOne({
                    where: { id_company: company, id: id }
                })
                return res.status(200).json({ message: '', hasErr: false, data: breteado });
            } catch (err) {
                if (process.env.devmode) return res.status(200).json({ message: err.stack || err.message || err, hasErr: true });
                return res.status(200).json({ message: Dictionary.unknown_error('es'), hasErr: true });
            }
        })

        .post(async (req, res) => { // POST
            res.status(401).json({data:{0:0}, message: Dictionary.not_autorized('es') })
        })

        .put((req, res) => { // PUT
            res.status(401).json({data:{0:0}, message: Dictionary.not_autorized('es') })
        })

        .delete(async (req, res) => { // DELETE
            res.status(401).json({data:{0:0}, message: Dictionary.not_autorized('es') })
        })
    //END BRETEADO GET

    //START BRETEADO EDIT
    router.route('/edit/:id/:id_company')

        .get(async (req, res) => { // GET
            res.status(401).json({data:{0:0}, message: Dictionary.not_autorized('es') })
        })

        .post(async (req, res) => { // POST
            res.status(401).json({data:{0:0}, message: Dictionary.not_autorized('es') })
        })

        .put(authorizationCheck, async (req, res) => { // PUT
            try {
                const {id_animal, id_operation, date, period} = req.body
                const company = parseInt(req.params.id_company);
                const id = parseInt(req.params.id);
                if (isNaN(company)) throw new Error(Dictionary.unknown_company('es'));
                if (isNaN(id)) throw new Error(Dictionary.unknown_identity('es'));
                const edited = await dbConnection.transaction({ isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED }, async (t) => {
                    const breteado = await Breteado.update(
                        {
                            id_company: company,
                            id_animal: id_animal,
                            id_operation: id_operation,
                            date: date,
                            period: period
                        }, { where: { id_company: company, id: id }, transaction: t });
                    return breteado
                })
                if (!edited) return res.status(401).json({data:{0:0}, message: Dictionary.fail_edit('es'), hasErr: true });
                const breteado = Breteado.findOne({
                    where: { id_company: company, id: id }
                })
                return res.status(200).json({ message: Dictionary.success_edit('es'), data: breteado, hasErr: false });
            } catch (err) {
                if (process.env.devmode) return res.status(200).json({ message: err.stack || err.message || err, hasErr: true })
                return res.status(200).json({ message: Dictionary.fail_edit('es'), hasErr: true })
            }
        })

        .delete(async (req, res) => { // DELETE
            res.status(401).json({data:{0:0}, message: Dictionary.not_autorized('es') })
        })
    //END BRETEADO EDIT

    //START BRETEADO DELETE
    router.route('/delete/:id/:id_company')

        .get(authorizationCheck, async (req, res) => { // GET
            res.status(401).json({data:{0:0}, message: Dictionary.not_autorized('es') })
        })

        .post(async (req, res) => { // POST
            res.status(401).json({data:{0:0}, message: Dictionary.not_autorized('es') })
        })

        .put((req, res) => { // PUT
            res.status(401).json({data:{0:0}, message: Dictionary.not_autorized('es') })
        })

        .delete(async (req, res) => { // DELETE
            try {
                const company = parseInt(req.params.id_company);
                const id = parseInt(req.params.id);
                if (isNaN(company)) throw new Error(Dictionary.unknown_company('es'));
                if (isNaN(id)) throw new Error(Dictionary.unknown_identity('es'));
                const deletedBreteado = await dbConnection.transaction({ isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED }, async (t) => {
                    const breteado = await Breteado.update(
                        {
                            deleted: true
                        }, { where: { id_company: company, id: id }, transaction: t });
                    return breteado
                })
                if (!deletedBreteado) return res.status(401).json({data:{0:0}, message: Dictionary.fail_deletion('es'), hasErr: true });
                return res.status(200).json({ message: Dictionary.success_deletion('es'), data: { empty: true }, hasErr: false });
            } catch (err) {
                if (process.env.devmode) return res.status(200).json({ message: err.stack || err.message || err, hasErr: true })
                return res.status(200).json({ message: Dictionary.fail_deletion('es'), hasErr: true })
            }
        })
    //END BRETEADO DELETE
}