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
kami.modeler.app.cross = (function kami$modeler$app$cross(p__20078,p__20079){
var vec__20080 = p__20078;
var ax = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20080,(0),null);
var ay = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20080,(1),null);
var az = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20080,(2),null);
var vec__20083 = p__20079;
var bx = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20083,(0),null);
var by = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20083,(1),null);
var bz = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20083,(2),null);
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [((ay * bz) - (az * by)),((az * bx) - (ax * bz)),((ax * by) - (ay * bx))], null);
});
kami.modeler.app.norm = (function kami$modeler$app$norm(v){
var l = (function (){var x__5087__auto__ = 1.0E-8;
var y__5088__auto__ = Math.hypot(cljs.core.nth.cljs$core$IFn$_invoke$arity$2(v,(0)),cljs.core.nth.cljs$core$IFn$_invoke$arity$2(v,(1)),cljs.core.nth.cljs$core$IFn$_invoke$arity$2(v,(2)));
return ((x__5087__auto__ > y__5088__auto__) ? x__5087__auto__ : y__5088__auto__);
})();
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (p1__20086_SHARP_){
return (p1__20086_SHARP_ / l);
}),v);
});
kami.modeler.app.render_geometry = (function kami$modeler$app$render_geometry(p__20088){
var map__20089 = p__20088;
var map__20089__$1 = cljs.core.__destructure_map(map__20089);
var vertices = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20089__$1,new cljs.core.Keyword("mesh","vertices","mesh/vertices",2013367832));
var faces = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20089__$1,new cljs.core.Keyword("mesh","faces","mesh/faces",-521361119));
var triangles = cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic((function (f){
return cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (i){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.first(f),cljs.core.nth.cljs$core$IFn$_invoke$arity$2(f,i),cljs.core.nth.cljs$core$IFn$_invoke$arity$2(f,(i + (1)))], null);
}),cljs.core.range.cljs$core$IFn$_invoke$arity$2((1),(cljs.core.count(f) - (1))));
}),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([faces], 0));
var positions = cljs.core.vec(cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic((function (tri){
return cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__20087_SHARP_){
return cljs.core.nth.cljs$core$IFn$_invoke$arity$2(vertices,p1__20087_SHARP_);
}),tri);
}),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([triangles], 0)));
var normals = cljs.core.vec(cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic((function (p__20090){
var vec__20091 = p__20090;
var a = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20091,(0),null);
var b = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20091,(1),null);
var c = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20091,(2),null);
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
var map__20094 = temp__5825__auto__;
var map__20094__$1 = cljs.core.__destructure_map(map__20094);
var mesh_context = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20094__$1,new cljs.core.Keyword(null,"mesh-context","mesh-context",832369712));
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(kami.modeler.app.runtime,cljs.core.assoc,new cljs.core.Keyword(null,"buffers","buffers",471409492),kami.webgpu.mesh.upload_mesh_BANG_(mesh_context,kami.modeler.app.render_geometry(combined)));
} else {
return null;
}
});
kami.modeler.app.update_ui_BANG_ = (function kami$modeler$app$update_ui_BANG_(){
var map__20096 = cljs.core.deref(kami.modeler.app.state);
var map__20096__$1 = cljs.core.__destructure_map(map__20096);
var distance = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20096__$1,new cljs.core.Keyword(null,"distance","distance",-1671893894));
var profile = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20096__$1,new cljs.core.Keyword(null,"profile","profile",-545963874));
var scene = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20096__$1,new cljs.core.Keyword(null,"scene","scene",1523800415));
var selected_face = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20096__$1,new cljs.core.Keyword(null,"selected-face","selected-face",868513473));
var future = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20096__$1,new cljs.core.Keyword(null,"future","future",1877842724));
var revision = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20096__$1,new cljs.core.Keyword(null,"revision","revision",-1350113114));
var mode = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20096__$1,new cljs.core.Keyword(null,"mode","mode",654403691));
var history__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20096__$1,new cljs.core.Keyword(null,"history","history",-247395220));
var save_status = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20096__$1,new cljs.core.Keyword(null,"save-status","save-status",-2046612873));
var selected_id = new cljs.core.Keyword(null,"selected-object","selected-object",-1414474738).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(kami.modeler.app.state));
var mesh = kami.modeler.app.selected_mesh();
var object = kami.modeler.app.selected_object();
(document.getElementById("distanceValue").textContent = distance.toFixed((2)));

(document.getElementById("meshStats").textContent = [cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.count(new cljs.core.Keyword("scene","objects","scene/objects",1854528562).cljs$core$IFn$_invoke$arity$1(scene)))," objects \u00B7 ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.count(new cljs.core.Keyword("mesh","vertices","mesh/vertices",2013367832).cljs$core$IFn$_invoke$arity$1(kami.modeling.scene_mesh(scene))))," vertices"].join(''));

(document.getElementById("selection").textContent = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(mode,new cljs.core.Keyword(null,"edit","edit",-1641834166)))?(((!((selected_face == null))))?["Face ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(selected_face)," selected"].join(''):"No face selected"):["Object \u00B7 ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword("object","name","object/name",719647594).cljs$core$IFn$_invoke$arity$1(object))].join('')));

(document.getElementById("mode-toggle").textContent = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(mode,new cljs.core.Keyword(null,"edit","edit",-1641834166)))?"Edit Mode":"Object Mode"));

(document.getElementById("tool").textContent = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(mode,new cljs.core.Keyword(null,"edit","edit",-1641834166)))?"Face Select":"Object Select"));

var seq__20097_20269 = cljs.core.seq(new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, ["extrude","inset","scale","move","delete-face"], null));
var chunk__20098_20270 = null;
var count__20099_20271 = (0);
var i__20100_20272 = (0);
while(true){
if((i__20100_20272 < count__20099_20271)){
var id_20273 = chunk__20098_20270.cljs$core$IIndexed$_nth$arity$2(null, i__20100_20272);
(document.getElementById(id_20273).disabled = (function (){var or__5002__auto__ = cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(mode,new cljs.core.Keyword(null,"edit","edit",-1641834166));
if(or__5002__auto__){
return or__5002__auto__;
} else {
return new cljs.core.Keyword("object","locked?","object/locked?",-128650634).cljs$core$IFn$_invoke$arity$1(object);
}
})());


var G__20274 = seq__20097_20269;
var G__20275 = chunk__20098_20270;
var G__20276 = count__20099_20271;
var G__20277 = (i__20100_20272 + (1));
seq__20097_20269 = G__20274;
chunk__20098_20270 = G__20275;
count__20099_20271 = G__20276;
i__20100_20272 = G__20277;
continue;
} else {
var temp__5825__auto___20278 = cljs.core.seq(seq__20097_20269);
if(temp__5825__auto___20278){
var seq__20097_20279__$1 = temp__5825__auto___20278;
if(cljs.core.chunked_seq_QMARK_(seq__20097_20279__$1)){
var c__5525__auto___20280 = cljs.core.chunk_first(seq__20097_20279__$1);
var G__20281 = cljs.core.chunk_rest(seq__20097_20279__$1);
var G__20282 = c__5525__auto___20280;
var G__20283 = cljs.core.count(c__5525__auto___20280);
var G__20284 = (0);
seq__20097_20269 = G__20281;
chunk__20098_20270 = G__20282;
count__20099_20271 = G__20283;
i__20100_20272 = G__20284;
continue;
} else {
var id_20285 = cljs.core.first(seq__20097_20279__$1);
(document.getElementById(id_20285).disabled = (function (){var or__5002__auto__ = cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(mode,new cljs.core.Keyword(null,"edit","edit",-1641834166));
if(or__5002__auto__){
return or__5002__auto__;
} else {
return new cljs.core.Keyword("object","locked?","object/locked?",-128650634).cljs$core$IFn$_invoke$arity$1(object);
}
})());


var G__20286 = cljs.core.next(seq__20097_20279__$1);
var G__20287 = null;
var G__20288 = (0);
var G__20289 = (0);
seq__20097_20269 = G__20286;
chunk__20098_20270 = G__20287;
count__20099_20271 = G__20288;
i__20100_20272 = G__20289;
continue;
}
} else {
}
}
break;
}

var tree_20290 = document.getElementById("scene-tree");
(tree_20290.innerHTML = "");

