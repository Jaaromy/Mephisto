/// <reference path="../../../typings/phaser/phaser.d.ts"/>

/**
 * Each section of the site has its own module. It probably also has
 * submodules, though this boilerplate is too simple to demonstrate it. Within
 * `src/app/home`, however, could exist several additional folders representing
 * additional modules that would then be listed as dependencies of this one.
 * For example, a `note` section could have the submodules `note.create`,
 * `note.delete`, `note.edit`, etc.
 *
 * Regardless, so long as dependencies are managed correctly, the build process
 * will automatically take take of the rest.
 *
 * The dependencies block here is also where component dependencies should be
 * specified, as shown below.
 */
 
 
angular.module( 'ngBoilerplate.home', [
  'ui.router',
  'plusOne'
])

/**
 * Each section or module of the site can also have its own routes. AngularJS
 * will handle ensuring they are all available at run-time, but splitting it
 * this way makes each module more "self-contained".
 */
.config(function config( $stateProvider ) {
  $stateProvider.state( 'home', {
    url: '/home',
    views: {
      "main": {
        controller: 'HomeCtrl',
        templateUrl: 'home/home.tpl.html'
      }
    },
    data:{ pageTitle: 'Home' }
  });
})

/**
 * And of course we define a controller for our route.
 */
.controller( 'HomeCtrl', function HomeController( $scope ) {

});

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {
    game.load.image('circle', 'assets/circle.png');
    game.time.advancedTiming = true;
}

var sprite;
var emitter;

function create() {
    game.stage.backgroundColor = '#1F1F1F';
    
    emitter = game.add.emitter(game.world.centerX, game.world.centerY, 250);
    emitter.makeParticles('circle', 0, 2000, true, true);

    emitter.minParticleScale = 0.01;
    emitter.maxParticleScale = 0.04;
    emitter.minParticleSpeed.setTo(-200, -300);
    emitter.maxParticleSpeed.setTo(200, -400);
    emitter.gravity = 500;
    emitter.bounce.setTo(0.5, 0.5);
    emitter.angularDrag = 30;

    emitter.start(false, 15000, 0);
    
    updateGravity();
 
    game.time.events.loop(Phaser.Timer.SECOND * 10, updateGravity, this);

}
var gravity;
var frequency;

function updateGravity() {
  gravity = game.rnd.pick([0, 50, 100, 200, 1000]);
  frequency = game.rnd.pick([0, 10]);

  emitter.gravity = gravity; 
  emitter.frequency = frequency;
}

function update() {
     
     game.physics.arcade.collide(emitter);

}

function render() {
  game.debug.text("FPS: " + game.time.fps || '--', 2, 10, "#00ff00");
  game.debug.text("Gravity: " + gravity, 2, 25, "#00ff00");
  game.debug.text("Frequency: " + frequency, 2, 40, "#00ff00");
  game.debug.text("Time: " + game.time.events.duration.toFixed(0), 2, 55, "#00ff00");
  game.debug.text("Living: " + emitter.total, 2, 70, "#00ff00");
    //game.debug.spriteInfo(sprite, 32, 32);

}
