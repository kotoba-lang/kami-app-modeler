goog.provide('kami.wgsl');
kami.wgsl.ident = (function kami$wgsl$ident(s){
return clojure.string.replace(cljs.core.name(s),"-","_");
});
kami.wgsl.num = (function kami$wgsl$num(n){
var s = cljs.core.str.cljs$core$IFn$_invoke$arity$1(n);
if(((clojure.string.includes_QMARK_(s,".")) || (clojure.string.includes_QMARK_(s,"e")))){
return s;
} else {
return [s,".0"].join('');
}
});
kami.wgsl.ctors = cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"vec2f","vec2f",1137910944),new cljs.core.Keyword(null,"mat3","mat3",402087048),new cljs.core.Keyword(null,"vec3","vec3",1116680488),new cljs.core.Keyword(null,"mat4x4f","mat4x4f",-385848663),new cljs.core.Keyword(null,"mat3x3f","mat3x3f",-1944994195),new cljs.core.Keyword(null,"vec4","vec4",631182126),new cljs.core.Keyword(null,"vec3f","vec3f",1863586128),new cljs.core.Keyword(null,"vec2","vec2",-762258640),new cljs.core.Keyword(null,"mat4","mat4",-237531594),new cljs.core.Keyword(null,"vec4f","vec4f",910304471)],["vec2f","mat3x3<f32>","vec3<f32>","mat4x4f","mat3x3f","vec4<f32>","vec3f","vec2<f32>","mat4x4<f32>","vec4f"]);
kami.wgsl.vec_heads = new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"vec2","vec2",-762258640),"vec2",new cljs.core.Keyword(null,"vec3","vec3",1116680488),"vec3",new cljs.core.Keyword(null,"vec4","vec4",631182126),"vec4",new cljs.core.Keyword(null,"mat3","mat3",402087048),"mat3x3",new cljs.core.Keyword(null,"mat4","mat4",-237531594),"mat4x4"], null);
kami.wgsl.type_str = (function kami$wgsl$type_str(t){
if(typeof t === 'string'){
return t;
} else {
if(cljs.core.vector_QMARK_(t)){
var vec__20119 = t;
var head = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20119,(0),null);
var elem = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20119,(1),null);
var temp__5823__auto__ = (kami.wgsl.vec_heads.cljs$core$IFn$_invoke$arity$1 ? kami.wgsl.vec_heads.cljs$core$IFn$_invoke$arity$1(head) : kami.wgsl.vec_heads.call(null, head));
if(cljs.core.truth_(temp__5823__auto__)){
var base = temp__5823__auto__;
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(base),"<",cljs.core.str.cljs$core$IFn$_invoke$arity$1((function (){var G__20123 = (function (){var or__5002__auto__ = elem;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return new cljs.core.Keyword(null,"f32","f32",358377936);
}
})();
return (kami.wgsl.type_str.cljs$core$IFn$_invoke$arity$1 ? kami.wgsl.type_str.cljs$core$IFn$_invoke$arity$1(G__20123) : kami.wgsl.type_str.call(null, G__20123));
})()),">"].join('');
} else {
var or__5002__auto__ = (kami.wgsl.ctors.cljs$core$IFn$_invoke$arity$1 ? kami.wgsl.ctors.cljs$core$IFn$_invoke$arity$1(head) : kami.wgsl.ctors.call(null, head));
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return kami.wgsl.ident(head);
}
}
} else {
var or__5002__auto__ = (kami.wgsl.ctors.cljs$core$IFn$_invoke$arity$1 ? kami.wgsl.ctors.cljs$core$IFn$_invoke$arity$1(t) : kami.wgsl.ctors.call(null, t));
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return kami.wgsl.ident(t);
}

}
}
});
kami.wgsl.wgsl_call = (function kami$wgsl$wgsl_call(op,args){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1((function (){var or__5002__auto__ = (kami.wgsl.ctors.cljs$core$IFn$_invoke$arity$1 ? kami.wgsl.ctors.cljs$core$IFn$_invoke$arity$1(op) : kami.wgsl.ctors.call(null, op));
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return kami.wgsl.ident(op);
}
})()),"(",clojure.string.join.cljs$core$IFn$_invoke$arity$2(", ",args),")"].join('');
});
kami.wgsl.wgsl_special = (function kami$wgsl$wgsl_special(op,xs,go){
var G__20124 = op;
var G__20124__$1 = (((G__20124 instanceof cljs.core.Keyword))?G__20124.fqn:null);
switch (G__20124__$1) {
case "i":
return cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.first(xs));

break;
case ".":
return ["(",cljs.core.str.cljs$core$IFn$_invoke$arity$1((function (){var G__20127 = cljs.core.first(xs);
return (go.cljs$core$IFn$_invoke$arity$1 ? go.cljs$core$IFn$_invoke$arity$1(G__20127) : go.call(null, G__20127));
})()),").",kami.wgsl.ident(cljs.core.second(xs))].join('');

break;
default:
return null;

}
});
/**
 * Compile an EDN expression to a WGSL expression string.
 */
