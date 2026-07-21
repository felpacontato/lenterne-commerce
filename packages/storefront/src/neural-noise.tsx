"use client";

import { useEffect, useRef } from "react";

type NeuralNoiseProps = { color?: [number, number, number]; opacity?: number; speed?: number };
const DEFAULT_RED: [number, number, number] = [0.86, 0.055, 0.035];

export function NeuralNoise({ color = DEFAULT_RED, opacity = 0.22, speed = 0.0007 }: NeuralNoiseProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!canvas || reduceMotion) return;
    const gl = (canvas.getContext("webgl", { alpha: true, antialias: false }) ?? canvas.getContext("experimental-webgl")) as WebGLRenderingContext | null;
    if (!gl) return;

    const vertexSource = `
      precision mediump float;
      varying vec2 vUv;
      attribute vec2 a_position;
      void main() { vUv = .5 * (a_position + 1.); gl_Position = vec4(a_position, 0., 1.); }
    `;
    const fragmentSource = `
      precision mediump float;
      varying vec2 vUv;
      uniform float u_time;
      uniform float u_ratio;
      uniform vec2 u_pointer;
      uniform vec3 u_color;
      uniform float u_speed;
      vec2 rotate(vec2 uv, float angle) { return mat2(cos(angle), sin(angle), -sin(angle), cos(angle)) * uv; }
      float shape(vec2 uv, float t, float pointerPower) {
        vec2 sineAcc = vec2(0.);
        vec2 result = vec2(0.);
        float scale = 8.;
        for (int i = 0; i < 15; i++) {
          uv = rotate(uv, 1.);
          sineAcc = rotate(sineAcc, 1.);
          vec2 layer = uv * scale + float(i) + sineAcc - t;
          sineAcc += sin(layer) + 2.4 * pointerPower;
          result += (.5 + .5 * cos(layer)) / scale;
          scale *= 1.2;
        }
        return result.x + result.y;
      }
      void main() {
        vec2 uv = .5 * vUv;
        uv.x *= u_ratio;
        vec2 pointer = vUv - u_pointer;
        pointer.x *= u_ratio;
        float p = .5 * pow(1. - clamp(length(pointer), 0., 1.), 2.);
        float noise = shape(uv, u_speed * u_time, p);
        noise = 1.2 * pow(noise, 3.) + pow(noise, 10.);
        noise = max(0., noise - .5) * (1. - length(vUv - .5));
        gl_FragColor = vec4(u_color * noise, noise);
      }
    `;

    const compile = (source: string, type: number) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) { gl.deleteShader(shader); return null; }
      return shader;
    };
    const vertex = compile(vertexSource, gl.VERTEX_SHADER);
    const fragment = compile(fragmentSource, gl.FRAGMENT_SHADER);
    const program = gl.createProgram();
    if (!vertex || !fragment || !program) return;
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
    const time = gl.getUniformLocation(program, "u_time");
    const ratio = gl.getUniformLocation(program, "u_ratio");
    const pointerUniform = gl.getUniformLocation(program, "u_pointer");
    const colorUniform = gl.getUniformLocation(program, "u_color");
    const speedUniform = gl.getUniformLocation(program, "u_speed");
    gl.uniform3f(colorUniform, color[0], color[1], color[2]);
    gl.uniform1f(speedUniform, speed);

    const pointer = { x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5 };
    const onPointer = (event: PointerEvent) => { pointer.targetX = event.clientX / window.innerWidth; pointer.targetY = 1 - event.clientY / window.innerHeight; };
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 1.5);
      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform1f(ratio, canvas.width / canvas.height);
    };
    let frame = 0;
    const render = (now: number) => {
      pointer.x += (pointer.targetX - pointer.x) * 0.08;
      pointer.y += (pointer.targetY - pointer.y) * 0.08;
      gl.uniform1f(time, now);
      gl.uniform2f(pointerUniform, pointer.x, pointer.y);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      frame = requestAnimationFrame(render);
    };
    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointer, { passive: true });
    frame = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointer);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
    };
  }, [color, speed]);

  return <canvas ref={canvasRef} className="neural-noise" style={{ opacity }} aria-hidden="true" />;
}
