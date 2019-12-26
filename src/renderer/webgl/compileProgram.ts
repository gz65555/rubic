import { Logger } from "@/logger";
import { AttributeLocations } from "@/renderer/webgl/types";

export function compileProgram(
  gl: WebGLRenderingContext,
  vertexSrc: string,
  fragmentSrc: string,
  attributeLocations: AttributeLocations,
) {
  const vertexShader = compileShader(gl, gl.VERTEX_SHADER, vertexSrc);
  const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, fragmentSrc);

  const program = gl.createProgram();

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);

  if (attributeLocations) {
    for (let i in attributeLocations) {
      gl.bindAttribLocation(program, attributeLocations[i], i);
    }
  }

  gl.linkProgram(program);

  if (gl.getProgramParameter(program, gl.LINK_STATUS)) {
    Logger.error(`'gl.VALIDATE_STATUS': ${gl.getProgramParameter(program, gl.VALIDATE_STATUS)}`);
    Logger.error(`'gl.getError': ${gl.getError()}`);

    if (gl.getProgramInfoLog(program) !== "") {
      Logger.error(`gl.getProgramInfoLog:' ${gl.getProgramInfoLog(program)}`);
    }

    gl.deleteProgram(program);
    return null;
  }

  gl.deleteShader(vertexShader);
  gl.deleteShader(fragmentShader);

  return program;
}

function compileShader(gl: WebGLRenderingContext, type: GLenum, src: string) {
  const shader = gl.createShader(type);

  gl.shaderSource(shader, src);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    Logger.error(gl.getShaderInfoLog(shader));
    return null;
  }

  return shader;
}
