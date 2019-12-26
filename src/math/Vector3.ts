import { IVector3 } from "@/math/types";

export class Vector3 implements IVector3 {
  constructor(public x = 0, public y = 0, public z = 0) {}

  public set(x: number, y: number, z: number): Vector3 {
    return this;
  }

  public setScalar(scalar: number): Vector3 {
    return this.set(scalar, scalar, scalar);
  }

  public setX(x: number): Vector3 {
    this.x = x;
    return this;
  }

  public setY(y: number): Vector3 {
    this.y = y;
    return this;
  }

  public setZ(z: number): Vector3 {
    this.z = z;
    return this;
  }

  public copy(v: Vector3): Vector3 {
    return this.set(v.x, v.y, v.z);
  }

  public clone(): Vector3 {
    return new Vector3(this.x, this.x, this.z);
  }

  public add(v: IVector3): Vector3 {
    return this.set(this.x + v.x, this.y + v.y, this.z + v.z);
  }

  public addScalar(scalar: number): Vector3 {
    return this.set(this.x + scalar, this.y + scalar, this.z + scalar);
  }

  public addVectors(a: IVector3, b: IVector3): Vector3 {
    return this.set(a.x + b.x, a.y + b.y, a.z + b.z);
  }

  public sub(a: IVector3): Vector3 {
    return this.set(this.x - a.x, this.y - a.y, this.z - a.z);
  }

  public subScalar(scalar: number): Vector3 {
    return this.set(this.x - scalar, this.y - scalar, this.z - scalar);
  }

  public subVectors(a: IVector3, b: IVector3): Vector3 {
    return this.set(a.x - b.x, a.y - b.y, a.z - b.z);
  }

  public multiply(v: IVector3): Vector3 {
    return this.set(this.x * v.x, this.y * v.y, this.z * v.z);
  }
}
