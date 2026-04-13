const SCREEN_WIDTH = 240;
const SCREEN_HEIGHT = 320;
const GRID = 6;
const TILE_W = 40;
const TILE_H = 52;
const BOARD_X = 1;
const BOARD_Y = 4;
const FPS = 30;

const OPEN = 0;
const BLOCKED = 1;
const CRUMBLING = 2;

const PLAYER = 99;
const TELEPORT = 100;
const EXIT = 101;
const YEL = 102;
const XOT = 103;
const FLAME = 104;
const POLICE = 105;

const STORAGE_PREFIX = "wappo2-web";

const STRINGS = {
  ru: {
    appTitle: "Wappo2 Web",
    loading: "Загрузка...",
    restart: "Заново",
    menu: "Меню",
    browserPort: "Браузерная версия",
    browserDesc1: "Эта версия использует оригинальные извлеченные фоны, меню, спрайты, стены, телепорты, пламя и титульные экраны.",
    browserDesc2: "Управление: стрелки двигают, Enter подтверждает меню и подсказки, Esc ставит игру на паузу или возвращает назад.",
    browserDesc3: "Страница полностью статическая и совместима с GitHub Pages. Прогресс сохраняется в браузере.",
    mainMenu: ["Новая игра", "Продолжить", "Рекорды", "Настройки", "Помощь", "Об игре", "Выход"],
    pauseMenu: ["Продолжить", "Заново", "Настройки", "Меню"],
    gameOverMenu: ["Заново", "Настройки", "Меню"],
    settingsItems: ["Звук", "Вибрация", "Свет", "Язык", "Назад"],
    milestoneItems: ["Продолжить"],
    helpTitle: "Помощь",
    helpLines: [
      "Дойдите до выхода.",
      "Стрелки двигают Ваппо на одну клетку.",
      "Толкайте огненные блоки в пустые клетки.",
      "Телепорты переносят на связанную площадку.",
      "Красные и синие монстры ходят по-разному.",
      "Слитые монстры превращаются в полицию.",
      "Esc открывает паузу."
    ],
    backHint: "Нажмите или Esc: назад",
    highScore: "Рекорды",
    player: "Игрок",
    bestScore: "Лучший счет",
    bestLevel: "Лучший уровень",
    settings: "Настройки",
    toggleHint: "Нажмите или Влево/Вправо: сменить",
    on: "Вкл",
    off: "Выкл",
    language: "Язык",
    langRu: "Русский",
    langEn: "English",
    levelComplete: "Уровень пройден",
    levelLabel: "Уровень",
    score: "Счет",
    continueHint: "Enter: продолжить",
    congratulations: "Поздравляем",
    reward50: "Награда за 50 уровень открыта.",
    reward100: "Награда за 100 уровень открыта.",
    continueText: "Продолжить",
    paused: "Пауза",
    caught: "Пойман",
    aboutBack: "Нажмите или Esc: назад",
    tutorialTexts: [
      "Ваппо движется вверх, Ксардук Пень движется вниз по параллели относительно Ваппо.",
      "Ваппо движется вниз, Ксардук Пень приближается на 2 шага к Ваппо - желает беднягу скушать.",
      "Чтобы избежать Ксардука, Ваппо перемещается влево и телепортируется. Ксардук Пень движется вверх.",
      "Ваппо движется вверх к пламени. Ксардук Пень движется вверх и оказывается в сартире :)",
      "Ваппо движется влево. Ход Ксардука, но его путь все еще заблокирован стенами.",
      "Ваппо продвигается на один шаг к выходу. Ксардук Пень пытаясь приблизиться к Ваппо, попадает в телепорт :)",
      "Ваппо достигает выхода и заканчивает уровень."
    ]
  },
  en: {
    appTitle: "Wappo2 Web",
    loading: "Loading...",
    restart: "Restart",
    menu: "Menu",
    browserPort: "Browser Port",
    browserDesc1: "This version uses the original extracted backgrounds, menus, sprites, walls, teleports, flames, and title screens.",
    browserDesc2: "Controls: arrow keys move, Enter confirms menus and tutorial prompts, Esc pauses or goes back.",
    browserDesc3: "The page is static and GitHub Pages compatible. Progress is saved in browser storage.",
    mainMenu: ["New Game", "Continue", "High Score", "Settings", "Help", "About", "Quit"],
    pauseMenu: ["Resume", "Restart", "Settings", "Menu"],
    gameOverMenu: ["Restart", "Settings", "Menu"],
    settingsItems: ["Sound", "Vibration", "Light", "Language", "Back"],
    milestoneItems: ["Continue"],
    helpTitle: "Help",
    helpLines: [
      "Reach the exit.",
      "Arrow keys move Wappo one tile.",
      "Push flame blocks into open cells.",
      "Teleports jump to the linked pad.",
      "Red and blue monsters chase differently.",
      "Merged monsters become police.",
      "Esc opens the pause menu."
    ],
    backHint: "Tap or Esc: back",
    highScore: "High Score",
    player: "Player",
    bestScore: "Best score",
    bestLevel: "Best level",
    settings: "Settings",
    toggleHint: "Tap or Left/Right: toggle",
    on: "On",
    off: "Off",
    language: "Language",
    langRu: "Russian",
    langEn: "English",
    levelComplete: "Level Complete",
    levelLabel: "Level",
    score: "Score",
    continueHint: "Enter: continue",
    congratulations: "Congratulations",
    reward50: "Level 50 reward unlocked.",
    reward100: "Level 100 reward unlocked.",
    continueText: "Continue",
    paused: "Paused",
    caught: "Caught",
    aboutBack: "Tap or Esc: back",
    tutorialTexts: [
      "Wappo moves up. The yellow monster moves down on the same line toward him.",
      "Wappo moves down. The monster closes in with two chase steps.",
      "Wappo moves left and teleports. The monster keeps advancing upward.",
      "Wappo walks toward the flame. The monster keeps chasing.",
      "Wappo moves left. Walls still block the monster path.",
      "Wappo moves one step toward the exit. The monster falls into the teleport.",
      "Wappo reaches the exit and completes the level."
    ]
  }
};

const TUTORIAL_MOVES = [1, 6, 2, 1, 2, 6, 6];

class Cell {
  constructor() {
    this.topWall = OPEN;
    this.rightWall = OPEN;
    this.obj = 0;
  }
}

class Actor {
  constructor(kind, tile) {
    this.kind = kind;
    this.tile = tile;
    this.motionTile = tile;
    this.direction = 0;
    this.facing = 0;
    this.offsetX = 0;
    this.offsetY = 0;
    this.targetTile = null;
    this.moveDx = 0;
    this.moveDy = 0;
    this.totalSteps = 0;
    this.moveMode = "";
  }
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

async function loadAssets() {
  const names = [
    "about", "abouticon", "arrow", "bggame", "CCicon", "cDHWall", "cDVWall",
    "continueicon", "diag", "exit", "flame", "gameicon", "helpicon", "highscore",
    "icon", "pkill", "pstrip", "quiticon", "restarticon", "settingsicon", "siemens",
    "softex", "tele", "vwall", "wood", "wappo2", "wstrip", "xkill", "xstrip",
    "ykill", "ystrip", "hwall", "cHWall", "cVWall"
  ];
  const entries = await Promise.all(names.map(async (name) => [name, await loadImage(`./assets/${name}.png`)]));
  return Object.fromEntries(entries);
}

class Game {
  constructor(canvas, statusEl) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.statusEl = statusEl;
    this.scene = "loading";
    this.sceneTimer = FPS;
    this.assets = null;
    this.levels = [];
    this.frame = 0;
    this.menuIndex = 0;
    this.settingsIndex = 0;
    this.settingsReturnScene = "main_menu";
    this.selectedLevelIndex = 0;
    this.turnPhase = "idle";
    this.inputLocked = false;
    this.cells = [];
    this.enemies = [];
    this.teleports = [-1, -1];
    this.exitTile = -1;
    this.playerTile = 0;
    this.playerOffsetX = 0;
    this.playerOffsetY = 0;
    this.playerTargetTile = null;
    this.playerStepDx = 0;
    this.playerStepDy = 0;
    this.playerAnimSteps = 0;
    this.playerTeleportedThisTurn = false;
    this.pendingPush = null;
    this.lastMove = "down";
    this.score = 0;
    this.bestScore = 0;
    this.levelIndex = 0;
    this.lastProgressLevel = 0;
    this.levelTarget = 0;
    this.levelProgressUnits = 0;
    this.playerName = "Rookie";
    this.locale = "ru";
    this.gameSpeed = "slow";
    this.startedGame = false;
    this.soundEnabled = true;
    this.vibrationEnabled = true;
    this.lightEnabled = true;
    this.tutorialDone = false;
    this.tutorialStep = 0;
    this.completedLevelNumber = null;
    this.pendingNextLevel = null;
    this.pendingMilestone = null;
    this.deathFrame = 0;
    this.deathTimer = 0;
    this.boundLoop = (time) => this.loop(time);
    this.lastFrameTime = 0;
    this.loadState();
  }

