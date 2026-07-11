goog.provide('kami.modeling');
/**
 * Construct a mesh from vertex positions and polygon index vectors.
 */
kami.modeling.mesh = (function kami$modeling$mesh(vertices,faces){
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword("mesh","vertices","mesh/vertices",2013367832),cljs.core.vec(vertices),new cljs.core.Keyword("mesh","faces","mesh/faces",-521361119),cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.vec,faces)], null);
});
kami.modeling.valid_mesh_QMARK_ = (function kami$modeling$valid_mesh_QMARK_(p__19960){
var map__19961 = p__19960;
var map__19961__$1 = cljs.core.__destructure_map(map__19961);
var vertices = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19961__$1,new cljs.core.Keyword("mesh","vertices","mesh/vertices",2013367832));
var faces = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19961__$1,new cljs.core.Keyword("mesh","faces","mesh/faces",-521361119));
return ((cljs.core.vector_QMARK_(vertices)) && (((cljs.core.vector_QMARK_(faces)) && (((cljs.core.every_QMARK_((function (p1__19955_SHARP_){
return ((cljs.core.vector_QMARK_(p1__19955_SHARP_)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((3),cljs.core.count(p1__19955_SHARP_))) && (cljs.core.every_QMARK_(cljs.core.number_QMARK_,p1__19955_SHARP_)))));
}),vertices)) && (cljs.core.every_QMARK_((function (face){
return (((cljs.core.count(face) >= (3))) && (cljs.core.every_QMARK_((function (i){
return ((cljs.core.integer_QMARK_(i)) && (((((0) <= i)) && ((i <= (cljs.core.count(vertices) - (1)))))));
}),face)));
}),faces)))))));
});
/**
 * A counter-clockwise quad in the XY plane.
 */
kami.modeling.quad = (function kami$modeling$quad(width,height){
var x = (width / 2.0);
var y = (height / 2.0);
return kami.modeling.mesh(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(- x),(- y),0.0], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [x,(- y),0.0], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [x,y,0.0], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(- x),y,0.0], null)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(1),(2),(3)], null)], null));
});
kami.modeling.cube = (function kami$modeling$cube(size){
var h = (size / 2.0);
return kami.modeling.mesh(new cljs.core.PersistentVector(null, 8, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(- h),(- h),(- h)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [h,(- h),(- h)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [h,h,(- h)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(- h),h,(- h)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(- h),(- h),h], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [h,(- h),h], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [h,h,h], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(- h),h,h], null)], null),new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(3),(2),(1)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(4),(5),(6),(7)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(1),(5),(4)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(3),(7),(6),(2)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(4),(7),(3)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(1),(2),(6),(5)], null)], null));
});
kami.modeling.face_center = (function kami$modeling$face_center(p__19973,face_index){
var map__19974 = p__19973;
var map__19974__$1 = cljs.core.__destructure_map(map__19974);
var vertices = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19974__$1,new cljs.core.Keyword("mesh","vertices","mesh/vertices",2013367832));
var faces = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19974__$1,new cljs.core.Keyword("mesh","faces","mesh/faces",-521361119));
var face = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(faces,face_index);
var n = cljs.core.count(face);
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (p1__19972_SHARP_){
return (p1__19972_SHARP_ / n);
}),cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (a,i){
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$3(cljs.core._PLUS_,a,cljs.core.nth.cljs$core$IFn$_invoke$arity$2(vertices,i));
}),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(0),(0)], null),face));
});
kami.modeling.transform_face = (function kami$modeling$transform_face(m,face_index,f){
var ids = cljs.core.set(cljs.core.nth.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("mesh","faces","mesh/faces",-521361119).cljs$core$IFn$_invoke$arity$1(m),face_index));
return cljs.core.update.cljs$core$IFn$_invoke$arity$3(m,new cljs.core.Keyword("mesh","vertices","mesh/vertices",2013367832),(function (p1__19975_SHARP_){
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$3((function (i,p){
if(cljs.core.truth_((ids.cljs$core$IFn$_invoke$arity$1 ? ids.cljs$core$IFn$_invoke$arity$1(i) : ids.call(null, i)))){
return (f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(p) : f.call(null, p));
} else {
return p;
}
}),cljs.core.range.cljs$core$IFn$_invoke$arity$0(),p1__19975_SHARP_);
}));
});
kami.modeling.translate_face = (function kami$modeling$translate_face(m,face_index,delta){
return kami.modeling.transform_face(m,face_index,(function (p1__19976_SHARP_){
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$3(cljs.core._PLUS_,p1__19976_SHARP_,delta);
}));
});
kami.modeling.scale_face = (function kami$modeling$scale_face(m,face_index,factor){
var c = kami.modeling.face_center(m,face_index);
return kami.modeling.transform_face(m,face_index,(function (p1__19977_SHARP_){
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$3(cljs.core._PLUS_,c,cljs.core.mapv.cljs$core$IFn$_invoke$arity$3((function (x,y){
return (factor * (x - y));
}),p1__19977_SHARP_,c));
}));
});
/**
 * Inset a polygon toward its center. Replaces the selected polygon with an
 *   inner cap at the same face index and adds one ring quad per edge.
 */
