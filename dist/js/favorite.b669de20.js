(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["favorite"],{d5f1:function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"favorite app__main"},[a("v-card",[a("v-card-title",[e._v(" Избранные Forks "),a("v-spacer"),a("v-text-field",{attrs:{"append-icon":"mdi-magnify",label:"Search","single-line":"","hide-details":""},model:{value:e.search,callback:function(t){e.search=t},expression:"search"}})],1),a("v-data-table",{attrs:{headers:e.headers,items:e.favorites,search:e.search},scopedSlots:e._u([{key:"no-data",fn:function(){return[a("v-btn",{attrs:{color:"primary"}},[e._v("Reset, No data")])]},proxy:!0},{key:"item.stargazers_count",fn:function(t){var r=t.item;return[a("v-rating",{attrs:{"background-color":"green lighten-3",color:"green lighten-7",readonly:""},model:{value:r.stargazers_count,callback:function(t){e.$set(r,"stargazers_count",t)},expression:"item.stargazers_count"}})]}},{key:"item.deleteFork",fn:function(t){var r=t.item;return[a("v-btn",{attrs:{tile:"",outlined:"",color:"success"},on:{click:function(t){return e.deleteFavorite(r)}}},[a("v-icon",{attrs:{left:"",color:"red"}},[e._v("mdi-delete")]),e._v("Удалить из избранного ")],1)]}}])})],1)],1)},n=[],o={data:function(){return{headers:[{text:"Владелец",value:"owner.login"},{text:"Название",value:"name"},{text:"Полное имя",value:"full_name"},{text:"Рейтинг",value:"stargazers_count"},{text:"Ссылка на репозиторий",value:"url"},{text:"Удалить Fork",value:"deleteFork"}],search:"",loading:!1}},computed:{favorites:function(){return this.$store.getters.get("favorites")}},methods:{deleteFavorite:function(e){this.$store.dispatch("deleteFavorite",e)}}},s=o,i=a("2877"),l=a("6544"),c=a.n(l),d=a("8336"),u=a("b0af"),v=a("99d9"),f=a("8fea"),h=a("132d"),p=a("1d4d"),g=a("2fa4"),m=a("8654"),_=Object(i["a"])(s,r,n,!1,null,"14f1039a",null);t["default"]=_.exports;c()(_,{VBtn:d["a"],VCard:u["a"],VCardTitle:v["c"],VDataTable:f["a"],VIcon:h["a"],VRating:p["a"],VSpacer:g["a"],VTextField:m["a"]})}}]);
//# sourceMappingURL=favorite.b669de20.js.map