  loadState() {
    this.score = Number(localStorage.getItem(`${STORAGE_PREFIX}-score`) || 0);
    this.bestScore = Number(localStorage.getItem(`${STORAGE_PREFIX}-best-score`) || 0);
    this.levelIndex = Number(localStorage.getItem(`${STORAGE_PREFIX}-level-index`) || 0);
    this.lastProgressLevel = Number(localStorage.getItem(`${STORAGE_PREFIX}-last-progress-level`) || this.levelIndex);
    this.startedGame = localStorage.getItem(`${STORAGE_PREFIX}-started`) === "1";
    this.tutorialDone = localStorage.getItem(`${STORAGE_PREFIX}-tutorial-done`) === "1";
    this.playerName = localStorage.getItem(`${STORAGE_PREFIX}-player-name`) || "Rookie";
    this.locale = localStorage.getItem(`${STORAGE_PREFIX}-locale`) || "ru";
    this.gameSpeed = localStorage.getItem(`${STORAGE_PREFIX}-speed`) || "slow";
    this.soundEnabled = localStorage.getItem(`${STORAGE_PREFIX}-sound`) !== "0";
    this.vibrationEnabled = localStorage.getItem(`${STORAGE_PREFIX}-vibration`) !== "0";
    this.lightEnabled = localStorage.getItem(`${STORAGE_PREFIX}-light`) !== "0";
  }

  saveState() {
    localStorage.setItem(`${STORAGE_PREFIX}-score`, String(this.score));
    localStorage.setItem(`${STORAGE_PREFIX}-best-score`, String(this.bestScore));
    localStorage.setItem(`${STORAGE_PREFIX}-level-index`, String(this.levelIndex));
    localStorage.setItem(`${STORAGE_PREFIX}-last-progress-level`, String(this.lastProgressLevel));
    localStorage.setItem(`${STORAGE_PREFIX}-started`, this.startedGame ? "1" : "0");
    localStorage.setItem(`${STORAGE_PREFIX}-tutorial-done`, this.tutorialDone ? "1" : "0");
    localStorage.setItem(`${STORAGE_PREFIX}-player-name`, this.playerName);
    localStorage.setItem(`${STORAGE_PREFIX}-locale`, this.locale);
    localStorage.setItem(`${STORAGE_PREFIX}-speed`, this.gameSpeed);
    localStorage.setItem(`${STORAGE_PREFIX}-sound`, this.soundEnabled ? "1" : "0");
    localStorage.setItem(`${STORAGE_PREFIX}-vibration`, this.vibrationEnabled ? "1" : "0");
    localStorage.setItem(`${STORAGE_PREFIX}-light`, this.lightEnabled ? "1" : "0");
  }

  async init() {
    const [levels, assets] = await Promise.all([
      fetch("./data/levels.json").then((r) => r.json()),
      loadAssets()
    ]);
    this.levels = levels;
    this.assets = assets;
    this.updateStaticUi();
    this.levelIndex = Math.max(0, Math.min(this.levelIndex, this.levels.length - 1));
    this.lastProgressLevel = Math.max(0, Math.min(this.lastProgressLevel, this.levels.length - 1));
    this.loadLevel(this.levelIndex, false);
    this.scene = "splash_siemens";
    window.addEventListener("keydown", (event) => this.onKey(event));
    this.canvas.addEventListener("click", (event) => this.onCanvasClick(event));
    this.canvas.addEventListener("pointerdown", (event) => this.onCanvasClick(event));
    this.canvas.addEventListener("mousedown", (event) => this.onCanvasClick(event));
    this.canvas.addEventListener("touchstart", (event) => this.onCanvasClick(event), { passive: false });
    requestAnimationFrame(this.boundLoop);
  }

  strings() {
    return STRINGS[this.locale] ?? STRINGS.ru;
  }

  t(key) {
    return this.strings()[key];
  }

  mainMenuItems() {
    return this.locale === "ru"
      ? ["Новая игра", "Продолжить", "Выбор уровня", "Рекорды", "Настройки", "Помощь", "Об игре", "Выход"]
      : ["New Game", "Continue", "Level Select", "High Score", "Settings", "Help", "About", "Quit"];
  }

  pauseMenuItems() {
    return this.t("pauseMenu");
  }

  gameOverMenuItems() {
    return this.t("gameOverMenu");
  }

  settingsItems() {
    return this.locale === "ru"
      ? ["Звук", "Вибрация", "Свет", "Скорость", "Язык", "Назад"]
      : ["Sound", "Vibration", "Light", "Speed", "Language", "Back"];
  }

  levelSelectTitle() {
    return this.locale === "ru" ? "Р’С‹Р±РѕСЂ СѓСЂРѕРІРЅСЏ" : "Level Select";
  }

  levelSelectHint() {
    return this.locale === "ru"
      ? "Р’Р»РµРІРѕ/РІРІРµСЂС… Рё РІРїСЂР°РІРѕ/РІРЅРёР·: РІС‹Р±РѕСЂ"
      : "Left/Up and Right/Down: choose";
  }

  levelSelectConfirmHint() {
    return this.locale === "ru"
      ? "Enter/РІРїСЂР°РІРѕ: РЅР°С‡Р°С‚СЊ   Esc: РЅР°Р·Р°Рґ"
      : "Enter/Right: start   Esc: back";
  }

  settingsValueLabels() {
    const speedLabel = this.gameSpeed === "slow"
      ? (this.locale === "ru" ? "Медленно" : "Slow")
      : this.gameSpeed === "normal"
        ? (this.locale === "ru" ? "Нормально" : "Normal")
        : (this.locale === "ru" ? "Быстро" : "Fast");
    return [
      this.soundEnabled ? this.t("on") : this.t("off"),
      this.vibrationEnabled ? this.t("on") : this.t("off"),
      this.lightEnabled ? this.t("on") : this.t("off"),
      speedLabel,
      this.locale === "ru" ? this.t("langRu") : this.t("langEn"),
      ""
    ];
  }

  settingsRowY(index) {
    return 108 + index * 24;
  }

  currentFps() {
    return { slow: 20, normal: 30, fast: 40 }[this.gameSpeed] ?? 20;
  }

  updateStaticUi() {
    document.documentElement.lang = this.locale;
    document.title = this.t("appTitle");
    document.getElementById("appTitle").textContent = this.t("appTitle");
    document.getElementById("restartBtn").textContent = this.t("restart");
    document.getElementById("menuBtn").textContent = this.t("menu");
  }

  canvasPoint(event) {
    const rect = this.canvas.getBoundingClientRect();
    const scaleX = this.canvas.width / rect.width;
    const scaleY = this.canvas.height / rect.height;
    const point = event.touches?.[0] ?? event.changedTouches?.[0] ?? event;
    return {
      x: (point.clientX - rect.left) * scaleX,
      y: (point.clientY - rect.top) * scaleY
    };
  }

  clickMenuList(items, startY, rowStep, x, y) {
    if (x < 16 || x > 216) return false;
    for (let index = 0; index < items.length; index += 1) {
      const rowY = startY + index * rowStep;
      if (y >= rowY && y <= rowY + rowStep) {
        this.menuIndex = index;
        this.activateMenuItem();
        return true;
      }
    }
    return false;
  }

