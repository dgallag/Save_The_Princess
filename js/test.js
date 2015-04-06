var Player = function() {
// adding image for player char
this.sprite = 'images/char-boy.png';
// placing player
this.left = 200;
this.top = 566;
/*
* Check for collisions
* Reset player position if needed
*/
this.checkCollisions = function() {
// check for collision with enemies using objects boxes
allEnemies.forEach(function(enemy) {
if (player.top <= enemy.bottom && player.bottom >= enemy.top && player.right >= enemy.left && player.left <= enemy.right) {
var message = "Ooooh, that's so sad :(";
player.reset(message);
}
});