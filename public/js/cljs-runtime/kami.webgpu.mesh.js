goog.provide('kami.webgpu.mesh');
kami.webgpu.mesh.m4 = (function kami$webgpu$mesh$m4(){
return (new Float32Array((16)));
});
kami.webgpu.mesh.m4_mul = (function kami$webgpu$mesh$m4_mul(a,b){
var o = kami.webgpu.mesh.m4();
var n__5593__auto___20786 = (4);
var c_20787 = (0);
while(true){
if((c_20787 < n__5593__auto___20786)){
var n__5593__auto___20788__$1 = (4);
var r_20789 = (0);
while(true){
if((r_20789 < n__5593__auto___20788__$1)){
(o[((c_20787 * (4)) + r_20789)] = (((((a[r_20789]) * (b[((c_20787 * (4)) + (0))])) + ((a[(r_20789 + (4))]) * (b[((c_20787 * (4)) + (1))]))) + ((a[(r_20789 + (8))]) * (b[((c_20787 * (4)) + (2))]))) + ((a[(r_20789 + (12))]) * (b[((c_20787 * (4)) + (3))]))));

var G__20790 = (r_20789 + (1));
r_20789 = G__20790;
continue;
} else {
}
break;
}

var G__20791 = (c_20787 + (1));
c_20787 = G__20791;
continue;
} else {
}
break;
}

return o;
});
kami.webgpu.mesh.perspective = (function kami$webgpu$mesh$perspective(fovy,aspect,near,far){
var f = (1.0 / Math.tan((fovy / 2.0)));
var nf = (1.0 / (near - far));
var o = kami.webgpu.mesh.m4();
(o[(0)] = (f / aspect));

(o[(5)] = f);

(o[(10)] = (far * nf));

(o[(11)] = -1.0);

(o[(14)] = ((far * near) * nf));

return o;
});
kami.webgpu.mesh.v_sub = (function kami$webgpu$mesh$v_sub(a,b){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(cljs.core.nth.cljs$core$IFn$_invoke$arity$2(a,(0)) - cljs.core.nth.cljs$core$IFn$_invoke$arity$2(b,(0))),(cljs.core.nth.cljs$core$IFn$_invoke$arity$2(a,(1)) - cljs.core.nth.cljs$core$IFn$_invoke$arity$2(b,(1))),(cljs.core.nth.cljs$core$IFn$_invoke$arity$2(a,(2)) - cljs.core.nth.cljs$core$IFn$_invoke$arity$2(b,(2)))], null);
});
kami.webgpu.mesh.v_cross = (function kami$webgpu$mesh$v_cross(a,b){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [((cljs.core.nth.cljs$core$IFn$_invoke$arity$2(a,(1)) * cljs.core.nth.cljs$core$IFn$_invoke$arity$2(b,(2))) - (cljs.core.nth.cljs$core$IFn$_invoke$arity$2(a,(2)) * cljs.core.nth.cljs$core$IFn$_invoke$arity$2(b,(1)))),((cljs.core.nth.cljs$core$IFn$_invoke$arity$2(a,(2)) * cljs.core.nth.cljs$core$IFn$_invoke$arity$2(b,(0))) - (cljs.core.nth.cljs$core$IFn$_invoke$arity$2(a,(0)) * cljs.core.nth.cljs$core$IFn$_invoke$arity$2(b,(2)))),((cljs.core.nth.cljs$core$IFn$_invoke$arity$2(a,(0)) * cljs.core.nth.cljs$core$IFn$_invoke$arity$2(b,(1))) - (cljs.core.nth.cljs$core$IFn$_invoke$arity$2(a,(1)) * cljs.core.nth.cljs$core$IFn$_invoke$arity$2(b,(0))))], null);
});
kami.webgpu.mesh.v_norm = (function kami$webgpu$mesh$v_norm(a){
var l = Math.hypot(cljs.core.nth.cljs$core$IFn$_invoke$arity$2(a,(0)),cljs.core.nth.cljs$core$IFn$_invoke$arity$2(a,(1)),cljs.core.nth.cljs$core$IFn$_invoke$arity$2(a,(2)));
var l__$1 = (((l < 1.0E-9))?1.0:l);
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(cljs.core.nth.cljs$core$IFn$_invoke$arity$2(a,(0)) / l__$1),(cljs.core.nth.cljs$core$IFn$_invoke$arity$2(a,(1)) / l__$1),(cljs.core.nth.cljs$core$IFn$_invoke$arity$2(a,(2)) / l__$1)], null);
});
kami.webgpu.mesh.v_dot = (function kami$webgpu$mesh$v_dot(a,b){
return (((cljs.core.nth.cljs$core$IFn$_invoke$arity$2(a,(0)) * cljs.core.nth.cljs$core$IFn$_invoke$arity$2(b,(0))) + (cljs.core.nth.cljs$core$IFn$_invoke$arity$2(a,(1)) * cljs.core.nth.cljs$core$IFn$_invoke$arity$2(b,(1)))) + (cljs.core.nth.cljs$core$IFn$_invoke$arity$2(a,(2)) * cljs.core.nth.cljs$core$IFn$_invoke$arity$2(b,(2))));
});
kami.webgpu.mesh.look_at = (function kami$webgpu$mesh$look_at(eye,center,up){
var f = kami.webgpu.mesh.v_norm(kami.webgpu.mesh.v_sub(center,eye));
var s = kami.webgpu.mesh.v_norm(kami.webgpu.mesh.v_cross(f,up));
var u = kami.webgpu.mesh.v_cross(s,f);
var o = kami.webgpu.mesh.m4();
(o[(0)] = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(s,(0)));

(o[(4)] = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(s,(1)));

(o[(8)] = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(s,(2)));

(o[(1)] = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(u,(0)));

(o[(5)] = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(u,(1)));

(o[(9)] = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(u,(2)));

(o[(2)] = (- cljs.core.nth.cljs$core$IFn$_invoke$arity$2(f,(0))));

(o[(6)] = (- cljs.core.nth.cljs$core$IFn$_invoke$arity$2(f,(1))));

(o[(10)] = (- cljs.core.nth.cljs$core$IFn$_invoke$arity$2(f,(2))));

(o[(12)] = (- kami.webgpu.mesh.v_dot(s,eye)));

(o[(13)] = (- kami.webgpu.mesh.v_dot(u,eye)));

(o[(14)] = kami.webgpu.mesh.v_dot(f,eye));

(o[(15)] = 1.0);

return o;
});
/**
 * eye/target [x y z], aspect ratio -> a column-major mat4 Float32Array (wgpu convention).
 */
