
const handleEntries = (req, res, db) => {
    const { id } = req.body;
    db('users')
      .where('id', '=', id)
      .increment({
      entries: 1
      })
      .returning('*')
      .then(entries => {
        res.json({
          entries:entries[0].entries,
        })
      })
    .catch(err => console.log('unable to get entries'));
}
const handleImageUrl = (req, res) => {
  const {ClarifaiStub, grpc} = require("clarifai-nodejs-grpc");

  const stub = ClarifaiStub.grpc();

  const metadata = new grpc.Metadata();
  metadata.set("authorization", "Key 71ad4ab9e6434aec8b072bab612c341f");
  stub.PostModelOutputs(
    {
        // This is the model ID of a publicly available General model. You may use any other public or custom model ID.
        model_id: "face-detection",
        inputs: [{data: {image: {url: req.body.imageUrl}}}]
    },
    metadata,
    (err, response) => {
        if (err) {
            console.log("Error: " + err);
            res.json("Error Clarifai gRPC")
            return;
        }

        if (response.status.code !== 10000) {
            console.log("Received failed status: " + response.status.description + "\n" + response.status.details);
            res.json("Error Clarifai gRPC")
            return;
        }
        res.json(response);
    }
);
  // const raw = JSON.stringify({
  //   "user_app_id": {
  //     "user_id": "toantc1024",
  //     "app_id": "smart-brain"
  //   },
  //   "inputs": [
  //       {
  //           "data": {
  //               "image": {
  //                   "url": req.body.imageUrl
  //               }
  //           }
  //       }
  //   ]
  // });
  
  // const requestOptions = {
  //     method: 'POST',
  //     headers: {
  //         'Accept': 'application/json',
  //         'Authorization': 'Key ' + '71ad4ab9e6434aec8b072bab612c341f'
  //     },
  //     body: JSON.stringify(raw)
  // };
  // try {
    
  //   fetch(`https://api.clarifai.com/v2/models/face-detection/versions/6dc7e46bc9124c5c8824be4822abe105/outputs`, requestOptions)
  //   .then(response => response.text())
  //   .then(result => res.json(result))
  //   .catch(err => res.json('unable to connect clarifai'));
  // } catch (err) {
  //   res.json({err:err});
  // }

}

module.exports = {
    handleEntries,
    handleImageUrl
}
