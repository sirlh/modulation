var ua = navigator.userAgent;
var isWeixin = !!/MicroMessenger/i.test(ua);
if(isWeixin){
        document.getElementById('JweixinTip').style.display='block';
}