var seq__20101_20291 = cljs.core.seq(new cljs.core.Keyword("scene","objects","scene/objects",1854528562).cljs$core$IFn$_invoke$arity$1(scene));
var chunk__20102_20292 = null;
var count__20103_20293 = (0);
var i__20104_20294 = (0);
while(true){
if((i__20104_20294 < count__20103_20293)){
var o_20295 = chunk__20102_20292.cljs$core$IIndexed$_nth$arity$2(null, i__20104_20294);
var row_20296 = document.createElement("div");
var b_20297 = document.createElement("button");
var visible_20298 = document.createElement("button");
var locked_20299 = document.createElement("button");
(row_20296.className = "outliner-row");

(b_20297.textContent = ["\u25C6 ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword("object","name","object/name",719647594).cljs$core$IFn$_invoke$arity$1(o_20295))].join(''));

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(selected_id,new cljs.core.Keyword("object","id","object/id",-432056555).cljs$core$IFn$_invoke$arity$1(o_20295))){
b_20297.classList.add("selected");
} else {
}

b_20297.addEventListener("click",((function (seq__20101_20291,chunk__20102_20292,count__20103_20293,i__20104_20294,row_20296,b_20297,visible_20298,locked_20299,o_20295,tree_20290,map__20096,map__20096__$1,distance,profile,scene,selected_face,future,revision,mode,history__$1,save_status,selected_id,mesh,object){
return (function (){
if(cljs.core.truth_(new cljs.core.Keyword("object","locked?","object/locked?",-128650634).cljs$core$IFn$_invoke$arity$1(o_20295))){
return null;
} else {
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(kami.modeler.app.state,cljs.core.assoc,new cljs.core.Keyword(null,"selected-object","selected-object",-1414474738),new cljs.core.Keyword("object","id","object/id",-432056555).cljs$core$IFn$_invoke$arity$1(o_20295),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"selected-face","selected-face",868513473),(0)], 0));

return (kami.modeler.app.update_ui_BANG_.cljs$core$IFn$_invoke$arity$0 ? kami.modeler.app.update_ui_BANG_.cljs$core$IFn$_invoke$arity$0() : kami.modeler.app.update_ui_BANG_.call(null, ));
}
});})(seq__20101_20291,chunk__20102_20292,count__20103_20293,i__20104_20294,row_20296,b_20297,visible_20298,locked_20299,o_20295,tree_20290,map__20096,map__20096__$1,distance,profile,scene,selected_face,future,revision,mode,history__$1,save_status,selected_id,mesh,object))
);

(visible_20298.textContent = (cljs.core.truth_(new cljs.core.Keyword("object","visible?","object/visible?",1173537124).cljs$core$IFn$_invoke$arity$1(o_20295))?"\u25C9":"\u25CB"));

(visible_20298.title = "Toggle visibility");

visible_20298.addEventListener("click",((function (seq__20101_20291,chunk__20102_20292,count__20103_20293,i__20104_20294,row_20296,b_20297,visible_20298,locked_20299,o_20295,tree_20290,map__20096,map__20096__$1,distance,profile,scene,selected_face,future,revision,mode,history__$1,save_status,selected_id,mesh,object){
return (function (){
var G__20122 = kami.modeling.set_object_visible(new cljs.core.Keyword(null,"scene","scene",1523800415).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(kami.modeler.app.state)),new cljs.core.Keyword("object","id","object/id",-432056555).cljs$core$IFn$_invoke$arity$1(o_20295),cljs.core.not(new cljs.core.Keyword("object","visible?","object/visible?",1173537124).cljs$core$IFn$_invoke$arity$1(o_20295)));
return (kami.modeler.app.commit_scene_BANG_.cljs$core$IFn$_invoke$arity$1 ? kami.modeler.app.commit_scene_BANG_.cljs$core$IFn$_invoke$arity$1(G__20122) : kami.modeler.app.commit_scene_BANG_.call(null, G__20122));
});})(seq__20101_20291,chunk__20102_20292,count__20103_20293,i__20104_20294,row_20296,b_20297,visible_20298,locked_20299,o_20295,tree_20290,map__20096,map__20096__$1,distance,profile,scene,selected_face,future,revision,mode,history__$1,save_status,selected_id,mesh,object))
);

(locked_20299.textContent = (cljs.core.truth_(new cljs.core.Keyword("object","locked?","object/locked?",-128650634).cljs$core$IFn$_invoke$arity$1(o_20295))?"\uD83D\uDD12":"\uD83D\uDD13"));

(locked_20299.title = "Toggle lock");

locked_20299.addEventListener("click",((function (seq__20101_20291,chunk__20102_20292,count__20103_20293,i__20104_20294,row_20296,b_20297,visible_20298,locked_20299,o_20295,tree_20290,map__20096,map__20096__$1,distance,profile,scene,selected_face,future,revision,mode,history__$1,save_status,selected_id,mesh,object){
return (function (){
var G__20123 = kami.modeling.set_object_locked(new cljs.core.Keyword(null,"scene","scene",1523800415).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(kami.modeler.app.state)),new cljs.core.Keyword("object","id","object/id",-432056555).cljs$core$IFn$_invoke$arity$1(o_20295),cljs.core.not(new cljs.core.Keyword("object","locked?","object/locked?",-128650634).cljs$core$IFn$_invoke$arity$1(o_20295)));
return (kami.modeler.app.commit_scene_BANG_.cljs$core$IFn$_invoke$arity$1 ? kami.modeler.app.commit_scene_BANG_.cljs$core$IFn$_invoke$arity$1(G__20123) : kami.modeler.app.commit_scene_BANG_.call(null, G__20123));
});})(seq__20101_20291,chunk__20102_20292,count__20103_20293,i__20104_20294,row_20296,b_20297,visible_20298,locked_20299,o_20295,tree_20290,map__20096,map__20096__$1,distance,profile,scene,selected_face,future,revision,mode,history__$1,save_status,selected_id,mesh,object))
);

var seq__20124_20300 = cljs.core.seq(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [b_20297,visible_20298,locked_20299], null));
var chunk__20125_20301 = null;
var count__20126_20302 = (0);
var i__20127_20303 = (0);
while(true){
if((i__20127_20303 < count__20126_20302)){
var node_20304 = chunk__20125_20301.cljs$core$IIndexed$_nth$arity$2(null, i__20127_20303);
row_20296.appendChild(node_20304);


var G__20305 = seq__20124_20300;
var G__20306 = chunk__20125_20301;
var G__20307 = count__20126_20302;
var G__20308 = (i__20127_20303 + (1));
seq__20124_20300 = G__20305;
chunk__20125_20301 = G__20306;
count__20126_20302 = G__20307;
i__20127_20303 = G__20308;
continue;
} else {
var temp__5825__auto___20309 = cljs.core.seq(seq__20124_20300);
if(temp__5825__auto___20309){
var seq__20124_20310__$1 = temp__5825__auto___20309;
if(cljs.core.chunked_seq_QMARK_(seq__20124_20310__$1)){
var c__5525__auto___20311 = cljs.core.chunk_first(seq__20124_20310__$1);
var G__20312 = cljs.core.chunk_rest(seq__20124_20310__$1);
var G__20313 = c__5525__auto___20311;
var G__20314 = cljs.core.count(c__5525__auto___20311);
var G__20315 = (0);
seq__20124_20300 = G__20312;
chunk__20125_20301 = G__20313;
count__20126_20302 = G__20314;
i__20127_20303 = G__20315;
continue;
} else {
var node_20316 = cljs.core.first(seq__20124_20310__$1);
row_20296.appendChild(node_20316);


var G__20317 = cljs.core.next(seq__20124_20310__$1);
var G__20318 = null;
var G__20319 = (0);
var G__20320 = (0);
seq__20124_20300 = G__20317;
chunk__20125_20301 = G__20318;
count__20126_20302 = G__20319;
i__20127_20303 = G__20320;
continue;
}
} else {
}
}
break;
}

tree_20290.appendChild(row_20296);


