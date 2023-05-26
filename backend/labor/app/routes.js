module.exports = function (Labor, router, Sequelize, dbConnection, Dictionary, authorizationCheck) {

//START LIST LABOR
router.route('/list/:id_company')

.get(authorizationCheck, async (req, res) => { // GET
    try {
        const company = parseInt(req.params.id_company);
        if (isNaN(company)) throw new Error(Dictionary.unknown_company('es'));
        const list = Labor.findAll({
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
//END LIST LABOR


//START REGISTER LABOR
router.route('/register')

.get((req, res) => { // GET
    res.status(401).json({data:{0:0}, message: Dictionary.not_autorized('es') })
})

.post(authorizationCheck, async (req, res) => { // POST
    try {
        const { id_company, name, description, id_corral, id_grassland, date, id_animal, id_operation, completed} = req.body;
        const createdLabor = await dbConnection.transaction({ isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED }, async (t) => {
            const labor = await Labor.create(
                {
                    id_company: id_company,
                    name: name,
                    description: description,
                    id_corral: id_corral,
                    id_grassland: id_grassland,
                    id_animal: id_animal,
                    date: date,
                    id_operation: id_operation,
                    completed: completed,
                    deleted: false
                }, { transaction: t });
            return labor
        })
        if (!createdLabor) return res.status(401).json({data:{0:0}, message: Dictionary.fail_registration('es'), hasErr: true });
        return res.status(200).json({ message: Dictionary.success_registration('es'), data: createdLabor });
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
//END REGISTER LABOR

//START LABOR GET
router.route('/get/:id/:id_company')

.get(authorizationCheck, async (req, res) => { // GET
    try {
        const company = parseInt(req.params.id_company);
        const id = parseInt(req.params.id);
        if (isNaN(company)) throw new Error(Dictionary.unknown_company('es'));
        if (isNaN(id)) throw new Error(Dictionary.unknown_identity('es'));
        const labor = Labor.findOne({
            where: { id_company: company, id: id }
        })
        return res.status(200).json({ message: '', hasErr: false, data: labor })
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
//END LABOR GET

//START LABOR EDIT
router.route('/edit/:id/:id_company')

.get(async (req, res) => { // GET
    res.status(401).json({data:{0:0}, message: Dictionary.not_autorized('es') })
})

.post(async (req, res) => { // POST
    res.status(401).json({data:{0:0}, message: Dictionary.not_autorized('es') })
})

.put(authorizationCheck, async (req, res) => { // PUT
    try {
        const { name, description, id_corral, id_grassland, date, id_animal, id_operation, completed} = req.body
        const company = parseInt(req.params.id_company);
        const id = parseInt(req.params.id);
        if (isNaN(company)) throw new Error(Dictionary.unknown_company('es'));
        if (isNaN(id)) throw new Error(Dictionary.unknown_identity('es'));
        const edited = await dbConnection.transaction({ isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED }, async (t) => {
            const labor = await Labor.update(
                {
                    id_company: company,
                    name: name,
                    description: description,
                    id_corral: id_corral,
                    id_grassland: id_grassland,
                    id_animal: id_animal,
                    date: date,
                    id_operation: id_operation,
                    completed: completed
                }, { where: { id_company: company, id: id }, transaction: t });
            return labor
        })
        if (!edited) return res.status(401).json({data:{0:0}, message: Dictionary.fail_edit('es'), hasErr: true });
        const labor = Labor.findOne({
            where: { id_company: company, id: id }
        })
        return res.status(200).json({ message: Dictionary.success_edit('es'), data: labor, hasErr: false });
    } catch (err) {
        if (process.env.devmode) return res.status(200).json({ message: err.stack || err.message || err, hasErr: true })
        return res.status(200).json({ message: Dictionary.fail_edit('es'), hasErr: true })
    }
})

.delete(async (req, res) => { // DELETE
    res.status(401).json({data:{0:0}, message: Dictionary.not_autorized('es') })
})
//END LABOR EDIT

//START LABOR DELETE
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
        const deletedLabor = await dbConnection.transaction({ isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED }, async (t) => {
            const labor = await Labor.update(
                {
                    deleted: true
                }, { where: { id_company: company, id: id }, transaction: t });
            return labor
        })
        if (!deletedLabor) return res.status(401).json({data:{0:0}, message: Dictionary.fail_deletion('es'), hasErr: true });
        return res.status(200).json({ message: Dictionary.success_deletion('es'), data: { empty: true }, hasErr: false });
    } catch (err) {
        if (process.env.devmode) return res.status(200).json({ message: err.stack || err.message || err, hasErr: true })
        return res.status(200).json({ message: Dictionary.fail_deletion('es'), hasErr: true })
    }
})
//END LABOR DELETE

}