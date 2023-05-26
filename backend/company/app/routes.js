module.exports = function (Company, router, Sequelize, dbConnection, Dictionary, authorizationCheck) {

    //START LIST COMPANY
    router.route('/list')

        .get(authorizationCheck, async (req, res) => { // GET | REQUIRED A ADMIN CHECK NOT AN USER CHECK
            try {
                // const company = parseInt(req.body.id_company);
                // if (isNaN(company)) throw new Error(Dictionary.unknown_company('es'));
                const list = Company.findAll({
                    // where: { id_company: company }
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
    //END LIST COMPANY


    //START REGISTER COMPANY
    router.route('/register')

        .get((req, res) => { // GET
            res.status(401).json({data:{0:0}, message: Dictionary.not_autorized('es') })
        })

        .post(authorizationCheck, async (req, res) => { // POST
            try {
                const { name, description, address } = req.body;
                const createdCompany = await dbConnection.transaction({ isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED }, async (t) => {
                    const comp = await Company.create(
                        {
                            name: name,
                            description: description,
                            address: address,
                            deleted: false
                        }, { transaction: t });
                    return comp
                })
                if (!createdCompany) return res.status(401).json({data:{0:0}, message: Dictionary.fail_registration('es'), hasErr: true });
                return res.status(200).json({ message: Dictionary.success_registration('es'), data: createdCompany });
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
    //END REGISTER COMPANY

    //START COMPANY GET
    router.route('/get/:id')

        .get(authorizationCheck, async (req, res) => { // GET
            try {
                const id = parseInt(req.body.id);
                if (isNaN(id)) throw new Error(Dictionary.unknown_identity('es'));
                const comp = Company.findOne({
                    where: { id: id }
                })
                return res.status(200).json({ message: '', hasErr: false, data: comp })
            } catch (err) {
                if (process.env.devmode) return res.status(200).json({ message: err.stack || err.message || err, hasErr: true })
                return res.status(200).json({ message: Dictionary.unknown_error('es'), hasErr: true, data: { empty: true } })
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
    //END COMPANY GET

    //START COMPANY EDIT
    router.route('/edit/:id')

        .get(async (req, res) => { // GET
            res.status(401).json({data:{0:0}, message: Dictionary.not_autorized('es') })
        })

        .post(async (req, res) => { // POST
            res.status(401).json({data:{0:0}, message: Dictionary.not_autorized('es') })
        })

        .put(authorizationCheck, async (req, res) => { // PUT
            try {
                const id = parseInt(req.params.id)
                const { name, description, address } = req.body
                if (isNaN(id)) throw new Error(Dictionary.unknown_identity('es'));
                const edited = await dbConnection.transaction({ isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED }, async (t) => {
                    const company = await Company.update(
                        {
                            name: name,
                            description: description,
                            address: address
                        }, { where: { id: id }, transaction: t });
                    return company
                })
                if (!edited) return res.status(401).json({data:{0:0}, message: Dictionary.fail_edit('es'), hasErr: true });
                const company = Company.findOne({
                    where: { id: id }
                })
                return res.status(200).json({ message: Dictionary.success_edit('es'), data: company, hasErr: false });
            } catch (err) {
                if (process.env.devmode) return res.status(200).json({ message: err.stack || err.message || err, hasErr: true })
                return res.status(200).json({ message: Dictionary.fail_edit('es'), hasErr: true })
            }
        })

        .delete(async (req, res) => { // DELETE
            res.status(401).json({data:{0:0}, message: Dictionary.not_autorized('es') })
        })
    //END COMPANY EDIT

    //START COMPANY DELETION
    router.route('/delete/:id')

        .get(authorizationCheck, async (req, res) => { // GET
            res.status(401).json({data:{0:0}, message: Dictionary.not_autorized('es') });
        })

        .post(async (req, res) => { // POST
            res.status(401).json({data:{0:0}, message: Dictionary.not_autorized('es') });
        })

        .put((req, res) => { // PUT
            res.status(401).json({data:{0:0}, message: Dictionary.not_autorized('es') });
        })

        .delete(async (req, res) => { // DELETE
            try {
                const id = parseInt(req.body.id);
                if (isNaN(id)) throw new Error(Dictionary.unknown_identity('es'));
                const deletedCompany = await dbConnection.transaction({ isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED }, async (t) => {
                    const company = await Company.update(
                        {
                            deleted: true
                        }, { where: { id_company: company, id: id }, transaction: t });
                    return company
                })
                if (!deletedCompany) return res.status(401).json({data:{0:0}, message: Dictionary.fail_deletion('es'), hasErr: true });
                return res.status(200).json({ message: Dictionary.success_deletion('es'), data: { empty: true }, hasErr: false });
            } catch (err) {
                if (process.env.devmode) return res.status(200).json({ message: err.stack || err.message || err, hasErr: true })
                return res.status(200).json({ message: Dictionary.fail_deletion('es'), hasErr: true })
            }
            
        })
    //END COMPANY DELETION
}