goog.provide('kami.webgl');
kami.webgl.webgpu_available_QMARK_ = (function kami$webgl$webgpu_available_QMARK_(){
return cljs.core.boolean$((function (){var and__5000__auto__ = navigator;
if(cljs.core.truth_(and__5000__auto__)){
return navigator.gpu;
} else {
return and__5000__auto__;
}
})());
});

/**
 * A WebGL2 rendering context for the canvas (premultiplied alpha, antialias), or nil.
 */
kami.webgl.webgl2_context = (function kami$webgl$webgl2_context(canvas){
return canvas.getContext("webgl2",({"antialias": true, "premultipliedAlpha": true}));
});

/**
 * The best available GPU backend for this browser: :webgpu if WebGPU is present, else :webgl2.
 * Both consume the same render-IR; the caller routes to kami.webgpu or kami.webgl accordingly.
 */
kami.webgl.pick_backend = (function kami$webgl$pick_backend(){
if(kami.webgl.webgpu_available_QMARK_()){
return new cljs.core.Keyword(null,"webgpu","webgpu",-1928709720);
} else {
return new cljs.core.Keyword(null,"webgl2","webgl2",111927467);
}
});

/**
 * The kami.gpu capability tier for a running WebGL2 context (no compute / no storage, instancing
 * via ANGLE_instanced_arrays core in WebGL2).
 */
kami.webgl.caps = (function kami$webgl$caps(_gl){
return kami.gpu.caps_from_device(new cljs.core.Keyword(null,"webgl2","webgl2",111927467),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"compute","compute",1555393130),false,new cljs.core.Keyword(null,"storage","storage",1867247511),false,new cljs.core.Keyword(null,"instancing","instancing",1383407992),true], null));
});

kami.webgl.compile_shader = (function kami$webgl$compile_shader(gl,kind,src){
var s = gl.createShader(kind);
gl.shaderSource(s,src);

gl.compileShader(s);

if(cljs.core.truth_(gl.getShaderParameter(s,gl.COMPILE_STATUS))){
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2(["GLSL compile error:\n",cljs.core.str.cljs$core$IFn$_invoke$arity$1(gl.getShaderInfoLog(s))].join(''),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"src","src",-1651076051),src], null));
}

return s;
});

/**
 * Compile + link a GLSL ES 3.00 program from vertex/fragment source (as produced by bb gen-glsl).
 * Throws with the info log on failure.
 */
kami.webgl.program = (function kami$webgl$program(gl,vsrc,fsrc){
var p = gl.createProgram();
var vs = kami.webgl.compile_shader(gl,gl.VERTEX_SHADER,vsrc);
var fs = kami.webgl.compile_shader(gl,gl.FRAGMENT_SHADER,fsrc);
gl.attachShader(p,vs);

gl.attachShader(p,fs);

gl.linkProgram(p);

if(cljs.core.truth_(gl.getProgramParameter(p,gl.LINK_STATUS))){
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2(["GLSL link error:\n",cljs.core.str.cljs$core$IFn$_invoke$arity$1(gl.getProgramInfoLog(p))].join(''),cljs.core.PersistentArrayMap.EMPTY);
}

return p;
});

kami.webgl.mesh_vertex_shader = "#version 300 es\nprecision highp float;\nlayout(location=0) in vec3 a_position;\nlayout(location=1) in vec3 a_normal;\nuniform mat4 u_mvp;\nout vec3 v_normal;\nvoid main(){ gl_Position=u_mvp*vec4(a_position,1.0); v_normal=a_normal; }";

kami.webgl.mesh_fragment_shader = "#version 300 es\nprecision highp float;\nin vec3 v_normal;\nuniform vec3 u_color;\nout vec4 out_color;\nvoid main(){ float l=0.25+0.75*max(dot(normalize(v_normal),normalize(vec3(0.4,0.8,0.6))),0.0); out_color=vec4(u_color*l,1.0); }";

/**
 * Initialize the canonical arbitrary-mesh WebGL2 fallback for a canvas.
 */
kami.webgl.init_mesh_viewport_BANG_ = (function kami$webgl$init_mesh_viewport_BANG_(canvas){
var temp__5825__auto__ = kami.webgl.webgl2_context(canvas);
if(cljs.core.truth_(temp__5825__auto__)){
var gl = temp__5825__auto__;
var width = (function (){var x__5087__auto__ = (1);
var y__5088__auto__ = canvas.clientWidth;
return ((x__5087__auto__ > y__5088__auto__) ? x__5087__auto__ : y__5088__auto__);
})();
var height = (function (){var x__5087__auto__ = (1);
var y__5088__auto__ = canvas.clientHeight;
return ((x__5087__auto__ > y__5088__auto__) ? x__5087__auto__ : y__5088__auto__);
})();
var prog = kami.webgl.program(gl,kami.webgl.mesh_vertex_shader,kami.webgl.mesh_fragment_shader);
(canvas.width = width);

(canvas.height = height);

gl.enable(gl.DEPTH_TEST);

return new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"backend","backend",-847489124),new cljs.core.Keyword(null,"webgl2","webgl2",111927467),new cljs.core.Keyword(null,"gl","gl",-246422634),gl,new cljs.core.Keyword(null,"program","program",781564284),prog,new cljs.core.Keyword(null,"width","width",-384071477),width,new cljs.core.Keyword(null,"height","height",1025178622),height], null);
} else {
return null;
}
});

