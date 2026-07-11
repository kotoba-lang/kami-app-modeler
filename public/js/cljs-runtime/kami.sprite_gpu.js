goog.provide('kami.sprite_gpu');
kami.sprite_gpu.shapes = new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"circle","circle",1903212362),(0),new cljs.core.Keyword(null,"ellipse","ellipse",1135891702),(0),new cljs.core.Keyword(null,"rect","rect",-108902628),(1),new cljs.core.Keyword(null,"arc","arc",252411045),(2)], null);
kami.sprite_gpu.rgba = (function kami$sprite_gpu$rgba(fill){
var v = cljs.core.vec((function (){var or__5002__auto__ = fill;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [1.0,1.0,1.0], null);
}
})());
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((4),cljs.core.count(v))){
return v;
} else {
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(v,1.0);
}
});
/**
 * One sprite primitive `[kind props]` at entity centre [ex ey] → a GPU quad instance.
 * props use the sprite2d vocabulary: :dx/:dy offset, :r (circle), :rx/:ry (ellipse/arc), :w/:h
 * (rect), :fill colour, optional :anim. Returns {:pos :size :rot :shape :color} (size = half-extents),
 * carrying :anim when present so anim-quad can drive it per frame.
 * 
 * :rect's :w/:h are FULL width/height in the sprite2d vocabulary (kami.sprite2d.cljs's Canvas2D
 * reference painter draws `fillRect(dx - w/2, dy - h/2, w, h)` — a w×h box centred on dx/dy), so
 * they're halved here to match :size's half-extent convention; :r/:rx/:ry are already radii
 * (= half-extents) in that same vocabulary, so circle/ellipse/arc need no such conversion.
 */
kami.sprite_gpu.prim__GT_quad = (function kami$sprite_gpu$prim__GT_quad(p__20190,p__20191){
var vec__20193 = p__20190;
var ex = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20193,(0),null);
var ey = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20193,(1),null);
var vec__20196 = p__20191;
var kind = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20196,(0),null);
var map__20199 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20196,(1),null);
var map__20199__$1 = cljs.core.__destructure_map(map__20199);
var props = map__20199__$1;
var rot = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20199__$1,new cljs.core.Keyword(null,"rot","rot",757545242));
var ry = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20199__$1,new cljs.core.Keyword(null,"ry","ry",-334598563));
var rx = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20199__$1,new cljs.core.Keyword(null,"rx","rx",1627208482));
var r = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20199__$1,new cljs.core.Keyword(null,"r","r",-471384190));
var dx = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20199__$1,new cljs.core.Keyword(null,"dx","dx",-381796732));
var fill = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20199__$1,new cljs.core.Keyword(null,"fill","fill",883462889));
var w = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20199__$1,new cljs.core.Keyword(null,"w","w",354169001));
var dy = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20199__$1,new cljs.core.Keyword(null,"dy","dy",1719547243));
var h = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20199__$1,new cljs.core.Keyword(null,"h","h",1109658740));
var vec__20200 = (function (){var G__20203 = kind;
var G__20203__$1 = (((G__20203 instanceof cljs.core.Keyword))?G__20203.fqn:null);
switch (G__20203__$1) {
case "circle":
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var or__5002__auto__ = r;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return 1.0;
}
})(),(function (){var or__5002__auto__ = r;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return 1.0;
}
})()], null);

break;
case "ellipse":
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var or__5002__auto__ = rx;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return 1.0;
}
})(),(function (){var or__5002__auto__ = ry;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return 1.0;
}
})()], null);

break;
case "rect":
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [((function (){var or__5002__auto__ = w;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return 1.0;
}
})() / 2.0),((function (){var or__5002__auto__ = h;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return 1.0;
}
})() / 2.0)], null);

