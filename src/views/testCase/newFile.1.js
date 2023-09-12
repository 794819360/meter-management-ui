/* extensions: [".vue"], target: 3.3, lib: "vue", jsxSlots: false, strictTemplates: false, skipTemplateCodegen: false, nativeTags: ["html","body","base","head","link","meta","style","title","address","article","aside","footer","header","hgroup","h1","h2","h3","h4","h5","h6","nav","section","div","dd","dl","dt","figcaption","figure","picture","hr","img","li","main","ol","p","pre","ul","a","b","abbr","bdi","bdo","br","cite","code","data","dfn","em","i","kbd","mark","q","rp","rt","ruby","s","samp","small","span","strong","sub","sup","time","u","var","wbr","area","audio","map","track","video","embed","object","param","source","canvas","script","noscript","del","ins","caption","col","colgroup","table","thead","tbody","td","th","tr","button","datalist","fieldset","form","input","label","legend","meter","optgroup","option","output","progress","select","textarea","details","dialog","menu","summary","template","blockquote","iframe","tfoot","svg","animate","animateMotion","animateTransform","circle","clipPath","color-profile","defs","desc","discard","ellipse","feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistanceLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence","filter","foreignObject","g","hatch","hatchpath","image","line","linearGradient","marker","mask","mesh","meshgradient","meshpatch","meshrow","metadata","mpath","path","pattern","polygon","polyline","radialGradient","rect","set","solidcolor","stop","switch","symbol","text","textPath","tspan","unknown","use","view","slot","component"], dataAttributes: [], htmlAttributes: ["aria-*"], optionsWrapper: ["(await import('vue')).defineComponent(",")"], macros: {"defineProps":["defineProps"],"defineSlots":["defineSlots"],"defineEmits":["defineEmits"],"defineExpose":["defineExpose"],"withDefaults":["withDefaults"]}, plugins: [], hooks: [], experimentalDefinePropProposal: false, experimentalAdditionalLanguageModules: [], experimentalResolveStyleCssClasses: "scoped", experimentalModelPropName: {"":{"input":true},"value":{"input":{"type":"text"},"textarea":true,"select":true}}, experimentalUseElementAccessInTemplate: false */
// import { listCase, getCase, delCase, addCase, updateCase } from "@/api/pas/case";
export default (await import('vue')).defineComponent({
name: "Case",
data() {
return {
// 遮罩层
loading: true,
// 选中数组
ids: [],
// 非单个禁用
single: true,
// 非多个禁用
multiple: true,
// 显示搜索条件
showSearch: true,
// 总条数
total: 0,
// 【请填写功能名称】表格数据
caseList: [
this.testCaseId = "1",
this.testTitle = "dscsc"
],
// 弹出层标题
title: "",
// 是否显示弹出层
open: false,
// 查询参数
queryParams: {
pageNum: 1,
pageSize: 10,
testModule: null,
testTitle: null,
priority: null,
creator: null,
executionDate: null,
},
// 表单参数
form: {},
// 表单校验
rules: {
testModule: [
{ required: true, message: "所属模块不能为空", trigger: "blur" }
],
testTitle: [
{ required: true, message: "用例名称不能为空", trigger: "blur" }
],
priority: [
{ required: true, message: "优先级不能为空", trigger: "blur" }
],
creator: [
{ required: true, message: "创建者不能为空", trigger: "blur" }
],
executionDate: [
{ required: true, message: "执行日期不能为空", trigger: "blur" }
],
}
};
},
created() {
// this.getList();
},
methods: {
/** 查询【请填写功能名称】列表 */
getList() {
this.loading = true;
listCase(this.queryParams).then(response => {
this.caseList = response.rows;
this.total = response.total;
this.loading = false;
});
},
// 取消按钮
cancel() {
this.open = false;
this.reset();
},
// 表单重置
reset() {
this.form = {
testCaseId: null,
testModule: null,
testTitle: null,
priority: null,
creator: null,
executionDate: null,
};
this.resetForm("form");
},
/** 搜索按钮操作 */
handleQuery() {
this.queryParams.pageNum = 1;
this.getList();
},
/** 重置按钮操作 */
resetQuery() {
this.resetForm("queryForm");
this.handleQuery();
},
// 多选框选中数据
handleSelectionChange(selection) {
this.ids = selection.map(item => item.testCaseId);
this.single = selection.length !== 1;
this.multiple = !selection.length;
},
/** 新增按钮操作 */
handleAdd() {
this.reset();
this.open = true;
this.title = "添加【请填写功能名称】";
},
/** 修改按钮操作 */
handleUpdate(row) {
this.reset();
const testCaseId = row.testCaseId || this.ids;
getCase(testCaseId).then(response => {
this.form = response.data;
this.open = true;
this.title = "修改【请填写功能名称】";
});
},
/** 提交按钮 */
submitForm() {
this.$refs["form"].validate(valid => {
if (valid) {
if (this.form.testCaseId != null) {
updateCase(this.form).then(response => {
this.$modal.msgSuccess("修改成功");
this.open = false;
this.getList();
});
} else {
addCase(this.form).then(response => {
this.$modal.msgSuccess("新增成功");
this.open = false;
this.getList();
});
}
}
});
},
/** 删除按钮操作 */
handleDelete(row) {
const testCaseIds = row.testCaseId || this.ids;
this.$modal.confirm('是否确认删除【请填写功能名称】编号为"' + testCaseIds + '"的数据项？').then(function () {
return delCase(testCaseIds);
}).then(() => {
this.getList();
this.$modal.msgSuccess("删除成功");
}).catch(() => { });
},
/** 导出按钮操作 */
handleExport() {
this.download('pas/case/export', {
...this.queryParams
}, `case_${new Date().getTime()}.xlsx`);
}
}
});