/**
 * Upload {:positions :normals :indices} to a fallback viewport.
 */
kami.webgl.upload_mesh_BANG_ = (function kami$webgl$upload_mesh_BANG_(p__20278,p__20279){
var map__20280 = p__20278;
var map__20280__$1 = cljs.core.__destructure_map(map__20280);
var gl = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20280__$1,new cljs.core.Keyword(null,"gl","gl",-246422634));
var map__20281 = p__20279;
var map__20281__$1 = cljs.core.__destructure_map(map__20281);
var positions = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20281__$1,new cljs.core.Keyword(null,"positions","positions",-1380538434));
var normals = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20281__$1,new cljs.core.Keyword(null,"normals","normals",-1508109067));
var indices = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20281__$1,new cljs.core.Keyword(null,"indices","indices",-1218138343));
var vao = gl.createVertexArray();
var vertex_buffer = gl.createBuffer();
var index_buffer = gl.createBuffer();
var vertices = (new Float32Array(cljs.core.clj__GT_js(cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic(cljs.core.concat,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.map.cljs$core$IFn$_invoke$arity$3(cljs.core.vector,positions,normals)], 0)))));
var index_data = (new Uint32Array(cljs.core.clj__GT_js(indices)));
gl.bindVertexArray(vao);

gl.bindBuffer(gl.ARRAY_BUFFER,vertex_buffer);

gl.bufferData(gl.ARRAY_BUFFER,vertices,gl.STATIC_DRAW);

var seq__20286_20504 = cljs.core.seq(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(0)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(1),(12)], null)], null));
var chunk__20287_20505 = null;
var count__20288_20506 = (0);
var i__20289_20507 = (0);
while(true){
if((i__20289_20507 < count__20288_20506)){
var vec__20296_20508 = chunk__20287_20505.cljs$core$IIndexed$_nth$arity$2(null, i__20289_20507);
var location_20509__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20296_20508,(0),null);
var offset_20510 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20296_20508,(1),null);
gl.enableVertexAttribArray(location_20509__$1);

gl.vertexAttribPointer(location_20509__$1,(3),gl.FLOAT,false,(24),offset_20510);


var G__20511 = seq__20286_20504;
var G__20512 = chunk__20287_20505;
var G__20513 = count__20288_20506;
var G__20514 = (i__20289_20507 + (1));
seq__20286_20504 = G__20511;
chunk__20287_20505 = G__20512;
count__20288_20506 = G__20513;
i__20289_20507 = G__20514;
continue;
} else {
var temp__5825__auto___20515 = cljs.core.seq(seq__20286_20504);
if(temp__5825__auto___20515){
var seq__20286_20516__$1 = temp__5825__auto___20515;
if(cljs.core.chunked_seq_QMARK_(seq__20286_20516__$1)){
var c__5525__auto___20517 = cljs.core.chunk_first(seq__20286_20516__$1);
var G__20518 = cljs.core.chunk_rest(seq__20286_20516__$1);
var G__20519 = c__5525__auto___20517;
var G__20520 = cljs.core.count(c__5525__auto___20517);
var G__20521 = (0);
seq__20286_20504 = G__20518;
chunk__20287_20505 = G__20519;
count__20288_20506 = G__20520;
i__20289_20507 = G__20521;
continue;
} else {
var vec__20300_20522 = cljs.core.first(seq__20286_20516__$1);
var location_20523__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20300_20522,(0),null);
var offset_20524 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20300_20522,(1),null);
gl.enableVertexAttribArray(location_20523__$1);

gl.vertexAttribPointer(location_20523__$1,(3),gl.FLOAT,false,(24),offset_20524);


var G__20525 = cljs.core.next(seq__20286_20516__$1);
var G__20526 = null;
var G__20527 = (0);
var G__20528 = (0);
seq__20286_20504 = G__20525;
chunk__20287_20505 = G__20526;
count__20288_20506 = G__20527;
i__20289_20507 = G__20528;
continue;
}
} else {
}
}
break;
}

gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,index_buffer);

gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,index_data,gl.STATIC_DRAW);

gl.bindVertexArray(null);

return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"vao","vao",-896395446),vao,new cljs.core.Keyword(null,"vertex-buffer","vertex-buffer",-1711520881),vertex_buffer,new cljs.core.Keyword(null,"index-buffer","index-buffer",2003635709),index_buffer,new cljs.core.Keyword(null,"index-count","index-count",-907351532),cljs.core.count(indices)], null);
});

/**
 * Render several fallback mesh draws after one color/depth clear. Each draw
 *   is {:buffers :mvp :color}; MVP is a column-major Float32Array.
 */
kami.webgl.render_mesh_scene_BANG_ = (function kami$webgl$render_mesh_scene_BANG_(p__20305,draws){
var map__20306 = p__20305;
var map__20306__$1 = cljs.core.__destructure_map(map__20306);
var gl = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20306__$1,new cljs.core.Keyword(null,"gl","gl",-246422634));
var program = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20306__$1,new cljs.core.Keyword(null,"program","program",781564284));
var width = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20306__$1,new cljs.core.Keyword(null,"width","width",-384071477));
var height = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20306__$1,new cljs.core.Keyword(null,"height","height",1025178622));
gl.viewport((0),(0),width,height);