break;
case "arc":
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var or__5002__auto__ = rx;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
var or__5002__auto____$1 = r;
if(cljs.core.truth_(or__5002__auto____$1)){
return or__5002__auto____$1;
} else {
return 1.0;
}
}
})(),(function (){var or__5002__auto__ = ry;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
var or__5002__auto____$1 = r;
if(cljs.core.truth_(or__5002__auto____$1)){
return or__5002__auto____$1;
} else {
return 1.0;
}
}
})()], null);

break;
default:
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var or__5002__auto__ = r;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
var or__5002__auto____$1 = rx;
if(cljs.core.truth_(or__5002__auto____$1)){
return or__5002__auto____$1;
} else {
return 1.0;
}
}
})(),(function (){var or__5002__auto__ = r;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
var or__5002__auto____$1 = ry;
if(cljs.core.truth_(or__5002__auto____$1)){
return or__5002__auto____$1;
} else {
return 1.0;
}
}
})()], null);

}
})();
var sw = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20200,(0),null);
var sh = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20200,(1),null);
var G__20207 = new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"pos","pos",-864607220),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(ex + (function (){var or__5002__auto__ = dx;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return 0.0;
}
})()),(ey + (function (){var or__5002__auto__ = dy;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return 0.0;
}
})())], null),new cljs.core.Keyword(null,"size","size",1098693007),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [sw,sh], null),new cljs.core.Keyword(null,"rot","rot",757545242),(function (){var or__5002__auto__ = rot;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return 0.0;
}
})(),new cljs.core.Keyword(null,"shape","shape",1190694006),cljs.core.get.cljs$core$IFn$_invoke$arity$3(kami.sprite_gpu.shapes,kind,(0)),new cljs.core.Keyword(null,"color","color",1011675173),kami.sprite_gpu.rgba(fill)], null);
if(cljs.core.truth_(new cljs.core.Keyword(null,"anim","anim",-1276068045).cljs$core$IFn$_invoke$arity$1(props))){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__20207,new cljs.core.Keyword(null,"anim","anim",-1276068045),new cljs.core.Keyword(null,"anim","anim",-1276068045).cljs$core$IFn$_invoke$arity$1(props));
} else {
return G__20207;
}
});
kami.sprite_gpu.wave = (function kami$sprite_gpu$wave(t,ph,p__20208){
var vec__20209 = p__20208;
var a = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20209,(0),null);
var f = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20209,(1),null);
return (a * Math.sin(((t * f) + ph)));
});
/**
 * Apply a primitive's data-declared :anim (sprite2d vocabulary — {:rot :pulse :bob :sway [amp freq]})
 * to its quad at time `t` with per-entity phase `ph`, mirroring kami.sprite2d's tick-driven motion:
 * pulse scales, rot rotates, bob/sway translate (in the rotated+scaled frame). nil :anim ⇒ unchanged.
 * This is the GPU-2D parity for Canvas2D's per-part animation — motion stays data, no renderer code.
 */
