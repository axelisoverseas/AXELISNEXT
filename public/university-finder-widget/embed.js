/* Axelis University Finder — drop-in embed.
 *
 * One widget, both sites. Put the finder/ folder on each site under
 * /university-finder-widget/ and add this where it should appear:
 *
 *   <div id="axelis-finder"></div>
 *   <script src="/university-finder-widget/embed.js"></script>
 *
 * It mounts an iframe and keeps its height in step with the content, so the
 * host page never shows an inner scrollbar.
 */
(function () {
  var me = document.currentScript;
  var base = me.src.replace(/embed\.js(?:\?.*)?$/, "");
  var mount = document.getElementById(me.dataset.mount || "axelis-finder");
  if (!mount) return;

  var f = document.createElement("iframe");
  f.src = base + "index.html?embed=1";
  f.title = "Axelis University Finder";
  f.loading = "lazy";
  f.style.cssText = "width:100%;border:0;display:block;min-height:620px";
  f.setAttribute("scrolling", "no");
  mount.appendChild(f);

  addEventListener("message", function (e) {
    // Only act on our own frame's height messages.
    if (e.source !== f.contentWindow) return;
    var d = e.data;
    if (d && d.axelisFinderHeight) f.style.height = d.axelisFinderHeight + "px";
  });
})();