gl.clearColor(0.035,0.055,0.1,1.0);

gl.clear((gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT));

gl.useProgram(program);

var seq__20307_20531 = cljs.core.seq(draws);
var chunk__20308_20532 = null;
var count__20309_20533 = (0);
var i__20310_20534 = (0);
while(true){
if((i__20310_20534 < count__20309_20533)){
var map__20326_20535 = chunk__20308_20532.cljs$core$IIndexed$_nth$arity$2(null, i__20310_20534);
var map__20326_20536__$1 = cljs.core.__destructure_map(map__20326_20535);
var buffers_20537 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20326_20536__$1,new cljs.core.Keyword(null,"buffers","buffers",471409492));
var mvp_20538 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20326_20536__$1,new cljs.core.Keyword(null,"mvp","mvp",-493676132));
var color_20539 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20326_20536__$1,new cljs.core.Keyword(null,"color","color",1011675173));
var map__20329_20541 = buffers_20537;
var map__20329_20542__$1 = cljs.core.__destructure_map(map__20329_20541);
var vao_20543 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20329_20542__$1,new cljs.core.Keyword(null,"vao","vao",-896395446));
var index_count_20544 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20329_20542__$1,new cljs.core.Keyword(null,"index-count","index-count",-907351532));
var vec__20331_20545 = color_20539;
var r_20546 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20331_20545,(0),null);
var g_20547 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20331_20545,(1),null);
var b_20548 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20331_20545,(2),null);
gl.uniformMatrix4fv(gl.getUniformLocation(program,"u_mvp"),false,mvp_20538);

gl.uniform3f(gl.getUniformLocation(program,"u_color"),r_20546,g_20547,b_20548);

gl.bindVertexArray(vao_20543);

gl.drawElements(gl.TRIANGLES,index_count_20544,gl.UNSIGNED_INT,(0));


var G__20549 = seq__20307_20531;
var G__20550 = chunk__20308_20532;
var G__20551 = count__20309_20533;
var G__20552 = (i__20310_20534 + (1));
seq__20307_20531 = G__20549;
chunk__20308_20532 = G__20550;
count__20309_20533 = G__20551;
i__20310_20534 = G__20552;
continue;
} else {
var temp__5825__auto___20553 = cljs.core.seq(seq__20307_20531);
if(temp__5825__auto___20553){
var seq__20307_20554__$1 = temp__5825__auto___20553;
if(cljs.core.chunked_seq_QMARK_(seq__20307_20554__$1)){
var c__5525__auto___20558 = cljs.core.chunk_first(seq__20307_20554__$1);
var G__20559 = cljs.core.chunk_rest(seq__20307_20554__$1);
var G__20560 = c__5525__auto___20558;
var G__20561 = cljs.core.count(c__5525__auto___20558);
var G__20562 = (0);
seq__20307_20531 = G__20559;
chunk__20308_20532 = G__20560;
count__20309_20533 = G__20561;
i__20310_20534 = G__20562;
continue;
} else {
var map__20338_20563 = cljs.core.first(seq__20307_20554__$1);
var map__20338_20564__$1 = cljs.core.__destructure_map(map__20338_20563);
var buffers_20565 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20338_20564__$1,new cljs.core.Keyword(null,"buffers","buffers",471409492));
var mvp_20566 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20338_20564__$1,new cljs.core.Keyword(null,"mvp","mvp",-493676132));
var color_20567 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20338_20564__$1,new cljs.core.Keyword(null,"color","color",1011675173));
var map__20339_20568 = buffers_20565;
var map__20339_20569__$1 = cljs.core.__destructure_map(map__20339_20568);
var vao_20570 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20339_20569__$1,new cljs.core.Keyword(null,"vao","vao",-896395446));
var index_count_20571 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20339_20569__$1,new cljs.core.Keyword(null,"index-count","index-count",-907351532));
var vec__20340_20572 = color_20567;
var r_20573 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20340_20572,(0),null);
var g_20574 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20340_20572,(1),null);
var b_20575 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20340_20572,(2),null);
gl.uniformMatrix4fv(gl.getUniformLocation(program,"u_mvp"),false,mvp_20566);

gl.uniform3f(gl.getUniformLocation(program,"u_color"),r_20573,g_20574,b_20575);

gl.bindVertexArray(vao_20570);

gl.drawElements(gl.TRIANGLES,index_count_20571,gl.UNSIGNED_INT,(0));


var G__20576 = cljs.core.next(seq__20307_20554__$1);
var G__20577 = null;
var G__20578 = (0);
var G__20579 = (0);
seq__20307_20531 = G__20576;
chunk__20308_20532 = G__20577;
count__20309_20533 = G__20578;
i__20310_20534 = G__20579;
continue;
}
} else {
}
}
break;
}

return gl.bindVertexArray(null);
});

/**
 * Render one fallback mesh frame.
 */