kami.webgpu.mesh.view_projection = (function kami$webgpu$mesh$view_projection(eye,target,aspect){
return kami.webgpu.mesh.m4_mul(kami.webgpu.mesh.perspective((Math.PI / 3.0),aspect,0.05,100.0),kami.webgpu.mesh.look_at(eye,target,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(1),(0)], null)));
});
kami.webgpu.mesh.translation_matrix = (function kami$webgpu$mesh$translation_matrix(p__20708){
var vec__20709 = p__20708;
var x = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20709,(0),null);
var y = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20709,(1),null);
var z = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20709,(2),null);
var o = kami.webgpu.mesh.m4();
(o[(0)] = (1));

(o[(5)] = (1));

(o[(10)] = (1));

(o[(15)] = (1));

(o[(12)] = x);

(o[(13)] = y);

(o[(14)] = z);

return o;
});
kami.webgpu.mesh.scale_matrix = (function kami$webgpu$mesh$scale_matrix(p__20713){
var vec__20714 = p__20713;
var x = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20714,(0),null);
var y = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20714,(1),null);
var z = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20714,(2),null);
var o = kami.webgpu.mesh.m4();
(o[(0)] = x);

(o[(5)] = y);

(o[(10)] = z);

(o[(15)] = (1));

return o;
});
kami.webgpu.mesh.rotation_x_matrix = (function kami$webgpu$mesh$rotation_x_matrix(angle){
var o = kami.webgpu.mesh.m4();
var c = Math.cos(angle);
var s = Math.sin(angle);
(o[(0)] = (1));

(o[(5)] = c);

(o[(6)] = s);

(o[(9)] = (- s));

(o[(10)] = c);

(o[(15)] = (1));

return o;
});
kami.webgpu.mesh.rotation_y_matrix = (function kami$webgpu$mesh$rotation_y_matrix(angle){
var o = kami.webgpu.mesh.m4();
var c = Math.cos(angle);
var s = Math.sin(angle);
(o[(0)] = c);

(o[(2)] = (- s));

(o[(5)] = (1));

(o[(8)] = s);

(o[(10)] = c);

(o[(15)] = (1));

return o;
});
kami.webgpu.mesh.rotation_z_matrix = (function kami$webgpu$mesh$rotation_z_matrix(angle){
var o = kami.webgpu.mesh.m4();
var c = Math.cos(angle);
var s = Math.sin(angle);
(o[(0)] = c);

(o[(1)] = s);

(o[(4)] = (- s));

(o[(5)] = c);

(o[(10)] = (1));

(o[(15)] = (1));

return o;
});
/**
 * Column-major TRS model matrix. Rotation is XYZ Euler radians and scale
 *   defaults to identity. Shared here so applications never own GPU matrices.
 */