kami.modeling.inset_face = (function kami$modeling$inset_face(p__19980,face_index,factor){
var map__19981 = p__19980;
var map__19981__$1 = cljs.core.__destructure_map(map__19981);
var m = map__19981__$1;
var vertices = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19981__$1,new cljs.core.Keyword("mesh","vertices","mesh/vertices",2013367832));
var faces = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19981__$1,new cljs.core.Keyword("mesh","faces","mesh/faces",-521361119));
if(((((0) < factor)) && ((factor < (1))))){
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("inset factor must be between 0 and 1",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"factor","factor",-2103172748),factor], null));
}

var face = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(faces,face_index);
var c = kami.modeling.face_center(m,face_index);
var base = cljs.core.count(vertices);
var inner = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (i){
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$3(cljs.core._PLUS_,c,cljs.core.mapv.cljs$core$IFn$_invoke$arity$3((function (x,y){
return (factor * (x - y));
}),cljs.core.nth.cljs$core$IFn$_invoke$arity$2(vertices,i),c));
}),face);
var inner_ids = cljs.core.vec(cljs.core.range.cljs$core$IFn$_invoke$arity$2(base,(base + cljs.core.count(face))));
var nexts = cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core.rest(face),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.first(face)], null));
var inexts = cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core.rest(inner_ids),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.first(inner_ids)], null));
var ring = cljs.core.mapv.cljs$core$IFn$_invoke$arity$variadic(cljs.core.vector,face,nexts,inexts,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([inner_ids], 0));
return kami.modeling.mesh(cljs.core.into.cljs$core$IFn$_invoke$arity$2(vertices,inner),cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(faces,face_index,inner_ids),ring));
});
kami.modeling.delete_face = (function kami$modeling$delete_face(m,face_index){
return cljs.core.update.cljs$core$IFn$_invoke$arity$3(m,new cljs.core.Keyword("mesh","faces","mesh/faces",-521361119),(function (p1__19986_SHARP_){
return cljs.core.vec(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core.subvec.cljs$core$IFn$_invoke$arity$3(p1__19986_SHARP_,(0),face_index),cljs.core.subvec.cljs$core$IFn$_invoke$arity$2(p1__19986_SHARP_,(face_index + (1)))));
}));
});
kami.modeling.triangulate_face_indices = (function kami$modeling$triangulate_face_indices(face){
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (i){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.first(face),cljs.core.nth.cljs$core$IFn$_invoke$arity$2(face,i),cljs.core.nth.cljs$core$IFn$_invoke$arity$2(face,(i + (1)))], null);
}),cljs.core.range.cljs$core$IFn$_invoke$arity$2((1),(cljs.core.count(face) - (1))));
});
kami.modeling.vsub = (function kami$modeling$vsub(a,b){
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$3(cljs.core._,a,b);
});
kami.modeling.cross = (function kami$modeling$cross(p__19989,p__19990){
var vec__19991 = p__19989;
var ax = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19991,(0),null);
var ay = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19991,(1),null);
var az = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19991,(2),null);
var vec__19994 = p__19990;
var bx = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19994,(0),null);
var by = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19994,(1),null);
var bz = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19994,(2),null);
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [((ay * bz) - (az * by)),((az * bx) - (ax * bz)),((ax * by) - (ay * bx))], null);
});
kami.modeling.dot = (function kami$modeling$dot(a,b){
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$2(cljs.core._PLUS_,cljs.core.map.cljs$core$IFn$_invoke$arity$3(cljs.core._STAR_,a,b));
});
kami.modeling.abs_value = (function kami$modeling$abs_value(x){
return Math.abs(x);
});
kami.modeling.ray_triangle = (function kami$modeling$ray_triangle(origin,direction,a,b,c){
var e1 = kami.modeling.vsub(b,a);
var e2 = kami.modeling.vsub(c,a);
var h = kami.modeling.cross(direction,e2);
var det = kami.modeling.dot(e1,h);
if((kami.modeling.abs_value(det) > 1.0E-8)){
var inv = ((1) / det);
var s = kami.modeling.vsub(origin,a);
var u = (inv * kami.modeling.dot(s,h));
var q = kami.modeling.cross(s,e1);
var v = (inv * kami.modeling.dot(direction,q));
var t = (inv * kami.modeling.dot(e2,q));
if(((((((0) <= u)) && ((u <= (1))))) && (((((0) <= v)) && (((((u + v) <= (1))) && ((t > (0))))))))){
return t;
} else {
return null;
}
} else {
return null;
}
});
/**
 * Return the nearest polygon index intersected by a world-space ray.
 */