var G__20321 = seq__20101_20291;
var G__20322 = chunk__20102_20292;
var G__20323 = count__20103_20293;
var G__20324 = (i__20104_20294 + (1));
seq__20101_20291 = G__20321;
chunk__20102_20292 = G__20322;
count__20103_20293 = G__20323;
i__20104_20294 = G__20324;
continue;
} else {
var temp__5825__auto___20325 = cljs.core.seq(seq__20101_20291);
if(temp__5825__auto___20325){
var seq__20101_20326__$1 = temp__5825__auto___20325;
if(cljs.core.chunked_seq_QMARK_(seq__20101_20326__$1)){
var c__5525__auto___20327 = cljs.core.chunk_first(seq__20101_20326__$1);
var G__20328 = cljs.core.chunk_rest(seq__20101_20326__$1);
var G__20329 = c__5525__auto___20327;
var G__20330 = cljs.core.count(c__5525__auto___20327);
var G__20331 = (0);
seq__20101_20291 = G__20328;
chunk__20102_20292 = G__20329;
count__20103_20293 = G__20330;
i__20104_20294 = G__20331;
continue;
} else {
var o_20332 = cljs.core.first(seq__20101_20326__$1);
var row_20333 = document.createElement("div");
var b_20334 = document.createElement("button");
var visible_20335 = document.createElement("button");
var locked_20336 = document.createElement("button");
(row_20333.className = "outliner-row");

(b_20334.textContent = ["\u25C6 ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword("object","name","object/name",719647594).cljs$core$IFn$_invoke$arity$1(o_20332))].join(''));

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(selected_id,new cljs.core.Keyword("object","id","object/id",-432056555).cljs$core$IFn$_invoke$arity$1(o_20332))){
b_20334.classList.add("selected");
} else {
}

b_20334.addEventListener("click",((function (seq__20101_20291,chunk__20102_20292,count__20103_20293,i__20104_20294,row_20333,b_20334,visible_20335,locked_20336,o_20332,seq__20101_20326__$1,temp__5825__auto___20325,tree_20290,map__20096,map__20096__$1,distance,profile,scene,selected_face,future,revision,mode,history__$1,save_status,selected_id,mesh,object){
return (function (){
if(cljs.core.truth_(new cljs.core.Keyword("object","locked?","object/locked?",-128650634).cljs$core$IFn$_invoke$arity$1(o_20332))){
return null;
} else {
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(kami.modeler.app.state,cljs.core.assoc,new cljs.core.Keyword(null,"selected-object","selected-object",-1414474738),new cljs.core.Keyword("object","id","object/id",-432056555).cljs$core$IFn$_invoke$arity$1(o_20332),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"selected-face","selected-face",868513473),(0)], 0));

return (kami.modeler.app.update_ui_BANG_.cljs$core$IFn$_invoke$arity$0 ? kami.modeler.app.update_ui_BANG_.cljs$core$IFn$_invoke$arity$0() : kami.modeler.app.update_ui_BANG_.call(null, ));
}
});})(seq__20101_20291,chunk__20102_20292,count__20103_20293,i__20104_20294,row_20333,b_20334,visible_20335,locked_20336,o_20332,seq__20101_20326__$1,temp__5825__auto___20325,tree_20290,map__20096,map__20096__$1,distance,profile,scene,selected_face,future,revision,mode,history__$1,save_status,selected_id,mesh,object))
);

(visible_20335.textContent = (cljs.core.truth_(new cljs.core.Keyword("object","visible?","object/visible?",1173537124).cljs$core$IFn$_invoke$arity$1(o_20332))?"\u25C9":"\u25CB"));

(visible_20335.title = "Toggle visibility");

visible_20335.addEventListener("click",((function (seq__20101_20291,chunk__20102_20292,count__20103_20293,i__20104_20294,row_20333,b_20334,visible_20335,locked_20336,o_20332,seq__20101_20326__$1,temp__5825__auto___20325,tree_20290,map__20096,map__20096__$1,distance,profile,scene,selected_face,future,revision,mode,history__$1,save_status,selected_id,mesh,object){
return (function (){
var G__20128 = kami.modeling.set_object_visible(new cljs.core.Keyword(null,"scene","scene",1523800415).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(kami.modeler.app.state)),new cljs.core.Keyword("object","id","object/id",-432056555).cljs$core$IFn$_invoke$arity$1(o_20332),cljs.core.not(new cljs.core.Keyword("object","visible?","object/visible?",1173537124).cljs$core$IFn$_invoke$arity$1(o_20332)));
return (kami.modeler.app.commit_scene_BANG_.cljs$core$IFn$_invoke$arity$1 ? kami.modeler.app.commit_scene_BANG_.cljs$core$IFn$_invoke$arity$1(G__20128) : kami.modeler.app.commit_scene_BANG_.call(null, G__20128));
});})(seq__20101_20291,chunk__20102_20292,count__20103_20293,i__20104_20294,row_20333,b_20334,visible_20335,locked_20336,o_20332,seq__20101_20326__$1,temp__5825__auto___20325,tree_20290,map__20096,map__20096__$1,distance,profile,scene,selected_face,future,revision,mode,history__$1,save_status,selected_id,mesh,object))
);

(locked_20336.textContent = (cljs.core.truth_(new cljs.core.Keyword("object","locked?","object/locked?",-128650634).cljs$core$IFn$_invoke$arity$1(o_20332))?"\uD83D\uDD12":"\uD83D\uDD13"));

(locked_20336.title = "Toggle lock");

locked_20336.addEventListener("click",((function (seq__20101_20291,chunk__20102_20292,count__20103_20293,i__20104_20294,row_20333,b_20334,visible_20335,locked_20336,o_20332,seq__20101_20326__$1,temp__5825__auto___20325,tree_20290,map__20096,map__20096__$1,distance,profile,scene,selected_face,future,revision,mode,history__$1,save_status,selected_id,mesh,object){
return (function (){
var G__20129 = kami.modeling.set_object_locked(new cljs.core.Keyword(null,"scene","scene",1523800415).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(kami.modeler.app.state)),new cljs.core.Keyword("object","id","object/id",-432056555).cljs$core$IFn$_invoke$arity$1(o_20332),cljs.core.not(new cljs.core.Keyword("object","locked?","object/locked?",-128650634).cljs$core$IFn$_invoke$arity$1(o_20332)));
return (kami.modeler.app.commit_scene_BANG_.cljs$core$IFn$_invoke$arity$1 ? kami.modeler.app.commit_scene_BANG_.cljs$core$IFn$_invoke$arity$1(G__20129) : kami.modeler.app.commit_scene_BANG_.call(null, G__20129));
});})(seq__20101_20291,chunk__20102_20292,count__20103_20293,i__20104_20294,row_20333,b_20334,visible_20335,locked_20336,o_20332,seq__20101_20326__$1,temp__5825__auto___20325,tree_20290,map__20096,map__20096__$1,distance,profile,scene,selected_face,future,revision,mode,history__$1,save_status,selected_id,mesh,object))
);

var seq__20130_20337 = cljs.core.seq(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [b_20334,visible_20335,locked_20336], null));
var chunk__20131_20338 = null;
var count__20132_20339 = (0);
var i__20133_20340 = (0);
while(true){
if((i__20133_20340 < count__20132_20339)){
var node_20341 = chunk__20131_20338.cljs$core$IIndexed$_nth$arity$2(null, i__20133_20340);
row_20333.appendChild(node_20341);


var G__20342 = seq__20130_20337;
var G__20343 = chunk__20131_20338;
var G__20344 = count__20132_20339;
var G__20345 = (i__20133_20340 + (1));
seq__20130_20337 = G__20342;
chunk__20131_20338 = G__20343;
count__20132_20339 = G__20344;
i__20133_20340 = G__20345;
continue;
} else {
var temp__5825__auto___20346__$1 = cljs.core.seq(seq__20130_20337);
if(temp__5825__auto___20346__$1){
var seq__20130_20347__$1 = temp__5825__auto___20346__$1;
if(cljs.core.chunked_seq_QMARK_(seq__20130_20347__$1)){
var c__5525__auto___20348 = cljs.core.chunk_first(seq__20130_20347__$1);
var G__20349 = cljs.core.chunk_rest(seq__20130_20347__$1);
var G__20350 = c__5525__auto___20348;
var G__20351 = cljs.core.count(c__5525__auto___20348);
var G__20352 = (0);
seq__20130_20337 = G__20349;
chunk__20131_20338 = G__20350;
count__20132_20339 = G__20351;
i__20133_20340 = G__20352;
continue;
} else {
var node_20353 = cljs.core.first(seq__20130_20347__$1);
row_20333.appendChild(node_20353);


var G__20354 = cljs.core.next(seq__20130_20347__$1);
var G__20355 = null;
var G__20356 = (0);
var G__20357 = (0);
seq__20130_20337 = G__20354;
chunk__20131_20338 = G__20355;
count__20132_20339 = G__20356;
i__20133_20340 = G__20357;
continue;
}
} else {
}
}
break;
}

tree_20290.appendChild(row_20333);


var G__20358 = cljs.core.next(seq__20101_20326__$1);
var G__20359 = null;
var G__20360 = (0);
var G__20361 = (0);
seq__20101_20291 = G__20358;
chunk__20102_20292 = G__20359;
count__20103_20293 = G__20360;
i__20104_20294 = G__20361;
continue;
}
} else {
}
}
break;
}

if(cljs.core.truth_(object)){
(document.getElementById("object-name").value = new cljs.core.Keyword("object","name","object/name",719647594).cljs$core$IFn$_invoke$arity$1(object));

var seq__20134_20362 = cljs.core.seq(cljs.core.map.cljs$core$IFn$_invoke$arity$3(cljs.core.vector,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["tx","ty","tz"], null),new cljs.core.Keyword("object","translation","object/translation",254639254).cljs$core$IFn$_invoke$arity$1(object)));
var chunk__20135_20363 = null;
var count__20136_20364 = (0);
var i__20137_20365 = (0);
while(true){
if((i__20137_20365 < count__20136_20364)){
var vec__20146_20366 = chunk__20135_20363.cljs$core$IIndexed$_nth$arity$2(null, i__20137_20365);
var id_20367 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20146_20366,(0),null);
var value_20368 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20146_20366,(1),null);
(document.getElementById(id_20367).value = value_20368);


