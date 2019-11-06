import { FloatArray, IndexArray } from '@/math/types'

export interface IGeometry {
	vertices: FloatArray
}

export abstract class BufferGeometry implements IGeometry {
	abstract get vertices(): FloatArray
}

export abstract class IndexBufferGeometry implements IGeometry {
	abstract get vertices(): FloatArray
	abstract get indices(): IndexArray
}