kami.webgl.render_mesh_frame_BANG_ = (function kami$webgl$render_mesh_frame_BANG_(viewport,buffers,mvp,color){
return kami.webgl.render_mesh_scene_BANG_(viewport,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"buffers","buffers",471409492),buffers,new cljs.core.Keyword(null,"mvp","mvp",-493676132),mvp,new cljs.core.Keyword(null,"color","color",1011675173),color], null)], null));
});

kami.webgl.F4 = (4);

/**
 * Build a 2D-sprite draw fn for this WebGL2 context from the generated GLSL (sprite.vert/.frag).
 * The returned `(draw! quad-instances [w h])` packs + uploads the instances and issues one
 * instanced draw — the whole 2D frame in a single call, rendering the SDF shapes on the GPU.
 */
kami.webgl.sprite_renderer = (function kami$webgl$sprite_renderer(var_args){
var args__5732__auto__ = [];
var len__5726__auto___20583 = arguments.length;
var i__5727__auto___20584 = (0);
while(true){
if((i__5727__auto___20584 < len__5726__auto___20583)){
args__5732__auto__.push((arguments[i__5727__auto___20584]));

var G__20585 = (i__5727__auto___20584 + (1));
i__5727__auto___20584 = G__20585;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((1) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((1)),(0),null)):null);
return kami.webgl.sprite_renderer.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5733__auto__);
});

(kami.webgl.sprite_renderer.cljs$core$IFn$_invoke$arity$variadic = (function (gl,p__20356){
var vec__20357 = p__20356;
var map__20360 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20357,(0),null);
var map__20360__$1 = cljs.core.__destructure_map(map__20360);
var vert = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__20360__$1,new cljs.core.Keyword(null,"vert","vert",-360932977),kami.webgl.glsl.sprite_vert);
var frag = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__20360__$1,new cljs.core.Keyword(null,"frag","frag",1474317943),kami.webgl.glsl.sprite_frag);
var prog = kami.webgl.program(gl,vert,frag);
var vao = gl.createVertexArray();
var ibuf = gl.createBuffer();
var ublk = gl.getUniformBlockIndex(prog,"U_block_0Vertex");
var ubuf = gl.createBuffer();
gl.bindVertexArray(vao);

gl.bindBuffer(gl.ARRAY_BUFFER,ibuf);

var stride_20586 = (48);
var attrs_20587 = new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(2),(0)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(1),(2),(8)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(2),(1),(16)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(3),(1),(20)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(4),(4),(24)], null)], null);
var seq__20361_20588 = cljs.core.seq(attrs_20587);
var chunk__20362_20589 = null;
var count__20363_20590 = (0);
var i__20364_20591 = (0);
while(true){
if((i__20364_20591 < count__20363_20590)){
var vec__20377_20592 = chunk__20362_20589.cljs$core$IIndexed$_nth$arity$2(null, i__20364_20591);
var loc_20593 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20377_20592,(0),null);
var n_20594 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20377_20592,(1),null);
var off_20595 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20377_20592,(2),null);
gl.enableVertexAttribArray(loc_20593);

gl.vertexAttribPointer(loc_20593,n_20594,gl.FLOAT,false,stride_20586,off_20595);

gl.vertexAttribDivisor(loc_20593,(1));


var G__20596 = seq__20361_20588;
var G__20597 = chunk__20362_20589;
var G__20598 = count__20363_20590;
var G__20599 = (i__20364_20591 + (1));
seq__20361_20588 = G__20596;
chunk__20362_20589 = G__20597;
count__20363_20590 = G__20598;
i__20364_20591 = G__20599;
continue;
} else {
var temp__5825__auto___20600 = cljs.core.seq(seq__20361_20588);
if(temp__5825__auto___20600){
var seq__20361_20601__$1 = temp__5825__auto___20600;
if(cljs.core.chunked_seq_QMARK_(seq__20361_20601__$1)){
var c__5525__auto___20602 = cljs.core.chunk_first(seq__20361_20601__$1);
var G__20603 = cljs.core.chunk_rest(seq__20361_20601__$1);
var G__20604 = c__5525__auto___20602;
var G__20605 = cljs.core.count(c__5525__auto___20602);
var G__20606 = (0);
seq__20361_20588 = G__20603;
chunk__20362_20589 = G__20604;
count__20363_20590 = G__20605;
i__20364_20591 = G__20606;
continue;
} else {
var vec__20382_20607 = cljs.core.first(seq__20361_20601__$1);
var loc_20608 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20382_20607,(0),null);
var n_20609 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20382_20607,(1),null);
var off_20610 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20382_20607,(2),null);
gl.enableVertexAttribArray(loc_20608);

gl.vertexAttribPointer(loc_20608,n_20609,gl.FLOAT,false,stride_20586,off_20610);

gl.vertexAttribDivisor(loc_20608,(1));


var G__20611 = cljs.core.next(seq__20361_20601__$1);
var G__20612 = null;
var G__20613 = (0);
var G__20614 = (0);
seq__20361_20588 = G__20611;
chunk__20362_20589 = G__20612;
count__20363_20590 = G__20613;
i__20364_20591 = G__20614;
continue;
}
} else {
}
}
break;
}

if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(ublk,gl.INVALID_INDEX)){
gl.uniformBlockBinding(prog,ublk,(0));
} else {
}

gl.bindVertexArray(null);