kami.wgsl.expr = (function kami$wgsl$expr(e){
var G__20128 = new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"ident","ident",-742346),kami.wgsl.ident,new cljs.core.Keyword(null,"num","num",1985240673),kami.wgsl.num,new cljs.core.Keyword(null,"call","call",-519999866),kami.wgsl.wgsl_call,new cljs.core.Keyword(null,"special","special",-1125941630),kami.wgsl.wgsl_special], null);
var G__20129 = e;
return (kotoba.expr.compile.cljs$core$IFn$_invoke$arity$2 ? kotoba.expr.compile.cljs$core$IFn$_invoke$arity$2(G__20128,G__20129) : kotoba.expr.compile.call(null, G__20128,G__20129));
});
kami.wgsl.block = (function kami$wgsl$block(stmts){
return clojure.string.join.cljs$core$IFn$_invoke$arity$2("\n",cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__20130_SHARP_){
return ["  ",clojure.string.replace((kami.wgsl.stmt.cljs$core$IFn$_invoke$arity$1 ? kami.wgsl.stmt.cljs$core$IFn$_invoke$arity$1(p1__20130_SHARP_) : kami.wgsl.stmt.call(null, p1__20130_SHARP_)),"\n","\n  ")].join('');
}),stmts));
});
kami.wgsl.for_step = (function kami$wgsl$for_step(s){
var vec__20133 = s;
var op = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20133,(0),null);
var x = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20133,(1),null);
var G__20136 = op;
var G__20136__$1 = (((G__20136 instanceof cljs.core.Keyword))?G__20136.fqn:null);
switch (G__20136__$1) {
case "++":
return [kami.wgsl.ident(x),"++"].join('');

break;
case "--":
return [kami.wgsl.ident(x),"--"].join('');

break;
default:
return clojure.string.replace((kami.wgsl.stmt.cljs$core$IFn$_invoke$arity$1 ? kami.wgsl.stmt.cljs$core$IFn$_invoke$arity$1(s) : kami.wgsl.stmt.call(null, s)),/;$/,"");

}
});
/**
 * Compile an EDN statement to a WGSL statement string.
 */
