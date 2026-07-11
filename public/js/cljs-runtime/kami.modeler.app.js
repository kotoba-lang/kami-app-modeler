goog.provide('kami.modeler.app');
kami.modeler.app.cube = kami.modeling.cube((2));
kami.modeler.app.initial_scene = kami.modeling.scene.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [kami.modeling.object.cljs$core$IFn$_invoke$arity$3((1),"Cube",kami.modeler.app.cube)], null));
if((typeof kami !== 'undefined') && (typeof kami.modeler !== 'undefined') && (typeof kami.modeler.app !== 'undefined') && (typeof kami.modeler.app.state !== 'undefined')){
} else {
kami.modeler.app.state = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"selected-face","selected-face",868513473),new cljs.core.Keyword(null,"project-name","project-name",1486861539),new cljs.core.Keyword(null,"elevation","elevation",-1609348796),new cljs.core.Keyword(null,"future","future",1877842724),new cljs.core.Keyword(null,"revision","revision",-1350113114),new cljs.core.Keyword(null,"next-id","next-id",-224240762),new cljs.core.Keyword(null,"mode","mode",654403691),new cljs.core.Keyword(null,"history","history",-247395220),new cljs.core.Keyword(null,"selected-object","selected-object",-1414474738),new cljs.core.Keyword(null,"azimuth","azimuth",-165971535),new cljs.core.Keyword(null,"save-status","save-status",-2046612873),new cljs.core.Keyword(null,"distance","distance",-1671893894),new cljs.core.Keyword(null,"project-id","project-id",206449307),new cljs.core.Keyword(null,"profile","profile",-545963874),new cljs.core.Keyword(null,"scene","scene",1523800415)],[(1),"Untitled Model",0.45,cljs.core.PersistentVector.EMPTY,(0),(2),new cljs.core.Keyword(null,"edit","edit",-1641834166),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [kami.modeler.app.initial_scene], null),(1),0.7,new cljs.core.Keyword(null,"clean","clean",41534079),0.5,"untitled-model",new cljs.core.Keyword(null,"blender","blender",354426016),kami.modeler.app.initial_scene]));
}
if((typeof kami !== 'undefined') && (typeof kami.modeler !== 'undefined') && (typeof kami.modeler.app !== 'undefined') && (typeof kami.modeler.app.runtime !== 'undefined')){
} else {
kami.modeler.app.runtime = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(null);
}
kami.modeler.app.sub3 = (function kami$modeler$app$sub3(a,b){
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$3(cljs.core._,a,b);
});
kami.modeler.app.cross = (function kami$modeler$app$cross(p__21033,p__21034){
var vec__21035 = p__21033;
var ax = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__21035,(0),null);
var ay = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__21035,(1),null);
var az = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__21035,(2),null);
var vec__21038 = p__21034;
var bx = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__21038,(0),null);
var by = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__21038,(1),null);
var bz = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__21038,(2),null);
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [((ay * bz) - (az * by)),((az * bx) - (ax * bz)),((ax * by) - (ay * bx))], null);
});
kami.modeler.app.norm = (function kami$modeler$app$norm(v){
var l = (function (){var x__5087__auto__ = 1.0E-8;
var y__5088__auto__ = Math.hypot(cljs.core.nth.cljs$core$IFn$_invoke$arity$2(v,(0)),cljs.core.nth.cljs$core$IFn$_invoke$arity$2(v,(1)),cljs.core.nth.cljs$core$IFn$_invoke$arity$2(v,(2)));
return ((x__5087__auto__ > y__5088__auto__) ? x__5087__auto__ : y__5088__auto__);
})();
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (p1__21041_SHARP_){
return (p1__21041_SHARP_ / l);
}),v);
});
kami.modeler.app.render_geometry = (function kami$modeler$app$render_geometry(p__21043){
var map__21044 = p__21043;
var map__21044__$1 = cljs.core.__destructure_map(map__21044);
var vertices = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21044__$1,new cljs.core.Keyword("mesh","vertices","mesh/vertices",2013367832));
var faces = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21044__$1,new cljs.core.Keyword("mesh","faces","mesh/faces",-521361119));
var triangles = cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic((function (f){
return cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (i){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.first(f),cljs.core.nth.cljs$core$IFn$_invoke$arity$2(f,i),cljs.core.nth.cljs$core$IFn$_invoke$arity$2(f,(i + (1)))], null);
}),cljs.core.range.cljs$core$IFn$_invoke$arity$2((1),(cljs.core.count(f) - (1))));
}),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([faces], 0));
var positions = cljs.core.vec(cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic((function (tri){
return cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__21042_SHARP_){
return cljs.core.nth.cljs$core$IFn$_invoke$arity$2(vertices,p1__21042_SHARP_);
}),tri);
}),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([triangles], 0)));
var normals = cljs.core.vec(cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic((function (p__21045){
var vec__21046 = p__21045;
var a = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__21046,(0),null);
var b = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__21046,(1),null);
var c = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__21046,(2),null);
return cljs.core.repeat.cljs$core$IFn$_invoke$arity$2((3),kami.modeler.app.norm(kami.modeler.app.cross(kami.modeler.app.sub3(cljs.core.nth.cljs$core$IFn$_invoke$arity$2(vertices,b),cljs.core.nth.cljs$core$IFn$_invoke$arity$2(vertices,a)),kami.modeler.app.sub3(cljs.core.nth.cljs$core$IFn$_invoke$arity$2(vertices,c),cljs.core.nth.cljs$core$IFn$_invoke$arity$2(vertices,a)))));
}),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([triangles], 0)));
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"positions","positions",-1380538434),positions,new cljs.core.Keyword(null,"normals","normals",-1508109067),normals,new cljs.core.Keyword(null,"indices","indices",-1218138343),cljs.core.vec(cljs.core.range.cljs$core$IFn$_invoke$arity$1(cljs.core.count(positions)))], null);
});
kami.modeler.app.selected_object = (function kami$modeler$app$selected_object(){
return kami.modeling.find_object(new cljs.core.Keyword(null,"scene","scene",1523800415).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(kami.modeler.app.state)),new cljs.core.Keyword(null,"selected-object","selected-object",-1414474738).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(kami.modeler.app.state)));
});
kami.modeler.app.selected_mesh = (function kami$modeler$app$selected_mesh(){
return new cljs.core.Keyword("object","mesh","object/mesh",-634190444).cljs$core$IFn$_invoke$arity$1(kami.modeler.app.selected_object());
});
kami.modeler.app.refresh_mesh_BANG_ = (function kami$modeler$app$refresh_mesh_BANG_(){
var combined = kami.modeling.scene_mesh(new cljs.core.Keyword(null,"scene","scene",1523800415).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(kami.modeler.app.state)));
(window.__kami_modeler_mesh = cljs.core.clj__GT_js(combined));

var temp__5825__auto__ = cljs.core.deref(kami.modeler.app.runtime);
if(cljs.core.truth_(temp__5825__auto__)){
var map__21049 = temp__5825__auto__;
var map__21049__$1 = cljs.core.__destructure_map(map__21049);
var mesh_context = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21049__$1,new cljs.core.Keyword(null,"mesh-context","mesh-context",832369712));
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(kami.modeler.app.runtime,cljs.core.assoc,new cljs.core.Keyword(null,"buffers","buffers",471409492),kami.webgpu.mesh.upload_mesh_BANG_(mesh_context,kami.modeler.app.render_geometry(combined)));
} else {
return null;
}
});
kami.modeler.app.update_ui_BANG_ = (function kami$modeler$app$update_ui_BANG_(){
var map__21050 = cljs.core.deref(kami.modeler.app.state);
var map__21050__$1 = cljs.core.__destructure_map(map__21050);
var distance = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21050__$1,new cljs.core.Keyword(null,"distance","distance",-1671893894));
var profile = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21050__$1,new cljs.core.Keyword(null,"profile","profile",-545963874));
var scene = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21050__$1,new cljs.core.Keyword(null,"scene","scene",1523800415));
var selected_face = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21050__$1,new cljs.core.Keyword(null,"selected-face","selected-face",868513473));
var future = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21050__$1,new cljs.core.Keyword(null,"future","future",1877842724));
var revision = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21050__$1,new cljs.core.Keyword(null,"revision","revision",-1350113114));
var mode = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21050__$1,new cljs.core.Keyword(null,"mode","mode",654403691));
var history__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21050__$1,new cljs.core.Keyword(null,"history","history",-247395220));
var save_status = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21050__$1,new cljs.core.Keyword(null,"save-status","save-status",-2046612873));
var selected_id = new cljs.core.Keyword(null,"selected-object","selected-object",-1414474738).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(kami.modeler.app.state));
var mesh = kami.modeler.app.selected_mesh();
var object = kami.modeler.app.selected_object();
(document.getElementById("distanceValue").textContent = distance.toFixed((2)));

(document.getElementById("meshStats").textContent = [cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.count(new cljs.core.Keyword("scene","objects","scene/objects",1854528562).cljs$core$IFn$_invoke$arity$1(scene)))," objects \u00B7 ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.count(new cljs.core.Keyword("mesh","vertices","mesh/vertices",2013367832).cljs$core$IFn$_invoke$arity$1(kami.modeling.scene_mesh(scene))))," vertices"].join(''));

(document.getElementById("selection").textContent = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(mode,new cljs.core.Keyword(null,"edit","edit",-1641834166)))?(((!((selected_face == null))))?["Face ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(selected_face)," selected"].join(''):"No face selected"):["Object \u00B7 ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword("object","name","object/name",719647594).cljs$core$IFn$_invoke$arity$1(object))].join('')));

(document.getElementById("mode-toggle").textContent = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(mode,new cljs.core.Keyword(null,"edit","edit",-1641834166)))?"Edit Mode":"Object Mode"));

(document.getElementById("tool").textContent = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(mode,new cljs.core.Keyword(null,"edit","edit",-1641834166)))?"Face Select":"Object Select"));