return (function kami$webgl$draw_BANG_(quad_instances,p__20386){
var vec__20387 = p__20386;
var w = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20387,(0),null);
var h = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20387,(1),null);
var data = (new Float32Array(cljs.core.clj__GT_js(kami.sprite_gpu.pack_instances(quad_instances))));
var n = cljs.core.count(quad_instances);
gl.useProgram(prog);

gl.bindVertexArray(vao);

gl.bindBuffer(gl.ARRAY_BUFFER,ibuf);

gl.bufferData(gl.ARRAY_BUFFER,data,gl.DYNAMIC_DRAW);

gl.bindBuffer(gl.UNIFORM_BUFFER,ubuf);

gl.bufferData(gl.UNIFORM_BUFFER,(new Float32Array([w,h,(0),(0)])),gl.DYNAMIC_DRAW);

gl.bindBufferBase(gl.UNIFORM_BUFFER,(0),ubuf);

gl.enable(gl.BLEND);

gl.blendFunc(gl.ONE,gl.ONE_MINUS_SRC_ALPHA);

gl.drawArraysInstanced(gl.TRIANGLES,(0),(6),n);

return gl.bindVertexArray(null);
});
}));

(kami.webgl.sprite_renderer.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(kami.webgl.sprite_renderer.cljs$lang$applyTo = (function (seq20347){
var G__20348 = cljs.core.first(seq20347);
var seq20347__$1 = cljs.core.next(seq20347);
var self__5711__auto__ = this;
return self__5711__auto__.cljs$core$IFn$_invoke$arity$variadic(G__20348,seq20347__$1);
}));


/**
 * Render a 2D sprite frame on WebGL2: clear, then draw the quad instances (from
 * kami.sprite-gpu/draw-ops->quads) via the sprite pass. The :sprites pass has no kami.gpu
 * :requires, so it runs on this tier; compute passes in a richer graph are dropped by resolve.
 */
kami.webgl.render_2d_BANG_ = (function kami$webgl$render_2d_BANG_(gl,p__20399,quad_instances,p__20400){
var map__20401 = p__20399;
var map__20401__$1 = cljs.core.__destructure_map(map__20401);
var draw_sprites_BANG_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20401__$1,new cljs.core.Keyword(null,"draw-sprites!","draw-sprites!",-408140749));
var clear = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20401__$1,new cljs.core.Keyword(null,"clear","clear",1877104959));
var vec__20402 = p__20400;
var w = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20402,(0),null);
var h = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20402,(1),null);
gl.viewport((0),(0),w,h);

var vec__20405_20616 = (function (){var or__5002__auto__ = clear;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [0.04,0.05,0.08,1.0], null);
}
})();
var r_20617 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20405_20616,(0),null);
var g_20618 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20405_20616,(1),null);
var b_20619 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20405_20616,(2),null);
var a_20620 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20405_20616,(3),null);
gl.clearColor(r_20617,g_20618,b_20619,a_20620);

gl.clear(gl.COLOR_BUFFER_BIT);

var G__20408 = quad_instances;
var G__20409 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [w,h], null);
return (draw_sprites_BANG_.cljs$core$IFn$_invoke$arity$2 ? draw_sprites_BANG_.cljs$core$IFn$_invoke$arity$2(G__20408,G__20409) : draw_sprites_BANG_.call(null, G__20408,G__20409));
});

kami.webgl.SHADOW_FS = "#version 300 es\nprecision highp float;\nvoid main() {}";

/**
 * Build a whole-2D-frame draw fn from the embedded GLSL: a sky gradient pass (fullscreen triangle)
 * then the instanced sprite/text quad pass. (render! {:sky {:zenith :ground} :quads [...]} [w h])
 * draws the full kami.scene2d frame on the GPU — the Canvas2D draw-2d! replacement.
 */
kami.webgl.scene_renderer = (function kami$webgl$scene_renderer(gl){
var sky_prog = kami.webgl.program(gl,kami.webgl.glsl.sky_vert,kami.webgl.glsl.sky_frag);
var sky_ub = gl.createBuffer();
var sky_blk = gl.getUniformBlockIndex(sky_prog,"SU_block_0Fragment");
var draw_BANG_ = kami.webgl.sprite_renderer(gl);
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(sky_blk,gl.INVALID_INDEX)){
gl.uniformBlockBinding(sky_prog,sky_blk,(0));
} else {
}

return (function kami$webgl$scene_renderer_$_render_frame_BANG_(p__20410,p__20411){
var map__20412 = p__20410;
var map__20412__$1 = cljs.core.__destructure_map(map__20412);
var sky = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20412__$1,new cljs.core.Keyword(null,"sky","sky",1271496862));
var quads = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20412__$1,new cljs.core.Keyword(null,"quads","quads",1347497505));
var vec__20413 = p__20411;
var w = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20413,(0),null);
var h = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20413,(1),null);
gl.viewport((0),(0),w,h);

gl.useProgram(sky_prog);

gl.bindBuffer(gl.UNIFORM_BUFFER,sky_ub);

gl.bufferData(gl.UNIFORM_BUFFER,(new Float32Array(cljs.core.clj__GT_js(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"zenith","zenith",1165769957).cljs$core$IFn$_invoke$arity$1(sky),new cljs.core.Keyword(null,"ground","ground",1193572934).cljs$core$IFn$_invoke$arity$1(sky))))),gl.DYNAMIC_DRAW);

