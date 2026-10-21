const $=s=>document.querySelector(s);
const G=document.body.dataset.genero||"";

/* MENU */
const menu=$("#menu"),veu=$("#veu");
function menuAlternar(f){const a=f??!menu.classList.contains("ativo");menu.classList.toggle("ativo",a);veu.classList.toggle("ativo",a);$(".botao-menu").setAttribute("aria-expanded",a)}
$(".botao-menu").onclick=()=>menuAlternar();veu.onclick=()=>menuAlternar(false);
document.addEventListener("keydown",e=>{if(e.key==="Escape")menuAlternar(false)});
menu.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>menuAlternar(false)));

/* PROGRESSO + VOLTAR AO TOPO */
const prog=$("#progresso"),subir=$("#subir");
addEventListener("scroll",()=>{const h=document.documentElement;prog.style.width=(h.scrollTop/(h.scrollHeight-h.clientHeight||1)*100)+"%";subir.classList.toggle("ver",h.scrollTop>600)});
subir.onclick=()=>scrollTo({top:0,behavior:"smooth"});

/* DADOS */
const ISTS=[
{n:"HIV/Aids",s:"Febre, cansaço, ínguas e perda de peso; pode ficar anos sem sintomas.",t:"Antirretrovirais gratuitos pelo SUS. Com carga viral indetectável, não há transmissão sexual.",g:"mf"},
{n:"Sífilis",s:"Ferida indolor na região genital, depois manchas no corpo (inclusive palmas e plantas).",t:"Curável com penicilina benzatina. Na gravidez, o tratamento evita a sífilis congênita.",g:"mf"},
{n:"Gonorreia",s:"Ardência ao urinar e secreção (corrimento) amarelada. Em mulheres, costuma ser silenciosa.",t:"Antibióticos, com tratamento do(a) parceiro(a).",g:"mf"},
{n:"Clamídia",s:"Secreção, dor ao urinar e dor pélvica; muitas vezes não dá sintomas.",t:"Antibióticos. Sem tratamento, pode causar infertilidade, principalmente em mulheres.",g:"mf"},
{n:"HPV",s:"Verrugas genitais; alguns tipos podem causar câncer (colo do útero, pênis, ânus, garganta).",t:"Verrugas têm tratamento local. A vacina previne os tipos mais perigosos.",g:"mf"},
{n:"Herpes genital",s:"Bolhas ou feridas dolorosas que vêm e voltam, com ardor e coceira.",t:"Antivirais controlam as crises, mas o vírus permanece no corpo.",g:"mf"},
{n:"Hepatites B e C",s:"Cansaço, pele e olhos amarelados, urina escura; muitas vezes sem sintomas.",t:"Hepatite B tem vacina. A hepatite C tem cura com medicamentos do SUS.",g:"mf"},
{n:"Tricomoníase",s:"Corrimento amarelo-esverdeado com odor e coceira (mulheres); ardência ao urinar (homens).",t:"Antiparasitário, para o casal ao mesmo tempo.",g:"mf"}
];
const FAQ={
m:[["Preciso de exame se não sinto nada?","Sim. Várias ISTs não dão sintomas por meses ou anos. Após sexo sem preservativo, faça testagem; os testes rápidos do SUS ficam prontos em cerca de 30 minutos."],
["Secreção ou ardência ao urinar é sempre IST?","Não, mas é um sinal de alerta. Pode ser uretrite por gonorreia ou clamídia, ou outra infecção. Procure atendimento antes de tomar qualquer antibiótico por conta própria."],
["O preservativo protege contra tudo?","Protege muito contra HIV, gonorreia, clamídia e sífilis. HPV e herpes também se transmitem pelo contato com a pele fora da área coberta, por isso a vacina do HPV é importante."],
["O que é PEP?","É a profilaxia pós-exposição: medicamentos contra o HIV tomados em até 72 horas depois de uma situação de risco. Procure um serviço de saúde o quanto antes."],
["Homens também devem tomar a vacina do HPV?","Sim. O SUS oferece a vacina para meninos e adolescentes e para alguns grupos prioritários. Pergunte na sua unidade de saúde."]],
f:[["Com que frequência fazer o Papanicolau?","Pelas diretrizes do Ministério da Saúde, mulheres de 25 a 64 anos que já iniciaram a vida sexual devem fazer o exame a cada 3 anos, depois de dois resultados normais seguidos no intervalo de 1 ano."],
["Corrimento é sempre IST?","Não. Existe corrimento normal, que muda ao longo do ciclo. Procure atendimento se houver mudança de cor, cheiro, coceira ou dor."],
["IST na gravidez é perigosa?","Pode ser. Sífilis, HIV e hepatite B podem passar para o bebê. Por isso o pré-natal inclui testes, e o tratamento correto protege o bebê."],
["A pílula anticoncepcional protege contra ISTs?","Não. Ela previne a gravidez, mas não protege contra ISTs. Só o preservativo (masculino ou interno) faz essa proteção."],
["O que é o preservativo interno?","É uma capa macia que a mulher coloca na vagina antes da relação. Ele também protege contra ISTs e é distribuído gratuitamente pelo SUS."]]
};
const QUIZ=[
{p:"Só quem tem muitos parceiros pega IST.",v:false,e:"Mito. Uma única relação desprotegida com uma pessoa infectada basta."},
{p:"Muitas ISTs não causam sintomas.",v:true,e:"Verdade. Por isso a testagem periódica é tão importante."},
{p:"Dá para pegar HIV com abraço, beijo ou talheres.",v:false,e:"Mito. O HIV não se transmite pelo convívio social."},
{p:"A vacina contra o HPV ajuda a prevenir alguns tipos de câncer.",v:true,e:"Verdade. Ela protege contra os tipos mais ligados ao câncer."},
{p:"Sexo oral não transmite IST.",v:false,e:"Mito. Sífilis, herpes, gonorreia e HPV podem ser transmitidos por sexo oral."},
{p:"A hepatite C tem cura.",v:true,e:"Verdade. O tratamento com antivirais é oferecido pelo SUS."}
];
const CHECK={m:["Fiz testagem para HIV, sífilis e hepatites no último ano","Uso preservativo em todas as relações","Minha vacinação de hepatite B e HPV está em dia","Conversei com meu parceiro sobre testagem","Observo mudanças na pele, secreções ou dor ao urinar","Sei onde buscar PEP e PrEP"],
f:["Fiz testagem para HIV, sífilis e hepatites no último ano","Uso preservativo em todas as relações","Meu Papanicolau está em dia","Minha vacinação de hepatite B e HPV está em dia","Faço consulta ginecológica regularmente","Sei onde buscar PEP e PrEP"]};

