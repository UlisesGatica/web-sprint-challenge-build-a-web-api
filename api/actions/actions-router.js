// Write your "actions" router here!
const express = require('express')

const Actions = require('./actions-model')
const {
    logger,
    validateActionId,
    validateActionBody,
} = require('./actions-middlware')

const router = express.Router()

router.use(logger)

router.get('/', (req, res, next) => {
    Actions.get()
      .then( actionsData => {
        res.status(200).json(actionsData);
      })
      .catch(next);
  });

router.get('/:id', validateActionId, (req, res, next) => {
    res.status(200).json(req.specifiedAction)
});

router.post("/",validateActionBody,(req, res, next) => {
      Actions.insert(req.body)
        .then((newAction) => {
          res.status(201).json(newAction);
        })
        .catch(next);
    }
  );
  
  router.put("/:id",validateActionId,validateActionBody,(req, res, next) => {
      Actions.update(req.params.id, req.body)
        .then((updatedAction) => {
          res.status(202).json(updatedAction);
        })
        .catch(next);
    }
  );

router.delete('/:id', validateActionId, (req, res, next) => {
    Actions.remove(req.params.id)
        .then(() => {
            res.status(200).json(req.specifiedAction)
        })
        .catch(next);
})

module.exports = router