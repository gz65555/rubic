import { IMatrix4, IVector3 } from "@/math/types";
import { Common } from "@/math/Common";

export class Matrix4 implements IMatrix4 {
  private readonly _elements: Float32Array = new Float32Array(16);

  constructor() {}

  public set(
    n11: number,
    n12: number,
    n13: number,
    n14: number,
    n21: number,
    n22: number,
    n23: number,
    n24: number,
    n31: number,
    n32: number,
    n33: number,
    n34: number,
    n41: number,
    n42: number,
    n43: number,
    n44: number,
  ): Matrix4 {
    const te = this._elements;

    te[0] = n11;
    te[4] = n12;
    te[8] = n13;
    te[12] = n14;
    te[1] = n21;
    te[5] = n22;
    te[9] = n23;
    te[13] = n24;
    te[2] = n31;
    te[6] = n32;
    te[10] = n33;
    te[14] = n34;
    te[3] = n41;
    te[7] = n42;
    te[11] = n43;
    te[15] = n44;
    return this;
  }

  public fromArray(array: Float32Array, offset = 0): Matrix4 {
    for (let i = 0; i < 16; i++) {
      this._elements[i] = array[i + offset];
    }
    return this;
  }

  public clone(): Matrix4 {
    return new Matrix4().fromArray(this._elements);
  }

  public identity(): Matrix4 {
    this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);