gl.bindBufferBase(gl.UNIFORM_BUFFER,(0),sky_ub);

gl.disable(gl.BLEND);

gl.drawArrays(gl.TRIANGLES,(0),(3));

return draw_BANG_(quads,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [w,h], null));
});
});

kami.webgl.mesh_vao = (function kami$webgl$mesh_vao(gl,vbuf,ibuf,inst){
var vao = gl.createVertexArray();
gl.bindVertexArray(vao);

gl.bindBuffer(gl.ARRAY_BUFFER,vbuf);

var seq__20418_20621 = cljs.core.seq(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(0)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(1),(12)], null)], null));
var chunk__20419_20622 = null;
var count__20420_20623 = (0);
var i__20421_20624 = (0);
while(true){
if((i__20421_20624 < count__20420_20623)){
var vec__20428_20625 = chunk__20419_20622.cljs$core$IIndexed$_nth$arity$2(null, i__20421_20624);
var loc_20626 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20428_20625,(0),null);
var off_20627 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20428_20625,(1),null);
gl.enableVertexAttribArray(loc_20626);

gl.vertexAttribPointer(loc_20626,(3),gl.FLOAT,false,(24),off_20627);


var G__20628 = seq__20418_20621;
var G__20629 = chunk__20419_20622;
var G__20630 = count__20420_20623;
var G__20631 = (i__20421_20624 + (1));
seq__20418_20621 = G__20628;
chunk__20419_20622 = G__20629;
count__20420_20623 = G__20630;
i__20421_20624 = G__20631;
continue;
} else {
var temp__5825__auto___20632 = cljs.core.seq(seq__20418_20621);
if(temp__5825__auto___20632){
var seq__20418_20633__$1 = temp__5825__auto___20632;
if(cljs.core.chunked_seq_QMARK_(seq__20418_20633__$1)){
var c__5525__auto___20634 = cljs.core.chunk_first(seq__20418_20633__$1);
var G__20635 = cljs.core.chunk_rest(seq__20418_20633__$1);
var G__20636 = c__5525__auto___20634;
var G__20637 = cljs.core.count(c__5525__auto___20634);
var G__20638 = (0);
seq__20418_20621 = G__20635;
chunk__20419_20622 = G__20636;
count__20420_20623 = G__20637;
i__20421_20624 = G__20638;
continue;
} else {
var vec__20431_20639 = cljs.core.first(seq__20418_20633__$1);
var loc_20640 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20431_20639,(0),null);
var off_20641 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20431_20639,(1),null);
gl.enableVertexAttribArray(loc_20640);

gl.vertexAttribPointer(loc_20640,(3),gl.FLOAT,false,(24),off_20641);


var G__20642 = cljs.core.next(seq__20418_20633__$1);
var G__20643 = null;
var G__20644 = (0);
var G__20645 = (0);
seq__20418_20621 = G__20642;
chunk__20419_20622 = G__20643;
count__20420_20623 = G__20644;
i__20421_20624 = G__20645;
continue;
}
} else {
}
}
break;
}

gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,ibuf);

gl.bindBuffer(gl.ARRAY_BUFFER,inst);

var seq__20434_20646 = cljs.core.seq(new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(2),(0)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(3),(16)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(4),(32)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(5),(48)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(6),(64)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(7),(80)], null)], null));
var chunk__20435_20647 = null;
var count__20436_20648 = (0);
var i__20437_20649 = (0);
while(true){
if((i__20437_20649 < count__20436_20648)){
var vec__20444_20650 = chunk__20435_20647.cljs$core$IIndexed$_nth$arity$2(null, i__20437_20649);
var loc_20651 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20444_20650,(0),null);
var off_20652 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20444_20650,(1),null);
gl.enableVertexAttribArray(loc_20651);

gl.vertexAttribPointer(loc_20651,(4),gl.FLOAT,false,(96),off_20652);

gl.vertexAttribDivisor(loc_20651,(1));


var G__20653 = seq__20434_20646;
var G__20654 = chunk__20435_20647;
var G__20655 = count__20436_20648;
var G__20656 = (i__20437_20649 + (1));
seq__20434_20646 = G__20653;
chunk__20435_20647 = G__20654;
count__20436_20648 = G__20655;
i__20437_20649 = G__20656;
continue;
} else {
var temp__5825__auto___20657 = cljs.core.seq(seq__20434_20646);
if(temp__5825__auto___20657){
var seq__20434_20658__$1 = temp__5825__auto___20657;
if(cljs.core.chunked_seq_QMARK_(seq__20434_20658__$1)){
var c__5525__auto___20659 = cljs.core.chunk_first(seq__20434_20658__$1);
var G__20660 = cljs.core.chunk_rest(seq__20434_20658__$1);
var G__20661 = c__5525__auto___20659;
var G__20662 = cljs.core.count(c__5525__auto___20659);
var G__20663 = (0);
seq__20434_20646 = G__20660;
chunk__20435_20647 = G__20661;
count__20436_20648 = G__20662;
i__20437_20649 = G__20663;
continue;
} else {
var vec__20447_20664 = cljs.core.first(seq__20434_20658__$1);
var loc_20665 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20447_20664,(0),null);
var off_20666 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20447_20664,(1),null);
gl.enableVertexAttribArray(loc_20665);

gl.vertexAttribPointer(loc_20665,(4),gl.FLOAT,false,(96),off_20666);

gl.vertexAttribDivisor(loc_20665,(1));


var G__20667 = cljs.core.next(seq__20434_20658__$1);
var G__20668 = null;
var G__20669 = (0);
var G__20670 = (0);
seq__20434_20646 = G__20667;
chunk__20435_20647 = G__20668;
count__20436_20648 = G__20669;
i__20437_20649 = G__20670;
continue;
}
} else {
}
}
break;
}

