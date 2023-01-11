
const handleEntries = (req, res, db) => {
    const { id, raw } = req.body;
    fetch(
        "https://api.clarifai.com/v2/models/f76196b43bbd45c99b4f3cd8e8b40a8a/outputs",
        {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: "Key c4b9c720614d48818405109878fa8e12",
        },
        body: raw,
        }
    )
    .then(response => response.json())
    .then(result => {
        db('users')
        .where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json({
                entries: entries[0].entries,
                result: result
            });
        })
        .catch(err => res.status(400).json('unable to get entries'))
    })
    .catch(err => console.log('unable to connect clarifai'));
}

module.exports = {
    handleEntries
}