kami.modeling.pick_face = (function kami$modeling$pick_face(p__19999,origin,direction){
var map__20000 = p__19999;
var map__20000__$1 = cljs.core.__destructure_map(map__20000);
var vertices = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20000__$1,new cljs.core.Keyword("mesh","vertices","mesh/vertices",2013367832));
var faces = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20000__$1,new cljs.core.Keyword("mesh","faces","mesh/faces",-521361119));
return cljs.core.ffirst(cljs.core.sort_by.cljs$core$IFn$_invoke$arity$2(cljs.core.second,cljs.core.remove.cljs$core$IFn$_invoke$arity$2(cljs.core.nil_QMARK_,cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2((function (fi,face){
var temp__5825__auto__ = cljs.core.some((function (p1__19998_SHARP_){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$4(kami.modeling.ray_triangle,origin,direction,cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(vertices,p1__19998_SHARP_));
}),kami.modeling.triangulate_face_indices(face));
if(cljs.core.truth_(temp__5825__auto__)){
var t = temp__5825__auto__;
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [fi,t], null);
} else {
return null;
}
}),faces))));
});
/**
 * Extrude one polygon face along `delta` [x y z]. The original face remains
 *   as the bottom cap; the returned mesh has a new top cap and one quad per edge.
 */
kami.modeling.extrude_face = (function kami$modeling$extrude_face(p__20001,face_index,p__20002){
var map__20005 = p__20001;
var map__20005__$1 = cljs.core.__destructure_map(map__20005);
var m = map__20005__$1;
var vertices = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20005__$1,new cljs.core.Keyword("mesh","vertices","mesh/vertices",2013367832));
var faces = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20005__$1,new cljs.core.Keyword("mesh","faces","mesh/faces",-521361119));
var vec__20006 = p__20002;
var dx = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20006,(0),null);
var dy = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20006,(1),null);
var dz = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20006,(2),null);
if(kami.modeling.valid_mesh_QMARK_(m)){
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("invalid mesh",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"mesh","mesh",456320595),m], null));
}

var face = cljs.core.get.cljs$core$IFn$_invoke$arity$2(faces,face_index);
if(cljs.core.truth_(face)){
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("face index out of bounds",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"face-index","face-index",2015445225),face_index], null));
}

var base = cljs.core.count(vertices);
var top = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (i){
var vec__20011 = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(vertices,i);
var x = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20011,(0),null);
var y = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20011,(1),null);
var z = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20011,(2),null);
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(x + dx),(y + dy),(z + dz)], null);
}),face);
var top_indices = cljs.core.vec(cljs.core.range.cljs$core$IFn$_invoke$arity$2(base,(base + cljs.core.count(face))));
var sides = cljs.core.mapv.cljs$core$IFn$_invoke$arity$variadic((function (a,b,c,d){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [a,b,c,d], null);
}),face,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core.rest(face),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.first(face)], null)),cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core.rest(top_indices),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.first(top_indices)], null)),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([top_indices], 0));
return kami.modeling.mesh(cljs.core.into.cljs$core$IFn$_invoke$arity$2(vertices,top),cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.vec(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core.subvec.cljs$core$IFn$_invoke$arity$3(faces,(0),face_index),cljs.core.subvec.cljs$core$IFn$_invoke$arity$2(faces,(face_index + (1))))),cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [top_indices], null),sides)));
});
kami.modeling.object = (function kami$modeling$object(var_args){
var G__20018 = arguments.length;
switch (G__20018) {
case 3:
return kami.modeling.object.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return kami.modeling.object.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(kami.modeling.object.cljs$core$IFn$_invoke$arity$3 = (function (id,name,object_mesh){
return kami.modeling.object.cljs$core$IFn$_invoke$arity$4(id,name,object_mesh,cljs.core.PersistentArrayMap.EMPTY);
}));

(kami.modeling.object.cljs$core$IFn$_invoke$arity$4 = (function (id,name,object_mesh,p__20022){
var map__20023 = p__20022;
var map__20023__$1 = cljs.core.__destructure_map(map__20023);
var translation = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__20023__$1,new cljs.core.Keyword(null,"translation","translation",-701621547),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(0),(0)], null));
var rotation = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__20023__$1,new cljs.core.Keyword(null,"rotation","rotation",-1728051644),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(0),(0)], null));
var scale = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__20023__$1,new cljs.core.Keyword(null,"scale","scale",-230427353),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(1),(1),(1)], null));
var parent = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20023__$1,new cljs.core.Keyword(null,"parent","parent",-878878779));
var visible_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__20023__$1,new cljs.core.Keyword(null,"visible?","visible?",2129863715),true);
if(kami.modeling.valid_mesh_QMARK_(object_mesh)){
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("object requires a valid mesh",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"id","id",-1388402092),id], null));
}

return cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword("object","visible?","object/visible?",1173537124),new cljs.core.Keyword("object","rotation","object/rotation",-603918971),new cljs.core.Keyword("object","parent","object/parent",-2036564858),new cljs.core.Keyword("object","scale","object/scale",-1354482198),new cljs.core.Keyword("object","name","object/name",719647594),new cljs.core.Keyword("object","modifiers","object/modifiers",-637449455),new cljs.core.Keyword("object","mesh","object/mesh",-634190444),new cljs.core.Keyword("object","id","object/id",-432056555),new cljs.core.Keyword("object","translation","object/translation",254639254)],[visible_QMARK_,cljs.core.vec(rotation),parent,cljs.core.vec(scale),name,cljs.core.PersistentVector.EMPTY,object_mesh,id,cljs.core.vec(translation)]);
}));

(kami.modeling.object.cljs$lang$maxFixedArity = 4);

kami.modeling.scene = (function kami$modeling$scene(var_args){
var G__20029 = arguments.length;
switch (G__20029) {
case 0:
return kami.modeling.scene.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return kami.modeling.scene.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(kami.modeling.scene.cljs$core$IFn$_invoke$arity$0 = (function (){
return kami.modeling.scene.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentVector.EMPTY);
}));

(kami.modeling.scene.cljs$core$IFn$_invoke$arity$1 = (function (objects){
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("scene","objects","scene/objects",1854528562),cljs.core.vec(objects)], null);
}));

(kami.modeling.scene.cljs$lang$maxFixedArity = 1);

kami.modeling.find_object = (function kami$modeling$find_object(s,id){
return cljs.core.first(cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p1__20030_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(id,new cljs.core.Keyword("object","id","object/id",-432056555).cljs$core$IFn$_invoke$arity$1(p1__20030_SHARP_));
}),new cljs.core.Keyword("scene","objects","scene/objects",1854528562).cljs$core$IFn$_invoke$arity$1(s)));
});
kami.modeling.add_object = (function kami$modeling$add_object(s,o){
if(cljs.core.truth_(kami.modeling.find_object(s,new cljs.core.Keyword("object","id","object/id",-432056555).cljs$core$IFn$_invoke$arity$1(o)))){
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("object id already exists",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"id","id",-1388402092),new cljs.core.Keyword("object","id","object/id",-432056555).cljs$core$IFn$_invoke$arity$1(o)], null));
} else {
}

return cljs.core.update.cljs$core$IFn$_invoke$arity$4(s,new cljs.core.Keyword("scene","objects","scene/objects",1854528562),cljs.core.conj,o);
});
kami.modeling.update_object = (function kami$modeling$update_object(var_args){
var args__5732__auto__ = [];
var len__5726__auto___20116 = arguments.length;
var i__5727__auto___20117 = (0);
while(true){
if((i__5727__auto___20117 < len__5726__auto___20116)){
args__5732__auto__.push((arguments[i__5727__auto___20117]));

var G__20118 = (i__5727__auto___20117 + (1));
i__5727__auto___20117 = G__20118;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((3) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((3)),(0),null)):null);
return kami.modeling.update_object.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__5733__auto__);
});

(kami.modeling.update_object.cljs$core$IFn$_invoke$arity$variadic = (function (s,id,f,args){
if(cljs.core.truth_(kami.modeling.find_object(s,id))){
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("object not found",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"id","id",-1388402092),id], null));
}

return cljs.core.update.cljs$core$IFn$_invoke$arity$3(s,new cljs.core.Keyword("scene","objects","scene/objects",1854528562),(function (p1__20031_SHARP_){
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (o){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(id,new cljs.core.Keyword("object","id","object/id",-432056555).cljs$core$IFn$_invoke$arity$1(o))){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$3(f,o,args);
} else {
return o;
}
}),p1__20031_SHARP_);
}));
}));

(kami.modeling.update_object.cljs$lang$maxFixedArity = (3));