kami.webgpu.mesh.model_matrix = (function kami$webgpu$mesh$model_matrix(p__20725){
var map__20726 = p__20725;
var map__20726__$1 = cljs.core.__destructure_map(map__20726);
var translation = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__20726__$1,new cljs.core.Keyword(null,"translation","translation",-701621547),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(0),(0)], null));
var rotation = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__20726__$1,new cljs.core.Keyword(null,"rotation","rotation",-1728051644),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(0),(0)], null));
var scale = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__20726__$1,new cljs.core.Keyword(null,"scale","scale",-230427353),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(1),(1),(1)], null));
var vec__20727 = rotation;
var rx = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20727,(0),null);
var ry = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20727,(1),null);
var rz = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20727,(2),null);
return kami.webgpu.mesh.m4_mul(kami.webgpu.mesh.translation_matrix(translation),kami.webgpu.mesh.m4_mul(kami.webgpu.mesh.rotation_z_matrix(rz),kami.webgpu.mesh.m4_mul(kami.webgpu.mesh.rotation_y_matrix(ry),kami.webgpu.mesh.m4_mul(kami.webgpu.mesh.rotation_x_matrix(rx),kami.webgpu.mesh.scale_matrix(scale)))));
});
kami.webgpu.mesh.SHADER = "struct Uniforms {\n  mvp: mat4x4<f32>,\n  color: vec4<f32>,\n  color_b: vec4<f32>,\n  vertex_count: u32,\n  morph_count: u32,\n  joint_count: u32,\n  pattern_kind: u32,\n  pattern_params: vec4<f32>,\n  shade_kind: u32,\n  toon_threshold: f32,\n  toon_smooth: f32,\n  _pad2: u32,\n};\n\n@group(0) @binding(0) var<uniform> u: Uniforms;\n@group(0) @binding(1) var<storage, read> morph_deltas: array<vec4<f32>>;\n@group(0) @binding(2) var<storage, read> morph_weights: array<f32>;\n@group(0) @binding(3) var<storage, read> joint_matrices: array<mat4x4<f32>>;\n@group(0) @binding(4) var tex: texture_2d<f32>;\n@group(0) @binding(5) var samp: sampler;\n\nstruct VertexOut {\n  @builtin(position) clip: vec4<f32>,\n  @location(0) n: vec3<f32>,\n  @location(1) local_pos: vec3<f32>,\n  @location(2) uv: vec2<f32>,\n};\n\n@vertex\nfn vs(\n  @location(0) position: vec3<f32>,\n  @location(1) normal: vec3<f32>,\n  @location(2) uv_in: vec2<f32>,\n  @location(3) joints: vec4<u32>,\n  @location(4) weights: vec4<f32>,\n  @builtin(vertex_index) vidx: u32\n) -> VertexOut {\n  var pos = position;\n  for (var t: u32 = 0u; t < u.morph_count; t = t + 1u) {\n    let w = morph_weights[t];\n    if (w != 0.0) {\n      let d = morph_deltas[t * u.vertex_count + vidx];\n      pos = pos + d.xyz * w;\n    }\n  }\n  var world = vec4<f32>(pos, 1.0);\n  if (u.joint_count > 0u) {\n    let base = vec4<f32>(pos, 1.0);\n    var acc = vec4<f32>(0.0, 0.0, 0.0, 0.0);\n    for (var j: u32 = 0u; j < 4u; j = j + 1u) {\n      let jm = joint_matrices[joints[j]];\n      acc = acc + (jm * base) * weights[j];\n    }\n    world = acc;\n  }\n  var out: VertexOut;\n  out.clip = u.mvp * world;\n  out.n = normal;\n  out.local_pos = position;\n  out.uv = uv_in;\n  return out;\n}\n\n// pattern_kind: 0 = flat (color only, color_b unused \u2014 the pre-existing\n// behaviour, byte-identical). 1 = linear gradient (color->color_b along\n// pattern_params.xyz, a local-space axis; .w is the half-range that maps to\n// t=0..1). 2 = radial gradient (color at pattern_params.xyz, a local-space\n// center point, fading to color_b at pattern_params.w, the radius \u2014 the\n// scar/tattoo edge-fade case). 3 = stripes (hard color/color_b bands along\n// pattern_params.xyz at frequency pattern_params.w).\nfn pattern_t(local_pos: vec3<f32>) -> f32 {\n  if (u.pattern_kind == 1u) {\n    let axis = normalize(u.pattern_params.xyz);\n    let range = max(u.pattern_params.w, 1e-4);\n    return clamp(dot(local_pos, axis) / range * 0.5 + 0.5, 0.0, 1.0);\n  } else if (u.pattern_kind == 2u) {\n    let center = u.pattern_params.xyz;\n    let radius = max(u.pattern_params.w, 1e-4);\n    return clamp(length(local_pos - center) / radius, 0.0, 1.0);\n  } else if (u.pattern_kind == 3u) {\n    let axis = normalize(u.pattern_params.xyz);\n    let freq = u.pattern_params.w;\n    return step(0.0, sin(dot(local_pos, axis) * freq));\n  }\n  return 0.0;\n}\n\n// shade_kind: 0 = continuous N.L lighting (pre-existing, byte-identical).\n// 1 = 2-tone toon step \u2014 a smoothstep transition band (width toon_smooth)\n// centred on toon_threshold, between a fixed dim factor and full lit. Not\n// full MToon (no shade COLOR, no rim/matcap/outline) \u2014 a brightness step\n// only, sufficient to prove the texture path and show a visibly harder\n// light/shadow boundary than the continuous mode.\nfn toon_lit(ndl: f32) -> f32 {\n  if (u.shade_kind == 1u) {\n    let smooth_w = max(u.toon_smooth, 1e-4);\n    let edge = smoothstep(u.toon_threshold - smooth_w, u.toon_threshold + smooth_w, ndl);\n    return mix(0.35, 1.0, edge);\n  }\n  let ambient = 0.35;\n  return ambient + ndl * (1.0 - ambient);\n}\n\n@fragment\nfn fs(in: VertexOut) -> @location(0) vec4<f32> {\n  let light_dir = normalize(vec3<f32>(0.4, 0.8, 0.5));\n  let ndl = max(dot(normalize(in.n), light_dir), 0.0);\n  let lit = toon_lit(ndl);\n  let t = pattern_t(in.local_pos);\n  let base_color = mix(u.color.rgb, u.color_b.rgb, t);\n  let tex_sample = textureSample(tex, samp, in.uv);\n  return vec4<f32>(base_color * tex_sample.rgb * lit, 1.0);\n}\n";
kami.webgpu.mesh.VERTEX_STRIDE = (64);
/**
 * 1x1 opaque-white texture — the shared fallback every untextured `draw!`
 *   call binds, so the shader's unconditional `textureSample` is a no-op
 *   (`base_color * (1,1,1) = base_color`), achieving backward compatibility
 *   without a `has_texture` branch in WGSL.
 */
kami.webgpu.mesh.default_texture_BANG_ = (function kami$webgpu$mesh$default_texture_BANG_(device){
var tex = w3.webgpu.create_texture_BANG_(device,({"size": ({"width": (1), "height": (1)}), "format": "rgba8unorm", "usage": (w3.webgpu.texture_usage(new cljs.core.Keyword(null,"texture-binding","texture-binding",1681043853)) | w3.webgpu.texture_usage(new cljs.core.Keyword(null,"copy-dst","copy-dst",-559984104)))}));
w3.webgpu.write_texture_BANG_(w3.webgpu.device_queue(device),({"texture": tex}),(new Uint8Array([(255),(255),(255),(255)])),({"bytesPerRow": (4)}),({"width": (1), "height": (1)}));

return tex;
});
/**
 * Build the skin/morph mesh pipeline once (canvas already configured for
 *   WebGPU by the caller — reuses the same `device`/`ctx`/`fmt` a `kami.webgpu/
 *   init!` context already produced, so both executors can draw into the same
 *   canvas/frame if desired). Returns the pipeline context (now also carrying
 *   `:default-texture`/`:default-sampler`, the backward-compat fallback every
 *   `draw!` call without its own real texture binds).
 */
