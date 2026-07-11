goog.provide('kami.modeler.project');
kami.modeler.project.current_version = (2);
kami.modeler.project.document = (function kami$modeler$project$document(p__19953){
var map__19954 = p__19953;
var map__19954__$1 = cljs.core.__destructure_map(map__19954);
var id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19954__$1,new cljs.core.Keyword(null,"id","id",-1388402092));
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19954__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var scene = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19954__$1,new cljs.core.Keyword(null,"scene","scene",1523800415));
var selection = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19954__$1,new cljs.core.Keyword(null,"selection","selection",975998651));
var camera = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19954__$1,new cljs.core.Keyword(null,"camera","camera",-1190348585));
var interaction = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19954__$1,new cljs.core.Keyword(null,"interaction","interaction",-2143888916));
return new cljs.core.PersistentArrayMap(null, 8, [new cljs.core.Keyword("kami","document","kami/document",-1333247185),new cljs.core.Keyword(null,"modeler-project","modeler-project",-319687125),new cljs.core.Keyword("kami","version","kami/version",428545552),kami.modeler.project.current_version,new cljs.core.Keyword("project","id","project/id",-791740645),(function (){var or__5002__auto__ = id;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return "untitled";
}
})(),new cljs.core.Keyword("project","name","project/name",2022968152),(function (){var or__5002__auto__ = name;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return "Untitled Model";
}
})(),new cljs.core.Keyword("project","scene","project/scene",742580822),scene,new cljs.core.Keyword("project","selection","project/selection",746373586),selection,new cljs.core.Keyword("project","camera","project/camera",-1501758414),camera,new cljs.core.Keyword("project","interaction","project/interaction",-1316543261),interaction], null);
});
/**
 * Normalizes supported project versions. A legacy bare scene is v1.
 */
kami.modeler.project.migrate = (function kami$modeler$project$migrate(value){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"modeler-project","modeler-project",-319687125),new cljs.core.Keyword("kami","document","kami/document",-1333247185).cljs$core$IFn$_invoke$arity$1(value))){
var G__19962 = new cljs.core.Keyword("kami","version","kami/version",428545552).cljs$core$IFn$_invoke$arity$1(value);
switch (G__19962) {
case (2):
return value;

break;
case (1):
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(value,new cljs.core.Keyword("kami","version","kami/version",428545552),(2),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword("project","selection","project/selection",746373586),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"object-id","object-id",-754527291),(function (){var G__19964 = value;
var G__19964__$1 = (((G__19964 == null))?null:new cljs.core.Keyword("project","scene","project/scene",742580822).cljs$core$IFn$_invoke$arity$1(G__19964));
var G__19964__$2 = (((G__19964__$1 == null))?null:new cljs.core.Keyword("scene","objects","scene/objects",1854528562).cljs$core$IFn$_invoke$arity$1(G__19964__$1));
var G__19964__$3 = (((G__19964__$2 == null))?null:cljs.core.first(G__19964__$2));
if((G__19964__$3 == null)){
return null;
} else {
return new cljs.core.Keyword("object","id","object/id",-432056555).cljs$core$IFn$_invoke$arity$1(G__19964__$3);
}
})(),new cljs.core.Keyword(null,"face-id","face-id",-2023925409),(0),new cljs.core.Keyword(null,"mode","mode",654403691),new cljs.core.Keyword(null,"object","object",1474613949)], null),new cljs.core.Keyword("project","camera","project/camera",-1501758414),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"azimuth","azimuth",-165971535),0.7,new cljs.core.Keyword(null,"elevation","elevation",-1609348796),0.45], null),new cljs.core.Keyword("project","interaction","project/interaction",-1316543261),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"profile","profile",-545963874),new cljs.core.Keyword(null,"blender","blender",354426016)], null)], 0)),new cljs.core.Keyword("project","version","project/version",132630599));

break;
default:
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("Unsupported Modeler project version",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"version","version",425292698),new cljs.core.Keyword("kami","version","kami/version",428545552).cljs$core$IFn$_invoke$arity$1(value)], null));

}
} else {
if(cljs.core.truth_(new cljs.core.Keyword("scene","objects","scene/objects",1854528562).cljs$core$IFn$_invoke$arity$1(value))){
return kami.modeler.project.document(new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"scene","scene",1523800415),value,new cljs.core.Keyword(null,"selection","selection",975998651),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"object-id","object-id",-754527291),(function (){var G__19967 = value;
var G__19967__$1 = (((G__19967 == null))?null:new cljs.core.Keyword("scene","objects","scene/objects",1854528562).cljs$core$IFn$_invoke$arity$1(G__19967));
var G__19967__$2 = (((G__19967__$1 == null))?null:cljs.core.first(G__19967__$1));
if((G__19967__$2 == null)){
return null;
} else {
return new cljs.core.Keyword("object","id","object/id",-432056555).cljs$core$IFn$_invoke$arity$1(G__19967__$2);
}
})(),new cljs.core.Keyword(null,"face-id","face-id",-2023925409),(0),new cljs.core.Keyword(null,"mode","mode",654403691),new cljs.core.Keyword(null,"object","object",1474613949)], null),new cljs.core.Keyword(null,"camera","camera",-1190348585),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"azimuth","azimuth",-165971535),0.7,new cljs.core.Keyword(null,"elevation","elevation",-1609348796),0.45], null),new cljs.core.Keyword(null,"interaction","interaction",-2143888916),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"profile","profile",-545963874),new cljs.core.Keyword(null,"blender","blender",354426016)], null)], null));
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("Not a Modeler project or scene",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"value","value",305978217),value], null));

}
}
});
kami.modeler.project.valid_QMARK_ = (function kami$modeler$project$valid_QMARK_(project){
return ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"modeler-project","modeler-project",-319687125),new cljs.core.Keyword("kami","document","kami/document",-1333247185).cljs$core$IFn$_invoke$arity$1(project))) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(kami.modeler.project.current_version,new cljs.core.Keyword("kami","version","kami/version",428545552).cljs$core$IFn$_invoke$arity$1(project))) && (((typeof new cljs.core.Keyword("project","id","project/id",-791740645).cljs$core$IFn$_invoke$arity$1(project) === 'string') && (((typeof new cljs.core.Keyword("project","name","project/name",2022968152).cljs$core$IFn$_invoke$arity$1(project) === 'string') && (((cljs.core.seq(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(project,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("project","scene","project/scene",742580822),new cljs.core.Keyword("scene","objects","scene/objects",1854528562)], null)))) && (((cljs.core.map_QMARK_(new cljs.core.Keyword("project","selection","project/selection",746373586).cljs$core$IFn$_invoke$arity$1(project))) && (((cljs.core.map_QMARK_(new cljs.core.Keyword("project","camera","project/camera",-1501758414).cljs$core$IFn$_invoke$arity$1(project))) && (cljs.core.map_QMARK_(new cljs.core.Keyword("project","interaction","project/interaction",-1316543261).cljs$core$IFn$_invoke$arity$1(project))))))))))))))));
});
kami.modeler.project.open = (function kami$modeler$project$open(value){
var project = kami.modeler.project.migrate(value);
if(kami.modeler.project.valid_QMARK_(project)){
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("Invalid Modeler project",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"project","project",1124394579),project], null));
}

return project;
});

//# sourceMappingURL=kami.modeler.project.js.map