/** @this {Function} */
(kami.modeling.update_object.cljs$lang$applyTo = (function (seq20033){
var G__20034 = cljs.core.first(seq20033);
var seq20033__$1 = cljs.core.next(seq20033);
var G__20035 = cljs.core.first(seq20033__$1);
var seq20033__$2 = cljs.core.next(seq20033__$1);
var G__20036 = cljs.core.first(seq20033__$2);
var seq20033__$3 = cljs.core.next(seq20033__$2);
var self__5711__auto__ = this;
return self__5711__auto__.cljs$core$IFn$_invoke$arity$variadic(G__20034,G__20035,G__20036,seq20033__$3);
}));

kami.modeling.delete_object = (function kami$modeling$delete_object(s,id){
return cljs.core.update.cljs$core$IFn$_invoke$arity$3(cljs.core.update.cljs$core$IFn$_invoke$arity$3(s,new cljs.core.Keyword("scene","objects","scene/objects",1854528562),(function (p1__20037_SHARP_){
return cljs.core.vec(cljs.core.remove.cljs$core$IFn$_invoke$arity$2((function (o){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(id,new cljs.core.Keyword("object","id","object/id",-432056555).cljs$core$IFn$_invoke$arity$1(o));
}),p1__20037_SHARP_));
})),new cljs.core.Keyword("scene","objects","scene/objects",1854528562),(function (p1__20038_SHARP_){
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (o){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(id,new cljs.core.Keyword("object","parent","object/parent",-2036564858).cljs$core$IFn$_invoke$arity$1(o))){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(o,new cljs.core.Keyword("object","parent","object/parent",-2036564858),null);
} else {
return o;
}
}),p1__20038_SHARP_);
}));
});
kami.modeling.duplicate_object = (function kami$modeling$duplicate_object(s,source_id,new_id){
var source = kami.modeling.find_object(s,source_id);
if(cljs.core.truth_(source)){
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("source object not found",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"id","id",-1388402092),source_id], null));
}

return kami.modeling.add_object(s,cljs.core.update.cljs$core$IFn$_invoke$arity$3(cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(source,new cljs.core.Keyword("object","id","object/id",-432056555),new_id,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword("object","name","object/name",719647594),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword("object","name","object/name",719647594).cljs$core$IFn$_invoke$arity$1(source))," Copy"].join('')], 0)),new cljs.core.Keyword("object","translation","object/translation",254639254),(function (p1__20040_SHARP_){
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$3(cljs.core._PLUS_,p1__20040_SHARP_,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [0.5,0.5,(0)], null));
})));
});
kami.modeling.set_object_transform = (function kami$modeling$set_object_transform(o,p__20041){
var map__20042 = p__20041;
var map__20042__$1 = cljs.core.__destructure_map(map__20042);
var translation = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20042__$1,new cljs.core.Keyword(null,"translation","translation",-701621547));
var rotation = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20042__$1,new cljs.core.Keyword(null,"rotation","rotation",-1728051644));
var scale = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20042__$1,new cljs.core.Keyword(null,"scale","scale",-230427353));
var G__20043 = o;
var G__20043__$1 = (cljs.core.truth_(translation)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__20043,new cljs.core.Keyword("object","translation","object/translation",254639254),cljs.core.vec(translation)):G__20043);
var G__20043__$2 = (cljs.core.truth_(rotation)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__20043__$1,new cljs.core.Keyword("object","rotation","object/rotation",-603918971),cljs.core.vec(rotation)):G__20043__$1);
if(cljs.core.truth_(scale)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__20043__$2,new cljs.core.Keyword("object","scale","object/scale",-1354482198),cljs.core.vec(scale));
} else {
return G__20043__$2;
}
});
kami.modeling.sin_value = (function kami$modeling$sin_value(x){
return Math.sin(x);
});
kami.modeling.cos_value = (function kami$modeling$cos_value(x){
return Math.cos(x);
});
/**
 * Apply object scale, XYZ Euler rotation (radians), then translation.
 */
