// Write your "projects" router here!
const express = require('express')

const Projects = require('./projects-model')

const {
    logger,
    validateProjectId,
    validateProjectBody,
    completedCheck,
} = require('./projects-middleware')

const router = express.Router()

router.use(logger)

router.get('/', (req, res, next) => {
    Projects.get()
      .then( projectsData => {
        res.status(200).json(projectsData);
      })
      .catch(next);
  });

router.get('/:id', validateProjectId, (req, res, next) => {
    res.status(200).json(req.specifiedProject)
});


router.post("/", validateProjectBody, logger, (req, res, next) => {
    Projects.insert(req.body)
    .then((newProject) => {
        res.status(201).json(newProject);
    })
    .catch(next);
});

router.put("/:id", validateProjectBody,completedCheck,(req, res, next) => {
    Projects.update(req.params.id, req.body)
    .then((updatedPost) => {
        res.status(202).json(updatedPost);
    })
    .catch(next);
}
);

router.delete('/:id', validateProjectId, (req, res, next) => {
    Projects.remove(req.params.id)
        .then(() => {
            res.status(200).json(req.specifiedProject)
        })
        .catch(next);
})

router.get("/:id/actions", validateProjectId, logger, (req, res, next) => {
    Projects.getProjectActions(req.params.id)
      .then((actions) => {
        res.status(201).json(actions);
      })
      .catch(next);
  });

module.exports = router