kami.webgpu.mesh.init_BANG_ = (function kami$webgpu$mesh$init_BANG_(device,fmt){
var mod = w3.webgpu.create_shader_module_BANG_(device,({"code": kami.webgpu.mesh.SHADER}));
var pipe = w3.webgpu.create_render_pipeline_BANG_(device,({"layout": "auto", "vertex": ({"module": mod, "entryPoint": "vs", "buffers": [({"arrayStride": kami.webgpu.mesh.VERTEX_STRIDE, "attributes": [({"format": "float32x3", "offset": (0), "shaderLocation": (0)}),({"format": "float32x3", "offset": (12), "shaderLocation": (1)}),({"format": "float32x2", "offset": (24), "shaderLocation": (2)}),({"format": "uint32x4", "offset": (32), "shaderLocation": (3)}),({"format": "float32x4", "offset": (48), "shaderLocation": (4)})]})]}), "fragment": ({"module": mod, "entryPoint": "fs", "targets": [({"format": fmt})]}), "primitive": ({"cullMode": "none"}), "depthStencil": ({"format": "depth24plus", "depthWriteEnabled": true, "depthCompare": "less"})}));
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"device","device",1817743352),device,new cljs.core.Keyword(null,"pipe","pipe",336575849),pipe,new cljs.core.Keyword(null,"default-texture","default-texture",1829125666),kami.webgpu.mesh.default_texture_BANG_(device),new cljs.core.Keyword(null,"default-sampler","default-sampler",1041755191),w3.webgpu.create_sampler_BANG_(device,({"magFilter": "linear", "minFilter": "linear"}))], null);
});
/**
 * Decode `{:bytes :mime-type}` (`vrm.convert/read-base-color-texture`'s
 *   output shape) into a real `GPUTexture`. Async (image decode via
 *   `createImageBitmap`) — returns a `Promise` resolving to the texture;
 *   callers `.then` before passing it to `draw!`'s `:texture`.
 */
kami.webgpu.mesh.upload_texture_BANG_ = (function kami$webgpu$mesh$upload_texture_BANG_(p__20730,p__20731){
var map__20732 = p__20730;
var map__20732__$1 = cljs.core.__destructure_map(map__20732);
var device = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20732__$1,new cljs.core.Keyword(null,"device","device",1817743352));
var map__20733 = p__20731;
var map__20733__$1 = cljs.core.__destructure_map(map__20733);
var bytes = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20733__$1,new cljs.core.Keyword(null,"bytes","bytes",1175866680));
var mime_type = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20733__$1,new cljs.core.Keyword(null,"mime-type","mime-type",1058646439));
return createImageBitmap((new Blob([(new Uint8Array(cljs.core.clj__GT_js(cljs.core.vec(bytes))))],({"type": mime_type})))).then((function (bitmap){
var w = bitmap.width;
var h = bitmap.height;
var tex = w3.webgpu.create_texture_BANG_(device,({"size": ({"width": w, "height": h}), "format": "rgba8unorm", "usage": ((w3.webgpu.texture_usage(new cljs.core.Keyword(null,"texture-binding","texture-binding",1681043853)) | w3.webgpu.texture_usage(new cljs.core.Keyword(null,"copy-dst","copy-dst",-559984104))) | w3.webgpu.texture_usage(new cljs.core.Keyword(null,"render-attachment","render-attachment",-2022242035)))}));
w3.webgpu.copy_external_image_to_texture_BANG_(w3.webgpu.device_queue(device),({"source": bitmap}),({"texture": tex}),({"width": w, "height": h}));

return tex;
}));
});
kami.webgpu.mesh.f32 = (function kami$webgpu$mesh$f32(xs){
return (new Float32Array(cljs.core.clj__GT_js(cljs.core.vec(xs))));
});
/**
 * `{:positions :normals :indices :uvs :morph-target-deltas :joints :weights}`
 *   (all optional except `:positions`/`:normals`/`:indices`; `:uvs` is a
 *   per-vertex `[u v]`, defaults to `[0 0]` when omitted — irrelevant either
 *   way against the default white texture; `:joints`/`:weights` are per-vertex
 *   `[j0 j1 j2 j3]`/`[w0 w1 w2 w3]`, omit both for an unskinned mesh;
 *   `:morph-target-deltas` is `[[[dx dy dz] ...] ...]`, one seq of per-vertex
 *   deltas per target, omit for no morphs) -> GPU buffer handles + counts.
 *   Storage buffers are always allocated (min size, if the mesh has none) since
 *   WebGPU rejects zero-byte buffers.
 */
