// add middlewares here related to actions
const Actions = require('./actions-model');

function logger(req, res, next) {
    console.log('Hello from logger: ')
    console.log(`[${req.method}] ${req.url}`);
    next()
}

function validateActionId(req, res, next) {
    Actions.get(req.params.id)
        .then(action => {
        if (action) {
            req.specifiedAction = action
            next()
        } else {
            next({ status: 404, message: 'not found! '})
        }
        })
        .catch(next)
}

function validateActionBody(req, res, next) {
    const { project_id, description, notes } = req.body;
    if (!project_id) {
      next({ status: 400, message: "missing project id" });
    } else if (!description || !description.trim()) {
      next({ status: 400, message: "missing required description" });
    } else if (!notes || !notes.trim()) {
      next({ status: 400, message: "missing required notes" });
    } else {
      next();
    }
  }
  

module.exports = {
    logger,
    validateActionId,
    validateActionBody,
}
