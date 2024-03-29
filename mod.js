// FlaringK's MSPFA Porter
// This is more of an experiment then something you should actually use, since adding MSPFAs to the UHC is an offically planned feature
// But this was fun to code anyway, and it's basically done anyway

// To import your adventure:

// 1. Use the [MSPFA extras script](https://greasyfork.org/en/scripts/396798-mspfa-extras) to download your adventure as a JSON from your adventure info page. You will need to be the editor or owner of the adventure to do this.
// 2. Replace the adventure.json file in this with your json file, and rename it to adventure.json
// 3. Place all the images or videos used within your adventure in the assets/adventure folder, make sure they are named the same as they are in your adventure, and that they aren't in any subfolders
// 4. Edit the mod info in the mod.js folder within the portSettings object

// After that you should have a viewable MSPFA, which can be found at the bottom of the UHC home page.

// You can also add custom CSS in the custom.css file BUT
// - All adventure CSS should be scoped under .mspfa, I recommend using complied SCSS for this
// - MSPFA page ranges (i.e. pX-Y classes) will not work


// Porter settings
const portSettings = {
  // UHC mod settings
  title: "MSPFA Porter", 
  author: "FlaringK (<a href='https://flaringk.github.io/Portfolio/'>Here's my uber cool site</a>)",
  modVersion: 0.1,

  summary: "Template",
  description: "Template",

  // MSPFA porter settings
  useOfflineImages: false,
  adventureSummary: "This is a test adventure for Flare's MSPFA porter."
}

const mspfaHtml = `
<div class="mspfa">
  <body cz-shortcut-listen="true" class="p__pageNumber__">
    
    <div id="main">
        <header>
            <div class="umcontainer">
                <a href="/">
                    <div class="mspfalogo"></div>
                </a>
            </div>
            <nav>
                <a href="/" style="color: #ffffff;">Homestuck Collection</a>

                <div class="heart"></div>

                <a href="/help" style="color: #76d8ff;">Help</a>

                <div class="heart"></div>

                <a href="/__loglink__" style="color: #2cff4b;">Log</a>

                <div class="heart"></div>

                <a href="/news" style="color: #fffa36;">News</a> <span class="vbar">|</span>
                <a href="/music" style="color: #fffa36;">music</a>

                <div class="heart"></div>

                <a href="/evenmore" style="color: #ffbc3e;">More</a> <span class="vbar">|</span> <a href="/settings" style="color: #ffbc3e;">Settings</a> <span class="vbar">|</span>
                <a href="/credits" style="color: #ffbc3e;">Credits</a>
            </nav>
        </header>

        <div id="container">
            <div id="slide">
                <div id="command">
                    <span> __command__ </span>
                </div>
                <div id="content">
                    <span>
                        <br />
                        __content__
                    </span>
                </div>
                <div id="foot">
                    <div id="links">
                        __links__
                    </div>
                    <br />
                    <br />
                    <span id="prevlinks" style="__prevstyle__">
                        <span class="footlinks">
                            <a id="startover" href="__startover__">Start Over</a>
                            <span style=""> | <a id="goback" href="__goback__">Go Back</a></span>
                        </span>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </span>
                    <br />
                    <br />
                </div>
            </div>

            <div id="info">
                <span id="infobox">
                    <details class="spoiler"><summary><span>Show Adventure Info</span><span>Hide Adventure Info</span></summary>
                        <div>
                            <table>
                                <tbody>
                                    <tr>
                                        <td style="width: 158px;">
                                            <img id="storyicon" src="__icon__" style="margin-right: 6px;" width="150" height="150" />
                                        </td>
                                        <td style="max-width: 413px; width: 413px;">
                                            <span class="major" style="font-size: 20px;">
                                                __title__
                                            </span>
                                            <br />
                                            Author: <a href="__authorsite__">__author__</a> <br />
                                            Mirrored by: <span><a href="__mspfasite__">__mirror__</a></span> <br />
                                            Tags: __tags__
                                            <br />
                                        </td>
                                        <td id="latestpages" rowspan="2" style="max-width: 253px; width: 253px; font-size: 10px; font-weight: bold;">
                                            <span>
                                                <details class="spoiler"><summary><span>Show Latest Pages</span><span>Hide Latest Pages</span></summary>
                                                        Latest Pages:
                                                        __latepages__
                                                </details>
                                            </span>
                                            <br />
                                            <br />
                                            <div style="text-align: center;">
                                                <a href="/log/?s=48741" style="font-size: 14px;">VIEW ALL PAGES</a>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="2" style="max-width: 575px; width: 575px; height: 8px;"><span>
                                        __adventureinfo__
                                        </span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </details>
                </span>
            </div>
        </div>
        <footer>
            <div class="umcontainer">
                <div class="mspfalogo"></div>
            </div>
            <div id="details" style="padding-top: 6px;">© MS Paint Fan Adventures 2010-2022</div>
        </footer>
    </div>
</body>
</div>`