kami.webgpu.mesh.upload_mesh_BANG_ = (function kami$webgpu$mesh$upload_mesh_BANG_(p__20755,p__20756){
var map__20757 = p__20755;
var map__20757__$1 = cljs.core.__destructure_map(map__20757);
var context = map__20757__$1;
var device = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20757__$1,new cljs.core.Keyword(null,"device","device",1817743352));
var map__20758 = p__20756;
var map__20758__$1 = cljs.core.__destructure_map(map__20758);
var geometry = map__20758__$1;
var positions = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20758__$1,new cljs.core.Keyword(null,"positions","positions",-1380538434));
var normals = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20758__$1,new cljs.core.Keyword(null,"normals","normals",-1508109067));
var indices = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20758__$1,new cljs.core.Keyword(null,"indices","indices",-1218138343));
var uvs = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20758__$1,new cljs.core.Keyword(null,"uvs","uvs",1776835110));
var morph_target_deltas = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20758__$1,new cljs.core.Keyword(null,"morph-target-deltas","morph-target-deltas",-1534652085));
var joints = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20758__$1,new cljs.core.Keyword(null,"joints","joints",-1993525003));
var weights = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20758__$1,new cljs.core.Keyword(null,"weights","weights",-1097626197));
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"webgl2","webgl2",111927467),new cljs.core.Keyword(null,"backend","backend",-847489124).cljs$core$IFn$_invoke$arity$1(context))){
return kami.webgl.upload_mesh_BANG_(context,geometry);
} else {
var vcount = cljs.core.count(positions);
var has_skin_QMARK_ = ((cljs.core.seq(joints)) && (cljs.core.seq(weights)));
var has_uv_QMARK_ = cljs.core.seq(uvs);
var interleaved = (new Float32Array((vcount * (kami.webgpu.mesh.VERTEX_STRIDE / (4)))));
var joints_view = (new Uint32Array(interleaved.buffer));
var n__5593__auto___20800 = vcount;
var i_20801 = (0);
while(true){
if((i_20801 < n__5593__auto___20800)){
var base_20802 = (i_20801 * (16));
var p_20803 = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(positions,i_20801);
var n_20804 = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(normals,i_20801);
var uv_20805 = ((has_uv_QMARK_)?cljs.core.nth.cljs$core$IFn$_invoke$arity$2(uvs,i_20801):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [0.0,0.0], null));
var j_20806 = ((has_skin_QMARK_)?cljs.core.nth.cljs$core$IFn$_invoke$arity$2(joints,i_20801):new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(0),(0),(0)], null));
var w_20807 = ((has_skin_QMARK_)?cljs.core.nth.cljs$core$IFn$_invoke$arity$2(weights,i_20801):new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [1.0,0.0,0.0,0.0], null));
interleaved.set(kami.webgpu.mesh.f32(p_20803),base_20802);

interleaved.set(kami.webgpu.mesh.f32(n_20804),(base_20802 + (3)));

interleaved.set(kami.webgpu.mesh.f32(uv_20805),(base_20802 + (6)));

joints_view.set((new Uint32Array(cljs.core.clj__GT_js(cljs.core.vec(j_20806)))),(base_20802 + (8)));

interleaved.set(kami.webgpu.mesh.f32(w_20807),(base_20802 + (12)));

var G__20811 = (i_20801 + (1));
i_20801 = G__20811;
continue;
} else {
}
break;
}

var mkbuf = (function (data,usage){
var b = w3.webgpu.create_buffer_BANG_(device,({"size": data.byteLength, "usage": (usage | w3.webgpu.buffer_usage(new cljs.core.Keyword(null,"copy-dst","copy-dst",-559984104)))}));
w3.webgpu.write_buffer_BANG_.cljs$core$IFn$_invoke$arity$3(w3.webgpu.device_queue(device),b,data);

return b;
});
var vbuf = mkbuf(interleaved,w3.webgpu.buffer_usage(new cljs.core.Keyword(null,"vertex","vertex",1562146351)));
var ibuf = mkbuf((new Uint32Array(cljs.core.clj__GT_js(cljs.core.vec(indices)))),w3.webgpu.buffer_usage(new cljs.core.Keyword(null,"index","index",-1531685915)));
var morph_count = cljs.core.count(morph_target_deltas);
var morph_flat = (((morph_count > (0)))?kami.webgpu.mesh.f32(cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic((function (target){
return cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic((function (d){
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(cljs.core.vec(d),0.0);
}),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([target], 0));
}),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([morph_target_deltas], 0))):(new Float32Array((4))));
var morph_deltas_buf = mkbuf(morph_flat,w3.webgpu.buffer_usage(new cljs.core.Keyword(null,"storage","storage",1867247511)));
var morph_weights_buf = w3.webgpu.create_buffer_BANG_(device,({"size": (function (){var x__5087__auto__ = (4);
var y__5088__auto__ = ((4) * (function (){var x__5087__auto____$1 = (1);
var y__5088__auto__ = morph_count;
return ((x__5087__auto____$1 > y__5088__auto__) ? x__5087__auto____$1 : y__5088__auto__);
})());
return ((x__5087__auto__ > y__5088__auto__) ? x__5087__auto__ : y__5088__auto__);
})(), "usage": (w3.webgpu.buffer_usage(new cljs.core.Keyword(null,"storage","storage",1867247511)) | w3.webgpu.buffer_usage(new cljs.core.Keyword(null,"copy-dst","copy-dst",-559984104)))}));
var joint_count = ((has_skin_QMARK_)?(cljs.core.apply.cljs$core$IFn$_invoke$arity$3(cljs.core.max,(0),cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic(cljs.core.identity,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([joints], 0))) + (1)):(0));
var joint_matrices_buf = w3.webgpu.create_buffer_BANG_(device,({"size": (function (){var x__5087__auto__ = (64);
var y__5088__auto__ = ((64) * (function (){var x__5087__auto____$1 = (1);
var y__5088__auto__ = joint_count;
return ((x__5087__auto____$1 > y__5088__auto__) ? x__5087__auto____$1 : y__5088__auto__);
})());
return ((x__5087__auto__ > y__5088__auto__) ? x__5087__auto__ : y__5088__auto__);
})(), "usage": (w3.webgpu.buffer_usage(new cljs.core.Keyword(null,"storage","storage",1867247511)) | w3.webgpu.buffer_usage(new cljs.core.Keyword(null,"copy-dst","copy-dst",-559984104)))}));
var gbuf = w3.webgpu.create_buffer_BANG_(device,({"size": (144), "usage": (w3.webgpu.buffer_usage(new cljs.core.Keyword(null,"uniform","uniform",496503348)) | w3.webgpu.buffer_usage(new cljs.core.Keyword(null,"copy-dst","copy-dst",-559984104)))}));
return cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"morph-deltas-buf","morph-deltas-buf",-129639776),new cljs.core.Keyword(null,"ibuf","ibuf",801056512),new cljs.core.Keyword(null,"joint-matrices-buf","joint-matrices-buf",-625207643),new cljs.core.Keyword(null,"vertex-count","vertex-count",1997450535),new cljs.core.Keyword(null,"morph-weights-buf","morph-weights-buf",-451235347),new cljs.core.Keyword(null,"gbuf","gbuf",897732527),new cljs.core.Keyword(null,"morph-count","morph-count",-176849136),new cljs.core.Keyword(null,"joint-count","joint-count",663399985),new cljs.core.Keyword(null,"idx-count","idx-count",-1289353607),new cljs.core.Keyword(null,"vbuf","vbuf",303950747)],[morph_deltas_buf,ibuf,joint_matrices_buf,vcount,morph_weights_buf,gbuf,morph_count,joint_count,cljs.core.count(indices),vbuf]);
}
});
/**
 * Draw one mesh into `pass` (an already-begun GPURenderPassEncoder, so the
 *   caller controls the color/depth attachments and clear — this fn only sets
 *   pipeline/bind-group/buffers and issues the indexed draw). `mvp`: Float32Array
 *   (16, column-major). `color`: `[r g b]`. `morph-weights`: seq of f32, length
 *   `:morph-count` (ignored if 0). `joint-matrices`: seq of 16-float column-major
 *   mat4s, length `:joint-count` (ignored if 0).
 * 
 *   Optional trailing `opts` map:
 *   - `:color-b`/`:kind` (0|1|2|3)/`:params` `[x y z w]` — procedural fragment
 *  pattern (see the shader's own `pattern_t` doc comment). `:kind` defaults
 *  `0` (flat `color`, `color_b`/`params` unused) — the pre-pattern-work
 *  behaviour.
 *   - `:texture` — a real `GPUTexture` (from `upload-texture!`, already
 *  resolved via its Promise) to sample instead of `ctx`'s shared
 *  `:default-texture` (1x1 white — a no-op multiply, so omitting `:texture`
 *  draws exactly as before texture support existed).
 *   - `:shade-kind` (0|1)/`:toon-threshold`/`:toon-smooth` — 2-tone toon
 *  shading (see the shader's `toon_lit` doc comment). `:shade-kind`
 *  defaults `0` (the original continuous N.L lighting).
 *   Omitting `opts` entirely (every pre-`/loop`-maturity-pass call site) draws
 *   byte-identically to before any of this.
 */
