# ngNotifier
====
A AngularJS module to create notifications

## Usage
### ngNotifier directive

A basic ngNotifier directive looks like this:

    <notification>My notification</notification>

You can customize it, though, with some attributes:

    <notification type="error" animate="false">Ops, there has been an error</notification>
    <notification type="success" duration="10000" animationDuration="450">Great, no errors</notification>

This is the list of attributes you can use:

    - animate: (true|false), default is true
    - animationDuration: (number), default is 500
    - type: (default|success|error|info), default is "default"
    - duration: (number), default is 5000
    - templateUrl: (string) default is  "../../templates/notification.html"
    - top: (css position property), default is "20px"
    - left: (css position property), default is '75%'

### ngNotifier factory
It's possible to use ngNotifier programmatically by using its factory ngNotifierFactory

    var appController = ["$scope", "ngNotifierFactory", function ($scope, ngNotifierFactory) {
        ngNotifierFactory.notify("Hey, this is a new notification", {
            type: "error",
            duration: 5000
        }, $scope);
    }];

    angular.module('app', ['ngNotifier'])
        .controller('appController', appController);


## Installing the dependencies

### Node.js
Have you got Node.js installed? No!? Ok, let's fix this:

On Ubuntu Linux, run:

    sudo apt-get install nodejs

On Mac, run:

    brew install node

You should also have Ruby installed (ruby-sass dependency).
On Ubuntu Linux, run:

    sudo apt-get install ruby

On Mac, run:

    brew install ruby

### Node.js modules
From the terminal, run the following command:

    npm install

This command will install both server-side (npm) and client-side dependencies (bower).

## Building sources
To build and minify the .js and .sass sources, run the following grunt task:

    grunt build

## Running the example
Run from terminal:

    grunt run

The following command will start the server up and automatically launch the browser. Go to the folder "example",

If there are problems with running the app, the cause might be:
- http-server plugin not installed correctly
- http-server plugin installed but not runnable
    - if so, run the command:

        node_modules/http-server/bin/http-server app -p <port> -o

    - shouldn't the browser start, open it at the address http://localhost:<port>

Notice: all commands have to be run from the root folder.