var G__20369 = seq__20134_20362;
var G__20370 = chunk__20135_20363;
var G__20371 = count__20136_20364;
var G__20372 = (i__20137_20365 + (1));
seq__20134_20362 = G__20369;
chunk__20135_20363 = G__20370;
count__20136_20364 = G__20371;
i__20137_20365 = G__20372;
continue;
} else {
var temp__5825__auto___20373 = cljs.core.seq(seq__20134_20362);
if(temp__5825__auto___20373){
var seq__20134_20374__$1 = temp__5825__auto___20373;
if(cljs.core.chunked_seq_QMARK_(seq__20134_20374__$1)){
var c__5525__auto___20375 = cljs.core.chunk_first(seq__20134_20374__$1);
var G__20376 = cljs.core.chunk_rest(seq__20134_20374__$1);
var G__20377 = c__5525__auto___20375;
var G__20378 = cljs.core.count(c__5525__auto___20375);
var G__20379 = (0);
seq__20134_20362 = G__20376;
chunk__20135_20363 = G__20377;
count__20136_20364 = G__20378;
i__20137_20365 = G__20379;
continue;
} else {
var vec__20149_20380 = cljs.core.first(seq__20134_20374__$1);
var id_20381 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20149_20380,(0),null);
var value_20382 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20149_20380,(1),null);
(document.getElementById(id_20381).value = value_20382);


var G__20383 = cljs.core.next(seq__20134_20374__$1);
var G__20384 = null;
var G__20385 = (0);
var G__20386 = (0);
seq__20134_20362 = G__20383;
chunk__20135_20363 = G__20384;
count__20136_20364 = G__20385;
i__20137_20365 = G__20386;
continue;
}
} else {
}
}
break;
}

var parent_select_20387 = document.getElementById("object-parent");
(parent_select_20387.innerHTML = "");

var seq__20152_20388 = cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["","None"], null)], null),cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (parent_select_20387,map__20096,map__20096__$1,distance,profile,scene,selected_face,future,revision,mode,history__$1,save_status,selected_id,mesh,object){
return (function (o){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword("object","id","object/id",-432056555).cljs$core$IFn$_invoke$arity$1(o)),new cljs.core.Keyword("object","name","object/name",719647594).cljs$core$IFn$_invoke$arity$1(o)], null);
});})(parent_select_20387,map__20096,map__20096__$1,distance,profile,scene,selected_face,future,revision,mode,history__$1,save_status,selected_id,mesh,object))
,cljs.core.remove.cljs$core$IFn$_invoke$arity$2(((function (parent_select_20387,map__20096,map__20096__$1,distance,profile,scene,selected_face,future,revision,mode,history__$1,save_status,selected_id,mesh,object){
return (function (p1__20095_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("object","id","object/id",-432056555).cljs$core$IFn$_invoke$arity$1(p1__20095_SHARP_),selected_id);
});})(parent_select_20387,map__20096,map__20096__$1,distance,profile,scene,selected_face,future,revision,mode,history__$1,save_status,selected_id,mesh,object))
,new cljs.core.Keyword("scene","objects","scene/objects",1854528562).cljs$core$IFn$_invoke$arity$1(scene)))));
var chunk__20153_20389 = null;
var count__20154_20390 = (0);
var i__20155_20391 = (0);
while(true){
if((i__20155_20391 < count__20154_20390)){
var vec__20162_20392 = chunk__20153_20389.cljs$core$IIndexed$_nth$arity$2(null, i__20155_20391);
var value_20393 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20162_20392,(0),null);
var label_20394 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20162_20392,(1),null);
var option_20395 = document.createElement("option");
(option_20395.value = value_20393);

(option_20395.textContent = label_20394);

parent_select_20387.appendChild(option_20395);


var G__20396 = seq__20152_20388;
var G__20397 = chunk__20153_20389;
var G__20398 = count__20154_20390;
var G__20399 = (i__20155_20391 + (1));
seq__20152_20388 = G__20396;
chunk__20153_20389 = G__20397;
count__20154_20390 = G__20398;
i__20155_20391 = G__20399;
continue;
} else {
var temp__5825__auto___20400 = cljs.core.seq(seq__20152_20388);
if(temp__5825__auto___20400){
var seq__20152_20401__$1 = temp__5825__auto___20400;
if(cljs.core.chunked_seq_QMARK_(seq__20152_20401__$1)){
var c__5525__auto___20402 = cljs.core.chunk_first(seq__20152_20401__$1);
var G__20403 = cljs.core.chunk_rest(seq__20152_20401__$1);
var G__20404 = c__5525__auto___20402;
var G__20405 = cljs.core.count(c__5525__auto___20402);
var G__20406 = (0);
seq__20152_20388 = G__20403;
chunk__20153_20389 = G__20404;
count__20154_20390 = G__20405;
i__20155_20391 = G__20406;
continue;
} else {
var vec__20165_20407 = cljs.core.first(seq__20152_20401__$1);
var value_20408 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20165_20407,(0),null);
var label_20409 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20165_20407,(1),null);
var option_20410 = document.createElement("option");
(option_20410.value = value_20408);

(option_20410.textContent = label_20409);

parent_select_20387.appendChild(option_20410);


var G__20411 = cljs.core.next(seq__20152_20401__$1);
var G__20412 = null;
var G__20413 = (0);
var G__20414 = (0);
seq__20152_20388 = G__20411;
chunk__20153_20389 = G__20412;
count__20154_20390 = G__20413;
i__20155_20391 = G__20414;
continue;
}
} else {
}
}
break;
}

(parent_select_20387.value = cljs.core.str.cljs$core$IFn$_invoke$arity$1((function (){var or__5002__auto__ = new cljs.core.Keyword("object","parent","object/parent",-2036564858).cljs$core$IFn$_invoke$arity$1(object);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return "";
}
})()));

var seq__20168_20415 = cljs.core.seq(new cljs.core.PersistentVector(null, 10, 5, cljs.core.PersistentVector.EMPTY_NODE, ["object-name","tx","ty","tz","object-parent","apply-transform","add-mirror","add-subdivision","add-array","delete-object"], null));
var chunk__20169_20416 = null;
var count__20170_20417 = (0);
var i__20171_20418 = (0);
while(true){
if((i__20171_20418 < count__20170_20417)){
var id_20419 = chunk__20169_20416.cljs$core$IIndexed$_nth$arity$2(null, i__20171_20418);
(document.getElementById(id_20419).disabled = new cljs.core.Keyword("object","locked?","object/locked?",-128650634).cljs$core$IFn$_invoke$arity$1(object));


var G__20420 = seq__20168_20415;
var G__20421 = chunk__20169_20416;
var G__20422 = count__20170_20417;
var G__20423 = (i__20171_20418 + (1));
seq__20168_20415 = G__20420;
chunk__20169_20416 = G__20421;
count__20170_20417 = G__20422;
i__20171_20418 = G__20423;
continue;
} else {
var temp__5825__auto___20424 = cljs.core.seq(seq__20168_20415);
if(temp__5825__auto___20424){
var seq__20168_20425__$1 = temp__5825__auto___20424;
if(cljs.core.chunked_seq_QMARK_(seq__20168_20425__$1)){
var c__5525__auto___20426 = cljs.core.chunk_first(seq__20168_20425__$1);
var G__20427 = cljs.core.chunk_rest(seq__20168_20425__$1);
var G__20428 = c__5525__auto___20426;
var G__20429 = cljs.core.count(c__5525__auto___20426);
var G__20430 = (0);
seq__20168_20415 = G__20427;
chunk__20169_20416 = G__20428;
count__20170_20417 = G__20429;
i__20171_20418 = G__20430;
continue;
} else {
var id_20431 = cljs.core.first(seq__20168_20425__$1);
(document.getElementById(id_20431).disabled = new cljs.core.Keyword("object","locked?","object/locked?",-128650634).cljs$core$IFn$_invoke$arity$1(object));


var G__20432 = cljs.core.next(seq__20168_20425__$1);
var G__20433 = null;
var G__20434 = (0);
var G__20435 = (0);
seq__20168_20415 = G__20432;
chunk__20169_20416 = G__20433;
count__20170_20417 = G__20434;
i__20171_20418 = G__20435;
continue;
}
} else {
}
}
break;
}

var stack_20436 = document.getElementById("modifier-stack");
(stack_20436.innerHTML = "");

var seq__20176_20437 = cljs.core.seq(cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2(cljs.core.vector,new cljs.core.Keyword("object","modifiers","object/modifiers",-637449455).cljs$core$IFn$_invoke$arity$1(object)));
var chunk__20177_20438 = null;
var count__20178_20439 = (0);
var i__20179_20440 = (0);
while(true){
if((i__20179_20440 < count__20178_20439)){
var vec__20204_20441 = chunk__20177_20438.cljs$core$IIndexed$_nth$arity$2(null, i__20179_20440);
var index_20442 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20204_20441,(0),null);
var mod_20443 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20204_20441,(1),null);
var row_20444 = document.createElement("div");
var label_20445 = document.createElement("span");
var up_20446 = document.createElement("button");
var down_20447 = document.createElement("button");
var remove_20448 = document.createElement("button");
(row_20444.className = "modifier-row");

(label_20445.textContent = [cljs.core.name(new cljs.core.Keyword("modifier","kind","modifier/kind",1915708240).cljs$core$IFn$_invoke$arity$1(mod_20443))," ",cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword("modifier","options","modifier/options",-509583934).cljs$core$IFn$_invoke$arity$1(mod_20443)], 0))].join(''));

(up_20446.textContent = "\u2191");

(up_20446.disabled = (index_20442 === (0)));

