import Coordinate from "./Coordinate";

export class Maze {
  private ROAD: number = 0;
  private START: number = 1;
  private GOAL: number = 2;
  private WALL: number = 3;
  private PATH: number = 4;
  private start_symbol: string;
  private goal_symbol: string;
  private road_symbol: string;
  private wall_symbol: string;
  private maze!: number[][];
  private resolved_maze!: string;
  private visited!: boolean[][];
  private start!: Coordinate;
  private end!: Coordinate;

  constructor(
    maze: string[][],
    start_symbol?: string,
    goal_symbol?: string,
    wall_symbol?: string,
    road_symbol?: string
  ) {
    this.start_symbol = start_symbol || "1";
    this.goal_symbol = goal_symbol || "2";
    this.wall_symbol = wall_symbol || "*";
    this.road_symbol = road_symbol || ".";
    this.initializeMaze(maze);
  }

  initializeMaze(maze: string[][]): void | never {
    const lines = maze;
    if (maze.length > 0 && maze[0].length > 0) {
      this.visited = [...new Array(maze.length)].map(() =>
        [...new Array(maze[0].length)].map(() => false)
      );
      this.maze = [...new Array(maze.length)].map(() =>
        [...new Array(maze[0].length)].map(() => -1)
      );
    } else throw "Error in maze length";

    for (let row = 0; row < this.getHeight(); row++) {
      for (let col = 0; col < this.getWidth(); col++) {
        if (lines[row][col] == this.wall_symbol)
          this.maze[row][col] = this.WALL;
        else if (lines[row][col] == this.start_symbol) {
          this.maze[row][col] = this.START;
          this.start = new Coordinate(row, col);
        } else if (lines[row][col] == this.goal_symbol) {
          this.maze[row][col] = this.GOAL;
          this.end = new Coordinate(row, col);
        } else this.maze[row][col] = this.ROAD;
      }
    }
  }

  getMaze(): number[][] {
    return this.maze;
  }

  getHeight(): number {
    return this.maze.length;
  }

  getWidth(): number {
    return this.maze[0].length;
  }

  getStart(): Coordinate {
    return this.start;
  }

  getEnd(): Coordinate {
    return this.end;
  }

  isEnd(x: number, y: number): boolean {
    return x == this.end.getX() && y == this.end.getY();
  }

  isStart(x: number, y: number): boolean {
    return x == this.start.getX() && y == this.start.getY();
  }

  isVisited(row: number, col: number): boolean {
    return this.visited[row][col];
  }

  getVisited(): boolean[][] {
    return this.visited;
  }

  isWall(row: number, col: number): boolean {
    return this.maze[row][col] == this.WALL;
  }

  setVisited(row: number, col: number, value: boolean): void {
    this.visited[row][col] = value;
  }

  isValidLocation(row: number, col: number): boolean {
    if (row >= this.getHeight() || col >= this.getWidth()) {
      return false;
    }
    return true;
  }

  setResolvedMaze(path: Coordinate[]): void {
    const tempMaze: number[][] = this.maze;
    for (const coordinate of path) {
      if (
        this.isStart(coordinate.getX(), coordinate.getY()) ||
        this.isEnd(coordinate.getX(), coordinate.getY())
      ) {
        continue;
      }
      tempMaze[coordinate.getX()][coordinate.getY()] = this.PATH;
    }
    this.formatMaze(tempMaze);
  }

  formatMaze(maze: number[][]): void {
    let tempMaze: string = "";
    for (let row = 0; row < this.getHeight(); row++) {
      for (let col = 0; col < this.getWidth(); col++) {
        if (maze[row][col] == this.ROAD) {
          tempMaze += " ";
        } else if (maze[row][col] == this.WALL) {
          tempMaze += this.wall_symbol;
        } else if (maze[row][col] == this.START) {
          tempMaze += this.start_symbol;
        } else if (maze[row][col] == this.GOAL) {
          tempMaze += this.goal_symbol;
        } else {
          tempMaze += this.road_symbol;
        }
      }
      tempMaze += "\n";
    }
    this.resolved_maze = tempMaze;
  }

  getResolvedMaze(): string {
    return this.resolved_maze;
  }
}

export default Maze;