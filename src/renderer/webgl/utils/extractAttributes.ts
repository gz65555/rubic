import { GLType } from "@/constant";

export function extractAttributes(gl: WebGLRenderingContext, program: WebGLProgram): Record<string, Attribute> {
  const attributes = {};

  const totalAttributes = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);

  for (let i = 0; i < totalAttributes; i++) {
    const attribData = gl.getActiveAttrib(program, i);

    attributes[attribData.name] = new Attribute(
      gl,
      attribData.type,
      attribData.size,
      gl.getAttribLocation(program, attribData.name),
    );
  }
  return attributes;
}

export class Attribute {
  readonly type: GLType;
  readonly size: GLint;
  readonly location: GLint;
  constructor(private gl: WebGLRenderingContext, size: GLint, type?: GLType, location?: GLint) {
    this.type = type;
    this.size = size;
    this.location = location;
  }

  pointer(type?: GLType, normalized?: boolean, stride?: number, start?: number) {
    this.gl.vertexAttribPointer(
      this.location,
      this.size,
      type || this.gl.FLOAT,
      normalized || false,
      stride || 0,
      start || 0,
    );
  }
}