kami.sprite_gpu.anim_quad = (function kami$sprite_gpu$anim_quad(t,ph,an,quad){
if((an == null)){
return quad;
} else {
var rot = (cljs.core.truth_(new cljs.core.Keyword(null,"rot","rot",757545242).cljs$core$IFn$_invoke$arity$1(an))?kami.sprite_gpu.wave(t,ph,new cljs.core.Keyword(null,"rot","rot",757545242).cljs$core$IFn$_invoke$arity$1(an)):0.0);
var pulse = (cljs.core.truth_(new cljs.core.Keyword(null,"pulse","pulse",-244494476).cljs$core$IFn$_invoke$arity$1(an))?kami.sprite_gpu.wave(t,ph,new cljs.core.Keyword(null,"pulse","pulse",-244494476).cljs$core$IFn$_invoke$arity$1(an)):0.0);
var s = (1.0 + pulse);
var bob = (cljs.core.truth_(new cljs.core.Keyword(null,"bob","bob",-1352926751).cljs$core$IFn$_invoke$arity$1(an))?kami.sprite_gpu.wave(t,ph,new cljs.core.Keyword(null,"bob","bob",-1352926751).cljs$core$IFn$_invoke$arity$1(an)):0.0);
var sway = (cljs.core.truth_(new cljs.core.Keyword(null,"sway","sway",206699695).cljs$core$IFn$_invoke$arity$1(an))?kami.sprite_gpu.wave(t,ph,new cljs.core.Keyword(null,"sway","sway",206699695).cljs$core$IFn$_invoke$arity$1(an)):0.0);
var c = Math.cos(rot);
var sn = Math.sin(rot);
var ox = (s * ((sway * c) - (bob * sn)));
var oy = (s * ((sway * sn) + (bob * c)));
var vec__20212 = new cljs.core.Keyword(null,"pos","pos",-864607220).cljs$core$IFn$_invoke$arity$1(quad);
var px = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20212,(0),null);
var py = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20212,(1),null);
var vec__20215 = new cljs.core.Keyword(null,"size","size",1098693007).cljs$core$IFn$_invoke$arity$1(quad);
var sw = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20215,(0),null);
var sh = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20215,(1),null);
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(quad,new cljs.core.Keyword(null,"pos","pos",-864607220),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(px + ox),(py + oy)], null),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"size","size",1098693007),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(sw * s),(sh * s)], null),new cljs.core.Keyword(null,"rot","rot",757545242),(new cljs.core.Keyword(null,"rot","rot",757545242).cljs$core$IFn$_invoke$arity$1(quad) + rot)], 0));
}
});
/**
 * A sprite recipe (vector of `[kind props]` primitives) at entity centre → a vector of GPU quad
 * instances. Painter order is preserved. With `t` (+ per-entity phase `ph`), each primitive's :anim
 * is applied (tick-driven motion); without it, the static quads.
 */
kami.sprite_gpu.prims__GT_quads = (function kami$sprite_gpu$prims__GT_quads(var_args){
var G__20219 = arguments.length;
switch (G__20219) {
case 2:
return kami.sprite_gpu.prims__GT_quads.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 4:
return kami.sprite_gpu.prims__GT_quads.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(kami.sprite_gpu.prims__GT_quads.cljs$core$IFn$_invoke$arity$2 = (function (center,prims){
return kami.sprite_gpu.prims__GT_quads.cljs$core$IFn$_invoke$arity$4(center,prims,null,(0));
}));

(kami.sprite_gpu.prims__GT_quads.cljs$core$IFn$_invoke$arity$4 = (function (center,prims,t,ph){
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (p){
var q = kami.sprite_gpu.prim__GT_quad(center,p);
if(cljs.core.truth_(t)){
return kami.sprite_gpu.anim_quad(t,ph,new cljs.core.Keyword(null,"anim","anim",-1276068045).cljs$core$IFn$_invoke$arity$1(q),q);
} else {
return q;
}
}),prims);
}));

(kami.sprite_gpu.prims__GT_quads.cljs$lang$maxFixedArity = 4);

/**
 * Flatten a kami.sprite2d.layout draw-list (ops {:sprite [prims…] :sx :sy :ph?}) into one flat quad
 * instance array for a single instanced draw — the whole 2D frame as GPU sprite instances. With `t`,
 * each op's :anim primitives animate (op :ph desyncs identical sprites).
 */
kami.sprite_gpu.draw_ops__GT_quads = (function kami$sprite_gpu$draw_ops__GT_quads(var_args){
var G__20221 = arguments.length;
switch (G__20221) {
case 1:
return kami.sprite_gpu.draw_ops__GT_quads.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return kami.sprite_gpu.draw_ops__GT_quads.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(kami.sprite_gpu.draw_ops__GT_quads.cljs$core$IFn$_invoke$arity$1 = (function (ops){
return kami.sprite_gpu.draw_ops__GT_quads.cljs$core$IFn$_invoke$arity$2(ops,null);
}));

(kami.sprite_gpu.draw_ops__GT_quads.cljs$core$IFn$_invoke$arity$2 = (function (ops,t){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentVector.EMPTY,cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic((function (p__20222){
var map__20223 = p__20222;
var map__20223__$1 = cljs.core.__destructure_map(map__20223);
var sprite = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20223__$1,new cljs.core.Keyword(null,"sprite","sprite",172516848));
var sx = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20223__$1,new cljs.core.Keyword(null,"sx","sx",-403071592));
var sy = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20223__$1,new cljs.core.Keyword(null,"sy","sy",227523849));
var ph = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20223__$1,new cljs.core.Keyword(null,"ph","ph",-1483583977));
return kami.sprite_gpu.prims__GT_quads.cljs$core$IFn$_invoke$arity$4(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [sx,sy], null),sprite,t,(function (){var or__5002__auto__ = ph;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return (0);
}
})());
}),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([ops], 0)));
}));