kami.modeling.transform_point = (function kami$modeling$transform_point(point,p__20044){
var map__20045 = p__20044;
var map__20045__$1 = cljs.core.__destructure_map(map__20045);
var translation = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20045__$1,new cljs.core.Keyword("object","translation","object/translation",254639254));
var rotation = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20045__$1,new cljs.core.Keyword("object","rotation","object/rotation",-603918971));
var scale = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20045__$1,new cljs.core.Keyword("object","scale","object/scale",-1354482198));
var vec__20046 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$3(cljs.core._STAR_,point,scale);
var x = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20046,(0),null);
var y = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20046,(1),null);
var z = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20046,(2),null);
var vec__20049 = rotation;
var rx = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20049,(0),null);
var ry = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20049,(1),null);
var rz = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20049,(2),null);
var cx = kami.modeling.cos_value(rx);
var sx = kami.modeling.sin_value(rx);
var cy = kami.modeling.cos_value(ry);
var sy = kami.modeling.sin_value(ry);
var cz = kami.modeling.cos_value(rz);
var sz = kami.modeling.sin_value(rz);
var vec__20052 = new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [x,((y * cx) - (z * sx)),((y * sx) + (z * cx))], null);
var x__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20052,(0),null);
var y__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20052,(1),null);
var z__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20052,(2),null);
var vec__20055 = new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [((x__$1 * cy) + (z__$1 * sy)),y__$1,(((- x__$1) * sy) + (z__$1 * cy))], null);
var x__$2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20055,(0),null);
var y__$2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20055,(1),null);
var z__$2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20055,(2),null);
var vec__20058 = new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [((x__$2 * cz) - (y__$2 * sz)),((x__$2 * sz) + (y__$2 * cz)),z__$2], null);
var x__$3 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20058,(0),null);
var y__$3 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20058,(1),null);
var z__$3 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20058,(2),null);
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$3(cljs.core._PLUS_,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [x__$3,y__$3,z__$3], null),translation);
});
kami.modeling.modifier = (function kami$modeling$modifier(var_args){
var G__20062 = arguments.length;
switch (G__20062) {
case 1:
return kami.modeling.modifier.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return kami.modeling.modifier.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(kami.modeling.modifier.cljs$core$IFn$_invoke$arity$1 = (function (kind){
return kami.modeling.modifier.cljs$core$IFn$_invoke$arity$2(kind,cljs.core.PersistentArrayMap.EMPTY);
}));

(kami.modeling.modifier.cljs$core$IFn$_invoke$arity$2 = (function (kind,options){
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword("modifier","id","modifier/id",-1089554595),cljs.core.random_uuid(),new cljs.core.Keyword("modifier","kind","modifier/kind",1915708240),kind,new cljs.core.Keyword("modifier","enabled?","modifier/enabled?",1892336696),true,new cljs.core.Keyword("modifier","options","modifier/options",-509583934),options], null);
}));

(kami.modeling.modifier.cljs$lang$maxFixedArity = 2);

kami.modeling.add_modifier = (function kami$modeling$add_modifier(o,mod){
return cljs.core.update.cljs$core$IFn$_invoke$arity$4(o,new cljs.core.Keyword("object","modifiers","object/modifiers",-637449455),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(cljs.core.conj,cljs.core.PersistentVector.EMPTY),mod);
});
kami.modeling.remove_modifier = (function kami$modeling$remove_modifier(o,modifier_id){
return cljs.core.update.cljs$core$IFn$_invoke$arity$3(o,new cljs.core.Keyword("object","modifiers","object/modifiers",-637449455),(function (p1__20064_SHARP_){
return cljs.core.vec(cljs.core.remove.cljs$core$IFn$_invoke$arity$2((function (m){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(modifier_id,new cljs.core.Keyword("modifier","id","modifier/id",-1089554595).cljs$core$IFn$_invoke$arity$1(m));
}),p1__20064_SHARP_));
}));
});
kami.modeling.move_modifier = (function kami$modeling$move_modifier(o,modifier_id,new_index){
var mods = new cljs.core.Keyword("object","modifiers","object/modifiers",-637449455).cljs$core$IFn$_invoke$arity$1(o);
var target = cljs.core.first(cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p1__20065_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(modifier_id,new cljs.core.Keyword("modifier","id","modifier/id",-1089554595).cljs$core$IFn$_invoke$arity$1(p1__20065_SHARP_));
}),mods));
var remaining = cljs.core.vec(cljs.core.remove.cljs$core$IFn$_invoke$arity$2((function (p1__20066_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(modifier_id,new cljs.core.Keyword("modifier","id","modifier/id",-1089554595).cljs$core$IFn$_invoke$arity$1(p1__20066_SHARP_));
}),mods));
var index = (function (){var x__5087__auto__ = (0);
var y__5088__auto__ = (function (){var x__5090__auto__ = new_index;
var y__5091__auto__ = cljs.core.count(remaining);
return ((x__5090__auto__ < y__5091__auto__) ? x__5090__auto__ : y__5091__auto__);
})();
return ((x__5087__auto__ > y__5088__auto__) ? x__5087__auto__ : y__5088__auto__);
})();
if(cljs.core.truth_(target)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(o,new cljs.core.Keyword("object","modifiers","object/modifiers",-637449455),cljs.core.vec(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core.subvec.cljs$core$IFn$_invoke$arity$3(remaining,(0),index),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [target], null),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.subvec.cljs$core$IFn$_invoke$arity$2(remaining,index)], 0))));
} else {
return o;
}
});
kami.modeling.mirror_mesh = (function kami$modeling$mirror_mesh(m,axis){
var axis_index = (function (){var fexpr__20068 = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"x","x",2099068185),(0),new cljs.core.Keyword(null,"y","y",-1757859776),(1),new cljs.core.Keyword(null,"z","z",-789527183),(2)], null);
return (fexpr__20068.cljs$core$IFn$_invoke$arity$1 ? fexpr__20068.cljs$core$IFn$_invoke$arity$1(axis) : fexpr__20068.call(null, axis));
})();
var n = cljs.core.count(new cljs.core.Keyword("mesh","vertices","mesh/vertices",2013367832).cljs$core$IFn$_invoke$arity$1(m));
var mirrored = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (p){
return cljs.core.update.cljs$core$IFn$_invoke$arity$3(p,axis_index,cljs.core._);
}),new cljs.core.Keyword("mesh","vertices","mesh/vertices",2013367832).cljs$core$IFn$_invoke$arity$1(m));
var faces = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (f){
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (p1__20067_SHARP_){
return (n + p1__20067_SHARP_);
}),cljs.core.reverse(f));
}),new cljs.core.Keyword("mesh","faces","mesh/faces",-521361119).cljs$core$IFn$_invoke$arity$1(m));
return kami.modeling.mesh(cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("mesh","vertices","mesh/vertices",2013367832).cljs$core$IFn$_invoke$arity$1(m),mirrored),cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("mesh","faces","mesh/faces",-521361119).cljs$core$IFn$_invoke$arity$1(m),faces));
});
kami.modeling.array_mesh = (function kami$modeling$array_mesh(m,copies,offset){
if((copies < (1))){
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("array count must be positive",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"count","count",2139924085),copies], null));
} else {
}

