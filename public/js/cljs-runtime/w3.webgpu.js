goog.provide('w3.webgpu');
/**
 * js/navigator.gpu, or nil if the browser has no WebGPU implementation.
 */
w3.webgpu.gpu = (function w3$webgpu$gpu(){
return navigator.gpu;
});
w3.webgpu.supported_QMARK_ = (function w3$webgpu$supported_QMARK_(){
return (!((w3.webgpu.gpu() == null)));
});
/**
 * -> Promise<GPUAdapter|nil>. opts, if given, is a GPURequestAdapterOptions JS object.
 */
w3.webgpu.request_adapter_BANG_ = (function w3$webgpu$request_adapter_BANG_(var_args){
var G__20269 = arguments.length;
switch (G__20269) {
case 0:
return w3.webgpu.request_adapter_BANG_.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return w3.webgpu.request_adapter_BANG_.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(w3.webgpu.request_adapter_BANG_.cljs$core$IFn$_invoke$arity$0 = (function (){
return w3.webgpu.request_adapter_BANG_.cljs$core$IFn$_invoke$arity$1(null);
}));

(w3.webgpu.request_adapter_BANG_.cljs$core$IFn$_invoke$arity$1 = (function (opts){
var gpu_api = w3.webgpu.gpu();
return gpu_api.requestAdapter(opts);
}));

(w3.webgpu.request_adapter_BANG_.cljs$lang$maxFixedArity = 1);

/**
 * -> Promise<GPUDevice>. opts, if given, is a GPUDeviceDescriptor JS object.
 */
w3.webgpu.request_device_BANG_ = (function w3$webgpu$request_device_BANG_(var_args){
var G__20272 = arguments.length;
switch (G__20272) {
case 1:
return w3.webgpu.request_device_BANG_.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return w3.webgpu.request_device_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(w3.webgpu.request_device_BANG_.cljs$core$IFn$_invoke$arity$1 = (function (adapter){
return w3.webgpu.request_device_BANG_.cljs$core$IFn$_invoke$arity$2(adapter,null);
}));

(w3.webgpu.request_device_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (adapter,opts){
return adapter.requestDevice(opts);
}));

(w3.webgpu.request_device_BANG_.cljs$lang$maxFixedArity = 2);

w3.webgpu.preferred_canvas_format = (function w3$webgpu$preferred_canvas_format(){
var gpu_api = w3.webgpu.gpu();
return gpu_api.getPreferredCanvasFormat();
});
/**
 * canvas.getContext("webgpu") -> GPUCanvasContext, or nil.
 */
w3.webgpu.get_context = (function w3$webgpu$get_context(canvas){
return canvas.getContext("webgpu");
});
/**
 * ctx.configure(desc) — desc is a GPUCanvasConfiguration JS object
 * (must include :device/:format, spelled `device`/`format` as JS keys).
 */
w3.webgpu.configure_context_BANG_ = (function w3$webgpu$configure_context_BANG_(ctx,desc){
return ctx.configure(desc);
});
w3.webgpu.__GT_CONST = (function w3$webgpu$__GT_CONST(flag){
return clojure.string.upper_case(clojure.string.replace(cljs.core.name(flag),"-","_"));
});
/**
 * js/GPUBufferUsage.<FLAG>, e.g. (buffer-usage :copy-dst) -> GPUBufferUsage.COPY_DST.
 */
w3.webgpu.buffer_usage = (function w3$webgpu$buffer_usage(flag){
return (GPUBufferUsage[w3.webgpu.__GT_CONST(flag)]);
});
/**
 * js/GPUTextureUsage.<FLAG>, e.g. (texture-usage :render-attachment).
 */
w3.webgpu.texture_usage = (function w3$webgpu$texture_usage(flag){
return (GPUTextureUsage[w3.webgpu.__GT_CONST(flag)]);
});
/**
 * device.createBuffer(desc), desc: GPUBufferDescriptor JS object.
 */
w3.webgpu.create_buffer_BANG_ = (function w3$webgpu$create_buffer_BANG_(device,desc){
return device.createBuffer(desc);
});
/**
 * buffer.destroy() — releases the GPU-side allocation. Call before dropping
 *   the last reference to a buffer you're replacing (e.g. growing a dynamically
 *   resized instance buffer), not on one still in use by a pending submission.
 */
w3.webgpu.destroy_buffer_BANG_ = (function w3$webgpu$destroy_buffer_BANG_(buffer){
return buffer.destroy();
});
/**
 * queue.writeBuffer(buffer, offset, data). data must already be a typed array.
 */
w3.webgpu.write_buffer_BANG_ = (function w3$webgpu$write_buffer_BANG_(var_args){
var G__20277 = arguments.length;
switch (G__20277) {
case 3:
return w3.webgpu.write_buffer_BANG_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return w3.webgpu.write_buffer_BANG_.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(w3.webgpu.write_buffer_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (queue,buffer,data){
return w3.webgpu.write_buffer_BANG_.cljs$core$IFn$_invoke$arity$4(queue,buffer,(0),data);
}));

(w3.webgpu.write_buffer_BANG_.cljs$core$IFn$_invoke$arity$4 = (function (queue,buffer,offset,data){
return queue.writeBuffer(buffer,offset,data);
}));

(w3.webgpu.write_buffer_BANG_.cljs$lang$maxFixedArity = 4);

/**
 * device.queue. Property access remains confined to the raw W3C binding.
 */
w3.webgpu.device_queue = (function w3$webgpu$device_queue(device){
return device.queue;
});
/**
 * queue.writeTexture(destination, data, layout, size).
 */
w3.webgpu.write_texture_BANG_ = (function w3$webgpu$write_texture_BANG_(queue,destination,data,layout,size){
return queue.writeTexture(destination,data,layout,size);
});
/**
 * queue.copyExternalImageToTexture(source, destination, size).
 */
w3.webgpu.copy_external_image_to_texture_BANG_ = (function w3$webgpu$copy_external_image_to_texture_BANG_(queue,source,destination,size){
return queue.copyExternalImageToTexture(source,destination,size);
});
/**
 * device.createTexture(desc), desc: GPUTextureDescriptor JS object.
 */
w3.webgpu.create_texture_BANG_ = (function w3$webgpu$create_texture_BANG_(device,desc){
return device.createTexture(desc);
});
/**
 * texture.createView(desc?), desc: GPUTextureViewDescriptor JS object.
 */
w3.webgpu.create_view = (function w3$webgpu$create_view(var_args){
var G__20283 = arguments.length;
switch (G__20283) {
case 1:
return w3.webgpu.create_view.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return w3.webgpu.create_view.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(w3.webgpu.create_view.cljs$core$IFn$_invoke$arity$1 = (function (texture){
return w3.webgpu.create_view.cljs$core$IFn$_invoke$arity$2(texture,null);
}));

(w3.webgpu.create_view.cljs$core$IFn$_invoke$arity$2 = (function (texture,desc){
return texture.createView(desc);
}));

(w3.webgpu.create_view.cljs$lang$maxFixedArity = 2);

w3.webgpu.create_sampler_BANG_ = (function w3$webgpu$create_sampler_BANG_(device,desc){
return device.createSampler(desc);
});
/**
 * device.createShaderModule(desc), desc: #js {:code <wgsl-string>}.
 */
w3.webgpu.create_shader_module_BANG_ = (function w3$webgpu$create_shader_module_BANG_(device,desc){
return device.createShaderModule(desc);
});
w3.webgpu.create_render_pipeline_BANG_ = (function w3$webgpu$create_render_pipeline_BANG_(device,desc){
return device.createRenderPipeline(desc);
});
w3.webgpu.get_bind_group_layout = (function w3$webgpu$get_bind_group_layout(pipeline,index){
return pipeline.getBindGroupLayout(index);
});
w3.webgpu.create_bind_group_BANG_ = (function w3$webgpu$create_bind_group_BANG_(device,desc){
return device.createBindGroup(desc);
});
w3.webgpu.create_command_encoder_BANG_ = (function w3$webgpu$create_command_encoder_BANG_(var_args){
var G__20304 = arguments.length;
switch (G__20304) {
case 1:
return w3.webgpu.create_command_encoder_BANG_.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return w3.webgpu.create_command_encoder_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(w3.webgpu.create_command_encoder_BANG_.cljs$core$IFn$_invoke$arity$1 = (function (device){
return w3.webgpu.create_command_encoder_BANG_.cljs$core$IFn$_invoke$arity$2(device,null);
}));

(w3.webgpu.create_command_encoder_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (device,desc){
return device.createCommandEncoder(desc);
}));

(w3.webgpu.create_command_encoder_BANG_.cljs$lang$maxFixedArity = 2);

w3.webgpu.begin_render_pass_BANG_ = (function w3$webgpu$begin_render_pass_BANG_(encoder,desc){
return encoder.beginRenderPass(desc);
});
w3.webgpu.set_pipeline_BANG_ = (function w3$webgpu$set_pipeline_BANG_(pass,pipeline){
return pass.setPipeline(pipeline);
});
w3.webgpu.set_bind_group_BANG_ = (function w3$webgpu$set_bind_group_BANG_(pass,index,bind_group){
return pass.setBindGroup(index,bind_group);
});
w3.webgpu.set_vertex_buffer_BANG_ = (function w3$webgpu$set_vertex_buffer_BANG_(var_args){
var G__20317 = arguments.length;
switch (G__20317) {
case 3:
return w3.webgpu.set_vertex_buffer_BANG_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return w3.webgpu.set_vertex_buffer_BANG_.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(w3.webgpu.set_vertex_buffer_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (pass,slot,buffer){
return pass.setVertexBuffer(slot,buffer);
}));

(w3.webgpu.set_vertex_buffer_BANG_.cljs$core$IFn$_invoke$arity$4 = (function (pass,slot,buffer,offset){
return pass.setVertexBuffer(slot,buffer,offset);
}));

(w3.webgpu.set_vertex_buffer_BANG_.cljs$lang$maxFixedArity = 4);

w3.webgpu.set_index_buffer_BANG_ = (function w3$webgpu$set_index_buffer_BANG_(pass,buffer,format){
return pass.setIndexBuffer(buffer,format);
});
w3.webgpu.draw_indexed_BANG_ = (function w3$webgpu$draw_indexed_BANG_(var_args){
var G__20336 = arguments.length;
switch (G__20336) {
case 2:
return w3.webgpu.draw_indexed_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return w3.webgpu.draw_indexed_BANG_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return w3.webgpu.draw_indexed_BANG_.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
case 5:
return w3.webgpu.draw_indexed_BANG_.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
case 6:
return w3.webgpu.draw_indexed_BANG_.cljs$core$IFn$_invoke$arity$6((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]),(arguments[(5)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(w3.webgpu.draw_indexed_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (pass,index_count){
return pass.drawIndexed(index_count);
}));

(w3.webgpu.draw_indexed_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (pass,index_count,instance_count){
return pass.drawIndexed(index_count,instance_count);
}));

(w3.webgpu.draw_indexed_BANG_.cljs$core$IFn$_invoke$arity$4 = (function (pass,index_count,instance_count,first_index){
return pass.drawIndexed(index_count,instance_count,first_index);
}));

(w3.webgpu.draw_indexed_BANG_.cljs$core$IFn$_invoke$arity$5 = (function (pass,index_count,instance_count,first_index,base_vertex){
return pass.drawIndexed(index_count,instance_count,first_index,base_vertex);
}));

(w3.webgpu.draw_indexed_BANG_.cljs$core$IFn$_invoke$arity$6 = (function (pass,index_count,instance_count,first_index,base_vertex,first_instance){
return pass.drawIndexed(index_count,instance_count,first_index,base_vertex,first_instance);
}));

(w3.webgpu.draw_indexed_BANG_.cljs$lang$maxFixedArity = 6);

w3.webgpu.end_pass_BANG_ = (function w3$webgpu$end_pass_BANG_(pass){
return pass.end();
});
/**
 * command-encoder.finish() -> GPUCommandBuffer.
 */
w3.webgpu.finish_BANG_ = (function w3$webgpu$finish_BANG_(var_args){
var G__20350 = arguments.length;
switch (G__20350) {
case 1:
return w3.webgpu.finish_BANG_.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return w3.webgpu.finish_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(w3.webgpu.finish_BANG_.cljs$core$IFn$_invoke$arity$1 = (function (encoder){
return encoder.finish();
}));

(w3.webgpu.finish_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (encoder,desc){
return encoder.finish(desc);
}));

(w3.webgpu.finish_BANG_.cljs$lang$maxFixedArity = 2);

/**
 * queue.submit([...command-buffers]).
 */
w3.webgpu.submit_BANG_ = (function w3$webgpu$submit_BANG_(queue,command_buffers){
return queue.submit(cljs.core.into_array.cljs$core$IFn$_invoke$arity$1(command_buffers));
});
/**
 * ctx.getCurrentTexture().
 */
w3.webgpu.current_texture = (function w3$webgpu$current_texture(ctx){
return ctx.getCurrentTexture();
});

//# sourceMappingURL=w3.webgpu.js.map
