
import './style.css';

const comments = [
  {
    id: 1,
    name: 'Sarah Johnson',
    handle: '@sarahjohnson',
    avatar: 'SJ',
    color: 'purple',
    video: 'How to Grow a YouTube Channel in 2026',
    comment: 'This is exactly what I needed! Your explanation was so helpful. Thank you!',
    time: '12 min ago',
    type: 'Positive',
    reply: 'Thank you so much, Sarah! Glad you found the explanation helpful. More useful content is coming your way!'
  },
  {
    id: 2,
    name: 'Michael Brown',
    handle: '@michaelbrown',
    avatar: 'MB',
    color: 'blue',
    video: '10 AI Tools That Can Save You Hours',
    comment: 'Which of these tools would you recommend for someone just starting out?',
    time: '28 min ago',
    type: 'Question',
    reply: 'Great question, Michael! I would recommend starting with the simplest tool in the list and gradually exploring the others as your needs grow.'
  },
  {
    id: 3,
    name: 'David Wilson',
    handle: '@davidwilson',
    avatar: 'DW',
    color: 'orange',
    video: 'How to Grow a YouTube Channel in 2026',
    comment: 'I tried this method but it did not work for me. A bit disappointed.',
    time: '45 min ago',
    type: 'Negative',
    reply: 'Thanks for sharing your experience, David. Results can vary depending on the channel and implementation. Could you share a little more about what you tried?'
  },
  {
    id: 4,
    name: 'Emma Williams',
    handle: '@emmawilliams',
    avatar: 'EW',
    color: 'pink',
    video: '10 AI Tools That Can Save You Hours',
    comment: 'Amazing content! Keep posting videos like this.',
    time: '1 hour ago',
    type: 'Positive',
    reply: 'Thank you, Emma! Your support means a lot. Stay tuned for more videos!'
  },
  {
    id: 5,
    name: 'Alex Carter',
    handle: '@alexcarter',
    avatar: 'AC',
    color: 'green',
    video: 'YouTube SEO Complete Guide',
    comment: 'Can you make a tutorial specifically about keyword research?',
    time: '2 hours ago',
    type: 'Question',
    reply: 'Absolutely, Alex! Keyword research deserves its own detailed tutorial. Thanks for the suggestion!'
  }
];

let activeFilter = 'All';
let activeComment = 1;
let currentMode = 'approval';
let replied = new Set();

const app = document.querySelector('#app');

function renderComments() {
  const filtered = comments.filter(comment => {
    const matchesFilter = activeFilter === 'All' ||
      comment.type === activeFilter ||
      (activeFilter === 'Pending' && !replied.has(comment.id));

    return matchesFilter;
  });

  return filtered.map(comment => `
    <button class="comment-item ${activeComment === comment.id ? 'selected' : ''}"
      data-comment="${comment.id}">
      <div class="avatar ${comment.color}">${comment.avatar}</div>
      <div class="comment-info">
        <div class="comment-name">${comment.name}
          <span>${comment.time}</span>
        </div>
        <p>${comment.comment}</p>
        <div class="comment-tags">
          <span class="tag ${comment.type.toLowerCase()}">${comment.type}</span>
          <span class="video-name">${comment.video}</span>
        </div>
      </div>
    </button>
  `).join('');
}

