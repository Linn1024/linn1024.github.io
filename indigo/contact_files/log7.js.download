(function(){var INIT={};INIT.version_number="8.329";INIT.package_name="web_stat";INIT.app_url="app.ardalio.com";INIT.script="log7";INIT.session_length=1800000;INIT.max_duration=3600000;var controller=new AbortController();var signal=controller.signal;function wtslog7(alias,db,obj,event_name,event_conversion,event,origin){console.log("alias: "+alias+" / "+origin);if(/bot|crawl|google|baidu|bing|msn|teoma|slurp|yandex|headlesschrome/i.test(navigator.userAgent)){return;}
if(!Number.isInteger(parseInt(alias))||!Number.isInteger(parseInt(db))){return;}
alias=alias.toString();alias=alias.replace(/\D/g,'');db=db.toString();db=db.replace(/\D/g,'');if(alias=="1311076"||alias=="1271129"||alias=="1753501"||alias=="2043840"){return;}
var INPUT={};if(typeof window.wts7!=='undefined'){INPUT=Object.assign({},window.wts7);}
Object.assign(INPUT,{alias:alias,db:db,obj:obj,event_name:event_name,event_conversion:event_conversion,event:event,origin:origin,version_number:INIT.version_number,package_name:INIT.package_name});if(INPUT.origin=="embeddedScript"){INPUT.origin="embeddedScript";INPUT.params="wix";INPUT.invisible="yes";}
var initializeAndExecute=function(event){try{if(typeof wtslog7_exe==='function'){wtslog7_exe(event,INPUT);}
else{throw new Error("wtslog7_exe is not a function");}}
catch(e){}};var featuresNeeded=[];if(!window.fetch){featuresNeeded.push('fetch');}
if(!window.Promise){featuresNeeded.push('Promise');}
if(!JSON||!JSON.stringify){var script=document.createElement('script');script.src='https://cdnjs.cloudflare.com/ajax/libs/json3/3.3.2/json3.min.js';document.head.appendChild(script);}
if(!navigator.sendBeacon){featuresNeeded.push('navigator.sendBeacon');}
if(featuresNeeded.length>0){var polyfillScript=document.createElement('script');polyfillScript.onload=function(){function onPolyfillsLoaded(){if(!window.JSON||!window.JSON.stringify){polyfillJSONStringify();}
initializeAndExecute({type:"init"});}
if(document.readyState==="loading"){document.addEventListener("DOMContentLoaded",onPolyfillsLoaded);}
else{onPolyfillsLoaded();}};polyfillScript.src='https://cdnjs.cloudflare.com/polyfill/v3/polyfill.js?version=4.8.0&features='+featuresNeeded.join('%2C');document.head.appendChild(polyfillScript);}
else{if(document.readyState==="loading"){document.addEventListener("DOMContentLoaded",function(){initializeAndExecute({type:"init"});});}
else{initializeAndExecute({type:"init"});}}}
function wtslog7_exe(event,INPUT){INIT.worker_data=null;var STORAGE={};var CALCULATED={};var PING={};var PANEL={};var matches=/[\?&]wtsio=([A-Za-z0-9+/]+={0,2})(&|%3D|$)/.exec(window.location.href);if(matches&&matches.length>1){var isWtsio_alias=atob(matches[1]);if(isWtsio_alias==INPUT.alias){CALCULATED.is_owner="1";}}
if(INPUT.origin=="embeddedScript"&&!INIT.message_handlers_added){window.addEventListener("message",function(event){messageHandler(event,INPUT,STORAGE);});INIT.message_handlers_added=true;}
INPUT.isLocalStorageAvailable=isLocalStorageAvailable();var time_last_load_client=0;try{time_last_load_client=parseInt(sessionStorage.getItem("tllc_"+INPUT.alias)||"0");}
catch(e){}
if(INPUT.isLocalStorageAvailable){var STORAGE_JSON=localStorage.getItem('STORAGE_JSON_'+INPUT.alias);if(STORAGE_JSON){try{STORAGE=JSON.parse(STORAGE_JSON);}
catch(e){}}}
STORAGE.test_mode=STORAGE.test_mode||"no";STORAGE.n_pv_session=parseInt(STORAGE.n_pv_session||"1");INIT.time_init_client=Date.now();INIT.currentURL=window.location.href;if(INPUT.alias=='2143226'&&INIT.currentURL.indexOf("maggiemaes.net")===-1&&INIT.currentURL.indexOf("3249b6-3.myshopify.com")===-1){wtsDebug7("Shopify2143226 accessed from wrong URL: "+INIT.currentURL);}
if(STORAGE.exclusion_type=="forbidden"){return;}
if(STORAGE.exclusion_type=="over_limit"){CALCULATED.exclusion_type="over_limit";}
if(STORAGE.is_owner=="1"){CALCULATED.exclusion_type="is_owner";}
if(INIT.time_init_client-time_last_load_client<=INIT.session_length){if(['regular','free','basic'].includes(STORAGE.user_status)&&STORAGE.test_mode!="yes"){CALCULATED.exclusion_type="pv_no_premium";}
else if(!INPUT.event&&!INPUT.event_name&&INIT.currentURL==STORAGE.lastURL){CALCULATED.exclusion_type="reload";CALCULATED.unique_id=STORAGE.last_recorded_unique_id;}
else{STORAGE.n_pv_session++;if(STORAGE.n_pv_session>150){return;}}}
else{STORAGE.n_pv_session=1;}
if(INPUT.action=="draw"){CALCULATED.exclusion_type="no_count";}
if(location.search.includes('wts_se_')){CALCULATED.exclusion_type=undefined;}
if(CALCULATED.exclusion_type&&CALCULATED.exclusion_type!="reload"&&INPUT.action!="redraw"&&INPUT.action!="draw"&&(INPUT.invisible=="yes"||STORAGE.counter_info=="invisible")){console.log("returning because / exclusion: "+CALCULATED.exclusion_type);return;}
if(INPUT.event){INPUT.event.preventDefault();}
STORAGE.exclusion_type="";INIT.lastURL=STORAGE.lastURL;INPUT.origin=INPUT.origin||"log7";if(INPUT.embedVersion>=2){if(STORAGE.user_id==INPUT.userId){STORAGE.user_id="";}}
if(['ht1','ht2','ht3','ht4','pro','max'].includes(STORAGE.user_status)){if(INPUT.user_id&&!STORAGE.user_id||INPUT.user_id!=STORAGE.user_id){INPUT.update_user_id=1;}}
if(INPUT.alias=='2030596'&&INPUT.user_id=='8ed04ea0-1b14-4401-9d40-e02f737f0157'){if(!CALCULATED.is_owner=="1"){INPUT.user_id='';}}
var OUTPUT={};OUTPUT=Object.assign({},STORAGE,INPUT,CALCULATED);if(!CALCULATED.exclusion_type||CALCULATED.exclusion_type=="no_count"){STORAGE.lastURL=INIT.currentURL;if(OUTPUT.user_id){STORAGE.user_id=OUTPUT.user_id;}
try{localStorage.setItem('STORAGE_JSON_'+INPUT.alias,JSON.stringify(STORAGE));}
catch(e){}
try{sessionStorage.setItem("tllc_"+INPUT.alias,INIT.time_init_client);}
catch(e){}}
if(!CALCULATED.exclusion_type){OUTPUT.delta_time_js=INIT.time_init_client-time_last_load_client;OUTPUT.scrW=screen.width||window.innerWidth||window.screen.height||0;OUTPUT.scrH=screen.height||window.innerHeight||window.screen.height||0;if(OUTPUT.event_name){OUTPUT.invisible="yes";OUTPUT.conversion_number=OUTPUT.event_conversion;OUTPUT.event_name=encodeURIComponent(OUTPUT.event_name);OUTPUT.page_name="event_"+OUTPUT.event_name;OUTPUT.group_name=OUTPUT.event_name;OUTPUT.url=OUTPUT.event_name;OUTPUT.title=OUTPUT.event_name;}
else{if(INPUT.embedVersion>=2){OUTPUT.title=INPUT.pageTitle;if(OUTPUT.title.includes('{"')){if(OUTPUT.title.includes('checkout')){wtsDebug7("Checkout / title = "+OUTPUT.title);OUTPUT.title="Checkout";}
else if(OUTPUT.title.includes('cart')){wtsDebug7("Cart / title = "+OUTPUT.title);OUTPUT.title="Cart";}
else{wtsDebug7("title = "+OUTPUT.title);}}
if(INPUT.pagePath){OUTPUT.url=window.location.protocol+'//'+window.location.host+INPUT.pagePath;}}
if(!OUTPUT.title){OUTPUT.title=document.title;try{OUTPUT.title=top.document.title;}
catch(e){}}
OUTPUT.page_name=OUTPUT.page_name||OUTPUT.title;if(!OUTPUT.url){OUTPUT.url=document.URL;try{OUTPUT.url=top.document.URL;}
catch(e){}}
OUTPUT.url=OUTPUT.url?OUTPUT.url.replace(/\/$/,""):OUTPUT.url;OUTPUT.referer=document.referrer;try{OUTPUT.referer=top.document.referrer;}
catch(e){}
OUTPUT.referer=OUTPUT.referer?OUTPUT.referer.substring(0,510).replace(/\/$/,""):"";if(INPUT.params=="wix"&&OUTPUT.url.indexOf("wixStats")>-1){OUTPUT.url=OUTPUT.referer;}}}
if(CALCULATED.exclusion_type){OUTPUT.action="draw";}
fetch("https://"+INIT.app_url+"/LogServer",{method:"POST",body:JSON.stringify(OUTPUT)}).then(function(response){if(!response.ok){throw new Error("Server responded with an error");}
return response.json();}).then(function(RESPONSE){if(RESPONSE.error){if(RESPONSE.error.indexOf("no alias")>-1||RESPONSE.error=="forbidden"){STORAGE.exclusion_type="forbidden";try{localStorage.setItem('STORAGE_JSON_'+INPUT.alias,JSON.stringify(STORAGE));}
catch(e){}}
return;}
if(RESPONSE.exclusion_type=="exclusion_check"){STORAGE.is_owner=1;try{localStorage.setItem("STORAGE_JSON_"+OUTPUT.alias,JSON.stringify(STORAGE));}
catch(e){}}
if(RESPONSE.correct_time_last_visit_server||RESPONSE.user_status!=STORAGE.user_status||RESPONSE.test_mode=="yes"&&(RESPONSE.test_mode!=STORAGE.test_mode)){if(window.parent){var message;if(RESPONSE.correct_time_last_visit_server){STORAGE.time_last_visit_server=RESPONSE.server_time;message={type:"updateStorage",field:"time_last_visit_server",value:STORAGE};window.parent.postMessage(message,"*");}
if(RESPONSE.test_mode=="yes"&&(RESPONSE.test_mode!=STORAGE.test_mode)){STORAGE.test_mode="yes";message={type:"updateStorage",field:"test_mode",value:STORAGE};window.parent.postMessage(message,"*");}
if(RESPONSE.user_status!=STORAGE.user_status){STORAGE.user_status=RESPONSE.user_status;message={type:"updateStorage",field:"user_status",value:STORAGE};window.parent.postMessage(message,"*");}}
try{STORAGE.user_status=RESPONSE.user_status;STORAGE.time_last_visit_server=RESPONSE.server_time;localStorage.setItem("STORAGE_JSON_"+OUTPUT.alias,JSON.stringify(STORAGE));}
catch(e){}}
if(document.getElementById("wts"+OUTPUT.alias)){if(RESPONSE.HTML){document.getElementById("wts"+OUTPUT.alias).innerHTML=RESPONSE.HTML;if(typeof INPUT.callback==='function'){INPUT.callback();}}}
if(!["regular","free","basic"].includes(RESPONSE.user_status)&&RESPONSE.counter_info=="panel"&&OUTPUT.invisible!="yes"){PANEL.alias=RESPONSE.alias;PANEL.db=RESPONSE.db;PANEL.delta_time=RESPONSE.delta_time;PANEL.user_status=RESPONSE.user_status;PANEL.task="get_panel_data";PANEL.package_name=INPUT.package_name;PANEL.test_mode=RESPONSE.test_mode;PANEL.delay=4000;updatePanel7(PANEL);}
if(!["regular","free","basic"].includes(RESPONSE.user_status)){PING.delay=1000;PING.session_id=RESPONSE.session_id;PING.unique_id=RESPONSE.unique_id;PING.new_session=RESPONSE.new_session;PING.alias=RESPONSE.alias;PING.db=RESPONSE.db;PING.delta_time=RESPONSE.delta_time;PING.user_status=RESPONSE.user_status;PING.version_number=INIT.version_number;PING.package_name=INIT.package_name;PING.started_on=Date.now();PING.task="ping";}
if(RESPONSE.exclusion_type){STORAGE.user_status=RESPONSE.user_status;STORAGE.delta_time=RESPONSE.delta_time;STORAGE.counter_info=RESPONSE.counter_info;STORAGE.exclusion_type=RESPONSE.exclusion_type;try{localStorage.setItem("STORAGE_JSON_"+OUTPUT.alias,JSON.stringify(STORAGE));}
catch(e){}
if(OUTPUT.obj){redirect7(OUTPUT.obj);}
if(RESPONSE.exclusion_type=="reload"&&!["regular","free","basic"].includes(RESPONSE.user_status)){pingPage7(PING);}
return;}
STORAGE.time_last_visit_server=RESPONSE.server_time;STORAGE.last_recorded_unique_id=RESPONSE.unique_id;STORAGE.session_id=RESPONSE.session_id;STORAGE.user_status=RESPONSE.user_status;STORAGE.delta_time=RESPONSE.delta_time;STORAGE.counter_info=RESPONSE.counter_info;STORAGE.exclusion_type=RESPONSE.exclusion_type;STORAGE.test_mode=RESPONSE.test_mode;if(RESPONSE.user_id){STORAGE.user_id=RESPONSE.user_id;}
STORAGE.n_visits=RESPONSE.n_visits;STORAGE.visitor_id=RESPONSE.visitor_id;STORAGE.original_ref=RESPONSE.original_ref;try{localStorage.setItem("STORAGE_JSON_"+OUTPUT.alias,JSON.stringify(STORAGE));}
catch(e){}
if(OUTPUT.obj){redirect7(OUTPUT.obj);}
if(!INIT.event_handlers_added){window.addEventListener("focus",function(event){focusHandler(event,INPUT,PING,PANEL);});document.addEventListener("visibilitychange",function(event){visibilitychangeHandler(event,INPUT,PING,PANEL);});window.addEventListener("pageshow",function(event){pageshowHandler(event,INPUT,PING);});if(INPUT.origin=="embeddedScript"){INIT.event_handlers_added=true;}}
if(1==1||!['regular','free','basic'].includes(RESPONSE.user_status)){if(INPUT.origin=="embeddedScript"){INIT.update_worker={task:"update_worker",package_name:"web_stat",session_id:RESPONSE.session_id,alias:INPUT.alias,db:INPUT.db,version_number:INPUT.version_number};if(INIT.worker_data){if(INIT.worker_data.user_id&&!STORAGE.user_id){INPUT.update_user_id=1;STORAGE.user_id=INIT.worker_data.user_id;try{localStorage.setItem('STORAGE_JSON_'+INPUT.alias,JSON.stringify(STORAGE));}
catch(e){}}
var DATA=Object.assign({},INIT.update_worker,INIT.worker_data);var beacon_sent=navigator.sendBeacon("https://"+INIT.app_url+"/PingServer",JSON.stringify(DATA));if(beacon_sent){INIT.update_worker=undefined;}}}}
if(['regular','free','basic'].includes(RESPONSE.user_status)){return;}
pingPage7(PING);if(!INPUT.beforeunloadEventAdded){window.addEventListener("beforeunload",function(){beforeunloadHandler(PING);});INPUT.beforeunloadEventAdded=1;}}).catch(function(error){if(error.name!=="AbortError"){}});}
function messageHandler(event,INPUT,STORAGE){if(event.data.type==="updateStorage"){var UPDATED_STORAGE=event.data.value;localStorage.setItem("STORAGE_JSON_"+INPUT.alias,JSON.stringify(UPDATED_STORAGE));}
else if(event.origin=="https://"+INIT.app_url){if(event.data==INPUT.alias+" worker loaded"){event.source.postMessage(INPUT.alias+" embedded script OK",event.origin);}
else if(event.data.type==="workerData"){if(event.data.value){INIT.worker_data=event.data.value;if(INIT.update_worker){if(INIT.worker_data.user_id&&!STORAGE.user_id){INIT.update_worker.update_user_id=1;STORAGE.user_id=INIT.worker_data.user_id;try{localStorage.setItem('STORAGE_JSON_'+INPUT.alias,JSON.stringify(STORAGE));}
catch(e){}}
var DATA=Object.assign({},INIT.update_worker,INIT.worker_data);var beacon_sent=navigator.sendBeacon("https://"+INIT.app_url+"/PingServer",JSON.stringify(DATA));if(beacon_sent){INIT.update_worker=undefined;}}}}}}
function pingPage7(PING){if(PING.timerId){clearTimeout(PING.timerId);PING.timerId=null;}
if(Date.now()-PING.started_on>INIT.max_duration){return;}
var hasFocus=true;try{hasFocus=top.document.hasFocus();}
catch(e){}
if(document.visibilityState=="hidden"||!hasFocus){PING.delay=2000;PING.timerId=setTimeout(function(){pingPage7(PING);},2000);}
else{fetch("https://"+INIT.app_url+"/PingServer",{method:"POST",body:JSON.stringify(PING),signal:signal}).then(function(response){if(!response.ok){throw new Error("Server responded with an error");}
return response.json();}).then(function(RESPONSE){if(RESPONSE.success!="1"){}}).catch(function(error){});PING.delay=PING.delay+1000;if(PING.delay>60000){PING.delay=60000;}
PING.timerId=setTimeout(function(){pingPage7(PING);},PING.delay);}}
function updatePanel7(PANEL){if(PANEL.timerId){clearTimeout(PANEL.timerId);}
if(PANEL.error){return;}
if(document.visibilityState=="hidden"){PANEL.timerId=setTimeout(function(){updatePanel7(PANEL);},3000);return;}
document.getElementById("wts_dot2_"+PANEL.alias).style.opacity="1";var previous_count=parseInt(document.getElementById("wts_last_"+PANEL.alias).innerHTML);fetch("https://"+INIT.app_url+"/PingServer",{method:"POST",body:JSON.stringify(PANEL),signal:signal}).then(function(response){if(!response.ok){throw new Error("Server responded with an error");}
return response.json();}).then(function(RESPONSE){if(!RESPONSE.visits&&!RESPONSE.online){PANEL.error=true;return;}
document.getElementById("wts_p_visits_"+PANEL.alias).innerHTML=RESPONSE.visits.toLocaleString();document.getElementById("wts_p_online_"+PANEL.alias).innerHTML=RESPONSE.online.toLocaleString();if(RESPONSE.visits>previous_count&&PANEL.delay>3000){PANEL.delay=PANEL.delay-1000;}
else{PANEL.delay=PANEL.delay+1000;}
if(PANEL.delay>60000){PANEL.delay=60000;}
if(PANEL.delay<1000){PANEL.delay=1000;}
PANEL.timerId=setTimeout(function(){updatePanel7(PANEL);},PANEL.delay);document.getElementById("wts_dot2_"+PANEL.alias).style.opacity="0";}).catch(function(error){});}
function redirect7(obj){var _obj_dataset,_obj_dataset2;var url=obj.href||((_obj_dataset=obj.dataset)===null||_obj_dataset===void 0?void 0:_obj_dataset.href);if(!url){return;}
var target=obj.target||(((_obj_dataset2=obj.dataset)===null||_obj_dataset2===void 0?void 0:_obj_dataset2.target)==="new"?"_blank":null);if(target){try{window.open(url,target);}
catch(e){redirectToTopOrCurrent(url);}}
else{redirectToTopOrCurrent(url);}}
function redirectToTopOrCurrent(url){try{window.top.location=url;}
catch(e){window.location=url;}}
function beforeunloadHandler(PING){controller.abort();if(PING.unload_signal_sent){return;}
PING.task="unload";PING.unload_signal_sent=navigator.sendBeacon("https://"+INIT.app_url+"/PingServer",JSON.stringify(PING));}
function visibilitychangeHandler(e,INPUT,PING,PANEL){if(document.visibilityState==='visible'){if(PANEL.task){PANEL.delay=0;updatePanel7(PANEL);}
var hasFocus=true;try{hasFocus=top.document.hasFocus();}
catch(e){}
if(hasFocus){var now=Date.now();var time_last_load_client=0;try{time_last_load_client=parseInt(sessionStorage.getItem("tllc_"+INPUT.alias)||"0");}
catch(e){}
if(now-time_last_load_client>INIT.session_length){wtslog7_exe(e,INPUT);}
else{if(PING.task){PING.delay=0;PING.started_on=Date.now();setTimeout(function(){pingPage7(PING);},1000);}}}}}
function focusHandler(e,INPUT,PING,PANEL){var now=Date.now();var time_last_load_client=0;try{time_last_load_client=parseInt(sessionStorage.getItem("tllc_"+INPUT.alias)||"0");}
catch(e){}
if(now-time_last_load_client>INIT.session_length){wtslog7_exe(e,INPUT);}
else{if(PING.task){PING.delay=0;PING.started_on=Date.now();setTimeout(function(){pingPage7(PING);},1000);}
if(PANEL.task){PANEL.delay=0;updatePanel7(PANEL);}}}
function pageshowHandler(e,INPUT,PING){if(e.persisted){if(INIT.currentURL!=INIT.lastURL){wtslog7_exe(e,INPUT);}
else{var now=Date.now();var time_last_load_client=0;try{time_last_load_client=parseInt(sessionStorage.getItem("tllc_"+INPUT.alias)||"0");}
catch(e){}
if(now-time_last_load_client>INIT.session_length){wtslog7_exe(e,INPUT);}}}}
function isLocalStorageAvailable(){try{var testKey='test',storage=window.localStorage;storage.setItem(testKey,'1');storage.removeItem(testKey);return true;}
catch(e){return false;}}
function polyfillJSONStringify(){if(!window.JSON||!window.JSON.stringify){window.JSON={stringify:function(obj){var type=typeof obj;if(type!=="object"||obj===null){if(type==="string"){return'"'+obj+'"';}else if(type==="number"||type==="boolean"){return String(obj);}else if(type==="undefined"){return"undefined";}else{return null;}}else{var result=[];var isArray=Array.isArray(obj);for(var key in obj){if(obj.hasOwnProperty(key)){var value=obj[key];var valueType=typeof value;if(valueType!=="function"&&valueType!=="symbol"){if(valueType!=="undefined"){var strValue=valueType==="object"?this.stringify(value):this.stringify(value);result.push((isArray?"":'"'+key+'":')+strValue);}}}}
return(isArray?"[":"{")+result.join(",")+(isArray?"]":"}");}}};}}
function wtsDebug7(e_text,e_object){console.log("error: "+e_text);var errData=new URLSearchParams();errData.append('e_text',e_text);if(e_object){errData.append('e_object',e_object.toString()+' / e name: '+e_object.name+' e message: '+e_object.message);}
errData.append('version',INIT.version_number);errData.append('referrer',document.referrer);errData.append('url',document.URL);navigator.sendBeacon("https://"+INIT.app_url+"/beacon_e.pl",errData);return;}
window.wtslog7=wtslog7;})();