gl.bindVertexArray(null);

return vao;
});

kami.webgl.depth_fbo = (function kami$webgl$depth_fbo(gl,size){
var tex = gl.createTexture();
var fbo = gl.createFramebuffer();
gl.bindTexture(gl.TEXTURE_2D,tex);

gl.texImage2D(gl.TEXTURE_2D,(0),gl.DEPTH_COMPONENT32F,size,size,(0),gl.DEPTH_COMPONENT,gl.FLOAT,null);

var seq__20450_20671 = cljs.core.seq(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [gl.TEXTURE_MIN_FILTER,gl.LINEAR], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [gl.TEXTURE_MAG_FILTER,gl.LINEAR], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [gl.TEXTURE_COMPARE_MODE,gl.COMPARE_REF_TO_TEXTURE], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [gl.TEXTURE_COMPARE_FUNC,gl.LEQUAL], null)], null));
var chunk__20451_20672 = null;
var count__20452_20673 = (0);
var i__20453_20674 = (0);
while(true){
if((i__20453_20674 < count__20452_20673)){
var vec__20460_20675 = chunk__20451_20672.cljs$core$IIndexed$_nth$arity$2(null, i__20453_20674);
var k_20676 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20460_20675,(0),null);
var v_20677 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20460_20675,(1),null);
gl.texParameteri(gl.TEXTURE_2D,k_20676,v_20677);


var G__20678 = seq__20450_20671;
var G__20679 = chunk__20451_20672;
var G__20680 = count__20452_20673;
var G__20681 = (i__20453_20674 + (1));
seq__20450_20671 = G__20678;
chunk__20451_20672 = G__20679;
count__20452_20673 = G__20680;
i__20453_20674 = G__20681;
continue;
} else {
var temp__5825__auto___20682 = cljs.core.seq(seq__20450_20671);
if(temp__5825__auto___20682){
var seq__20450_20683__$1 = temp__5825__auto___20682;
if(cljs.core.chunked_seq_QMARK_(seq__20450_20683__$1)){
var c__5525__auto___20684 = cljs.core.chunk_first(seq__20450_20683__$1);
var G__20685 = cljs.core.chunk_rest(seq__20450_20683__$1);
var G__20686 = c__5525__auto___20684;
var G__20687 = cljs.core.count(c__5525__auto___20684);
var G__20688 = (0);
seq__20450_20671 = G__20685;
chunk__20451_20672 = G__20686;
count__20452_20673 = G__20687;
i__20453_20674 = G__20688;
continue;
} else {
var vec__20466_20689 = cljs.core.first(seq__20450_20683__$1);
var k_20690 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20466_20689,(0),null);
var v_20691 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20466_20689,(1),null);
gl.texParameteri(gl.TEXTURE_2D,k_20690,v_20691);


var G__20692 = cljs.core.next(seq__20450_20683__$1);
var G__20693 = null;
var G__20694 = (0);
var G__20695 = (0);
seq__20450_20671 = G__20692;
chunk__20451_20672 = G__20693;
count__20452_20673 = G__20694;
i__20453_20674 = G__20695;
continue;
}
} else {
}
}
break;
}

gl.bindFramebuffer(gl.FRAMEBUFFER,fbo);

gl.framebufferTexture2D(gl.FRAMEBUFFER,gl.DEPTH_ATTACHMENT,gl.TEXTURE_2D,tex,(0));

gl.bindFramebuffer(gl.FRAMEBUFFER,null);

return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"tex","tex",1307057959),tex,new cljs.core.Keyword(null,"fbo","fbo",265702356),fbo,new cljs.core.Keyword(null,"size","size",1098693007),size], null);
});

/**
 * Build the 3D lit+shadow draw for this WebGL2 context. `shaders` {:lit {:vert :frag} :shadow {:vert}}
 * are the GLSL ES 3.00 from bb gen-glsl. Returns (draw! packed-G mesh instances [w h]) where mesh is
 * {:vbuf :ibuf :count}, instances a Float32Array (24 f32/instance) with metadata :count on the map
 * passed as the 3rd-arg wrapper {:buf :count}.
 */
kami.webgl.lit_renderer = (function kami$webgl$lit_renderer(var_args){
var args__5732__auto__ = [];
var len__5726__auto___20696 = arguments.length;
var i__5727__auto___20697 = (0);
while(true){
if((i__5727__auto___20697 < len__5726__auto___20696)){
args__5732__auto__.push((arguments[i__5727__auto___20697]));

var G__20698 = (i__5727__auto___20697 + (1));
i__5727__auto___20697 = G__20698;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((2) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((2)),(0),null)):null);
return kami.webgl.lit_renderer.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__5733__auto__);
});

