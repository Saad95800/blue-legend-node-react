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
    register: function(req, res){
        console.log('register');
        // TODO form validation here
        let params = req.allParams();
        User.create({
            username: params.username,
            email: params.email,
            password: params.password,
            confirmed: false
          })
          .fetch()
          .exec(function(err, user){
              if(err) return res.negotiate(err);

              // TODO maybe send a confirmation email to the user before the login
              req.login(user, function(err){
                if(err) return res.negotiate(err);
                sails.log('User '+user.id+' has logged in.');
                return res.json(user);
                // return res.redirect('/accueil');
              })
          });
    }

};

