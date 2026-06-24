/* =========================================================
   KAPIL GADHIRE PORTFOLIO  /  main.js
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------- footer year ---------------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------------- mobile nav ---------------- */
  const navToggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', () => {
      const open = mobileMenu.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------------- REC timer in hero frame ---------------- */
  const recTimer = document.getElementById('recTimer');
  if (recTimer) {
    const start = Date.now();
    const pad = n => String(n).padStart(2, '0');
    const tick = () => {
      const elapsed = Math.floor((Date.now() - start) / 1000);
      const h = pad(Math.floor(elapsed / 3600));
      const m = pad(Math.floor((elapsed % 3600) / 60));
      const s = pad(elapsed % 60);
      recTimer.textContent = `${h}:${m}:${s}`;
    };
    tick();
    setInterval(tick, 1000);
  }

  /* ---------------- seamless ticker loop ---------------- */
  const tickerTrack = document.getElementById('tickerTrack');
  if (tickerTrack) {
    tickerTrack.innerHTML += tickerTrack.innerHTML;
  }

  /* =========================================================
     FLOATING KEYWORD FIELD  (Capabilities section)
     ========================================================= */
  const keywords = [
    'B2B SaaS Marketing', 'GTM Strategy & Execution', 'Demand Generation',
    'Pipeline Attribution', 'Product Marketing', 'Account-Based Marketing (ABM)',
    'Product-Led Growth (PLG)', 'Revenue Marketing', 'Events-Led Pipeline Generation',
    'Marketing Automation', 'Content Marketing Strategy', 'SEO & Digital Marketing',
    'Team Leadership & Mentoring', 'Marketing Budget Management', 'Brand Positioning',
    'International Market Expansion', 'HubSpot / Salesforce / Marketo',
    'MQL/SQL Optimisation', 'TAM Analysis & Market Research', 'Data Analytics',
    'AI Tools Power User (Claude, ChatGPT)', 'Prompt Engineering',
    'AI-Augmented Marketing Workflows'
  ];
  const accentWords = new Set([
    'Data Analytics', 'AI Tools Power User (Claude, ChatGPT)',
    'Prompt Engineering', 'AI-Augmented Marketing Workflows', 'Pipeline Attribution'
  ]);

  const field = document.getElementById('keywordField');
  if (field) {
    keywords.forEach((word, i) => {
      const pill = document.createElement('span');
      pill.className = 'kw-pill' + (accentWords.has(word) ? ' accent' : '');
      pill.textContent = word;
      const duration = (4 + Math.random() * 3.5).toFixed(2);   // 4s - 7.5s
      const delay = (Math.random() * -6).toFixed(2);           // desync start points
      pill.style.animationDuration = `${duration}s`;
      pill.style.animationDelay = `${delay}s`;
      field.appendChild(pill);
    });
  }

  /* =========================================================
     CAREER TIMELINE  (Journey section)
     ========================================================= */
  const events = [
    {
      type: 'education',
      start: [2008, 7], end: [2012, 6],
      role: 'B.E., Information Technology',
      company: 'University of Mumbai · Sardar Patel Institute of Technology',
      summary: 'Where it started: an engineering degree that pointed straight at data, before marketing ever entered the picture.'
    },
    {
      type: 'job',
      start: [2012, 6], end: [2015, 5],
      role: 'Senior Business Analyst',
      company: 'Fractal Analytics',
      summary: 'Delivered data-driven consumer insights for Colgate-Palmolive Brazil and automated report generation, cutting turnaround from 3 days to 1 hour.'
    },
    {
      type: 'job',
      start: [2015, 5], end: [2019, 3],
      role: 'Marketing Lead',
      company: 'AthenasOwl by Quantiphi',
      summary: 'Directed B2B marketing across a $2M annual budget, improving event lead quality from 10% to 65% and building AthenasOwl into a recognised media-AI thought leader.'
    },
    {
      type: 'job',
      start: [2019, 3], end: [2021, 3],
      role: 'Marketing Manager',
      company: 'Engagely by Exponentia.ai',
      summary: 'Delivered 1,400+ MQLs in 14 months through a multi-channel demand engine, and led a full brand revamp across Exponentia.ai and Engagely.ai.'
    },
    {
      type: 'job',
      start: [2021, 3], end: [2022, 9],
      role: 'Product Growth Lead & Founding Member',
      company: 'Boltic by Fynd (Jio)',
      summary: 'Took Boltic to #1 Product of the Day on Product Hunt and stood up its first product-led growth motion from the ground up.'
    },
    {
      type: 'job',
      start: [2022, 9], end: null,
      role: 'Head of Marketing',
      company: 'Videoverse / Magnifi.ai',
      summary: 'Running global marketing on a $1M budget and a 10-person team. 50+ events have generated $18M in revenue pipeline, about half of total revenue.',
      live: true
    }
  ];

  const track = document.getElementById('timelineTrack');
  const ruler = document.getElementById('timelineRuler');
  const detail = document.getElementById('timelineDetail');

  if (track && ruler && detail) {
    const monthIndex = (y, m) => y * 12 + (m - 1);
    const overallStart = monthIndex(events[0].start[0], events[0].start[1]);
    const now = new Date();
    const overallEnd = monthIndex(now.getFullYear(), now.getMonth() + 1);
    const span = overallEnd - overallStart;

    const pct = (y, m) => {
      const raw = ((monthIndex(y, m) - overallStart) / span) * 100;
      const EDGE_MARGIN = 2; // keep markers off the clipped edges of the scroll area
      return EDGE_MARGIN + (raw / 100) * (100 - EDGE_MARGIN * 2);
    };

    const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

    let markerButtons = [];

    function renderDetail(ev, btn) {
      markerButtons.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-pressed', 'false'); });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');

      document.querySelectorAll('.tl-segment').forEach(s => s.classList.remove('active'));
      btn.dataset.segId && document.getElementById(btn.dataset.segId)?.classList.add('active');

      const endLabel = ev.end ? `${monthNames[ev.end[1]-1]} ${ev.end[0]}` : 'Present';
      detail.innerHTML = `
        <div class="detail-card">
          <div class="detail-meta">
            <span class="detail-range">${monthNames[ev.start[1]-1]} ${ev.start[0]} to ${endLabel}</span>
            <span class="detail-company">${ev.company}</span>
          </div>
          <h3 class="detail-role">${ev.role}</h3>
          <p class="detail-summary">${ev.summary}</p>
        </div>
      `;
    }

    events.forEach((ev, i) => {
      const left = pct(ev.start[0], ev.start[1]);
      const endY = ev.end ? ev.end[0] : now.getFullYear();
      const endM = ev.end ? ev.end[1] : now.getMonth() + 1;
      const right = pct(endY, endM);
      const width = Math.max(right - left, 1.2);

      const seg = document.createElement('div');
      seg.className = 'tl-segment' + (ev.live ? ' live' : '');
      seg.id = `seg-${i}`;
      seg.style.left = `${left}%`;
      seg.style.width = `${width}%`;
      if (ev.live) {
        const pulse = document.createElement('span');
        pulse.className = 'live-pulse';
        seg.appendChild(pulse);
      }
      track.appendChild(seg);

      const marker = document.createElement('button');
      marker.className = 'tl-marker';
      marker.style.left = `${left}%`;
      marker.dataset.segId = `seg-${i}`;
      marker.setAttribute('aria-pressed', 'false');
      marker.setAttribute('aria-label', `${ev.role}, ${ev.company}, starting ${monthNames[ev.start[1]-1]} ${ev.start[0]}`);
      marker.innerHTML = `
        <span class="tl-marker-dot"></span>
        <span class="tl-marker-year">${ev.start[0]}</span>
      `;
      marker.addEventListener('click', () => renderDetail(ev, marker));
      ruler.appendChild(marker);
      markerButtons.push(marker);

      seg.addEventListener('click', () => renderDetail(ev, marker));
    });

    /* trailing "NOW" marker at the very end of the live segment */
    const nowMarker = document.createElement('button');
    nowMarker.className = 'tl-marker';
    nowMarker.style.left = '98%';
    nowMarker.setAttribute('aria-pressed', 'false');
    nowMarker.setAttribute('aria-label', 'Present day');
    nowMarker.innerHTML = `
      <span class="tl-marker-dot"></span>
      <span class="tl-marker-year">Now</span>
    `;
    const lastEvent = events[events.length - 1];
    nowMarker.addEventListener('click', () => renderDetail(lastEvent, nowMarker));
    ruler.appendChild(nowMarker);
    markerButtons.push(nowMarker);

    /* open the current role by default, and bring it into view on the scrubber */
    renderDetail(lastEvent, markerButtons[markerButtons.length - 2]);
    const scrollHost = document.querySelector('.timeline-scroll');
    if (scrollHost) scrollHost.scrollLeft = scrollHost.scrollWidth;
  }

});
