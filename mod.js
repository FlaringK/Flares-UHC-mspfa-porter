// FlaringK's MSPFA Porter
// This is more of an experiment then something you should actually use, since adding MSPFAs to the UHC is an offically planned feature
// But this was fun to code anyway, and it's basically done anyway
// The offical 

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
  useOfflineImages: true,
  adventureSummary: "This is a test adventure for Flare's MSPFA porter."
}

const mspfaHtml = `<div class="mspfa">
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

                <a href="/map" style="color: #2cff4b;">UHC Map</a> <span class="vbar">|</span> <a href="/log" style="color: #2cff4b;">UHC Log</a> <span class="vbar">|</span>
                <a href="/search" style="color: #2cff4b;">UHC Search</a>

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
                    <span id="gamelinks" style="">
                        <span class="footlinks"> <a id="savegame">Save Game</a> | <a id="loadgame">Load Game</a> | <a id="deletegame">Delete Game Data</a> </span>
                    </span>
                    <br />
                    <br />
                </div>
            </div>

            <div id="info">
                <span id="infobox">
                    <div class="spoiler open">
                        <input type="checkbox" class="spoilButton" id="advSpoil" name="advSpoil"><label for="advSpoil"></label>
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
                                                <div class="spoiler open">
                                                    <input type="checkbox" class="spoilButton" id="lateSpoil" name="lateSpoil"><label for="lateSpoil"></label>
                                                    <div>
                                                        Latest Pages:
                                                        __latepages__
                                                </div>
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
                    </div>
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

String.prototype.replaceAll = function(search, replacement) {
  var target = this;
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
  [/\[spoiler\]((?:(?!\[spoiler(?: .*?)?\]).)*?)\[\/spoiler\]/gi, "<div class=\"spoiler open\"><div></div><input type=\"checkbox\" class=\"spoilButton\" id=\"pageSpoil\" name=\"pageSpoil\"><label for=\"pageSpoil\"></label><div>$1</div></div>"],
  [/\[spoiler open=("?)([^"]*?)\1 close=("?)([^"]*?)\3\]((?:(?!\[spoiler(?: .*?)?\]).)*?)\[\/spoiler\]/gi, "<div class=\"spoiler open\" style=\"--showText: '$2'; --hideText:'$4'\"><div></div><input type=\"checkbox\" class=\"spoilButton\" id=\"pageSpoil\" name=\"pageSpoil\"><label for=\"pageSpoil\"></label><div>$5</div></div>"],
  [/\[spoiler close=("?)([^"]*?)\1 open=("?)([^"]*?)\3\]((?:(?!\[spoiler(?: .*?)?\]).)*?)\[\/spoiler\]/gi, "<div class=\"spoiler open\" style=\"--showText: '$4'; --hideText:'$2'\"><div></div><input type=\"checkbox\" class=\"spoilButton\" id=\"pageSpoil\" name=\"pageSpoil\"><label for=\"pageSpoil\"></label><div>$5</div></div>"],
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

    for (let i = 0; i < adventureData.p.length; i++) {
      // CREATE ADVENTURE PAGE
      const pageData = adventureData.p[i]
      const p = i+1
      let pageHtml = mspfaHtml

      // Set Icon & author/adventure info
      pageHtml = pageHtml.replaceAll("__pageNumber__", p)
      pageHtml = pageHtml.replaceAll("__title__", adventureData.n)
      pageHtml = pageHtml.replaceAll("__icon__", adventureData.o ? sourceImg(adventureData.o) : "assets://images/mspfa/random.png")
      pageHtml = pageHtml.replaceAll("__authorsite__", adventureData.w)
      pageHtml = pageHtml.replaceAll("__author__", adventureData.a)
      pageHtml = pageHtml.replaceAll("__mspfasite__", "https://mspfa.com/user/?u=" + adventureData.c)
      pageHtml = pageHtml.replaceAll("__mirror__", adventureData.a)
      pageHtml = pageHtml.replaceAll("__adventureinfo__", processBBcode(adventureData.r, true))

      // Set tags
      let tagText = ""
      adventureData.t.forEach(tag => tagText += tag + ", ")
      pageHtml = pageHtml.replaceAll("__tags__", tagText)

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
      for(var j = p-1; j >= 0; j--) {
        if(adventureData.p[j].n.indexOf(p) != -1) {
          backid = j+1;
        }
      }
      if(!backid) {
        for(var j = p+1; j < adventureData.p.length; j++) {
          if(adventureData.p[j].n.indexOf(p) != -1) backid = j+1;
        }
      }
      pageHtml = pageHtml.replaceAll("__goback__", backid ? adventureUrl + backid : `" style="display: none`)

      // Set start over link & hide prev on first page __prevstyle__
      pageHtml = pageHtml.replaceAll("__startover__", adventureUrl + 1)
      if (p == 1) pageHtml = pageHtml.replaceAll("__prevstyle__", "display: none")

      // Set lates pages
      let latePageHtml = ""
      for (let j = 0; j < Math.min(30, adventureData.p.length); j++) {
        let latePageIndex = adventureData.p.length - j
        let latePageData = adventureData.p[latePageIndex - 1]
        let latePageDate = new Date(latePageData.d)
        let latePageDateSrting = months[latePageDate.getMonth()] + " " + latePageDate.getDate() + " " + latePageDate.getFullYear()
        latePageHtml += `<br /><span> ${latePageDateSrting} - <a href="/${adventureUrl + latePageIndex}">"<span>${latePageData.c}</span>"</a> </span>`
      }
      pageHtml = pageHtml.replaceAll("__latepages__", latePageHtml)

      adventurePages[adventureUrl.toUpperCase() + (i + 1)] = {
        component: {
          title: () => adventureData.n,
          next: () => "/" + adventureUrl + nextPageArrowIndex,
          template: pageHtml
        }
      }

    }

    return {

      styles: [
        { source: "./mspfa.css" },
        { source: "./custom.css" },
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