function renderDetail() {
  const comment = comments.find(item => item.id === activeComment);

  if (!comment) return '';

  return `
    <div class="detail-content">
      <div class="detail-heading">
        <div>
          <span class="eyebrow">COMMENT DETAILS</span>
          <h3>Review and respond</h3>
        </div>
        <span class="tag ${comment.type.toLowerCase()}">${comment.type}</span>
      </div>

      <div class="original-comment">
        <div class="user-row">
          <div class="avatar ${comment.color}">${comment.avatar}</div>
          <div>
            <strong>${comment.name}</strong>
            <span>${comment.handle} · ${comment.time}</span>
          </div>
        </div>
        <p>${comment.comment}</p>
        <div class="comment-video">▶ ${comment.video}</div>
      </div>

      <div class="ai-heading">
        <div class="ai-icon">✦</div>
        <div>
          <strong>AI suggested response</strong>
          <span>Generated for this conversation</span>
        </div>
        <span class="ai-status">READY</span>
      </div>

      <textarea id="replyText" class="reply-editor"
        placeholder="Your AI-generated reply...">${replied.has(comment.id) ? '' : comment.reply}</textarea>

      <div class="reply-footer">
        <span>✦ AI-assisted response</span>
        <button class="text-button" id="regenerate">↻ Regenerate</button>
      </div>

      <div class="response-actions">
        <button class="secondary-button" id="copyReply">Copy reply</button>
        <button class="primary-button" id="approveReply">
          ${replied.has(comment.id) ? 'Approved ✓' : 'Approve reply →'}
        </button>
      </div>

      <p class="demo-notice">Demo mode · Replies are not published to YouTube yet.</p>
    </div>
  `;
}

function render() {
  app.innerHTML = `
    <div class="app-layout">
      <aside class="sidebar">
        <div class="brand">
          <div class="brand-icon">✦</div>
          <div>ReplyPilot<span>AI</span></div>
        </div>

        <div class="workspace-label">WORKSPACE</div>
        <div class="channel-card">
          <div class="youtube-icon">▶</div>
          <div>
            <strong>My YouTube Channel</strong>
            <span>Demo workspace</span>
          </div>
          <span class="dropdown-arrow">⌄</span>
        </div>

        <div class="nav-label">MENU</div>
        <nav class="navigation">
          <a class="nav-link active" href="#dashboard">
            <span>▦</span> Overview
          </a>
          <a class="nav-link" href="#inbox">
            <span>☷</span> Comment Inbox
            <span class="nav-count">24</span>
          </a>
          <a class="nav-link" href="#automation">
            <span>✧</span> AI Automation
          </a>
          <a class="nav-link" href="#analytics">
            <span>▥</span> Analytics
          </a>
          <a class="nav-link" href="#channels">
            <span>◉</span> Channels
          </a>
        </nav>

        <div class="sidebar-bottom">
          <div class="upgrade-card">
            <div class="upgrade-spark">✦</div>
            <strong>Your AI assistant is ready</strong>
            <p>Connect your YouTube channel to start managing comments.</p>
            <button id="connectSidebar">Connect channel →</button>
          </div>

          <a class="nav-link" href="#settings"><span>⚙</span> Settings</a>
          <div class="profile">
            <div class="avatar profile-avatar">RD</div>
            <div><strong>My Account</strong><span>Free workspace</span></div>
            <span>⋯</span>
          </div>
        </div>
      </aside>

      <main class="main-area">
        <header class="topbar">
          <div class="breadcrumb">Workspace <span>/</span> Overview</div>
          <div class="top-actions">
            <span class="system-status"><i></i> Demo environment</span>
            <button class="icon-button" title="Notifications">♧</button>
            <div class="avatar profile-avatar">RD</div>
          </div>
        </header>

        <section class="page-content">
          <div class="welcome-row">
            <div>
              <span class="eyebrow">YOUR COMMAND CENTER</span>
              <h1>Good morning 👋</h1>
              <p>Here's what's happening with your YouTube comments.</p>
            </div>
            <button class="primary-button" id="connectTop">＋ Connect YouTube channel</button>
          </div>

          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-top"><span>Total comments</span><span>☷</span></div>
              <div class="stat-number">1,284</div>
              <div class="stat-foot"><span class="positive">↑ 12.8%</span> vs last month</div>
            </div>
            <div class="stat-card">
              <div class="stat-top"><span>Awaiting response</span><span>◷</span></div>
              <div class="stat-number">24</div>
              <div class="stat-foot">Comments needing attention</div>
            </div>
            <div class="stat-card">
              <div class="stat-top"><span>AI replies generated</span><span>✦</span></div>
              <div class="stat-number">856</div>
              <div class="stat-foot"><span class="positive">↑ 18.4%</span> vs last month</div>
            </div>
            <div class="stat-card">
              <div class="stat-top"><span>Response rate</span><span>◉</span></div>
              <div class="stat-number">94.2%</div>
              <div class="stat-foot"><span class="positive">↑ 5.2%</span> vs last month</div>
            </div>
          </div>

          <div class="section-title-row">
            <div>
              <h2>Comment management</h2>
              <p>Review comments and manage AI-assisted responses.</p>
            </div>
            <span class="demo-pill">SAMPLE DATA</span>
          </div>

          <section class="inbox-panel" id="inbox">
            <div class="inbox-header">
              <div>
                <h3>Comment inbox <span>24</span></h3>
                <p>Manage your latest conversations</p>
              </div>
              <input type="search" id="searchComments" placeholder="⌕  Search comments..." />
            </div>

            <div class="filter-tabs">
              ${['All', 'Pending', 'Positive', 'Question', 'Negative'].map(filter =>
                `<button class="filter-tab ${activeFilter === filter ? 'active' : ''}" data-filter="${filter}">${filter}</button>`
              ).join('')}
            </div>

            <div class="inbox-body">
              <div class="comment-list" id="commentList">
                ${renderComments()}
              </div>
              <div class="comment-detail" id="commentDetail">
                ${renderDetail()}
              </div>
            </div>
          </section>

          <section class="automation-panel" id="automation">
            <div>
              <span class="eyebrow">REPLY PREFERENCES</span>
              <h2>How should ReplyPilot respond?</h2>
              <p>Choose how AI handles comments on your channel.</p>
            </div>
            <div class="mode-options">
              <button class="mode-option ${currentMode === 'approval' ? 'mode-active' : ''}" data-mode="approval">
                <span>✎</span>
                <strong>Approval mode</strong>
                <small>Review every reply before publishing.</small>
              </button>
              <button class="mode-option ${currentMode === 'automatic' ? 'mode-active' : ''}" data-mode="automatic">
                <span>✧</span>
                <strong>Automatic mode</strong>
                <small>Publish eligible AI replies automatically.</small>
              </button>
            </div>
            <p class="mode-message">${currentMode === 'approval'
              ? 'Approval mode selected. You remain in control of every response.'
              : 'Automatic mode selected. Live publishing will require YouTube connection and configuration.'}</p>
          </section>

          <footer>© 2026 ReplyPilot AI <span>Built for smarter YouTube conversations.</span></footer>
        </section>
      </main>
    </div>
  `;

  bindEvents();
}

