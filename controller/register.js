
const handleRegister = (req, res, db, bcrypt) => {
    const { email, password, name } = req.body;
    if(!email || !password || !name) 
      return res.status(400).json('incorrect form submit');
    var salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
        db.transaction(trx => {
            trx.insert({
                hash: hash,
                email: email
            })
            .into('login')
            .returning('email')
            .then(loginEmail => {
                trx.insert({
                    name: name,
                    email: loginEmail[0].email,
                    entries: 0,
                    joined: new Date()
                })
                    .into('users')
                    .returning("*")
                    .then(users => {
                        res.json(users[0]);
                    })
            })
            .then(trx.commit)
            .catch(trx.rollback);
        })
        .catch(err => res.json('unable to register'));
}

module.exports = {
    handleRegister
}