kami.wgsl.stmt = (function kami$wgsl$stmt(s){
var vec__20140 = s;
var seq__20141 = cljs.core.seq(vec__20140);
var first__20142 = cljs.core.first(seq__20141);
var seq__20141__$1 = cljs.core.next(seq__20141);
var op = first__20142;
var xs = seq__20141__$1;
var G__20144 = op;
var G__20144__$1 = (((G__20144 instanceof cljs.core.Keyword))?G__20144.fqn:null);
switch (G__20144__$1) {
case "let":
return ["let ",kami.wgsl.ident(cljs.core.first(xs))," = ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(kami.wgsl.expr(cljs.core.second(xs))),";"].join('');

break;
case "var":
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((3),cljs.core.count(xs))){
return ["var ",kami.wgsl.ident(cljs.core.first(xs)),": ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(kami.wgsl.type_str(cljs.core.second(xs)))," = ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(kami.wgsl.expr(cljs.core.nth.cljs$core$IFn$_invoke$arity$2(xs,(2)))),";"].join('');
} else {
return ["var ",kami.wgsl.ident(cljs.core.first(xs))," = ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(kami.wgsl.expr(cljs.core.second(xs))),";"].join('');
}

break;
case "decl":
return ["var ",kami.wgsl.ident(cljs.core.first(xs)),": ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(kami.wgsl.type_str(cljs.core.second(xs))),";"].join('');

break;
case "set":
return [kami.wgsl.ident(cljs.core.first(xs))," = ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(kami.wgsl.expr(cljs.core.second(xs))),";"].join('');

break;
case "+=":
return [kami.wgsl.ident(cljs.core.first(xs))," += ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(kami.wgsl.expr(cljs.core.second(xs))),";"].join('');

break;
case "-=":
return [kami.wgsl.ident(cljs.core.first(xs))," -= ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(kami.wgsl.expr(cljs.core.second(xs))),";"].join('');

break;
case "++":
return [kami.wgsl.ident(cljs.core.first(xs)),"++;"].join('');

break;
case "--":
return [kami.wgsl.ident(cljs.core.first(xs)),"--;"].join('');

break;
case "return":
if(cljs.core.seq(xs)){
return ["return ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(kami.wgsl.expr(cljs.core.first(xs))),";"].join('');
} else {
return "return;";
}

break;
case "if":
return ["if (",cljs.core.str.cljs$core$IFn$_invoke$arity$1(kami.wgsl.expr(cljs.core.first(xs))),") {\n",kami.wgsl.block(cljs.core.second(xs)),"\n}",(((cljs.core.count(xs) > (2)))?[" else {\n",kami.wgsl.block(cljs.core.nth.cljs$core$IFn$_invoke$arity$2(xs,(2))),"\n}"].join(''):null)].join('');

break;
case "for":
var vec__20150 = xs;
var seq__20151 = cljs.core.seq(vec__20150);
var first__20152 = cljs.core.first(seq__20151);
var seq__20151__$1 = cljs.core.next(seq__20151);
var init = first__20152;
var first__20152__$1 = cljs.core.first(seq__20151__$1);
var seq__20151__$2 = cljs.core.next(seq__20151__$1);
var cnd = first__20152__$1;
var first__20152__$2 = cljs.core.first(seq__20151__$2);
var seq__20151__$3 = cljs.core.next(seq__20151__$2);
var step = first__20152__$2;
var body = seq__20151__$3;
return ["for (",clojure.string.replace((kami.wgsl.stmt.cljs$core$IFn$_invoke$arity$1 ? kami.wgsl.stmt.cljs$core$IFn$_invoke$arity$1(init) : kami.wgsl.stmt.call(null, init)),/;$/,""),"; ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(kami.wgsl.expr(cnd)),"; ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(kami.wgsl.for_step(step)),") {\n",kami.wgsl.block(body),"\n}"].join('');

break;
default:
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(kami.wgsl.expr(s)),";"].join('');

}
});
kami.wgsl.attr_str = (function kami$wgsl$attr_str(a){
if((a == null)){
return "";
} else {
if(cljs.core.truth_(new cljs.core.Keyword(null,"builtin","builtin",-1707593346).cljs$core$IFn$_invoke$arity$1(a))){
return ["@builtin(",kami.wgsl.ident(new cljs.core.Keyword(null,"builtin","builtin",-1707593346).cljs$core$IFn$_invoke$arity$1(a)),") "].join('');
} else {
if(cljs.core.truth_(new cljs.core.Keyword(null,"location","location",1815599388).cljs$core$IFn$_invoke$arity$1(a))){
return ["@location(",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"location","location",1815599388).cljs$core$IFn$_invoke$arity$1(a)),") "].join('');
} else {
return "";

}
}
}
});
kami.wgsl.param_str = (function kami$wgsl$param_str(p__20153){
var vec__20154 = p__20153;
var n = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20154,(0),null);
var t = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20154,(1),null);
var a = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20154,(2),null);
return [kami.wgsl.attr_str(a),kami.wgsl.ident(n),": ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(kami.wgsl.type_str(t))].join('');
});
/**
 * Compile a function form to a WGSL function declaration.
 * opts: {:stage :vertex|:fragment|:compute? :workgroup-size n-or-[x y z]? (compute)
 *        :params [[name type attr?] …] :ret type-or-[:loc n type]-or-[:builtin b type]}.
 */
kami.wgsl.func = (function kami$wgsl$func(var_args){
var args__5732__auto__ = [];
var len__5726__auto___20188 = arguments.length;
var i__5727__auto___20189 = (0);
while(true){
if((i__5727__auto___20189 < len__5726__auto___20188)){
args__5732__auto__.push((arguments[i__5727__auto___20189]));

var G__20192 = (i__5727__auto___20189 + (1));
i__5727__auto___20189 = G__20192;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((2) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((2)),(0),null)):null);
return kami.wgsl.func.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__5733__auto__);
});