up_20446.addEventListener("click",((function (seq__20176_20437,chunk__20177_20438,count__20178_20439,i__20179_20440,row_20444,label_20445,up_20446,down_20447,remove_20448,vec__20204_20441,index_20442,mod_20443,stack_20436,map__20096,map__20096__$1,distance,profile,scene,selected_face,future,revision,mode,history__$1,save_status,selected_id,mesh,object){
return (function (){
var G__20207 = kami.modeling.update_object.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"scene","scene",1523800415).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(kami.modeler.app.state)),new cljs.core.Keyword(null,"selected-object","selected-object",-1414474738).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(kami.modeler.app.state)),kami.modeling.move_modifier,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword("modifier","id","modifier/id",-1089554595).cljs$core$IFn$_invoke$arity$1(mod_20443),(index_20442 - (1))], 0));
return (kami.modeler.app.commit_scene_BANG_.cljs$core$IFn$_invoke$arity$1 ? kami.modeler.app.commit_scene_BANG_.cljs$core$IFn$_invoke$arity$1(G__20207) : kami.modeler.app.commit_scene_BANG_.call(null, G__20207));
});})(seq__20176_20437,chunk__20177_20438,count__20178_20439,i__20179_20440,row_20444,label_20445,up_20446,down_20447,remove_20448,vec__20204_20441,index_20442,mod_20443,stack_20436,map__20096,map__20096__$1,distance,profile,scene,selected_face,future,revision,mode,history__$1,save_status,selected_id,mesh,object))
);

(down_20447.textContent = "\u2193");

(down_20447.disabled = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(index_20442,(cljs.core.count(new cljs.core.Keyword("object","modifiers","object/modifiers",-637449455).cljs$core$IFn$_invoke$arity$1(object)) - (1))));

down_20447.addEventListener("click",((function (seq__20176_20437,chunk__20177_20438,count__20178_20439,i__20179_20440,row_20444,label_20445,up_20446,down_20447,remove_20448,vec__20204_20441,index_20442,mod_20443,stack_20436,map__20096,map__20096__$1,distance,profile,scene,selected_face,future,revision,mode,history__$1,save_status,selected_id,mesh,object){
return (function (){
var G__20208 = kami.modeling.update_object.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"scene","scene",1523800415).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(kami.modeler.app.state)),new cljs.core.Keyword(null,"selected-object","selected-object",-1414474738).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(kami.modeler.app.state)),kami.modeling.move_modifier,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword("modifier","id","modifier/id",-1089554595).cljs$core$IFn$_invoke$arity$1(mod_20443),(index_20442 + (1))], 0));
return (kami.modeler.app.commit_scene_BANG_.cljs$core$IFn$_invoke$arity$1 ? kami.modeler.app.commit_scene_BANG_.cljs$core$IFn$_invoke$arity$1(G__20208) : kami.modeler.app.commit_scene_BANG_.call(null, G__20208));
});})(seq__20176_20437,chunk__20177_20438,count__20178_20439,i__20179_20440,row_20444,label_20445,up_20446,down_20447,remove_20448,vec__20204_20441,index_20442,mod_20443,stack_20436,map__20096,map__20096__$1,distance,profile,scene,selected_face,future,revision,mode,history__$1,save_status,selected_id,mesh,object))
);

(remove_20448.textContent = "\u00D7");

remove_20448.addEventListener("click",((function (seq__20176_20437,chunk__20177_20438,count__20178_20439,i__20179_20440,row_20444,label_20445,up_20446,down_20447,remove_20448,vec__20204_20441,index_20442,mod_20443,stack_20436,map__20096,map__20096__$1,distance,profile,scene,selected_face,future,revision,mode,history__$1,save_status,selected_id,mesh,object){
return (function (){
var G__20209 = kami.modeling.update_object.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"scene","scene",1523800415).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(kami.modeler.app.state)),new cljs.core.Keyword(null,"selected-object","selected-object",-1414474738).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(kami.modeler.app.state)),kami.modeling.remove_modifier,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword("modifier","id","modifier/id",-1089554595).cljs$core$IFn$_invoke$arity$1(mod_20443)], 0));
return (kami.modeler.app.commit_scene_BANG_.cljs$core$IFn$_invoke$arity$1 ? kami.modeler.app.commit_scene_BANG_.cljs$core$IFn$_invoke$arity$1(G__20209) : kami.modeler.app.commit_scene_BANG_.call(null, G__20209));
});})(seq__20176_20437,chunk__20177_20438,count__20178_20439,i__20179_20440,row_20444,label_20445,up_20446,down_20447,remove_20448,vec__20204_20441,index_20442,mod_20443,stack_20436,map__20096,map__20096__$1,distance,profile,scene,selected_face,future,revision,mode,history__$1,save_status,selected_id,mesh,object))
);

var seq__20210_20449 = cljs.core.seq(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [label_20445,up_20446,down_20447,remove_20448], null));
var chunk__20211_20450 = null;
var count__20212_20451 = (0);
var i__20213_20452 = (0);
while(true){
if((i__20213_20452 < count__20212_20451)){
var node_20453 = chunk__20211_20450.cljs$core$IIndexed$_nth$arity$2(null, i__20213_20452);
row_20444.appendChild(node_20453);


var G__20454 = seq__20210_20449;
var G__20455 = chunk__20211_20450;
var G__20456 = count__20212_20451;
var G__20457 = (i__20213_20452 + (1));
seq__20210_20449 = G__20454;
chunk__20211_20450 = G__20455;
count__20212_20451 = G__20456;
i__20213_20452 = G__20457;
continue;
} else {
var temp__5825__auto___20458 = cljs.core.seq(seq__20210_20449);
if(temp__5825__auto___20458){
var seq__20210_20459__$1 = temp__5825__auto___20458;
if(cljs.core.chunked_seq_QMARK_(seq__20210_20459__$1)){
var c__5525__auto___20460 = cljs.core.chunk_first(seq__20210_20459__$1);
var G__20461 = cljs.core.chunk_rest(seq__20210_20459__$1);
var G__20462 = c__5525__auto___20460;
var G__20463 = cljs.core.count(c__5525__auto___20460);
var G__20464 = (0);
seq__20210_20449 = G__20461;
chunk__20211_20450 = G__20462;
count__20212_20451 = G__20463;
i__20213_20452 = G__20464;
continue;
} else {
var node_20465 = cljs.core.first(seq__20210_20459__$1);
row_20444.appendChild(node_20465);


var G__20466 = cljs.core.next(seq__20210_20459__$1);
var G__20467 = null;
var G__20468 = (0);
var G__20469 = (0);
seq__20210_20449 = G__20466;
chunk__20211_20450 = G__20467;
count__20212_20451 = G__20468;
i__20213_20452 = G__20469;
continue;
}
} else {
}
}
break;
}

stack_20436.appendChild(row_20444);


var G__20470 = seq__20176_20437;
var G__20471 = chunk__20177_20438;
var G__20472 = count__20178_20439;
var G__20473 = (i__20179_20440 + (1));
seq__20176_20437 = G__20470;
chunk__20177_20438 = G__20471;
count__20178_20439 = G__20472;
i__20179_20440 = G__20473;
continue;
} else {
var temp__5825__auto___20474 = cljs.core.seq(seq__20176_20437);
if(temp__5825__auto___20474){
var seq__20176_20475__$1 = temp__5825__auto___20474;
if(cljs.core.chunked_seq_QMARK_(seq__20176_20475__$1)){
var c__5525__auto___20476 = cljs.core.chunk_first(seq__20176_20475__$1);
var G__20477 = cljs.core.chunk_rest(seq__20176_20475__$1);
var G__20478 = c__5525__auto___20476;
var G__20479 = cljs.core.count(c__5525__auto___20476);
var G__20480 = (0);
seq__20176_20437 = G__20477;
chunk__20177_20438 = G__20478;
count__20178_20439 = G__20479;
i__20179_20440 = G__20480;
continue;
} else {
var vec__20214_20481 = cljs.core.first(seq__20176_20475__$1);
var index_20482 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20214_20481,(0),null);
var mod_20483 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20214_20481,(1),null);
var row_20484 = document.createElement("div");
var label_20485 = document.createElement("span");
var up_20486 = document.createElement("button");
var down_20487 = document.createElement("button");
var remove_20488 = document.createElement("button");
(row_20484.className = "modifier-row");

(label_20485.textContent = [cljs.core.name(new cljs.core.Keyword("modifier","kind","modifier/kind",1915708240).cljs$core$IFn$_invoke$arity$1(mod_20483))," ",cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword("modifier","options","modifier/options",-509583934).cljs$core$IFn$_invoke$arity$1(mod_20483)], 0))].join(''));

(up_20486.textContent = "\u2191");

(up_20486.disabled = (index_20482 === (0)));

