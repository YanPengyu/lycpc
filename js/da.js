(function () {
    var da = {
        config : {
            //来访时间
            enterTime : new Date().getTime(),
            //访客来路
            referrer : '',
            //受访页面
            accessUrl : '',
            //访客搜索引擎
            searchEngine : '',
            //访客搜索引擎类型
            searchEngineType : '',
            //访客搜索关键词
            searchKeyWords : '',
            //访客使用的终端类型(0：移动设备，1：非移动设备)
            terminalType : 0,
            //访客使用的品牌机型
            brandModels : '',
            //访客使用的操作系统类型
            os: '',
            //访客使用的屏幕分辨率
            screenResolution : '',
            //访客使用的屏幕颜色数
            screenColors : '',
            //访客使用的浏览器类型
            browser : '',
            //访客使用的浏览器内核
            browserKernel: '',
            //访客使用的浏览器语言
            browserLanguage : '',
            //是否支持Cookie(0:不支持，1:支持)
            isSupportCookie : 0,
            //浏览器插件
            browserPlugins : '',
            //访客是否安装了alexa工具条(0:未安装，1:已安装)
            isInstalledAlexa : 0,
            //访客访问站点时使用的APP
            app: '',
            //crc
            crc: '',
            //accessDeepId
            accessDeepId: '',
            //返回码
            code: -1
        },
        referrer : function() {
            var ref = '';
            if (document.referrer.length > 0) {
                ref = document.referrer;
            }
            try {
                if (ref.length == 0 && opener.location.href.length > 0) {
                    ref = opener.location.href;
                }
            } catch (e) {}
            this.config.referrer = ref;
        },
        accessUrl : function() {
            this.config.accessUrl = window.location.href;
        },
        searchEngine : function() {
            var searchEngineUrls = [
                'http://123.56.97.126/ws_da/da/www.baidu.com',
                'http://123.56.97.126/ws_da/da/www.google.com',
                'http://123.56.97.126/ws_da/da/www.google.cn',
                'http://123.56.97.126/ws_da/da/www.yahoo.com',
                'http://123.56.97.126/ws_da/da/www.yahoo.cn',
                'http://123.56.97.126/ws_da/da/www.bing.com',
                'http://123.56.97.126/ws_da/da/cn.bing.com',
                'http://123.56.97.126/ws_da/da/www.so.com',
                'http://123.56.97.126/ws_da/da/www.sogou.com',
                'http://123.56.97.126/ws_da/da/www.youdao.com',
                'http://123.56.97.126/ws_da/da/www.yiso.me',
                'http://123.56.97.126/ws_da/da/www.iask.com',
                'http://123.56.97.126/ws_da/da/iask.sina.com.cn',
                'http://123.56.97.126/ws_da/da/www.tom.com',
                'http://123.56.97.126/ws_da/da/www.163disk.com',
                'http://123.56.97.126/ws_da/da/so.163disk.com',
                'http://123.56.97.126/ws_da/da/www.chinaso.com',
                'http://123.56.97.126/ws_da/da/www.vnet.cn',
                'http://123.56.97.126/ws_da/da/www.msn.com'
            ];
            var ref = this.config.referrer;
            if (ref.length > 0) {
                for (var i in searchEngineUrls) {
                    if (ref.indexOf(searchEngineUrls[i]) > -1) {
                        this.config.searchEngine = searchEngineUrls[i];
                        this.config.searchEngineType = searchEngineUrls[i].substring(searchEngineUrls[i].indexOf('.') + 1, searchEngineUrls[i].lastIndexOf('.'));
                        break;
                    }
                }
            }
        },
        searchKeyWords : function() {
            var searchEngineType = this.config.searchEngineType;
            if (searchEngineType.length > 0) {
                var referrer = this.config.referrer;
                var grep = null;
                var seed = '';
                var keyword = '';
                switch (searchEngineType) {
                    case 'yiso':
                    case 'baidu':
                        grep = /wd=.*[&]?/i;
                        break;
                    case 'chinaso':
                    case 'msn':
                    case 'so':
                    case 'youdao':
                    case 'bing':
                    case 'google':
                        grep = /q=.*[&]?/i;
                        break;
                    case 'yahoo':
                        grep = /p=.*[&]?/i;
                        break;
                    case 'sogou':
                        grep = /query=.*[&]?/i;
                        break;
                    case 'iask':
                        grep = /searchWord=.*[&]?/i;
                        break;
                    case '163disk':
                        grep = /key=.*[&]?/i;
                        break;
                    default:
                        grep = /q=.*[&]?/i;
                        break;
                }
                seed = referrer.match(grep);
                keyword = seed.toString().split('=')[1].split('&')[0];
                this.config.searchKeyWords = window.decodeURIComponent(keyword);
            }
        },
        terminalType : function() {
            var userAgent = navigator.userAgent;
            var grep = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone/i;
            /*if (userAgent.match(grep)) {
                this.config.terminalType = 0;
            } else {
                this.config.terminalType = 1;
            }*/
            //console.log(userAgent);
            if (userAgent.match(/AppleWebKit.*Mobile.*/) || userAgent.match(/.*Mobile.*/) || userAgent.match(grep)) {
                //console.log(userAgent.match(/AppleWebKit.*Mobile.*/));
                this.config.terminalType = 0;
            } else {
                //console.log('a');
                this.config.terminalType = 1;
            }
        },
        brandModels : function() {
            if (this.config.terminalType == 0) {
                this.config.brandModels = navigator.userAgent;
            }
        },
        /*brandModels : function() {
            if (this.config.terminalType == 0) {
                var userAgent = navigator.userAgent;
                var grep = /\(.*\)/i;
                var seed = userAgent.match(grep);
                seed = seed.toString().substring(1, seed.toString().length - 1);
                var seeds = seed.split(';');
                this.config.brandModels = seeds[4];
            }

        },*/
        os : function() {
            var userAgent = navigator.userAgent;
            var grep = null;
            if (this.config.terminalType == 0) {
                grep = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone|Symbian/i;
            } else {
                grep = /Windows|Linux|Mac|Solaris|X11/i;
            }
            this.config.os = userAgent.match(grep) == null ? '' : userAgent.match(grep)[0] == 'null' ? '' : userAgent.match(grep)[0];
        },
        screenResolution : function() {
            this.config.screenResolution = window.screen.width + '*' + window.screen.height;
        },
        screenColors : function() {
            this.config.screenColors = window.screen.colorDepth;
        },
        /*browser : function() {
            var userAgent = navigator.userAgent;
            if (userAgent.toUpperCase().indexOf('QQBrowser'.toUpperCase()) != -1) {
                this.config.browser = 'QQ';
            } else if (userAgent.toUpperCase().indexOf('micromessenger'.toUpperCase()) != -1) {
                this.config.browser = '微信';
            } else if (userAgent.toUpperCase().indexOf('BIDUBrowser'.toUpperCase()) != -1) {
                this.config.browser = '百度';
            } else if (userAgent.toUpperCase().indexOf('MetaSr'.toUpperCase()) != -1) {
                this.config.browser = '搜狗';
            } else if (window.ActiveXObject || 'ActiveXObject' in window) {
                var grep = /(msie|trident).*?([\d.]+)(.*([:][\d.]+))?/i;
                var m = userAgent.match(grep);
                if (m) {
                    if (m[1].toLowerCase() == 'msie') {
                        this.config.browser = 'IE ' + m[2];
                    } else {
                        this.config.browser = 'IE ' + m[4];
                    }
                }
            } else if (userAgent.toUpperCase().indexOf('Chrome'.toUpperCase()) != -1) {
                if (navigator.webkitPersistentStorage) {
                    var grep = /(chrome).*?([\d.]+)/i;
                    var m = userAgent.match(grep);
                    if (m) {
                        this.config.browser = m[1] + ' ' + m[2].split('.')[0];
                    }
                } else {
                    this.config.browser = '360';
                }
            } else if (userAgent.toUpperCase().indexOf('Firefox'.toUpperCase()) != -1) {
                var grep = /(Firefox).*?([\d.]+)/i;
                var m = userAgent.match(grep);
                if (m) {
                    this.config.browser = m[1] + ' ' + m[2];
                }
            } else if (userAgent.toUpperCase().indexOf('Opera'.toUpperCase()) != -1) {
                var grep = /(Opera).*?([\d.]+)/i;
                var m = userAgent.match(grep);
                if (m) {
                    this.config.browser = m[1] + ' ' + m[2];
                }
            } else if (userAgent.toUpperCase().indexOf('Maxthon'.toUpperCase()) != -1) {
                this.config.browser = '遨游';
            } else if (userAgent.toUpperCase().indexOf('LBBROWSER'.toUpperCase()) != -1) {
                this.config.browser = '猎豹';
            } else if (userAgent.toUpperCase().indexOf('TheWorld'.toUpperCase()) != -1) {
                this.config.browser = '世界之窗';
            } else if (userAgent.toUpperCase().indexOf('UCBrowser'.toUpperCase()) != -1) {
                this.config.browser = 'UC';
            } else if (userAgent.toUpperCase().indexOf('Safari'.toUpperCase()) != -1) {
                var grep = /(Safari).*?([\d.]+)/i;
                var m = userAgent.match(grep);
                if (m) {
                    this.config.browser = m[1] + ' ' + m[2];
                }
            } else {
                this.config.browser = '其它';
            }
        },*/
        browser : function() {
            var userAgent = navigator.userAgent;
            if (userAgent.toUpperCase().indexOf('QQBrowser'.toUpperCase()) != -1) {
                this.config.browser = 'QQ';
            } else if (userAgent.toUpperCase().indexOf('micromessenger'.toUpperCase()) != -1) {
                this.config.browser = '0';
            } else if (userAgent.toUpperCase().indexOf('BIDUBrowser'.toUpperCase()) != -1) {
                this.config.browser = '1';
            } else if (userAgent.toUpperCase().indexOf('MetaSr'.toUpperCase()) != -1) {
                this.config.browser = '2';
            } else if (window.ActiveXObject || 'ActiveXObject' in window) {
                var grep = /(msie|trident).*?([\d.]+)(.*([:][\d.]+))?/i;
                var m = userAgent.match(grep);
                if (m) {
                    if (m[1].toLowerCase() == 'msie') {
                        this.config.browser = 'IE ' + m[2];
                    } else {
                        this.config.browser = 'IE ' + m[4];
                    }
                }
            } else if (userAgent.toUpperCase().indexOf('Chrome'.toUpperCase()) != -1) {
                if (navigator.webkitPersistentStorage) {
                    var grep = /(chrome).*?([\d.]+)/i;
                    var m = userAgent.match(grep);
                    if (m) {
                        this.config.browser = m[1] + ' ' + m[2].split('.')[0];
                    }
                } else {
                    this.config.browser = '360';
                }
            } else if (userAgent.toUpperCase().indexOf('Firefox'.toUpperCase()) != -1) {
                var grep = /(Firefox).*?([\d.]+)/i;
                var m = userAgent.match(grep);
                if (m) {
                    this.config.browser = m[1] + ' ' + m[2];
                }
            } else if (userAgent.toUpperCase().indexOf('Opera'.toUpperCase()) != -1) {
                var grep = /(Opera).*?([\d.]+)/i;
                var m = userAgent.match(grep);
                if (m) {
                    this.config.browser = m[1] + ' ' + m[2];
                }
            } else if (userAgent.toUpperCase().indexOf('Maxthon'.toUpperCase()) != -1) {
                this.config.browser = '3';
            } else if (userAgent.toUpperCase().indexOf('LBBROWSER'.toUpperCase()) != -1) {
                this.config.browser = '4';
            } else if (userAgent.toUpperCase().indexOf('TheWorld'.toUpperCase()) != -1) {
                this.config.browser = '5';
            } else if (userAgent.toUpperCase().indexOf('UCBrowser'.toUpperCase()) != -1) {
                this.config.browser = 'UC';
            } else if (userAgent.toUpperCase().indexOf('Safari'.toUpperCase()) != -1) {
                var grep = /(Safari).*?([\d.]+)/i;
                var m = userAgent.match(grep);
                if (m) {
                    this.config.browser = m[1] + ' ' + m[2];
                }
            }
        },
        browserKernel : function() {
            var userAgent = navigator.userAgent;
            if (userAgent.toUpperCase().indexOf('Trident'.toUpperCase()) > -1) { //IE内核
                this.config.browserKernel = 'Trident';
            } else if (userAgent.toUpperCase().indexOf('Presto'.toUpperCase()) > -1) { //Opera内核
                this.config.browserKernel = 'Presto';
            } else if (userAgent.toUpperCase().indexOf('AppleWebKit'.toUpperCase()) > -1) { //Apple、Chrome内核
                this.config.browserKernel = 'AppleWebKit';
            } else if (userAgent.toUpperCase().indexOf('Gecko'.toUpperCase()) > -1) {
                this.config.browserKernel = 'Gecko'; //Firefox内核
            } else if (userAgent.toUpperCase().indexOf('KHTML'.toUpperCase()) > -1) { //Firefox内核
                this.config.browserKernel = 'KHTML';
            } else if (userAgent.toUpperCase().indexOf('Edge'.toUpperCase()) > - 1) {
                this.config.browserKernel = 'Edge';
            } else if (userAgent.toUpperCase().indexOf('Webkit'.toUpperCase()) > - 1) {
                this.config.browserKernel = 'Webkit';
            } else if (userAgent.toUpperCase().indexOf('Chromium'.toUpperCase()) > - 1) {
                this.config.browserKernel = 'Chromium';
            } else if (userAgent.toUpperCase().indexOf('Presto'.toUpperCase()) > - 1) {
                this.config.browserKernel = 'Presto';
            }
        },
        browserLanguage : function() {
            this.config.browserLanguage = navigator.language || navigator.browserLanguage || navigator.userLanguage || navigator.systemLanguage;
        },
        isSupportCookie : function() {
            this.config.isSupportCookie = (navigator.cookieEnabled == null || navigator.cookieEnabled == 'null' || navigator.cookieEnabled === undefined || navigator.cookieEnabled == false) ? 0 : 1;
        },
        browserPlugins : function() {
            var plugins = navigator.plugins;
            var pluginStack = ['Infopath', 'NET', 'CIBA', 'AlexaBar', 'QQDownload', 'GoogleBar'];
            var pluginList = [];
            if (window.ActiveXObject || 'ActiveXObject' in window) {
                for (var i in pluginStack) {
                    var activeXObjectName = pluginStack[i] + '.' + pluginStack[i];
                    try {
                        var axobj = eval("new ActiveXObject(activeXObjectName);");
                        if (axobj) {
                            if (i == 1) {
                                pluginList.push('.NET');
                            } else if (i == 3) {
                                pluginList.push('Alexa Bar');
                            } else {
                                pluginList.push(pluginStack[i]);
                            }
                        }
                    } catch (e) {
                    }
                }
            } else if (plugins && plugins.length) {
                for (var i in plugins) {
                    for (var j in pluginStack) {
                        if (new String(plugins[i].name).indexOf(pluginStack[j]) > 0 || new String(plugins[i].name).indexOf('Alexa Bar') > 0) {
                            if (j == 1) {
                                pluginList.push('.NET');
                            } else if (j == 3) {
                                pluginList.push('Alexa Bar');
                            } else {
                                pluginList.push(pluginStack[j]);
                            }
                        }
                    }
                }
            }
            this.config.browserPlugins = pluginList.toString();
        },
        isInstalledAlexa : function() {
            //document.write('<script type="text/javascript" src="res://AlxRes.dll/SCRIPT/dsn.class.js"></script>');
            try {
                aborted();
                this.config.isInstalledAlexa = 1;
            } catch (e) {
                if (navigator.userAgent.match(/.*Toolbar.*/i)) {
                    this.config.isInstalledAlexa = 1;
                } else {
                    this.config.isInstalledAlexa = 0;
                }
            }
        },
        /*app : function() {
            if (this.config.terminalType == 0) {
                var userAgent = navigator.userAgent;
                if (userAgent.toUpperCase().indexOf('QQBrowser'.toUpperCase()) != -1) {
                    this.config.app = 'QQ浏览器';
                } else if (userAgent.toUpperCase().indexOf('micromessenger'.toUpperCase()) != -1) {
                    this.config.app = '微信';
                } else if (userAgent.toUpperCase().indexOf('BIDUBrowser'.toUpperCase()) != -1) {
                    this.config.app = '百度浏览器';
                } else if (userAgent.toUpperCase().indexOf('MetaSr'.toUpperCase()) != -1) {
                    this.config.app = '搜狗浏览器';
                } else if (userAgent.toUpperCase().indexOf('Chrome'.toUpperCase()) != -1) {
                    if (navigator.webkitPersistentStorage) {
                        var grep = /(chrome).*?([\d.]+)/i;
                        var m = userAgent.match(grep);
                        if (m) {
                            this.config.app = 'Chrome浏览器';
                        }
                    } else {
                        this.config.app = '360浏览器';
                    }
                } else if (userAgent.toUpperCase().indexOf('Firefox'.toUpperCase()) != -1) {
                    var grep = /(Firefox).*?([\d.]+)/i;
                    var m = userAgent.match(grep);
                    if (m) {
                        this.config.app = '火狐浏览器';
                    }
                } else if (userAgent.toUpperCase().indexOf('Opera'.toUpperCase()) != -1) {
                    var grep = /(Opera).*?([\d.]+)/i;
                    var m = userAgent.match(grep);
                    if (m) {
                        this.config.app = 'Opera浏览器';
                    }
                } else if (userAgent.toUpperCase().indexOf('Maxthon'.toUpperCase()) != -1) {
                    this.config.app = '遨游浏览器';
                } else if (userAgent.toUpperCase().indexOf('LBBROWSER'.toUpperCase()) != -1) {
                    this.config.app = '猎豹浏览器';
                } else if (userAgent.toUpperCase().indexOf('TheWorld'.toUpperCase()) != -1) {
                    this.config.app = '世界之窗浏览器';
                } else if (userAgent.toUpperCase().indexOf('UCBrowser'.toUpperCase()) != -1) {
                    this.config.app = 'UC浏览器';
                } else if (userAgent.toUpperCase().indexOf('Safari'.toUpperCase()) != -1) {
                    var grep = /(Safari).*?([\d.]+)/i;
                    var m = userAgent.match(grep);
                    if (m) {
                        this.config.app = 'Safari浏览器';
                    }
                }
            }
        },*/
        app : function() {
            if (this.config.terminalType == 0) {
                var userAgent = navigator.userAgent;
                if (userAgent.toUpperCase().indexOf('QQBrowser'.toUpperCase()) != -1) {
                    this.config.app = '0';
                } else if (userAgent.toUpperCase().indexOf('micromessenger'.toUpperCase()) != -1) {
                    this.config.app = '1';
                } else if (userAgent.toUpperCase().indexOf('BIDUBrowser'.toUpperCase()) != -1) {
                    this.config.app = '2';
                } else if (userAgent.toUpperCase().indexOf('MetaSr'.toUpperCase()) != -1) {
                    this.config.app = '3';
                } else if (userAgent.toUpperCase().indexOf('Chrome'.toUpperCase()) != -1) {
                    if (navigator.webkitPersistentStorage) {
                        var grep = /(chrome).*?([\d.]+)/i;
                        var m = userAgent.match(grep);
                        if (m) {
                            this.config.app = '4';
                        }
                    } else {
                        this.config.app = '5';
                    }
                } else if (userAgent.toUpperCase().indexOf('Firefox'.toUpperCase()) != -1) {
                    var grep = /(Firefox).*?([\d.]+)/i;
                    var m = userAgent.match(grep);
                    if (m) {
                        this.config.app = '6';
                    }
                } else if (userAgent.toUpperCase().indexOf('Opera'.toUpperCase()) != -1) {
                    var grep = /(Opera).*?([\d.]+)/i;
                    var m = userAgent.match(grep);
                    if (m) {
                        this.config.app = '7';
                    }
                } else if (userAgent.toUpperCase().indexOf('Maxthon'.toUpperCase()) != -1) {
                    this.config.app = '8';
                } else if (userAgent.toUpperCase().indexOf('LBBROWSER'.toUpperCase()) != -1) {
                    this.config.app = '9';
                } else if (userAgent.toUpperCase().indexOf('TheWorld'.toUpperCase()) != -1) {
                    this.config.app = '10';
                } else if (userAgent.toUpperCase().indexOf('UCBrowser'.toUpperCase()) != -1) {
                    this.config.app = '11';
                } else if (userAgent.toUpperCase().indexOf('Safari'.toUpperCase()) != -1) {
                    var grep = /(Safari).*?([\d.]+)/i;
                    var m = userAgent.match(grep);
                    if (m) {
                        this.config.app = '12';
                    }
                }
            }
        },
        crc : function() {
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');
            var txt = 'http://security.tencent.com/';
            ctx.textBaseline = "top";
            ctx.font = "14px 'Arial'";
            ctx.textBaseline = "tencent";
            ctx.fillStyle = "#f60";
            ctx.fillRect(125,1,62,20);
            ctx.fillStyle = "#069";
            ctx.fillText(txt, 2, 15);
            ctx.fillStyle = "rgba(102, 204, 0, 0.7)";
            ctx.fillText(txt, 4, 17);
            var b64 = canvas.toDataURL().replace("data:image/png;base64,","");
            var bin = atob(b64);
            this.config.crc = this.stringToHex(bin.slice(-16,-12));
        },
        accessDeepId : function() {
            var websiteId = urls[0].split('&')[1].split('=')[1];
            var cookieName = 'da_' + websiteId + '_ADID';
            var adid = this.getCookie(cookieName);
            if (adid != null) {
                this.config.accessDeepId = unescape(adid);
            } else {
                this.config.accessDeepId = this.uuid().replace(/-/g, '');
                var expiresTime = new Date();
                expiresTime.setMinutes(expiresTime.getMinutes() + 30);
                //this.setCookie(cookieName, escape(this.config.accessDeepId), expiresTime, "/");
                document.cookie = cookieName + '=' + escape(this.config.accessDeepId) + ';path=/';
            }

        },
        setCookie : function(name, value, expiresDate, path) {
            document.cookie = name + '=' + value + ';expires=' + expiresDate + ';path=' + path;
        },
        getCookie : function(name) {
            var cookies = document.cookie.split(';');
            if (cookies != null && cookies.length > 0) {
                for (var i = 0; i < cookies.length; i++) {
                    var entry = cookies[i].split('=');
                    if (entry[0].replace(/\s*/g, '') == name) {
                        return entry[1];
                    }
                }
            }
            return null;
        },
        removeCookie : function(name) {
            this.setCookie(name, 1, -1);
        },
        stringToHex : function(str) {
            var val = '';
            for (var i = 0; i < str.length; i++) {
                val += str.charCodeAt(i).toString(16);
            }
            return val;
        },
        uuid : function() {
            var s = [];
            var hexDigits = "0123456789abcdef";
            for (var i = 0; i < 36; i++) {
                s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
            }
            s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
            s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
            s[8] = s[13] = s[18] = s[23] = "-";

            var uuid = s.join("");
            return uuid;
        },
        EncodeUtf8 : function(s1) {
            var s = escape(s1);
            var sa = s.split("%");
            var retV ="";
            if(sa[0] != "") {
                retV = sa[0];
            }
            for(var i = 1; i < sa.length; i ++) {
                if(sa[i].substring(0,1) == "u") {
                    retV += this.Hex2Utf8(this.Str2Hex(sa[i].substring(1,5)));

                }
                else retV += "%" + sa[i];
            }

            return retV;
        },
        Str2Hex : function(s) {
            var c = "";
            var n;
            var ss = "0123456789ABCDEF";
            var digS = "";
            for(var i = 0; i < s.length; i ++) {
                c = s.charAt(i);
                n = ss.indexOf(c);
                //digS += this.Dec2Dig(eval_r(n));
                digS += this.Dec2Dig(eval(n));

            }
            //return value;
            return digS;
        },
        Dec2Dig : function(n1) {
            var s = "";
            var n2 = 0;
            for(var i = 0; i < 4; i++) {
                n2 = Math.pow(2,3 - i);
                if(n1 >= n2)
                {
                    s += '1';
                    n1 = n1 - n2;
                }
                else
                    s += '0';

            }
            return s;

        },
        Dig2Dec : function(s) {
            var retV = 0;
            if(s.length == 4) {
                for(var i = 0; i < 4; i ++) {
                    //retV += eval_r(s.charAt(i)) * Math.pow(2, 3 - i);
                    retV += eval(s.charAt(i)) * Math.pow(2, 3 - i);
                }
                return retV;
            }
            return -1;
        },
        Hex2Utf8 : function(s) {
            var retS = "";
            var tempS = "";
            var ss = "";
            if(s.length == 16) {
                tempS = "1110" + s.substring(0, 4);
                tempS += "10" +  s.substring(4, 10);
                tempS += "10" + s.substring(10,16);
                var sss = "0123456789ABCDEF";
                for(var i = 0; i < 3; i ++) {
                    retS += "%";
                    ss = tempS.substring(i * 8, (eval_r(i)+1)*8);



                    retS += sss.charAt(this.Dig2Dec(ss.substring(0,4)));
                    retS += sss.charAt(this.Dig2Dec(ss.substring(4,8)));
                }
                return retS;
            }
            return "";
        },
        charset : function() {
            //var charset = document.charset || document.characterSet;
            //if (charset != null && charset != 'null' && charset.toUpperCase() != 'UTF-8') {
                this.config.browser = this.EncodeUtf8(this.config.browser);
                this.config.browserKernel = this.EncodeUtf8(this.config.browserKernel);
                this.config.app = this.EncodeUtf8(this.config.app);
            //}
        },
        init : function() {
            this.referrer();
            this.accessUrl();
            this.searchEngine();
            this.searchKeyWords();
            this.terminalType();
            this.brandModels();
            this.os();
            this.screenResolution();
            this.screenColors();
            this.browser();
            this.browserKernel();
            this.browserLanguage();
            this.isSupportCookie();
            this.browserPlugins();
            this.isInstalledAlexa();
            this.app();
            this.crc();
            this.accessDeepId();
        },
        xhr : (function() {
            var
                ajax = (function() {
                    return ('XMLHttpRequest' in window) ? function() {
                        return new XMLHttpRequest();
                    } : function() {
                        return new ActiveXObject("Microsoft.XMLHTTP");
                    }
                }()),
                formatData = function(fd) {
                    var res = '';
                    for(var f in fd) {
                        res += f+'='+fd[f]+'&';
                    }
                    return res.slice(0,-1);
                },
                AJAX = function(ops) {
                    var root = this, req = ajax();
                    root.url = ops.url;
                    root.type = ops.type || 'responseText';
                    root.method = ops.method || 'GET';
                    root.async = ops.async || true;
                    root.data = ops.data || {};
                    root.complete = ops.complete || function  () {};
                    root.success = ops.success || function(){};
                    root.error =  ops.error || function (s) { /*alert(root.url+'->status:'+s+'error!')*/};
                    root.abort = req.abort;
                    root.setData = function (data) {
                        for(var d in data) {
                            root.data[d] = data[d];
                        }
                    };
                    root.send = function() {
                        var datastring = formatData(root.data),
                            sendstring,get = false,
                            async = root.async,
                            complete = root.complete,
                            method = root.method,
                            type=root.type;
                        if(method === 'GET') {
                            root.url+='?'+datastring;
                            get = true;
                        }
                        req.open(method,root.url,async);
                        if(!get) {
                            req.setRequestHeader("Content-type","application/x-www-form-urlencoded");
                            sendstring = datastring;
                        }
                        //在send之前重置onreadystatechange方法,否则会出现新的同步请求会执行两次成功回调(chrome等在同步请求时也会执行onreadystatechange)
                        req.onreadystatechange = async ? function  () {
                            // console.log('async true');
                            if (req.readyState ==4){
                                complete();
                                if(req.status == 200) {
                                    root.success(req[type]);
                                } else {
                                    root.error(req.status);
                                }
                            }
                        } : null;
                        req.send(sendstring);
                        if(!async) {
                            //console.log('async false');
                            complete();
                            root.success(req[type]);
                        }
                    };
                    root.url && root.send();
                };
            return function(ops) {return new AJAX(ops);}
        }()),
        params : function() {
            this.init();
            this.charset();
            return {
                referrer : this.config.referrer,
                accessUrl : this.config.accessUrl,
                searchEngine : this.config.searchEngine,
                searchEngineType : this.config.searchEngineType,
                searchKeyWords : this.config.searchKeyWords,
                terminalType : this.config.terminalType,
                brandModels : this.config.brandModels,
                os : this.config.os,
                screenResolution : this.config.screenResolution,
                screenColors : this.config.screenColors,
                browser : this.config.browser,
                browserKernel : this.config.browserKernel,
                browserLanguage : this.config.browserLanguage,
                isSupportCookie : this.config.isSupportCookie,
                browserPlugins : this.config.browserPlugins,
                isInstalledAlexa : this.config.isInstalledAlexa,
                app : this.config.app,
                crc : this.config.crc,
                accessDeepId : this.config.accessDeepId
            };
        },
        upData : function(url) {
            this.xhr({
                url: url,
                data: this.params(),
                async : true,
                method: 'POST',
                success: function(data) {
                    var ret = eval('(' + data + ')');
                    if (ret != null && ret.code != -1) {
                        da.config.code = ret.code;
                        var websiteId = urls[0].split('&')[1].split('=')[1];
                        var referrerInfo = da.getCookie('da_' + websiteId);
                        if (referrerInfo != null) {
                            var info = unescape(referrerInfo);
                            var infos = info.split('&-&-&');
                            var websiteDataId = infos[0];
                            var accessUrl = infos[1];
                            var enterTime = infos[2];
                            if (accessUrl == da.config.referrer) {
                                var onlineTime = parseInt((new Number(da.config.enterTime) - new Number(enterTime)) / 1000);
                                da.updOnlineTime2(urls[1], onlineTime, websiteDataId);
                            }
                        }
                        if (da.config.code != -1) {
                            var saveValue = escape(da.config.code + '&-&-&' + da.config.accessUrl + '&-&-&' + da.config.enterTime);
                            var expiresTime = new Date();
                            expiresTime.setHours(expiresTime.getHours() + 1);
                            //da.setCookie('da_' + websiteId, saveValue, expiresTime, '/');
                            document.cookie = 'da_' + websiteId + '=' + saveValue + ';path=/';
                        }
                    }
                }
            });
        },
        updOnlineTime : function(url) {
            this.xhr({
                url: url,
                data: {time: 1, code: this.config.code},
                async: true,
                method: 'POST',
                success: function(data) {
                }
            });
        },
        updOnlineTime2 : function(url, time, code) {
            this.xhr({
                url: url,
                data: {time: time, code: code},
                async: true,
                method: 'POST',
                success: function(data) {
                }
            });
        }
    };
    da.upData(urls[0]);
    /*window.setInterval(function() {
        if (da.config.code != -1) {
            da.updOnlineTime(urls[1]);
        }
    }, 1000);*/
}());