# MusicEverywhere


## Requirements

Git
Mongodb
Nodejs
Ruby
Sass
Compass


## Install

To deploy the project and install all the dependencies, clone the repository from bitbucket (see git commands below) and run 
```sh
sudo sh Install.sh
```

```sh
#Git
git clone https://fairen@bitbucket.org/fairen/music-is-everywhere.git     # clone repository
git add/remove <filename>                         # add/delete files
git commit -m "message"                           # commit
git push -u origin master                         # push commit on repository

#install (Web Server)
npm install                     # install nodejs dependencies
bower install                   # install bower dependencies
bower install font-awesome      # TODO: add in dependencies

#install (Server)
npm install -g express          # install Express
npm link express                # install Express
npm install passport            # TODO: add in dependencies 
npm install passport-local      # TODO: add in dependencies

#launch
grunt server                    # Web server
node server/server.js           # Express server
```


### Architecture

    app/                          --> all of the files to be used in production
      bower_components/           --> libraries managed by bower 
      scripts/                    --> js files
          controllers/            --> AngularJs - controllers
              home.js
              index.js
              login.js
              music.js
          directives/             --> AngularJs - directives
              directives.js
          app.js                  --> AngularJs - module and routes
      styles/                     --> scss files
        main.scss                 --> default stylesheet
      view/                       --> angular view partials 
        home.html
        login.html
        music.html
      index.html                  --> app layout file (the main html template file of the app)

    server/                       --> server (Express) files
        cors.js                   --> Express configuration file
        server.js                 --> Express server 
        userprovider-mongodb.js   --> provider for User collection

    test/                         --> Tests folder
    Install.sh                    --> Install WebApp on Debian Wheezy
    