let formatPageRanges = cssString => {
  let pageRangeUses = cssString.match(/\.p(\d+)-(?:(\d+))((.|\n)*?\})/g)
  
  if (pageRangeUses) {
    pageRangeUses.forEach(rangeCss => {
      let regexGroups = rangeCss.match(/\.p(\d+)-(?:(\d+))((.|\n)*?\})/)
    
      let startPage = regexGroups[1]
      let endPage = regexGroups[2]
      let cssContent = regexGroups[3]
      
      console.log(startPage, endPage, cssContent)
      
      for (let i = startPage; i <= endPage; i++) {
        cssString += "\n.p" + i + cssContent
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
  [/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;"],
  [/\r?\n/g, "<br>"],
  [/\[b\]((?:(?!\[b\]).)*?)\[\/b\]/gi, "<span style=\"font-weight: bolder;\">$1</span>"],
  [/\[i\]((?:(?!\[i\]).)*?)\[\/i\]/gi, "<span style=\"font-style: italic;\">$1</span>"],
  [/\[u\]((?:(?!\[u\]).)*?)\[\/u\]/gi, "<span style=\"text-decoration: underline;\">$1</span>"],
  [/\[s\]((?:(?!\[s\]).)*?)\[\/s\]/gi, "<span style=\"text-decoration: line-through;\">$1</span>"],
  [/\[size=(\d*?)\]((?:(?!\[size=(?:\d*?)\]).)*?)\[\/size\]/gi, "<span style=\"font-size: $1px;\">$2</span>"],
  [/\[color=("?)#?([a-f0-9]{3}(?:[a-f0-9]{3})?)\1\]((?:(?!\[color(?:=[^;]*?)\]).)*?)\[\/color\]/gi, "<span style=\"color: #$2;\">$3</span>"],
  [/\[color=("?)([^";]+?)\1\]((?:(?!\[color(?:=[^;]*?)\]).)*?)\[\/color\]/gi, "<span style=\"color: $2;\">$3</span>"],
  [/\[background=("?)#?([a-f0-9]{3}(?:[a-f0-9]{3})?)\1\]((?:(?!\[background(?:=[^;]*?)\]).)*?)\[\/background\]/gi, "<span style=\"background-color: #$2;\">$3</span>"],
  [/\[background=("?)([^";]+?)\1\]((?:(?!\[background(?:=[^;]*?)\]).)*?)\[\/background\]/gi, "<span style=\"background-color: $2;\">$3</span>"],
  [/\[font=("?)([^";]*?)\1\]((?:(?!\[size(?:=[^;]*?)\]).)*?)\[\/font\]/gi, "<span style=\"font-family: $2;\">$3</span>"],
  [/\[(center|left|right|justify)\]((?:(?!\[\1\]).)*?)\[\/\1\]/gi, "<div style=\"text-align: $1;\">$2</div>"],
  [/\[url\]([^"]*?)\[\/url\]/gi, "<a href=\"$1\">$1</a>"],
  [/\[url=("?)([^"]*?)\1\]((?:(?!\[url(?:=.*?)\]).)*?)\[\/url\]/gi, "<a href=\"$2\">$3</a>"],
  [/\[alt=("?)([^"]*?)\1\]((?:(?!\[alt(?:=.*?)\]).)*?)\[\/alt\]/gi, "<span title=\"$2\">$3</span>"],

  // SPOILER BUTTONS (Edited from MSPFA)
  [/\[spoiler\]((?:(?!\[spoiler(?: .*?)?\]).)*?)\[\/spoiler\]/gi, `<details class="spoiler"><summary><span>Show Pesterlog</span><span>Hide Pesterlog</span></summary>$1</details>`],
  [/\[spoiler open=("?)([^"]*?)\1 close=("?)([^"]*?)\3\]((?:(?!\[spoiler(?: .*?)?\]).)*?)\[\/spoiler\]/gi, `<details class="spoiler"><summary><span>$2</span><span>$4</span></summary>$5</details>`],
  [/\[spoiler close=("?)([^"]*?)\1 open=("?)([^"]*?)\3\]((?:(?!\[spoiler(?: .*?)?\]).)*?)\[\/spoiler\]/gi, `<details class="spoiler"><summary><span>$4</span><span>$2</span></summary>$5</details>`],

  // Clean up spoilers 
  [/<\/summary>(<br>)+/gi, "</summary>"],

  [/<\/label><div>(<br>)+/gi, "</label><div>"],
  [/\[flash=(\d*?)x(\d*?)\](.*?)\[\/flash\]/gi, "<object type=\"application/x-shockwave-flash\" data=\"$3\" width=\"$1\" height=\"$2\"></object>"],
  [/\[user\](.+?)\[\/user\]/gi, "<a class=\"usertag\" href=\"/user/?u=$1\" data-userid=\"$1\">@...</a>"],
  [/\[img\]([^"]*?)\[\/img\]/gi, "<img class=\"major\" src=\"$1\">"],
  [/\[img=(\d*?)x(\d*?)\]([^"]*?)\[\/img\]/gi, "<img class=\"major\" src=\"$3\" width=\"$1\" height=\"$2\">"]
]

const BBcodeOffline = [
  [/src="([^"\[]*)\/([^"]*?)"/gi, `src="assets://images/adventure/$2"`]
]

let processBBcode = (plainHtml, useOnline) => {
  BBcode.forEach(e => { plainHtml = plainHtml.replace(e[0], e[1]) })
  if (portSettings.useOfflineImages && !useOnline) {
    BBcodeOffline.forEach(e => { plainHtml = plainHtml.replace(e[0], e[1]) })
  }
  return plainHtml
}

let sourceImg = imgLink => {
  if (portSettings.useOfflineImages) imgLink = imgLink.replace(/^.+\//g, "assets://images/adventure/")
  return imgLink
}

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

// == Actual mod ==
module.exports = {
  title: portSettings.title, 
  author: portSettings.author,
  modVersion: portSettings.modVersion,

  summary: portSettings.summary,
  description: portSettings.description,

  trees: {
    './assets/': 'assets://images/'
  },

  edit: true,

  computed(api) {
    // Load Json
    const adventureData = api.readJson('./adventure.json')
    api.logger.info(adventureData)

    // Create browsepages object
    const adventureUrl = adventureData.n.toLowerCase().replace(/[^a-z0-9]/g,'') + "-"
    api.logger.info(adventureUrl)

    let adventurePages = {}

    // Create base format with standard aventure info
    let baseHtml = mspfaHtml

    baseHtml = baseHtml.replaceAll("__title__", adventureData.n.toUpperCase())
    baseHtml = baseHtml.replaceAll("__icon__", adventureData.o ? sourceImg(adventureData.o) : "assets://images/mspfa/random.png")
    baseHtml = baseHtml.replaceAll("__authorsite__", adventureData.w)
    baseHtml = baseHtml.replaceAll("__author__", adventureData.a)
    baseHtml = baseHtml.replaceAll("__mspfasite__", "https://mspfa.com/user/?u=" + adventureData.c)
    baseHtml = baseHtml.replaceAll("__mirror__", adventureData.a)
    baseHtml = baseHtml.replaceAll("__adventureinfo__", processBBcode(adventureData.r, true))
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
      latePageHtml += `<br /><span> ${latePageDateSrting} - <a href="/${adventureUrl + latePageIndex}">"<span>${latePageData.c}</span>"</a> </span>`
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
          linkHtml += `<div><a href="/${adventureUrl + nextPageIndex}"><span>${processBBcode(adventureData.p[nextPageIndex - 1].c)}</span></a></div>`
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
      pageHtml = pageHtml.replaceAll("__goback__", backid ? adventureUrl + backid : `" style="display: none`)

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

    // Create log page
    let logHtml = baseHtml

    // Set lates pages
    let logListHtml = ""
    for (let j = 0; j < adventureData.p.length; j++) {
      let logPageIndex = adventureData.p.length - j
      let logPageData = adventureData.p[logPageIndex - 1]
      let logPageDate = new Date(logPageData.d)
      let logPageDateSrting = months[logPageDate.getMonth()] + " " + logPageDate.getDate() + " " + logPageDate.getFullYear()
      logListHtml += `<br /><span> ${logPageDateSrting} - <a href="/${adventureUrl + logPageIndex}">"<span>${logPageData.c}</span>"</a> </span>`
    }

    logHtml = logHtml.replaceAll("__command__", processBBcode("ADVENTURE LOG"))
    logHtml = logHtml.replaceAll("__content__", `<div style="text-align: left;">${logListHtml}</div>`)
    logHtml = logHtml.replaceAll(`<div id="foot">
                    <div id="links">
                        __links__
                    </div>
                    <br />
                    <br />
                    <span id="prevlinks" style="__prevstyle__">
                        <span class="footlinks">
                            <a id="startover" href="__startover__">Start Over</a>
                            <span style=""> | <a id="goback" href="__goback__">Go Back</a></span>
                        </span>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </span>
                    <br />
                    <br />
                </div>`, "")

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
    adventureCSS = ".mspfa " + adventureCSS.replace(/{({(.|\n)*?}|.|\n)*?}/g, "$& .mspfa ") + "{}" // Format everything under .mspfa
    adventureCSS = adventureCSS.replace(/\.mspfa[^{}]*?@/g, "@") // Fix formatting with @keyframes

    api.logger.info(adventureCSS)

    // Set Mod title and description
    return {

      styles: [
        { source: "./mspfa.css" },
        { source: "./custom.css" },
        { body: adventureCSS },
      ],
      
      edit(archive) {

        let startDate = new Date(adventureData.d)
        let endDate = new Date(adventureData.p[adventureData.p.length - 1].d)
        
        archive.tweaks.modHomeRowItems.push({
          href: "/" + adventureUrl + 1,
          thumbsrc: adventureData.o ? sourceImg(adventureData.o) : "assets://images/mspfa/random.png",
          title: adventureData.n,
          date: months[startDate.getMonth()] + " " + startDate.getFullYear() + " - " + months[endDate.getMonth()] + " " + endDate.getFullYear(),
          description: portSettings.adventureSummary
        });

      },

      browserPages: adventurePages

    }

  },
  
}