var seq__21051_21163 = cljs.core.seq(new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, ["extrude","inset","scale","move","delete-face"], null));
var chunk__21052_21164 = null;
var count__21053_21165 = (0);
var i__21054_21166 = (0);
while(true){
if((i__21054_21166 < count__21053_21165)){
var id_21167 = chunk__21052_21164.cljs$core$IIndexed$_nth$arity$2(null, i__21054_21166);
(document.getElementById(id_21167).disabled = cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(mode,new cljs.core.Keyword(null,"edit","edit",-1641834166)));


var G__21168 = seq__21051_21163;
var G__21169 = chunk__21052_21164;
var G__21170 = count__21053_21165;
var G__21171 = (i__21054_21166 + (1));
seq__21051_21163 = G__21168;
chunk__21052_21164 = G__21169;
count__21053_21165 = G__21170;
i__21054_21166 = G__21171;
continue;
} else {
var temp__5825__auto___21172 = cljs.core.seq(seq__21051_21163);
if(temp__5825__auto___21172){
var seq__21051_21173__$1 = temp__5825__auto___21172;
if(cljs.core.chunked_seq_QMARK_(seq__21051_21173__$1)){
var c__5525__auto___21174 = cljs.core.chunk_first(seq__21051_21173__$1);
var G__21175 = cljs.core.chunk_rest(seq__21051_21173__$1);
var G__21176 = c__5525__auto___21174;
var G__21177 = cljs.core.count(c__5525__auto___21174);
var G__21178 = (0);
seq__21051_21163 = G__21175;
chunk__21052_21164 = G__21176;
count__21053_21165 = G__21177;
i__21054_21166 = G__21178;
continue;
} else {
var id_21179 = cljs.core.first(seq__21051_21173__$1);
(document.getElementById(id_21179).disabled = cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(mode,new cljs.core.Keyword(null,"edit","edit",-1641834166)));


var G__21180 = cljs.core.next(seq__21051_21173__$1);
var G__21181 = null;
var G__21182 = (0);
var G__21183 = (0);
seq__21051_21163 = G__21180;
chunk__21052_21164 = G__21181;
count__21053_21165 = G__21182;
i__21054_21166 = G__21183;
continue;
}
} else {
}
}
break;
}

var tree_21184 = document.getElementById("scene-tree");
(tree_21184.innerHTML = "");

var seq__21055_21185 = cljs.core.seq(new cljs.core.Keyword("scene","objects","scene/objects",1854528562).cljs$core$IFn$_invoke$arity$1(scene));
var chunk__21056_21186 = null;
var count__21057_21187 = (0);
var i__21058_21188 = (0);
while(true){
if((i__21058_21188 < count__21057_21187)){
var o_21189 = chunk__21056_21186.cljs$core$IIndexed$_nth$arity$2(null, i__21058_21188);
var b_21190 = document.createElement("button");
(b_21190.textContent = ["\u25C6 ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword("object","name","object/name",719647594).cljs$core$IFn$_invoke$arity$1(o_21189))].join(''));

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(selected_id,new cljs.core.Keyword("object","id","object/id",-432056555).cljs$core$IFn$_invoke$arity$1(o_21189))){
b_21190.classList.add("selected");
} else {
}

b_21190.addEventListener("click",((function (seq__21055_21185,chunk__21056_21186,count__21057_21187,i__21058_21188,b_21190,o_21189,tree_21184,map__21050,map__21050__$1,distance,profile,scene,selected_face,future,revision,mode,history__$1,save_status,selected_id,mesh,object){
return (function (){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(kami.modeler.app.state,cljs.core.assoc,new cljs.core.Keyword(null,"selected-object","selected-object",-1414474738),new cljs.core.Keyword("object","id","object/id",-432056555).cljs$core$IFn$_invoke$arity$1(o_21189),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"selected-face","selected-face",868513473),(0)], 0));

return (kami.modeler.app.update_ui_BANG_.cljs$core$IFn$_invoke$arity$0 ? kami.modeler.app.update_ui_BANG_.cljs$core$IFn$_invoke$arity$0() : kami.modeler.app.update_ui_BANG_.call(null, ));
});})(seq__21055_21185,chunk__21056_21186,count__21057_21187,i__21058_21188,b_21190,o_21189,tree_21184,map__21050,map__21050__$1,distance,profile,scene,selected_face,future,revision,mode,history__$1,save_status,selected_id,mesh,object))
);

tree_21184.appendChild(b_21190);


var G__21191 = seq__21055_21185;
var G__21192 = chunk__21056_21186;
var G__21193 = count__21057_21187;
var G__21194 = (i__21058_21188 + (1));
seq__21055_21185 = G__21191;
chunk__21056_21186 = G__21192;
count__21057_21187 = G__21193;
i__21058_21188 = G__21194;
continue;
} else {
var temp__5825__auto___21195 = cljs.core.seq(seq__21055_21185);
if(temp__5825__auto___21195){
var seq__21055_21196__$1 = temp__5825__auto___21195;
if(cljs.core.chunked_seq_QMARK_(seq__21055_21196__$1)){
var c__5525__auto___21197 = cljs.core.chunk_first(seq__21055_21196__$1);
var G__21198 = cljs.core.chunk_rest(seq__21055_21196__$1);
var G__21199 = c__5525__auto___21197;
var G__21200 = cljs.core.count(c__5525__auto___21197);
var G__21201 = (0);
seq__21055_21185 = G__21198;
chunk__21056_21186 = G__21199;
count__21057_21187 = G__21200;
i__21058_21188 = G__21201;
continue;
} else {
var o_21202 = cljs.core.first(seq__21055_21196__$1);
var b_21203 = document.createElement("button");
(b_21203.textContent = ["\u25C6 ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword("object","name","object/name",719647594).cljs$core$IFn$_invoke$arity$1(o_21202))].join(''));

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(selected_id,new cljs.core.Keyword("object","id","object/id",-432056555).cljs$core$IFn$_invoke$arity$1(o_21202))){
b_21203.classList.add("selected");
} else {
}

b_21203.addEventListener("click",((function (seq__21055_21185,chunk__21056_21186,count__21057_21187,i__21058_21188,b_21203,o_21202,seq__21055_21196__$1,temp__5825__auto___21195,tree_21184,map__21050,map__21050__$1,distance,profile,scene,selected_face,future,revision,mode,history__$1,save_status,selected_id,mesh,object){
return (function (){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(kami.modeler.app.state,cljs.core.assoc,new cljs.core.Keyword(null,"selected-object","selected-object",-1414474738),new cljs.core.Keyword("object","id","object/id",-432056555).cljs$core$IFn$_invoke$arity$1(o_21202),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"selected-face","selected-face",868513473),(0)], 0));

return (kami.modeler.app.update_ui_BANG_.cljs$core$IFn$_invoke$arity$0 ? kami.modeler.app.update_ui_BANG_.cljs$core$IFn$_invoke$arity$0() : kami.modeler.app.update_ui_BANG_.call(null, ));
});})(seq__21055_21185,chunk__21056_21186,count__21057_21187,i__21058_21188,b_21203,o_21202,seq__21055_21196__$1,temp__5825__auto___21195,tree_21184,map__21050,map__21050__$1,distance,profile,scene,selected_face,future,revision,mode,history__$1,save_status,selected_id,mesh,object))
);

tree_21184.appendChild(b_21203);


var G__21204 = cljs.core.next(seq__21055_21196__$1);
var G__21205 = null;
var G__21206 = (0);
var G__21207 = (0);
seq__21055_21185 = G__21204;
chunk__21056_21186 = G__21205;
count__21057_21187 = G__21206;
i__21058_21188 = G__21207;
continue;
}
} else {
}
}
break;
}

if(cljs.core.truth_(object)){
(document.getElementById("object-name").value = new cljs.core.Keyword("object","name","object/name",719647594).cljs$core$IFn$_invoke$arity$1(object));

var seq__21059_21208 = cljs.core.seq(cljs.core.map.cljs$core$IFn$_invoke$arity$3(cljs.core.vector,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["tx","ty","tz"], null),new cljs.core.Keyword("object","translation","object/translation",254639254).cljs$core$IFn$_invoke$arity$1(object)));
var chunk__21060_21209 = null;
var count__21061_21210 = (0);
var i__21062_21211 = (0);
while(true){
if((i__21062_21211 < count__21061_21210)){
var vec__21069_21212 = chunk__21060_21209.cljs$core$IIndexed$_nth$arity$2(null, i__21062_21211);
var id_21213 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__21069_21212,(0),null);
var value_21214 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__21069_21212,(1),null);
(document.getElementById(id_21213).value = value_21214);


var G__21215 = seq__21059_21208;
var G__21216 = chunk__21060_21209;
var G__21217 = count__21061_21210;
var G__21218 = (i__21062_21211 + (1));
seq__21059_21208 = G__21215;
chunk__21060_21209 = G__21216;
count__21061_21210 = G__21217;
i__21062_21211 = G__21218;
continue;
} else {
var temp__5825__auto___21219 = cljs.core.seq(seq__21059_21208);
if(temp__5825__auto___21219){
var seq__21059_21220__$1 = temp__5825__auto___21219;
if(cljs.core.chunked_seq_QMARK_(seq__21059_21220__$1)){
var c__5525__auto___21221 = cljs.core.chunk_first(seq__21059_21220__$1);
var G__21222 = cljs.core.chunk_rest(seq__21059_21220__$1);
var G__21223 = c__5525__auto___21221;
var G__21224 = cljs.core.count(c__5525__auto___21221);
var G__21225 = (0);
seq__21059_21208 = G__21222;
chunk__21060_21209 = G__21223;
count__21061_21210 = G__21224;
i__21062_21211 = G__21225;
continue;
} else {
var vec__21072_21226 = cljs.core.first(seq__21059_21220__$1);
var id_21227 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__21072_21226,(0),null);
var value_21228 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__21072_21226,(1),null);
(document.getElementById(id_21227).value = value_21228);


var G__21229 = cljs.core.next(seq__21059_21220__$1);
var G__21230 = null;
var G__21231 = (0);
var G__21232 = (0);
seq__21059_21208 = G__21229;
chunk__21060_21209 = G__21230;
count__21061_21210 = G__21231;
i__21062_21211 = G__21232;
continue;
}
} else {
}
}
break;
}

var stack_21233 = document.getElementById("modifier-stack");
(stack_21233.innerHTML = "");

var seq__21075_21234 = cljs.core.seq(cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2(cljs.core.vector,new cljs.core.Keyword("object","modifiers","object/modifiers",-637449455).cljs$core$IFn$_invoke$arity$1(object)));
var chunk__21076_21235 = null;
var count__21077_21236 = (0);
var i__21078_21237 = (0);
while(true){
if((i__21078_21237 < count__21077_21236)){
var vec__21099_21238 = chunk__21076_21235.cljs$core$IIndexed$_nth$arity$2(null, i__21078_21237);
var index_21239 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__21099_21238,(0),null);
var mod_21240 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__21099_21238,(1),null);
var row_21241 = document.createElement("div");
var label_21242 = document.createElement("span");
var up_21243 = document.createElement("button");
var down_21244 = document.createElement("button");
var remove_21245 = document.createElement("button");
(row_21241.className = "modifier-row");

