
(function () {
  const norm = s =>
    s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  const AJUDA = 'Procure uma <b>UBS</b> ou ligue para o <b>Disque Saúde 136</b>.';

  const KB = [
    { k: [" oi ", " ola ", "bom dia", "boa tarde", "boa noite", " e ai "], r: "<p>Oi! Eu sou a Caren 💜 Posso explicar sobre ISTs, prevenção, testes e onde buscar ajuda. Escolha uma sugestão ou escreva sua dúvida.</p>" },
    { k: ["obrigad", "valeu", "brigad"], r: "<p>Por nada! Se surgir outra dúvida, é só perguntar.</p>" },
    { k: ["o que e ist", "o que sao ist", "significa ist", "ist ou dst", " dst "], r: "<p>IST significa <b>Infecção Sexualmente Transmissível</b>. Antes se usava DST, mas IST é o termo atual porque uma pessoa pode ter a infecção sem desenvolver doença nem sintomas.</p>" },
    { k: ["sintoma", "sinal", "como sei", "como saber", "tenho ist", "suspeita"], r: "<p>Os sinais mais comuns são <b>corrimento ou secreção</b>, ardência ao urinar, feridas, verrugas, coceira, dor na relação e ínguas na virilha.</p><p>Mas muitas ISTs <b>não dão sintoma</b>. A única forma de ter certeza é testando, e não consigo diagnosticar por aqui. " + AJUDA + "</p>" },
    { k: ["sem sintoma", "assintomatic", "nao sinto nada", "nao tenho nada"], r: "<p>Várias ISTs, como HIV, clamídia, sífilis e hepatites, podem ficar meses ou anos sem sintomas. Por isso o teste é importante mesmo sem sentir nada.</p>" },
    { k: ["teste", "exame", "testar", "onde fazer", "onde faco", "testagem", "cta"], r: "<p>O <b>SUS faz testes rápidos gratuitos</b> de HIV, sífilis e hepatites B e C. O resultado sai em cerca de 30 minutos.</p><p>Vá a uma <b>UBS</b> ou a um <b>CTA</b> da sua cidade. Não precisa de pedido médico.</p>" },
    { k: ["prevenir", "prevencao", "previne", "me proteger", "proteger", "evitar"], r: "<p>Os principais cuidados são:</p><p>• <b>Preservativo</b> em toda relação<br>• <b>Vacinas</b> de HPV e hepatite B<br>• <b>Testagem</b> regular<br>• <b>PrEP</b> e <b>PEP</b>, quando indicadas<br>• Conversar com o parceiro ou a parceira</p>" },
    { k: ["camisinha", "preservativo", "usar camisinha", "como usar"], r: "<p>Use <b>do começo ao fim</b> da relação, inclusive no sexo oral e anal. Confira a validade, abra com os dedos (nunca com dente ou tesoura) e use <b>uma camisinha nova</b> a cada relação. Não use duas ao mesmo tempo. É gratuita no SUS.</p>" },
    { k: ["interna", "feminina camisinha", "camisinha feminina"], r: "<p>O <b>preservativo interno</b> é uma capa macia colocada na vagina (ou no ânus) antes da relação. Também protege contra ISTs e gravidez, e o SUS distribui de graça.</p>" },
    { k: ["prep", "pre exposicao", "pre-exposicao"], r: "<p>A <b>PrEP</b> é um comprimido tomado antes da exposição ao HIV, para quem tem maior chance de se expor. É oferecida pelo SUS. Ela <b>não protege</b> contra outras ISTs, então a camisinha continua importante.</p>" },
    { k: ["pep", "pos exposicao", "pos-exposicao", "risco", "camisinha estourou", "estourou", "rompeu", "sem camisinha"], r: "<p>A <b>PEP</b> é um tratamento para evitar o HIV após uma situação de risco. Precisa começar <b>o quanto antes, em até 72 horas</b>. Procure agora uma UBS, UPA ou pronto-atendimento.</p>" },
    { k: ["vacina", "vacinar", "imuniz"], r: "<p>Existem vacinas contra <b>HPV</b> e <b>hepatite B</b>. O SUS oferece a de HPV para pessoas nos grupos e idades indicados. Leve a caderneta de vacinação à UBS para conferir a sua situação.</p>" },
    { k: ["hiv", "aids", "soropositiv", "indetectavel"], r: "<p>O <b>HIV</b> ataca o sistema de defesa do corpo. Não tem cura, mas o tratamento gratuito do SUS permite viver com saúde. Quem mantém a <b>carga viral indetectável</b> não transmite o HIV pelo sexo.</p><p>Não se transmite por abraço, beijo no rosto, talheres ou banheiro.</p>" },
    { k: ["sifilis"], r: "<p>A <b>sífilis</b> começa com uma ferida geralmente indolor e pode evoluir com manchas pelo corpo. <b>Tem cura</b> com tratamento adequado. Na gravidez, o tratamento evita a sífilis congênita no bebê.</p>" },
    { k: ["hpv", "verruga", "crista de galo"], r: "<p>O <b>HPV</b> pode causar verrugas genitais e alguns tipos levam a câncer. A <b>vacina</b> previne os tipos mais perigosos, e o exame preventivo do colo do útero detecta alterações.</p>" },
    { k: ["herpes"], r: "<p>O <b>herpes genital</b> causa bolhas ou feridas dolorosas que vêm e voltam. Não tem cura, mas os antivirais controlam as crises. Pode ser transmitido mesmo sem feridas visíveis.</p>" },
    { k: ["gonorreia", "clamidia", "uretrite"], r: "<p><b>Gonorreia</b> e <b>clamídia</b> podem causar secreção e ardência ao urinar, mas muitas vezes não dão sintomas. <b>Têm cura</b> com antibióticos receitados por profissional. Sem tratamento, podem afetar a fertilidade.</p>" },
    { k: ["hepatite"], r: "<p>As <b>hepatites B e C</b> atacam o fígado e podem não dar sintomas. A hepatite B tem <b>vacina</b>. A hepatite C tem <b>cura</b> com medicamentos disponíveis no SUS.</p>" },
    { k: ["tricomon"], r: "<p>A <b>tricomoníase</b> pode causar corrimento, odor, coceira ou ardência. Tem tratamento, e os parceiros sexuais também podem precisar ser tratados. Procure uma unidade de saúde.</p>" },
    { k: ["corrimento", "secrecao", "coceira", "cheiro"], r: "<p>Existe corrimento normal, que muda ao longo do ciclo. Mas cor diferente, cheiro forte, coceira ou dor pedem avaliação, pois podem ser IST ou outra infecção. Evite se automedicar. " + AJUDA + "</p>" },
    { k: ["papanicolau", "preventivo", "colo do utero", "ginecolog"], r: "<p>O exame preventivo do colo do útero detecta alterações que podem indicar risco de câncer. Procure a UBS para saber qual exame e intervalo são indicados para você.</p>" },
    { k: ["gravidez", "gravida", "gestante", "bebe", "pre natal", "pre-natal"], r: "<p>Sífilis, HIV e hepatite B podem passar da mãe para o bebê. Por isso o <b>pré-natal</b> inclui testes, e o tratamento durante a gestação protege o bebê. Se estiver grávida ou planejando, procure sua UBS.</p>" },
    { k: ["oral", "boca", "sexo oral"], r: "<p>Sim, o <b>sexo oral</b> pode transmitir sífilis, herpes, gonorreia e HPV. Preservativo ou barreira de látex reduz o risco.</p>" },
    { k: ["pilula", "anticoncepcional", "diu", "contraceptivo"], r: "<p>Pílula, DIU e injeção previnem a gravidez, mas <b>não protegem contra IST</b>. O preservativo ajuda a prevenir ISTs e também pode evitar gravidez.</p>" },
    { k: ["cura", "curar", "tem cura", "trat"], r: "<p>Algumas ISTs, como sífilis, gonorreia e clamídia, têm cura com tratamento adequado. HIV e herpes não têm cura atualmente, mas existem tratamentos eficazes. Procure um profissional de saúde.</p>" },
    { k: ["estupro", "violencia", "abuso", "forcad", "assedi"], r: "<p>Sinto muito que isso possa ter acontecido. Você não tem culpa. 💜</p><p>Procure <b>atendimento de saúde o quanto antes</b>. A PEP para prevenir HIV precisa ser iniciada em até 72 horas. Ligue para o <b>180</b> ou <b>100</b> para orientação. Em perigo imediato, ligue <b>190</b>.</p>" },
    { k: ["beijo", "abraco", "vaso", "banheiro", "talher", "pega"], r: "<p>Abraço, beijo no rosto, talheres, banheiro e piscina não transmitem HIV. Algumas ISTs podem passar por contato direto com lesões, inclusive durante beijos, dependendo da infecção.</p>" },
    { k: ["quem sao", "caren", "voce", "bot"], r: "<p>Sou a <b>Caren</b>, assistente virtual deste site. Respondo com informações educativas prontas, <b>não substituo</b> uma consulta e não faço diagnóstico.</p>" }
  ];

  const SUG = [
    "Quais os sintomas?",
    "Onde fazer teste?",
    "O que é PrEP?",
    "Como usar camisinha?",
    "Tem cura?"
  ];

  // IMAGEM ATUALIZADA: caren.png
  const html = `
    <button id="caren-btn" aria-expanded="false" aria-controls="caren">
      <img src="caren.png" alt="CarenBOT">
      <span>Caren ChatBot</span>
    </button>

    <section id="caren" role="dialog" aria-label="Caren ChatBot">
      <div class="c-topo">
        <img src="caren.png" alt="CarenBOT">
        <div>
          <b>Caren ChatBot</b>
          <small>Tira-dúvidas sobre ISTs</small>
        </div>
        <button id="c-x" aria-label="Fechar chat">×</button>
      </div>

      <div id="c-msgs" aria-live="polite"></div>
      <div class="c-sug" id="c-sug"></div>

      <form id="c-form">
        <input id="c-in" placeholder="Digite sua dúvida" autocomplete="off" aria-label="Sua dúvida">
        <button type="submit">Enviar</button>
      </form>
    </section>
  `;

  document.body.insertAdjacentHTML("beforeend", html);

  const $ = s => document.querySelector(s);
  const box = $("#caren");
  const btn = $("#caren-btn");
  const msgs = $("#c-msgs");

  let iniciou = false;

  function add(t, c, h) {
    const d = document.createElement("div");
    d.className = "c-m " + c;

    if (h) {
      d.innerHTML = t;
    } else {
      d.textContent = t;
    }

    msgs.appendChild(d);
    msgs.scrollTop = msgs.scrollHeight;
  }

  function responder(q) {
    const n = " " + norm(q).replace(/[^a-z0-9 ]/g, " ") + " ";
    let best = null;
    let sc = 0;

    KB.forEach(e => {
      const s = e.k
        .filter(k => n.includes(norm(k)))
        .reduce((a, k) => a + k.length, 0);

      if (s > sc) {
        sc = s;
        best = e;
      }
    });

    if (best) {
      add(best.r, "c-bot", true);
    } else {
      add(
        "<p>Não encontrei essa resposta pronta. 😕 Tente perguntar sobre sintomas, teste, prevenção, vacina, PrEP, PEP ou uma IST específica. Para dúvidas pessoais, procure uma UBS ou um profissional de saúde.</p>",
        "c-bot",
        true
      );
    }
  }

  function enviar(q) {
    q = q.trim();

    if (!q) return;

    add(q, "c-eu");

    setTimeout(() => responder(q), 350);
  }

  function abrir(a) {
    box.classList.toggle("aberto", a);
    btn.setAttribute("aria-expanded", a);

    if (a && !iniciou) {
      iniciou = true;

      add(
        "<p>Oi! Eu sou a <b>Caren</b> 💜 Tiro dúvidas sobre ISTs, prevenção e testes. Não faço diagnóstico; para isso, procure um profissional de saúde.</p>",
        "c-bot",
        true
      );
    }

    if (a) $("#c-in").focus();
  }

  $("#c-sug").innerHTML = SUG
    .map(s => `<button type="button">${s}</button>`)
    .join("");

  $("#c-sug").onclick = e => {
    if (e.target.tagName === "BUTTON") {
      enviar(e.target.textContent);
    }
  };

  $("#c-form").onsubmit = e => {
    e.preventDefault();
    enviar($("#c-in").value);
    $("#c-in").value = "";
  };

  btn.onclick = () => abrir(!box.classList.contains("aberto"));

  $("#c-x").onclick = () => {
    abrir(false);
    btn.focus();
  };

  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && box.classList.contains("aberto")) {
      abrir(false);
    }
  });
})();
