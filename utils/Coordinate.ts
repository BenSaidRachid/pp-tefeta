export class Coordinate {
    private x: number;
    private y: number;
    private parent: Coordinate | null;
  
    constructor(x: number, y: number, parent?: Coordinate) {
      this.x = x;
      this.y = y;
      this.parent = parent || null;
    }
  
    getX(): number {
      return this.x;
    }
  
    getY(): number {
      return this.y;
    }
  
    getParent(): Coordinate | null {
      return this.parent;
    }
}
  
export default Coordinate;