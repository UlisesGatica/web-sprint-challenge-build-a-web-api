// add middlewares here related to projects
// add middlewares here related to projects
const Projects = require('./projects-model');

function logger(req, res, next) {
    console.log('Hello from logger: ')
    console.log(`[${req.method}] ${req.url}`);
    next()
}

function validateProjectId(req, res, next) {
    Projects.get(req.params.id)
      .then(project => {
        if (project) {
          console.log(project);
          req.specifiedProject = project
          next()
        } else {
          next({ status: 404, message: 'not found! '})
        }
      })
      .catch(next)
  }

  function validateProjectBody(req, res, next) {
    const { name, description } = req.body;
    if (!name || !name.trim()) {
      next({ status: 400, message: "missing required name" });
    } else if (!description || !description.trim()) {
      next({ status: 400, message: "missing required description" });
    } else {
      next();
    }
  }
  
  function completedCheck(req, res, next) {
    const { completed } = req.body;
    if (typeof completed !== "boolean") {
      next({ status: 400, message: "missing completion status" });
    } else {
      next();
    }
  }

  
  module.exports = {
    logger,
    validateProjectId,
    validateProjectBody,
    completedCheck,
  };