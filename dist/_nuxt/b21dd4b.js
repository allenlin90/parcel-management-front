(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{378:function(t,n,e){"use strict";e.d(n,"a",(function(){return o})),e.d(n,"b",(function(){return l}));var r=e(112),o=(e(144),function(t,n){var e=n.removedIndex,o=n.addedIndex,l=n.payload;if(null===e&&null===o)return t;var d=Object(r.a)(t),c=l;return null!==e&&(c=d.splice(e,1)[0]),null!==o&&d.splice(o,0,c),d}),l=function(t,n){for(var e=[],i=0;i<t;i++)e.push(n(i));return e}},406:function(t,n,e){var content=e(431);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,e(17).default)("0d370958",content,!0,{sourceMap:!1})},430:function(t,n,e){"use strict";e(406)},431:function(t,n,e){var r=e(16)(!1);r.push([t.i,".groups[data-v-06b7a403]{display:flex;justify-content:stretch;flex-direction:column;margin-top:50px;margin-right:50px}.group[data-v-06b7a403]{margin:50px;flex:1}",""]),t.exports=r},492:function(t,n,e){"use strict";e.r(n);var r=e(382),o=e(378),l={name:"Groups",components:{Container:r.Container,Draggable:r.Draggable},data:function(){return{items1:Object(o.b)(15,(function(i){return{id:"1"+i,data:"Draggable 1 - ".concat(i)}})),items2:Object(o.b)(15,(function(i){return{id:"2"+i,data:"Draggable 2 - ".concat(i)}})),items3:Object(o.b)(15,(function(i){return{id:"3"+i,data:"Draggable 3 - ".concat(i)}})),items4:Object(o.b)(15,(function(i){return{id:"4"+i,data:"Draggable 3 - ".concat(i)}}))}},methods:{onDrop:function(t,n){this[t]=Object(o.a)(this[t],n)},getChildPayload1:function(t){return this.items1[t]},getChildPayload2:function(t){return this.items2[t]},getChildPayload3:function(t){return this.items3[t]},getChildPayload4:function(t){return this.items4[t]}}},d=(e(430),e(70)),component=Object(d.a)(l,(function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"groups"},[e("div",{staticClass:"group"},[e("Container",{attrs:{"group-name":"1","get-child-payload":t.getChildPayload1},on:{drop:function(n){return t.onDrop("items1",n)}}},t._l(t.items1,(function(n){return e("Draggable",{key:n.id},[e("div",{staticClass:"draggable-item"},[t._v("\n                    "+t._s(n.data)+"\n                ")])])})),1)],1),t._v(" "),e("div",{staticClass:"group"},[e("Container",{attrs:{"group-name":"1","get-child-payload":t.getChildPayload2},on:{drop:function(n){return t.onDrop("items2",n)}}},t._l(t.items2,(function(n){return e("Draggable",{key:n.id},[e("div",{staticClass:"draggable-item"},[t._v("\n                    "+t._s(n.data)+"\n                ")])])})),1)],1),t._v(" "),e("div",{staticClass:"group"},[e("Container",{attrs:{"group-name":"1","get-child-payload":t.getChildPayload3},on:{drop:function(n){return t.onDrop("items3",n)}}},t._l(t.items3,(function(n){return e("Draggable",{key:n.id},[e("div",{staticClass:"draggable-item"},[t._v("\n                    "+t._s(n.data)+"\n                ")])])})),1)],1),t._v(" "),e("div",{staticClass:"group"},[e("Container",{attrs:{"group-name":"1","get-child-payload":t.getChildPayload4},on:{drop:function(n){return t.onDrop("items4",n)}}},t._l(t.items4,(function(n){return e("Draggable",{key:n.id},[e("div",{staticClass:"draggable-item"},[t._v("\n                    "+t._s(n.data)+"\n                ")])])})),1)],1)])}),[],!1,null,"06b7a403",null);n.default=component.exports}}]);