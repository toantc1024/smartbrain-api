
const handleEntries = (req, res, db) => {
    const { id, raw } = req.body;
    fetch(
      "https://api.clarifai.com/v2/models/f76196b43bbd45c99b4f3cd8e8b40a8a/outputs",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: "Key 4f8f9d430a684f9fa860caec498bfad0",
        },
        body: raw,
      }
    )
  .then(response => response.json())
  .then(result => {
    res.json({
      entries: 0,
      result: result
    })
    // db('users')
      // .where('id', '=', id)
      // .increment({
      // entries: 1
      // })
      // .returning('*')
      // .then(entries => {
      //   res.json({
      //   entries:entries[0].entries,
      //   result: result
      //   })
      // })
    .catch(err => console.log('unable to get entries'));
  })
  .catch(err => console.log('unable to connect clarifai'));
}

module.exports = {
    handleEntries
}



