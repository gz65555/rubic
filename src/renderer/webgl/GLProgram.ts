import {compileProgram, extractAttributes, extractUniforms, generateUniformAccessObject} from "@/renderer/webgl/utils";

export class GLProgram {
  private program: WebGLProgram;
  private attributes;
  private uniformData;
  private uniforms;
  constructor(private gl: WebGLRenderingContext, vertexSrc: string, fragmentSrc: string, attributeLocations) {}

  bind() {
    this.gl.useProgram(this.program);
    return this;
  }

  destroy() {
    this.attributes = null;
    this.uniformData = null;
    this.uniforms = null;

    this.gl.deleteProgram(this.program);
  }
}
var Shader = function(gl, vertexSrc, fragmentSrc, precision, attributeLocations) {
  /**
   * The shader program
   *
   * @member {WebGLProgram}
   */
  // First compile the program..
  this.program = compileProgram(gl, vertexSrc, fragmentSrc, attributeLocations);

  /**
   * The attributes of the shader as an object containing the following properties
   * {
   * 	type,
   * 	size,
   * 	location,
   * 	pointer
   * }
   * @member {Object}
   */
  // next extract the attributes
  this.attributes = extractAttributes(gl, this.program);

  this.uniformData = extractUniforms(gl, this.program);

  /**
   * The uniforms of the shader as an object containing the following properties
   * {
   * 	gl,
   * 	data
   * }
   * @member {Object}
   */
  this.uniforms = generateUniformAccessObject(gl, this.uniformData);
};
/**
 * Uses this shader
 *
 * @return {PIXI.glCore.GLShader} Returns itself.
 */
Shader.prototype.bind = function() {
  this.gl.useProgram(this.program);
  return this;
};

/**
 * Destroys this shader
 * TODO
 */
Shader.prototype.destroy = function() {
  this.attributes = null;
  this.uniformData = null;
  this.uniforms = null;

  var gl = this.gl;
  gl.deleteProgram(this.program);
};

module.exports = Shader;