kami.webgpu.mesh.draw_BANG_ = (function kami$webgpu$mesh$draw_BANG_(var_args){
var G__20765 = arguments.length;
switch (G__20765) {
case 7:
return kami.webgpu.mesh.draw_BANG_.cljs$core$IFn$_invoke$arity$7((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]),(arguments[(5)]),(arguments[(6)]));

break;
case 8:
return kami.webgpu.mesh.draw_BANG_.cljs$core$IFn$_invoke$arity$8((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]),(arguments[(5)]),(arguments[(6)]),(arguments[(7)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(kami.webgpu.mesh.draw_BANG_.cljs$core$IFn$_invoke$arity$7 = (function (ctx,pass,buffers,mvp,color,morph_weights,joint_matrices){
return kami.webgpu.mesh.draw_BANG_.cljs$core$IFn$_invoke$arity$8(ctx,pass,buffers,mvp,color,morph_weights,joint_matrices,null);
}));

(kami.webgpu.mesh.draw_BANG_.cljs$core$IFn$_invoke$arity$8 = (function (p__20774,pass,p__20775,mvp,color,morph_weights,joint_matrices,p__20776){
var map__20777 = p__20774;
var map__20777__$1 = cljs.core.__destructure_map(map__20777);
var device = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20777__$1,new cljs.core.Keyword(null,"device","device",1817743352));
var pipe = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20777__$1,new cljs.core.Keyword(null,"pipe","pipe",336575849));
var default_texture = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20777__$1,new cljs.core.Keyword(null,"default-texture","default-texture",1829125666));
var default_sampler = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20777__$1,new cljs.core.Keyword(null,"default-sampler","default-sampler",1041755191));
var map__20778 = p__20775;
var map__20778__$1 = cljs.core.__destructure_map(map__20778);
var idx_count = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20778__$1,new cljs.core.Keyword(null,"idx-count","idx-count",-1289353607));
var vbuf = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20778__$1,new cljs.core.Keyword(null,"vbuf","vbuf",303950747));
var morph_deltas_buf = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20778__$1,new cljs.core.Keyword(null,"morph-deltas-buf","morph-deltas-buf",-129639776));
var ibuf = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20778__$1,new cljs.core.Keyword(null,"ibuf","ibuf",801056512));
var joint_matrices_buf = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20778__$1,new cljs.core.Keyword(null,"joint-matrices-buf","joint-matrices-buf",-625207643));
var vertex_count = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20778__$1,new cljs.core.Keyword(null,"vertex-count","vertex-count",1997450535));
var morph_weights_buf = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20778__$1,new cljs.core.Keyword(null,"morph-weights-buf","morph-weights-buf",-451235347));
var gbuf = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20778__$1,new cljs.core.Keyword(null,"gbuf","gbuf",897732527));
var morph_count = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20778__$1,new cljs.core.Keyword(null,"morph-count","morph-count",-176849136));
var joint_count = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20778__$1,new cljs.core.Keyword(null,"joint-count","joint-count",663399985));
var map__20779 = p__20776;
var map__20779__$1 = cljs.core.__destructure_map(map__20779);
var color_b = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__20779__$1,new cljs.core.Keyword(null,"color-b","color-b",-988878341),color);
var kind = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__20779__$1,new cljs.core.Keyword(null,"kind","kind",-717265803),(0));
var params = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__20779__$1,new cljs.core.Keyword(null,"params","params",710516235),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [0.0,0.0,0.0,0.0], null));
var texture = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20779__$1,new cljs.core.Keyword(null,"texture","texture",-266291651));
var sampler = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20779__$1,new cljs.core.Keyword(null,"sampler","sampler",2068889864));
var shade_kind = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__20779__$1,new cljs.core.Keyword(null,"shade-kind","shade-kind",-1825128023),(0));
var toon_threshold = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__20779__$1,new cljs.core.Keyword(null,"toon-threshold","toon-threshold",-2084408130),0.4);
var toon_smooth = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__20779__$1,new cljs.core.Keyword(null,"toon-smooth","toon-smooth",-1986013699),0.08);
var q = w3.webgpu.device_queue(device);
var gdata = (new Float32Array((36)));
gdata.set(mvp,(0));

