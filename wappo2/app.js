const SCREEN_WIDTH = 240;
const SCREEN_HEIGHT = 320;
const GRID = 6;
const TILE_W = 40;
const TILE_H = 52;
const BOARD_X = 0;
const BOARD_Y = 4;

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

const MENU_ITEMS = ["New Game", "Continue", "Help", "About"];
const PAUSE_ITEMS = ["Resume", "Restart", "Menu"];

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
    this.offsetX = 0;
    this.offsetY = 0;
    this.targetTile = null;
    this.moveDx = 0;
    this.moveDy = 0;
    this.totalSteps = 0;
    this.moveMode = "";
  }
}

class Game {
  constructor(canvas, statusEl) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.statusEl = statusEl;
    this.scene = "loading";
    this.levels = [];
    this.menuIndex = 0;
    this.frame = 0;
    this.turnPhase = "idle";
    this.inputLocked = false;
    this.score = 0;
    this.bestScore = Number(localStorage.getItem("wappo2-web-best-score") || 0);
    this.lastProgressLevel = Number(localStorage.getItem("wappo2-web-level") || 0);
    this.levelIndex = this.lastProgressLevel;
    this.levelTarget = 0;
    this.levelProgressUnits = 0;
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
    this.pendingNextLevel = null;
    this.completedLevelNumber = null;
    this.boundLoop = () => this.loop();
  }

  async init() {
    this.levels = await fetch("./data/levels.json").then((r) => r.json());
    this.loadLevel(this.levelIndex, false);
    this.scene = "title";
    window.addEventListener("keydown", (event) => this.onKey(event));
    requestAnimationFrame(this.boundLoop);
  }

  saveProgress() {
    localStorage.setItem("wappo2-web-best-score", String(this.bestScore));
    localStorage.setItem("wappo2-web-level", String(this.lastProgressLevel));
  }

  setStatus(text) {
    this.statusEl.textContent = text;
  }

  loadLevel(index, resetScore = false) {
    if (resetScore) this.score = 0;
    this.levelIndex = Math.max(0, Math.min(index, this.levels.length - 1));
    this.lastProgressLevel = Math.max(this.lastProgressLevel, this.levelIndex);
    this.saveProgress();
    const level = this.levels[this.levelIndex];
    this.cells = Array.from({ length: 36 }, () => new Cell());
    this.enemies = [];
    this.teleports = [-1, -1];
    this.exitTile = -1;
    this.levelTarget = level[0][4];
    this.levelProgressUnits = 0;
    this.turnPhase = "idle";
    this.inputLocked = false;
    this.playerOffsetX = 0;
    this.playerOffsetY = 0;
    this.playerAnimSteps = 0;
    this.playerTargetTile = null;
    this.playerTeleportedThisTurn = false;
    this.pendingPush = null;

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
    this.setStatus(`Level ${this.levelIndex + 1}  Score ${this.score}`);
  }

  onKey(event) {
    if (event.key.startsWith("Arrow")) event.preventDefault();
    if (this.scene === "title") {
      this.scene = "menu";
      return;
    }
    if (this.scene === "menu") {
      if (event.key === "ArrowUp") this.menuIndex = (this.menuIndex + MENU_ITEMS.length - 1) % MENU_ITEMS.length;
      if (event.key === "ArrowDown") this.menuIndex = (this.menuIndex + 1) % MENU_ITEMS.length;
      if (event.key === "Enter" || event.key === " ") this.activateMenu();
      return;
    }
    if (this.scene === "pause") {
      if (event.key === "ArrowUp") this.menuIndex = (this.menuIndex + PAUSE_ITEMS.length - 1) % PAUSE_ITEMS.length;
      if (event.key === "ArrowDown") this.menuIndex = (this.menuIndex + 1) % PAUSE_ITEMS.length;
      if (event.key === "Enter" || event.key === " ") this.activatePause();
      if (event.key === "Escape") this.scene = "game";
      return;
    }
    if (this.scene === "help" || this.scene === "about" || this.scene === "result" || this.scene === "game_over") {
      if (event.key === "Enter" || event.key === " " || event.key === "Escape") {
        if (this.scene === "result") this.advanceAfterResult();
        else if (this.scene === "game_over") {
          this.loadLevel(this.levelIndex, false);
          this.scene = "game";
        } else {
          this.scene = "menu";
        }
      }
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

  activateMenu() {
    if (this.menuIndex === 0) {
      this.score = 0;
      this.loadLevel(0, false);
      this.scene = "game";
    } else if (this.menuIndex === 1) {
      this.loadLevel(this.lastProgressLevel, false);
      this.scene = "game";
    } else if (this.menuIndex === 2) {
      this.scene = "help";
    } else if (this.menuIndex === 3) {
      this.scene = "about";
    }
  }

  activatePause() {
    if (this.menuIndex === 0) this.scene = "game";
    else if (this.menuIndex === 1) {
      this.loadLevel(this.levelIndex, false);
      this.scene = "game";
    } else {
      this.scene = "menu";
      this.menuIndex = 0;
    }
  }

  handleControl(action) {
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
    } else if (this.turnPhase === "enemy_anim") {
      let active = false;
      for (const enemy of this.enemies) {
        if (enemy.totalSteps <= 0) continue;
        const moved = this.advanceEnemyStep(enemy);
        enemy.totalSteps = Math.max(0, enemy.totalSteps - 1);
        if (enemy.offsetX === 0 && enemy.offsetY === 0) {
          this.resolveEnemySpecials(enemy);
          if (enemy.tile === this.playerTile) {
            this.scene = "game_over";
            this.turnPhase = "idle";
            this.inputLocked = false;
            return;
          }
        }
        if (moved && (enemy.offsetX !== 0 || enemy.offsetY !== 0 || enemy.totalSteps > 0)) active = true;
      }
      if (!active) {
        this.turnPhase = "idle";
        this.inputLocked = false;
        this.playerTeleportedThisTurn = false;
        for (const enemy of this.enemies) {
          enemy.motionTile = enemy.tile;
          enemy.offsetX = 0;
          enemy.offsetY = 0;
          enemy.moveMode = "";
        }
        this.resolvePlayerSpecials();
      }
    }
  }

  resolvePlayerSpecials() {
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
      this.saveProgress();
      this.completedLevelNumber = this.levelIndex + 1;
      this.pendingNextLevel = Math.min(this.levelIndex + 1, this.levels.length - 1);
      this.scene = "result";
      this.turnPhase = "idle";
      this.inputLocked = false;
    } else {
      this.setStatus(`Level ${this.levelIndex + 1}  Score ${this.score}`);
    }
  }

  advanceAfterResult() {
    if (this.levelIndex >= this.levels.length - 1) {
      this.scene = "menu";
      return;
    }
    this.loadLevel(this.pendingNextLevel ?? this.levelIndex + 1, false);
    this.pendingNextLevel = null;
    this.scene = "game";
  }

  planEnemyTurn() {
    if (!this.enemies.length) {
      this.turnPhase = "idle";
      this.inputLocked = false;
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
    enemy.targetTile = target;
    enemy.motionTile = enemy.tile;
    enemy.direction = down ? 0 : 1;
    enemy.offsetY += down ? TILE_H / 4 : -(TILE_H / 4);
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
    enemy.targetTile = target;
    enemy.motionTile = enemy.tile;
    enemy.direction = right ? 3 : 2;
    enemy.offsetX += right ? TILE_W / 4 : -(TILE_W / 4);
    return true;
  }

  advancePoliceStep(enemy) {
    if (enemy.moveMode === "diagonal") return this.advancePoliceDiagonal(enemy);
    if (enemy.offsetX !== 0 || enemy.offsetY !== 0) {
      if (enemy.moveMode === "horizontal") return this.advanceHorizontalStep(enemy);
      if (enemy.moveMode === "vertical") return this.advanceVerticalStep(enemy);
    }
    const ex = enemy.tile % GRID;
    const ey = Math.floor(enemy.tile / GRID);
    const px = this.playerTile % GRID;
    const py = Math.floor(this.playerTile / GRID);
    if (px !== ex && py !== ey) {
      enemy.moveMode = "diagonal";
      enemy.motionTile = enemy.tile;
      enemy.targetTile = enemy.tile + (px > ex ? 1 : -1) + (py > ey ? 6 : -6);
      enemy.moveDx = px > ex ? 1 : -1;
      enemy.moveDy = py > ey ? 1 : -1;
      enemy.offsetX += enemy.moveDx * (TILE_W / 4);
      enemy.offsetY += enemy.moveDy * (TILE_H / 4);
      enemy.direction = enemy.moveDx > 0 ? (enemy.moveDy > 0 ? 0 : 3) : (enemy.moveDy > 0 ? 1 : 2);
      return true;
    }
    const h = this.advanceHorizontalStep(enemy);
    if (h) {
      enemy.moveMode = "horizontal";
      return true;
    }
    const v = this.advanceVerticalStep(enemy);
    if (v) enemy.moveMode = "vertical";
    return v;
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
    enemy.motionTile = tile;
    enemy.targetTile = null;
    enemy.offsetX = 0;
    enemy.offsetY = 0;
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
  cellObj(tile) {
    if (tile < 0 || tile >= 36) return FLAME;
    return this.cells[tile].obj || OPEN;
  }
  enemyAt(tile) {
    return this.enemies.some((e) => e.tile === tile);
  }
  tileXY(tile) {
    return [BOARD_X + (tile % GRID) * TILE_W, BOARD_Y + Math.floor(tile / GRID) * TILE_H];
  }

  draw() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    if (this.scene === "title") return this.drawTitle();
    if (this.scene === "menu") return this.drawMenu();
    if (this.scene === "help") return this.drawInfo("Help", ["Arrow keys move", "Esc pauses", "Push orange flame blocks", "Blue portals teleport", "Green exit wins"]);
    if (this.scene === "about") return this.drawInfo("About", ["Static JS version for GitHub Pages", "Uses original level data", "Simplified visuals for compatibility"]);
    if (this.scene === "result") return this.drawInfo("Level Complete", [`Level ${this.completedLevelNumber}`, `Score ${this.score}`, `Best ${this.bestScore}`, "Enter to continue"]);
    this.drawBoard();
    if (this.scene === "pause") this.drawOverlay("Paused", PAUSE_ITEMS);
    if (this.scene === "game_over") this.drawOverlay("Caught", ["Restart"]);
  }

  drawTitle() {
    const ctx = this.ctx;
    ctx.fillStyle = "#1d2718";
    ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    ctx.fillStyle = "#ecd18c";
    ctx.fillRect(12, 18, 216, 284);
    ctx.strokeStyle = "#6f4a13";
    ctx.lineWidth = 4;
    ctx.strokeRect(12, 18, 216, 284);
    ctx.fillStyle = "#7d1b00";
    ctx.font = "bold 36px Georgia";
    ctx.fillText("WAPPO", 36, 118);
    ctx.font = "14px Trebuchet MS";
    ctx.fillStyle = "#2b1c00";
    ctx.fillText("Static GitHub Pages edition", 36, 148);
    ctx.fillText("Press any key", 74, 278);
  }

  drawMenu() {
    const ctx = this.ctx;
    ctx.fillStyle = "#1d2718";
    ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    ctx.fillStyle = "#ecd18c";
    ctx.fillRect(12, 18, 216, 284);
    ctx.strokeStyle = "#6f4a13";
    ctx.lineWidth = 4;
    ctx.strokeRect(12, 18, 216, 284);
    ctx.fillStyle = "#7d1b00";
    ctx.font = "bold 30px Georgia";
    ctx.fillText("WAPPO", 48, 66);
    ctx.font = "bold 18px Trebuchet MS";
    MENU_ITEMS.forEach((item, index) => {
      const y = 118 + index * 34;
      if (index === this.menuIndex) {
        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.moveTo(28, y - 10);
        ctx.lineTo(42, y - 3);
        ctx.lineTo(28, y + 4);
        ctx.closePath();
        ctx.fill();
      }
      ctx.fillStyle = "#17110c";
      ctx.fillText(item, 52, y);
    });
    ctx.font = "12px Trebuchet MS";
    ctx.fillText(`Best level: ${this.lastProgressLevel + 1}`, 26, 266);
    ctx.fillText(`Best score: ${this.bestScore}`, 26, 286);
  }

  drawInfo(title, lines) {
    const ctx = this.ctx;
    ctx.fillStyle = "#1d2718";
    ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    ctx.fillStyle = "#ecd18c";
    ctx.fillRect(12, 18, 216, 284);
    ctx.strokeStyle = "#6f4a13";
    ctx.lineWidth = 4;
    ctx.strokeRect(12, 18, 216, 284);
    ctx.fillStyle = "#17110c";
    ctx.font = "bold 20px Trebuchet MS";
    ctx.fillText(title, 26, 48);
    ctx.font = "14px Trebuchet MS";
    lines.forEach((line, index) => ctx.fillText(line, 26, 96 + index * 28));
  }

  drawOverlay(title, items) {
    const ctx = this.ctx;
    ctx.fillStyle = "rgba(0,0,0,0.45)";
    ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    ctx.fillStyle = "#f7efcf";
    ctx.fillRect(24, 70, 192, 150);
    ctx.strokeStyle = "#5f3d10";
    ctx.lineWidth = 3;
    ctx.strokeRect(24, 70, 192, 150);
    ctx.fillStyle = "#17110c";
    ctx.font = "bold 18px Trebuchet MS";
    ctx.fillText(title, 88, 100);
    ctx.font = "bold 16px Trebuchet MS";
    items.forEach((item, index) => {
      const y = 140 + index * 28;
      if (index === this.menuIndex) ctx.fillText(">", 42, y);
      ctx.fillText(item, 62, y);
    });
  }

  drawBoard() {
    const ctx = this.ctx;
    for (let row = 0; row < GRID; row += 1) {
      for (let col = 0; col < GRID; col += 1) {
        const [x, y] = [BOARD_X + col * TILE_W, BOARD_Y + row * TILE_H];
        const light = (row + col) % 2 === 0;
        ctx.fillStyle = light ? "#72562a" : "#4f4631";
        ctx.fillRect(x, y, TILE_W, TILE_H);
        ctx.strokeStyle = "#0d6c2f";
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, TILE_W, TILE_H);
      }
    }

    for (let tile = 0; tile < 36; tile += 1) {
      const [x, y] = this.tileXY(tile);
      const cell = this.cells[tile];
      if (cell.obj === FLAME) {
        ctx.fillStyle = "#ff8c00";
        ctx.beginPath();
        ctx.arc(x + 20, y + 24, 10 + (this.frame % 3), 0, Math.PI * 2);
        ctx.fill();
      } else if (cell.obj === TELEPORT) {
        ctx.strokeStyle = "#62d6ff";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(x + 20, y + 26, 10 + (this.frame % 4), 0, Math.PI * 2);
        ctx.stroke();
      } else if (cell.obj === EXIT) {
        ctx.fillStyle = "#c5ff7b";
        ctx.fillRect(x + 10, y + 12, 20, 26);
      }
      if (cell.rightWall === BLOCKED) {
        ctx.fillStyle = "#d9d9d9";
        ctx.fillRect(x + TILE_W - 4, y, 4, TILE_H);
      }
      if (cell.topWall === BLOCKED) {
        ctx.fillStyle = "#d9d9d9";
        ctx.fillRect(x, y - 4, TILE_W, 4);
      }
    }

    const [px, py] = this.tileXY(this.playerTile);
    this.drawActor(px + this.playerOffsetX, py + this.playerOffsetY, "#ff7e2f", "P");
    for (const enemy of this.enemies) {
      const base = enemy.motionTile ?? enemy.tile;
      const [ex, ey] = this.tileXY(base);
      const color = enemy.kind === XOT ? "#e24141" : enemy.kind === YEL ? "#6d8cff" : "#a66eff";
      const label = enemy.kind === POLICE ? "C" : "M";
      this.drawActor(ex + enemy.offsetX, ey + enemy.offsetY, color, label);
    }
    this.ctx.fillStyle = "#ffffff";
    this.ctx.beginPath();
    this.ctx.moveTo(220, 300);
    this.ctx.lineTo(236, 308);
    this.ctx.lineTo(220, 316);
    this.ctx.closePath();
    this.ctx.fill();
  }

  drawActor(x, y, color, label) {
    const ctx = this.ctx;
    ctx.fillStyle = color;
    ctx.fillRect(x + 10, y + 8, 20, 30);
    ctx.fillRect(x + 14, y + 38, 12, 8);
    ctx.fillStyle = "#111";
    ctx.font = "bold 12px Trebuchet MS";
    ctx.fillText(label, x + 16, y + 27);
  }

  loop() {
    this.update();
    this.draw();
    requestAnimationFrame(this.boundLoop);
  }
}

const game = new Game(document.getElementById("gameCanvas"), document.getElementById("status"));
document.getElementById("restartBtn").addEventListener("click", () => {
  game.loadLevel(game.levelIndex, false);
  game.scene = "game";
});
document.getElementById("menuBtn").addEventListener("click", () => {
  game.scene = "menu";
  game.menuIndex = 0;
});
for (const button of document.querySelectorAll("[data-action]")) {
  button.addEventListener("click", () => game.handleControl(button.dataset.action));
}
game.init().catch((error) => {
  document.getElementById("status").textContent = "Failed to load levels";
  console.error(error);
});
