import fs from "fs";
import { BFS, Maze } from "./utils";

const args: string[] = process.argv.slice(2);

if (args.length !== 1) {
  console.log("usage: ts-node ./tefeta.ts <MAP_FILE>");
  process.exit(0);
}

const map_file: string = args[0];

if (!fs.existsSync(map_file)) {
  console.log(`The file ${map_file} does not exist.`);
  process.exit(-1);
}
const map_content: string = fs.readFileSync(map_file, { encoding: "ascii" }).trim();
let maze: String[] = map_content.split("\n").map(row => row.trim());
maze.shift();
const maze_array: string[][] = maze.map(row => row.split(""));
const formated_maze: Maze = new Maze(maze_array);
const bfs = new BFS();
bfs.solveMaze(formated_maze);
