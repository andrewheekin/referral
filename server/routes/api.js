const express = require('express');


const router = new express.Router();

// put the db call for all the logged in info here...

router.get('/dashboard', (req, res) => {
  res.status(200).json({
    message: "You're authorized to see this secret message."
  });
});


module.exports = router;
