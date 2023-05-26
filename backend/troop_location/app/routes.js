module.exports = function (Troop_location, router, Sequelize, dbConnection, Dictionary, authorizationCheck) {

    //START LIST TROOP_LOCATION
    router.route('/list/:id_company')

        .get(authorizationCheck, async (req, res) => { // GET
            try {
                const company = parseInt(req.params.id_company);
                if (isNaN(company)) throw new Error(Dictionary.unknown_company('es'));
                const list = Troop_location.findAll({
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
    //END LIST TROOP_LOCATION


    //START REGISTER TROOP_LOCATION
    router.route('/register')

        .get((req, res) => { // GET
            res.status(401).json({data:{0:0}, message: Dictionary.not_autorized('es') })
        })

        .post(authorizationCheck, async (req, res) => { // POST
            try {
                const { id_company, id_corral, id_troop, id_grassland } = req.body;
                const createdTroopLocation = await dbConnection.transaction({ isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED }, async (t) => {
                    const troop_location = await Troop_location.create(
                        {
                            id_company: id_company,
                            id_corral: id_corral,
                            id_troop: id_troop,
                            id_grassland: id_grassland,
                            deleted: false
                        }, { transaction: t });
                    return troop_location
                })
                if (!createdTroopLocation) return res.status(401).json({data:{0:0}, message: Dictionary.fail_registration('es'), hasErr: true });
                return res.status(200).json({ message: Dictionary.success_registration('es'), data: createdTroopLocation });
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
    //END REGISTER TROOP_LOCATION

    //START TROOP_LOCATION GET
    router.route('/get/:id/:id_company')

        .get(authorizationCheck, async (req, res) => { // GET
            try {
                const company = parseInt(req.params.id_company);
                const id = parseInt(req.params.id);
                if (isNaN(company)) throw new Error(Dictionary.unknown_company('es'));
                if (isNaN(id)) throw new Error(Dictionary.unknown_identity('es'));
                const troop_location = Troop_location.findOne({
                    where: { id_company: company, id: id }
                })
                return res.status(200).json({ message: '', hasErr: false, data: troop_location })
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
    //END TROOP_LOCATION GET

    //START TROOP_LOCATION EDIT
    router.route('/edit/:id/:id_company')

        .get(async (req, res) => { // GET
            res.status(401).json({data:{0:0}, message: Dictionary.not_autorized('es') })
        })

        .post(async (req, res) => { // POST
            res.status(401).json({data:{0:0}, message: Dictionary.not_autorized('es') })
        })

        .put(authorizationCheck, async (req, res) => { // PUT
            try {
                const { id_corral, id_troop, id_grassland } = req.body
                const company = parseInt(req.params.id_company);
                const id = parseInt(req.params.id);
                if (isNaN(company)) throw new Error(Dictionary.unknown_company('es'));
                if (isNaN(id)) throw new Error(Dictionary.unknown_identity('es'));
                const edited = await dbConnection.transaction({ isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED }, async (t) => {
                    const troop_location = await Troop_location.update(
                        {
                            id_company: company,
                            id_corral: id_corral,
                            id_troop: id_troop,
                            id_grassland: id_grassland
                        }, { where: { id_company: company, id: id }, transaction: t });
                    return troop_location
                })
                if (!edited) return res.status(401).json({data:{0:0}, message: Dictionary.fail_edit('es'), hasErr: true });
                const troop_location = Troop_location.findOne({
                    where: { id_company: company, id: id }
                })
                return res.status(200).json({ message: Dictionary.success_edit('es'), data: troop_location, hasErr: false });
            } catch (err) {
                if (process.env.devmode) return res.status(200).json({ message: err.stack || err.message || err, hasErr: true })
                return res.status(200).json({ message: Dictionary.fail_edit('es'), hasErr: true })
            }
        })

        .delete(async (req, res) => { // DELETE
            res.status(401).json({data:{0:0}, message: Dictionary.not_autorized('es') })
        })
    //END TROOP_LOCATION EDIT

    //START TROOP_LOCATION DELETE
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
                    const troop_location = await Troop_location.update(
                        {
                            deleted: true
                        }, { where: { id_company: company, id: id }, transaction: t });
                    return troop_location
                })
                if (!deletedTroop_location) return res.status(401).json({data:{0:0}, message: Dictionary.fail_deletion('es'), hasErr: true });
                return res.status(200).json({ message: Dictionary.success_deletion('es'), data: { empty: true }, hasErr: false });
            } catch (err) {
                if (process.env.devmode) return res.status(200).json({ message: err.stack || err.message || err, hasErr: true })
                return res.status(200).json({ message: Dictionary.fail_deletion('es'), hasErr: true })
            }
        })
    //END TROOP_LOCATION DELETE
}