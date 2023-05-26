module.exports = function (Weight, router, Sequelize, dbConnection, Dictionary, authorizationCheck) {

    //START LIST WEIGHT
    router.route('/list/:id_company')

        .get(authorizationCheck, async (req, res) => { // GET
            try {
                const company = parseInt(req.params.id_company);
                if (isNaN(company)) throw new Error(Dictionary.unknown_company('es'));
                const list = Weight.findAll({
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
    //END LIST WEIGHT


    //START REGISTER WEIGHT
    router.route('/register')

        .get((req, res) => { // GET
            res.status(401).json({data:{0:0}, message: Dictionary.not_autorized('es') })
        })

        .post(authorizationCheck, async (req, res) => { // POST
            try {
                const { id_company, id_animal, date, weight } = req.body;
                const createdWeight = await dbConnection.transaction({ isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED }, async (t) => {
                    const weight = await Weight.create(
                        {
                            id_company: id_company,
                            id_animal: id_animal,
                            date: date,
                            weight: weight,
                            deleted: false
                        }, { transaction: t });
                    return weight
                })
                if (!createdWeight) return res.status(401).json({data:{0:0}, message: Dictionary.fail_registration('es'), hasErr: true });
                return res.status(200).json({ message: Dictionary.success_registration('es'), data: createdWeight });
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
    //END REGISTER WEIGHT

    //START WEIGHT GET
    router.route('/get/:id/:id_company')

        .get(authorizationCheck, async (req, res) => { // GET
            try {
                const company = parseInt(req.params.id_company);
                const id = parseInt(req.params.id);
                if (isNaN(company)) throw new Error(Dictionary.unknown_company('es'));
                if (isNaN(id)) throw new Error(Dictionary.unknown_identity('es'));
                const weight = Weight.findOne({
                    where: { id_company: company, id: id }
                })
                return res.status(200).json({ message: '', hasErr: false, data: weight })
            } catch (err) {
                if (process.env.devmode) return res.status(200).json({ message: err.stack || err.message || err, hasErr: true })
                return res.status(200).json({ message: Dictionary.unknown_error('es'), hasErr: true })
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
    //END WEIGHT GET

    //START WEIGHT EDIT
    router.route('/edit/:id/:id_company')

        .get(async (req, res) => { // GET
            res.status(401).json({data:{0:0}, message: Dictionary.not_autorized('es') })
        })

        .post(async (req, res) => { // POST
            res.status(401).json({data:{0:0}, message: Dictionary.not_autorized('es') })
        })

        .put(authorizationCheck, async (req, res) => { // PUT
            try {
                const { id_animal, date, weight_ } = req.body
                const company = parseInt(req.params.id_company);
                const id = parseInt(req.params.id);
                if (isNaN(company)) throw new Error(Dictionary.unknown_company('es'));
                if (isNaN(id)) throw new Error(Dictionary.unknown_identity('es'));
                const edited = await dbConnection.transaction({ isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED }, async (t) => {
                    const weight = await Weight.update(
                        {
                            id_company: company,
                            id_animal: id_animal,
                            date: date,
                            weight: weight_,
                        }, { where: { id_company: company, id: id }, transaction: t });
                    return weight
                })
                if (!edited) return res.status(401).json({data:{0:0}, message: Dictionary.fail_edit('es'), hasErr: true });
                const weight = Weight.findOne({
                    where: { id_company: company, id: id }
                })
                return res.status(200).json({ message: Dictionary.success_edit('es'), data: weight, hasErr: false });
            } catch (err) {
                if (process.env.devmode) return res.status(200).json({ message: err.stack || err.message || err, hasErr: true })
                return res.status(200).json({ message: Dictionary.fail_edit('es'), hasErr: true })
            }
        })

        .delete(async (req, res) => { // DELETE
            res.status(401).json({data:{0:0}, message: Dictionary.not_autorized('es') })
        })
    //END WEIGHT EDIT

    //START WEIGHT DELETE
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
                const company = parseInt(req.params.company);
                const id = parseInt(req.params.id);
                if (isNaN(company)) throw new Error(Dictionary.unknown_company('es'));
                if (isNaN(id)) throw new Error(Dictionary.unknown_identity('es'));
                const deletedTroop_location = await dbConnection.transaction({ isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED }, async (t) => {
                    const weight = await Weight.update(
                        {
                            deleted: true
                        }, { where: { id_company: company, id: id }, transaction: t });
                    return weight
                })
                if (!deletedTroop_location) return res.status(401).json({data:{0:0}, message: Dictionary.fail_deletion('es'), hasErr: true });
                return res.status(200).json({ message: Dictionary.success_deletion('es'), data: { empty: true }, hasErr: false });
            } catch (err) {
                if (process.env.devmode) return res.status(200).json({ message: err.stack || err.message || err, hasErr: true })
                return res.status(200).json({ message: Dictionary.fail_deletion('es'), hasErr: true })
            }
        })
    //END WEIGHT DELETE
}