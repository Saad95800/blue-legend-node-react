const passport = require('passport');

module.exports = {
  
    login: function(req, res) {
        passport.authenticate('local', async function(err, user, info){
            if((err) || (!user)) {
                return res.send({
                message: "Identifiant ou mot de passe incorrect",
                user
                });
            }
            let us = await User.findOne({email: user.email});
            if(us.confirmed == false){
                res.json({
                    error: true,
                    msg: 'Votre compte n\'a déjà été activé, veuillez cliquer sur le lien envoyé par email.'
                })
            }
            req.logIn(user, function(err) {
                if(err) res.send(err);
                sails.log('User '+user.id+' has logged in.');
                return res.send({
                message: info.message,
                user
                });
            });
        })(req, res);
    },
    logout: function(req, res) {
        req.logout();
        res.ok();
    },
    register: async function(req, res){
        // TODO form validation here
        let params = req.allParams();
        let us = await User.findOne({email: params.email})
        .exec(async function(err, us){
            console.log(us);
            if(us == undefined){
                await User.create({
                    username: params.username,
                    email: params.email,
                    password: params.password,
                    confirmed: false
                })
                .fetch()
                .exec(async function(err, user){
                    if(err) return res.negotiate(err);
                    // TODO maybe send a confirmation email to the user before the login
                    await sails.helpers.mailer.with({
                        'template': 'registerConfirmationEmail',
                        'data': [user]
                    });
                    return res.json({
                        user: user,
                        msg: 'Un email de confirmation vient de vous être envoyé dans votre boite mail.'
                    });
                });            
            }else{
                res.json({
                    error: true,
                    msg: 'Cet email éxiste déjà.'
                })
            }
        });

    },

    validateUser: async function(req, res){
        let conf = 'already';
        await User.findOne({id: req.params.id_user})
        .exec(async function(err,user) {
            console.log(user);
            if(user.confirmed == false){
                conf = true;
                await User.updateOne(
                    {id: req.params.id_user}).set({confirmed:true}
                )
                .exec(async function(err, user){
                    res.redirect('/?confirmation='+conf);
                });
            }else{
                res.redirect('/?confirmation='+conf);
            }
        });
        
      }

};

