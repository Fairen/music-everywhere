#!/bin/sh
apt-get -y install curl python g++ ruby rubygems curl libfontconfig libjpeg-progs optipng 
##Install nodejs
wget -N http://nodejs.org/dist/node-latest.tar.gz
tar xzvf node-latest.tar.gz && cd `ls -rd node-v*`
./configure
make install
cd ../ && rm -R `ls -rd node-v*`
##Install compass
gem install compass && ln -s /var/lib/gems/1.8/bin/compass /usr/local/bin/compass
##Install PhantomJS
wget -N http://phantomjs.googlecode.com/files/phantomjs-1.6.1-linux-i686-dynamic.tar.bz2
tar xjvf phantomjs-1.6.1-linux-i686-dynamic.tar.bz2
mv phantomjs-1.6.1-linux-i686-dynamic /opt/phantomjs
ln -s /opt/phantomjs/bin/phantomjs /usr/local/bin/phantomjs
rm phantomjs-1.6.1-linux-i686-dynamic.tar.bz2
# install nodejs dependencies
npm install
## Install yeoman
npm install -g yeoman
##Install grunt
npm install -g grunt-cli
npm install grunt
npm install -g grunt
## install bower
npm install bower
npm install -g bower
## install bower dependencies
bower --allow-root install
bower --allow-root install font-awesome
## install express
npm install -g express
npm link express
## install node dependencies
npm install passport            
npm install passport-local
# install mongodb
apt-key adv --keyserver keyserver.ubuntu.com --recv 7F0CEB10
echo 'deb http://downloads-distro.mongodb.org/repo/debian-sysvinit dist 10gen' | sudo tee /etc/apt/sources.list.d/mongodb.list
apt-get update
apt-get install mongodb-10gen
# start mongodb if not started
/etc/init.d/mongodb start