up_20486.addEventListener("click",((function (seq__20176_20437,chunk__20177_20438,count__20178_20439,i__20179_20440,row_20484,label_20485,up_20486,down_20487,remove_20488,vec__20214_20481,index_20482,mod_20483,seq__20176_20475__$1,temp__5825__auto___20474,stack_20436,map__20096,map__20096__$1,distance,profile,scene,selected_face,future,revision,mode,history__$1,save_status,selected_id,mesh,object){
return (function (){
var G__20217 = kami.modeling.update_object.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"scene","scene",1523800415).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(kami.modeler.app.state)),new cljs.core.Keyword(null,"selected-object","selected-object",-1414474738).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(kami.modeler.app.state)),kami.modeling.move_modifier,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword("modifier","id","modifier/id",-1089554595).cljs$core$IFn$_invoke$arity$1(mod_20483),(index_20482 - (1))], 0));
return (kami.modeler.app.commit_scene_BANG_.cljs$core$IFn$_invoke$arity$1 ? kami.modeler.app.commit_scene_BANG_.cljs$core$IFn$_invoke$arity$1(G__20217) : kami.modeler.app.commit_scene_BANG_.call(null, G__20217));
});})(seq__20176_20437,chunk__20177_20438,count__20178_20439,i__20179_20440,row_20484,label_20485,up_20486,down_20487,remove_20488,vec__20214_20481,index_20482,mod_20483,seq__20176_20475__$1,temp__5825__auto___20474,stack_20436,map__20096,map__20096__$1,distance,profile,scene,selected_face,future,revision,mode,history__$1,save_status,selected_id,mesh,object))
);

(down_20487.textContent = "\u2193");

(down_20487.disabled = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(index_20482,(cljs.core.count(new cljs.core.Keyword("object","modifiers","object/modifiers",-637449455).cljs$core$IFn$_invoke$arity$1(object)) - (1))));

down_20487.addEventListener("click",((function (seq__20176_20437,chunk__20177_20438,count__20178_20439,i__20179_20440,row_20484,label_20485,up_20486,down_20487,remove_20488,vec__20214_20481,index_20482,mod_20483,seq__20176_20475__$1,temp__5825__auto___20474,stack_20436,map__20096,map__20096__$1,distance,profile,scene,selected_face,future,revision,mode,history__$1,save_status,selected_id,mesh,object){
return (function (){
var G__20218 = kami.modeling.update_object.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"scene","scene",1523800415).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(kami.modeler.app.state)),new cljs.core.Keyword(null,"selected-object","selected-object",-1414474738).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(kami.modeler.app.state)),kami.modeling.move_modifier,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword("modifier","id","modifier/id",-1089554595).cljs$core$IFn$_invoke$arity$1(mod_20483),(index_20482 + (1))], 0));
return (kami.modeler.app.commit_scene_BANG_.cljs$core$IFn$_invoke$arity$1 ? kami.modeler.app.commit_scene_BANG_.cljs$core$IFn$_invoke$arity$1(G__20218) : kami.modeler.app.commit_scene_BANG_.call(null, G__20218));
});})(seq__20176_20437,chunk__20177_20438,count__20178_20439,i__20179_20440,row_20484,label_20485,up_20486,down_20487,remove_20488,vec__20214_20481,index_20482,mod_20483,seq__20176_20475__$1,temp__5825__auto___20474,stack_20436,map__20096,map__20096__$1,distance,profile,scene,selected_face,future,revision,mode,history__$1,save_status,selected_id,mesh,object))
);

(remove_20488.textContent = "\u00D7");

remove_20488.addEventListener("click",((function (seq__20176_20437,chunk__20177_20438,count__20178_20439,i__20179_20440,row_20484,label_20485,up_20486,down_20487,remove_20488,vec__20214_20481,index_20482,mod_20483,seq__20176_20475__$1,temp__5825__auto___20474,stack_20436,map__20096,map__20096__$1,distance,profile,scene,selected_face,future,revision,mode,history__$1,save_status,selected_id,mesh,object){
return (function (){
var G__20219 = kami.modeling.update_object.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"scene","scene",1523800415).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(kami.modeler.app.state)),new cljs.core.Keyword(null,"selected-object","selected-object",-1414474738).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(kami.modeler.app.state)),kami.modeling.remove_modifier,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword("modifier","id","modifier/id",-1089554595).cljs$core$IFn$_invoke$arity$1(mod_20483)], 0));
return (kami.modeler.app.commit_scene_BANG_.cljs$core$IFn$_invoke$arity$1 ? kami.modeler.app.commit_scene_BANG_.cljs$core$IFn$_invoke$arity$1(G__20219) : kami.modeler.app.commit_scene_BANG_.call(null, G__20219));
});})(seq__20176_20437,chunk__20177_20438,count__20178_20439,i__20179_20440,row_20484,label_20485,up_20486,down_20487,remove_20488,vec__20214_20481,index_20482,mod_20483,seq__20176_20475__$1,temp__5825__auto___20474,stack_20436,map__20096,map__20096__$1,distance,profile,scene,selected_face,future,revision,mode,history__$1,save_status,selected_id,mesh,object))
);

var seq__20220_20489 = cljs.core.seq(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [label_20485,up_20486,down_20487,remove_20488], null));
var chunk__20221_20490 = null;
var count__20222_20491 = (0);
var i__20223_20492 = (0);
while(true){
if((i__20223_20492 < count__20222_20491)){
var node_20493 = chunk__20221_20490.cljs$core$IIndexed$_nth$arity$2(null, i__20223_20492);
row_20484.appendChild(node_20493);


var G__20494 = seq__20220_20489;
var G__20495 = chunk__20221_20490;
var G__20496 = count__20222_20491;
var G__20497 = (i__20223_20492 + (1));
seq__20220_20489 = G__20494;
chunk__20221_20490 = G__20495;
count__20222_20491 = G__20496;
i__20223_20492 = G__20497;
continue;
} else {
var temp__5825__auto___20498__$1 = cljs.core.seq(seq__20220_20489);
if(temp__5825__auto___20498__$1){
var seq__20220_20499__$1 = temp__5825__auto___20498__$1;
if(cljs.core.chunked_seq_QMARK_(seq__20220_20499__$1)){
var c__5525__auto___20500 = cljs.core.chunk_first(seq__20220_20499__$1);
var G__20501 = cljs.core.chunk_rest(seq__20220_20499__$1);
var G__20502 = c__5525__auto___20500;
var G__20503 = cljs.core.count(c__5525__auto___20500);
var G__20504 = (0);
seq__20220_20489 = G__20501;
chunk__20221_20490 = G__20502;
count__20222_20491 = G__20503;
i__20223_20492 = G__20504;
continue;
} else {
var node_20505 = cljs.core.first(seq__20220_20499__$1);
row_20484.appendChild(node_20505);


var G__20506 = cljs.core.next(seq__20220_20499__$1);
var G__20507 = null;
var G__20508 = (0);
var G__20509 = (0);
seq__20220_20489 = G__20506;
chunk__20221_20490 = G__20507;
count__20222_20491 = G__20508;
i__20223_20492 = G__20509;
continue;
}
} else {
}
}
break;
}

stack_20436.appendChild(row_20484);


var G__20510 = cljs.core.next(seq__20176_20475__$1);
var G__20511 = null;
var G__20512 = (0);
var G__20513 = (0);
seq__20176_20437 = G__20510;
chunk__20177_20438 = G__20511;
count__20178_20439 = G__20512;
i__20179_20440 = G__20513;
continue;
}
} else {
}
}
break;
}
} else {
}

(document.getElementById("debug-state").textContent = JSON.stringify(cljs.core.clj__GT_js(cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"projectVersion","projectVersion",412999009),new cljs.core.Keyword(null,"parent","parent",-878878779),new cljs.core.Keyword(null,"revision","revision",-1350113114),new cljs.core.Keyword(null,"modifierCount","modifierCount",-1004030298),new cljs.core.Keyword(null,"objectCount","objectCount",1420430730),new cljs.core.Keyword(null,"mode","mode",654403691),new cljs.core.Keyword(null,"saveStatus","saveStatus",-284043285),new cljs.core.Keyword(null,"selectedObject","selectedObject",1181017491),new cljs.core.Keyword(null,"evaluatedVertices","evaluatedVertices",298696211),new cljs.core.Keyword(null,"locked","locked",-1658763820),new cljs.core.Keyword(null,"visible","visible",-1024216805),new cljs.core.Keyword(null,"faceCount","faceCount",645869915),new cljs.core.Keyword(null,"profile","profile",-545963874)],[kami.modeler.project.current_version,new cljs.core.Keyword("object","parent","object/parent",-2036564858).cljs$core$IFn$_invoke$arity$1(object),revision,cljs.core.count(new cljs.core.Keyword("object","modifiers","object/modifiers",-637449455).cljs$core$IFn$_invoke$arity$1(object)),cljs.core.count(new cljs.core.Keyword("scene","objects","scene/objects",1854528562).cljs$core$IFn$_invoke$arity$1(scene)),cljs.core.name(mode),cljs.core.name(save_status),selected_id,cljs.core.count(new cljs.core.Keyword("mesh","vertices","mesh/vertices",2013367832).cljs$core$IFn$_invoke$arity$1(kami.modeling.evaluated_object_mesh(object))),new cljs.core.Keyword("object","locked?","object/locked?",-128650634).cljs$core$IFn$_invoke$arity$1(object),new cljs.core.Keyword("object","visible?","object/visible?",1173537124).cljs$core$IFn$_invoke$arity$1(object),cljs.core.count(new cljs.core.Keyword("mesh","faces","mesh/faces",-521361119).cljs$core$IFn$_invoke$arity$1(mesh)),cljs.core.name(profile)]))));