(kami.webgl.lit_renderer.cljs$core$IFn$_invoke$arity$variadic = (function (gl,shaders,p__20474){
var vec__20475 = p__20474;
var map__20478 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20475,(0),null);
var map__20478__$1 = cljs.core.__destructure_map(map__20478);
var shadow_size = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__20478__$1,new cljs.core.Keyword(null,"shadow-size","shadow-size",-1197814709),(2048));
var lit_p = kami.webgl.program(gl,cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(shaders,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"lit","lit",-561435380),new cljs.core.Keyword(null,"vert","vert",-360932977)], null)),cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(shaders,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"lit","lit",-561435380),new cljs.core.Keyword(null,"frag","frag",1474317943)], null)));
var shd_p = kami.webgl.program(gl,cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(shaders,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"shadow","shadow",873231803),new cljs.core.Keyword(null,"vert","vert",-360932977)], null)),kami.webgl.SHADOW_FS);
var sm = kami.webgl.depth_fbo(gl,shadow_size);
var gbuf = gl.createBuffer();
var ibuf = gl.createBuffer();
var bind_g = (function (prog,n){
var i = gl.getUniformBlockIndex(prog,n);
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(i,gl.INVALID_INDEX)){
return gl.uniformBlockBinding(prog,i,(0));
} else {
return null;
}
});
bind_g(lit_p,"G_block_0Vertex");

bind_g(lit_p,"G_block_0Fragment");

bind_g(shd_p,"G_block_0Vertex");

return (function kami$webgl$draw_BANG_(packed_G,mesh,instances,p__20485){
var vec__20486 = p__20485;
var w = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20486,(0),null);
var h = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20486,(1),null);
gl.bindBuffer(gl.UNIFORM_BUFFER,gbuf);

gl.bufferData(gl.UNIFORM_BUFFER,packed_G,gl.DYNAMIC_DRAW);

gl.bindBufferBase(gl.UNIFORM_BUFFER,(0),gbuf);

gl.bindBuffer(gl.ARRAY_BUFFER,ibuf);

gl.bufferData(gl.ARRAY_BUFFER,new cljs.core.Keyword(null,"buf","buf",-213913340).cljs$core$IFn$_invoke$arity$1(instances),gl.DYNAMIC_DRAW);

var vao = kami.webgl.mesh_vao(gl,new cljs.core.Keyword(null,"vbuf","vbuf",303950747).cljs$core$IFn$_invoke$arity$1(mesh),new cljs.core.Keyword(null,"ibuf","ibuf",801056512).cljs$core$IFn$_invoke$arity$1(mesh),ibuf);
var n = new cljs.core.Keyword(null,"count","count",2139924085).cljs$core$IFn$_invoke$arity$1(instances);
gl.enable(gl.DEPTH_TEST);

gl.bindFramebuffer(gl.FRAMEBUFFER,new cljs.core.Keyword(null,"fbo","fbo",265702356).cljs$core$IFn$_invoke$arity$1(sm));

gl.viewport((0),(0),new cljs.core.Keyword(null,"size","size",1098693007).cljs$core$IFn$_invoke$arity$1(sm),new cljs.core.Keyword(null,"size","size",1098693007).cljs$core$IFn$_invoke$arity$1(sm));

gl.clear(gl.DEPTH_BUFFER_BIT);

gl.useProgram(shd_p);

gl.bindVertexArray(vao);

gl.drawElementsInstanced(gl.TRIANGLES,new cljs.core.Keyword(null,"count","count",2139924085).cljs$core$IFn$_invoke$arity$1(mesh),gl.UNSIGNED_SHORT,(0),n);

gl.bindFramebuffer(gl.FRAMEBUFFER,null);

gl.viewport((0),(0),w,h);

gl.clear((gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT));

gl.useProgram(lit_p);

gl.activeTexture(gl.TEXTURE0);

gl.bindTexture(gl.TEXTURE_2D,new cljs.core.Keyword(null,"tex","tex",1307057959).cljs$core$IFn$_invoke$arity$1(sm));

gl.uniform1i(gl.getUniformLocation(lit_p,"_group_0_binding_1_fs"),(0));

gl.drawElementsInstanced(gl.TRIANGLES,new cljs.core.Keyword(null,"count","count",2139924085).cljs$core$IFn$_invoke$arity$1(mesh),gl.UNSIGNED_SHORT,(0),n);

return gl.bindVertexArray(null);
});
}));

(kami.webgl.lit_renderer.cljs$lang$maxFixedArity = (2));

/** @this {Function} */
(kami.webgl.lit_renderer.cljs$lang$applyTo = (function (seq20469){
var G__20470 = cljs.core.first(seq20469);
var seq20469__$1 = cljs.core.next(seq20469);
var G__20471 = cljs.core.first(seq20469__$1);
var seq20469__$2 = cljs.core.next(seq20469__$1);
var self__5711__auto__ = this;
return self__5711__auto__.cljs$core$IFn$_invoke$arity$variadic(G__20470,G__20471,seq20469__$2);
}));


//# sourceMappingURL=kami.webgl.js.map