(label_21242.textContent = [cljs.core.name(new cljs.core.Keyword("modifier","kind","modifier/kind",1915708240).cljs$core$IFn$_invoke$arity$1(mod_21240))," ",cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword("modifier","options","modifier/options",-509583934).cljs$core$IFn$_invoke$arity$1(mod_21240)], 0))].join(''));

(up_21243.textContent = "\u2191");

(up_21243.disabled = (index_21239 === (0)));

up_21243.addEventListener("click",((function (seq__21075_21234,chunk__21076_21235,count__21077_21236,i__21078_21237,row_21241,label_21242,up_21243,down_21244,remove_21245,vec__21099_21238,index_21239,mod_21240,stack_21233,map__21050,map__21050__$1,distance,profile,scene,selected_face,future,revision,mode,history__$1,save_status,selected_id,mesh,object){
return (function (){
var G__21102 = kami.modeling.update_object.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"scene","scene",1523800415).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(kami.modeler.app.state)),new cljs.core.Keyword(null,"selected-object","selected-object",-1414474738).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(kami.modeler.app.state)),kami.modeling.move_modifier,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword("modifier","id","modifier/id",-1089554595).cljs$core$IFn$_invoke$arity$1(mod_21240),(index_21239 - (1))], 0));
return (kami.modeler.app.commit_scene_BANG_.cljs$core$IFn$_invoke$arity$1 ? kami.modeler.app.commit_scene_BANG_.cljs$core$IFn$_invoke$arity$1(G__21102) : kami.modeler.app.commit_scene_BANG_.call(null, G__21102));
});})(seq__21075_21234,chunk__21076_21235,count__21077_21236,i__21078_21237,row_21241,label_21242,up_21243,down_21244,remove_21245,vec__21099_21238,index_21239,mod_21240,stack_21233,map__21050,map__21050__$1,distance,profile,scene,selected_face,future,revision,mode,history__$1,save_status,selected_id,mesh,object))
);

(down_21244.textContent = "\u2193");

(down_21244.disabled = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(index_21239,(cljs.core.count(new cljs.core.Keyword("object","modifiers","object/modifiers",-637449455).cljs$core$IFn$_invoke$arity$1(object)) - (1))));

down_21244.addEventListener("click",((function (seq__21075_21234,chunk__21076_21235,count__21077_21236,i__21078_21237,row_21241,label_21242,up_21243,down_21244,remove_21245,vec__21099_21238,index_21239,mod_21240,stack_21233,map__21050,map__21050__$1,distance,profile,scene,selected_face,future,revision,mode,history__$1,save_status,selected_id,mesh,object){
return (function (){
var G__21103 = kami.modeling.update_object.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"scene","scene",1523800415).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(kami.modeler.app.state)),new cljs.core.Keyword(null,"selected-object","selected-object",-1414474738).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(kami.modeler.app.state)),kami.modeling.move_modifier,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword("modifier","id","modifier/id",-1089554595).cljs$core$IFn$_invoke$arity$1(mod_21240),(index_21239 + (1))], 0));
return (kami.modeler.app.commit_scene_BANG_.cljs$core$IFn$_invoke$arity$1 ? kami.modeler.app.commit_scene_BANG_.cljs$core$IFn$_invoke$arity$1(G__21103) : kami.modeler.app.commit_scene_BANG_.call(null, G__21103));
});})(seq__21075_21234,chunk__21076_21235,count__21077_21236,i__21078_21237,row_21241,label_21242,up_21243,down_21244,remove_21245,vec__21099_21238,index_21239,mod_21240,stack_21233,map__21050,map__21050__$1,distance,profile,scene,selected_face,future,revision,mode,history__$1,save_status,selected_id,mesh,object))
);

(remove_21245.textContent = "\u00D7");

remove_21245.addEventListener("click",((function (seq__21075_21234,chunk__21076_21235,count__21077_21236,i__21078_21237,row_21241,label_21242,up_21243,down_21244,remove_21245,vec__21099_21238,index_21239,mod_21240,stack_21233,map__21050,map__21050__$1,distance,profile,scene,selected_face,future,revision,mode,history__$1,save_status,selected_id,mesh,object){
return (function (){
var G__21104 = kami.modeling.update_object.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"scene","scene",1523800415).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(kami.modeler.app.state)),new cljs.core.Keyword(null,"selected-object","selected-object",-1414474738).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(kami.modeler.app.state)),kami.modeling.remove_modifier,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword("modifier","id","modifier/id",-1089554595).cljs$core$IFn$_invoke$arity$1(mod_21240)], 0));
return (kami.modeler.app.commit_scene_BANG_.cljs$core$IFn$_invoke$arity$1 ? kami.modeler.app.commit_scene_BANG_.cljs$core$IFn$_invoke$arity$1(G__21104) : kami.modeler.app.commit_scene_BANG_.call(null, G__21104));
});})(seq__21075_21234,chunk__21076_21235,count__21077_21236,i__21078_21237,row_21241,label_21242,up_21243,down_21244,remove_21245,vec__21099_21238,index_21239,mod_21240,stack_21233,map__21050,map__21050__$1,distance,profile,scene,selected_face,future,revision,mode,history__$1,save_status,selected_id,mesh,object))
);

var seq__21105_21246 = cljs.core.seq(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [label_21242,up_21243,down_21244,remove_21245], null));
var chunk__21106_21247 = null;
var count__21107_21248 = (0);
var i__21108_21249 = (0);
while(true){
if((i__21108_21249 < count__21107_21248)){
var node_21250 = chunk__21106_21247.cljs$core$IIndexed$_nth$arity$2(null, i__21108_21249);
row_21241.appendChild(node_21250);


var G__21251 = seq__21105_21246;
var G__21252 = chunk__21106_21247;
var G__21253 = count__21107_21248;
var G__21254 = (i__21108_21249 + (1));
seq__21105_21246 = G__21251;
chunk__21106_21247 = G__21252;
count__21107_21248 = G__21253;
i__21108_21249 = G__21254;
continue;
} else {
var temp__5825__auto___21255 = cljs.core.seq(seq__21105_21246);
if(temp__5825__auto___21255){
var seq__21105_21256__$1 = temp__5825__auto___21255;
if(cljs.core.chunked_seq_QMARK_(seq__21105_21256__$1)){
var c__5525__auto___21257 = cljs.core.chunk_first(seq__21105_21256__$1);
var G__21258 = cljs.core.chunk_rest(seq__21105_21256__$1);
var G__21259 = c__5525__auto___21257;
var G__21260 = cljs.core.count(c__5525__auto___21257);
var G__21261 = (0);
seq__21105_21246 = G__21258;
chunk__21106_21247 = G__21259;
count__21107_21248 = G__21260;
i__21108_21249 = G__21261;
continue;
} else {
var node_21262 = cljs.core.first(seq__21105_21256__$1);
row_21241.appendChild(node_21262);


var G__21263 = cljs.core.next(seq__21105_21256__$1);
var G__21264 = null;
var G__21265 = (0);
var G__21266 = (0);
seq__21105_21246 = G__21263;
chunk__21106_21247 = G__21264;
count__21107_21248 = G__21265;
i__21108_21249 = G__21266;
continue;
}
} else {
}
}
break;
}

stack_21233.appendChild(row_21241);


var G__21267 = seq__21075_21234;
var G__21268 = chunk__21076_21235;
var G__21269 = count__21077_21236;
var G__21270 = (i__21078_21237 + (1));
seq__21075_21234 = G__21267;
chunk__21076_21235 = G__21268;
count__21077_21236 = G__21269;
i__21078_21237 = G__21270;
continue;
} else {
var temp__5825__auto___21271 = cljs.core.seq(seq__21075_21234);
if(temp__5825__auto___21271){
var seq__21075_21272__$1 = temp__5825__auto___21271;
if(cljs.core.chunked_seq_QMARK_(seq__21075_21272__$1)){
var c__5525__auto___21273 = cljs.core.chunk_first(seq__21075_21272__$1);
var G__21274 = cljs.core.chunk_rest(seq__21075_21272__$1);
var G__21275 = c__5525__auto___21273;
var G__21276 = cljs.core.count(c__5525__auto___21273);
var G__21277 = (0);
seq__21075_21234 = G__21274;
chunk__21076_21235 = G__21275;
count__21077_21236 = G__21276;
i__21078_21237 = G__21277;
continue;
} else {
var vec__21109_21278 = cljs.core.first(seq__21075_21272__$1);
var index_21279 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__21109_21278,(0),null);
var mod_21280 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__21109_21278,(1),null);
var row_21281 = document.createElement("div");
var label_21282 = document.createElement("span");
var up_21283 = document.createElement("button");
var down_21284 = document.createElement("button");
var remove_21285 = document.createElement("button");
(row_21281.className = "modifier-row");

(label_21282.textContent = [cljs.core.name(new cljs.core.Keyword("modifier","kind","modifier/kind",1915708240).cljs$core$IFn$_invoke$arity$1(mod_21280))," ",cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword("modifier","options","modifier/options",-509583934).cljs$core$IFn$_invoke$arity$1(mod_21280)], 0))].join(''));

(up_21283.textContent = "\u2191");

(up_21283.disabled = (index_21279 === (0)));

up_21283.addEventListener("click",((function (seq__21075_21234,chunk__21076_21235,count__21077_21236,i__21078_21237,row_21281,label_21282,up_21283,down_21284,remove_21285,vec__21109_21278,index_21279,mod_21280,seq__21075_21272__$1,temp__5825__auto___21271,stack_21233,map__21050,map__21050__$1,distance,profile,scene,selected_face,future,revision,mode,history__$1,save_status,selected_id,mesh,object){
return (function (){
var G__21112 = kami.modeling.update_object.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"scene","scene",1523800415).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(kami.modeler.app.state)),new cljs.core.Keyword(null,"selected-object","selected-object",-1414474738).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(kami.modeler.app.state)),kami.modeling.move_modifier,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword("modifier","id","modifier/id",-1089554595).cljs$core$IFn$_invoke$arity$1(mod_21280),(index_21279 - (1))], 0));
return (kami.modeler.app.commit_scene_BANG_.cljs$core$IFn$_invoke$arity$1 ? kami.modeler.app.commit_scene_BANG_.cljs$core$IFn$_invoke$arity$1(G__21112) : kami.modeler.app.commit_scene_BANG_.call(null, G__21112));
});})(seq__21075_21234,chunk__21076_21235,count__21077_21236,i__21078_21237,row_21281,label_21282,up_21283,down_21284,remove_21285,vec__21109_21278,index_21279,mod_21280,seq__21075_21272__$1,temp__5825__auto___21271,stack_21233,map__21050,map__21050__$1,distance,profile,scene,selected_face,future,revision,mode,history__$1,save_status,selected_id,mesh,object))
);