gdata.set(kami.webgpu.mesh.f32(cljs.core.conj.cljs$core$IFn$_invoke$arity$2(cljs.core.vec(color),1.0)),(16));

gdata.set(kami.webgpu.mesh.f32(cljs.core.conj.cljs$core$IFn$_invoke$arity$2(cljs.core.vec(color_b),1.0)),(20));

var gview_20815 = (new Uint32Array(gdata.buffer));
(gview_20815[(24)] = vertex_count);

(gview_20815[(25)] = morph_count);

(gview_20815[(26)] = joint_count);

(gview_20815[(27)] = kind);

(gview_20815[(32)] = shade_kind);

gdata.set(kami.webgpu.mesh.f32(params),(28));

(gdata[(33)] = toon_threshold);

(gdata[(34)] = toon_smooth);

w3.webgpu.write_buffer_BANG_.cljs$core$IFn$_invoke$arity$3(q,gbuf,gdata);

if((morph_count > (0))){
w3.webgpu.write_buffer_BANG_.cljs$core$IFn$_invoke$arity$3(q,morph_weights_buf,kami.webgpu.mesh.f32(cljs.core.take.cljs$core$IFn$_invoke$arity$2(morph_count,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(morph_weights,cljs.core.repeat.cljs$core$IFn$_invoke$arity$1(0.0)))));
} else {
}

if((joint_count > (0))){
w3.webgpu.write_buffer_BANG_.cljs$core$IFn$_invoke$arity$3(q,joint_matrices_buf,(new Float32Array(cljs.core.clj__GT_js(cljs.core.vec(cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic(cljs.core.vec,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.take.cljs$core$IFn$_invoke$arity$2(joint_count,joint_matrices)], 0)))))));
} else {
}

var texture_view_source = (function (){var or__5002__auto__ = texture;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return default_texture;
}
})();
var bind = w3.webgpu.create_bind_group_BANG_(device,({"layout": w3.webgpu.get_bind_group_layout(pipe,(0)), "entries": [({"binding": (0), "resource": ({"buffer": gbuf})}),({"binding": (1), "resource": ({"buffer": morph_deltas_buf})}),({"binding": (2), "resource": ({"buffer": morph_weights_buf})}),({"binding": (3), "resource": ({"buffer": joint_matrices_buf})}),({"binding": (4), "resource": w3.webgpu.create_view.cljs$core$IFn$_invoke$arity$1(texture_view_source)}),({"binding": (5), "resource": (function (){var or__5002__auto__ = sampler;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return default_sampler;
}
})()})]}));
w3.webgpu.set_pipeline_BANG_(pass,pipe);

w3.webgpu.set_bind_group_BANG_(pass,(0),bind);

w3.webgpu.set_vertex_buffer_BANG_.cljs$core$IFn$_invoke$arity$3(pass,(0),vbuf);

w3.webgpu.set_index_buffer_BANG_(pass,ibuf,"uint32");

return w3.webgpu.draw_indexed_BANG_.cljs$core$IFn$_invoke$arity$2(pass,idx_count);
}));

(kami.webgpu.mesh.draw_BANG_.cljs$lang$maxFixedArity = 8);

/**
 * Initialize the canonical WebGPU mesh viewport. The app supplies only an
 *   HTML canvas; adapter/device/context/raw API ownership stays inside
 *   webgpu -> org-w3-webgpu. WebGL2 is selected only when WebGPU is absent or
 *   adapter/device initialization fails. Returns Promise<context>.
 */
