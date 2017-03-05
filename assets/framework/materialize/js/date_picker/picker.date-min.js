!function(e){"function"==typeof define&&define.amd?define(["picker","jquery"],e):"object"==typeof exports?module.exports=e(require("./picker.js"),require("jquery")):e(Picker,jQuery)}(function(e,$){function t(e,t){var a=this,n=e.$node[0],i=n.value,r=e.$node.data("value"),o=r||i,s=r?t.formatSubmit:t.format,l=function(){return n.currentStyle?"rtl"==n.currentStyle.direction:"rtl"==getComputedStyle(e.$root[0]).direction};a.settings=t,a.$node=e.$node,a.queue={min:"measure create",max:"measure create",now:"now create",select:"parse create validate",highlight:"parse navigate create validate",view:"parse create validate viewset",disable:"deactivate",enable:"activate"},a.item={},a.item.clear=null,a.item.disable=(t.disable||[]).slice(0),a.item.enable=-function(e){return e[0]===!0?e.shift():-1}(a.item.disable),a.set("min",t.min).set("max",t.max).set("now"),o?a.set("select",o,{format:s}):a.set("select",null).set("highlight",a.item.now),a.key={40:7,38:-7,39:function(){return l()?-1:1},37:function(){return l()?1:-1},go:function(e){var t=a.item.highlight,n=new Date(t.year,t.month,t.date+e);a.set("highlight",n,{interval:e}),this.render()}},e.on("render",function(){e.$root.find("."+t.klass.selectMonth).on("change",function(){var a=this.value;a&&(e.set("highlight",[e.get("view").year,a,e.get("highlight").date]),e.$root.find("."+t.klass.selectMonth).trigger("focus"))}),e.$root.find("."+t.klass.selectYear).on("change",function(){var a=this.value;a&&(e.set("highlight",[a,e.get("view").month,e.get("highlight").date]),e.$root.find("."+t.klass.selectYear).trigger("focus"))})},1).on("open",function(){var n="";a.disabled(a.get("now"))&&(n=":not(."+t.klass.buttonToday+")"),e.$root.find("button"+n+", select").attr("disabled",!1)},1).on("close",function(){e.$root.find("button, select").attr("disabled",!0)},1)}var a=7,n=6,i=e._;t.prototype.set=function(e,t,a){var n=this,i=n.item;return null===t?("clear"==e&&(e="select"),i[e]=t,n):(i["enable"==e?"disable":"flip"==e?"enable":e]=n.queue[e].split(" ").map(function(i){return t=n[i](e,t,a)}).pop(),"select"==e?n.set("highlight",i.select,a):"highlight"==e?n.set("view",i.highlight,a):e.match(/^(flip|min|max|disable|enable)$/)&&(i.select&&n.disabled(i.select)&&n.set("select",i.select,a),i.highlight&&n.disabled(i.highlight)&&n.set("highlight",i.highlight,a)),n)},t.prototype.get=function(e){return this.item[e]},t.prototype.create=function(e,t,a){var n,r=this;return t=void 0===t?e:t,t==-(1/0)||t==1/0?n=t:$.isPlainObject(t)&&i.isInteger(t.pick)?t=t.obj:$.isArray(t)?(t=new Date(t[0],t[1],t[2]),t=i.isDate(t)?t:r.create().obj):t=i.isInteger(t)||i.isDate(t)?r.normalize(new Date(t),a):r.now(e,t,a),{year:n||t.getFullYear(),month:n||t.getMonth(),date:n||t.getDate(),day:n||t.getDay(),obj:n||t,pick:n||t.getTime()}},t.prototype.createRange=function(e,t){var a=this,n=function(e){return e===!0||$.isArray(e)||i.isDate(e)?a.create(e):e};return i.isInteger(e)||(e=n(e)),i.isInteger(t)||(t=n(t)),i.isInteger(e)&&$.isPlainObject(t)?e=[t.year,t.month,t.date+e]:i.isInteger(t)&&$.isPlainObject(e)&&(t=[e.year,e.month,e.date+t]),{from:n(e),to:n(t)}},t.prototype.withinRange=function(e,t){return e=this.createRange(e.from,e.to),t.pick>=e.from.pick&&t.pick<=e.to.pick},t.prototype.overlapRanges=function(e,t){var a=this;return e=a.createRange(e.from,e.to),t=a.createRange(t.from,t.to),a.withinRange(e,t.from)||a.withinRange(e,t.to)||a.withinRange(t,e.from)||a.withinRange(t,e.to)},t.prototype.now=function(e,t,a){return t=new Date,a&&a.rel&&t.setDate(t.getDate()+a.rel),this.normalize(t,a)},t.prototype.navigate=function(e,t,a){var n,i,r,o,s=$.isArray(t),l=$.isPlainObject(t),d=this.item.view;if(s||l){for(l?(i=t.year,r=t.month,o=t.date):(i=+t[0],r=+t[1],o=+t[2]),a&&a.nav&&d&&d.month!==r&&(i=d.year,r=d.month),n=new Date(i,r+(a&&a.nav?a.nav:0),1),i=n.getFullYear(),r=n.getMonth();new Date(i,r,o).getMonth()!==r;)o-=1;t=[i,r,o]}return t},t.prototype.normalize=function(e){return e.setHours(0,0,0,0),e},t.prototype.measure=function(e,t){var a=this;return t?"string"==typeof t?t=a.parse(e,t):i.isInteger(t)&&(t=a.now(e,t,{rel:t})):t="min"==e?-(1/0):1/0,t},t.prototype.viewset=function(e,t){return this.create([t.year,t.month,1])},t.prototype.validate=function(e,t,a){var n=this,r=t,o=a&&a.interval?a.interval:1,s=n.item.enable===-1,l,d,c=n.item.min,u=n.item.max,h,y,m=s&&n.item.disable.filter(function(e){if($.isArray(e)){var a=n.create(e).pick;a<t.pick?l=!0:a>t.pick&&(d=!0)}return i.isInteger(e)}).length;if((!a||!a.nav)&&(!s&&n.disabled(t)||s&&n.disabled(t)&&(m||l||d)||!s&&(t.pick<=c.pick||t.pick>=u.pick)))for(s&&!m&&(!d&&o>0||!l&&o<0)&&(o*=-1);n.disabled(t)&&(Math.abs(o)>1&&(t.month<r.month||t.month>r.month)&&(t=r,o=o>0?1:-1),t.pick<=c.pick?(h=!0,o=1,t=n.create([c.year,c.month,c.date+(t.pick===c.pick?0:-1)])):t.pick>=u.pick&&(y=!0,o=-1,t=n.create([u.year,u.month,u.date+(t.pick===u.pick?0:1)])),!h||!y);)t=n.create([t.year,t.month,t.date+o]);return t},t.prototype.disabled=function(e){var t=this,a=t.item.disable.filter(function(a){return i.isInteger(a)?e.day===(t.settings.firstDay?a:a-1)%7:$.isArray(a)||i.isDate(a)?e.pick===t.create(a).pick:$.isPlainObject(a)?t.withinRange(a,e):void 0});return a=a.length&&!a.filter(function(e){return $.isArray(e)&&"inverted"==e[3]||$.isPlainObject(e)&&e.inverted}).length,t.item.enable===-1?!a:a||e.pick<t.item.min.pick||e.pick>t.item.max.pick},t.prototype.parse=function(e,t,a){var n=this,r={};return t&&"string"==typeof t?(a&&a.format||(a=a||{},a.format=n.settings.format),n.formats.toArray(a.format).map(function(e){var a=n.formats[e],o=a?i.trigger(a,n,[t,r]):e.replace(/^!/,"").length;a&&(r[e]=t.substr(0,o)),t=t.substr(o)}),[r.yyyy||r.yy,+(r.mm||r.m)-1,r.dd||r.d]):t},t.prototype.formats=function(){function e(e,t,a){var n=e.match(/\w+/)[0];return a.mm||a.m||(a.m=t.indexOf(n)+1),n.length}function t(e){return e.match(/\w+/)[0].length}return{d:function(e,t){return e?i.digits(e):t.date},dd:function(e,t){return e?2:i.lead(t.date)},ddd:function(e,a){return e?t(e):this.settings.weekdaysShort[a.day]},dddd:function(e,a){return e?t(e):this.settings.weekdaysFull[a.day]},m:function(e,t){return e?i.digits(e):t.month+1},mm:function(e,t){return e?2:i.lead(t.month+1)},mmm:function(t,a){var n=this.settings.monthsShort;return t?e(t,n,a):n[a.month]},mmmm:function(t,a){var n=this.settings.monthsFull;return t?e(t,n,a):n[a.month]},yy:function(e,t){return e?2:(""+t.year).slice(2)},yyyy:function(e,t){return e?4:t.year},toArray:function(e){return e.split(/(d{1,4}|m{1,4}|y{4}|yy|!.)/g)},toString:function(e,t){var a=this;return a.formats.toArray(e).map(function(e){return i.trigger(a.formats[e],a,[0,t])||e.replace(/^!/,"")}).join("")}}}(),t.prototype.isDateExact=function(e,t){var a=this;return i.isInteger(e)&&i.isInteger(t)||"boolean"==typeof e&&"boolean"==typeof t?e===t:(i.isDate(e)||$.isArray(e))&&(i.isDate(t)||$.isArray(t))?a.create(e).pick===a.create(t).pick:!(!$.isPlainObject(e)||!$.isPlainObject(t))&&(a.isDateExact(e.from,t.from)&&a.isDateExact(e.to,t.to))},t.prototype.isDateOverlap=function(e,t){var a=this,n=a.settings.firstDay?1:0;return i.isInteger(e)&&(i.isDate(t)||$.isArray(t))?(e=e%7+n,e===a.create(t).day+1):i.isInteger(t)&&(i.isDate(e)||$.isArray(e))?(t=t%7+n,t===a.create(e).day+1):!(!$.isPlainObject(e)||!$.isPlainObject(t))&&a.overlapRanges(e,t)},t.prototype.flipEnable=function(e){var t=this.item;t.enable=e||(t.enable==-1?1:-1)},t.prototype.deactivate=function(e,t){var a=this,n=a.item.disable.slice(0);return"flip"==t?a.flipEnable():t===!1?(a.flipEnable(1),n=[]):t===!0?(a.flipEnable(-1),n=[]):t.map(function(e){for(var t,r=0;r<n.length;r+=1)if(a.isDateExact(e,n[r])){t=!0;break}t||(i.isInteger(e)||i.isDate(e)||$.isArray(e)||$.isPlainObject(e)&&e.from&&e.to)&&n.push(e)}),n},t.prototype.activate=function(e,t){var a=this,n=a.item.disable,r=n.length;return"flip"==t?a.flipEnable():t===!0?(a.flipEnable(1),n=[]):t===!1?(a.flipEnable(-1),n=[]):t.map(function(e){var t,o,s,l;for(s=0;s<r;s+=1){if(o=n[s],a.isDateExact(o,e)){t=n[s]=null,l=!0;break}if(a.isDateOverlap(o,e)){$.isPlainObject(e)?(e.inverted=!0,t=e):$.isArray(e)?(t=e,t[3]||t.push("inverted")):i.isDate(e)&&(t=[e.getFullYear(),e.getMonth(),e.getDate(),"inverted"]);break}}if(t)for(s=0;s<r;s+=1)if(a.isDateExact(n[s],e)){n[s]=null;break}if(l)for(s=0;s<r;s+=1)if(a.isDateOverlap(n[s],e)){n[s]=null;break}t&&n.push(t)}),n.filter(function(e){return null!=e})},t.prototype.nodes=function(e){var t=this,r=t.settings,o=t.item,s=o.now,l=o.select,d=o.highlight,c=o.view,u=o.disable,h=o.min,y=o.max,m=function(e,t){return r.firstDay&&(e.push(e.shift()),t.push(t.shift())),i.node("thead",i.node("tr",i.group({min:0,max:a-1,i:1,node:"th",item:function(a){return[e[a],r.klass.weekdays,'scope=col title="'+t[a]+'"']}})))}((r.showWeekdaysFull?r.weekdaysFull:r.weekdaysLetter).slice(0),r.weekdaysFull.slice(0)),p=function(e){return i.node("div"," ",r.klass["nav"+(e?"Next":"Prev")]+(e&&c.year>=y.year&&c.month>=y.month||!e&&c.year<=h.year&&c.month<=h.month?" "+r.klass.navDisabled:""),"data-nav="+(e||-1)+" "+i.ariaAttr({role:"button",controls:t.$node[0].id+"_table"})+' title="'+(e?r.labelMonthNext:r.labelMonthPrev)+'"')},f=function(a){var n=r.showMonthsShort?r.monthsShort:r.monthsFull;return"short_months"==a&&(n=r.monthsShort),r.selectMonths&&void 0==a?i.node("select",i.group({min:0,max:11,i:1,node:"option",item:function(e){return[n[e],0,"value="+e+(c.month==e?" selected":"")+(c.year==h.year&&e<h.month||c.year==y.year&&e>y.month?" disabled":"")]}}),r.klass.selectMonth+" browser-default",(e?"":"disabled")+" "+i.ariaAttr({controls:t.$node[0].id+"_table"})+' title="'+r.labelMonthSelect+'"'):"short_months"==a?null!=l?i.node("div",n[l.month]):i.node("div",n[c.month]):i.node("div",n[c.month],r.klass.month)},g=function(a){var n=c.year,o=r.selectYears===!0?5:~~(r.selectYears/2);if(o){var s=h.year,l=y.year,d=n-o,u=n+o;if(s>d&&(u+=s-d,d=s),l<u){var m=d-s,p=u-l;d-=m>p?p:m,u=l}if(r.selectYears&&void 0==a)return i.node("select",i.group({min:d,max:u,i:1,node:"option",item:function(e){return[e,0,"value="+e+(n==e?" selected":"")]}}),r.klass.selectYear+" browser-default",(e?"":"disabled")+" "+i.ariaAttr({controls:t.$node[0].id+"_table"})+' title="'+r.labelYearSelect+'"')}return"raw"==a?i.node("div",n):i.node("div",n,r.klass.year)};return createDayLabel=function(){return null!=l?i.node("div",l.date):i.node("div",s.date)},createWeekdayLabel=function(){var e;e=null!=l?l.day:s.day;var t=r.weekdaysFull[e];return t},i.node("div",i.node("div",createWeekdayLabel(),"picker__weekday-display")+i.node("div",f("short_months"),r.klass.month_display)+i.node("div",createDayLabel(),r.klass.day_display)+i.node("div",g("raw"),r.klass.year_display),r.klass.date_display)+i.node("div",i.node("div",(r.selectYears?f()+g():f()+g())+p()+p(1),r.klass.header)+i.node("table",m+i.node("tbody",i.group({min:0,max:n-1,i:1,node:"tr",item:function(e){var n=r.firstDay&&0===t.create([c.year,c.month,1]).day?-7:0;return[i.group({min:a*e-c.day+n+1,max:function(){return this.min+a-1},i:1,node:"td",item:function(e){e=t.create([c.year,c.month,e+(r.firstDay?1:0)]);var a=l&&l.pick==e.pick,n=d&&d.pick==e.pick,o=u&&t.disabled(e)||e.pick<h.pick||e.pick>y.pick,m=i.trigger(t.formats.toString,t,[r.format,e]);return[i.node("div",e.date,function(t){return t.push(c.month==e.month?r.klass.infocus:r.klass.outfocus),s.pick==e.pick&&t.push(r.klass.now),a&&t.push(r.klass.selected),n&&t.push(r.klass.highlighted),o&&t.push(r.klass.disabled),t.join(" ")}([r.klass.day]),"data-pick="+e.pick+" "+i.ariaAttr({role:"gridcell",label:m,selected:!(!a||t.$node.val()!==m)||null,activedescendant:!!n||null,disabled:!!o||null})),"",i.ariaAttr({role:"presentation"})]}})]}})),r.klass.table,'id="'+t.$node[0].id+'_table" '+i.ariaAttr({role:"grid",controls:t.$node[0].id,readonly:!0})),r.klass.calendar_container)+i.node("div",i.node("button",r.today,"btn-flat picker__today","type=button data-pick="+s.pick+(e&&!t.disabled(s)?"":" disabled")+" "+i.ariaAttr({controls:t.$node[0].id}))+i.node("button",r.clear,"btn-flat picker__clear","type=button data-clear=1"+(e?"":" disabled")+" "+i.ariaAttr({controls:t.$node[0].id}))+i.node("button",r.close,"btn-flat picker__close","type=button data-close=true "+(e?"":" disabled")+" "+i.ariaAttr({controls:t.$node[0].id})),r.klass.footer)},t.defaults=function(e){return{labelMonthNext:"Next month",labelMonthPrev:"Previous month",labelMonthSelect:"Select a month",labelYearSelect:"Select a year",monthsFull:["January","February","March","April","May","June","July","August","September","October","November","December"],monthsShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],weekdaysFull:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],weekdaysShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],weekdaysLetter:["S","M","T","W","T","F","S"],today:"Today",clear:"Clear",close:"Close",format:"d mmmm, yyyy",klass:{table:e+"table",header:e+"header",date_display:e+"date-display",day_display:e+"day-display",month_display:e+"month-display",year_display:e+"year-display",calendar_container:e+"calendar-container",navPrev:e+"nav--prev",navNext:e+"nav--next",navDisabled:e+"nav--disabled",month:e+"month",year:e+"year",selectMonth:e+"select--month",selectYear:e+"select--year",weekdays:e+"weekday",day:e+"day",disabled:e+"day--disabled",selected:e+"day--selected",highlighted:e+"day--highlighted",now:e+"day--today",infocus:e+"day--infocus",outfocus:e+"day--outfocus",footer:e+"footer",buttonClear:e+"button--clear",buttonToday:e+"button--today",buttonClose:e+"button--close"}}}(e.klasses().picker+"__"),e.extend("pickadate",t)});