(down_21284.textContent = "\u2193");

(down_21284.disabled = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(index_21279,(cljs.core.count(new cljs.core.Keyword("object","modifiers","object/modifiers",-637449455).cljs$core$IFn$_invoke$arity$1(object)) - (1))));

down_21284.addEventListener("click",((function (seq__21075_21234,chunk__21076_21235,count__21077_21236,i__21078_21237,row_21281,label_21282,up_21283,down_21284,remove_21285,vec__21109_21278,index_21279,mod_21280,seq__21075_21272__$1,temp__5825__auto___21271,stack_21233,map__21050,map__21050__$1,distance,profile,scene,selected_face,future,revision,mode,history__$1,save_status,selected_id,mesh,object){
return (function (){
var G__21113 = kami.modeling.update_object.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"scene","scene",1523800415).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(kami.modeler.app.state)),new cljs.core.Keyword(null,"selected-object","selected-object",-1414474738).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(kami.modeler.app.state)),kami.modeling.move_modifier,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword("modifier","id","modifier/id",-1089554595).cljs$core$IFn$_invoke$arity$1(mod_21280),(index_21279 + (1))], 0));
return (kami.modeler.app.commit_scene_BANG_.cljs$core$IFn$_invoke$arity$1 ? kami.modeler.app.commit_scene_BANG_.cljs$core$IFn$_invoke$arity$1(G__21113) : kami.modeler.app.commit_scene_BANG_.call(null, G__21113));
});})(seq__21075_21234,chunk__21076_21235,count__21077_21236,i__21078_21237,row_21281,label_21282,up_21283,down_21284,remove_21285,vec__21109_21278,index_21279,mod_21280,seq__21075_21272__$1,temp__5825__auto___21271,stack_21233,map__21050,map__21050__$1,distance,profile,scene,selected_face,future,revision,mode,history__$1,save_status,selected_id,mesh,object))
);

(remove_21285.textContent = "\u00D7");

remove_21285.addEventListener("click",((function (seq__21075_21234,chunk__21076_21235,count__21077_21236,i__21078_21237,row_21281,label_21282,up_21283,down_21284,remove_21285,vec__21109_21278,index_21279,mod_21280,seq__21075_21272__$1,temp__5825__auto___21271,stack_21233,map__21050,map__21050__$1,distance,profile,scene,selected_face,future,revision,mode,history__$1,save_status,selected_id,mesh,object){
return (function (){
var G__21114 = kami.modeling.update_object.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"scene","scene",1523800415).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(kami.modeler.app.state)),new cljs.core.Keyword(null,"selected-object","selected-object",-1414474738).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(kami.modeler.app.state)),kami.modeling.remove_modifier,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword("modifier","id","modifier/id",-1089554595).cljs$core$IFn$_invoke$arity$1(mod_21280)], 0));
return (kami.modeler.app.commit_scene_BANG_.cljs$core$IFn$_invoke$arity$1 ? kami.modeler.app.commit_scene_BANG_.cljs$core$IFn$_invoke$arity$1(G__21114) : kami.modeler.app.commit_scene_BANG_.call(null, G__21114));
});})(seq__21075_21234,chunk__21076_21235,count__21077_21236,i__21078_21237,row_21281,label_21282,up_21283,down_21284,remove_21285,vec__21109_21278,index_21279,mod_21280,seq__21075_21272__$1,temp__5825__auto___21271,stack_21233,map__21050,map__21050__$1,distance,profile,scene,selected_face,future,revision,mode,history__$1,save_status,selected_id,mesh,object))
);

var seq__21115_21286 = cljs.core.seq(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [label_21282,up_21283,down_21284,remove_21285], null));
var chunk__21116_21287 = null;
var count__21117_21288 = (0);
var i__21118_21289 = (0);
while(true){
if((i__21118_21289 < count__21117_21288)){
var node_21290 = chunk__21116_21287.cljs$core$IIndexed$_nth$arity$2(null, i__21118_21289);
row_21281.appendChild(node_21290);


var G__21291 = seq__21115_21286;
var G__21292 = chunk__21116_21287;
var G__21293 = count__21117_21288;
var G__21294 = (i__21118_21289 + (1));
seq__21115_21286 = G__21291;
chunk__21116_21287 = G__21292;
count__21117_21288 = G__21293;
i__21118_21289 = G__21294;
continue;
} else {
var temp__5825__auto___21295__$1 = cljs.core.seq(seq__21115_21286);
if(temp__5825__auto___21295__$1){
var seq__21115_21296__$1 = temp__5825__auto___21295__$1;
if(cljs.core.chunked_seq_QMARK_(seq__21115_21296__$1)){
var c__5525__auto___21297 = cljs.core.chunk_first(seq__21115_21296__$1);
var G__21298 = cljs.core.chunk_rest(seq__21115_21296__$1);
var G__21299 = c__5525__auto___21297;
var G__21300 = cljs.core.count(c__5525__auto___21297);
var G__21301 = (0);
seq__21115_21286 = G__21298;
chunk__21116_21287 = G__21299;
count__21117_21288 = G__21300;
i__21118_21289 = G__21301;
continue;
} else {
var node_21302 = cljs.core.first(seq__21115_21296__$1);
row_21281.appendChild(node_21302);


var G__21303 = cljs.core.next(seq__21115_21296__$1);
var G__21304 = null;
var G__21305 = (0);
var G__21306 = (0);
seq__21115_21286 = G__21303;
chunk__21116_21287 = G__21304;
count__21117_21288 = G__21305;
i__21118_21289 = G__21306;
continue;
}
} else {
}
}
break;
}

stack_21233.appendChild(row_21281);


var G__21307 = cljs.core.next(seq__21075_21272__$1);
var G__21308 = null;
var G__21309 = (0);
var G__21310 = (0);
seq__21075_21234 = G__21307;
chunk__21076_21235 = G__21308;
count__21077_21236 = G__21309;
i__21078_21237 = G__21310;
continue;
}
} else {
}
}
break;
}
} else {
}

(document.getElementById("debug-state").textContent = JSON.stringify(cljs.core.clj__GT_js(cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"projectVersion","projectVersion",412999009),new cljs.core.Keyword(null,"revision","revision",-1350113114),new cljs.core.Keyword(null,"modifierCount","modifierCount",-1004030298),new cljs.core.Keyword(null,"objectCount","objectCount",1420430730),new cljs.core.Keyword(null,"mode","mode",654403691),new cljs.core.Keyword(null,"saveStatus","saveStatus",-284043285),new cljs.core.Keyword(null,"selectedObject","selectedObject",1181017491),new cljs.core.Keyword(null,"evaluatedVertices","evaluatedVertices",298696211),new cljs.core.Keyword(null,"faceCount","faceCount",645869915),new cljs.core.Keyword(null,"profile","profile",-545963874)],[kami.modeler.project.current_version,revision,cljs.core.count(new cljs.core.Keyword("object","modifiers","object/modifiers",-637449455).cljs$core$IFn$_invoke$arity$1(object)),cljs.core.count(new cljs.core.Keyword("scene","objects","scene/objects",1854528562).cljs$core$IFn$_invoke$arity$1(scene)),cljs.core.name(mode),cljs.core.name(save_status),selected_id,cljs.core.count(new cljs.core.Keyword("mesh","vertices","mesh/vertices",2013367832).cljs$core$IFn$_invoke$arity$1(kami.modeling.evaluated_object_mesh(object))),cljs.core.count(new cljs.core.Keyword("mesh","faces","mesh/faces",-521361119).cljs$core$IFn$_invoke$arity$1(mesh)),cljs.core.name(profile)]))));

(document.getElementById("project-status").textContent = [cljs.core.name(save_status)," \u00B7 r",cljs.core.str.cljs$core$IFn$_invoke$arity$1(revision)].join(''));

(document.getElementById("undo").disabled = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((1),cljs.core.count(history__$1)));

(document.getElementById("redo").disabled = cljs.core.empty_QMARK_(future));

return (document.getElementById("shortcutHint").textContent = (function (){var G__21119 = profile;
var G__21119__$1 = (((G__21119 instanceof cljs.core.Keyword))?G__21119.fqn:null);
switch (G__21119__$1) {
case "maya":
return "Ctrl+E Extrude \u00B7 W Move \u00B7 R Scale \u00B7 Ctrl+D Duplicate";

break;
case "max":
return "Alt+E Extrude \u00B7 W Move \u00B7 R Scale \u00B7 Ctrl+V Duplicate";

break;
case "c4d":
return "D Extrude \u00B7 E Move \u00B7 T Scale \u00B7 Ctrl+drag Orbit";

break;
default:
return "E Extrude \u00B7 I Inset \u00B7 G Move \u00B7 S Scale \u00B7 X Delete \u00B7 Tab Mode";

}
})());
});
kami.modeler.app.commit_scene_BANG_ = (function kami$modeler$app$commit_scene_BANG_(scene){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(kami.modeler.app.state,(function (s){
return cljs.core.update.cljs$core$IFn$_invoke$arity$3(cljs.core.update.cljs$core$IFn$_invoke$arity$4(cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(s,new cljs.core.Keyword(null,"scene","scene",1523800415),scene,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"future","future",1877842724),cljs.core.PersistentVector.EMPTY,new cljs.core.Keyword(null,"save-status","save-status",-2046612873),new cljs.core.Keyword(null,"dirty","dirty",729553281)], 0)),new cljs.core.Keyword(null,"history","history",-247395220),cljs.core.conj,scene),new cljs.core.Keyword(null,"revision","revision",-1350113114),cljs.core.inc);
}));

kami.modeler.app.refresh_mesh_BANG_();

