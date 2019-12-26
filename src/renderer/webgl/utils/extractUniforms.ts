import { defaultValue } from "./defaultValues";
import { GLType } from "@/constant";
import { GLValue } from "@/renderer/webgl/types";

export function extractUniforms(gl: WebGLRenderingContext, program: WebGLProgram): Record<string, Uniform> {
  const uniforms = {};

  const totalUniforms = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);

  for (let i = 0; i < totalUniforms; i++) {
    const uniformData = gl.getActiveUniform(program, i);
    const name = uniformData.name.replace(/\[.*?\]/, "");
    const type = uniformData.type;
    uniforms[name] = {
      type,
      size: uniformData.size,
      location: gl.getUniformLocation(program, name),
      value: defaultValue(type, uniformData.size),
    };
  }

  return uniforms;
}

export class Uniform {
  readonly type: GLType;
  readonly size: number;
  readonly location: WebGLUniformLocation | null;
  readonly value: GLValue;
}
