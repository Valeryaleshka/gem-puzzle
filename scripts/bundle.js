(()=>{let e,t=[],n=4,o=0,r=0,i=0,d=!1,c={savedMoves:0,array:[],minutes:0,seconds:0,grids:0};class s{constructor(e,t,n){this.timeScore=e,this.nameScore=t,this.movesScore=n}}function a(){d||(d=!0,setTimeout((function e(){d&&(i++,document.querySelector("#min").innerHTML=r,document.querySelector("#sec").innerHTML=i,60===i&&(r++,i=0),setTimeout(e,1e3))}),1e3));const e=document.querySelectorAll(".drop");let t=!0;for(let n=1;n<e.length-1;n++)+e[n-1].innerHTML+1!=+e[n].innerHTML&&(t=!1);t&&(d=!1,document.querySelector(".winner").classList.add("menu_clicked"),document.querySelector("#winner_time").innerHTML=`${r}:${i}`,document.querySelector("#winner_moves").innerHTML=o)}function l(){document.querySelector("#moves").innerHTML=o,document.querySelectorAll(".drop").forEach((e=>{e.classList.remove("blank"),""===e.innerHTML&&e.classList.add("blank")})),o++}function u(){const e=new Audio;e.src="./assets/tik.mp3",e.volume=.1,e.play(),setTimeout((()=>{e.remove()}),1e3)}function m(){const e=new Audio;e.src="./assets/drop.mp3",e.volume=.1,e.play(),setTimeout((()=>{e.remove()}),1e3)}function v(){document.querySelectorAll(".drop").forEach((t=>{t.draggable=!0,t.addEventListener("click",(()=>{const n=document.querySelector(".blank");+n.id.slice(1)==+t.id.slice(1)+1&&(e=t.innerHTML,t.innerHTML=n.innerHTML,n.innerHTML=e,n.animate([{transform:"translateX(-100%)"},{transform:"translateX(0)"}],{duration:150}),a(),l(),u()),+n.id.slice(1)==+t.id.slice(1)-1&&(e=t.innerHTML,t.innerHTML=n.innerHTML,n.innerHTML=e,n.animate([{transform:"translateX(100%)"},{transform:"translateX(0)"}],{duration:150}),a(),l(),u()),+n.id.slice(1)==+t.id.slice(1)+10&&(e=t.innerHTML,t.innerHTML=n.innerHTML,n.innerHTML=e,n.animate([{transform:"translateY(-100%)"},{transform:"translateY(0)"}],{duration:150}),a(),l(),u()),+n.id.slice(1)==+t.id.slice(1)-10&&(e=t.innerHTML,t.innerHTML=n.innerHTML,n.innerHTML=e,n.animate([{transform:"translateY(100%)"},{transform:"translateY(0)"}],{duration:150}),a(),l(),u())})),t.ondragstart=e=>{""!==e.target.innerHTML&&e.dataTransfer.setData("id",e.target.id)},t.ondragover=e=>{""===e.target.innerHTML&&e.preventDefault()},t.ondrop=e=>{const t=e,n=t.target.innerHTML,o=t.target,r=document.querySelector(`#${e.dataTransfer.getData("id")}`);+o.id.slice(1)==+r.id.slice(1)+10&&(t.target.innerHTML=r.innerHTML,r.innerHTML=n,a(),l(),m()),+o.id.slice(1)==+r.id.slice(1)+1&&(t.target.innerHTML=r.innerHTML,r.innerHTML=n,a(),l(),m()),+o.id.slice(1)==+r.id.slice(1)-1&&(t.target.innerHTML=r.innerHTML,r.innerHTML=n,a(),l(),m()),+o.id.slice(1)==+r.id.slice(1)-10&&(t.target.innerHTML=r.innerHTML,r.innerHTML=n,a(),l(),m())}}))}function T(){const e=new s(`${r}:${i}`,document.querySelector("#winner_name").value,o-1),t=JSON.parse(localStorage.getItem("top"));t.push(e),t.sort(((e,t)=>e.movesScore-t.movesScore)),t.pop();const n=JSON.stringify(t);localStorage.setItem("top",n),document.querySelector(".winner").classList.remove("menu_clicked"),setTimeout((()=>{document.querySelector(".topTen").classList.add("menu_clicked")}),1e3),document.querySelector("body > div.topTen > div").innerHTML="",document.querySelector("body > div.topTen > div").insertAdjacentHTML("beforeend","<table></table>"),document.querySelector("body > div.topTen > div > table").insertAdjacentHTML("beforeend","<tr><td>Position</td><td>Name</td><td>Moves</td><td>Time</td></tr></>");let d=1;t.forEach((e=>{document.querySelector("body > div.topTen > div > table").insertAdjacentHTML("beforeend",`<tr><td>${d}</td><td>${e.nameScore}</td><td>${e.movesScore}</td><td>${e.timeScore}</td></tr></>`),d++}))}function L(){document.querySelector(".menu").classList.add("menu_clicked")}function y(){let e=0;document.querySelectorAll(".drop").forEach((n=>{0===t[e]?(n.innerHTML="",e++):(n.innerHTML=t[e],e++)}))}function S(){let e=1,t=1;for(let o=0;o<n*n;o++)t>n&&(t%=n,e=e-n+10),document.querySelector("body > div.drop_list").insertAdjacentHTML("beforeend",`<div id="a${e}" class="drop drop${n}"></div>`),t++,e++}function M(){const e=new Array(n*n);for(let t=0;t<n*n;t++)e[t]=0;for(let o=0;o<n*n;o++){const r=Math.floor(Math.random()*n*n);0===e[r]?(e[r]=1,t.push(r)):o-=1}}!function(){if(document.body.insertAdjacentHTML("beforeEnd",'<div class="drop_list"></div>'),document.body.insertAdjacentHTML("beforeEnd",'<div class="winner">  <div class="inner">    <p>      Well dine, you finished in <span id="winner_time"></span> sec and      <span id="winner_moves"></span>      moves      <input id="winner_name" type="text" placeholder="Enter your name" />    </p>    <button id="saveResult">Save Result</button>  </div></div>'),document.body.insertAdjacentHTML("beforeEnd",'<div class="topTen">  <div class="inner"></div></div>'),document.body.insertAdjacentHTML("afterbegin",'<header><div>Time<div id="min"></div><div id="sec"></div></div><div>Moves<div id="moves"></div></div><button type="button" id="menu">Menu</button></header>'),document.body.insertAdjacentHTML("beforebegin",' <div class="menu"><div class="inner"><div class="buttons" id="back">Back to Game</div><div class="buttons" id="restart">New Game</div><div class="buttons" id="saveGame">Save</div><div class="buttons" id="loadGame">Load Game</div><div class="buttons" id="getBestScore">Best Scores</div><div class="buttons" id="getField">Field<select><option value="3">3x3</option><option selected value="4">4x4</option><option value="5">5x5</option><option value="6">6x6</option><option value="7">7x7</option><option value="8">8x8</option></select></div></div></div>'),document.querySelector("#menu").addEventListener("click",L),document.querySelector("#saveResult").addEventListener("click",T),S(),!localStorage.getItem("top")){const e=[];for(let t=0;t<10;t++)e.push(new s(0,"None",1e4));const t=JSON.stringify(e);localStorage.setItem("top",t)}document.querySelector("#back").addEventListener("click",(()=>{document.querySelector(".menu").classList.remove("menu_clicked")})),document.querySelector("#loadGame").addEventListener("click",(()=>{!function(){if(localStorage.getItem("savedGame")){document.querySelector(".menu").classList.remove("menu_clicked");const e=JSON.parse(localStorage.getItem("savedGame"));t=[],e.array.forEach((e=>t.push(+e))),r=e.minutes,i=e.seconds,o=e.savedMoves,n=e.grid,document.querySelector("body > div.drop_list").innerHTML="",S(),y(),l(),v()}else alert("Нету сохраненной игры")}(),y(),l()})),document.querySelector("#getField > select").onchange=function(){n=document.querySelector("#getField > select").value},document.querySelector("#restart").addEventListener("click",(()=>{document.querySelector(".menu").classList.remove("menu_clicked"),o=0,r=0,i=0,t=[],d=!1,document.querySelector("#sec").innerHTML=i,document.querySelector("#min").innerHTML=r,document.querySelector("body > div.drop_list").innerHTML="",S(),M(),y(),l(),v()})),document.querySelector("#saveGame").addEventListener("click",(()=>{document.querySelector(".menu").classList.remove("menu_clicked"),c.minutes=r,c.seconds=i,c.grid=n,c.savedMoves=o,c.array=[],document.querySelectorAll(".drop").forEach((e=>c.array.push(e.innerHTML)));const e=JSON.stringify(c);localStorage.setItem("savedGame",e)})),document.querySelector("#getBestScore").addEventListener("click",(()=>{document.querySelector(".topTen").classList.add("menu_clicked"),document.querySelector("body > div.topTen > div").innerHTML="",document.querySelector("body > div.topTen > div").insertAdjacentHTML("beforeend","<table></table>"),document.querySelector("body > div.topTen > div > table").insertAdjacentHTML("beforeend","<tr><td>Position</td><td>Name</td><td>Moves</td><td>Time</td></tr></>");const e=JSON.parse(localStorage.getItem("top"));let t=1;e.forEach((e=>{document.querySelector("body > div.topTen > div > table").insertAdjacentHTML("beforeend",`<tr><td>${t}</td><td>${e.nameScore}</td><td>${e.movesScore}</td><td>${e.timeScore}</td></tr></>`),t++}))})),document.querySelector("body > div.topTen").addEventListener("click",(()=>{document.querySelector("body > div.topTen").classList.remove("menu_clicked")})),document.querySelector("#min").innerHTML=r,document.querySelector("#sec").innerHTML=i,v(),M(),y(),l()}()})();