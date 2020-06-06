import { GLType } from "@/constant";
import { GLValue } from "@/renderer/webgl/types";

export function defaultValue(type: GLType, size: number): GLValue {
  switch (type) {
    case GLType.FLOAT:
      return 0;

    case GLType.FLOAT_VEC2:
      return new Float32Array(2 * size);

    case GLType.FLOAT_VEC3:
      return new Float32Array(3 * size);

    case GLType.FLOAT_VEC4:
      return new Float32Array(4 * size);

    case GLType.INT:
    case GLType.SAMPLER_2D:
      return 0;

    case GLType.INT_VEC2:
      return new Int32Array(2 * size);

    case GLType.INT_VEC3:
      return new Int32Array(3 * size);

    case GLType.INT_VEC4:
      return new Int32Array(4 * size);

    case GLType.BOOL:
      return false;

    case GLType.BOOL_VEC2:
      return booleanArray(2 * size);

    case GLType.BOOL_VEC3:
      return booleanArray(3 * size);

    case GLType.BOOL_VEC4:
      return booleanArray(4 * size);

    case GLType.FLOAT_MAT2:
      return new Float32Array([1, 0, 0, 1]);

    case GLType.FLOAT_MAT3:
      return new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 1]);

    case GLType.FLOAT_MAT4:
      return new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
  }
}
function booleanArray(size): Array<boolean> {
  const array = new Array(size);

  for (let i = 0; i < array.length; i++) {
    array[i] = false;
  }

  return array;
}