var n = cljs.core.count(new cljs.core.Keyword("mesh","vertices","mesh/vertices",2013367832).cljs$core$IFn$_invoke$arity$1(m));
return kami.modeling.mesh(cljs.core.vec(cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic((function (copy){
return cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p){
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$3(cljs.core._PLUS_,p,cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (p1__20069_SHARP_){
return (copy * p1__20069_SHARP_);
}),offset));
}),new cljs.core.Keyword("mesh","vertices","mesh/vertices",2013367832).cljs$core$IFn$_invoke$arity$1(m));
}),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.range.cljs$core$IFn$_invoke$arity$1(copies)], 0))),cljs.core.vec(cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic((function (copy){
return cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (f){
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (p1__20070_SHARP_){
return ((copy * n) + p1__20070_SHARP_);
}),f);
}),new cljs.core.Keyword("mesh","faces","mesh/faces",-521361119).cljs$core$IFn$_invoke$arity$1(m));
}),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.range.cljs$core$IFn$_invoke$arity$1(copies)], 0))));
});
/**
 * One linear Catmull-Clark topology step: shared edge points plus face
 *   centers, producing one quad per original face corner.
 */
kami.modeling.subdivide_mesh = (function kami$modeling$subdivide_mesh(m){
var vertices = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword("mesh","vertices","mesh/vertices",2013367832).cljs$core$IFn$_invoke$arity$1(m));
var edge_ids = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var midpoint = (function (a,b){
var edge = (((a < b))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [a,b], null):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [b,a], null));
var temp__5823__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(edge_ids),edge);
if(cljs.core.truth_(temp__5823__auto__)){
var id = temp__5823__auto__;
return id;
} else {
var id = cljs.core.count(cljs.core.deref(vertices));
var p = cljs.core.mapv.cljs$core$IFn$_invoke$arity$3((function (p1__20085_SHARP_,p2__20086_SHARP_){
return ((p1__20085_SHARP_ + p2__20086_SHARP_) / (2));
}),cljs.core.nth.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(vertices),a),cljs.core.nth.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(vertices),b));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(vertices,cljs.core.conj,p);

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(edge_ids,cljs.core.assoc,edge,id);

