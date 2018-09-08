(function () {
  "use strict";

  let game, canvas, renderer, startBtn, startMenu, restartBtn, againBtn, themeManager;

  window.onload = function () {
    if ("ontouchstart" in document.documentElement) {
      debug("your device is a touch screen device.");
      localStorage.setItem('isTouch', '1');
    } else {
      debug("your device is NOT a touch device");
      localStorage.setItem('isTouch', '0');
    }

    canvas = document.getElementById('the-game');
    startMenu = document.getElementById('start-menu');
    startBtn = document.getElementById('start-btn');
    restartBtn = document.getElementById('restart-btn');
    againBtn = document.getElementById('again-btn');
    startBtn.onclick = function () {
      canvas.classList.toggle('game-stopped');
      startMenu.classList.toggle('game-stopped');
      startGame(canvas);
    };

    restartBtn.onclick = () => location.reload();
    againBtn.onclick = () => location.reload();
  };

  window.addEventListener('resize', resizeCanvas);

  function startGame(canvas) {
    themeManager = new ThemeManager();
    themeManager.startMusic();
    renderer = new Renderer(canvas);
    game = new Game(renderer, gameSuccessHandler, gameFailureHandler);
    resizeCanvas();
    mainLoop();
  }

  function gameSuccessHandler() {
    let victoryMenu = document.getElementById('victory-menu');
    victoryMenu.style.removeProperty('display');
    canvas = document.getElementById('the-game');
    canvas.classList.toggle('game-stopped');
    themeManager.stopMusic();
    game.tearDown();
  }

  function gameFailureHandler() {
    let deathMenu = document.getElementById('death-menu');
    deathMenu.style.removeProperty('display');
    canvas = document.getElementById('the-game');
    canvas.classList.toggle('game-stopped');
    themeManager.stopMusic();
    game.tearDown();
  }

  function resizeCanvas() {
    const devicePixelRatio = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * devicePixelRatio;
    canvas.height = window.innerHeight * devicePixelRatio;
    renderer.resizeViewport();
  }

  function mainLoop() {
    if (game.isRunning) game.loop();
    requestAnimationFrame(mainLoop);
  }
})();
