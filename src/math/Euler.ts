import { Quaternion } from '@/math/Quaternion'
import { IVector3 } from '@/math/types'

export class Euler implements IVector3 {
	constructor(private _x = 0, private _y = 0, private _z = 0) {}

	get x(): number {
		return this._x
	}

	set x(value: number) {
		this._x = value
	}

	get y(): number {
		return this._y
	}

	set y(value: number) {
		this._y = value
	}

	get z(): number {
		return this._z
	}

	set z(value: number) {
		this._z = value
	}

	public set(x: number, y: number, z: number): Euler {
		this.x = x
		this.y = y
		this.z = z
		return this
	}

	public clone(): Euler {
		return new Euler(this._x, this._y, this._z)
	}

	public copy(euler: Euler): Euler {
		this._x = euler.x
		this._y = euler.y
		this._z = euler.z
		return this
	}

	public equals(euler: Euler): boolean {
		return this.x === euler.x && this.y === euler.y && this.z === euler.z
	}

	public setFromQuaternion(q: Quaternion): Euler {
		return this
	}
}
