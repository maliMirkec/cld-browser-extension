function enc(e) {
  return e.replace(/[\u00A0-\u9999<>\&]/gim, function (e) {
    return "&#" + e.charCodeAt(0) + ";"
  });
}

function cld(e) {
  if (!e) return !1;
  var t = encodeURIComponent("Code Line Daily: " + e.line.trim()),
      a = encodeURIComponent("Code Line Daily:\n" + e.line.trim() + "\n\n"),
      n = e.handle ? "&related=" + e.handle : "",
      c = "https://twitter.com/intent/tweet?url=https://cld.silvestar.codes&text=" + a + "&hashtags=loc,cld,codelinedaily," + e.language + "&via=CodeLineDaily" + n,
      l = "https://www.reddit.com/submit?url=https://cld.silvestar.codes&title=" + t,
      s = '<div class="cld"><div class="cld__content"><a class="cld__inner" href="'.concat(e.link, '" title="Learn more" target="_blank" rel="noopener"><div class="cld__details cld__details--alpha"><span class="cld__detail">').concat(e.note, '</span></div><code class="cld__code">').concat(enc(e.line), '</code></a><div class="cld__details cld__details--beta"><span class="cld__detail">#').concat(e.language, '</span><span class="cld__detail">').concat(e.date, '</span><span class="cld__detail">By:<a class="btn" href="https://cld.silvestar.codes/author/').concat(e.author.toLowerCase().replace(" ", "-"), '.html" title="See author" target="_blank">').concat(e.author, '</a></span></div></div><div class="cld__share"><span class="cld__detail">Share:</span><a class="btn" href="').concat(c, '" target="_blank" rel="noopener" title="Share on Twitter">Twitter</a><a class="btn" href="').concat("https://facebook.com/sharer.php?u=https://cld.silvestar.codes", '" target="_blank" rel="noopener" title="Share on Facebook">Facebook</a><a class="btn" href="').concat(l, '" target="_blank" rel="noopener" title="Share on Reddit">Reddit</a></div></div>');

  document.getElementById("cld").innerHTML = s;
}

function fetchLineOfCode() {
  let content = ''
  const p = document.createElement('p')
  p.style = 'text-align: center'
  document.getElementById("cld").appendChild(p)
  const loading = setInterval(() => {
    content += '.'
    p.innerHTML = content;
    if(content === '...') {
      content = ''
    }
  }, 400)
  fetch("https://cld.silvestar.codes/api/get-random-line/")
    .then(response => response.json())
    .then(data => {
      clearInterval(loading)
      cld(data);
    })
    .catch(err => console.error('Error fetching line of code:', err));
}

fetchLineOfCode();