return kami.modeler.app.update_ui_BANG_();
});
kami.modeler.app.commit_mesh_BANG_ = (function kami$modeler$app$commit_mesh_BANG_(m){
return kami.modeler.app.commit_scene_BANG_(kami.modeling.update_object.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"scene","scene",1523800415).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(kami.modeler.app.state)),new cljs.core.Keyword(null,"selected-object","selected-object",-1414474738).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(kami.modeler.app.state)),cljs.core.assoc,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword("object","mesh","object/mesh",-634190444),m], 0)));
});
kami.modeler.app.edit_mode_QMARK_ = (function kami$modeler$app$edit_mode_QMARK_(){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"edit","edit",-1641834166),new cljs.core.Keyword(null,"mode","mode",654403691).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(kami.modeler.app.state)));
});
kami.modeler.app.extrude_BANG_ = (function kami$modeler$app$extrude_BANG_(){
if(kami.modeler.app.edit_mode_QMARK_()){
var map__21120 = cljs.core.deref(kami.modeler.app.state);
var map__21120__$1 = cljs.core.__destructure_map(map__21120);
var selected_face = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21120__$1,new cljs.core.Keyword(null,"selected-face","selected-face",868513473));
var distance = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21120__$1,new cljs.core.Keyword(null,"distance","distance",-1671893894));
var mesh = kami.modeler.app.selected_mesh();
var next_selected_face = (cljs.core.count(new cljs.core.Keyword("mesh","faces","mesh/faces",-521361119).cljs$core$IFn$_invoke$arity$1(mesh)) - (1));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(kami.modeler.app.state,cljs.core.assoc,new cljs.core.Keyword(null,"selected-face","selected-face",868513473),next_selected_face);

return kami.modeler.app.commit_mesh_BANG_(kami.modeling.extrude_face(mesh,selected_face,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(0),distance], null)));
} else {
return null;
}
});
kami.modeler.app.inset_BANG_ = (function kami$modeler$app$inset_BANG_(){
var map__21121 = cljs.core.deref(kami.modeler.app.state);
var map__21121__$1 = cljs.core.__destructure_map(map__21121);
var selected_face = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21121__$1,new cljs.core.Keyword(null,"selected-face","selected-face",868513473));
var distance = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21121__$1,new cljs.core.Keyword(null,"distance","distance",-1671893894));
var mesh = kami.modeler.app.selected_mesh();
if(((kami.modeler.app.edit_mode_QMARK_()) && ((!((selected_face == null)))))){
return kami.modeler.app.commit_mesh_BANG_(kami.modeling.inset_face(mesh,selected_face,(function (){var x__5087__auto__ = 0.05;
var y__5088__auto__ = (function (){var x__5090__auto__ = 0.95;
var y__5091__auto__ = distance;
return ((x__5090__auto__ < y__5091__auto__) ? x__5090__auto__ : y__5091__auto__);
})();
return ((x__5087__auto__ > y__5088__auto__) ? x__5087__auto__ : y__5088__auto__);
})()));
} else {
return null;
}
});
kami.modeler.app.scale_BANG_ = (function kami$modeler$app$scale_BANG_(){
var map__21122 = cljs.core.deref(kami.modeler.app.state);
var map__21122__$1 = cljs.core.__destructure_map(map__21122);
var selected_face = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21122__$1,new cljs.core.Keyword(null,"selected-face","selected-face",868513473));
var distance = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21122__$1,new cljs.core.Keyword(null,"distance","distance",-1671893894));
var mesh = kami.modeler.app.selected_mesh();
if(((kami.modeler.app.edit_mode_QMARK_()) && ((!((selected_face == null)))))){
return kami.modeler.app.commit_mesh_BANG_(kami.modeling.scale_face(mesh,selected_face,distance));
} else {
return null;
}
});
kami.modeler.app.move_BANG_ = (function kami$modeler$app$move_BANG_(){
var map__21123 = cljs.core.deref(kami.modeler.app.state);
var map__21123__$1 = cljs.core.__destructure_map(map__21123);
var selected_face = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21123__$1,new cljs.core.Keyword(null,"selected-face","selected-face",868513473));
var distance = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21123__$1,new cljs.core.Keyword(null,"distance","distance",-1671893894));
var mesh = kami.modeler.app.selected_mesh();
if(((kami.modeler.app.edit_mode_QMARK_()) && ((!((selected_face == null)))))){
return kami.modeler.app.commit_mesh_BANG_(kami.modeling.translate_face(mesh,selected_face,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(0),distance], null)));
} else {
return null;
}
});
kami.modeler.app.delete_face_BANG_ = (function kami$modeler$app$delete_face_BANG_(){
var map__21124 = cljs.core.deref(kami.modeler.app.state);
var map__21124__$1 = cljs.core.__destructure_map(map__21124);
var selected_face = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21124__$1,new cljs.core.Keyword(null,"selected-face","selected-face",868513473));
var mesh = kami.modeler.app.selected_mesh();
if(((kami.modeler.app.edit_mode_QMARK_()) && ((((!((selected_face == null)))) && ((cljs.core.count(new cljs.core.Keyword("mesh","faces","mesh/faces",-521361119).cljs$core$IFn$_invoke$arity$1(mesh)) > (1))))))){
kami.modeler.app.commit_mesh_BANG_(kami.modeling.delete_face(mesh,selected_face));

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(kami.modeler.app.state,cljs.core.assoc,new cljs.core.Keyword(null,"selected-face","selected-face",868513473),(0));

return kami.modeler.app.update_ui_BANG_();
} else {
return null;
}
});
kami.modeler.app.undo_BANG_ = (function kami$modeler$app$undo_BANG_(){
if((cljs.core.count(new cljs.core.Keyword(null,"history","history",-247395220).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(kami.modeler.app.state))) > (1))){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(kami.modeler.app.state,(function (s){
var h = new cljs.core.Keyword(null,"history","history",-247395220).cljs$core$IFn$_invoke$arity$1(s);
var current = cljs.core.peek(h);
var h_SINGLEQUOTE_ = cljs.core.pop(h);
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(s,new cljs.core.Keyword(null,"history","history",-247395220),h_SINGLEQUOTE_,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"scene","scene",1523800415),cljs.core.peek(h_SINGLEQUOTE_),new cljs.core.Keyword(null,"future","future",1877842724),cljs.core.conj.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"future","future",1877842724).cljs$core$IFn$_invoke$arity$1(s),current)], 0));
}));

kami.modeler.app.refresh_mesh_BANG_();

return kami.modeler.app.update_ui_BANG_();
} else {
return null;
}
});
kami.modeler.app.redo_BANG_ = (function kami$modeler$app$redo_BANG_(){
var temp__5825__auto__ = cljs.core.peek(new cljs.core.Keyword(null,"future","future",1877842724).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(kami.modeler.app.state)));
if(cljs.core.truth_(temp__5825__auto__)){
var scene = temp__5825__auto__;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(kami.modeler.app.state,(function (s){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(s,new cljs.core.Keyword(null,"scene","scene",1523800415),scene,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"history","history",-247395220),cljs.core.conj.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"history","history",-247395220).cljs$core$IFn$_invoke$arity$1(s),scene),new cljs.core.Keyword(null,"future","future",1877842724),cljs.core.pop(new cljs.core.Keyword(null,"future","future",1877842724).cljs$core$IFn$_invoke$arity$1(s))], 0));
}));

kami.modeler.app.refresh_mesh_BANG_();

return kami.modeler.app.update_ui_BANG_();
} else {
return null;
}
});
kami.modeler.app.duplicate_object_BANG_ = (function kami$modeler$app$duplicate_object_BANG_(){
var id = new cljs.core.Keyword(null,"next-id","next-id",-224240762).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(kami.modeler.app.state));
kami.modeler.app.commit_scene_BANG_(kami.modeling.duplicate_object(new cljs.core.Keyword(null,"scene","scene",1523800415).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(kami.modeler.app.state)),new cljs.core.Keyword(null,"selected-object","selected-object",-1414474738).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(kami.modeler.app.state)),id));

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(kami.modeler.app.state,cljs.core.assoc,new cljs.core.Keyword(null,"selected-object","selected-object",-1414474738),id,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"next-id","next-id",-224240762),(id + (1))], 0));

return kami.modeler.app.update_ui_BANG_();
});
kami.modeler.app.delete_object_BANG_ = (function kami$modeler$app$delete_object_BANG_(){
if((cljs.core.count(new cljs.core.Keyword("scene","objects","scene/objects",1854528562).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"scene","scene",1523800415).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(kami.modeler.app.state)))) > (1))){
var scene = kami.modeling.delete_object(new cljs.core.Keyword(null,"scene","scene",1523800415).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(kami.modeler.app.state)),new cljs.core.Keyword(null,"selected-object","selected-object",-1414474738).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(kami.modeler.app.state)));
var next_id = new cljs.core.Keyword("object","id","object/id",-432056555).cljs$core$IFn$_invoke$arity$1(cljs.core.first(new cljs.core.Keyword("scene","objects","scene/objects",1854528562).cljs$core$IFn$_invoke$arity$1(scene)));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(kami.modeler.app.state,cljs.core.assoc,new cljs.core.Keyword(null,"selected-object","selected-object",-1414474738),next_id,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"selected-face","selected-face",868513473),(0)], 0));

