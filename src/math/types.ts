export interface IVector3 {
  x: number;
  y: number;
  z: number;
}

export type FloatArray = number[] | Float32Array;
export type IndexArray = FloatArray | Uint8Array | Uint16Array;

export interface IMatrix4 {
  elements: Readonly<FloatArray>;
}
