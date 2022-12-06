# Flares-UHC-mspfa-porter

Here's my version of a way to port MSPFA to the Unofficial Homestuck Collection. This is not the OFFICIAL way, that is a [planned feature](https://github.com/Bambosh/unofficial-homestuck-collection/pull/311/files) that is coming soon, that addition will make porting MSPFAs a lot smoother then this mod can provide, and will support features like arrow shortcuts and be compatible with the eventual updated MSPFA site. In saying that, this mod recreates the current (2022) MSPFA's look and feel, allowing adventures to be viewed completely offline.

## How to port your MSPFA 
This mod contains a template adventure that you can replace with your own.

1. Use the [MSPFA extras script](https://greasyfork.org/en/scripts/396798-mspfa-extras) to download your adventure as a JSON from your adventure info page. You will need to be the editor or owner of the adventure to do this.
2. Replace the adventure.json file in this with your json file, and rename it to adventure.json
3. Place all the images or videos used within your adventure in the assets/adventure folder, make sure they are named the same as they are in your adventure, and that they aren't in any subfolders
4. Edit the mod info in the mod.js folder within the portSettings object

After that you should have a viewable MSPFA, which can be found at the bottom of the UHC home page.
