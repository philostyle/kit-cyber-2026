/* global React, ReactDOM */
const { useState, useEffect, useRef, useCallback, useMemo } = React;

const { CHAPTERS, ERRORS, RESOURCES, GLOSSARY } = window.KIT_DATA;
const STORAGE_KEY = "kit-cyber-checks-v1";

// Linkify domain names in text → clickable
const DOMAIN_RE = /\b((?:[a-z0-9-]+\.)+(?:com|fr|eu|org|net|io|gouv|me|app|tech|gov))(?:\.[a-z]{2,4})?\b/gi;
function Linkify({ text }) {
  if (!text) return null;
  const parts = [];
  let last = 0;
  text.replace(DOMAIN_RE, (m, _g, off) => {
    if (off > last) parts.push(text.slice(last, off));
    parts.push(<a key={off} href={"https://" + m} target="_blank" rel="noopener noreferrer" className="inline-link" onClick={(e) => e.stopPropagation()}>{m}</a>);
    last = off + m.length;
    return m;
  });
  if (last < text.length) parts.push(text.slice(last));
  return <>{parts}</>;
}

function Cover({ onEnter }) {
  return (
    <section className="cover" data-screen-label="00 Couverture" onClick={onEnter} style={{ cursor: 'pointer' }}>
      <header className="cover-top">
        <span className="stamp">KCS · ÉD. 01</span>
        <span className="page-num">01/13</span>
      </header>

      <div className="cover-center">
        <div className="cover-kit">Le</div>
        <h1 className="cover-big">
          KIT<br/>CYBER<br/><span className="ampersand">2026</span>
        </h1>
        <div className="cover-year">↳ ÉDITION 01 · 2026</div>
      </div>

      <footer className="cover-foot">
        <div className="cover-tagline">
          <div className="line promise">→ Le mode d'emploi qu'on aurait dû recevoir plus tôt</div>
          <div className="line">↳ Tout ce qui est connecté laisse une trace</div>
          <div className="line">↳ Ce qui est gratuit est souvent payé en données</div>
        </div>
        <div className="cover-bottom">
          <span className="author">Afifia Belabdoun</span>
          <span>ÉD. 01 · 2026</span>
        </div>
      </footer>
    </section>
  );
}