  onCanvasClick(event) {
    event.preventDefault?.();
    const { x, y } = this.canvasPoint(event);
    console.debug("wappo2 canvas input", { scene: this.scene, x, y, menuIndex: this.menuIndex });
    if (this.scene === "splash_siemens" || this.scene === "splash_softex") {
      this.scene = "title";
      return;
    }
    if (this.scene === "title") {
      this.scene = "main_menu";
      this.menuIndex = 0;
      return;
    }
    if (this.scene === "tutorial") {
      if (this.tutorialStep < TUTORIAL_MOVES.length) {
        this.scene = "game";
        this.tryPlayerMove(TUTORIAL_MOVES[this.tutorialStep]);
      }
      return;
    }
    if (this.scene === "main_menu") {
      this.clickMenuList(this.mainMenuItems(), 84, 20, x, y);
      return;
    }
    if (["pause", "game_over", "milestone"].includes(this.scene)) {
      this.clickMenuList(this.currentMenuItems(), 128, 28, x, y);
      return;
    }
    if (this.scene === "level_select") {
      if (y >= 116 && y <= 144) {
        this.cycleSelectedLevel(-1);
      } else if (y >= 152 && y <= 180) {
        this.cycleSelectedLevel(1);
      } else if (y >= 214 && y <= 250) {
        this.loadSelectedLevel();
      } else {
        this.scene = "main_menu";
      }
      return;
    }
    if (this.scene === "settings") {
      if (x < 18 || x > 222) return;
      for (let index = 0; index < this.settingsItems().length; index += 1) {
        const rowY = this.settingsRowY(index);
        if (y >= rowY && y <= rowY + 28) {
          this.settingsIndex = index;
          this.toggleSetting();
          return;
        }
      }
      return;
    }
    if (["help", "about", "high_score"].includes(this.scene)) {
      this.scene = "main_menu";
      this.menuIndex = 0;
      return;
    }
    if (this.scene === "level_result") {
      this.advanceAfterResult();
    }
  }

  setStatus(text) {
    this.statusEl.textContent = text;
  }

  levelStatus() {
    return `${this.t("levelLabel")} ${this.levelIndex + 1}`;
  }

  tutorialScriptMode() {
    return this.levelIndex === 0 && !this.tutorialDone;
  }

  completeTutorialLevel() {
    this.tutorialDone = true;
    this.playerTile = this.exitTile;
    this.resolvePlayerSpecials();
    this.saveState();
  }

  loadLevel(index, resetScore = false) {
    if (resetScore) this.score = 0;
    this.levelIndex = Math.max(0, Math.min(index, this.levels.length - 1));
    this.lastProgressLevel = Math.max(this.lastProgressLevel, this.levelIndex);
    this.cells = Array.from({ length: 36 }, () => new Cell());
    this.enemies = [];
    this.teleports = [-1, -1];
    this.exitTile = -1;
    this.levelTarget = this.levels[this.levelIndex][0][4];
    this.levelProgressUnits = 0;
    this.turnPhase = "idle";
    this.inputLocked = false;
    this.playerOffsetX = 0;
    this.playerOffsetY = 0;
    this.playerAnimSteps = 0;
    this.playerTargetTile = null;
    this.playerTeleportedThisTurn = false;
    this.pendingPush = null;
    this.deathFrame = 0;
    this.deathTimer = 0;
    if (this.levelIndex !== 0) this.tutorialDone = true;
    this.tutorialStep = 0;

    const level = this.levels[this.levelIndex];
    for (let i = 0; i < level[1].length; i += 2) {
      const a = level[1][i];
      const b = level[1][i + 1];
      if (Math.abs(b - a) === 1) this.cells[a].rightWall = BLOCKED;
      else this.cells[b].topWall = BLOCKED;
    }
    for (let i = 0; i < level[2].length; i += 2) {
      const a = level[2][i];
      const b = level[2][i + 1];
      if (Math.abs(b - a) === 1) this.cells[a].rightWall = CRUMBLING;
      else this.cells[b].topWall = CRUMBLING;
    }
    let teleIndex = 0;
    for (let i = 0; i < level[3].length; i += 2) {
      const tile = level[3][i];
      const kind = level[3][i + 1];
      this.cells[tile].obj = kind;
      if (kind === TELEPORT) this.teleports[teleIndex++] = tile;
      if (kind === EXIT) this.exitTile = tile;
    }
    for (let i = 0; i < level[4].length; i += 2) {
      const tile = level[4][i];
      const kind = level[4][i + 1];
      if (kind === PLAYER) this.playerTile = tile;
      else this.enemies.push(new Actor(kind, tile));
    }
    this.saveState();
    this.setStatus(this.levelStatus());
  }

  currentMenuItems() {
    if (this.scene === "pause") return this.pauseMenuItems();
    if (this.scene === "game_over") return this.gameOverMenuItems();
    if (this.scene === "milestone") return this.t("milestoneItems");
    return this.mainMenuItems();
  }

  toggleSetting() {
    if (this.settingsIndex === 0) this.soundEnabled = !this.soundEnabled;
    else if (this.settingsIndex === 1) this.vibrationEnabled = !this.vibrationEnabled;
    else if (this.settingsIndex === 2) this.lightEnabled = !this.lightEnabled;
    else if (this.settingsIndex === 3) {
      this.gameSpeed = this.gameSpeed === "slow" ? "normal" : this.gameSpeed === "normal" ? "fast" : "slow";
    } else if (this.settingsIndex === 4) {
      this.locale = this.locale === "ru" ? "en" : "ru";
      this.updateStaticUi();
    } else if (this.settingsIndex === 5) this.scene = this.settingsReturnScene;
    this.saveState();
  }

  loadSelectedLevel() {
    this.startedGame = true;
    this.score = 0;
    this.loadLevel(this.selectedLevelIndex, false);
    this.scene = this.selectedLevelIndex === 0 && !this.tutorialDone ? "tutorial" : "game";
    this.saveState();
  }

  cycleSelectedLevel(delta) {
    const unlockedCount = this.lastProgressLevel + 1;
    if (unlockedCount <= 0) return;
    this.selectedLevelIndex = (this.selectedLevelIndex + delta + unlockedCount) % unlockedCount;
  }

