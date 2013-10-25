var express = require('express');
var cors = require("./cors");
var fs = require('fs');
var UserProvider = require('./userprovider-mongodb').UserProvider;

var passport = require("passport");
var LocalStrategy = require('passport-local').Strategy;

var server = express();
server.use(express.bodyParser());
server.use(cors.express);
server.use(passport.initialize());
server.use(passport.session());

var userProvider = new UserProvider('172.20.0.140', 27017);


passport.use(new LocalStrategy(function(username, password,done){
    userProvider.getCollection(function(error, user_collection) {
		if( error ) { done(error) }
		else {
			user_collection.findOne({username:username}, function(error, user) {
			 	if( error ) { done(error) }
			  	if(!user){
			        return done(null, false, { message: 'Incorrect username.' });
			    }
			    if(user.password != password){
			    	return done(null, false, { message: 'Incorrect password.' });
			    }
			    else{
			    	return done(null, user);
			    }   
			});
		}
    });

}));


passport.serializeUser(function(user, done) {
    done(null, user._id);
});


passport.deserializeUser(function(id, done) {
    userProvider.getCollection(function(error, user_collection) {
		if( error ) { done(error) }
		else {
			user_collection.findById(id,function(err,user){
		        if(err) done(err);
		        if(user){
		            done(null,user);
		        }else{
		            Users.findById(id, function(err,user){
		                if(err) done(err);
		                done(null,user);
		            });
		        }
    		});
		}
	});
});


server.all('/view/music/:current_dir', function (req, res) {
    console.log('/music', req.method, req.body);
    switch (req.method) {
        case 'GET':
            var dir = './server/music'+req.params.current_dir; // your directory
			var files = fs.readdirSync(dir);
			var current_files = [];
			for (var i = 0; i < files.length; i++) {
				var stats = fs.statSync(dir+"/"+files[i]);
			  	current_files.push({'name':files[i],'isDirectory':stats.isDirectory(),'dir':req.params.current_dir});
			};
				
            res.send(current_files);
            break;
        default:
            notSupported(res);
    }
});

server.get('/server/*', function (req, res) {
	console.log('/server/'+req.params[0], req.method, req.body);
	res.sendfile('./server/'+req.params[0]);
});


// Block passport routes authentication

server.get('/users/', function (req, res) {
	console.log('/users/'+req.params[0], req.method, req.body);
    userProvider.findAll( function(error,users){
        res.send(users);
    });
});

server.get('/users/add/:username/:pwd', function(req, res){
	console.log('/users/add/'+req.params.username, req.method, req.body);
    userProvider.save({'username':req.params.username,'password':req.params.pwd} ,function(error,user){
        res.send(user);
    });
});

server.post('/login', function(req, res, next) {
	console.log('before authenticate');
  	passport.authenticate('local', function(err, user, info) {
		console.log('authenticate callback');
	    if (err) { return res.send({'status':'err','message':err.message}); }
	    if (!user) { return res.send({'status':'fail','message':info.message}); }
	    req.logIn(user, function(err) {
	      if (err) { return res.send({'status':'err','message':err.message}); }
	      return res.send({'status':'ok'});
	    });
  	})(req, res, next);
  },
  function(err, req, res, next) {
    // failure in login test route
    return res.send({'status':'err','message':err.message});
  });


// End block passport routes authentication


console.log('Starting music handler.');
server.listen(9001);