function bindEvents() {
  document.querySelectorAll('[data-filter]').forEach(button => {
    button.addEventListener('click', () => {
      activeFilter = button.dataset.filter;
      render();
    });
  });

  document.querySelectorAll('[data-comment]').forEach(button => {
    button.addEventListener('click', () => {
      activeComment = Number(button.dataset.comment);
      render();
    });
  });

  document.querySelectorAll('[data-mode]').forEach(button => {
    button.addEventListener('click', () => {
      currentMode = button.dataset.mode;
      render();
    });
  });

  document.querySelectorAll('#connectSidebar, #connectTop').forEach(button => {
    button.addEventListener('click', () => {
      alert('YouTube connection will be enabled in a later development stage.');
    });
  });

  const approve = document.querySelector('#approveReply');
  approve?.addEventListener('click', () => {
    replied.add(activeComment);
    alert('Demo: Reply approved locally. It has not been published to YouTube.');
    render();
  });

  document.querySelector('#copyReply')?.addEventListener('click', async () => {
    const text = document.querySelector('#replyText').value;
    try {
      await navigator.clipboard.writeText(text);
      alert('Reply copied!');
    } catch {
      alert('Please select and copy the reply manually.');
    }
  });

  document.querySelector('#regenerate')?.addEventListener('click', () => {
    alert('AI reply generation will be connected in a later development stage.');
  });

  document.querySelector('#searchComments')?.addEventListener('input', event => {
    const term = event.target.value.toLowerCase();

    document.querySelectorAll('.comment-item').forEach(item => {
      item.style.display = item.textContent.toLowerCase().includes(term)
        ? 'flex'
        : 'none';
    });
  });
}

render();

