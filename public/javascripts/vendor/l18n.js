(function(){"use strict";function t(e,t,n,r,i,s){t[e]&&(n.push(e),(t[e]===!0||t[e]===1)&&r.push(i+e+"/"+s))}function n(e,t,n,r,i){var s=r+t+"/"+i;require._fileExists(e.toUrl(s))&&n.push(s)}function r(e,t,n){var i;for(i in t)t.hasOwnProperty(i)&&(!e.hasOwnProperty(i)||n)?e[i]=t[i]:typeof t[i]=="object"&&r(e[i],t[i],n)}var e=/(^.*(^|\/)nls(\/|$))([^\/]*)\/?([^\/]*)/;define(["module"],function(i){var s=i.config();return{version:"2.0.1",load:function(i,o,u,a){a=a||{},a.locale&&(s.locale=a.locale);var f,l=e.exec(i),c=l[1],h=l[4],p=l[5],d=h.split("-"),v=[],m={},g,y,b="";l[5]?(c=l[1],f=c+p):(f=i,p=l[4],h=s.locale,h||(h=s.locale=typeof navigator=="undefined"?"root":(navigator.language||navigator.userLanguage||"root").toLowerCase()),d=h.split("-"));if(a.isBuild){v.push(f),n(o,"root",v,c,p);for(g=0;g<d.length;g++)y=d[g],b+=(b?"-":"")+y,n(o,b,v,c,p);o(v,function(){u()})}else o([f],function(e){var n=[],i;t("root",e,n,v,c,p);for(g=0;g<d.length;g++)i=d[g],b+=(b?"-":"")+i,t(b,e,n,v,c,p);o(v,function(){var t,i,s;for(t=n.length-1;t>-1&&n[t];t--){s=n[t],i=e[s];if(i===!0||i===1)i=o(c+s+"/"+p);r(m,i)}u(m)})})}}})})()