(document.getElementById("project-status").textContent = [cljs.core.name(save_status)," \u00B7 r",cljs.core.str.cljs$core$IFn$_invoke$arity$1(revision)].join(''));

(document.getElementById("undo").disabled = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((1),cljs.core.count(history__$1)));

(document.getElementById("redo").disabled = cljs.core.empty_QMARK_(future));

return (document.getElementById("shortcutHint").textContent = (function (){var G__20224 = profile;
var G__20224__$1 = (((G__20224 instanceof cljs.core.Keyword))?G__20224.fqn:null);
switch (G__20224__$1) {
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
return ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"edit","edit",-1641834166),new cljs.core.Keyword(null,"mode","mode",654403691).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(kami.modeler.app.state)))) && (cljs.core.not(new cljs.core.Keyword("object","locked?","object/locked?",-128650634).cljs$core$IFn$_invoke$arity$1(kami.modeler.app.selected_object()))));
});
kami.modeler.app.extrude_BANG_ = (function kami$modeler$app$extrude_BANG_(){
if(kami.modeler.app.edit_mode_QMARK_()){
var map__20225 = cljs.core.deref(kami.modeler.app.state);
var map__20225__$1 = cljs.core.__destructure_map(map__20225);
var selected_face = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20225__$1,new cljs.core.Keyword(null,"selected-face","selected-face",868513473));
var distance = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20225__$1,new cljs.core.Keyword(null,"distance","distance",-1671893894));
var mesh = kami.modeler.app.selected_mesh();
var next_selected_face = (cljs.core.count(new cljs.core.Keyword("mesh","faces","mesh/faces",-521361119).cljs$core$IFn$_invoke$arity$1(mesh)) - (1));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(kami.modeler.app.state,cljs.core.assoc,new cljs.core.Keyword(null,"selected-face","selected-face",868513473),next_selected_face);

return kami.modeler.app.commit_mesh_BANG_(kami.modeling.extrude_face(mesh,selected_face,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(0),distance], null)));
} else {
return null;
}
});
kami.modeler.app.inset_BANG_ = (function kami$modeler$app$inset_BANG_(){
var map__20226 = cljs.core.deref(kami.modeler.app.state);
var map__20226__$1 = cljs.core.__destructure_map(map__20226);
var selected_face = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20226__$1,new cljs.core.Keyword(null,"selected-face","selected-face",868513473));
var distance = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20226__$1,new cljs.core.Keyword(null,"distance","distance",-1671893894));
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
var map__20227 = cljs.core.deref(kami.modeler.app.state);
var map__20227__$1 = cljs.core.__destructure_map(map__20227);
var selected_face = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20227__$1,new cljs.core.Keyword(null,"selected-face","selected-face",868513473));
var distance = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20227__$1,new cljs.core.Keyword(null,"distance","distance",-1671893894));
var mesh = kami.modeler.app.selected_mesh();
if(((kami.modeler.app.edit_mode_QMARK_()) && ((!((selected_face == null)))))){
return kami.modeler.app.commit_mesh_BANG_(kami.modeling.scale_face(mesh,selected_face,distance));
} else {
return null;
}
});
kami.modeler.app.move_BANG_ = (function kami$modeler$app$move_BANG_(){
var map__20228 = cljs.core.deref(kami.modeler.app.state);
var map__20228__$1 = cljs.core.__destructure_map(map__20228);
var selected_face = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20228__$1,new cljs.core.Keyword(null,"selected-face","selected-face",868513473));
var distance = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20228__$1,new cljs.core.Keyword(null,"distance","distance",-1671893894));
var mesh = kami.modeler.app.selected_mesh();
if(((kami.modeler.app.edit_mode_QMARK_()) && ((!((selected_face == null)))))){
return kami.modeler.app.commit_mesh_BANG_(kami.modeling.translate_face(mesh,selected_face,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(0),distance], null)));
} else {
return null;
}
});
kami.modeler.app.delete_face_BANG_ = (function kami$modeler$app$delete_face_BANG_(){
var map__20229 = cljs.core.deref(kami.modeler.app.state);
var map__20229__$1 = cljs.core.__destructure_map(map__20229);
var selected_face = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20229__$1,new cljs.core.Keyword(null,"selected-face","selected-face",868513473));
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
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(kami.modeler.app.state,cljs.core.update,new cljs.core.Keyword(null,"mode","mode",654403691),(function (p1__20230_SHARP_){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(p1__20230_SHARP_,new cljs.core.Keyword(null,"edit","edit",-1641834166))){
return new cljs.core.Keyword(null,"object","object",1474613949);
} else {
return new cljs.core.Keyword(null,"edit","edit",-1641834166);
}
}));

return kami.modeler.app.update_ui_BANG_();
});
kami.modeler.app.editable_target_QMARK_ = (function kami$modeler$app$editable_target_QMARK_(event){
var target = event.target;
var tag = (function (){var G__20231 = target;
var G__20231__$1 = (((G__20231 == null))?null:G__20231.tagName);
if((G__20231__$1 == null)){
return null;
} else {
return G__20231__$1.toLowerCase();
}
})();
var or__5002__auto__ = (function (){var fexpr__20232 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 3, ["select",null,"input",null,"textarea",null], null), null);
return (fexpr__20232.cljs$core$IFn$_invoke$arity$1 ? fexpr__20232.cljs$core$IFn$_invoke$arity$1(tag) : fexpr__20232.call(null, tag));
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
var fexpr__20233 = new cljs.core.PersistentArrayMap(null, 5, ["e",new cljs.core.Keyword(null,"extrude","extrude",-1625117733),"i",new cljs.core.Keyword(null,"inset","inset",-396367740),"g",new cljs.core.Keyword(null,"move","move",-2110884309),"s",new cljs.core.Keyword(null,"scale","scale",-230427353),"x",new cljs.core.Keyword(null,"delete-face","delete-face",748805504)], null);
return (fexpr__20233.cljs$core$IFn$_invoke$arity$1 ? fexpr__20233.cljs$core$IFn$_invoke$arity$1(key) : fexpr__20233.call(null, key));
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
var fexpr__20234 = new cljs.core.PersistentArrayMap(null, 5, ["d",new cljs.core.Keyword(null,"extrude","extrude",-1625117733),"i",new cljs.core.Keyword(null,"inset","inset",-396367740),"e",new cljs.core.Keyword(null,"move","move",-2110884309),"t",new cljs.core.Keyword(null,"scale","scale",-230427353),"backspace",new cljs.core.Keyword(null,"delete-face","delete-face",748805504)], null);
return (fexpr__20234.cljs$core$IFn$_invoke$arity$1 ? fexpr__20234.cljs$core$IFn$_invoke$arity$1(key) : fexpr__20234.call(null, key));
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
var G__20235 = command;
var G__20235__$1 = (((G__20235 instanceof cljs.core.Keyword))?G__20235.fqn:null);
switch (G__20235__$1) {
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
var map__20236 = cljs.core.deref(kami.modeler.app.state);
var map__20236__$1 = cljs.core.__destructure_map(map__20236);
var project_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20236__$1,new cljs.core.Keyword(null,"project-id","project-id",206449307));
var profile = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20236__$1,new cljs.core.Keyword(null,"profile","profile",-545963874));
var scene = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20236__$1,new cljs.core.Keyword(null,"scene","scene",1523800415));
var selected_face = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20236__$1,new cljs.core.Keyword(null,"selected-face","selected-face",868513473));
var project_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20236__$1,new cljs.core.Keyword(null,"project-name","project-name",1486861539));
var elevation = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20236__$1,new cljs.core.Keyword(null,"elevation","elevation",-1609348796));
var mode = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20236__$1,new cljs.core.Keyword(null,"mode","mode",654403691));
var selected_object = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20236__$1,new cljs.core.Keyword(null,"selected-object","selected-object",-1414474738));
var azimuth = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20236__$1,new cljs.core.Keyword(null,"azimuth","azimuth",-165971535));
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
}catch (e20237){var _ = e20237;
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
var temp__5825__auto___20516 = cljs.core.deref(kami.modeler.app.runtime);
if(cljs.core.truth_(temp__5825__auto___20516)){
var map__20238_20517 = temp__5825__auto___20516;
var map__20238_20518__$1 = cljs.core.__destructure_map(map__20238_20517);
var viewport_20519 = map__20238_20518__$1;
var buffers_20520 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20238_20518__$1,new cljs.core.Keyword(null,"buffers","buffers",471409492));
if(cljs.core.truth_(buffers_20520)){
var map__20239_20521 = cljs.core.deref(kami.modeler.app.state);
var map__20239_20522__$1 = cljs.core.__destructure_map(map__20239_20521);
var azimuth_20523 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20239_20522__$1,new cljs.core.Keyword(null,"azimuth","azimuth",-165971535));
var elevation_20524 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20239_20522__$1,new cljs.core.Keyword(null,"elevation","elevation",-1609348796));
var d_20525 = 6.0;
var eye_20526 = new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [((d_20525 * Math.cos(elevation_20524)) * Math.cos(azimuth_20523)),(d_20525 * Math.sin(elevation_20524)),((d_20525 * Math.cos(elevation_20524)) * Math.sin(azimuth_20523))], null);
kami.webgpu.mesh.render_frame_BANG_.cljs$core$IFn$_invoke$arity$5(viewport_20519,buffers_20520,eye_20526,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(0),(0)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [0.35,0.58,1.0], null));
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
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (p1__20240_SHARP_){
return (p1__20240_SHARP_ / l);
}),v);
});
kami.modeler.app.add3 = (function kami$modeler$app$add3(var_args){
var args__5732__auto__ = [];
var len__5726__auto___20527 = arguments.length;
var i__5727__auto___20528 = (0);
while(true){
if((i__5727__auto___20528 < len__5726__auto___20527)){
args__5732__auto__.push((arguments[i__5727__auto___20528]));

var G__20529 = (i__5727__auto___20528 + (1));
i__5727__auto___20528 = G__20529;
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
(kami.modeler.app.add3.cljs$lang$applyTo = (function (seq20241){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq20241));
}));

kami.modeler.app.mul3 = (function kami$modeler$app$mul3(v,s){
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (p1__20242_SHARP_){
return (p1__20242_SHARP_ * s);
}),v);
});
kami.modeler.app.camera_eye = (function kami$modeler$app$camera_eye(){
var map__20243 = cljs.core.deref(kami.modeler.app.state);
var map__20243__$1 = cljs.core.__destructure_map(map__20243);
var azimuth = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20243__$1,new cljs.core.Keyword(null,"azimuth","azimuth",-165971535));
var elevation = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20243__$1,new cljs.core.Keyword(null,"elevation","elevation",-1609348796));
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