return kami.modeler.app.commit_scene_BANG_(scene);
} else {
return null;
}
});
kami.modeler.app.toggle_mode_BANG_ = (function kami$modeler$app$toggle_mode_BANG_(){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(kami.modeler.app.state,cljs.core.update,new cljs.core.Keyword(null,"mode","mode",654403691),(function (p1__21125_SHARP_){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(p1__21125_SHARP_,new cljs.core.Keyword(null,"edit","edit",-1641834166))){
return new cljs.core.Keyword(null,"object","object",1474613949);
} else {
return new cljs.core.Keyword(null,"edit","edit",-1641834166);
}
}));

return kami.modeler.app.update_ui_BANG_();
});
kami.modeler.app.editable_target_QMARK_ = (function kami$modeler$app$editable_target_QMARK_(event){
var target = event.target;
var tag = (function (){var G__21126 = target;
var G__21126__$1 = (((G__21126 == null))?null:G__21126.tagName);
if((G__21126__$1 == null)){
return null;
} else {
return G__21126__$1.toLowerCase();
}
})();
var or__5002__auto__ = (function (){var fexpr__21127 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 3, ["select",null,"input",null,"textarea",null], null), null);
return (fexpr__21127.cljs$core$IFn$_invoke$arity$1 ? fexpr__21127.cljs$core$IFn$_invoke$arity$1(tag) : fexpr__21127.call(null, tag));
})();
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return target.isContentEditable;
}
});
kami.modeler.app.command_for_event = (function kami$modeler$app$command_for_event(event){
var key = event.key.toLowerCase();
var ctrl = (function (){var or__5002__auto__ = event.ctrlKey;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return event.metaKey;
}
})();
var alt = event.altKey;
var profile = new cljs.core.Keyword(null,"profile","profile",-545963874).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(kami.modeler.app.state));
if(cljs.core.truth_((function (){var and__5000__auto__ = ctrl;
if(cljs.core.truth_(and__5000__auto__)){
var and__5000__auto____$1 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(key,"z");
if(and__5000__auto____$1){
return event.shiftKey;
} else {
return and__5000__auto____$1;
}
} else {
return and__5000__auto__;
}
})())){
return new cljs.core.Keyword(null,"redo","redo",501190664);
} else {
if(cljs.core.truth_((function (){var and__5000__auto__ = ctrl;
if(cljs.core.truth_(and__5000__auto__)){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(key,"z");
} else {
return and__5000__auto__;
}
})())){
return new cljs.core.Keyword(null,"undo","undo",-1818036302);
} else {
if(cljs.core.truth_((function (){var and__5000__auto__ = ctrl;
if(cljs.core.truth_(and__5000__auto__)){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(key,"y");
} else {
return and__5000__auto__;
}
})())){
return new cljs.core.Keyword(null,"redo","redo",501190664);
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(key,"tab")){
return new cljs.core.Keyword(null,"toggle-mode","toggle-mode",-1732182225);
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(profile,new cljs.core.Keyword(null,"blender","blender",354426016))){
var fexpr__21128 = new cljs.core.PersistentArrayMap(null, 5, ["e",new cljs.core.Keyword(null,"extrude","extrude",-1625117733),"i",new cljs.core.Keyword(null,"inset","inset",-396367740),"g",new cljs.core.Keyword(null,"move","move",-2110884309),"s",new cljs.core.Keyword(null,"scale","scale",-230427353),"x",new cljs.core.Keyword(null,"delete-face","delete-face",748805504)], null);
return (fexpr__21128.cljs$core$IFn$_invoke$arity$1 ? fexpr__21128.cljs$core$IFn$_invoke$arity$1(key) : fexpr__21128.call(null, key));
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(profile,new cljs.core.Keyword(null,"maya","maya",-2121079392))){
if(cljs.core.truth_((function (){var and__5000__auto__ = ctrl;
if(cljs.core.truth_(and__5000__auto__)){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(key,"e");
} else {
return and__5000__auto__;
}
})())){
return new cljs.core.Keyword(null,"extrude","extrude",-1625117733);
} else {
if(cljs.core.truth_((function (){var and__5000__auto__ = ctrl;
if(cljs.core.truth_(and__5000__auto__)){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(key,"d");
} else {
return and__5000__auto__;
}
})())){
return new cljs.core.Keyword(null,"duplicate-object","duplicate-object",-543409332);
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(key,"w")){
return new cljs.core.Keyword(null,"move","move",-2110884309);
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(key,"r")){
return new cljs.core.Keyword(null,"scale","scale",-230427353);
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(key,"delete")){
return new cljs.core.Keyword(null,"delete-face","delete-face",748805504);
} else {
return null;
}
}
}
}
}
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(profile,new cljs.core.Keyword(null,"max","max",61366548))){
if(cljs.core.truth_((function (){var and__5000__auto__ = alt;
if(cljs.core.truth_(and__5000__auto__)){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(key,"e");
} else {
return and__5000__auto__;
}
})())){
return new cljs.core.Keyword(null,"extrude","extrude",-1625117733);
} else {
if(cljs.core.truth_((function (){var and__5000__auto__ = ctrl;
if(cljs.core.truth_(and__5000__auto__)){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(key,"v");
} else {
return and__5000__auto__;
}
})())){
return new cljs.core.Keyword(null,"duplicate-object","duplicate-object",-543409332);
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(key,"w")){
return new cljs.core.Keyword(null,"move","move",-2110884309);
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(key,"r")){
return new cljs.core.Keyword(null,"scale","scale",-230427353);
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(key,"delete")){
return new cljs.core.Keyword(null,"delete-face","delete-face",748805504);
} else {
return null;
}
}
}
}
}
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(profile,new cljs.core.Keyword(null,"c4d","c4d",-1613090238))){
var fexpr__21129 = new cljs.core.PersistentArrayMap(null, 5, ["d",new cljs.core.Keyword(null,"extrude","extrude",-1625117733),"i",new cljs.core.Keyword(null,"inset","inset",-396367740),"e",new cljs.core.Keyword(null,"move","move",-2110884309),"t",new cljs.core.Keyword(null,"scale","scale",-230427353),"backspace",new cljs.core.Keyword(null,"delete-face","delete-face",748805504)], null);
return (fexpr__21129.cljs$core$IFn$_invoke$arity$1 ? fexpr__21129.cljs$core$IFn$_invoke$arity$1(key) : fexpr__21129.call(null, key));
} else {
return null;
}
}
}
}
}
}
}
}
});
kami.modeler.app.execute_command_BANG_ = (function kami$modeler$app$execute_command_BANG_(command){
var G__21130 = command;
var G__21130__$1 = (((G__21130 instanceof cljs.core.Keyword))?G__21130.fqn:null);
switch (G__21130__$1) {
case "extrude":
return kami.modeler.app.extrude_BANG_();

break;
case "inset":
return kami.modeler.app.inset_BANG_();

break;
case "move":
return kami.modeler.app.move_BANG_();

break;
case "scale":
return kami.modeler.app.scale_BANG_();

break;
case "delete-face":
return kami.modeler.app.delete_face_BANG_();

break;
case "duplicate-object":
return kami.modeler.app.duplicate_object_BANG_();

break;
case "undo":
return kami.modeler.app.undo_BANG_();

break;
case "redo":
return kami.modeler.app.redo_BANG_();

break;
case "toggle-mode":
return kami.modeler.app.toggle_mode_BANG_();

break;
default:
return null;

}
});
kami.modeler.app.storage_key = "kami.modeler.project.v2";
kami.modeler.app.backup_key = "kami.modeler.project.backup";
kami.modeler.app.project_document = (function kami$modeler$app$project_document(){
var map__21131 = cljs.core.deref(kami.modeler.app.state);
var map__21131__$1 = cljs.core.__destructure_map(map__21131);
var project_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21131__$1,new cljs.core.Keyword(null,"project-id","project-id",206449307));
var profile = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21131__$1,new cljs.core.Keyword(null,"profile","profile",-545963874));
var scene = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21131__$1,new cljs.core.Keyword(null,"scene","scene",1523800415));
var selected_face = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21131__$1,new cljs.core.Keyword(null,"selected-face","selected-face",868513473));
var project_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21131__$1,new cljs.core.Keyword(null,"project-name","project-name",1486861539));
var elevation = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21131__$1,new cljs.core.Keyword(null,"elevation","elevation",-1609348796));
var mode = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21131__$1,new cljs.core.Keyword(null,"mode","mode",654403691));
var selected_object = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21131__$1,new cljs.core.Keyword(null,"selected-object","selected-object",-1414474738));
var azimuth = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21131__$1,new cljs.core.Keyword(null,"azimuth","azimuth",-165971535));
return kami.modeler.project.document(new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"id","id",-1388402092),project_id,new cljs.core.Keyword(null,"name","name",1843675177),project_name,new cljs.core.Keyword(null,"scene","scene",1523800415),scene,new cljs.core.Keyword(null,"selection","selection",975998651),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"object-id","object-id",-754527291),selected_object,new cljs.core.Keyword(null,"face-id","face-id",-2023925409),selected_face,new cljs.core.Keyword(null,"mode","mode",654403691),mode], null),new cljs.core.Keyword(null,"camera","camera",-1190348585),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"azimuth","azimuth",-165971535),azimuth,new cljs.core.Keyword(null,"elevation","elevation",-1609348796),elevation], null),new cljs.core.Keyword(null,"interaction","interaction",-2143888916),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"profile","profile",-545963874),profile], null)], null));
});
kami.modeler.app.save_project_BANG_ = (function kami$modeler$app$save_project_BANG_(){
var serialized = cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([kami.modeler.app.project_document()], 0));
var previous = localStorage.getItem(kami.modeler.app.storage_key);
if(cljs.core.truth_(previous)){
localStorage.setItem(kami.modeler.app.backup_key,previous);
} else {
}

localStorage.setItem(kami.modeler.app.storage_key,serialized);

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(kami.modeler.app.state,cljs.core.assoc,new cljs.core.Keyword(null,"save-status","save-status",-2046612873),new cljs.core.Keyword(null,"saved","saved",288760660));

return kami.modeler.app.update_ui_BANG_();
});
kami.modeler.app.apply_project_BANG_ = (function kami$modeler$app$apply_project_BANG_(value){
var p = kami.modeler.project.open(value);
var scene = new cljs.core.Keyword("project","scene","project/scene",742580822).cljs$core$IFn$_invoke$arity$1(p);
var selection = new cljs.core.Keyword("project","selection","project/selection",746373586).cljs$core$IFn$_invoke$arity$1(p);
var camera = new cljs.core.Keyword("project","camera","project/camera",-1501758414).cljs$core$IFn$_invoke$arity$1(p);
var interaction = new cljs.core.Keyword("project","interaction","project/interaction",-1316543261).cljs$core$IFn$_invoke$arity$1(p);
var object_id = (function (){var or__5002__auto__ = new cljs.core.Keyword(null,"object-id","object-id",-754527291).cljs$core$IFn$_invoke$arity$1(selection);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return new cljs.core.Keyword("object","id","object/id",-432056555).cljs$core$IFn$_invoke$arity$1(cljs.core.first(new cljs.core.Keyword("scene","objects","scene/objects",1854528562).cljs$core$IFn$_invoke$arity$1(scene)));
}
})();
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(kami.modeler.app.state,cljs.core.assoc,new cljs.core.Keyword(null,"project-id","project-id",206449307),new cljs.core.Keyword("project","id","project/id",-791740645).cljs$core$IFn$_invoke$arity$1(p),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"project-name","project-name",1486861539),new cljs.core.Keyword("project","name","project/name",2022968152).cljs$core$IFn$_invoke$arity$1(p),new cljs.core.Keyword(null,"scene","scene",1523800415),scene,new cljs.core.Keyword(null,"selected-object","selected-object",-1414474738),object_id,new cljs.core.Keyword(null,"selected-face","selected-face",868513473),new cljs.core.Keyword(null,"face-id","face-id",-2023925409).cljs$core$IFn$_invoke$arity$1(selection),new cljs.core.Keyword(null,"mode","mode",654403691),new cljs.core.Keyword(null,"mode","mode",654403691).cljs$core$IFn$_invoke$arity$1(selection),new cljs.core.Keyword(null,"azimuth","azimuth",-165971535),new cljs.core.Keyword(null,"azimuth","azimuth",-165971535).cljs$core$IFn$_invoke$arity$1(camera),new cljs.core.Keyword(null,"elevation","elevation",-1609348796),new cljs.core.Keyword(null,"elevation","elevation",-1609348796).cljs$core$IFn$_invoke$arity$1(camera),new cljs.core.Keyword(null,"profile","profile",-545963874),new cljs.core.Keyword(null,"profile","profile",-545963874).cljs$core$IFn$_invoke$arity$1(interaction),new cljs.core.Keyword(null,"history","history",-247395220),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [scene], null),new cljs.core.Keyword(null,"future","future",1877842724),cljs.core.PersistentVector.EMPTY,new cljs.core.Keyword(null,"save-status","save-status",-2046612873),new cljs.core.Keyword(null,"saved","saved",288760660)], 0));