  onKey(event) {
    if (event.key.startsWith("Arrow")) event.preventDefault();

    if (this.scene === "splash_siemens" || this.scene === "splash_softex") {
      this.scene = "title";
      return;
    }
    if (this.scene === "title") {
      if (event.key === "Escape") return;
      this.scene = "main_menu";
      this.menuIndex = 0;
      return;
    }
    if (this.scene === "tutorial") {
      if (event.key === "Enter" || event.key === " ") {
        if (this.tutorialStep < TUTORIAL_MOVES.length) {
          this.scene = "game";
          this.tryPlayerMove(TUTORIAL_MOVES[this.tutorialStep]);
        }
      } else if (event.key === "Escape") {
        this.tutorialDone = true;
        this.scene = "game";
        this.saveState();
      }
      return;
    }
    if (["main_menu", "pause", "game_over", "milestone"].includes(this.scene)) {
      const items = this.currentMenuItems();
      if (event.key === "ArrowUp") this.menuIndex = (this.menuIndex + items.length - 1) % items.length;
      else if (event.key === "ArrowDown") this.menuIndex = (this.menuIndex + 1) % items.length;
      else if (event.key === "Enter" || event.key === " ") this.activateMenuItem();
      else if (event.key === "Escape" && this.scene === "pause") this.scene = "game";
      return;
    }
    if (this.scene === "settings") {
      if (event.key === "ArrowUp") this.settingsIndex = (this.settingsIndex + this.settingsItems().length - 1) % this.settingsItems().length;
      else if (event.key === "ArrowDown") this.settingsIndex = (this.settingsIndex + 1) % this.settingsItems().length;
      else if (["ArrowLeft", "ArrowRight", "Enter", " "].includes(event.key)) this.toggleSetting();
      else if (event.key === "Escape") this.scene = this.settingsReturnScene;
      return;
    }
    if (this.scene === "level_select") {
      if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
        this.cycleSelectedLevel(-1);
      } else if (event.key === "ArrowDown" || event.key === "ArrowRight") {
        if (event.key === "ArrowRight") this.loadSelectedLevel();
        else this.cycleSelectedLevel(1);
      } else if (event.key === "Enter" || event.key === " ") {
        this.loadSelectedLevel();
      } else if (event.key === "Escape") {
        this.scene = "main_menu";
      }
      return;
    }
    if (["help", "about", "high_score"].includes(this.scene)) {
      if (event.key === "Escape" || event.key === "Enter" || event.key === " ") this.scene = "main_menu";
      return;
    }
    if (this.scene === "level_result") {
      if (event.key === "Escape" || event.key === "Enter" || event.key === " ") this.advanceAfterResult();
      return;
    }
    if (this.scene !== "game" || this.inputLocked) return;
    if (event.key === "Escape") {
      this.scene = "pause";
      this.menuIndex = 0;
      return;
    }
    const dir = { ArrowUp: 1, ArrowDown: 6, ArrowLeft: 2, ArrowRight: 5 }[event.key];
    if (dir) this.tryPlayerMove(dir);
  }

  activateMenuItem() {
    console.debug("wappo2 activateMenuItem", { scene: this.scene, menuIndex: this.menuIndex, settingsIndex: this.settingsIndex });
    if (this.scene === "main_menu") {
      if (this.menuIndex === 0) {
        this.score = 0;
        this.levelIndex = 0;
        this.tutorialDone = false;
        this.tutorialStep = 0;
        this.startedGame = true;
        this.loadLevel(0, false);
        this.scene = "tutorial";
      } else if (this.menuIndex === 1) {
        if (!this.startedGame) return;
        this.loadLevel(this.levelIndex, false);
        this.scene = this.levelIndex === 0 && !this.tutorialDone ? "tutorial" : "game";
      } else if (this.menuIndex === 2) {
        this.selectedLevelIndex = Math.min(this.levelIndex, this.lastProgressLevel);
        this.scene = "level_select";
      } else if (this.menuIndex === 3) {
        this.scene = "high_score";
      } else if (this.menuIndex === 4) {
        this.settingsReturnScene = "main_menu";
        this.settingsIndex = 0;
        this.scene = "settings";
      } else if (this.menuIndex === 5) {
        this.scene = "help";
      } else if (this.menuIndex === 6) {
        this.scene = "about";
      } else if (this.menuIndex === 7) {
        this.scene = "title";
      }
      return;
    }
    if (this.scene === "pause") {
      if (this.menuIndex === 0) this.scene = "game";
      else if (this.menuIndex === 1) {
        this.loadLevel(this.levelIndex, false);
        this.scene = "game";
      } else if (this.menuIndex === 2) {
        this.settingsReturnScene = "pause";
        this.settingsIndex = 0;
        this.scene = "settings";
      } else if (this.menuIndex === 3) {
        this.scene = "main_menu";
        this.menuIndex = 0;
      }
      return;
    }
    if (this.scene === "game_over") {
      if (this.menuIndex === 0) {
        this.loadLevel(this.levelIndex, false);
        this.scene = "game";
      } else if (this.menuIndex === 1) {
        this.settingsReturnScene = "game_over";
        this.settingsIndex = 0;
        this.scene = "settings";
      } else if (this.menuIndex === 2) {
        this.scene = "main_menu";
        this.menuIndex = 0;
      }
      return;
    }
    if (this.scene === "milestone") {
      this.pendingMilestone = null;
      this.goToPendingNextLevel();
    }
  }

    handleControl(action) {
      if (this.scene === "title") {
        this.scene = "main_menu";
        this.menuIndex = 0;
        return;
      }
      if (this.scene === "tutorial") {
        if (action === "left") {
          this.tutorialDone = true;
          this.scene = "game";
          this.saveState();
        } else if ((action === "up" || action === "right") && this.tutorialStep < TUTORIAL_MOVES.length) {
          this.scene = "game";
          this.tryPlayerMove(TUTORIAL_MOVES[this.tutorialStep]);
        }
        return;
      }
      if (["main_menu", "pause", "game_over", "milestone"].includes(this.scene)) {
        const items = this.currentMenuItems();
        if (action === "up") this.menuIndex = (this.menuIndex + items.length - 1) % items.length;
        else if (action === "down") this.menuIndex = (this.menuIndex + 1) % items.length;
        else if (action === "left" || action === "right") this.activateMenuItem();
        return;
      }
      if (this.scene === "settings") {
        if (action === "up") this.settingsIndex = (this.settingsIndex + this.settingsItems().length - 1) % this.settingsItems().length;
        else if (action === "down") this.settingsIndex = (this.settingsIndex + 1) % this.settingsItems().length;
        else if (action === "left" || action === "right") this.toggleSetting();
        return;
      }
      if (this.scene === "level_select") {
        if (action === "up" || action === "left") this.cycleSelectedLevel(-1);
        else if (action === "down") this.cycleSelectedLevel(1);
        else if (action === "right") this.loadSelectedLevel();
        return;
      }
      if (["help", "about", "high_score"].includes(this.scene)) {
        this.scene = "main_menu";
        this.menuIndex = 0;
        return;
      }
      if (this.scene === "level_result") {
        this.advanceAfterResult();
        return;
      }
      const dir = { up: 1, down: 6, left: 2, right: 5 }[action];
      if (this.scene === "game" && !this.inputLocked && dir) this.tryPlayerMove(dir);
    }

  playerTarget(direction, origin = null) {
    const tile = origin ?? this.playerTile;
    if (direction === 1) return [this.topAccess(tile), tile - 6, tile - 12, "up"];
    if (direction === 6) return [this.bottomAccess(tile), tile + 6, tile + 12, "down"];
    if (direction === 2) return [this.leftAccess(tile), tile - 1, tile - 2, "left"];
    return [this.rightAccess(tile), tile + 1, tile + 2, "right"];
  }

  tryPlayerMove(direction) {
    const [access, neighbor, beyond, label] = this.playerTarget(direction);
    this.lastMove = label;
    if (access !== OPEN) return;
    this.levelProgressUnits += 4;
    if (this.cellObj(neighbor) === FLAME) {
      if (this.cellObj(beyond) !== OPEN || this.enemyAt(beyond)) return;
      if (this.playerTarget(direction, neighbor)[0] !== OPEN) return;
      this.pendingPush = [neighbor, beyond];
    } else {
      this.pendingPush = null;
    }
    const dx = ((neighbor % GRID) - (this.playerTile % GRID)) * (TILE_W / 4);
    const dy = (Math.floor(neighbor / GRID) - Math.floor(this.playerTile / GRID)) * (TILE_H / 4);
    this.inputLocked = true;
    this.turnPhase = "player_anim";
    this.playerTargetTile = neighbor;
    this.playerAnimSteps = 4;
    this.playerOffsetX = 0;
    this.playerOffsetY = 0;
    this.playerStepDx = dx;
    this.playerStepDy = dy;
  }

  update() {
    this.frame = (this.frame + 1) % 32;
    if (this.scene === "splash_siemens" || this.scene === "splash_softex") {
      this.sceneTimer -= 1;
      if (this.sceneTimer <= 0) {
        if (this.scene === "splash_siemens") {
          this.scene = "splash_softex";
          this.sceneTimer = FPS;
        } else {
          this.scene = "title";
        }
      }
      return;
    }
    if (this.scene !== "game") return;
    if (this.turnPhase === "player_anim") {
      this.playerOffsetX += this.playerStepDx;
      this.playerOffsetY += this.playerStepDy;
      this.playerAnimSteps -= 1;
      if (this.playerAnimSteps <= 0) {
        this.playerTile = this.playerTargetTile ?? this.playerTile;
        this.playerOffsetX = 0;
        this.playerOffsetY = 0;
        if (this.pendingPush) {
          const [src, dst] = this.pendingPush;
          this.cells[src].obj = 0;
          this.cells[dst].obj = FLAME;
        }
        this.pendingPush = null;
        this.resolvePlayerSpecials();
        if (this.scene === "game") this.planEnemyTurn();
      }
      return;
    }
    if (this.turnPhase === "enemy_anim") {
      let active = false;
      let enemyIndex = 0;
      while (enemyIndex < this.enemies.length) {
        const enemy = this.enemies[enemyIndex];
        if (enemy.totalSteps <= 0) {
          enemyIndex += 1;
          continue;
        }
        const moved = this.advanceEnemyStep(enemy);
        enemy.totalSteps = moved ? enemy.totalSteps - 1 : Math.max(0, enemy.totalSteps - 1);
        const segmentCompleted = moved && enemy.offsetX === 0 && enemy.offsetY === 0;
        if (segmentCompleted) {
          if (enemy.tile === this.playerTile) {
            if (!this.tutorialScriptMode()) {
              this.turnPhase = "death_anim";
              this.deathFrame = 0;
              this.deathTimer = 9;
              return;
            }
          }
          this.resolveEnemySpecials(enemy);
          if (enemy.tile === this.playerTile) {
            if (!this.tutorialScriptMode()) {
              this.turnPhase = "death_anim";
              this.deathFrame = 0;
              this.deathTimer = 9;
              return;
            }
          }
          if (this.mergeEnemies()) {
            if (this.enemyAt(this.playerTile)) {
              if (!this.tutorialScriptMode()) {
                this.turnPhase = "death_anim";
                this.deathFrame = 0;
                this.deathTimer = 9;
                return;
              }
            }
            enemyIndex = 0;
            active = this.enemies.some((item) => item.totalSteps > 0);
            continue;
          }
        }
        if (enemy.totalSteps > 0) active = true;
        enemyIndex += 1;
      }
      if (!active) {
        this.turnPhase = "idle";
        this.inputLocked = false;
        for (const enemy of this.enemies) {
          enemy.motionTile = enemy.tile;
          enemy.offsetX = 0;
          enemy.offsetY = 0;
          enemy.moveMode = "";
        }
        this.resolvePlayerSpecials();
        this.playerTeleportedThisTurn = false;
        if (this.scene === "game" && this.levelIndex === 0 && !this.tutorialDone) {
          this.tutorialStep += 1;
          if (this.tutorialStep >= this.t("tutorialTexts").length) {
            this.completeTutorialLevel();
          } else {
            this.scene = "tutorial";
          }
        }
      }
      return;
    }
    if (this.turnPhase === "death_anim") {
      this.deathTimer -= 1;
      if (this.deathTimer <= 0) {
        this.deathTimer = 9;
        this.deathFrame += 1;
        if (this.deathFrame >= 3) {
          this.turnPhase = "idle";
          this.inputLocked = false;
          this.scene = "game_over";
          this.menuIndex = 0;
        }
      }
    }
  }

  resolvePlayerSpecials() {
    if (this.enemyAt(this.playerTile)) {
      if (!this.tutorialScriptMode()) {
        this.turnPhase = "death_anim";
        this.deathFrame = 0;
        this.deathTimer = 9;
      }
      return;
    }
    if (!this.playerTeleportedThisTurn && this.playerTile === this.teleports[0]) {
      this.playerTile = this.teleports[1];
      this.playerTeleportedThisTurn = true;
    } else if (!this.playerTeleportedThisTurn && this.playerTile === this.teleports[1]) {
      this.playerTile = this.teleports[0];
      this.playerTeleportedThisTurn = true;
    }
    if (this.playerTile === this.exitTile) {
      const gain = Math.max(1, Math.floor((this.levelTarget * 100) / Math.max(1, this.levelProgressUnits / 4)));
      this.score += gain;
      this.bestScore = Math.max(this.bestScore, this.score);
      this.completedLevelNumber = this.levelIndex + 1;
      this.pendingNextLevel = Math.min(this.levelIndex + 1, this.levels.length - 1);
      this.lastProgressLevel = Math.max(this.lastProgressLevel, this.levelIndex);
      this.saveState();
      if (this.completedLevelNumber === 50 || this.completedLevelNumber === 100) {
        this.pendingMilestone = this.completedLevelNumber;
      }
      this.scene = "level_result";
      this.turnPhase = "idle";
      this.inputLocked = false;
      this.setStatus(`${this.t("score")} ${this.score}`);
    } else {
      this.setStatus(`${this.levelStatus()}  ${this.t("score")} ${this.score}`);
    }
  }

  advanceAfterResult() {
    if (this.pendingMilestone != null) {
      this.scene = "milestone";
      this.menuIndex = 0;
      return;
    }
    this.goToPendingNextLevel();
  }

  goToPendingNextLevel() {
    if (this.levelIndex >= this.levels.length - 1) {
      this.scene = "main_menu";
      return;
    }
    this.loadLevel(this.pendingNextLevel ?? this.levelIndex + 1, false);
    this.pendingNextLevel = null;
    this.scene = this.levelIndex === 0 && !this.tutorialDone ? "tutorial" : "game";
  }

  planEnemyTurn() {
    if (!this.enemies.length) {
      this.setStatus(this.levelStatus());
      this.resolvePlayerSpecials();
      if (this.turnPhase !== "death_anim") {
        this.turnPhase = "idle";
        this.inputLocked = false;
        this.playerTeleportedThisTurn = false;
        this.playerTargetTile = null;
        this.playerAnimSteps = 0;
        this.playerOffsetX = 0;
        this.playerOffsetY = 0;
      }
      return;
    }
    for (const enemy of this.enemies) {
      enemy.totalSteps = enemy.kind === POLICE ? 12 : 8;
      enemy.motionTile = enemy.tile;
      enemy.offsetX = 0;
      enemy.offsetY = 0;
      enemy.targetTile = null;
      enemy.moveMode = "";
    }
    this.turnPhase = "enemy_anim";
  }

  mergeEnemies() {
    const mergedByTile = new Map();
    let changed = false;
    for (const enemy of this.enemies) {
      const existing = mergedByTile.get(enemy.tile);
      if (!existing) {
        mergedByTile.set(enemy.tile, enemy);
        continue;
      }
      changed = true;
      existing.kind = POLICE;
      existing.direction = 0;
      existing.facing = 0;
      existing.totalSteps = 0;
      existing.moveDx = 0;
      existing.moveDy = 0;
      existing.offsetX = 0;
      existing.offsetY = 0;
      existing.motionTile = existing.tile;
      existing.targetTile = null;
      existing.moveMode = "";
    }
    if (changed) this.enemies = Array.from(mergedByTile.values());
    return changed;
  }

  advanceEnemyStep(enemy) {
    if (enemy.kind === POLICE) return this.advancePoliceStep(enemy);
    if (enemy.kind === YEL) return this.advanceVerticalStep(enemy) || this.advanceHorizontalStep(enemy);
    return this.advanceHorizontalStep(enemy) || this.advanceVerticalStep(enemy);
  }

  advanceVerticalStep(enemy) {
    if (enemy.offsetX !== 0) return false;
    if (enemy.offsetY > 0) {
      enemy.offsetY += TILE_H / 4;
      if (enemy.offsetY >= TILE_H) this.completeEnemySegment(enemy, enemy.targetTile ?? enemy.motionTile + 6);
      return true;
    }
    if (enemy.offsetY < 0) {
      enemy.offsetY -= TILE_H / 4;
      if (enemy.offsetY <= -TILE_H) this.completeEnemySegment(enemy, enemy.targetTile ?? enemy.motionTile - 6);
      return true;
    }
    if (Math.floor(this.playerTile / GRID) === Math.floor(enemy.tile / GRID)) return false;
    const down = this.playerTile > enemy.tile;
    const access = down ? this.bottomAccess(enemy.tile) : this.topAccess(enemy.tile);
    const target = down ? enemy.tile + 6 : enemy.tile - 6;
    if (access === BLOCKED || this.cellObj(target) === FLAME) return false;
    if (access === CRUMBLING) this.setVerticalWall(Math.min(enemy.tile, target), Math.max(enemy.tile, target), OPEN);
    enemy.targetTile = target;
    enemy.motionTile = enemy.tile;
    enemy.direction = down ? 0 : 1;
    enemy.offsetY += down ? TILE_H / 4 : -(TILE_H / 4);
    enemy.moveMode = "vertical";
    return true;
  }

  advanceHorizontalStep(enemy) {
    if (enemy.offsetY !== 0) return false;
    if (enemy.offsetX > 0) {
      enemy.offsetX += TILE_W / 4;
      if (enemy.offsetX >= TILE_W) this.completeEnemySegment(enemy, enemy.targetTile ?? enemy.motionTile + 1);
      return true;
    }
    if (enemy.offsetX < 0) {
      enemy.offsetX -= TILE_W / 4;
      if (enemy.offsetX <= -TILE_W) this.completeEnemySegment(enemy, enemy.targetTile ?? enemy.motionTile - 1);
      return true;
    }
    if ((this.playerTile % GRID) === (enemy.tile % GRID)) return false;
    const right = (this.playerTile % GRID) > (enemy.tile % GRID);
    const access = right ? this.rightAccess(enemy.tile) : this.leftAccess(enemy.tile);
    const target = right ? enemy.tile + 1 : enemy.tile - 1;
    if (access === BLOCKED || this.cellObj(target) === FLAME) return false;
    if (access === CRUMBLING) this.setHorizontalWall(Math.min(enemy.tile, target), Math.max(enemy.tile, target), OPEN);
    enemy.targetTile = target;
    enemy.motionTile = enemy.tile;
    enemy.direction = right ? 3 : 2;
    enemy.offsetX += right ? TILE_W / 4 : -(TILE_W / 4);
    enemy.moveMode = "horizontal";
    return true;
  }

  advancePoliceStep(enemy) {
    if (enemy.moveMode === "diagonal") return this.advancePoliceDiagonal(enemy);
    if (enemy.offsetX !== 0 || enemy.offsetY !== 0) {
      if (enemy.moveMode === "horizontal") return this.advanceHorizontalStep(enemy);
      if (enemy.moveMode === "vertical") return this.advanceVerticalStep(enemy);
    }
    const diagonal = this.startPoliceDiagonal(enemy);
    if (diagonal) return true;
    const h = this.advanceHorizontalStep(enemy);
    if (h) {
      enemy.moveMode = "horizontal";
      return true;
    }
    const v = this.advanceVerticalStep(enemy);
    if (v) enemy.moveMode = "vertical";
    return v;
  }

  startPoliceDiagonal(enemy) {
    const ex = enemy.tile % GRID;
    const ey = Math.floor(enemy.tile / GRID);
    const px = this.playerTile % GRID;
    const py = Math.floor(this.playerTile / GRID);
    if (px === ex || py === ey) return false;
    const dx = px > ex ? 1 : -1;
    const dy = py > ey ? 1 : -1;
    const target = enemy.tile + dx + dy * GRID;
    if (target < 0 || target >= GRID * GRID || this.cellObj(target) === FLAME) return false;

    let checks;
    let direction;
    let clearKind;
    if (dx > 0 && dy < 0) {
      checks = [
        this.rightAccess(enemy.tile - GRID),
        this.rightAccess(enemy.tile),
        this.topAccess(enemy.tile),
        this.topAccess(enemy.tile + 1),
      ];
      direction = 3;
      clearKind = 3;
    } else if (dx > 0 && dy > 0) {
      checks = [
        this.rightAccess(enemy.tile + GRID),
        this.rightAccess(enemy.tile),
        this.bottomAccess(enemy.tile),
        this.bottomAccess(enemy.tile + 1),
      ];
      direction = 0;
      clearKind = 0;
    } else if (dx < 0 && dy > 0) {
      checks = [
        this.leftAccess(enemy.tile + GRID),
        this.leftAccess(enemy.tile),
        this.bottomAccess(enemy.tile),
        this.bottomAccess(enemy.tile - 1),
      ];
      direction = 1;
      clearKind = 1;
    } else {
      checks = [
        this.leftAccess(enemy.tile - GRID),
        this.leftAccess(enemy.tile),
        this.topAccess(enemy.tile),
        this.topAccess(enemy.tile - 1),
      ];
      direction = 2;
      clearKind = 2;
    }

    if (checks.some((access) => access === BLOCKED)) return false;
    this.clearDiagonalCrumbling(clearKind, enemy.tile);
    enemy.direction = direction;
    enemy.moveMode = "diagonal";
    enemy.targetTile = target;
    enemy.motionTile = enemy.tile;
    enemy.moveDx = dx;
    enemy.moveDy = dy;
    enemy.offsetX += dx * (TILE_W / 4);
    enemy.offsetY += dy * (TILE_H / 4);
    if (Math.abs(enemy.offsetX) >= TILE_W && Math.abs(enemy.offsetY) >= TILE_H) {
      this.completeEnemySegment(enemy, target);
      enemy.moveMode = "";
    }
    return true;
  }

  advancePoliceDiagonal(enemy) {
    enemy.offsetX += enemy.moveDx * (TILE_W / 4);
    enemy.offsetY += enemy.moveDy * (TILE_H / 4);
    if (Math.abs(enemy.offsetX) >= TILE_W && Math.abs(enemy.offsetY) >= TILE_H) {
      this.completeEnemySegment(enemy, enemy.targetTile ?? enemy.motionTile);
      enemy.moveMode = "";
    }
    return true;
  }

  completeEnemySegment(enemy, tile) {
    enemy.tile = tile;
    enemy.facing = enemy.direction;
    enemy.motionTile = tile;
    enemy.targetTile = null;
    enemy.offsetX = 0;
    enemy.offsetY = 0;
    enemy.moveDx = 0;
    enemy.moveDy = 0;
  }

  resolveEnemySpecials(enemy) {
    if (enemy.tile === this.teleports[0]) {
      enemy.tile = this.teleports[1];
      enemy.motionTile = enemy.tile;
      enemy.totalSteps = 0;
    } else if (enemy.tile === this.teleports[1]) {
      enemy.tile = this.teleports[0];
      enemy.motionTile = enemy.tile;
      enemy.totalSteps = 0;
    }
  }

  rightAccess(tile) {
    if (tile < 0 || tile % GRID === GRID - 1) return BLOCKED;
    return this.cells[tile].rightWall;
  }

  leftAccess(tile) {
    if (tile < 0 || tile % GRID === 0) return BLOCKED;
    return this.cells[tile - 1].rightWall;
  }

  topAccess(tile) {
    if (tile < 0 || Math.floor(tile / GRID) === 0) return BLOCKED;
    return this.cells[tile].topWall;
  }

  bottomAccess(tile) {
    if (tile < 0 || Math.floor(tile / GRID) === GRID - 1) return BLOCKED;
    return this.cells[tile + GRID].topWall;
  }

  setHorizontalWall(leftTile, rightTile, value) {
    if (leftTile >= 0 && rightTile === leftTile + 1) this.cells[leftTile].rightWall = value;
  }

  setVerticalWall(upperTile, lowerTile, value) {
    if (lowerTile >= 0 && lowerTile === upperTile + 6) this.cells[lowerTile].topWall = value;
  }

  clearDiagonalCrumbling(mode, tile) {
    if (mode === 0) {
      if (this.rightAccess(tile + GRID) === CRUMBLING) this.setHorizontalWall(tile + GRID, tile + GRID + 1, OPEN);
      if (this.rightAccess(tile) === CRUMBLING) this.setHorizontalWall(tile, tile + 1, OPEN);
      if (this.bottomAccess(tile) === CRUMBLING) this.setVerticalWall(tile, tile + GRID, OPEN);
      if (this.bottomAccess(tile + 1) === CRUMBLING) this.setVerticalWall(tile + 1, tile + GRID + 1, OPEN);
    } else if (mode === 1) {
      if (this.leftAccess(tile + GRID) === CRUMBLING) this.setHorizontalWall(tile + GRID - 1, tile + GRID, OPEN);
      if (this.leftAccess(tile) === CRUMBLING) this.setHorizontalWall(tile - 1, tile, OPEN);
      if (this.bottomAccess(tile) === CRUMBLING) this.setVerticalWall(tile, tile + GRID, OPEN);
      if (this.bottomAccess(tile - 1) === CRUMBLING) this.setVerticalWall(tile - 1, tile + GRID - 1, OPEN);
    } else if (mode === 2) {
      if (this.leftAccess(tile - GRID) === CRUMBLING) this.setHorizontalWall(tile - GRID - 1, tile - GRID, OPEN);
      if (this.leftAccess(tile) === CRUMBLING) this.setHorizontalWall(tile - 1, tile, OPEN);
      if (this.topAccess(tile) === CRUMBLING) this.setVerticalWall(tile - GRID, tile, OPEN);
      if (this.topAccess(tile - 1) === CRUMBLING) this.setVerticalWall(tile - GRID - 1, tile - 1, OPEN);
    } else if (mode === 3) {
      if (this.rightAccess(tile - GRID) === CRUMBLING) this.setHorizontalWall(tile - GRID, tile - GRID + 1, OPEN);
      if (this.rightAccess(tile) === CRUMBLING) this.setHorizontalWall(tile, tile + 1, OPEN);
      if (this.topAccess(tile) === CRUMBLING) this.setVerticalWall(tile - GRID, tile, OPEN);
      if (this.topAccess(tile + 1) === CRUMBLING) this.setVerticalWall(tile - GRID + 1, tile + 1, OPEN);
    }
  }

  cellObj(tile) {
    if (tile < 0 || tile >= 36) return FLAME;
    const obj = this.cells[tile].obj;
    if (obj === FLAME) return FLAME;
    if (obj === TELEPORT) return TELEPORT;
    return OPEN;
  }

  enemyAt(tile) {
    return this.enemies.some((e) => e.tile === tile);
  }

  tileXY(tile) {
    return [BOARD_X + (tile % GRID) * TILE_W, BOARD_Y + Math.floor(tile / GRID) * TILE_H];
  }

  objectFrame() {
    return Math.floor(this.frame / 8) % 4;
  }

  playerFacing() {
    return { down: 0, up: 1, left: 2, right: 3 }[this.lastMove] ?? 0;
  }

  actorFacingRow(facing) {
    return [1, 0, 2, 3][facing] ?? 0;
  }

  blitFrame(image, frame, x, y, frameW = 40, frameH = 52) {
    this.ctx.drawImage(image, frame * frameW, 0, frameW, frameH, x, y, frameW, frameH);
  }

  blitActorFrame(image, facing, animFrame, x, y, frameW = 40, frameH = 52) {
    const row = this.actorFacingRow(facing);
    this.ctx.drawImage(image, animFrame * frameW, row * frameH, frameW, frameH, x, y, frameW, frameH);
  }

  blitPlayerFrame(image, facing, animFrame, x, y, frameW = 40, frameH = 52) {
    this.ctx.drawImage(image, facing * frameW, animFrame * frameH, frameW, frameH, x, y, frameW, frameH);
  }

  drawImageCentered(image, topY = null) {
    const x = Math.floor((SCREEN_WIDTH - image.width) / 2);
    const y = topY == null ? Math.floor((SCREEN_HEIGHT - image.height) / 2) : topY;
    this.ctx.drawImage(image, x, y);
  }

  menuIcon(scene, index) {
    if (scene === "main_menu") {
      return [
        this.assets.gameicon,
        this.assets.continueicon,
        this.assets.restarticon,
        this.assets.highscore,
        this.assets.settingsicon,
        this.assets.helpicon,
        this.assets.abouticon,
        this.assets.quiticon
      ][index] ?? null;
    }
    if (scene === "pause") {
      return [
        this.assets.continueicon,
        this.assets.restarticon,
        this.assets.settingsicon,
        this.assets.quiticon
      ][index] ?? null;
    }
    if (scene === "game_over") {
      return [
        this.assets.restarticon,
        this.assets.settingsicon,
        this.assets.quiticon
      ][index] ?? null;
    }
    return null;
  }

  drawMenuList(items, startY) {
      const compactMainMenu = this.scene === "main_menu";
      const rowStep = compactMainMenu ? 20 : 28;
      const font = compactMainMenu ? "bold 14px Trebuchet MS" : "bold 18px Trebuchet MS";
      this.ctx.font = font;
      items.forEach((item, index) => {
        const y = startY + index * rowStep;
        const icon = this.menuIcon(this.scene, index);
        const iconX = compactMainMenu ? 38 : 42;
        const textX = compactMainMenu ? 66 : 70;
        const arrowX = compactMainMenu ? 20 : 22;
        if (icon) this.ctx.drawImage(icon, iconX, y - 2);
      this.ctx.fillStyle = this.scene === "main_menu" && index === 1 && !this.startedGame ? "#6f6756" : "#000";
        this.ctx.fillText(item, textX, y + (compactMainMenu ? 15 : 18));
        if (index === this.menuIndex) this.ctx.drawImage(this.assets.arrow, arrowX, y + 3);
      });
    }

  drawOverlayMenu(title, items) {
    this.ctx.fillStyle = "rgba(255,255,255,0.86)";
    this.ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    this.ctx.fillStyle = "#fff";
    this.ctx.fillRect(24, 60, 192, 180);
    this.ctx.strokeStyle = "#000";
    this.ctx.lineWidth = 2;
    this.ctx.strokeRect(24, 60, 192, 180);
    this.ctx.font = "bold 18px Trebuchet MS";
    this.ctx.fillStyle = "#000";
    const textW = this.ctx.measureText(title).width;
    this.ctx.fillText(title, 120 - textW / 2, 100);
    items.forEach((item, index) => {
      const y = 128 + index * 28;
      const icon = this.menuIcon(this.scene, index);
      if (icon) this.ctx.drawImage(icon, 52, y - 2);
      this.ctx.fillText(item, 80, y + 18);
      if (index === this.menuIndex) this.ctx.drawImage(this.assets.arrow, 30, y + 4);
    });
  }

  drawWrappedText(text, x, y, width, lineHeight, font = "14px Trebuchet MS") {
    this.ctx.font = font;
    this.ctx.fillStyle = "#000";
    const words = text.split(/\s+/);
    const lines = [];
    let current = "";
    for (const word of words) {
      const trial = current ? `${current} ${word}` : word;
      if (this.ctx.measureText(trial).width <= width) current = trial;
      else {
        if (current) lines.push(current);
        current = word;
      }
    }
    if (current) lines.push(current);
    lines.forEach((line, index) => this.ctx.fillText(line, x, y + index * lineHeight));
  }

  drawBoard() {
    this.ctx.drawImage(this.assets.bggame, 0, 0);
    for (let tile = 0; tile < 36; tile += 1) {
      const [x, y] = this.tileXY(tile);
      const cell = this.cells[tile];
      if (cell.obj === FLAME) this.blitFrame(this.assets.flame, this.objectFrame(), x, y + 1);
      else if (cell.obj === TELEPORT) this.blitFrame(this.assets.tele, this.objectFrame(), x, y + 4);
      else if (cell.obj === EXIT) this.ctx.drawImage(this.assets.exit, x + 1, y);
    }
    for (let tile = 0; tile < 36; tile += 1) {
      const [x, y] = this.tileXY(tile);
      const cell = this.cells[tile];
      if (cell.rightWall === BLOCKED) this.ctx.drawImage(this.assets.vwall, x + TILE_W - 3, y);
      else if (cell.rightWall === CRUMBLING) this.ctx.drawImage(this.assets.cVWall, x + TILE_W - 3, y);
      if (cell.topWall === BLOCKED) this.ctx.drawImage(this.assets.hwall, x, y - 3);
      else if (cell.topWall === CRUMBLING) this.ctx.drawImage(this.assets.cHWall, x, y - 3);
    }
    if (this.turnPhase !== "death_anim") {
      const [px, py] = this.tileXY(this.playerTile);
      const playerAnim = (this.playerOffsetX !== 0 || this.playerOffsetY !== 0) ? this.objectFrame() : 0;
      this.blitPlayerFrame(this.assets.wstrip, this.playerFacing(), playerAnim, px + this.playerOffsetX, py - 3 + this.playerOffsetY);
      for (const enemy of this.enemies) {
        const base = enemy.motionTile ?? enemy.tile;
        const [ex, ey] = this.tileXY(base);
        const drawX = ex + enemy.offsetX;
        const drawY = ey + enemy.offsetY;
        const facing = (enemy.offsetX !== 0 || enemy.offsetY !== 0 || enemy.moveMode) ? enemy.direction : enemy.facing;
        const enemyAnim = (enemy.offsetX !== 0 || enemy.offsetY !== 0 || enemy.moveMode) ? this.objectFrame() : 0;
        if (enemy.kind === XOT) this.blitActorFrame(this.assets.xstrip, facing, enemyAnim, drawX, drawY - 3);
        else if (enemy.kind === YEL) this.blitActorFrame(this.assets.ystrip, facing, enemyAnim, drawX, drawY - 3);
        else {
          const strip = enemy.moveMode === "diagonal" ? this.assets.diag : this.assets.pstrip;
          this.blitActorFrame(strip, facing, enemyAnim, drawX, enemy.moveMode === "diagonal" ? drawY : drawY - 3);
        }
      }
    } else {
      for (const enemy of this.enemies) {
        const [ex, ey] = this.tileXY(enemy.tile);
        const strip = enemy.kind === XOT ? this.assets.xkill : enemy.kind === YEL ? this.assets.ykill : this.assets.pkill;
        this.blitFrame(strip, this.deathFrame, ex, ey, 40, 52);
      }
    }
    if (!this.tutorialActive() && !["pause", "game_over", "milestone"].includes(this.scene)) {
      this.ctx.drawImage(this.assets.arrow, 220, 300);
    }
  }

  tutorialActive() {
    return this.levelIndex === 0 && !this.tutorialDone && this.tutorialStep < this.t("tutorialTexts").length;
  }

  drawMainMenu() {
      this.ctx.drawImage(this.assets.bggame, 0, 0);
      this.ctx.drawImage(this.assets.wood, 8, 35);
      this.ctx.drawImage(this.assets.icon, 20, 46);
      this.ctx.fillStyle = "rgb(103,26,0)";
      this.ctx.font = "bold 17px Georgia";
      this.ctx.fillText("WAPPO", 52, 60);
      this.ctx.font = "10px Trebuchet MS";
      this.ctx.fillText("Nostalgic mobile labyrinth", 54, 73);
      this.drawMenuList(this.mainMenuItems(), 84);
      this.ctx.fillStyle = "#000";
      this.ctx.font = "10px Trebuchet MS";
      const bestLevel = `${this.t("bestLevel")}: ${this.lastProgressLevel + 1}`;
      const bestScore = `${this.t("bestScore")}: ${this.bestScore}`;
      this.ctx.fillText(bestLevel, 120 - this.ctx.measureText(bestLevel).width / 2, 278);
      this.ctx.fillText(bestScore, 120 - this.ctx.measureText(bestScore).width / 2, 290);
    }

  drawHelp() {
    this.ctx.drawImage(this.assets.bggame, 0, 0);
    this.ctx.drawImage(this.assets.wood, 8, 35);
    this.ctx.fillStyle = "#000";
    this.ctx.font = "bold 20px Trebuchet MS";
    this.ctx.fillText(this.t("helpTitle"), 20, 38);
    const lines = this.t("helpLines");
    this.ctx.font = "14px Trebuchet MS";
    lines.forEach((line, i) => this.ctx.fillText(line, 18, 78 + i * 24));
    this.ctx.font = "12px Trebuchet MS";
    this.ctx.fillText(this.t("backHint"), 18, 304);
  }

  drawAbout() {
    this.ctx.drawImage(this.assets.about, 0, 0);
    this.ctx.fillStyle = "#000";
    this.ctx.font = "12px Trebuchet MS";
    this.ctx.fillText(this.t("aboutBack"), 18, 304);
  }

  drawHighScore() {
    this.ctx.drawImage(this.assets.bggame, 0, 0);
    this.ctx.drawImage(this.assets.wood, 8, 35);
    this.ctx.fillStyle = "#000";
    this.ctx.font = "bold 18px Trebuchet MS";
    this.ctx.fillText(this.t("highScore"), 62, 82);
    this.ctx.font = "15px Trebuchet MS";
    [
      `${this.t("player")}: ${this.playerName}`,
      `${this.t("bestScore")}: ${this.bestScore}`,
      `${this.t("bestLevel")}: ${this.lastProgressLevel + 1}`
    ].forEach((line, i) => this.ctx.fillText(line, 34, 132 + i * 30));
    this.ctx.font = "13px Trebuchet MS";
    this.ctx.fillText(this.t("backHint"), 60, 244);
  }

  drawSettings() {
    this.ctx.drawImage(this.assets.bggame, 0, 0);
    this.ctx.drawImage(this.assets.wood, 8, 35);
    this.ctx.fillStyle = "#000";
    this.ctx.font = "bold 18px Trebuchet MS";
    this.ctx.fillText(this.t("settings"), 70, 82);
    const values = this.settingsValueLabels();
    this.ctx.font = "bold 16px Trebuchet MS";
    this.settingsItems().forEach((item, i) => {
      const y = this.settingsRowY(i);
      this.ctx.fillText(item, 56, y + 16);
      if (values[i]) this.ctx.fillText(values[i], 160, y + 16);
      if (i === this.settingsIndex) this.ctx.drawImage(this.assets.arrow, 28, y + 2);
    });
    this.ctx.font = "13px Trebuchet MS";
    this.ctx.fillText(this.t("toggleHint"), 26, 262);
  }

  drawLevelSelect() {
    this.ctx.drawImage(this.assets.bggame, 0, 0);
    this.ctx.drawImage(this.assets.wood, 8, 35);
    this.ctx.fillStyle = "#000";
    this.ctx.font = "bold 18px Trebuchet MS";
    this.ctx.fillText(this.levelSelectTitle(), 28, 78);

    const levelText = `${this.t("levelLabel")}: ${this.selectedLevelIndex + 1}`;
    const unlockedText = `${this.t("bestLevel")}: ${this.lastProgressLevel + 1}`;

    this.ctx.font = "bold 16px Trebuchet MS";
    this.ctx.fillText(levelText, 54, 132);
    this.ctx.fillText(unlockedText, 54, 168);

    this.ctx.font = "13px Trebuchet MS";
    this.ctx.fillText(this.levelSelectHint(), 18, 224);
    this.ctx.fillText(this.levelSelectConfirmHint(), 18, 248);

    this.ctx.drawImage(this.assets.arrow, 26, 120);
    this.ctx.save();
    this.ctx.translate(38, 170);
    this.ctx.rotate(Math.PI);
    this.ctx.drawImage(this.assets.arrow, -12, -12);
    this.ctx.restore();
    this.ctx.drawImage(this.assets.CCicon, 120, 298);
  }

  drawLevelResult() {
    this.ctx.drawImage(this.assets.bggame, 0, 0);
    this.ctx.drawImage(this.assets.wood, 8, 35);
    this.ctx.fillStyle = "#000";
    this.ctx.font = "bold 18px Trebuchet MS";
    const title = this.t("levelComplete");
    this.ctx.fillText(title, 30, 38);
    this.ctx.font = "14px Trebuchet MS";
    [
      `${this.t("levelLabel")}: ${this.completedLevelNumber ?? this.levelIndex + 1}`,
      `${this.t("score")}: ${this.score}`,
      `${this.t("bestScore")}: ${this.bestScore}`,
      "",
      this.t("continueHint")
    ].forEach((line, i) => this.ctx.fillText(line, 30, 96 + i * 28));
    this.ctx.drawImage(this.assets.arrow, 220, 300);
    this.ctx.drawImage(this.assets.CCicon, 120, 298);
  }

  drawTutorialScreen() {
    this.ctx.drawImage(this.assets.bggame, 0, 0);
    this.ctx.drawImage(this.assets.wood, 8, 35);
    this.ctx.drawImage(this.assets.arrow, 220, 300);
    this.ctx.drawImage(this.assets.CCicon, 120, 298);
    this.drawWrappedText(this.t("tutorialTexts")[this.tutorialStep] ?? "", 40, 68, 149, 20);
    const prompt = this.t("continueHint");
    this.ctx.font = "12px Trebuchet MS";
    this.ctx.fillStyle = "#000";
    this.ctx.fillText(this.locale === "ru" ? "Enter: продолжить   Esc: пропуск" : "Enter: continue   Esc: skip tutorial", 14, 278);
  }

  drawMilestoneOverlay() {
    this.drawBoard();
    this.ctx.fillStyle = "rgba(255,255,255,0.9)";
    this.ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    this.ctx.fillStyle = "#fff";
    this.ctx.fillRect(18, 56, 204, 220);
    this.ctx.strokeStyle = "#000";
    this.ctx.lineWidth = 2;
    this.ctx.strokeRect(18, 56, 204, 220);
    this.ctx.fillStyle = "#000";
    this.ctx.font = "bold 18px Trebuchet MS";
      const title = this.t("congratulations");
    this.ctx.fillText(title, 120 - this.ctx.measureText(title).width / 2, 90);
      const message = this.pendingMilestone === 50 ? this.t("reward50") : this.t("reward100");
    this.drawWrappedText(message, 30, 124, 176, 20);
    this.ctx.font = "14px Trebuchet MS";
      this.ctx.fillText(this.t("continueText"), 80, 236);
    this.ctx.drawImage(this.assets.arrow, 36, 222);
  }

  drawTitle() {
    this.ctx.fillStyle = "#fff";
    this.ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    this.ctx.drawImage(this.assets.wappo2, 0, 0);
    this.ctx.drawImage(this.assets.arrow, 220, 300);
  }

  drawSplash(image) {
    this.ctx.fillStyle = "#fff";
    this.ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    this.drawImageCentered(image);
  }

  draw() {
    if (!this.assets) return;
    this.ctx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    if (this.scene === "splash_siemens") return this.drawSplash(this.assets.siemens);
    if (this.scene === "splash_softex") return this.drawSplash(this.assets.softex);
    if (this.scene === "title") return this.drawTitle();
    if (this.scene === "main_menu") return this.drawMainMenu();
    if (this.scene === "help") return this.drawHelp();
    if (this.scene === "about") return this.drawAbout();
    if (this.scene === "high_score") return this.drawHighScore();
    if (this.scene === "settings") return this.drawSettings();
    if (this.scene === "level_select") return this.drawLevelSelect();
    if (this.scene === "level_result") return this.drawLevelResult();
    if (this.scene === "tutorial") return this.drawTutorialScreen();
    if (this.scene === "milestone") return this.drawMilestoneOverlay();
    this.drawBoard();
      if (this.scene === "pause") this.drawOverlayMenu(this.t("paused"), this.pauseMenuItems());
      if (this.scene === "game_over") this.drawOverlayMenu(this.t("caught"), this.gameOverMenuItems());
  }

  loop(time) {
    if (!this.lastFrameTime || time - this.lastFrameTime >= 1000 / this.currentFps()) {
      this.lastFrameTime = time;
      this.update();
      this.draw();
    }
    requestAnimationFrame(this.boundLoop);
  }
}

const game = new Game(document.getElementById("gameCanvas"), document.getElementById("status"));
function bindPress(element, handler) {
  const wrapped = (event) => {
    event.preventDefault?.();
    handler(event);
  };
  if (window.PointerEvent) {
    element.addEventListener("pointerdown", wrapped);
  } else {
    element.addEventListener("click", wrapped);
    element.addEventListener("touchstart", wrapped, { passive: false });
  }
}

bindPress(document.getElementById("restartBtn"), () => {
  game.loadLevel(game.levelIndex, false);
  game.scene = "game";
});

bindPress(document.getElementById("menuBtn"), () => {
  console.debug("wappo2 menuBtn", { scene: game.scene, turnPhase: game.turnPhase });
  if (game.scene === "game") {
    game.scene = "pause";
    game.menuIndex = 0;
  } else {
    game.scene = "main_menu";
    game.menuIndex = 0;
  }
});

for (const button of document.querySelectorAll("[data-action]")) {
  bindPress(button, () => game.handleControl(button.dataset.action));
}
game.init().catch((error) => {
  document.getElementById("status").textContent = STRINGS.ru.loading;
  console.error(error);
});