(kami.sprite_gpu.draw_ops__GT_quads.cljs$lang$maxFixedArity = 2);

/**
 * Pack quad instances into a flat f32 array for the GPU vertex buffer, 8 floats per instance:
 * pos.xy, size.xy, rot, shape, color.rg (… plus a 2nd row for color.ba in the real layout).
 * Returns a vector of floats — the canonical 2D-sprite instance layout (12 floats/instance:
 * pos2 size2 rot1 shape1 color4 + pad2).
 */
kami.sprite_gpu.pack_instances = (function kami$sprite_gpu$pack_instances(quads){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentVector.EMPTY,cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic((function (p__20228){
var map__20232 = p__20228;
var map__20232__$1 = cljs.core.__destructure_map(map__20232);
var pos = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20232__$1,new cljs.core.Keyword(null,"pos","pos",-864607220));
var size = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20232__$1,new cljs.core.Keyword(null,"size","size",1098693007));
var rot = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20232__$1,new cljs.core.Keyword(null,"rot","rot",757545242));
var shape = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20232__$1,new cljs.core.Keyword(null,"shape","shape",1190694006));
var color = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20232__$1,new cljs.core.Keyword(null,"color","color",1011675173));
return cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.double$,cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(pos,size,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [rot,shape], null),color,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [0.0,0.0], null)], 0)));
}),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([quads], 0)));
});
kami.sprite_gpu.sprite_sdf_shader = (function kami$sprite_gpu$sprite_sdf_shader(){
return kami.wgsl.shader.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([kami.wgsl.struct_STAR_(new cljs.core.Keyword(null,"U","U",1362002044),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"viewport","viewport",443342715),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"vec2","vec2",-762258640),new cljs.core.Keyword(null,"f32","f32",358377936)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"_p0","_p0",-1280937203),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"vec2","vec2",-762258640),new cljs.core.Keyword(null,"f32","f32",358377936)], null)], null)], null)),kami.wgsl.binding_STAR_(new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"group","group",582596132),(0),new cljs.core.Keyword(null,"binding","binding",539932593),(0),new cljs.core.Keyword(null,"space","space",348133475),new cljs.core.Keyword(null,"uniform","uniform",496503348)], null),new cljs.core.Keyword(null,"u","u",-1156634785),new cljs.core.Keyword(null,"U","U",1362002044)),kami.wgsl.struct_STAR_(new cljs.core.Keyword(null,"VO","VO",1454779553),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"clip","clip",830998499),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"vec4","vec4",631182126),new cljs.core.Keyword(null,"f32","f32",358377936)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"builtin","builtin",-1707593346),new cljs.core.Keyword(null,"position","position",-2011731912)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"uv","uv",-1197749379),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"vec2","vec2",-762258640),new cljs.core.Keyword(null,"f32","f32",358377936)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"location","location",1815599388),(0)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"shape","shape",1190694006),new cljs.core.Keyword(null,"f32","f32",358377936),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"location","location",1815599388),(1)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"color","color",1011675173),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"vec4","vec4",631182126),new cljs.core.Keyword(null,"f32","f32",358377936)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"location","location",1815599388),(2)], null)], null)], null)),kami.wgsl.func.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"vs","vs",-2022097090),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"stage","stage",1843544772),new cljs.core.Keyword(null,"vertex","vertex",1562146351),new cljs.core.Keyword(null,"params","params",710516235),new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"vid","vid",-2034096155),new cljs.core.Keyword(null,"u32","u32",1815761749),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"builtin","builtin",-1707593346),new cljs.core.Keyword(null,"vertex-index","vertex-index",848718223)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ipos","ipos",-2138434215),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"vec2","vec2",-762258640),new cljs.core.Keyword(null,"f32","f32",358377936)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"location","location",1815599388),(0)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"isize","isize",1065226484),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"vec2","vec2",-762258640),new cljs.core.Keyword(null,"f32","f32",358377936)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"location","location",1815599388),(1)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"irot","irot",-1582465859),new cljs.core.Keyword(null,"f32","f32",358377936),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"location","location",1815599388),(2)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ishape","ishape",858170378),new cljs.core.Keyword(null,"f32","f32",358377936),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"location","location",1815599388),(3)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"icolor","icolor",-1369113273),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"vec4","vec4",631182126),new cljs.core.Keyword(null,"f32","f32",358377936)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"location","location",1815599388),(4)], null)], null)], null),new cljs.core.Keyword(null,"ret","ret",-468222814),new cljs.core.Keyword(null,"VO","VO",1454779553)], null),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["var corners = array<vec2<f32>, 6>(vec2<f32>(-1.0,-1.0), vec2<f32>(1.0,-1.0), vec2<f32>(-1.0,1.0), vec2<f32>(-1.0,1.0), vec2<f32>(1.0,-1.0), vec2<f32>(1.0,1.0))",new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"let","let",-1282412701),new cljs.core.Keyword(null,"q","q",689001697),"corners[vid]"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"let","let",-1282412701),new cljs.core.Keyword(null,"c","c",-1763192079),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cos","cos",1201758276),new cljs.core.Keyword(null,"irot","irot",-1582465859)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"let","let",-1282412701),new cljs.core.Keyword(null,"s","s",1705939918),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sin","sin",80907862),new cljs.core.Keyword(null,"irot","irot",-1582465859)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"let","let",-1282412701),new cljs.core.Keyword(null,"scaled","scaled",-1947949285),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"*","*",-1294732318),new cljs.core.Keyword(null,"q","q",689001697),new cljs.core.Keyword(null,"isize","isize",1065226484)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"let","let",-1282412701),new cljs.core.Keyword(null,"rotated","rotated",1509433122),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"vec2","vec2",-762258640),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"-","-",-2112348439),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"*","*",-1294732318),new cljs.core.Keyword(null,"scaled.x","scaled.x",671638557),new cljs.core.Keyword(null,"c","c",-1763192079)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"*","*",-1294732318),new cljs.core.Keyword(null,"scaled.y","scaled.y",-888658506),new cljs.core.Keyword(null,"s","s",1705939918)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"+","+",1913524883),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"*","*",-1294732318),new cljs.core.Keyword(null,"scaled.x","scaled.x",671638557),new cljs.core.Keyword(null,"s","s",1705939918)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"*","*",-1294732318),new cljs.core.Keyword(null,"scaled.y","scaled.y",-888658506),new cljs.core.Keyword(null,"c","c",-1763192079)], null)], null)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"let","let",-1282412701),new cljs.core.Keyword(null,"px","px",281329899),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"+","+",1913524883),new cljs.core.Keyword(null,"ipos","ipos",-2138434215),new cljs.core.Keyword(null,"rotated","rotated",1509433122)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"let","let",-1282412701),new cljs.core.Keyword(null,"ndc","ndc",-484537179),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"-","-",-2112348439),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"*","*",-1294732318),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"/","/",1282502798),new cljs.core.Keyword(null,"px","px",281329899),new cljs.core.Keyword(null,"u.viewport","u.viewport",155094602)], null),2.0], null),1.0], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"decl","decl",-1498869485),new cljs.core.Keyword(null,"o","o",-1350007228),new cljs.core.Keyword(null,"VO","VO",1454779553)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"set","set",304602554),new cljs.core.Keyword(null,"o.clip","o.clip",906020629),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"vec4","vec4",631182126),new cljs.core.Keyword(null,"ndc.x","ndc.x",-463203181),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"-","-",-2112348439),new cljs.core.Keyword(null,"ndc.y","ndc.y",-834895383)], null),0.0,1.0], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"set","set",304602554),new cljs.core.Keyword(null,"o.uv","o.uv",412648610),new cljs.core.Keyword(null,"q","q",689001697)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"set","set",304602554),new cljs.core.Keyword(null,"o.shape","o.shape",1346060638),new cljs.core.Keyword(null,"ishape","ishape",858170378)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"set","set",304602554),new cljs.core.Keyword(null,"o.color","o.color",1138590803),new cljs.core.Keyword(null,"icolor","icolor",-1369113273)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"o","o",-1350007228)], null)], 0)),kami.wgsl.func.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"fs","fs",-2122926244),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"stage","stage",1843544772),new cljs.core.Keyword(null,"fragment","fragment",826775688),new cljs.core.Keyword(null,"params","params",710516235),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"i","i",-1386841315),new cljs.core.Keyword(null,"VO","VO",1454779553)], null)], null),new cljs.core.Keyword(null,"ret","ret",-468222814),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"loc","loc",-584284901),(0),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"vec4","vec4",631182126),new cljs.core.Keyword(null,"f32","f32",358377936)], null)], null)], null),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"var","var",-769682797),new cljs.core.Keyword(null,"d","d",1972142424),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"-","-",-2112348439),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"length","length",588987862),new cljs.core.Keyword(null,"i.uv","i.uv",-363960838)], null),1.0], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"if","if",-458814265),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,">",">",-555517146),new cljs.core.Keyword(null,"i.shape","i.shape",-33479013),0.5], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"set","set",304602554),new cljs.core.Keyword(null,"d","d",1972142424),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"-","-",-2112348439),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"max","max",61366548),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"abs","abs",-246026477),new cljs.core.Keyword(null,"i.uv.x","i.uv.x",-657818354)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"abs","abs",-246026477),new cljs.core.Keyword(null,"i.uv.y","i.uv.y",-1127963447)], null)], null),1.0], null)], null)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"if","if",-458814265),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,">",">",-555517146),new cljs.core.Keyword(null,"i.shape","i.shape",-33479013),1.5], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"set","set",304602554),new cljs.core.Keyword(null,"d","d",1972142424),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"-","-",-2112348439),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"abs","abs",-246026477),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"-","-",-2112348439),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"length","length",588987862),new cljs.core.Keyword(null,"i.uv","i.uv",-363960838)], null),0.7], null)], null),0.3], null)], null)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"let","let",-1282412701),new cljs.core.Keyword(null,"aa","aa",1986357152),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"fwidth","fwidth",180611671),new cljs.core.Keyword(null,"d","d",1972142424)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"let","let",-1282412701),new cljs.core.Keyword(null,"cov","cov",-803544400),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"-","-",-2112348439),1.0,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"smoothstep","smoothstep",968032787),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"-","-",-2112348439),new cljs.core.Keyword(null,"aa","aa",1986357152)], null),new cljs.core.Keyword(null,"aa","aa",1986357152),new cljs.core.Keyword(null,"d","d",1972142424)], null)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"if","if",-458814265),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"<=","<=",-395636158),new cljs.core.Keyword(null,"cov","cov",-803544400),0.0], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["discard"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"vec4","vec4",631182126),new cljs.core.Keyword(null,"i.color.rgb","i.color.rgb",-1112719098),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"*","*",-1294732318),new cljs.core.Keyword(null,"i.color.a","i.color.a",-1978848097),new cljs.core.Keyword(null,"cov","cov",-803544400)], null)], null)], null)], 0))], 0));
});

//# sourceMappingURL=kami.sprite_gpu.js.map