/* IST: cartões com busca */
const lista=$("#ists");
if(lista){
  const montar=t=>{lista.innerHTML=ISTS.filter(i=>(i.n+i.s+i.t).toLowerCase().includes(t)).map(i=>`<article class="cartao"><h3>${i.n}</h3><p><b>Sinais:</b> ${i.s}</p><p><b>Cuidado:</b> ${i.t}</p></article>`).join("")||"<p>Nenhuma IST encontrada. Tente outro termo, como “corrimento” ou “vacina”.</p>"};
  montar("");$("#busca").oninput=e=>montar(e.target.value.toLowerCase().trim());
}

/* FAQ */
const faq=$("#faq");
if(faq&&FAQ[G])faq.innerHTML=FAQ[G].map(([q,a])=>`<details><summary>${q}</summary><p>${a}</p></details>`).join("");

/* QUIZ */
const quiz=$("#quiz");
if(quiz){
  let i=0,pts=0,lista2=[...QUIZ].sort(()=>Math.random()-.5).slice(0,5);
  const ver=()=>{
    if(i>=lista2.length){quiz.innerHTML=`<p class="quiz-q">Você acertou ${pts} de ${lista2.length}. ${pts>=4?"Muito bem informado(a)!":"Revise as seções acima e tente de novo."}</p><button class="btn" id="de-novo">Jogar de novo</button>`;$("#de-novo").onclick=()=>{i=0;pts=0;lista2.sort(()=>Math.random()-.5);ver()};return}
    quiz.innerHTML=`<p>Pergunta ${i+1} de ${lista2.length}</p><p class="quiz-q">“${lista2[i].p}”</p><div class="botoes"><button class="btn" data-r="1">Verdade</button><button class="btn" data-r="0">Mito</button></div><div class="feedback" aria-live="polite"></div>`;
    quiz.querySelectorAll("[data-r]").forEach(b=>b.onclick=()=>{
      const ok=(b.dataset.r==="1")===lista2[i].v;if(ok)pts++;
      quiz.querySelectorAll("[data-r]").forEach(x=>x.disabled=true);
      quiz.querySelector(".feedback").innerHTML=`<p><b>${ok?"Acertou!":"Não foi dessa vez."}</b> ${lista2[i].e}</p><button class="btn" id="prox">Próxima</button>`;
      $("#prox").onclick=()=>{i++;ver()};
    });
  };ver();
}

/* CHECKLIST (salva no navegador) */
const ck=$("#check");
if(ck&&CHECK[G]){
  let salvo=[];try{salvo=JSON.parse(localStorage.getItem("ck-"+G)||"[]")}catch(e){}
  ck.innerHTML=`<div class="lista-check">${CHECK[G].map((t,n)=>`<label><input type="checkbox" data-n="${n}" ${salvo.includes(n)?"checked":""}><span>${t}</span></label>`).join("")}</div><div class="barra"><i></i></div><p id="ck-txt"></p>`;
  const atualizar=()=>{const m=[...ck.querySelectorAll("input:checked")].map(x=>+x.dataset.n);try{localStorage.setItem("ck-"+G,JSON.stringify(m))}catch(e){}
    ck.querySelector(".barra i").style.width=m.length/CHECK[G].length*100+"%";$("#ck-txt").textContent=`${m.length} de ${CHECK[G].length} cuidados em dia`};
  ck.querySelectorAll("input").forEach(x=>x.onchange=atualizar);atualizar();
}

/* PODCAST */
const pl=$(".player");
if(pl){
  const id=pl.dataset.yt;
  if(!id||id.includes("SEU_ID")){pl.outerHTML='<div class="aviso">O podcast desta página ainda não foi publicado. Troque <b>SEU_ID_AQUI</b> no arquivo HTML pelo ID do vídeo do YouTube.</div>'}
  else{
    pl.innerHTML=`<iframe src="https://www.youtube.com/embed/${id}?rel=0&modestbranding=1" title="Podcast" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>`;
    if(location.protocol==="file:")pl.insertAdjacentHTML("beforebegin",'<div class="aviso"><b>Atenção:</b> o vídeo não carrega quando a página é aberta direto do arquivo (erro 153). Use o Live Server do VS Code ou hospede o site (GitHub Pages, Netlify).</div>');
  }
}