function Lexique() {
  return (
    <section className="lexique" id="lexique" data-screen-label="Lexique">
      <div className="ch-head">
        <span className="left">LEXIQUE</span>
        <span className="page-num">12/13</span>
      </div>
      <h2 className="ch-title">Le vocabulaire<span className="dot">.</span></h2>
      <p className="ch-lead">Le langage du numérique contemporain, sans jargon.</p>
      <dl className="lex-list">
        {GLOSSARY.map((g, i) => (
          <div className="lex-item" key={i}>
            <dt className="lex-term">{g.term}</dt>
            <dd className="lex-def"><span className="lex-arrow">→</span> {g.def}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function useChecks() {
  const [checks, setChecks] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    } catch {
      return {};
    }
  });
  const toggle = useCallback((id) => {
    setChecks((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);
  return [checks, toggle];
}

function useScrollProgress(scopeRef) {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const el = scopeRef.current;
    if (!el) return;
    const onScroll = () => {
      const max = el.scrollHeight - el.clientHeight;
      setPct(max > 0 ? Math.min(100, Math.max(0, (el.scrollTop / max) * 100)) : 0);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => el.removeEventListener("scroll", onScroll);
  }, [scopeRef]);
  return pct;
}

function TopBar({ progress }) {
  return (
    <div className="topbar">
      <div className="topbar-row">
        <div className="topbar-brand">
          <span className="dot"></span>
          <span>KCS · KIT CYBER</span>
        </div>
        <div className="topbar-meta">ÉD. 01 · 2026</div>
      </div>
      <div className="progress">
        <div className="progress-fill" style={{ width: progress + "%" }}></div>
      </div>
    </div>
  );
}

function Hero({ onJumpToc }) {
  return (
    <section className="hero" id="manifeste" data-screen-label="01 Manifeste">
      <div className="hero-meta">
        <span><b>↳ MANIFESTE</b></span>
        <span className="page-num">02/13</span>
      </div>
      <h1 className="hero-title">
        La plupart des données ne sont pas <span className="strike">volées</span>.
        <br /><em>Elles sont laissées ouvertes.</em>
      </h1>
      <p className="hero-sub">
        Un guide contemporain pour protéger son identité numérique.<br />
        Sans devenir expert.
      </p>
      <div className="hero-stats">
        <div className="hero-stat">
          <div className="hero-stat-num">24<span style={{ fontSize: "12px", marginLeft: "4px" }}>/jour</span></div>
          <div className="hero-stat-label">Fuites signalées à la CNIL</div>
        </div>
        <div className="hero-stat">
          <div className="hero-stat-num">27<span style={{ fontSize: "12px", marginLeft: "4px" }}>/sec</span></div>
          <div className="hero-stat-label">Comptes piratés dans le monde</div>
        </div>
      </div>
    </section>
  );
}

function Toc({ progressByChapter, onJump }) {
  return (
    <section className="toc" id="sommaire">
      <div className="ch-head">
        <span className="left">SOMMAIRE</span>
        <span className="page-num">03/13</span>
      </div>
      <h2 className="ch-title">Au programme<span className="dot">.</span></h2>
      <p className="ch-tag" style={{ marginTop: 18, marginBottom: 8 }}>8 chapitres. Coche au fur et à mesure, ta progression est sauvegardée.</p>
      <ul className="toc-list">
        {CHAPTERS.map((c) => {
          return (
            <li key={c.id}>
              <button className="toc-item" onClick={() => onJump(c.id)}>
                <span className="n">{c.num}</span>
                <span className="t">{c.title.replace(".", "")}</span>
                <span className="meta">→</span>
              </button>
            </li>
          );
        })}
        <li>
          <button className="toc-item" onClick={() => onJump("erreurs")}>
            <span className="n">08</span>
            <span className="t">12 pièges à éviter</span>
            <span className="meta">→</span>
          </button>
        </li>
        <li>
          <button className="toc-item" onClick={() => onJump("lexique")}>
            <span className="n">★</span>
            <span className="t">Lexique</span>
            <span className="meta">→</span>
          </button>
        </li>
        <li>
          <button className="toc-item" onClick={() => onJump("ressources")}>
            <span className="n">★</span>
            <span className="t">Ressources</span>
            <span className="meta">→</span>
          </button>
        </li>
      </ul>
    </section>
  );
}

function Action({ a, checked, onToggle }) {
  const tagAttr =
    a.when.startsWith("AUJOURD") ? "aujourd" :
    a.when.startsWith("BONUS") ? "bonus" : "semaine";
  return (
    <div className={"action" + (checked ? " done" : "")} onClick={onToggle} role="button" aria-pressed={!!checked}>
      <span className="action-check" aria-hidden="true"></span>
      <div className="action-body">
        <div className="action-head">
          <h4 className="action-title">{a.title}</h4>
          <span className="action-when" data-w={tagAttr}>{a.when}</span>
        </div>
        <p className="action-desc"><Linkify text={a.desc} /></p>
        {a.time && <div className="action-time">⏱ {a.time}</div>}
      </div>
    </div>
  );
}

function Callout({ c }) {
  return (
    <div className={"callout " + (c.kind || "")}>
      <div className="callout-label">{c.kind === "warn" ? "⚠ " : ""}{c.label}</div>
      <div className="callout-body">{c.body}</div>
    </div>
  );
}

function Compare({ items }) {
  return (
    <div className="compare">
      {items.map((it, i) => (
        <div className="compare-cell" key={i}>
          <div className={"compare-tag " + it.kind}>{it.kind === "bad" ? "✗ " : "✓ "}{it.tag} · {it.label}</div>
          <div className="compare-body">{it.body}</div>
        </div>
      ))}
    </div>
  );
}

function Chapter({ c, checks, toggle, idx, totalCh }) {
  const chapterPage = String(parseInt(c.num, 10) + 3).padStart(2, '0');
  return (
    <section className={"chapter " + (c.variant || "")} id={c.id} data-screen-label={c.num + " " + c.title.replace(".", "")}>
      <div className="ch-head">
        <span className="left">{c.num} · {c.tag}</span>
        <span className="page-num">{chapterPage}/12</span>
      </div>
      <h2 className="ch-title">{c.title.split(".")[0]}<span className="dot">.</span></h2>
      <p className="ch-lead">{c.lead}</p>

      {c.scenario && (
        <div className="callout">
          <div className="callout-label">↳ SCÉNARIO</div>
          <div className="callout-body">{c.scenario}</div>
        </div>
      )}

      {c.compare && <Compare items={c.compare} />}

      {c.pull && <div className="pull-quote">{c.pull}</div>}

      {c.callouts && c.callouts.map((co, i) => <Callout key={i} c={co} />)}

      <div style={{ marginTop: 32 }}>
        {c.actions.map((a) => (
          <Action key={a.id} a={a} checked={!!checks[a.id]} onToggle={() => toggle(a.id)} />
        ))}
      </div>
    </section>
  );
}

function Errors() {
  const groups = [
    { label: "I · Identifiants & accès", indices: [0, 3, 7] },
    { label: "II · Comportements", indices: [1, 4, 5, 11] },
    { label: "III · Données & réseaux", indices: [2, 6, 8, 9, 10] }
  ];
  return (
    <section className="errors" id="erreurs" data-screen-label="08 Pièges">
      <div className="ch-head">
        <span className="left">08 · PIÈGES</span>
        <span className="page-num">11/13</span>
      </div>
      <h2 className="ch-title">À ne pas faire<span className="dot">.</span></h2>
      <p className="ch-lead">Chaque erreur semble anodine, prise séparément. Mises bout à bout, elles dessinent une vie numérique entièrement ouverte.</p>
      <div className="err-meta">
        <span><b>12</b> erreurs</span>
        <span className="rule"></span>
        <span>3 catégories</span>
      </div>
      {groups.map((g, gi) => (
        <div key={gi}>
          <div className="err-group-label">{g.label}</div>
          <ul className="error-list">
            {g.indices.map((i) => (
              <li className="error-item" key={i}>
                <span className="error-n">{String(i + 1).padStart(2, "0")}</span>
                <div className="error-txt">
                  {ERRORS[i].txt}
                  <span className="why">{ERRORS[i].why}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}

function Resources() {
  return (
    <section className="resources" id="ressources" data-screen-label="Ressources">
      <div className="ch-head">
        <span className="left">ANNEXE · RESSOURCES</span>
        <span className="page-num">13/13</span>
      </div>
      <h2 className="ch-title">Ressources<span className="dot">.</span></h2>
      <p className="ch-lead">Outils, services et points de signalement. Tous gratuits, tous vérifiés.</p>
      <div className="res-meta">
        <span><b>{RESOURCES.reduce((s, g) => s + g.links.length, 0)}</b> liens</span>
        <span className="rule"></span>
        <span>{RESOURCES.length} catégories</span>
      </div>
      {RESOURCES.map((g, i) => (
        <div className="res-group" key={i}>
          <span className="res-num">{String(i + 1).padStart(2, "0")}</span>
          <div>
            <div className="res-tag">{g.tag}</div>
            <div className="res-links">
              {g.links.map((l) => (
                <a className="res-link" key={l} href={"https://" + l} target="_blank" rel="noopener noreferrer">{l}</a>
              ))}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

function Download() {
  return (
    <section className="download" id="telecharger" data-screen-label="Téléchargement">
      <div className="ch-head">
        <span className="left">TÉLÉCHARGEMENT</span>
        <span className="page-num">PDF</span>
      </div>
      <h2 className="ch-title">Emporter le kit<span className="dot">.</span></h2>
      <p className="ch-lead">Deux formats statiques, à archiver ou partager hors-ligne. Le web reste la version vivante.</p>
      <div className="dl-grid">
        <a className="dl-card" href="downloads/kit-cyber-mobile.pdf" download data-analytics="download-mobile">
          <div className="dl-card-head">
            <span className="dl-format">Mobile</span>
            <span className="dl-arrow">↓</span>
          </div>
          <div className="dl-title">Vertical 9:16</div>
          <div className="dl-meta">Format portrait · une page par section</div>
        </a>
        <a className="dl-card" href="downloads/kit-cyber-desktop.pdf" download data-analytics="download-desktop">
          <div className="dl-card-head">
            <span className="dl-format">Desktop</span>
            <span className="dl-arrow">↓</span>
          </div>
          <div className="dl-title">A4 paysage</div>
          <div className="dl-meta">Format éditorial · mise en page large</div>
        </a>
      </div>
    </section>
  );
}

function Footer({ onShare }) {
  return (
    <section className="footer" data-screen-label="Fin">
      <p className="pull">
        « La cybersécurité n'est pas un sujet d'experts.<br />
        <em>C'est un sujet de société. »</em>
      </p>
      <div className="footer-grid">
        <button className="share-btn" onClick={onShare}>
          <span>↳ Partager le kit</span>
          <span>→</span>
        </button>
      </div>
      <div className="footer-meta" style={{ marginTop: 40 }}>
        <span>Libre de partage</span>
        <span>Afifia Belabdoun</span>
      </div>
      <div className="footer-meta" style={{ marginTop: 12, borderTop: 0, paddingTop: 0 }}>
        <span>KCS · Éd. 01</span>
        <span>2026</span>
      </div>
    </section>
  );
}

function App({ scrollRef }) {
  const [checks, toggle] = useChecks();
  const [showPill, setShowPill] = useState(false);
  const lastDone = useRef(0);

  const progress = useScrollProgress(scrollRef);

  const progressByChapter = useMemo(() => {
    const map = {};
    CHAPTERS.forEach((c) => {
      map[c.id] = {
        done: c.actions.filter((a) => checks[a.id]).length,
        total: c.actions.length,
      };
    });
    return map;
  }, [checks]);

  const totalAll = useMemo(
    () => CHAPTERS.reduce((s, c) => s + c.actions.length, 0),
    []
  );
  const totalDone = useMemo(
    () => Object.entries(checks).filter(([_, v]) => v).length,
    [checks]
  );

  // Show pill when user checks something
  useEffect(() => {
    if (totalDone > lastDone.current) {
      setShowPill(true);
      const t = setTimeout(() => setShowPill(false), 2200);
      return () => clearTimeout(t);
    }
    lastDone.current = totalDone;
  }, [totalDone]);

  const jump = useCallback((id) => {
    const el = document.getElementById(id);
    if (el && scrollRef.current) {
      const top = el.offsetTop - 50;
      scrollRef.current.scrollTo({ top, behavior: "smooth" });
    }
  }, [scrollRef]);

  const share = useCallback(async () => {
    const url = window.location.href;
    if (navigator.share) {
      try { await navigator.share({ title: "Kit Cyber 2026", text: "35 gestes simples pour protéger sa vie numérique", url }); } catch {}
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      alert("Lien copié.");
    }
  }, []);

  return (
    <div className="app">
      <TopBar progress={progress} />
      <Cover onEnter={() => jump("manifeste")} />
      <Hero onJumpToc={() => jump("sommaire")} />
      <Toc progressByChapter={progressByChapter} onJump={jump} />
      {CHAPTERS.map((c, i) => (
        <Chapter key={c.id} c={c} checks={checks} toggle={toggle} idx={i} totalCh={CHAPTERS.length} />
      ))}
      <Errors />
      <Lexique />
      <Resources />
      <Download />
      <Footer onShare={share} />
      <div className={"done-pill " + (showPill ? "show" : "")}>
        <span className="dot"></span>
        <span>{totalDone}/{totalAll} cochées</span>
      </div>
    </div>
  );
}

window.KitApp = App;
