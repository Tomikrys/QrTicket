(this.webpackJsonp=this.webpackJsonp||[]).push([[0],{283:function(e,t,a){"use strict";a.d(t,"a",(function(){return se}));var n=a(38),r=a.n(n),o=a(0),l=a.n(o),c=a(943),i=a(8),s=a.n(i),u=a(17),d=a.n(u),m=a(18),f=a.n(m),y=a(951),g=a(952),b=a(197);function E(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function p(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?E(Object(a),!0).forEach((function(t){s()(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):E(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var h=a(192),k=a(15),C=a(282),x=a(66),T=a(11),S=a(102),v=a(145),w=a(9),B=a(113),D=!1,I=!1,j=[],L=[];function O(){return 0==L.length&&fetch("https://sjezd-qr-ticket.herokuapp.com/get/all_interests").then((function(e){return e.json()})).then((function(e){L=e.message})).catch((function(e){L=[],alert("Connection to database error: "+e)})),L=[{key:"registration",title:"Registration"},{key:"dinner_fri",title:"Dinner friday"},{key:"breakfast_sat",title:"Breakfast saturday"},{key:"lunch_sat",title:"Lunch saturday"},{key:"dinner_sat",title:"Dinner saturday"},{key:"breakfast_sun",title:"Breakfast sunday"},{key:"snack_sun",title:"Snack sunday"}]}function P(){return 0==j.length&&fetch("https://sjezd-qr-ticket.herokuapp.com/get/all_tickets").then((function(e){return e.json()})).then((function(e){j=e.message})).catch((function(e){j=[],alert("Connection to database error: "+e)})),j}function z(){return I}function A(e){return""==e||"1234"==e?(D=!0,I=!1,"1234"==e&&(I=!0)):(I=!1,D=!1),D}function R(e){var t=e.itemToValidate,a=e.markAsUsed,n=e.setScanned,r=e.modalState,o=e.setModalState,c=e.scanned,i=e.handleBarCodeScanned;return l.a.createElement(w.a,{style:M.container},r.isVisible&&l.a.createElement(N,{setModalState:o,setScanned:n,itemToValidate:t,markAsUsed:a,dataToModal:r}),l.a.createElement(B.a,{onBarCodeScanned:c?void 0:i,style:[T.a.absoluteFill,M.camera]},l.a.createElement(w.a,{style:M.layerTop}),l.a.createElement(w.a,{style:M.layerCenter},l.a.createElement(w.a,{style:M.layerLeft}),l.a.createElement(w.a,{style:M.focused}),l.a.createElement(w.a,{style:M.layerRight})),l.a.createElement(w.a,{style:M.layerBottom})))}function N(e){var t,a=e.setModalState,n=e.setScanned,r=e.itemToValidate,o=(e.markAsUsed,e.dataToModal),c=Object(k.useTheme)(),i=O();return l.a.createElement(w.a,{style:M.modalContainer},"DATA"===o.type&&l.a.createElement(w.a,{style:[M.modalWindow,{backgroundColor:c["color-"+o.data[0]+"-200"],borderColor:c["color-"+o.data[0]+"-default"]}]},l.a.createElement(l.a.Fragment,null,l.a.createElement(k.Text,{category:"h2",style:[M.title,M.textBlack,{backgroundColor:c["color-"+o.data[0]+"-default"]}]},o.data[1]),l.a.createElement(w.a,{style:{paddingStart:5}},l.a.createElement(k.Text,{category:"h3",style:M.textBlack},o.data[2]),i&&l.a.createElement(k.Text,{category:"h5",style:M.textBlack},null==(t=i.find((function(e){return e.key===r})))?void 0:t.title," - ",o.data[3])),l.a.createElement(w.a,{style:[M.spacer,{backgroundColor:c["color-"+o.data[0]+"-default"]}]})),l.a.createElement(w.a,{style:{alignItems:"center"}},l.a.createElement(k.Button,{style:{marginBottom:5,width:"60%"},status:"primary",onPress:function(){a({type:"HIDDEN",isVisible:!1}),n(!1)}},"Close"))),"LOADING"===o.type&&l.a.createElement(w.a,{style:[M.modalWindow,{backgroundColor:c["background-basic-color-1"]}]},l.a.createElement(k.Text,{category:"h2",style:[M.title,{color:c["text-basic-color"],textAlign:"center"}]},"Loading"),l.a.createElement(w.a,{style:{alignItems:"center",paddingBottom:10}},l.a.createElement(k.Spinner,{size:"giant"}))))}var V="rgba(0, 0, 0, .4)",M=T.a.create({container:{left:0,right:0,top:0,bottom:0,position:"absolute",backgroundColor:"black"},camera:{flex:1,width:"100%",flexDirection:"column"},layerTop:{flex:2,backgroundColor:V},layerCenter:{flex:3,flexDirection:"row"},layerLeft:{flex:1,backgroundColor:V},focused:{flex:10},layerRight:{flex:1,backgroundColor:V},layerBottom:{flex:2,backgroundColor:V},modalContainer:{backgroundColor:"rgba(255, 255, 255, 0.5)",width:"100%",height:"100%",alignItems:"center",justifyContent:"center",position:"absolute",zIndex:99,top:0,left:0},modalWindow:{borderWidth:2,borderRadius:5,width:"90%"},spacer:{height:2,width:"95%",alignSelf:"center",marginBottom:5,marginTop:5},title:{backgroundColor:"black",padding:3,paddingStart:10},textBlack:{color:"black"}}),U=a(949),G=a(149);function W(e){var t=e.selectedTicket,a=e.onClose,n=e.visible,o=function(e){return l.a.createElement(w.a,e,l.a.createElement(k.Text,{category:"h3"},t.name),l.a.createElement(k.Text,{category:"s1"},t.ID))},c=function(e){return l.a.createElement(w.a,r()({},e,{style:[e.style,_.footerContainer]}),l.a.createElement(k.Button,{style:_.footerControl,size:"small",status:"basic",onPress:a},"CANCEL"),l.a.createElement(k.Button,{style:_.footerControl,size:"small",status:"info",onPress:a},"UPDATE"))};return l.a.createElement(k.Modal,{visible:n,backdropStyle:_.backdrop,style:{width:"90%"}},l.a.createElement((function(){var e=["--","Meat","Vege"],a=l.a.useState(0),n=d()(a,2),r=n[0],i=n[1],s=l.a.useState(!1),u=d()(s,2),m=u[0],f=u[1],y=l.a.useState(0),g=d()(y,2),b=g[0],E=g[1];return l.a.createElement(k.Card,{style:_.card,header:o,footer:c},l.a.createElement(w.a,{style:_.bodyContainer},l.a.createElement(k.Text,null,"Registration:"),l.a.createElement(k.Text,{style:{textTransform:"capitalize"}},t.registration)),l.a.createElement(w.a,{style:[_.bodyContainer,{marginBottom:12}]},l.a.createElement(k.Text,null,"Balance:"),l.a.createElement(k.Text,null,t.balance," CZK")),l.a.createElement(k.Divider,null),l.a.createElement(k.TabBar,{selectedIndex:b,onSelect:function(e){return E(e)}},l.a.createElement(k.Tab,{title:"Friday"}),l.a.createElement(k.Tab,{title:"Saturday"}),l.a.createElement(k.Tab,{title:"Sunday"})),l.a.createElement(k.ViewPager,{selectedIndex:b,shouldLoadComponent:function(e){return e===b}},l.a.createElement(k.Layout,{level:"2",style:_.kittenUiBackground},l.a.createElement(k.Divider,null),l.a.createElement(w.a,{style:_.bodyContainer},l.a.createElement(k.Text,{category:"h6"},"Dinner:"),l.a.createElement(k.Select,{style:{padding:4,flexGrow:1,marginLeft:8},value:e[r],onSelect:function(e){return i(e.row)}},e.map((function(e,t){return l.a.createElement(k.SelectItem,{title:e,key:t})}))))),l.a.createElement(k.Layout,{level:"2",style:_.kittenUiBackground},l.a.createElement(k.Divider,null),l.a.createElement(w.a,{style:_.bodyContainer},l.a.createElement(k.Text,{category:"h6"},"Breakfast:"),l.a.createElement(k.Toggle,{checked:m,onChange:f,style:{padding:4}})),l.a.createElement(k.Divider,null),l.a.createElement(w.a,{style:_.bodyContainer},l.a.createElement(k.Text,{category:"h6"},"Lunch:"),l.a.createElement(k.Select,{style:{padding:4,flexGrow:1,marginLeft:8},value:e[r],onSelect:function(e){return i(e.row)}},e.map((function(e,t){return l.a.createElement(k.SelectItem,{title:e,key:t})})))),l.a.createElement(k.Divider,null),l.a.createElement(w.a,{style:_.bodyContainer},l.a.createElement(k.Text,{category:"h6"},"Dinner:"),l.a.createElement(k.Select,{style:{padding:4,flexGrow:1,marginLeft:8},value:e[r],onSelect:function(e){return i(e.row)}},e.map((function(e,t){return l.a.createElement(k.SelectItem,{title:e,key:t})}))))),l.a.createElement(k.Layout,{level:"2",style:_.kittenUiBackground},l.a.createElement(k.Divider,null),l.a.createElement(w.a,{style:_.bodyContainer},l.a.createElement(k.Text,{category:"h6"},"Breakfast:"),l.a.createElement(k.Toggle,{checked:m,onChange:f,style:{padding:4}})),l.a.createElement(k.Divider,null),l.a.createElement(w.a,{style:_.bodyContainer},l.a.createElement(k.Text,{category:"h6"},"Lunch:"),l.a.createElement(k.Select,{style:{padding:4,flexGrow:1,marginLeft:8},value:e[r],onSelect:function(e){return i(e.row)}},e.map((function(e,t){return l.a.createElement(k.SelectItem,{title:e,key:t})})))),l.a.createElement(k.Divider,null),l.a.createElement(w.a,{style:_.bodyContainer},l.a.createElement(k.Text,{category:"h6"},"Dinner:"),l.a.createElement(k.Select,{style:{padding:4,flexGrow:1,marginLeft:8},value:e[r],onSelect:function(e){return i(e.row)}},e.map((function(e,t){return l.a.createElement(k.SelectItem,{title:e,key:t})})))))))}),null))}var _=T.a.create({kittenUiBackground:{backgroundColor:"#222B45"},topContainer:{flexDirection:"row",justifyContent:"space-between"},card:{flex:1,padding:2},footerContainer:{flexDirection:"row",justifyContent:"flex-end"},footerControl:{marginHorizontal:2},backdrop:{backgroundColor:"rgba(0, 0, 0, 0.5)"},bodyContainer:{flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}),F=a(285);function H(e){var t=e.modalVisiblity,a=e.setModalVisiblity,n=e.dataToModal;Object(k.useTheme)();return l.a.createElement(k.Layout,{style:Q.container,level:"1"},l.a.createElement(k.Modal,{visible:t,style:Q.modalContainer},l.a.createElement(w.a,{style:[Q.modalWindow]},l.a.createElement(k.Text,{style:Q.title},n?n.name:"loading"),l.a.createElement(F.a,{value:n?n.ID:"loading",size:200}),l.a.createElement(k.Text,{style:Q.subtitle},n?n.ID:"loading"),l.a.createElement(k.Button,{style:{marginTop:5,width:"60%"},status:"primary",onPress:function(){a(!1)}},"Close"))))}var Q=T.a.create({modalWindow:{paddingBottom:10,paddingTop:10,borderWidth:2,borderRadius:5,alignItems:"center",justifyContent:"center",backgroundColor:"rgba(255, 255, 255, 1)",width:"90%"},title:{fontSize:42,textAlign:"center",paddingBottom:5,color:"black"},subtitle:{fontSize:25,textAlign:"center",paddingTop:5,color:"black"},modalContainer:{backgroundColor:"rgba(255, 255, 255, 0.5)",width:"100%",height:"100%",alignItems:"center",justifyContent:"center"},topContainer:{flexDirection:"row",justifyContent:"space-between"},card:{flex:1,margin:2},footerContainer:{flexDirection:"row",justifyContent:"flex-end"},footerControl:{marginHorizontal:2},backdrop:{backgroundColor:"rgba(0, 0, 0, 0.5)"},container:{flex:0,width:"100%",justifyContent:"space-between",flexDirection:"column",backgroundColor:"black"}});function q(e){var t=e.manualValidation,a=l.a.useState(!1),n=d()(a,2),o=n[0],c=n[1],i=l.a.useState(null),s=d()(i,2),u=s[0],m=s[1],f=P(),y=l.a.useState(f),g=d()(y,2),b=g[0],E=g[1],p=l.a.useState(!1),h=d()(p,2),C=h[0],x=h[1],T=l.a.useState(null),S=d()(T,2),v=S[0],B=S[1],D=function(e){return l.a.createElement(k.Icon,r()({},e,{name:"person"}))},I=function(e){return l.a.createElement(k.Icon,r()({},e,{name:"edit-outline"}))},j=function(e){return l.a.createElement(k.Icon,r()({},e,{name:"person-done-outline"}))};return l.a.createElement(l.a.Fragment,null,l.a.createElement(w.a,{style:{flex:1,backgroundColor:"black"}},l.a.createElement(k.TopNavigation,{style:{elevation:5},title:function(){return l.a.createElement(k.Text,{style:{flex:1,textAlign:"center",fontSize:25}},"List of tickets")}}),l.a.createElement(k.Divider,null),l.a.createElement(k.List,{style:K.list,data:b,renderItem:function(e){var a=e.item,n=e.index;return l.a.createElement(k.ListItem,{key:n,title:function(){return l.a.createElement(k.Text,{style:K.listItemTitle},a.name)},description:a.ID,accessoryLeft:D,accessoryRight:function(e){return z()?function(e,a){return l.a.createElement(l.a.Fragment,null,l.a.createElement(k.Button,{size:"small",status:"info",accessoryLeft:I,style:K.editButton,onPress:function(){m(a),c(!0)}}),l.a.createElement(k.Button,{size:"small",status:"success",accessoryLeft:j,style:K.editButton,onPress:function(){t(a.ID)}}))}(0,a):function(e,a){return l.a.createElement(k.Button,{size:"small",status:"success",accessoryLeft:j,style:K.editButton,onPress:function(){t(a.ID)}})}(0,a)},onPress:function(){m(a),function(e){B(e),x(!0)}(a)},style:K.listItem})},ListEmptyComponent:l.a.createElement(k.Text,{style:K.emptyListText},"No tickets found!")}),z()&&null!=u?l.a.createElement(W,{selectedTicket:u,onClose:function(){return c(!1)},visible:o}):l.a.createElement(l.a.Fragment,null),l.a.createElement(k.Divider,null),l.a.createElement(w.a,{style:{elevation:5,backgroundColor:"black"}},l.a.createElement(J,{setSearchedTickets:E,allTickets:f}))),l.a.createElement(H,{modalVisiblity:C,setModalVisiblity:x,dataToModal:v}))}function J(e){var t=e.setSearchedTickets,a=e.allTickets,n=l.a.useState(""),o=d()(n,2),c=o[0],i=o[1],s=function(){i(""),t(a)};return l.a.createElement(k.Input,{value:c,autoCapitalize:"none",autoCorrect:!1,placeholder:"Search",style:K.searchBar,clearButtonMode:"while-editing",accessoryRight:function(e){return l.a.createElement(G.a,{onPress:s},l.a.createElement(k.Icon,r()({},e,{name:"close-outline"})))},onChangeText:function(e){i(e),t(""==e?a:a.filter((function(t){return Z(t.name.toLowerCase()).includes(Z(e.toLowerCase()))||t.ID.toLowerCase().includes(e.toLowerCase())})))}})}var K=T.a.create({list:{width:"100%",backgroundColor:"black",padding:15},listItem:{margin:5,borderRadius:15},listItemTitle:{fontSize:20},editButton:{borderRadius:12,width:15,marginLeft:5},emptyListText:{fontSize:40,marginTop:"20%",alignSelf:"center"},searchBar:{backgroundColor:"black",padding:10,color:"#000",borderColor:"#aaa",borderRadius:15,alignItems:"center",justifyContent:"center"}});function Z(e){for(var t=[{base:"a",letters:/[\xe1\xe4]/g},{base:"c",letters:/[\u010d]/g},{base:"d",letters:/[\u010f]/g},{base:"e",letters:/[\u011b\xe9]/g},{base:"i",letters:/[\xed]/g},{base:"l",letters:/[\u013a\u013e]/g},{base:"n",letters:/[\u0148]/g},{base:"o",letters:/[\xf3\xf4]/g},{base:"r",letters:/[\u0159\u0155]/g},{base:"s",letters:/[\u0161]/g},{base:"t",letters:/[\u0165]/g},{base:"u",letters:/[\u016f\xfa]/g},{base:"y",letters:/[\xfd]/g},{base:"z",letters:/[\u017e]/g}],a=0;a<t.length;a++)e=e.replace(t[a].letters,t[a].base);return e}function X(e){var t=function(t){return l.a.createElement(w.a,r()({},t,{style:Y.text}),l.a.createElement(k.Text,{category:"h3"},e.user),l.a.createElement(k.Text,{category:"s1"},e.desc))},a=function(t){return l.a.createElement(w.a,r()({},t,{style:[t.style,Y.footerContainer]}),l.a.createElement(k.Button,{style:Y.footerControl,size:"small",status:"basic",onPress:function(){return e.setVisible(!1)}},"CANCEL"),l.a.createElement(k.Button,{style:Y.footerControl,size:"small",onPress:function(){return e.setVisible(!1)}},"UPDATE"))};return l.a.createElement(k.Modal,{visible:e.visible,backdropStyle:Y.backdrop},l.a.createElement((function(){return l.a.createElement(k.Card,{style:Y.card,header:t,footer:a},l.a.createElement(k.Text,null,"The Text"))}),null))}var Y=T.a.create({text:{color:"black"},topContainer:{flexDirection:"row",justifyContent:"space-between"},card:{flex:1,margin:2},footerContainer:{flexDirection:"row",justifyContent:"flex-end"},footerControl:{marginHorizontal:2},backdrop:{backgroundColor:"rgba(0, 0, 0, 0.5)"}});function $(e){var t=e.ticketType,a=e.markTicketAsUsed,n=e.hasPermission,r=e.setHasPermission,c=Object(U.a)(),i=Object(S.a)().width,s=function(e){j(e)},u=Object(o.useState)(!1),m=d()(u,2),f=m[0],y=m[1],g=Object(o.useState)({type:"HIDDEN",isVisible:!1}),b=d()(g,2),E=b[0],p=b[1],h=t.key,C=l.a.useState(""),x=d()(C,2),T=x[0],D=x[1],I=function(e){e.type;var t=e.data;p({type:"LOADING",isVisible:!0}),j(t)},j=function(e){y(!0),L(e)},L=function(e){fetch("https://sjezd-qr-ticket.herokuapp.com/get/"+e).then((function(e){return e.json()})).then((function(e){p({type:"DATA",isVisible:!0,data:O(e.message[0],h)})})).catch((function(e){alert("ERROR: Chyba p\u0159ipojen\xed k datab\xe1zi p\u0159i na\u010d\xedt\xe1n\xed vstupenky."+e),p({type:"HIDDEN",isVisible:!1})}))};function O(e,t){switch(function(e,t){return e?e&&e.hasOwnProperty("timestamp_"+t)&&null!==e["timestamp_"+t]?"used":e&&e.hasOwnProperty(t)&&["true","all","sobota","maso","bezmaso"].includes(e[t])?"ok":e&&e.hasOwnProperty(t)&&[null,"",!1].includes(e[t])?"not":"error":"error"}(e,t)){case"used":return["warning","Ticket has been already used!",null==e?void 0:e.name,e[t]];case"ok":return["success","Ticket checked",null==e?void 0:e.name,e[t]];case"not":return["info","Not purchased!",null==e?void 0:e.name,e[t]];default:return["danger","Error",null==e?void 0:e.name,e[t]]}}if("DENIED"===n.type)return l.a.createElement(w.a,{style:{height:"100%",justifyContent:"center"}},l.a.createElement(k.Text,{category:"h4",style:{textAlign:"center"}},"Please allow Camera"),l.a.createElement(k.Button,{onPress:function(){B.a.requestPermissionsAsync().then((function(e){var t=e.status;r("granted"===t?{type:"GRANTED"}:{type:"DENIED"})}))}},"Done"));if("LOADING"===n.type)return l.a.createElement(w.a,{style:{flex:1,height:"100%",justifyContent:"center",alignItems:"center"}},l.a.createElement(k.Spinner,{size:"giant"}));function P(e){return l.a.createElement(v.a,{style:{flex:1},behavior:"height",keyboardVerticalOffset:40},l.a.createElement(q,{manualValidation:s}))}return l.a.createElement(c.Navigator,{initialRouteName:"QRScreen",backBehavior:"initialRoute",screenOptions:{drawerPosition:"right",drawerStyle:{width:"90%",backgroundColor:"black"},headerShown:!1},drawerContent:function(e){return l.a.createElement(P,e)}},l.a.createElement(c.Screen,{name:"QRScreen",component:function(){return l.a.createElement(w.a,{style:ee.container},l.a.createElement(k.Text,{style:ee.title},t.title),l.a.createElement(R,{itemToValidate:t.key,markAsUsed:a,setScanned:y,modalState:E,setModalState:p,scanned:f,handleBarCodeScanned:I}),l.a.createElement(w.a,{style:ee.searchBox},l.a.createElement(k.Input,{value:T,autoCapitalize:"characters",autoCorrect:!1,placeholder:"or Type QR code",status:"control",size:"large",maxLength:10,style:ee.searchBar,textStyle:ee.searchBarText,onChangeText:function(e){return D(e)},onSubmitEditing:function(e){return j(e.nativeEvent.text)}})),l.a.createElement(X,null))},options:{drawerLabel:"QRScreen",swipeEdgeWidth:i/2}}))}var ee=T.a.create({title:{position:"absolute",top:0,zIndex:100,fontSize:30,width:"100%",textAlign:"center",padding:7,color:"white",backgroundColor:"black",borderBottomColor:"grey",borderBottomWidth:2,borderRadius:10},container:{flex:1,width:"100%",justifyContent:"space-between",flexDirection:"column",backgroundColor:"black"},searchBox:{backgroundColor:"transparent",height:"80%",justifyContent:"flex-end"},searchBar:{width:"50%",alignSelf:"center",backgroundColor:"rgba(80,80,80,0.5)"},searchBarText:{textAlign:"center"}}),te=a(58);function ae(e){var t=e.navigation,n=l.a.useState(!1),r=d()(n,2),o=r[0],c=r[1],i=l.a.useState(""),s=d()(i,2),u=s[0],m=s[1];function f(){m("")}function y(){A(u)?(f(),c(!1),t.navigate("QrScreen")):c(!0)}return l.a.createElement(w.a,{style:ne.container},l.a.createElement(w.a,null,l.a.createElement(te.a,{style:ne.logoImg,source:a(442)}),l.a.createElement(k.Text,{style:ne.title},"QR Ticket")),l.a.createElement(w.a,null,l.a.createElement(k.Tooltip,{anchor:function(){return l.a.createElement(k.Input,{placeholder:"Entry code",value:u,autoCapitalize:"characters",autoFocus:!0,autoCorrect:!1,status:"info",maxLength:10,size:"large",style:ne.input,textStyle:ne.inputText,onFocus:f,onChangeText:function(e){return m(e)},onSubmitEditing:y})},visible:o,placement:"top",onBackdropPress:function(){return c(!1)}},"Bad entry code!")),l.a.createElement(w.a,null,l.a.createElement(k.Button,{style:ne.button,size:"large",status:"info",onPress:function(){return y()}},"LOG IN")))}var ne=T.a.create({container:{paddingHorizontal:100,justifyContent:"center",flex:1,backgroundColor:"black"},title:{fontSize:42,textAlign:"center",color:"white"},input:{borderRadius:40,backgroundColor:"black",textAlign:"center"},inputText:{textAlign:"center",fontSize:20,paddingVertical:7,color:"white"},logoImg:{alignSelf:"center",width:"70%",height:"45%",borderRadius:100,resizeMode:"contain"},button:{marginTop:20,marginBottom:"50%",paddingVertical:17,borderRadius:40}}),re=a(50);function oe(e){var t=e.ticketType,a=e.markTicketAsUsed,n=e.setTicketType,o=(e.setMarkTicketAsUsed,e.ticketTypes),c=Object(k.useTheme)();return l.a.createElement(w.a,{style:le.container},l.a.createElement(k.TopNavigation,{style:{elevation:5},title:function(){return l.a.createElement(k.Text,{style:{flex:1,textAlign:"center",fontSize:25}},"Choose ticket type to scan")}}),l.a.createElement(k.Divider,null),l.a.createElement(re.a,{contentContainerStyle:le.cardBoxContent},o.map((function(e,a){return l.a.createElement(k.Card,{key:e.key,style:[le.card,t.key===e.key&&{backgroundColor:c["color-primary-default"]}],onPress:function(){n(e)}},l.a.createElement(k.Text,{style:[le.cardText,t.key===e.key&&{color:"white"}]},e.title))}))),l.a.createElement(k.Divider,null),l.a.createElement(k.BottomNavigation,{selectedIndex:a,onSelect:n,indicatorStyle:{backgroundColor:c["color-primary-200"],height:"130%"},style:{elevation:5}},l.a.createElement(k.BottomNavigationTab,{title:"Only validate",icon:function(e){return l.a.createElement(k.Icon,r()({},e,{name:"eye-outline"}))}}),l.a.createElement(k.BottomNavigationTab,{title:"Also mark as used",icon:function(e){return l.a.createElement(k.Icon,r()({},e,{name:"checkmark-circle-2-outline"}))}})))}var le=T.a.create({container:{flex:1,width:"100%",justifyContent:"center",backgroundColor:"black"},cardBoxContent:{justifyContent:"center",flex:1,width:"100%",backgroundColor:"black"},cardText:{textAlign:"center",fontSize:25},card:{width:"90%",margin:10,justifyContent:"center",alignSelf:"center",borderRadius:15}}),ce=a(950);function ie(){var e=Object(U.a)(),t=Object(S.a)().width,a=O(),n=l.a.useState(a[0]),r=d()(n,2),c=r[0],i=r[1],s=l.a.useState(0),u=d()(s,2),m=u[0],f=u[1],y=Object(o.useState)({type:"LOADING"}),g=d()(y,2),b=g[0],E=g[1];Object(o.useEffect)((function(){var e=!0;return B.a.requestPermissionsAsync().then((function(t){var a=t.status;e&&E("granted"===a?{type:"GRANTED"}:{type:"DENIED"})})),function(){e=!1}}),[]);return l.a.createElement(ce.a,null,l.a.createElement(e.Navigator,{initialRouteName:"LoginScreen",backBehavior:"initialRoute",drawerContent:function(){return l.a.createElement(oe,{ticketType:c,markTicketAsUsed:m,setTicketType:i,setMarkTicketAsUsed:f,ticketTypes:a})},screenOptions:{drawerPosition:"left",drawerStyle:{width:"90%"},headerShown:!1}},l.a.createElement(e.Screen,{name:"LoginScreen",component:ae,options:{drawerLabel:"LoginScreen",swipeEdgeWidth:0,gestureEnabled:!1}}),l.a.createElement(e.Screen,{name:"QrScreen",component:function(){return l.a.createElement($,{ticketType:c,markTicketAsUsed:m,hasPermission:b,setHasPermission:E})},options:{drawerLabel:"QrScreen",swipeEdgeWidth:t/2}})))}function se(){return function(){var e=o.useState(!1),t=d()(e,2),n=t[0],r=t[1];return o.useEffect((function(){f.a.async((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,b.b(),e.next=4,f.a.awrap(g.b(p(p({},y.a.font),{},{"space-mono":a(308)})));case 4:e.next=9;break;case 6:e.prev=6,e.t0=e.catch(0),console.warn(e.t0);case 9:return e.prev=9,r(!0),b.a(),e.finish(9);case 13:case"end":return e.stop()}}),null,null,[[0,6,9,13]],Promise)}),[]),n}()?l.a.createElement(l.a.Fragment,null,l.a.createElement(k.ApplicationProvider,r()({},h,{theme:h.dark}),l.a.createElement(x.a,{hidden:!1,backgroundColor:"gray"}),l.a.createElement(k.IconRegistry,{icons:C.EvaIconsPack}),l.a.createElement(c.b,null,l.a.createElement(ie,null)))):null}},292:function(e,t,a){e.exports=a(936)},308:function(e,t,a){e.exports=a.p+"./fonts/SpaceMono-Regular.ttf"},442:function(e,t,a){e.exports=a.p+"static/media/icon.f7cdf9f7.png"}},[[292,1,2]]]);
//# sourceMappingURL=app.c8587abb.chunk.js.map