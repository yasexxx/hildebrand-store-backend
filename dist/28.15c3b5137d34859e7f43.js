(window.webpackJsonp=window.webpackJsonp||[]).push([[28],{"/VwT":function(t,e,o){"use strict";o.r(e),o.d(e,"CreateProductModule",function(){return F});var r=o("tyNb"),n=o("ofXK"),c=o("fXoL"),d=o("1kSV"),i=o("qpem"),a=o("3Pt+"),u=o("FDOz");function s(t,e){1&t&&(c.Wb(0,"h2",49),c.Qc(1,"Create Product:"),c.Vb())}function b(t,e){1&t&&(c.Wb(0,"div"),c.Qc(1," * \xa0Name is required. "),c.Vb())}function p(t,e){1&t&&(c.Wb(0,"div"),c.Qc(1," *\xa0 Name must be at least 4 characters long. "),c.Vb())}function l(t,e){if(1&t&&(c.Wb(0,"div",50),c.Oc(1,b,2,0,"div",51),c.Oc(2,p,2,0,"div",51),c.Vb()),2&t){c.lc();const t=c.Dc(9);c.Db(1),c.tc("ngIf",t.errors.required),c.Db(1),c.tc("ngIf",t.errors.minlength)}}function g(t,e){1&t&&(c.Wb(0,"div"),c.Qc(1," *\xa0 Give a description about the product. "),c.Vb())}function h(t,e){1&t&&(c.Wb(0,"div"),c.Qc(1," * \xa0The description must be at least 10 characters long. "),c.Vb())}function m(t,e){if(1&t&&(c.Wb(0,"div",50),c.Oc(1,g,2,0,"div",51),c.Oc(2,h,2,0,"div",51),c.Vb()),2&t){c.lc();const t=c.Dc(14);c.Db(1),c.tc("ngIf",t.errors.required),c.Db(1),c.tc("ngIf",t.errors.minlength)}}function f(t,e){1&t&&(c.Wb(0,"div"),c.Qc(1," * \xa0 Set price for the product. "),c.Vb())}function M(t,e){if(1&t&&(c.Wb(0,"div",50),c.Oc(1,f,2,0,"div",51),c.Vb()),2&t){c.lc();const t=c.Dc(19);c.Db(1),c.tc("ngIf",t.errors.required)}}function V(t,e){1&t&&(c.Wb(0,"div"),c.Qc(1," * \xa0 Specify the category. "),c.Vb())}function C(t,e){if(1&t&&(c.Wb(0,"div",50),c.Oc(1,V,2,0,"div",51),c.Vb()),2&t){c.lc();const t=c.Dc(24);c.Db(1),c.tc("ngIf",t.errors.required)}}function P(t,e){1&t&&(c.Wb(0,"div"),c.Qc(1," *\xa0 Set the number of available products. "),c.Vb())}function y(t,e){if(1&t&&(c.Wb(0,"div",50),c.Oc(1,P,2,0,"div",51),c.Vb()),2&t){c.lc();const t=c.Dc(29);c.Db(1),c.tc("ngIf",t.errors.required)}}function D(t,e){if(1&t){const t=c.Xb();c.Wb(0,"div",52),c.Wb(1,"p"),c.Qc(2),c.mc(3,"titlecase"),c.Vb(),c.Wb(4,"button",53),c.hc("click",function(){return c.Ec(t),c.lc().submittedBtn()}),c.Wb(5,"b"),c.Qc(6,"+"),c.Vb(),c.Qc(7," Add New Product"),c.Vb(),c.Rb(8,"br"),c.Wb(9,"button",53),c.hc("click",function(){return c.Ec(t),c.lc().navigateEdit()}),c.Wb(10,"b"),c.Qc(11,">"),c.Vb(),c.Qc(12," Go to Edit"),c.Vb(),c.Vb()}if(2&t){const t=c.lc();c.Db(2),c.Sc("You have submitted your product, ",c.nc(3,1,t.product.productName),"")}}const W=function(t){return{"container-a-create":t}},v=function(t){return{"create-a-form form-column":t}},k=function(t,e){return{"btn-success":t,"btn-danger":e}};let Q=(()=>{class t{constructor(t){this.activeModal=t,this.titleClass="color: green; font-size: 1rem;"}}return t.\u0275fac=function(e){return new(e||t)(c.Qb(d.a))},t.\u0275cmp=c.Kb({type:t,selectors:[["modal-content"]],inputs:{name:"name"},decls:12,vars:3,consts:[[1,"modal-header"],[1,"modal-title"],["type","button","aria-label","Close",1,"close",3,"click"],["aria-hidden","true"],[1,"modal-body"],[1,"modal-footer"],["type","button",1,"btn","btn-outline-dark",3,"click"]],template:function(t,e){1&t&&(c.Wb(0,"div",0),c.Wb(1,"h4",1),c.Qc(2,"Information"),c.Vb(),c.Wb(3,"button",2),c.hc("click",function(){return e.activeModal.dismiss("Cross click")}),c.Wb(4,"span",3),c.Qc(5,"\xd7"),c.Vb(),c.Vb(),c.Vb(),c.Wb(6,"div",4),c.Wb(7,"p"),c.Qc(8),c.Vb(),c.Vb(),c.Wb(9,"div",5),c.Wb(10,"button",6),c.hc("click",function(){return e.activeModal.close("Close click")}),c.Qc(11,"Close"),c.Vb(),c.Vb()),2&t&&(c.Db(1),c.Kc(e.titleClass),c.Db(7),c.Sc("",e.name,"!"))},encapsulation:2}),t})();const S=[{path:"",component:(()=>{class t{constructor(t,e,o){this.productsService=t,this.modalService=e,this.router=o,this.published="unPublish",this.chooseFile="Choose file (required)",this.isSubmitted=!1,this.imageUpload=null,this.messageModal="The product was successfully submitted!",this.product={productName:"",description:"",category:"",price:"",availableProduct:"",isPublished:!1,post:{topProduct:!1,featuredProduct:!1,latestProduct:!1,restaurantProduct:!1,supermarketProduct:!1,other:!1},options:{restaurantFood:!1,restaurantDrink:!1,restaurantDessert:!1,supermarketGrocery:!1,supermarketVegetable:!1,supermarketCannedGoods:!1}},this.isCreate=!0}ngOnInit(){}openModal(){this.modalService.open(Q,{centered:!0}).componentInstance.name=this.messageModal}closeModal(){this.modalService.dismissAll()}publishCheck(t){1==!t?(this.product.isPublished=!0,this.published="Publish"):(this.product.isPublished=!1,this.published="unPublish")}onFileChanged(t){const e=t.target.files[0];void 0!==(null==e?void 0:e.name)&&-1!==e.type.search(/image/gi)&&(this.imageUpload=e,this.chooseFile=e.name)}onSubmit(){const t=new FormData;t.append("file",this.imageUpload),t.append("productName",this.product.productName),t.append("description",this.product.description),t.append("category",this.product.category),t.append("price",this.product.price.toString()),t.append("availableProduct",this.product.availableProduct.toString()),t.append("isPublished",this.product.isPublished.toString()),t.append("topProduct",this.product.post.topProduct.toString()),t.append("featuredProduct",this.product.post.featuredProduct.toString()),t.append("latestProduct",this.product.post.latestProduct.toString()),t.append("supermarketProduct",this.product.post.supermarketProduct.toString()),t.append("restaurantProduct",this.product.post.restaurantProduct.toString()),t.append("other",this.product.post.other.toString()),t.append("supermarketGrocery",this.product.options.supermarketGrocery.toString()),t.append("supermarketVegetable",this.product.options.supermarketVegetable.toString()),t.append("supermarketCannedGoods",this.product.options.supermarketCannedGoods.toString()),t.append("restaurantFood",this.product.options.restaurantFood.toString()),t.append("restaurantDrink",this.product.options.restaurantDrink.toString()),t.append("restaurantDessert",this.product.options.restaurantDessert.toString()),t&&(this._subscription$=this.productsService.create(t).subscribe(t=>{this.messageModal=t.message,this.openModal(),setTimeout(()=>{t&&this.closeModal(),this.isSubmitted=!0,this.chooseFile="Choose file"},5e3)},t=>console.log(t)))}submittedBtn(){this.isSubmitted=!1,this.router.navigateByUrl("/",{skipLocationChange:!0}).then(()=>{this.router.navigate(["admin/create"])})}ngOnDestroy(){this._subscription$&&this._subscription$.unsubscribe()}navigateEdit(){this.router.navigate(["admin/edit"])}}return t.\u0275fac=function(e){return new(e||t)(c.Qb(i.a),c.Qb(d.l),c.Qb(r.g))},t.\u0275cmp=c.Kb({type:t,selectors:[["app-create-product"]],decls:108,vars:89,consts:[[3,"ngClass"],["class","ml-3 mt-4",4,"ngIf"],[3,"ngSubmit"],["productForm","ngForm"],[3,"hidden"],["for","name",1,"'my-auto","font-weight-bold"],["type","text","minlength","4","aria-describedby","validateName1","id","name","required","","name","name",1,"form-control",3,"ngModel","ngModelChange"],["name","ngModel"],["class","alert alert-danger",4,"ngIf"],["for","description",1,"'my-auto","font-weight-bold"],["minlength","10","id","description","name","description","required","","rows","5",1,"form-control",2,"resize","none",3,"ngModel","ngModelChange"],["description","ngModel"],["for","price",1,"'my-auto","font-weight-bold"],["type","number","id","price","required","","name","price",1,"form-control",3,"ngModel","ngModelChange"],["price","ngModel"],["for","category",1,"'my-auto","font-weight-bold"],["type","text","id","category","required","","name","category",1,"form-control",3,"ngModel","ngModelChange"],["category","ngModel"],["for","availableProduct",1,"'my-auto","font-weight-bold"],["type","number","id","availableProduct","required","","name","availableProduct",1,"form-control",3,"ngModel","ngModelChange"],["availableProduct","ngModel"],["for","publish",1,"'my-auto","font-weight-bold"],["type","button","id","publish",1,"form-control","btn","btn-primary",3,"value","click"],[1,"col"],[1,"text-success"],[1,"text-danger"],[1,"btn-group","btn-group-toggle","form-group"],["ngbButtonLabel","",3,"ngClass"],["type","checkbox","id","topProduct","name","topProduct","ngbButton","",3,"ngModel","ngModelChange"],["type","checkbox","id","featuredProduct","name","featuredProduct","ngbButton","",3,"ngModel","ngModelChange"],["type","checkbox","id","latestProduct","name","latestProduct","ngbButton","",3,"ngModel","ngModelChange"],["type","checkbox","id","supermarketProduct","name","supermarketProduct","ngbButton","",3,"ngModel","ngModelChange"],["type","checkbox","id","restaurantProduct","name","restaurantProduct","ngbButton","",3,"ngModel","ngModelChange"],["type","checkbox","id","other","name","other","ngbButton","",3,"ngModel","ngModelChange"],["type","checkbox","id","supermarketGrocery","name","supermarketGrocery","ngbButton","",3,"disabled","ngModel","ngModelChange"],["type","checkbox","id","supermarketVegetable","name","supermarketVegetable","ngbButton","",3,"disabled","ngModel","ngModelChange"],["type","checkbox","id","supermarketCannedGoods","name","supermarketCannedGoods","ngbButton","",3,"disabled","ngModel","ngModelChange"],["type","checkbox","id","restaurantFood","name","restaurantFood","ngbButton","",3,"disabled","ngModel","ngModelChange"],["type","checkbox","id","restaurantDrink","name","restaurantDrink","ngbButton","",3,"disabled","ngModel","ngModelChange"],["type","checkbox","id","restaurantDessert","name","restaurantDessert","ngbButton","",3,"disabled","ngModel","ngModelChange"],[1,"create-a-form"],[1,"custom-file"],["type","file","id","inputFiles","name","inputFiles","required","",1,"custom-file-input",3,"ngModel","ngModelChange","change"],["inputFiles","ngModel"],["for","inputFiles",1,"custom-file-label"],[1,"btn-1"],["type","submit",1,"btn","btn-success",3,"disabled"],["routerLink","/admin/products","type","button","role","button",1,"btn","btn-dark"],["class","submitted-product-true",4,"ngIf"],[1,"ml-3","mt-4"],[1,"alert","alert-danger"],[4,"ngIf"],[1,"submitted-product-true"],["type","button",1,"btn","btn-success",3,"click"]],template:function(t,e){if(1&t&&(c.Wb(0,"div",0),c.Oc(1,s,2,0,"h2",1),c.Wb(2,"form",2,3),c.hc("ngSubmit",function(){return e.onSubmit()}),c.Wb(4,"div",4),c.Wb(5,"div",0),c.Wb(6,"label",5),c.Qc(7,"Name:"),c.Vb(),c.Wb(8,"input",6,7),c.hc("ngModelChange",function(t){return e.product.productName=t}),c.Vb(),c.Oc(10,l,3,2,"div",8),c.Wb(11,"label",9),c.Qc(12,"Description:"),c.Vb(),c.Wb(13,"textarea",10,11),c.hc("ngModelChange",function(t){return e.product.description=t}),c.Vb(),c.Oc(15,m,3,2,"div",8),c.Wb(16,"label",12),c.Qc(17,"Price:"),c.Vb(),c.Wb(18,"input",13,14),c.hc("ngModelChange",function(t){return e.product.price=t}),c.Vb(),c.Oc(20,M,2,1,"div",8),c.Wb(21,"label",15),c.Qc(22,"Category:"),c.Vb(),c.Wb(23,"input",16,17),c.hc("ngModelChange",function(t){return e.product.category=t}),c.Vb(),c.Oc(25,C,2,1,"div",8),c.Wb(26,"label",18),c.Qc(27,"Available Product:"),c.Vb(),c.Wb(28,"input",19,20),c.hc("ngModelChange",function(t){return e.product.availableProduct=t}),c.Vb(),c.Oc(30,y,2,1,"div",8),c.Wb(31,"label",21),c.Qc(32,"Status:"),c.Vb(),c.Wb(33,"input",22),c.hc("click",function(){return e.publishCheck(e.product.isPublished)}),c.Vb(),c.Vb(),c.Wb(34,"div",23),c.Wb(35,"strong"),c.Qc(36,"Post:"),c.Vb(),c.Qc(37," This product will be posted on different pages select below where to post it. "),c.Wb(38,"p"),c.Qc(39,"Note: "),c.Wb(40,"span",24),c.Qc(41,"Green"),c.Vb(),c.Qc(42," = Select "),c.Rb(43,"br"),c.Wb(44,"span",25),c.Qc(45,"Red"),c.Vb(),c.Qc(46," = Deselect"),c.Vb(),c.Rb(47,"br"),c.Wb(48,"div",26),c.Wb(49,"label",27),c.Wb(50,"input",28),c.hc("ngModelChange",function(t){return e.product.post.topProduct=t}),c.Vb(),c.Qc(51," Top Product "),c.Vb(),c.Wb(52,"label",27),c.Wb(53,"input",29),c.hc("ngModelChange",function(t){return e.product.post.featuredProduct=t}),c.Vb(),c.Qc(54," Featured Product "),c.Vb(),c.Wb(55,"label",27),c.Wb(56,"input",30),c.hc("ngModelChange",function(t){return e.product.post.latestProduct=t}),c.Vb(),c.Qc(57," Latest Product "),c.Vb(),c.Wb(58,"label",27),c.Wb(59,"input",31),c.hc("ngModelChange",function(t){return e.product.post.supermarketProduct=t}),c.Vb(),c.Qc(60," SuperMarket Product "),c.Vb(),c.Wb(61,"label",27),c.Wb(62,"input",32),c.hc("ngModelChange",function(t){return e.product.post.restaurantProduct=t}),c.Vb(),c.Qc(63," Restaurant Product "),c.Vb(),c.Wb(64,"label",27),c.Wb(65,"input",33),c.hc("ngModelChange",function(t){return e.product.post.other=t}),c.Vb(),c.Qc(66," Other "),c.Vb(),c.Vb(),c.Wb(67,"strong"),c.Qc(68,"Supermarket Post:"),c.Vb(),c.Rb(69,"br"),c.Wb(70,"div",26),c.Wb(71,"label",27),c.Wb(72,"input",34),c.hc("ngModelChange",function(t){return e.product.options.supermarketGrocery=t}),c.Vb(),c.Qc(73," Grocery "),c.Vb(),c.Wb(74,"label",27),c.Wb(75,"input",35),c.hc("ngModelChange",function(t){return e.product.options.supermarketVegetable=t}),c.Vb(),c.Qc(76," Vegetables "),c.Vb(),c.Wb(77,"label",27),c.Wb(78,"input",36),c.hc("ngModelChange",function(t){return e.product.options.supermarketCannedGoods=t}),c.Vb(),c.Qc(79," Canned Goods "),c.Vb(),c.Vb(),c.Rb(80,"br"),c.Wb(81,"strong"),c.Qc(82,"Restaurant Post:"),c.Vb(),c.Rb(83,"br"),c.Wb(84,"div",26),c.Wb(85,"label",27),c.Wb(86,"input",37),c.hc("ngModelChange",function(t){return e.product.options.restaurantFood=t}),c.Vb(),c.Qc(87," Food "),c.Vb(),c.Wb(88,"label",27),c.Wb(89,"input",38),c.hc("ngModelChange",function(t){return e.product.options.restaurantDrink=t}),c.Vb(),c.Qc(90," Drink "),c.Vb(),c.Wb(91,"label",27),c.Wb(92,"input",39),c.hc("ngModelChange",function(t){return e.product.options.restaurantDessert=t}),c.Vb(),c.Qc(93," Dessert "),c.Vb(),c.Vb(),c.Vb(),c.Wb(94,"div",40),c.Wb(95,"h4"),c.Qc(96,"Upload Image:"),c.Vb(),c.Wb(97,"div",41),c.Wb(98,"input",42,43),c.hc("ngModelChange",function(t){return e.file=t})("change",function(t){return e.onFileChanged(t)}),c.Vb(),c.Wb(100,"label",44),c.Qc(101),c.Vb(),c.Vb(),c.Vb(),c.Wb(102,"div",45),c.Wb(103,"button",46),c.Qc(104,"Create"),c.Vb(),c.Wb(105,"a",47),c.Qc(106,"Cancel"),c.Vb(),c.Vb(),c.Vb(),c.Vb(),c.Vb(),c.Oc(107,D,13,3,"div",48)),2&t){const t=c.Dc(3),o=c.Dc(9),r=c.Dc(14),n=c.Dc(19),d=c.Dc(24),i=c.Dc(29);c.tc("ngClass",c.xc(49,W,e.isCreate)),c.Db(1),c.tc("ngIf",!e.isSubmitted),c.Db(3),c.tc("hidden",e.isSubmitted),c.Db(1),c.tc("ngClass",c.xc(51,v,e.isCreate)),c.Db(3),c.tc("ngModel",e.product.productName),c.Db(2),c.tc("ngIf",o.invalid&&(o.dirty||o.touched)),c.Db(3),c.tc("ngModel",e.product.description),c.Db(2),c.tc("ngIf",r.invalid&&(r.dirty||r.touched)),c.Db(3),c.tc("ngModel",e.product.price),c.Db(2),c.tc("ngIf",n.invalid&&(n.dirty||n.touched)),c.Db(3),c.tc("ngModel",e.product.category),c.Db(2),c.tc("ngIf",d.invalid&&(d.dirty||d.touched)),c.Db(3),c.tc("ngModel",e.product.availableProduct),c.Db(2),c.tc("ngIf",i.invalid&&(i.dirty||i.touched)),c.Db(3),c.tc("value",e.published),c.Db(16),c.tc("ngClass",c.yc(53,k,e.product.post.topProduct,!e.product.post.topProduct)),c.Db(1),c.tc("ngModel",e.product.post.topProduct),c.Db(2),c.tc("ngClass",c.yc(56,k,e.product.post.featuredProduct,!e.product.post.featuredProduct)),c.Db(1),c.tc("ngModel",e.product.post.featuredProduct),c.Db(2),c.tc("ngClass",c.yc(59,k,e.product.post.latestProduct,!e.product.post.latestProduct)),c.Db(1),c.tc("ngModel",e.product.post.latestProduct),c.Db(2),c.tc("ngClass",c.yc(62,k,e.product.post.supermarketProduct,!e.product.post.supermarketProduct)),c.Db(1),c.tc("ngModel",e.product.post.supermarketProduct),c.Db(2),c.tc("ngClass",c.yc(65,k,e.product.post.restaurantProduct,!e.product.post.restaurantProduct)),c.Db(1),c.tc("ngModel",e.product.post.restaurantProduct),c.Db(2),c.tc("ngClass",c.yc(68,k,e.product.post.other,!e.product.post.other)),c.Db(1),c.tc("ngModel",e.product.post.other),c.Db(6),c.tc("ngClass",c.yc(71,k,e.product.options.supermarketGrocery,!e.product.options.supermarketGrocery)),c.Db(1),c.tc("disabled",!e.product.post.supermarketProduct)("ngModel",e.product.options.supermarketGrocery),c.Db(2),c.tc("ngClass",c.yc(74,k,e.product.options.supermarketVegetable,!e.product.options.supermarketVegetable)),c.Db(1),c.tc("disabled",!e.product.post.supermarketProduct)("ngModel",e.product.options.supermarketVegetable),c.Db(2),c.tc("ngClass",c.yc(77,k,e.product.options.supermarketCannedGoods,!e.product.options.supermarketCannedGoods)),c.Db(1),c.tc("disabled",!e.product.post.supermarketProduct)("ngModel",e.product.options.supermarketCannedGoods),c.Db(7),c.tc("ngClass",c.yc(80,k,e.product.options.restaurantFood,!e.product.options.restaurantFood)),c.Db(1),c.tc("disabled",!e.product.post.restaurantProduct)("ngModel",e.product.options.restaurantFood),c.Db(2),c.tc("ngClass",c.yc(83,k,e.product.options.restaurantDrink,!e.product.options.restaurantDrink)),c.Db(1),c.tc("disabled",!e.product.post.restaurantProduct)("ngModel",e.product.options.restaurantDrink),c.Db(2),c.tc("ngClass",c.yc(86,k,e.product.options.restaurantDessert,!e.product.options.restaurantDessert)),c.Db(1),c.tc("disabled",!e.product.post.restaurantProduct)("ngModel",e.product.options.restaurantDessert),c.Db(6),c.tc("ngModel",e.file),c.Db(3),c.Rc(e.chooseFile),c.Db(2),c.tc("disabled",t.invalid),c.Db(4),c.tc("ngIf",e.isSubmitted)}},directives:[n.m,n.o,a.z,a.o,a.p,a.c,a.j,a.v,a.n,a.q,a.s,d.b,a.a,d.e,r.i,u.c],pipes:[n.x],styles:[".container-a-create[_ngcontent-%COMP%]{display:grid;grid-template-columns:1fr;width:60%}.btn-1[_ngcontent-%COMP%], .create-a-form[_ngcontent-%COMP%]{margin:1rem}.btn-1[_ngcontent-%COMP%]{display:grid;grid-template-columns:1fr 1fr;column-gap:1rem;padding-left:30rem}.sm-size[_ngcontent-%COMP%]{width:12rem}.des-tag[_ngcontent-%COMP%]{height:10rem}.submitted-product-true[_ngcontent-%COMP%]{display:flex;flex-direction:column;padding:10rem 20rem}@media (max-width:1080px){.submitted-product-true[_ngcontent-%COMP%]{padding:10rem}}@media (max-width:680px){.container-a-create[_ngcontent-%COMP%]{width:100%}.btn-1[_ngcontent-%COMP%]{display:grid;grid-template-columns:1fr 1fr;padding-left:30vw}}@media (max-width:530px){.submitted-product-true[_ngcontent-%COMP%]{padding:10rem 2rem}}"]}),t})()}];let w=(()=>{class t{}return t.\u0275mod=c.Ob({type:t}),t.\u0275inj=c.Nb({factory:function(e){return new(e||t)},imports:[[n.c,r.j.forChild(S)],r.j]}),t})();var O=o("/T4Y"),x=o("PCNd");let F=(()=>{class t{}return t.\u0275mod=c.Ob({type:t}),t.\u0275inj=c.Nb({factory:function(e){return new(e||t)},providers:[],imports:[[n.c,w,O.a,x.a]]}),t})()}}]);