(document.getElementById("profile").value = cljs.core.name(new cljs.core.Keyword(null,"profile","profile",-545963874).cljs$core$IFn$_invoke$arity$1(interaction)));

kami.modeler.app.refresh_mesh_BANG_();

return kami.modeler.app.update_ui_BANG_();
});
kami.modeler.app.load_project_BANG_ = (function kami$modeler$app$load_project_BANG_(){
var temp__5825__auto__ = localStorage.getItem(kami.modeler.app.storage_key);
if(cljs.core.truth_(temp__5825__auto__)){
var serialized = temp__5825__auto__;
try{return kami.modeler.app.apply_project_BANG_(cljs.reader.read_string.cljs$core$IFn$_invoke$arity$1(serialized));
}catch (e21132){var _ = e21132;
var temp__5825__auto____$1 = localStorage.getItem(kami.modeler.app.backup_key);
if(cljs.core.truth_(temp__5825__auto____$1)){
var backup = temp__5825__auto____$1;
return kami.modeler.app.apply_project_BANG_(cljs.reader.read_string.cljs$core$IFn$_invoke$arity$1(backup));
} else {
return null;
}
}} else {
return null;
}
});
kami.modeler.app.download_project_BANG_ = (function kami$modeler$app$download_project_BANG_(){
var a = document.createElement("a");
var url = URL.createObjectURL((new Blob([cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([kami.modeler.app.project_document()], 0))],({"type": "application/edn"}))));
(a.href = url);

(a.download = "model.kami-modeler.edn");

a.click();

return setTimeout((function (){
return URL.revokeObjectURL(url);
}),(0));
});
kami.modeler.app.draw_BANG_ = (function kami$modeler$app$draw_BANG_(){
var temp__5825__auto___21313 = cljs.core.deref(kami.modeler.app.runtime);
if(cljs.core.truth_(temp__5825__auto___21313)){
var map__21133_21314 = temp__5825__auto___21313;
var map__21133_21315__$1 = cljs.core.__destructure_map(map__21133_21314);
var viewport_21316 = map__21133_21315__$1;
var buffers_21317 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21133_21315__$1,new cljs.core.Keyword(null,"buffers","buffers",471409492));
if(cljs.core.truth_(buffers_21317)){
var map__21134_21318 = cljs.core.deref(kami.modeler.app.state);
var map__21134_21319__$1 = cljs.core.__destructure_map(map__21134_21318);
var azimuth_21320 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21134_21319__$1,new cljs.core.Keyword(null,"azimuth","azimuth",-165971535));
var elevation_21321 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21134_21319__$1,new cljs.core.Keyword(null,"elevation","elevation",-1609348796));
var d_21322 = 6.0;
var eye_21323 = new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [((d_21322 * Math.cos(elevation_21321)) * Math.cos(azimuth_21320)),(d_21322 * Math.sin(elevation_21321)),((d_21322 * Math.cos(elevation_21321)) * Math.sin(azimuth_21320))], null);
kami.webgpu.mesh.render_frame_BANG_.cljs$core$IFn$_invoke$arity$5(viewport_21316,buffers_21317,eye_21323,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(0),(0)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [0.35,0.58,1.0], null));
} else {
}
} else {
}

return requestAnimationFrame(kami.modeler.app.draw_BANG_);
});
kami.modeler.app.init_gpu_BANG_ = (function kami$modeler$app$init_gpu_BANG_(canvas){
return kami.webgpu.mesh.init_canvas_BANG_(canvas).then((function (viewport){
cljs.core.reset_BANG_(kami.modeler.app.runtime,viewport);

kami.modeler.app.refresh_mesh_BANG_();

(document.getElementById("gpu-status").textContent = "");

(window.__kami_modeler_ready = true);

return kami.modeler.app.draw_BANG_();
})).catch((function (e){
return (document.getElementById("gpu-status").textContent = ["WebGPU unavailable: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(e)].join(''));
}));
});
kami.modeler.app.normalize = (function kami$modeler$app$normalize(v){
var l = (function (){var x__5087__auto__ = 1.0E-9;
var y__5088__auto__ = Math.hypot(cljs.core.nth.cljs$core$IFn$_invoke$arity$2(v,(0)),cljs.core.nth.cljs$core$IFn$_invoke$arity$2(v,(1)),cljs.core.nth.cljs$core$IFn$_invoke$arity$2(v,(2)));
return ((x__5087__auto__ > y__5088__auto__) ? x__5087__auto__ : y__5088__auto__);
})();
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (p1__21135_SHARP_){
return (p1__21135_SHARP_ / l);
}),v);
});
kami.modeler.app.add3 = (function kami$modeler$app$add3(var_args){
var args__5732__auto__ = [];
var len__5726__auto___21324 = arguments.length;
var i__5727__auto___21325 = (0);
while(true){
if((i__5727__auto___21325 < len__5726__auto___21324)){
args__5732__auto__.push((arguments[i__5727__auto___21325]));

var G__21326 = (i__5727__auto___21325 + (1));
i__5727__auto___21325 = G__21326;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return kami.modeler.app.add3.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(kami.modeler.app.add3.cljs$core$IFn$_invoke$arity$variadic = (function (vs){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$3(cljs.core.mapv,cljs.core._PLUS_,vs);
}));

(kami.modeler.app.add3.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(kami.modeler.app.add3.cljs$lang$applyTo = (function (seq21136){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq21136));
}));

kami.modeler.app.mul3 = (function kami$modeler$app$mul3(v,s){
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (p1__21137_SHARP_){
return (p1__21137_SHARP_ * s);
}),v);
});
kami.modeler.app.camera_eye = (function kami$modeler$app$camera_eye(){
var map__21138 = cljs.core.deref(kami.modeler.app.state);
var map__21138__$1 = cljs.core.__destructure_map(map__21138);
var azimuth = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21138__$1,new cljs.core.Keyword(null,"azimuth","azimuth",-165971535));
var elevation = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21138__$1,new cljs.core.Keyword(null,"elevation","elevation",-1609348796));
var d = (6);
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [((d * Math.cos(elevation)) * Math.cos(azimuth)),(d * Math.sin(elevation)),((d * Math.cos(elevation)) * Math.sin(azimuth))], null);
});
kami.modeler.app.pick_at_BANG_ = (function kami$modeler$app$pick_at_BANG_(canvas,event){
var r = canvas.getBoundingClientRect();
var x = (((2) * ((event.clientX - r.left) / r.width)) - (1));
var y = ((1) - ((2) * ((event.clientY - r.top) / r.height)));
var eye = kami.modeler.app.camera_eye();
var f = kami.modeler.app.normalize(cljs.core.mapv.cljs$core$IFn$_invoke$arity$3(cljs.core._,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(0),(0)], null),eye));
var right = kami.modeler.app.normalize(kami.modeler.app.cross(f,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(1),(0)], null)));
var up = kami.modeler.app.cross(right,f);
var tan = Math.tan((Math.PI / (6)));
var dir = kami.modeler.app.normalize(kami.modeler.app.add3.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([f,kami.modeler.app.mul3(right,((x * (r.width / r.height)) * tan)),kami.modeler.app.mul3(up,(y * tan))], 0)));
var object = kami.modeler.app.selected_object();
var local_eye = cljs.core.mapv.cljs$core$IFn$_invoke$arity$3(cljs.core._,eye,new cljs.core.Keyword("object","translation","object/translation",254639254).cljs$core$IFn$_invoke$arity$1(object));
var face = kami.modeling.pick_face(new cljs.core.Keyword("object","mesh","object/mesh",-634190444).cljs$core$IFn$_invoke$arity$1(object),local_eye,dir);
if((!((face == null)))){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(kami.modeler.app.state,cljs.core.assoc,new cljs.core.Keyword(null,"selected-face","selected-face",868513473),face);

return kami.modeler.app.update_ui_BANG_();
} else {
return null;
}
});
kami.modeler.app.init_BANG_ = (function kami$modeler$app$init_BANG_(){
var canvas = document.getElementById("gpu-canvas");
var drag = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(null);
document.getElementById("extrude").addEventListener("click",kami.modeler.app.extrude_BANG_);

document.getElementById("inset").addEventListener("click",kami.modeler.app.inset_BANG_);

document.getElementById("scale").addEventListener("click",kami.modeler.app.scale_BANG_);

document.getElementById("move").addEventListener("click",kami.modeler.app.move_BANG_);

document.getElementById("delete-face").addEventListener("click",kami.modeler.app.delete_face_BANG_);

document.getElementById("undo").addEventListener("click",kami.modeler.app.undo_BANG_);

document.getElementById("redo").addEventListener("click",kami.modeler.app.redo_BANG_);

document.getElementById("save-project").addEventListener("click",kami.modeler.app.save_project_BANG_);

document.getElementById("load-project").addEventListener("click",kami.modeler.app.load_project_BANG_);

document.getElementById("distance").addEventListener("input",(function (p1__21139_SHARP_){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(kami.modeler.app.state,cljs.core.assoc,new cljs.core.Keyword(null,"distance","distance",-1671893894),parseFloat(p1__21139_SHARP_.target.value));
}));

document.getElementById("profile").addEventListener("change",(function (p1__21140_SHARP_){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(kami.modeler.app.state,cljs.core.assoc,new cljs.core.Keyword(null,"profile","profile",-545963874),cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(p1__21140_SHARP_.target.value));

return kami.modeler.app.update_ui_BANG_();
}));

canvas.addEventListener("contextmenu",(function (p1__21141_SHARP_){
return p1__21141_SHARP_.preventDefault();
}));

canvas.addEventListener("pointerdown",(function (p1__21142_SHARP_){
if(cljs.core.truth_((function (){var or__5002__auto__ = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((1),p1__21142_SHARP_.button);
if(or__5002__auto__){
return or__5002__auto__;
} else {
return p1__21142_SHARP_.altKey;
}
})())){
return cljs.core.reset_BANG_(drag,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__21142_SHARP_.clientX,p1__21142_SHARP_.clientY], null));
} else {
if(kami.modeler.app.edit_mode_QMARK_()){
return kami.modeler.app.pick_at_BANG_(canvas,p1__21142_SHARP_);
} else {
return null;
}
}
}));