(kami.wgsl.func.cljs$core$IFn$_invoke$arity$variadic = (function (name,p__20163,body){
var map__20164 = p__20163;
var map__20164__$1 = cljs.core.__destructure_map(map__20164);
var stage = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20164__$1,new cljs.core.Keyword(null,"stage","stage",1843544772));
var workgroup_size = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20164__$1,new cljs.core.Keyword(null,"workgroup-size","workgroup-size",-1458663590));
var params = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20164__$1,new cljs.core.Keyword(null,"params","params",710516235));
var ret = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20164__$1,new cljs.core.Keyword(null,"ret","ret",-468222814));
var ret_STAR_ = (((ret == null))?null:((((cljs.core.vector_QMARK_(ret)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"loc","loc",-584284901),cljs.core.first(ret)))))?["@location(",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.second(ret)),") ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(kami.wgsl.type_str(cljs.core.nth.cljs$core$IFn$_invoke$arity$2(ret,(2))))].join(''):((((cljs.core.vector_QMARK_(ret)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"builtin","builtin",-1707593346),cljs.core.first(ret)))))?["@builtin(",kami.wgsl.ident(cljs.core.second(ret)),") ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(kami.wgsl.type_str(cljs.core.nth.cljs$core$IFn$_invoke$arity$2(ret,(2))))].join(''):kami.wgsl.type_str(ret)
)));
var stage_STAR_ = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(stage,new cljs.core.Keyword(null,"compute","compute",1555393130)))?["@compute",(cljs.core.truth_(workgroup_size)?[" @workgroup_size(",clojure.string.join.cljs$core$IFn$_invoke$arity$2(", ",((cljs.core.vector_QMARK_(workgroup_size))?workgroup_size:new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [workgroup_size], null))),")"].join(''):null),"\n"].join(''):(cljs.core.truth_(stage)?["@",kami.wgsl.ident(stage),"\n"].join(''):null));
return [stage_STAR_,"fn ",kami.wgsl.ident(name),"(",clojure.string.join.cljs$core$IFn$_invoke$arity$2(", ",cljs.core.map.cljs$core$IFn$_invoke$arity$2(kami.wgsl.param_str,params)),")",(cljs.core.truth_(ret_STAR_)?[" -> ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(ret_STAR_)].join(''):null)," {\n",kami.wgsl.block(body),"\n}"].join('');
}));

(kami.wgsl.func.cljs$lang$maxFixedArity = (2));

/** @this {Function} */
(kami.wgsl.func.cljs$lang$applyTo = (function (seq20160){
var G__20161 = cljs.core.first(seq20160);
var seq20160__$1 = cljs.core.next(seq20160);
var G__20162 = cljs.core.first(seq20160__$1);
var seq20160__$2 = cljs.core.next(seq20160__$1);
var self__5711__auto__ = this;
return self__5711__auto__.cljs$core$IFn$_invoke$arity$variadic(G__20161,G__20162,seq20160__$2);
}));

/**
 * [:struct] form: name + fields [[field type attr?] …] → a WGSL struct declaration.
 */
kami.wgsl.struct_STAR_ = (function kami$wgsl$struct_STAR_(name,fields){
return ["struct ",kami.wgsl.ident(name)," { ",clojure.string.join.cljs$core$IFn$_invoke$arity$2(", ",cljs.core.map.cljs$core$IFn$_invoke$arity$2(kami.wgsl.param_str,fields))," };"].join('');
});
/**
 * A @group/@binding resource var. opts {:group :binding :space?(:uniform/:storage) :access?(:read/:read_write)}.
 * With :access → var<space, access> (storage buffers); without → var<space> or bare var (textures).
 */
kami.wgsl.binding_STAR_ = (function kami$wgsl$binding_STAR_(p__20174,name,type){
var map__20175 = p__20174;
var map__20175__$1 = cljs.core.__destructure_map(map__20175);
var group = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20175__$1,new cljs.core.Keyword(null,"group","group",582596132));
var binding = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20175__$1,new cljs.core.Keyword(null,"binding","binding",539932593));
var space = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20175__$1,new cljs.core.Keyword(null,"space","space",348133475));
var access = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20175__$1,new cljs.core.Keyword(null,"access","access",2027349272));
return ["@group(",cljs.core.str.cljs$core$IFn$_invoke$arity$1(group),") @binding(",cljs.core.str.cljs$core$IFn$_invoke$arity$1(binding),") var",(cljs.core.truth_(space)?["<",kami.wgsl.ident(space),(cljs.core.truth_(access)?[", ",kami.wgsl.ident(access)].join(''):null),">"].join(''):null)," ",kami.wgsl.ident(name),": ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(kami.wgsl.type_str(type)),";"].join('');
});
/**
 * Assemble top-level items (struct* /binding* /func strings) into one WGSL source string.
 */
kami.wgsl.shader = (function kami$wgsl$shader(var_args){
var args__5732__auto__ = [];
var len__5726__auto___20204 = arguments.length;
var i__5727__auto___20205 = (0);
while(true){
if((i__5727__auto___20205 < len__5726__auto___20204)){
args__5732__auto__.push((arguments[i__5727__auto___20205]));

var G__20206 = (i__5727__auto___20205 + (1));
i__5727__auto___20205 = G__20206;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return kami.wgsl.shader.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(kami.wgsl.shader.cljs$core$IFn$_invoke$arity$variadic = (function (items){
return clojure.string.join.cljs$core$IFn$_invoke$arity$2("\n",items);
}));

(kami.wgsl.shader.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(kami.wgsl.shader.cljs$lang$applyTo = (function (seq20178){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq20178));
}));


//# sourceMappingURL=kami.wgsl.js.map