document.getElementById("distance").addEventListener("input",(function (p1__20244_SHARP_){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(kami.modeler.app.state,cljs.core.assoc,new cljs.core.Keyword(null,"distance","distance",-1671893894),parseFloat(p1__20244_SHARP_.target.value));
}));

document.getElementById("profile").addEventListener("change",(function (p1__20245_SHARP_){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(kami.modeler.app.state,cljs.core.assoc,new cljs.core.Keyword(null,"profile","profile",-545963874),cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(p1__20245_SHARP_.target.value));

return kami.modeler.app.update_ui_BANG_();
}));

canvas.addEventListener("contextmenu",(function (p1__20246_SHARP_){
return p1__20246_SHARP_.preventDefault();
}));

canvas.addEventListener("pointerdown",(function (p1__20247_SHARP_){
if(cljs.core.truth_((function (){var or__5002__auto__ = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((1),p1__20247_SHARP_.button);
if(or__5002__auto__){
return or__5002__auto__;
} else {
return p1__20247_SHARP_.altKey;
}
})())){
return cljs.core.reset_BANG_(drag,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__20247_SHARP_.clientX,p1__20247_SHARP_.clientY], null));
} else {
if(kami.modeler.app.edit_mode_QMARK_()){
return kami.modeler.app.pick_at_BANG_(canvas,p1__20247_SHARP_);
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
var vec__20250 = temp__5825__auto__;
var x = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20250,(0),null);
var y = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20250,(1),null);
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

window.addEventListener("keydown",(function (p1__20248_SHARP_){
if(cljs.core.truth_(kami.modeler.app.editable_target_QMARK_(p1__20248_SHARP_))){
return null;
} else {
var temp__5825__auto__ = kami.modeler.app.command_for_event(p1__20248_SHARP_);
if(cljs.core.truth_(temp__5825__auto__)){
var command = temp__5825__auto__;
p1__20248_SHARP_.preventDefault();

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

document.getElementById("object-parent").addEventListener("change",(function (p1__20249_SHARP_){
var raw = p1__20249_SHARP_.target.value;
var parent_id = ((cljs.core.seq(raw))?parseInt(raw):null);
return kami.modeler.app.commit_scene_BANG_(kami.modeling.reparent_object(new cljs.core.Keyword(null,"scene","scene",1523800415).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(kami.modeler.app.state)),new cljs.core.Keyword(null,"selected-object","selected-object",-1414474738).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(kami.modeler.app.state)),parent_id));
}));

var seq__20253_20530 = cljs.core.seq(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["add-mirror",new cljs.core.Keyword(null,"mirror","mirror",1914600218),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"axis","axis",-1215390822),new cljs.core.Keyword(null,"x","x",2099068185)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["add-subdivision",new cljs.core.Keyword(null,"subdivision","subdivision",1172317679),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"levels","levels",-950747887),(1)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["add-array",new cljs.core.Keyword(null,"array","array",-2080713842),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"count","count",2139924085),(3),new cljs.core.Keyword(null,"offset","offset",296498311),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [2.5,(0),(0)], null)], null)], null)], null));
var chunk__20254_20531 = null;
var count__20255_20532 = (0);
var i__20256_20533 = (0);
while(true){
if((i__20256_20533 < count__20255_20532)){
var vec__20263_20534 = chunk__20254_20531.cljs$core$IIndexed$_nth$arity$2(null, i__20256_20533);
var id_20535 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20263_20534,(0),null);
var kind_20536 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20263_20534,(1),null);
var options_20537 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20263_20534,(2),null);
document.getElementById(id_20535).addEventListener("click",((function (seq__20253_20530,chunk__20254_20531,count__20255_20532,i__20256_20533,vec__20263_20534,id_20535,kind_20536,options_20537,canvas,drag){
return (function (){
return kami.modeler.app.commit_scene_BANG_(kami.modeling.update_object.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"scene","scene",1523800415).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(kami.modeler.app.state)),new cljs.core.Keyword(null,"selected-object","selected-object",-1414474738).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(kami.modeler.app.state)),kami.modeling.add_modifier,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([kami.modeling.modifier.cljs$core$IFn$_invoke$arity$2(kind_20536,options_20537)], 0)));
});})(seq__20253_20530,chunk__20254_20531,count__20255_20532,i__20256_20533,vec__20263_20534,id_20535,kind_20536,options_20537,canvas,drag))
);


var G__20538 = seq__20253_20530;
var G__20539 = chunk__20254_20531;
var G__20540 = count__20255_20532;
var G__20541 = (i__20256_20533 + (1));
seq__20253_20530 = G__20538;
chunk__20254_20531 = G__20539;
count__20255_20532 = G__20540;
i__20256_20533 = G__20541;
continue;
} else {
var temp__5825__auto___20542 = cljs.core.seq(seq__20253_20530);
if(temp__5825__auto___20542){
var seq__20253_20543__$1 = temp__5825__auto___20542;
if(cljs.core.chunked_seq_QMARK_(seq__20253_20543__$1)){
var c__5525__auto___20544 = cljs.core.chunk_first(seq__20253_20543__$1);
var G__20545 = cljs.core.chunk_rest(seq__20253_20543__$1);
var G__20546 = c__5525__auto___20544;
var G__20547 = cljs.core.count(c__5525__auto___20544);
var G__20548 = (0);
seq__20253_20530 = G__20545;
chunk__20254_20531 = G__20546;
count__20255_20532 = G__20547;
i__20256_20533 = G__20548;
continue;
} else {
var vec__20266_20549 = cljs.core.first(seq__20253_20543__$1);
var id_20550 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20266_20549,(0),null);
var kind_20551 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20266_20549,(1),null);
var options_20552 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20266_20549,(2),null);
document.getElementById(id_20550).addEventListener("click",((function (seq__20253_20530,chunk__20254_20531,count__20255_20532,i__20256_20533,vec__20266_20549,id_20550,kind_20551,options_20552,seq__20253_20543__$1,temp__5825__auto___20542,canvas,drag){
return (function (){
return kami.modeler.app.commit_scene_BANG_(kami.modeling.update_object.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"scene","scene",1523800415).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(kami.modeler.app.state)),new cljs.core.Keyword(null,"selected-object","selected-object",-1414474738).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(kami.modeler.app.state)),kami.modeling.add_modifier,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([kami.modeling.modifier.cljs$core$IFn$_invoke$arity$2(kind_20551,options_20552)], 0)));
});})(seq__20253_20530,chunk__20254_20531,count__20255_20532,i__20256_20533,vec__20266_20549,id_20550,kind_20551,options_20552,seq__20253_20543__$1,temp__5825__auto___20542,canvas,drag))
);


var G__20553 = cljs.core.next(seq__20253_20543__$1);
var G__20554 = null;
var G__20555 = (0);
var G__20556 = (0);
seq__20253_20530 = G__20553;
chunk__20254_20531 = G__20554;
count__20255_20532 = G__20555;
i__20256_20533 = G__20556;
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