    return this;
  }

  public copy(m: Matrix4): Matrix4 {
    const te = this._elements;
    const me = m.elements;

    te[0] = me[0];
    te[1] = me[1];
    te[2] = me[2];
    te[3] = me[3];
    te[4] = me[4];
    te[5] = me[5];
    te[6] = me[6];
    te[7] = me[7];
    te[8] = me[8];
    te[9] = me[9];
    te[10] = me[10];
    te[11] = me[11];
    te[12] = me[12];
    te[13] = me[13];
    te[14] = me[14];
    te[15] = me[15];

    return this;
  }

  public get elements(): Readonly<Float32Array> {
    return this._elements;
  }

  public multiply(m: Matrix4): Matrix4 {
    const a = this._elements;
    const a00 = a[0];
    const a01 = a[1];
    const a02 = a[2];
    const a03 = a[3];
    const a10 = a[4];
    const a11 = a[5];
    const a12 = a[6];
    const a13 = a[7];
    const a20 = a[8];
    const a21 = a[9];
    const a22 = a[10];
    const a23 = a[11];
    const a30 = a[12];
    const a31 = a[13];
    const a32 = a[14];
    const a33 = a[15];

    const b = m.elements;
    let b0 = b[0];
    let b1 = b[1];
    let b2 = b[2];
    let b3 = b[3];
    a[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    a[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    a[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    a[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

    b0 = b[4];
    b1 = b[5];
    b2 = b[6];
    b3 = b[7];
    a[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    a[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    a[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    a[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

    b0 = b[8];
    b1 = b[9];
    b2 = b[10];
    b3 = b[11];
    a[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    a[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    a[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    a[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

    b0 = b[12];
    b1 = b[13];
    b2 = b[14];
    b3 = b[15];
    a[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    a[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    a[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    a[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    return this;
  }

  public translate(v: IVector3): Matrix4 {
    const x = v.x;
    const y = v.y;
    const z = v.z;
    const a = this._elements;
    a[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
    a[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
    a[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
    a[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
    return this;
  }

  public scale(v: IVector3): Matrix4 {
    const x = v.x;
    const y = v.y;
    const z = v.z;

    const elements = this._elements;

    elements[0] = elements[0] * x;
    elements[1] = elements[1] * x;
    elements[2] = elements[2] * x;
    elements[3] = elements[3] * x;
    elements[4] = elements[4] * y;
    elements[5] = elements[5] * y;
    elements[6] = elements[6] * y;
    elements[7] = elements[7] * y;
    elements[8] = elements[8] * z;
    elements[9] = elements[9] * z;
    elements[10] = elements[10] * z;
    elements[11] = elements[11] * z;
    return this;
  }

  public makeRotationFromEuler(euler: IVector3): Matrix4 {
    const te = this._elements;

    const x = euler.x;
    const y = euler.y;
    const z = euler.z;
    const a = Math.cos(x);
    const b = Math.sin(x);
    const c = Math.cos(y);
    const d = Math.sin(y);
    const e = Math.cos(z);
    const f = Math.sin(z);

    const ae = a * e;
    const af = a * f;
    const be = b * e;
    const bf = b * f;

    te[0] = c * e;
    te[4] = -c * f;
    te[8] = d;

    te[1] = af + be * d;
    te[5] = ae - bf * d;
    te[9] = -b * c;

    te[2] = bf - ae * d;
    te[6] = be + af * d;
    te[10] = a * c;
    return this;
  }

  public perspective(fov: number, aspect: number, near: number, far: number): Matrix4 {
    const f = 1.0 / Math.tan(fov / 2);
    const elements = this._elements;
    elements[0] = f / aspect;
    elements[1] = 0;
    elements[2] = 0;
    elements[3] = 0;
    elements[4] = 0;
    elements[5] = f;
    elements[6] = 0;
    elements[7] = 0;
    elements[8] = 0;
    elements[9] = 0;
    elements[11] = -1;
    elements[12] = 0;
    elements[13] = 0;
    elements[15] = 0;
    if (far != null && far !== Infinity) {
      const nf = 1 / (near - far);
      elements[10] = (far + near) * nf;
      elements[14] = 2 * far * near * nf;
    } else {
      elements[10] = -1;
      elements[14] = -2 * near;
    }
    return this;
  }

  public ortho(left: number, right: number, bottom: number, top: number, near: number, far: number): Matrix4 {
    const lr = 1 / (left - right);
    const bt = 1 / (bottom - top);
    const nf = 1 / (near - far);
    const elements = this._elements;
    elements[0] = -2 * lr;
    elements[1] = 0;
    elements[2] = 0;
    elements[3] = 0;
    elements[4] = 0;
    elements[5] = -2 * bt;
    elements[6] = 0;
    elements[7] = 0;
    elements[8] = 0;
    elements[9] = 0;
    elements[10] = 2 * nf;
    elements[11] = 0;
    elements[12] = (left + right) * lr;
    elements[13] = (top + bottom) * bt;
    elements[14] = (far + near) * nf;
    elements[15] = 1;
    return this;
  }

  public lookAt(eye: IVector3, center: IVector3, up: IVector3): Matrix4 {
    let x0: number;
    let x1: number;
    let x2: number;
    let y0: number;
    let y1: number;
    let y2: number;
    let z0: number;
    let z1: number;
    let z2: number;
    let len: number;
    const eyex = eye.x;
    const eyey = eye.y;
    const eyez = eye.z;
    const upx = up.x;
    const upy = up.y;
    const upz = up.z;
    const centerx = center.x;
    const centery = center.y;
    const centerz = center.z;

    if (
      Math.abs(eyex - centerx) < Common.EPSILON &&
      Math.abs(eyey - centery) < Common.EPSILON &&
      Math.abs(eyez - centerz) < Common.EPSILON
    ) {
      return this.identity();
    }

    z0 = eyex - centerx;
    z1 = eyey - centery;
    z2 = eyez - centerz;

    len = 1 / Math.hypot(z0, z1, z2);
    z0 *= len;
    z1 *= len;
    z2 *= len;

    x0 = upy * z2 - upz * z1;
    x1 = upz * z0 - upx * z2;
    x2 = upx * z1 - upy * z0;
    len = Math.hypot(x0, x1, x2);
    if (!len) {
      x0 = 0;
      x1 = 0;
      x2 = 0;
    } else {
      len = 1 / len;
      x0 *= len;
      x1 *= len;
      x2 *= len;
    }

    y0 = z1 * x2 - z2 * x1;
    y1 = z2 * x0 - z0 * x2;
    y2 = z0 * x1 - z1 * x0;

    len = Math.hypot(y0, y1, y2);
    if (!len) {
      y0 = 0;
      y1 = 0;
      y2 = 0;
    } else {
      len = 1 / len;
      y0 *= len;
      y1 *= len;
      y2 *= len;
    }

    const elements = this._elements;
    elements[0] = x0;
    elements[1] = y0;
    elements[2] = z0;
    elements[3] = 0;
    elements[4] = x1;
    elements[5] = y1;
    elements[6] = z1;
    elements[7] = 0;
    elements[8] = x2;
    elements[9] = y2;
    elements[10] = z2;
    elements[11] = 0;
    elements[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
    elements[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
    elements[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
    elements[15] = 1;

    return this;
  }
}