return id;
}
});
var faces = cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic((function (p__20091){
var vec__20092 = p__20091;
var face_index = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20092,(0),null);
var face = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20092,(1),null);
var center_id = cljs.core.count(cljs.core.deref(vertices));
var _ = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(vertices,cljs.core.conj,kami.modeling.face_center(m,face_index));
var n = cljs.core.count(face);
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (i){
var prev = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(face,cljs.core.mod((i - (1)),n));
var current = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(face,i);
var next = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(face,cljs.core.mod((i + (1)),n));
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [current,midpoint(current,next),center_id,midpoint(prev,current)], null);
}),cljs.core.range.cljs$core$IFn$_invoke$arity$1(n));
}),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2(cljs.core.vector,new cljs.core.Keyword("mesh","faces","mesh/faces",-521361119).cljs$core$IFn$_invoke$arity$1(m))], 0));
return kami.modeling.mesh(cljs.core.deref(vertices),cljs.core.vec(faces));
});
kami.modeling.apply_modifier = (function kami$modeling$apply_modifier(m,p__20096){
var map__20097 = p__20096;
var map__20097__$1 = cljs.core.__destructure_map(map__20097);
var kind = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20097__$1,new cljs.core.Keyword("modifier","kind","modifier/kind",1915708240));
var options = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20097__$1,new cljs.core.Keyword("modifier","options","modifier/options",-509583934));
var enabled_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20097__$1,new cljs.core.Keyword("modifier","enabled?","modifier/enabled?",1892336696));
if(enabled_QMARK_ === false){
return m;
} else {
var G__20098 = kind;
var G__20098__$1 = (((G__20098 instanceof cljs.core.Keyword))?G__20098.fqn:null);
switch (G__20098__$1) {
case "mirror":
return kami.modeling.mirror_mesh(m,new cljs.core.Keyword(null,"axis","axis",-1215390822).cljs$core$IFn$_invoke$arity$2(options,new cljs.core.Keyword(null,"x","x",2099068185)));

break;
case "subdivision":
return cljs.core.nth.cljs$core$IFn$_invoke$arity$2(cljs.core.iterate(kami.modeling.subdivide_mesh,m),new cljs.core.Keyword(null,"levels","levels",-950747887).cljs$core$IFn$_invoke$arity$2(options,(1)));

break;
case "array":
return kami.modeling.array_mesh(m,new cljs.core.Keyword(null,"count","count",2139924085).cljs$core$IFn$_invoke$arity$2(options,(2)),new cljs.core.Keyword(null,"offset","offset",296498311).cljs$core$IFn$_invoke$arity$2(options,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [2.5,(0),(0)], null)));

break;
default:
return m;

}
}
});
kami.modeling.evaluated_object_mesh = (function kami$modeling$evaluated_object_mesh(o){
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(kami.modeling.apply_modifier,new cljs.core.Keyword("object","mesh","object/mesh",-634190444).cljs$core$IFn$_invoke$arity$1(o),new cljs.core.Keyword("object","modifiers","object/modifiers",-637449455).cljs$core$IFn$_invoke$arity$1(o));
});
/**
 * Flatten visible scene objects into one indexed mesh for rendering/export.
 */
kami.modeling.scene_mesh = (function kami$modeling$scene_mesh(s){
var objects = cljs.core.filter.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("object","visible?","object/visible?",1173537124),new cljs.core.Keyword("scene","objects","scene/objects",1854528562).cljs$core$IFn$_invoke$arity$1(s));
var vertices = cljs.core.PersistentVector.EMPTY;
var faces = cljs.core.PersistentVector.EMPTY;
while(true){
var temp__5823__auto__ = cljs.core.first(objects);
if(cljs.core.truth_(temp__5823__auto__)){
var o = temp__5823__auto__;
var m = kami.modeling.evaluated_object_mesh(o);
var offset = cljs.core.count(vertices);
var G__20147 = cljs.core.rest(objects);
var G__20148 = cljs.core.into.cljs$core$IFn$_invoke$arity$2(vertices,cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (objects,vertices,faces,m,offset,o,temp__5823__auto__){
return (function (p1__20099_SHARP_){
return kami.modeling.transform_point(p1__20099_SHARP_,o);
});})(objects,vertices,faces,m,offset,o,temp__5823__auto__))
,new cljs.core.Keyword("mesh","vertices","mesh/vertices",2013367832).cljs$core$IFn$_invoke$arity$1(m)));
var G__20149 = cljs.core.into.cljs$core$IFn$_invoke$arity$2(faces,cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (objects,vertices,faces,m,offset,o,temp__5823__auto__){
return (function (p1__20100_SHARP_){
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(((function (objects,vertices,faces,m,offset,o,temp__5823__auto__){
return (function (i){
return (offset + i);
});})(objects,vertices,faces,m,offset,o,temp__5823__auto__))
,p1__20100_SHARP_);
});})(objects,vertices,faces,m,offset,o,temp__5823__auto__))
,new cljs.core.Keyword("mesh","faces","mesh/faces",-521361119).cljs$core$IFn$_invoke$arity$1(m)));
objects = G__20147;
vertices = G__20148;
faces = G__20149;
continue;
} else {
return kami.modeling.mesh(vertices,faces);
}
break;
}
});

//# sourceMappingURL=kami.modeling.js.map
