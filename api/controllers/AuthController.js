const passport = require('passport');

module.exports = {
  
    login: function(req, res) {
        passport.authenticate('local', function(err, user, info){
            console.log(err);
            console.log(user);
            if((err) || (!user)) {
                return res.send({
                message: "Identifiant ou mot de passe incorrect",
                user
                });
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
        await User.updateOne(
            {id: req.params.id_user}).set({confirmed:true}
        )
        .exec(async function(err, us){
            let user = await User.find({id: req.params.id_user});
            req.login(user, function(err){
            if(err) return res.negotiate(err);
            sails.log('User '+user.id+' has logged in.');
            return res.json(user);
            // return res.redirect('/accueil');
            });            
        });

        res.redirect('/accueil');
      }

};