window.addEventListener("pointerup",(function (){
return cljs.core.reset_BANG_(drag,null);
}));

window.addEventListener("pointermove",(function (event){
var temp__5825__auto__ = cljs.core.deref(drag);
if(cljs.core.truth_(temp__5825__auto__)){
var vec__21144 = temp__5825__auto__;
var x = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__21144,(0),null);
var y = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__21144,(1),null);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(kami.modeler.app.state,cljs.core.update,new cljs.core.Keyword(null,"azimuth","azimuth",-165971535),cljs.core._PLUS_,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([(0.008 * (event.clientX - x))], 0));

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(kami.modeler.app.state,cljs.core.update,new cljs.core.Keyword(null,"elevation","elevation",-1609348796),(function (e){
var x__5087__auto__ = -1.3;
var y__5088__auto__ = (function (){var x__5090__auto__ = 1.3;
var y__5091__auto__ = (e + (0.008 * (event.clientY - y)));
return ((x__5090__auto__ < y__5091__auto__) ? x__5090__auto__ : y__5091__auto__);
})();
return ((x__5087__auto__ > y__5088__auto__) ? x__5087__auto__ : y__5088__auto__);
}));

return cljs.core.reset_BANG_(drag,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [event.clientX,event.clientY], null));
} else {
return null;
}
}));

window.addEventListener("keydown",(function (p1__21143_SHARP_){
if(cljs.core.truth_(kami.modeler.app.editable_target_QMARK_(p1__21143_SHARP_))){
return null;
} else {
var temp__5825__auto__ = kami.modeler.app.command_for_event(p1__21143_SHARP_);
if(cljs.core.truth_(temp__5825__auto__)){
var command = temp__5825__auto__;
p1__21143_SHARP_.preventDefault();

return kami.modeler.app.execute_command_BANG_(command);
} else {
return null;
}
}
}));

document.getElementById("mode-toggle").addEventListener("click",kami.modeler.app.toggle_mode_BANG_);

document.getElementById("new-cube").addEventListener("click",(function (){
var id = new cljs.core.Keyword(null,"next-id","next-id",-224240762).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(kami.modeler.app.state));
var o = kami.modeling.object.cljs$core$IFn$_invoke$arity$4(id,["Cube ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(id)].join(''),kami.modeler.app.cube,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"translation","translation",-701621547),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(id * 0.5),(0),(0)], null)], null));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(kami.modeler.app.state,cljs.core.assoc,new cljs.core.Keyword(null,"selected-object","selected-object",-1414474738),id,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"selected-face","selected-face",868513473),(1),new cljs.core.Keyword(null,"next-id","next-id",-224240762),(id + (1))], 0));

return kami.modeler.app.commit_scene_BANG_(kami.modeling.add_object(new cljs.core.Keyword(null,"scene","scene",1523800415).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(kami.modeler.app.state)),o));
}));

document.getElementById("duplicate-object").addEventListener("click",kami.modeler.app.duplicate_object_BANG_);

document.getElementById("delete-object").addEventListener("click",kami.modeler.app.delete_object_BANG_);

document.getElementById("apply-transform").addEventListener("click",(function (){
var translation = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (id){
return parseFloat(document.getElementById(id).value);
}),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["tx","ty","tz"], null));
var name = document.getElementById("object-name").value;
return kami.modeler.app.commit_scene_BANG_(kami.modeling.update_object(new cljs.core.Keyword(null,"scene","scene",1523800415).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(kami.modeler.app.state)),new cljs.core.Keyword(null,"selected-object","selected-object",-1414474738).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(kami.modeler.app.state)),(function (o){
return kami.modeling.set_object_transform(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(o,new cljs.core.Keyword("object","name","object/name",719647594),name),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"translation","translation",-701621547),translation], null));
})));
}));

var seq__21147_21327 = cljs.core.seq(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["add-mirror",new cljs.core.Keyword(null,"mirror","mirror",1914600218),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"axis","axis",-1215390822),new cljs.core.Keyword(null,"x","x",2099068185)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["add-subdivision",new cljs.core.Keyword(null,"subdivision","subdivision",1172317679),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"levels","levels",-950747887),(1)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["add-array",new cljs.core.Keyword(null,"array","array",-2080713842),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"count","count",2139924085),(3),new cljs.core.Keyword(null,"offset","offset",296498311),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [2.5,(0),(0)], null)], null)], null)], null));
var chunk__21148_21328 = null;
var count__21149_21329 = (0);
var i__21150_21330 = (0);
while(true){
if((i__21150_21330 < count__21149_21329)){
var vec__21157_21331 = chunk__21148_21328.cljs$core$IIndexed$_nth$arity$2(null, i__21150_21330);
var id_21332 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__21157_21331,(0),null);
var kind_21333 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__21157_21331,(1),null);
var options_21334 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__21157_21331,(2),null);
document.getElementById(id_21332).addEventListener("click",((function (seq__21147_21327,chunk__21148_21328,count__21149_21329,i__21150_21330,vec__21157_21331,id_21332,kind_21333,options_21334,canvas,drag){
return (function (){
return kami.modeler.app.commit_scene_BANG_(kami.modeling.update_object.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"scene","scene",1523800415).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(kami.modeler.app.state)),new cljs.core.Keyword(null,"selected-object","selected-object",-1414474738).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(kami.modeler.app.state)),kami.modeling.add_modifier,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([kami.modeling.modifier.cljs$core$IFn$_invoke$arity$2(kind_21333,options_21334)], 0)));
});})(seq__21147_21327,chunk__21148_21328,count__21149_21329,i__21150_21330,vec__21157_21331,id_21332,kind_21333,options_21334,canvas,drag))
);


var G__21335 = seq__21147_21327;
var G__21336 = chunk__21148_21328;
var G__21337 = count__21149_21329;
var G__21338 = (i__21150_21330 + (1));
seq__21147_21327 = G__21335;
chunk__21148_21328 = G__21336;
count__21149_21329 = G__21337;
i__21150_21330 = G__21338;
continue;
} else {
var temp__5825__auto___21339 = cljs.core.seq(seq__21147_21327);
if(temp__5825__auto___21339){
var seq__21147_21340__$1 = temp__5825__auto___21339;
if(cljs.core.chunked_seq_QMARK_(seq__21147_21340__$1)){
var c__5525__auto___21341 = cljs.core.chunk_first(seq__21147_21340__$1);
var G__21342 = cljs.core.chunk_rest(seq__21147_21340__$1);
var G__21343 = c__5525__auto___21341;
var G__21344 = cljs.core.count(c__5525__auto___21341);
var G__21345 = (0);
seq__21147_21327 = G__21342;
chunk__21148_21328 = G__21343;
count__21149_21329 = G__21344;
i__21150_21330 = G__21345;
continue;
} else {
var vec__21160_21346 = cljs.core.first(seq__21147_21340__$1);
var id_21347 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__21160_21346,(0),null);
var kind_21348 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__21160_21346,(1),null);
var options_21349 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__21160_21346,(2),null);
document.getElementById(id_21347).addEventListener("click",((function (seq__21147_21327,chunk__21148_21328,count__21149_21329,i__21150_21330,vec__21160_21346,id_21347,kind_21348,options_21349,seq__21147_21340__$1,temp__5825__auto___21339,canvas,drag){
return (function (){
return kami.modeler.app.commit_scene_BANG_(kami.modeling.update_object.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"scene","scene",1523800415).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(kami.modeler.app.state)),new cljs.core.Keyword(null,"selected-object","selected-object",-1414474738).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(kami.modeler.app.state)),kami.modeling.add_modifier,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([kami.modeling.modifier.cljs$core$IFn$_invoke$arity$2(kind_21348,options_21349)], 0)));
});})(seq__21147_21327,chunk__21148_21328,count__21149_21329,i__21150_21330,vec__21160_21346,id_21347,kind_21348,options_21349,seq__21147_21340__$1,temp__5825__auto___21339,canvas,drag))
);


var G__21350 = cljs.core.next(seq__21147_21340__$1);
var G__21351 = null;
var G__21352 = (0);
var G__21353 = (0);
seq__21147_21327 = G__21350;
chunk__21148_21328 = G__21351;
count__21149_21329 = G__21352;
i__21150_21330 = G__21353;
continue;
}
} else {
}
}
break;
}

document.getElementById("import").addEventListener("click",(function (){
return document.getElementById("import-file").click();
}));

document.getElementById("import-file").addEventListener("change",(function (event){
var temp__5825__auto__ = (event.target.files[(0)]);
if(cljs.core.truth_(temp__5825__auto__)){
var file = temp__5825__auto__;
return file.text().then((function (text){
var m = cljs.reader.read_string.cljs$core$IFn$_invoke$arity$1(text);
if(kami.modeling.valid_mesh_QMARK_(m)){
return kami.modeler.app.apply_project_BANG_(kami.modeling.scene.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [kami.modeling.object.cljs$core$IFn$_invoke$arity$3((1),"Imported",m)], null)));
} else {
return kami.modeler.app.apply_project_BANG_(m);
}
}));
} else {
return null;
}
}));

document.getElementById("export").addEventListener("click",kami.modeler.app.download_project_BANG_);

kami.modeler.app.update_ui_BANG_();

return kami.modeler.app.init_gpu_BANG_(canvas);
});
goog.exportSymbol('kami.modeler.app.init_BANG_', kami.modeler.app.init_BANG_);

//# sourceMappingURL=kami.modeler.app.js.map
