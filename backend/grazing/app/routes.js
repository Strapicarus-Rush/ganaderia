module.exports = function (Grazing, router, Sequelize, dbConnection, Dictionary, authorizationCheck) {

    //START LIST GRAZING
    router.route('/list/:id_company')

        .get(authorizationCheck, async (req, res) => { // GET
            try {
                const company = parseInt(req.params.id_company);
                if (isNaN(company)) throw new Error(Dictionary.unknown_company('es'));
                const list = Grazing.findAll({
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
    //END LIST GRAZING


    //START REGISTER GRAZING
    router.route('/register')

        .get((req, res) => { // GET
            res.status(401).json({data:{0:0}, message: Dictionary.not_autorized('es') })
        })

        .post(authorizationCheck, async (req, res) => { // POST
            try {
                const { id_company, id_grassland, animal, corral, date, completed} = req.body;
                const createdGrazing = await dbConnection.transaction({ isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED }, async (t) => {
                    const grazing = await Grazing.create(
                        {
                            id_company: id_company,
                            id_grassland: id_grassland,
                            animal: animal,
                            corral: corral,
                            date: date,
                            completed: completed,
                            deleted: false
                        }, { transaction: t });
                    return grazing
                })
                if (!createdGrazing) return res.status(401).json({data:{0:0}, message: Dictionary.fail_registration('es'), hasErr: true });
                return res.status(200).json({ message: Dictionary.success_registration('es'), data: createdGrazing });
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
    //END REGISTER GRAZING

    //START GRAZING GET
    router.route('/get/:id/:id_company')

        .get(authorizationCheck, async (req, res) => { // GET
            try {
                const company = parseInt(req.params.id_company);
                const id = parseInt(req.params.id);
                if (isNaN(company)) throw new Error(Dictionary.unknown_company('es'));
                if (isNaN(id)) throw new Error(Dictionary.unknown_identity('es'));
                const grazing = Grazing.findOne({
                    where: { id_company: company, id: id }
                })
                return res.status(200).json({ message: '', hasErr: false, data: grazing })
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
    //END GRAZING GET

    //START GRAZING EDIT
    router.route('/edit/:id/:id_company')

        .get(async (req, res) => { // GET
            res.status(401).json({data:{0:0}, message: Dictionary.not_autorized('es') })
        })

        .post(async (req, res) => { // POST
            res.status(401).json({data:{0:0}, message: Dictionary.not_autorized('es') })
        })

        .put(authorizationCheck, async (req, res) => { // PUT
            try {
                const {id_company, id_grassland, animal, corral, date, completed} = req.body
                const company = parseInt(req.params.id_company);
                const id = parseInt(req.params.id);
                if (isNaN(company)) throw new Error(Dictionary.unknown_company('es'));
                if (isNaN(id)) throw new Error(Dictionary.unknown_identity('es'));
                const edited = await dbConnection.transaction({ isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED }, async (t) => {
                    const grazing = await Grazing.update(
                        {
                            id_company: id_company,
                            id_grassland: id_grassland,
                            animal: animal,
                            corral: corral,
                            date: date,
                            completed: completed,
                        }, { where: { id_company: company, id: id }, transaction: t });
                    return grazing
                })
                if (!edited) return res.status(401).json({data:{0:0}, message: Dictionary.fail_edit('es'), hasErr: true });
                const grazing = Grazing.findOne({
                    where: { id_company: company, id: id }
                })
                return res.status(200).json({ message: Dictionary.success_edit('es'), data: grazing, hasErr: false });
            } catch (err) {
                if (process.env.devmode) return res.status(200).json({ message: err.stack || err.message || err, hasErr: true })
                return res.status(200).json({ message: Dictionary.fail_edit('es'), hasErr: true })
            }
        })

        .delete(async (req, res) => { // DELETE
            res.status(401).json({data:{0:0}, message: Dictionary.not_autorized('es') })
        })
    //END GRAZING EDIT

    //START GRAZING DELETE
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
                const deletedGrazing = await dbConnection.transaction({ isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED }, async (t) => {
                    const grazing = await Grazing.update(
                        {
                            deleted: true
                        }, { where: { id_company: company, id: id }, transaction: t });
                    return grazing
                })
                if (!deletedGrazing) return res.status(401).json({data:{0:0}, message: Dictionary.fail_deletion('es'), hasErr: true });
                return res.status(200).json({ message: Dictionary.success_deletion('es'), data: { empty: true }, hasErr: false });
            } catch (err) {
                if (process.env.devmode) return res.status(200).json({ message: err.stack || err.message || err, hasErr: true })
                return res.status(200).json({ message: Dictionary.fail_deletion('es'), hasErr: true })
            }
        })
    //END GRAZING DELETE

}