kami.webgpu.mesh.init_canvas_BANG_ = (function kami$webgpu$mesh$init_canvas_BANG_(canvas){
var fallback = (function (){
var temp__5823__auto__ = kami.webgl.init_mesh_viewport_BANG_(canvas);
if(cljs.core.truth_(temp__5823__auto__)){
var viewport = temp__5823__auto__;
return Promise.resolve(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(viewport,new cljs.core.Keyword(null,"mesh-context","mesh-context",832369712),viewport));
} else {
return Promise.reject((new Error("Neither WebGPU nor WebGL2 is available")));
}
});
if((!(w3.webgpu.supported_QMARK_()))){
return fallback();
} else {
return w3.webgpu.request_adapter_BANG_.cljs$core$IFn$_invoke$arity$0().then((function (adapter){
if(cljs.core.truth_(adapter)){
return w3.webgpu.request_device_BANG_.cljs$core$IFn$_invoke$arity$1(adapter);
} else {
return Promise.reject((new Error("No WebGPU adapter available")));
}
})).then((function (device){
var w = (function (){var x__5087__auto__ = (1);
var y__5088__auto__ = canvas.clientWidth;
return ((x__5087__auto__ > y__5088__auto__) ? x__5087__auto__ : y__5088__auto__);
})();
var h = (function (){var x__5087__auto__ = (1);
var y__5088__auto__ = canvas.clientHeight;
return ((x__5087__auto__ > y__5088__auto__) ? x__5087__auto__ : y__5088__auto__);
})();
var _ = (canvas.width = w);
var ___$1 = (canvas.height = h);
var ctx = w3.webgpu.get_context(canvas);
var fmt = w3.webgpu.preferred_canvas_format();
var depth = w3.webgpu.create_texture_BANG_(device,({"size": [w,h], "format": "depth24plus", "usage": w3.webgpu.texture_usage(new cljs.core.Keyword(null,"render-attachment","render-attachment",-2022242035))}));
w3.webgpu.configure_context_BANG_(ctx,({"device": device, "format": fmt, "alphaMode": "opaque"}));

return new cljs.core.PersistentArrayMap(null, 8, [new cljs.core.Keyword(null,"backend","backend",-847489124),new cljs.core.Keyword(null,"webgpu","webgpu",-1928709720),new cljs.core.Keyword(null,"device","device",1817743352),device,new cljs.core.Keyword(null,"queue","queue",1455835879),w3.webgpu.device_queue(device),new cljs.core.Keyword(null,"ctx","ctx",-493610118),ctx,new cljs.core.Keyword(null,"depth","depth",1768663640),depth,new cljs.core.Keyword(null,"mesh-context","mesh-context",832369712),kami.webgpu.mesh.init_BANG_(device,fmt),new cljs.core.Keyword(null,"width","width",-384071477),w,new cljs.core.Keyword(null,"height","height",1025178622),h], null);
})).catch((function (_){
return fallback();
}));
}
});
/**
 * Render one arbitrary mesh frame through the canonical W3C binding.
 *   `viewport` is from `init-canvas!`; `buffers` is from `upload-mesh!`.
 */
kami.webgpu.mesh.render_frame_BANG_ = (function kami$webgpu$mesh$render_frame_BANG_(var_args){
var G__20782 = arguments.length;
switch (G__20782) {
case 5:
return kami.webgpu.mesh.render_frame_BANG_.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
case 6:
return kami.webgpu.mesh.render_frame_BANG_.cljs$core$IFn$_invoke$arity$6((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]),(arguments[(5)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(kami.webgpu.mesh.render_frame_BANG_.cljs$core$IFn$_invoke$arity$5 = (function (viewport,buffers,eye,target,color){
return kami.webgpu.mesh.render_frame_BANG_.cljs$core$IFn$_invoke$arity$6(viewport,buffers,eye,target,color,null);
}));

(kami.webgpu.mesh.render_frame_BANG_.cljs$core$IFn$_invoke$arity$6 = (function (viewport,buffers,eye,target,color,transform){
var map__20783 = viewport;
var map__20783__$1 = cljs.core.__destructure_map(map__20783);
var device = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20783__$1,new cljs.core.Keyword(null,"device","device",1817743352));
var queue = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20783__$1,new cljs.core.Keyword(null,"queue","queue",1455835879));
var ctx = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20783__$1,new cljs.core.Keyword(null,"ctx","ctx",-493610118));
var depth = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20783__$1,new cljs.core.Keyword(null,"depth","depth",1768663640));
var mesh_context = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20783__$1,new cljs.core.Keyword(null,"mesh-context","mesh-context",832369712));
var width = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20783__$1,new cljs.core.Keyword(null,"width","width",-384071477));
var height = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20783__$1,new cljs.core.Keyword(null,"height","height",1025178622));
var vp = kami.webgpu.mesh.m4_mul(kami.webgpu.mesh.view_projection(eye,target,(width / height)),kami.webgpu.mesh.model_matrix((function (){var or__5002__auto__ = transform;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})()));
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"webgl2","webgl2",111927467),new cljs.core.Keyword(null,"backend","backend",-847489124).cljs$core$IFn$_invoke$arity$1(viewport))){
return kami.webgl.render_mesh_frame_BANG_(viewport,buffers,vp,color);
} else {
var encoder = w3.webgpu.create_command_encoder_BANG_.cljs$core$IFn$_invoke$arity$1(device);
var pass = w3.webgpu.begin_render_pass_BANG_(encoder,({"colorAttachments": [({"view": w3.webgpu.create_view.cljs$core$IFn$_invoke$arity$1(w3.webgpu.current_texture(ctx)), "loadOp": "clear", "storeOp": "store", "clearValue": ({"r": 0.035, "g": 0.055, "b": 0.1, "a": (1)})})], "depthStencilAttachment": ({"view": w3.webgpu.create_view.cljs$core$IFn$_invoke$arity$1(depth), "depthLoadOp": "clear", "depthStoreOp": "store", "depthClearValue": (1)})}));
kami.webgpu.mesh.draw_BANG_.cljs$core$IFn$_invoke$arity$7(mesh_context,pass,buffers,vp,color,cljs.core.PersistentVector.EMPTY,cljs.core.PersistentVector.EMPTY);

w3.webgpu.end_pass_BANG_(pass);

return w3.webgpu.submit_BANG_(queue,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [w3.webgpu.finish_BANG_.cljs$core$IFn$_invoke$arity$1(encoder)], null));
}
}));

(kami.webgpu.mesh.render_frame_BANG_.cljs$lang$maxFixedArity = 6);


//# sourceMappingURL=kami.webgpu.mesh.js.map
