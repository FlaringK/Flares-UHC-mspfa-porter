const importRegex = /@import url\(["']?(.+?)["']?\);/g
const imgTagRegex = /\[img\]([^"]*?)\[\/img\]/gi
const altImgTagRegex = /\[img=(\d*?)x(\d*?)\]([^"]*?)\[\/img\]/gi
const cssImgUrlRegex = /url\(["']?((.+?)\.(a?png|jpe?g|pjp|pjpeg|bmp|gif|ico|cur|svg|tiff?|webp))["']?\)/gi
const modFileText = `
const mspfaHtml = '<div class="mspfa"><body cz-shortcut-listen="true" class="p__pageNumber__"><div id="main"><header><div class="umcontainer"><a href="/"><div class="mspfalogo"></div></a></div><nav><a href="/" style="color:#fff">Homestuck Collection</a> <div class="heart"></div> <a href="/help" style="color:#76d8ff">Help</a> <div class="heart"></div> <a href="/__loglink__" style="color:#2cff4b">Log</a> <div class="heart"></div> <a href="/news" style="color:#fffa36">News</a> <span class="vbar">|</span> <a href="/music" style="color:#fffa36">music</a> <div class="heart"></div> <a href="/evenmore" style="color:#ffbc3e">More</a> <span class="vbar">|</span> <a href="/settings" style="color:#ffbc3e">Settings</a> <span class="vbar">|</span> <a href="/credits" style="color:#ffbc3e">Credits</a></nav></header><div id="container"><div id="slide"><div id="command"><span>__command__</span></div><div id="content"><span><br>__content__</span></div><div id="foot"><div id="links">__links__</div><br><br><span id="prevlinks" style=""><span class="footlinks"><a id="startover" href="__startover__">Start Over</a><span style=""> | <a id="goback" href="__goback__">Go Back</a></span></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><br><br></div></div><div id="info"><span id="infobox"><details class="spoiler"><summary><span>Show Adventure Info</span><span>Hide Adventure Info</span></summary><div><table><tbody><tr><td style="width:158px"><img id="storyicon" src="__icon__" style="margin-right:6px" width="150" height="150"></td><td style="max-width:413px;width:413px"><span class="major" style="font-size:22px">__title__</span><br>Author:<a href="__authorsite__">__author__</a><br>Mirrored by:<span><a href="__mspfasite__">__mirror__</a></span><br>Tags: __tags__<br></td><td id="latestpages" rowspan="2" style="max-width:253px;width:253px;font-size:10px;font-weight:700"><span><details class="spoiler"><summary><span>Show Latest Pages</span><span>Hide Latest Pages</span></summary>Latest Pages: __latepages__</details></span><br><br><div style="text-align:center"><a href="__loglink__" style="font-size:14px">VIEW ALL PAGES</a></div></td></tr><tr><td colspan="2" style="max-width:575px;width:575px;height:8px"><span>__adventureinfo__</span></td></tr></tbody></table></div></details></span></div></div><footer><div class="umcontainer"><div class="mspfalogo"></div></div><div id="details" style="padding-top:6px">© MS Paint Fan Adventures 2010-2023 MSPFAPorter Made by FlaringK</div></footer></div></body></div>'

const adventureObject = %ADVENTURE_OBJECT%

let formatPageRanges = cssString => {
  let pageRangeUses = cssString.match(/\\.p(\\d+)-(?:(\\d+))((.|\\n)*?\\})/g)
  
  if (pageRangeUses) {
    pageRangeUses.forEach(rangeCss => {
      let regexGroups = rangeCss.match(/\\.p(\\d+)-(?:(\\d+))((.|\\n)*?\\})/)
    
      let startPage = regexGroups[1]
      let endPage = regexGroups[2]
      let cssContent = regexGroups[3]
      
      for (let i = startPage; i <= endPage; i++) {
        cssString += "\\n.p" + i + cssContent
      }
    })
  }
  
  return cssString
}

String.prototype.replaceAll = function(search, replacement) {
  let target = this;
  return target.replace(new RegExp(search, 'g'), replacement);
};

// BBcode code
const BBcode = [
  [/  /g, "&nbsp;&nbsp;"],
  [/\\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;"],
  [/\\r?\\n/g, "<br>"],
  [/\\[b\\]((?:(?!\\[b\\]).)*?)\\[\\/b\\]/gi, "<span style=\\"font-weight: bolder;\\">$1</span>"],
  [/\\[i\\]((?:(?!\\[i\\]).)*?)\\[\\/i\\]/gi, "<span style=\\"font-style: italic;\\">$1</span>"],
  [/\\[u\\]((?:(?!\\[u\\]).)*?)\\[\\/u\\]/gi, "<span style=\\"text-decoration: underline;\\">$1</span>"],
  [/\\[s\\]((?:(?!\\[s\\]).)*?)\\[\\/s\\]/gi, "<span style=\\"text-decoration: line-through;\\">$1</span>"],
  [/\\[size=(\\d*?)\\]((?:(?!\\[size=(?:\\d*?)\\]).)*?)\\[\\/size\\]/gi, "<span style=\\"font-size: $1px;\\">$2</span>"],
  [/\\[color=("?)#?([a-f0-9]{3}(?:[a-f0-9]{3})?)\\1\\]((?:(?!\\[color(?:=[^;]*?)\\]).)*?)\\[\\/color\\]/gi, "<span style=\\"color: #$2;\\">$3</span>"],
  [/\\[color=("?)([^";]+?)\\1\\]((?:(?!\\[color(?:=[^;]*?)\\]).)*?)\\[\\/color\\]/gi, "<span style=\\"color: $2;\\">$3</span>"],
  [/\\[background=("?)#?([a-f0-9]{3}(?:[a-f0-9]{3})?)\\1\\]((?:(?!\\[background(?:=[^;]*?)\\]).)*?)\\[\\/background\\]/gi, "<span style=\\"background-color: #$2;\\">$3</span>"],
  [/\\[background=("?)([^";]+?)\\1\\]((?:(?!\\[background(?:=[^;]*?)\\]).)*?)\\[\\/background\\]/gi, "<span style=\\"background-color: $2;\\">$3</span>"],
  [/\\[font=("?)([^";]*?)\\1\\]((?:(?!\\[size(?:=[^;]*?)\\]).)*?)\\[\\/font\\]/gi, "<span style=\\"font-family: $2;\\">$3</span>"],
  [/\\[(center|left|right|justify)\\]((?:(?!\\[\\1\\]).)*?)\\[\\/\\1\\]/gi, "<div style=\\"text-align: $1;\\">$2</div>"],
  [/\\[url\\]([^"]*?)\\[\\/url\\]/gi, "<a href=\\"$1\\">$1</a>"],
  [/\\[url=("?)([^"]*?)\\1\\]((?:(?!\\[url(?:=.*?)\\]).)*?)\\[\\/url\\]/gi, "<a href=\\"$2\\">$3</a>"],
  [/\\[alt=("?)([^"]*?)\\1\\]((?:(?!\\[alt(?:=.*?)\\]).)*?)\\[\\/alt\\]/gi, "<span title=\\"$2\\">$3</span>"],

  // SPOILER BUTTONS (Edited from MSPFA)
  [/\\[spoiler\\]((?:(?!\\[spoiler(?: .*?)?\\]).)*?)\\[\\/spoiler\\]/gi, '<details class="spoiler"><summary><span>Show Pesterlog</span><span>Hide Pesterlog</span></summary>$1</details>'],
  [/\\[spoiler open=("?)([^"]*?)\\1 close=("?)([^"]*?)\\3\\]((?:(?!\\[spoiler(?: .*?)?\\]).)*?)\\[\\/spoiler\\]/gi, '<details class="spoiler"><summary><span>$2</span><span>$4</span></summary>$5</details>'],
  [/\\[spoiler close=("?)([^"]*?)\\1 open=("?)([^"]*?)\\3\\]((?:(?!\\[spoiler(?: .*?)?\\]).)*?)\\[\\/spoiler\\]/gi, '<details class="spoiler"><summary><span>$4</span><span>$2</span></summary>$5</details>'],

  // Clean up spoilers 
  [/<\\/summary>(<br>)+/gi, "</summary>"],

  [/<\\/label><div>(<br>)+/gi, "</label><div>"],
  [/\\[flash=(\\d*?)x(\\d*?)\\](.*?)\\[\\/flash\\]/gi, "<object type=\\"application/x-shockwave-flash\\" data=\\"$3\\" width=\\"$1\\" height=\\"$2\\"></object>"],
  [/\\[user\\](.+?)\\[\\/user\\]/gi, "<a class=\\"usertag\\" href=\\"/user/?u=$1\\" data-userid=\\"$1\\">@...</a>"],
  [/\\[img\\]([^"]*?)\\[\\/img\\]/gi, "<img class=\\"major\\" src=\\"$1\\">"],
  [/\\[img=(\\d*?)x(\\d*?)\\]([^"]*?)\\[\\/img\\]/gi, "<img class=\\"major\\" src=\\"$3\\" width=\\"$1\\" height=\\"$2\\">"]
]

let processBBcode = (plainHtml) => {
  BBcode.forEach(e => { plainHtml = plainHtml.replace(e[0], e[1]) })
  return plainHtml
}

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

// == Actual mod ==
module.exports = {
  title: "MSPFA: " + adventureObject.n, 
  author: \`<a href='https://mspfa.com/user/?u=$\{adventureObject.c}'>$\{adventureObject.a}</a> Porter by: <a href='https://flaringk.github.io'>FlaringK</a>\`,
  modVersion: 0.2,

  summary: \`A port of the MS Paint Fan Adventure "$\{adventureObject.n}"\`,
  description: \`A port of the MS Paint Fan Adventure "$\{adventureObject.n}". Port Generator created by FlaringK\`,

  trees: {
    './assets/': 'assets://images/'
  },

  edit: true,

  computed(api) {
    // Load Json
    const adventureData = adventureObject
    api.logger.info(adventureData)

    // Create browsepages object
    const adventureUrl = adventureData.n.toLowerCase().replace(/[^a-z0-9]/g,'') + "-"
    api.logger.info(adventureUrl)

    let adventurePages = {}

    // Create base format with standard aventure info
    let baseHtml = mspfaHtml

    baseHtml = baseHtml.replaceAll("__title__", adventureData.n.toUpperCase())
    baseHtml = baseHtml.replaceAll("__icon__", adventureData.o)
    baseHtml = baseHtml.replaceAll("__authorsite__", adventureData.w)
    baseHtml = baseHtml.replaceAll("__author__", adventureData.a)
    baseHtml = baseHtml.replaceAll("__mspfasite__", "https://mspfa.com/user/?u=" + adventureData.c)
    baseHtml = baseHtml.replaceAll("__mirror__", adventureData.a)
    baseHtml = baseHtml.replaceAll("__adventureinfo__", processBBcode(adventureData.r))
    baseHtml = baseHtml.replaceAll("__loglink__", adventureUrl + "log")

    // Set tags
    baseHtml = baseHtml.replaceAll("__tags__", adventureData.t.join(","))

    // Set lates pages
    let latePageHtml = ""
    for (let j = 0; j < Math.min(30, adventureData.p.length); j++) {
      let latePageIndex = adventureData.p.length - j
      let latePageData = adventureData.p[latePageIndex - 1]
      let latePageDate = new Date(latePageData.d)
      let latePageDateSrting = months[latePageDate.getMonth()] + " " + latePageDate.getDate() + " " + latePageDate.getFullYear()
      latePageHtml += \`<br /><span> $\{latePageDateSrting} - <a href="/$\{adventureUrl + latePageIndex}">"<span>$\{latePageData.c}</span>"</a> </span>\`
    }
    baseHtml = baseHtml.replaceAll("__latepages__", latePageHtml)

    // Create Adventure pages
    for (let i = 0; i < adventureData.p.length; i++) {
      // CREATE ADVENTURE PAGE
      const pageData = adventureData.p[i]
      const p = i+1
      let pageHtml = baseHtml

      // Set page number
      pageHtml = pageHtml.replaceAll("__pageNumber__", p)

      // Set page content
      pageHtml = pageHtml.replaceAll("__command__", processBBcode(pageData.c))
      pageHtml = pageHtml.replaceAll("__content__", processBBcode(pageData.b))

      // Set adventure links
      let linkHtml = ""
      let nextPageArrowIndex
      pageData.n.forEach(nextPageIndex => {
        nextPageArrowIndex = nextPageArrowIndex ? nextPageIndex : nextPageArrowIndex
        if (adventureData.p[nextPageIndex - 1]) {
          linkHtml += \`<div><a href="/$\{adventureUrl + nextPageIndex}"><span>$\{processBBcode(adventureData.p[nextPageIndex - 1].c)}</span></a></div>\`
        }
      })
      pageHtml = pageHtml.replaceAll("__links__", linkHtml)

      // Set Go back link (Straight from mspfa.js)
      let backid = 0
      for(let j = p-1; j >= 0; j--) {
        if(adventureData.p[j].n.indexOf(p) != -1) {
          backid = j+1;
        }
      }
      if(!backid) {
        for(let j = p+1; j < adventureData.p.length; j++) {
          if(adventureData.p[j].n.indexOf(p) != -1) backid = j+1;
        }
      }
      pageHtml = pageHtml.replaceAll("__goback__", backid ? adventureUrl + backid : \`" style="display: none\`)

      // Set start over link & hide prev on first page __prevstyle__
      pageHtml = pageHtml.replaceAll("__startover__", adventureUrl + 1)
      if (p == 1) pageHtml = pageHtml.replaceAll("__prevstyle__", "display: none")

      adventurePages[adventureUrl.toUpperCase() + (i + 1)] = {
        component: {
          title: () => adventureData.n,
          next: () => "/" + adventureUrl + nextPageArrowIndex,
          template: pageHtml
        },
        scss: ""
      }

    }

    // == Create log page ==
    let logHtml = baseHtml

    // Set lates pages
    let logListHtml = ""
    for (let j = 0; j < adventureData.p.length; j++) {
      let logPageIndex = adventureData.p.length - j
      let logPageData = adventureData.p[logPageIndex - 1]
      let logPageDate = new Date(logPageData.d)
      let logPageDateSrting = months[logPageDate.getMonth()] + " " + logPageDate.getDate() + " " + logPageDate.getFullYear()
      logListHtml += \`<br /><span> $\{logPageDateSrting} - <a href="/$\{adventureUrl + logPageIndex}">"<span>$\{logPageData.c}</span>"</a> </span>\`
    }

    logHtml = logHtml.replaceAll("__command__", processBBcode("ADVENTURE LOG"))
    logHtml = logHtml.replaceAll("__content__", \`<div style="text-align: left;">$\{logListHtml}</div>\`)
    logHtml = logHtml.replaceAll(\`<div id="foot"><div id="links">__links__</div><br><br><span id="prevlinks" style=""><span class="footlinks"><a id="startover" href="__startover__">Start Over</a><span style=""> | <a id="goback" href="__goback__">Go Back</a></span></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><br><br></div>\`, "")

    adventurePages[adventureUrl.toUpperCase() + "LOG"] = {
      component: {
        title: () => adventureData.n,
        next: () => "/" + adventureUrl,
        template: logHtml
      },
      scss: ""
    }

    // Format CSS
    let adventureCSS = adventureData.y
    adventureCSS = formatPageRanges(adventureCSS) // Apply page ranges
    adventureCSS = adventureCSS.replace(/@import.+;/g, "") // remove imports and custom JS
    adventureCSS = ".mspfa " + adventureCSS.replace(/{({(.|\\n)*?}|.|\\n)*?}/g, "$& .mspfa ") + "{}" // Format everything under .mspfa
    adventureCSS = adventureCSS.replace(/\\.mspfa[^{}]*?@/g, "@") // Fix formatting with @keyframes

    api.logger.info(adventureCSS)

    // Set Mod title and description
    return {

      styles: [
        { body: '.mspfa details.spoiler{border:1px dashed gray;padding:2px 35px;text-align:left;list-style:none}.mspfa #infobox details.spoiler[open=""]{background:#eee}.mspfa details.spoiler[open=""]{padding:2px 5% 12px}.mspfa details.spoiler[open=""]>summary{margin-bottom:12px}.mspfa details.spoiler>summary{list-style:none;text-align:center;color:transparent}.mspfa details.spoiler[open=""]>summary span:first-of-type{display:none}.mspfa details.spoiler:not([open=""])>summary span:last-of-type{display:none}.mspfa details.spoiler summary span{display:inline-block;font:400 13.3333px Arial;background-color:#e9e9ed;border:1px solid #8f8f9d;padding:2px 6px 1px;border-radius:4px;color:#000}.mspfa details.spoiler>summary span:hover{background-color:#d0d0d7}.mspfa details.spoiler>summary span:active{background-color:#b1b1b9}.mspfa div.spoiler{border:1px dashed gray;padding:1px}.mspfa div.spoiler>div{margin:12px 5%;padding:3px;text-align:left}.mspfa body{margin:0;font-family:courier new,Courier,monospace;font-size:12px;background-color:#535353;color:#000;z-index:1}.mspfa #main{width:940px;margin:0 auto;padding:0 5px 5px;background-color:#c6c6c6}.mspfa nav{font-family:arial;font-weight:700;font-size:x-small;text-align:center;height:15px;padding:2px;text-transform:uppercase;background-color:#000;color:#fff}.mspfa nav *{vertical-align:middle}.mspfa nav .heart{display:inline-block;width:16px;height:16px;margin:0 6px;padding:0!important;background-image:url(assets://images/candycorn_mspfa.png);background-repeat:no-repeat;background-position:center}.mspfa #notification{position:relative;top:8px;display:inline-block;padding:2px;margin:-2px;border-radius:8px;text-decoration:none;border:2px solid #eee;background-color:#e00;color:#eee;z-index:1}.mspfa .alert{font-family:arial;margin-top:4px;padding:8px;font-size:14px;background-color:#ff9800;color:#fff;text-shadow:0 1px 3px #000}.mspfa .alert a:link,.mspfa .alert a:active,.mspfa .alert a:visited{color:#fff}.mspfa #flashytitle{height:68px;background-image:url(/images/title/random.njs);background-repeat:no-repeat;background-position:center 0;background-color:#eee}.mspfa .banner img{display:block;width:940px;height:90px}.mspfa #dialog{position:fixed;min-width:280px;max-width:880px;top:50%;left:50%;transform:translate(-50%,-50%);-webkit-transform:translate(-50%,-50%);z-index:1;font-family:courier new,Courier,monospace;font-size:16px;border:1px solid #a9a9a9;background-color:#eee}.mspfa #dialog>div:nth-child(1){padding:8px;background-color:#ddd}.mspfa #dialog>div:nth-child(2){padding:12px}.mspfa #dialog>div:nth-child(3){padding:8px;text-align:right}.mspfa #loading{position:fixed;left:0;top:0;width:100%;height:100%;opacity:0;background-repeat:no-repeat;background-position:right 8px bottom 8px;background-image:url(/images/loading.gif);pointer-events:none;transition:opacity .25s linear}.mspfa #loading.active{opacity:.5}.mspfa iframe{border:none}.mspfa #content img.major,.mspfa #content video.major,.mspfa #content iframe.major,.mspfa #content canvas.major,.mspfa #content object.major,.mspfa #content ruffle-object.major{margin:0 -25px}.mspfa .umcontainer{height:102px}.mspfa .um{float:right;width:728px;height:100%}.mspfa #um3container{position:fixed;width:160px;height:612px;opacity:.5;transform:translateX(980px);transition:opacity .08s ease-out}.mspfa #um3container:hover{opacity:1}.mspfa #um3{width:inherit;height:inherit}.mspfa #um4container{padding-top:8px}.mspfa #um4{width:650px;height:402px}.mspfa .optOut{font-size:12px;opacity:.5}.mspfa .g-signin2>div{margin:0 auto}.mspfa .abcRioButtonContents{font-family:Homestuck-Regular,courier new,Courier,monospace!important;font-size:15px!important}.mspfa .abcRioButton{width:200px!important;box-shadow:2px 2px #a1a1a1!important;border:1px solid #cdcdcd}.mspfa .abcRioButton:hover{box-shadow:none!important}.mspfa .mspfalogo{width:208px;height:102px;float:left;background-repeat:no-repeat;background-position:center;border-right:4px solid #b8b8b8;background-color:#eee}.mspfa header .mspfalogo{background-image:url(assets://images/mspalogo_mspa.png)}.mspfa footer .mspfalogo{background-image:url(assets://images/mspalogo_mspa.png)}.mspfa table,.mspfa #dialog{word-break:break-word;word-wrap:break-word}.mspfa table.container{border-collapse:collapse;margin:0 -5px;text-align:center;width:950px;border:5px solid #c6c6c6;background-color:#eee}.mspfa table.container>tbody>tr{height:0}.mspfa table.container>tbody>tr>td,.mspfa table.container>tbody>tr>th{padding:4px;vertical-align:top;height:0;border:5px solid #c6c6c6}.mspfa table.container.alt{width:870px;margin:0 35px;font-size:16px}.mspfa table.container.alt>tbody>tr>td{border-width:20px}.mspfa table.container.alt a[href],.mspfa #dialog a[href],.mspfa .username,.mspfa .usertag{font-weight:700;text-decoration:none;color:#5caedf}.mspfa table.container.alt2{width:834px;margin:18px 53px;font-size:16px}.mspfa table.container.alt2>tbody>tr>td,.mspfa table.container.alt2>tbody>tr>th{border-width:2px}.mspfa table.container.alt2>tbody>tr>th{font-weight:700}.mspfa table.container.alt2>tbody>tr>td{padding:10px}.mspfa table.container.alt2 img{max-width:100%}.mspfa table.container.alt3 table{text-align:left;width:90%;margin:0 auto}.mspfa table.container.alt3 table>tbody>tr>td{padding:10px}.mspfa .major:not(h1,h2,h3,h4,h5,h6){font-size:16px}.mspfa .major{font-family:Homestuck-Regular,courier new,Courier,monospace;letter-spacing:2px;color:#aaa;text-shadow:0 2px #777}.mspfa tr.unlit{opacity:.5}.mspfa tr.lit .major{color:#00d747;text-shadow:0 2px #009500}.mspfa h1.major,.mspfa h2.major,.mspfa h3.major,.mspfa h4.major,.mspfa h5.major,.mspfa h6.major{margin:8px 0;color:#ccc;text-shadow:0 2px #888;text-transform:uppercase;letter-spacing:2px}.mspfa h1.major.alt,.mspfa h2.major.alt,.mspfa h3.major.alt,.mspfa h4.major.alt,.mspfa h5.major.alt,.mspfa h6.major.alt{letter-spacing:10px}.mspfa .major.alt{color:#cdcdcd;text-shadow:0 2px #a1a1a1}.mspfa a.major{text-decoration:none}.mspfa a.major[href]{color:#5caedf;text-shadow:0 2px #2a6b7d}.mspfa a.major.alt[href]{color:#8297f8!important}.mspfa button{line-height:1.5}.mspfa button,.mspfa input.major[type=button],.mspfa input.major[type=submit],.mspfa input.major[type=reset]{padding:8px 12px;outline:none;border-width:2px;border-style:solid;border-radius:0;border-color:#ddd #898989 #898989 #ddd;background-color:#eee}.mspfa button:focus,.mspfa input.major[type=button]:focus,.mspfa input.major[type=submit]:focus,.mspfa input.major[type=reset]:focus{outline:1px solid #a5a5ff}.mspfa button:enabled:active,.mspfa input.major[type=button]:enabled:active,.mspfa input.major[type=submit]:enabled:active,.mspfa input.major[type=reset]:enabled:active{border-color:#898989 #ddd #ddd #898989}.mspfa button,.mspfa input.major[type=button],.mspfa input.major[type=submit],.mspfa input.major[type=reset]{background-color:#eee}.mspfa button:disabled,.mspfa input.major[type=button]:disabled,.mspfa input.major[type=submit]:disabled,.mspfa input.major[type=reset]:disabled{background-color:#ccc}.mspfa textarea{resize:none}.mspfa #stories .storyholder{height:271px}.mspfa .story{display:inline-block;float:left;width:170px;margin:4.2px;padding:4px}.mspfa .story:link,.mspfa .story:active,.mspfa .story:visited{text-decoration:none;color:inherit}.mspfa .story:hover{background-color:rgba(0,0,0,.0625)}.mspfa .arrow{position:absolute;left:50%;opacity:.5;width:82px;height:203px;background:0 0;background-repeat:no-repeat;border:none;outline:none}.mspfa .arrow.right{background-image:url(/images/arrowr.png);margin-left:-580px}.mspfa .arrow.left{background-image:url(/images/arrowl.png);margin-left:500px}.mspfa .arrow.lit{opacity:1;cursor:pointer}.mspfa .arrow.lit:active{background-position:2px 2px}.mspfa ::-moz-focus-inner{border:none}.mspfa .cellicon{width:64px;height:64px;margin:0 16px}.mspfa .cellicon~input[type=checkbox]{position:relative;top:-24px}.mspfa .cellrank{padding-left:8px;font-weight:700;word-break:normal;word-wrap:normal}.mspfa #bbtoolbar input{width:24px;height:24px;padding:0;background-clip:content-box;background-image:url(/images/bbicons.png);background-color:#eee;border:1px solid #a2a2a2}.mspfa #container{font-weight:700;font-size:14px}.mspfa #slide{display:table;width:600px;max-width:940px;margin:7px auto 23px;padding:0 25px;word-wrap:break-word;word-break:break-word;background-color:#eee}.mspfa #command{text-align:center;font-size:xx-large;padding:14px 0}.mspfa #content{text-align:center;margin-bottom:14px}.mspfa #content>span>br:first-child{display:none}.mspfa #content img{max-width:940px}.mspfa #content img.major,.mspfa #content video.major,.mspfa #content iframe.major,.mspfa #content canvas.major,.mspfa #content object.major,.mspfa #content ruffle-object.major{margin:0 -25px}.mspfa #slide .spoiler img,.mspfa #commentbox>.spoiler .spoiler img{max-width:100%}.mspfa #foot,.mspfa #latestpages{font-family:verdana,arial,helvetica,"sans-serif"!important}.mspfa #links{margin-top:31px;font-weight:400;font-size:x-large}.mspfa #links>div::before{content:"> "}.mspfa .footlinks{font-size:10px;font-weight:400}.mspfa .footlinks a{font-weight:700}.mspfa .smol{width:16px;height:16px;vertical-align:top}.mspfa .edit,.mspfa .fav,.mspfa .notify,.mspfa .poll,.mspfa .rss{padding:0!important;width:22px;height:22px;background-repeat:no-repeat;background-position:center}.mspfa .edit{background-image:url(/images/edit.png)}.mspfa .fav.unlit{background-image:url(/images/grayheart.png)}.mspfa .fav.lit{background-image:url(/images/heart.png)}.mspfa .notify.unlit{background-image:url(/images/graybell.png)}.mspfa .notify.lit{background-image:url(/images/bell.png)}.mspfa .poll{background-image:url(/images/poll.png)}.mspfa .rss{background-image:url(/images/rss.png)}.mspfa #info{margin-bottom:8px;font-size:16px;font-weight:400;text-align:center}.mspfa #info>span>.spoiler,.mspfa #latestpages>span>.spoiler{border:none}.mspfa #info>span>.spoiler.open{background-color:#eee}.mspfa #info>span>.spoiler>div:first-child>input,.mspfa #latestpages>span>.spoiler>div:first-child>input{font-size:10px;padding:0}.mspfa #info>span>.spoiler>div:last-child>table>tbody>tr>td{vertical-align:top}.mspfa #infobox>.spoiler>div:last-child>table{width:100%}.mspfa #latestpages>span>.spoiler>div:last-child{margin:12px 0 0;padding:0}.mspfa .comment>td{padding-bottom:16px}.mspfa .comment>td:first-child>.cellicon{margin:0 16px 0 0}.mspfa .comment>td:last-child{width:100%}.mspfa #commentbox img{max-width:650px;max-height:450px}.mspfa .timestamp{font-size:12px;color:#8c8c8c}.mspfa .page{font-size:12px;color:#666;text-decoration:none}.mspfa .page:hover{text-decoration:underline}.mspfa .gear{background-image:url(/images/gear.png);background-size:contain;background-position:center;float:right;width:16px;height:16px;border-radius:8px;opacity:.5}.mspfa .gear:hover{opacity:1}.mspfa .rate{float:right;text-align:right}.mspfa .rate button,.mspfa .rate input[type=button]{min-width:40px;min-height:24px;color:#000;font-family:courier new,Courier,monospace;font-size:15px;text-shadow:none;padding:2px 2px 0 20px;background-repeat:no-repeat;background-position:2px;margin:0 0 1px 2px}.mspfa .rate button.up,.mspfa .rate input[type=button].up{background-image:url(/images/grayupvote.png)}.mspfa .rate button.down,.mspfa .rate input[type=button].down{background-image:url(/images/graydownvote.png)}.mspfa .rate button.up.lit,.mspfa .rate input[type=button].up.lit{background-image:url(/images/upvote.png)}.mspfa .rate button.down.lit,.mspfa .rate input[type=button].down.lit{background-image:url(/images/downvote.png)}' },
        { body: adventureCSS },
      ],
      
      edit(archive) {

        let startDate = new Date(adventureData.d)
        let endDate = new Date(adventureData.p[adventureData.p.length - 1].d)
        
        archive.tweaks.modHomeRowItems.push({
          href: "/" + adventureUrl + 1,
          thumbsrc: adventureData.o,
          title: adventureData.n,
          date: months[startDate.getMonth()] + " " + startDate.getFullYear() + " - " + months[endDate.getMonth()] + " " + endDate.getFullYear(),
          description: \`A port of the MS Paint Fan Adventure "$\{adventureObject.n}"\`,
        });

      },

      browserPages: adventurePages

    }

  },
  
}
`

const setStatus = stat => {
  console.log(stat)
  document.querySelectorAll("#uhcDlStatus").forEach(e => { 
    e.innerText = stat;
    e.className = "start"
  })
}

const addFail = fail => {
  document.querySelectorAll("#uhcDlFails").forEach(e => { 
    e.innerText += "Failed to Fetch " + fail + ", \n";
  })
}

// CSS
const appendImportCSS = async (inCSS) => {
  let finalCSS = ""
  let baseCSS = inCSS
  let matches = inCSS.matchAll(importRegex)

  if (matches) {
    for (const match of matches) {
      finalCSS += await fetch(match[1]).then(cssFile => cssFile.text())
      baseCSS = baseCSS.replace(match[0], "")
    }
  }

  finalCSS += baseCSS

  return finalCSS
}

const getFullCSS = async (inCSS) => {
  let fullCSS = inCSS
  for (let i = 0; i < 4; i++) {
    fullCSS = await appendImportCSS(fullCSS)
  }
  return fullCSS
}

// OFFLINE IMAGES - https://stackoverflow.com/questions/44698967/requesting-blob-images-and-transforming-to-base64-with-fetch-api
const imageUrlToBase64 = async url => {
  const response = await fetch(url);
  const blob = await response.blob();
  return new Promise((onSuccess, onError) => {
    try {
      const reader = new FileReader() ;
      reader.onload = function(){ onSuccess(this.result) } ;
      reader.readAsDataURL(blob) ;
    } catch(e) {
      onError(e)
    }
  });
}

const convertImage = async (url, name) => {
  setStatus("Fetching " + name)
  try {
    url = await imageUrlToBase64(url)
  } catch(e) {
    console.log("Failed to fetch " + name)
    addFail(name)
  }
  return url
}

const convertImagesInBbcode = async (bodyText, name) => {
  let matches = [...bodyText.matchAll(imgTagRegex), ...bodyText.matchAll(altImgTagRegex)]
  if (matches) {
    for (let mIndex = 0; mIndex < matches.length; mIndex++) {
      const match = matches[mIndex];
      bodyText = bodyText.replace(match[1], await convertImage(match[1], name + ` Image ${mIndex + 1}`))
    }
  }
  return bodyText
}

const convertAllPageImages = async pages => {

  for (let pIndex = 0; pIndex < pages.length; pIndex++) {

    pages[pIndex].c = await convertImagesInBbcode(pages[pIndex].c, `Page ${pIndex + 1} Command`)
    pages[pIndex].b = await convertImagesInBbcode(pages[pIndex].b, `Page ${pIndex + 1} Body`)
    
  }

  return pages
}

const convertCSSImages = async css => {
  let matches = css.match(cssImgUrlRegex)
  if (matches) {
    for (let mIndex = 0; mIndex < matches.length; mIndex++) {
      const match = matches[mIndex].replace(/^url\("?/, "").replace(/"?\)$/, "");
      css = css.replace(match, await convertImage(match, "CSS Image " + mIndex))
    }
  }
  return css
}

// MOD TEXT
const getModFileText = async getOffline => {
  let alteredStory = { ... MSPFA.story}

  // Get Icon test
  if (getOffline) {
    alteredStory.o = await convertImage(alteredStory.o, "Adventure Icon")
    alteredStory.x = await convertImage(alteredStory.x, "Adventure Banner")
    alteredStory.r = await convertImagesInBbcode(alteredStory.r, "Adventure Description")
    alteredStory.p = await convertAllPageImages(alteredStory.p)
    alteredStory.y = await convertCSSImages(alteredStory.y)
  }

  // Get Full CSS for importing
  setStatus("Getting Full Adventure CSS")
  alteredStory.y = await getFullCSS(alteredStory.y)

  // Insert Adventure Object into mod file text
  setStatus("Inserting Adventure into Mod File")
  let finalModFileText = modFileText.replace("%ADVENTURE_OBJECT%", JSON.stringify(alteredStory))

  setStatus("Generating File Complete")
  console.log(finalModFileText)
  return finalModFileText
}

const customEncodeURIComponent = text => {

}

// https://stackoverflow.com/questions/3665115/how-to-create-a-file-in-memory-for-user-to-download-but-not-through-server
const download = (filename, text) => {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.innerText = "Not Downloading? Click here!"
  document.getElementById("uhcDownloadLink").appendChild(element);

  element.click();
  console.log("test")
}

const getModFile = async getOffline => {
  download("MSPFA_" + MSPFA.story.n.replace(/[\\/:"*?<>|\s]+/g, "") + ".js", await getModFileText(getOffline))
}

const openModDialog = () => {
  const dialogBody = MSPFA.parseBBCode(`<p>Download this adventure as an mod for the UHC. Once downloaded, simply place the generated .js file into your UHC mods folder.</p><p><b>PLEASE NOTE:</b> Any custom Javascript, including mulipage Audio (currently), will not be included in the UHC version.</p><p><b>WARNING:</b> Downloading an adventure as an offline verion will only (currently) download images into the mod. Any videos, HTML5 games, custom fonts will not be included. These will still be accessible but only when the UHC is connected to the internet. Additionally, depending on where this adventure hosts it's images (Discord, Imgur), downloading images may fail. Compatible file hosts include Github and <a href="https://filegarden.com/">File Garden</a>.</p><p><button style="margin:auto;display:block" class="major" id="uhcDl">Download</button><br><button style="margin:auto;display:block" class="major" id="uhcDlOffline">Download with offline images</button><div id="uhcDlStatus"></div><div id="uhcDlFails" style="white-space: pre;"></div><div id="uhcDownloadLink"></div></p><style>#uhcDlStatus.start{margin:auto;text-align:center;background-color:#7dd85d;padding:.5em;border-radius:.5em;color:#fff;font-family:Verdana,Geneva,Tahoma,sans-serif;font-weight:600;box-shadow:.2em .2em 0 #6aa756}</style>`)

  MSPFA.dialog("Download Adventure as UHC Mod", dialogBody, ["Close"], e => { console.log(e) })

  document.getElementById("uhcDl").onclick = () => { getModFile(false) }
  document.getElementById("uhcDlOffline").onclick = () => { getModFile(true) }
}

openModDialog()