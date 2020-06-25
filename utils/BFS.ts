import Coordinate from "./Coordinate";
import Maze from "./Maze";

export class BFS {
  private directions: number[][];

  constructor() {
    this.directions = [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
    ];
  }

  solveMaze(maze: Maze): Coordinate[] {
    const nextToVisit: Coordinate[] = [];
    const start: Coordinate = maze.getStart();
    nextToVisit.push(start);

    while (nextToVisit.length > 0) {
      const currentCoor: Coordinate | undefined = nextToVisit.shift();
      if (!currentCoor) return [];
      if (
        !maze.isValidLocation(currentCoor.getX(), currentCoor.getY()) ||
        maze.isVisited(currentCoor.getX(), currentCoor.getY())
      ) {
        continue;
      }

      if (maze.isWall(currentCoor.getX(), currentCoor.getY())) {
        maze.setVisited(currentCoor.getX(), currentCoor.getY(), true);
        continue;
      }
      if (maze.isEnd(currentCoor.getX(), currentCoor.getY())) {
        maze.setResolvedMaze(this.backtrackPath(currentCoor));
        console.log(maze.getResolvedMaze());
        return this.backtrackPath(currentCoor);
      }

      for (const direction of this.directions) {
        const coordinate: Coordinate = new Coordinate(
          this.changeDirection(currentCoor.getX(), direction[0]),
          this.changeDirection(currentCoor.getY(), direction[1]),
          currentCoor
        );

        nextToVisit.push(coordinate);
        maze.setVisited(currentCoor.getX(), currentCoor.getY(), true);
      }
    }
    return [];
  }

  private changeDirection(coor: number, newDirection: number): number {
    if (coor === 0 && newDirection < 0) return 0;
    else return coor + newDirection;
  }

  private backtrackPath(currentCoor: Coordinate): Coordinate[] {
    const path: Coordinate[] = [];
    let iter: Coordinate | null = currentCoor;

    while (iter != null) {
      path.push(iter);
      iter = iter.getParent();
    }

    return path;
  }
}

export default BFS;
