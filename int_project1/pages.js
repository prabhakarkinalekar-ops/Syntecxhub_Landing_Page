/**
 * Pulse AI - Unified Platform Interactivity & Prototype Script
 * Syntecxhub Internship Project 1: UI/UX Landing Page & Product Hub
 */

document.addEventListener('DOMContentLoaded', () => {
  // --------------------------------------------------------------------------
  // 1. GLOBAL NAVIGATION & STICKY HEADER
  // --------------------------------------------------------------------------
  const siteHeader = document.querySelector('.site-header');
  const menuToggle = document.querySelector('.menu-toggle');
  const siteNav = document.querySelector('.site-nav');

  // Sticky header shadow on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      siteHeader?.classList.add('scrolled');
    } else {
      siteHeader?.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  if (menuToggle && siteNav) {
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = siteNav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      menuToggle.innerHTML = isOpen ? '✕' : '☰';
    });

    // Close when clicking a nav link
    siteNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        siteNav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.innerHTML = '☰';
      });
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!siteNav.contains(e.target) && !menuToggle.contains(e.target)) {
        siteNav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.innerHTML = '☰';
      }
    });
  }

  // --------------------------------------------------------------------------
  // 2. TOAST NOTIFICATION SYSTEM
  // --------------------------------------------------------------------------
  const toast = document.getElementById('toastNotification');
  const toastMessage = document.getElementById('toastMessage');
  let toastTimer;

  window.showToast = function(msg) {
    if (!toast || !toastMessage) return;
    toastMessage.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3500);
  };

  // --------------------------------------------------------------------------
  // 3. ONBOARDING PROTOTYPE MODAL (Multi-step + Confetti)
  // --------------------------------------------------------------------------
  const onboardingModal = document.getElementById('onboardingModal');
  const openTrialButtons = document.querySelectorAll('.open-onboarding-btn, .start-trial-btn');
  const closeTrialButtons = document.querySelectorAll('.close-modal-btn');
  const step1 = document.getElementById('modalStep1');
  const step2 = document.getElementById('modalStep2');
  const step3 = document.getElementById('modalStep3');
  const stepIndicator = document.getElementById('modalStepIndicator');
  const workspaceOptions = document.querySelectorAll('.workspace-opt-btn');
  const step2Form = document.getElementById('onboardingStep2Form');
  const backToStep1Btn = document.getElementById('backToStep1Btn');
  const welcomeUserName = document.getElementById('welcomeUserName');
  const confettiContainer = document.getElementById('confettiContainer');

  let currentWorkspaceTier = 'Pro Plan';

  function openOnboardingModal(planName) {
    if (!onboardingModal) return;
    if (planName) currentWorkspaceTier = planName;
    resetOnboardingModal();
    onboardingModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeOnboardingModal() {
    if (!onboardingModal) return;
    onboardingModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  function resetOnboardingModal() {
    if (step1 && step2 && step3) {
      step1.style.display = 'block';
      step2.style.display = 'none';
      step3.style.display = 'none';
      if (stepIndicator) stepIndicator.textContent = 'Step 1 of 3: Choose Workspace Scope';
    }
    if (confettiContainer) confettiContainer.innerHTML = '';
  }

  openTrialButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const plan = btn.getAttribute('data-plan') || 'Pro Plan';
      openOnboardingModal(plan);
    });
  });

  closeTrialButtons.forEach(btn => {
    btn.addEventListener('click', closeOnboardingModal);
  });

  if (onboardingModal) {
    onboardingModal.addEventListener('click', (e) => {
      if (e.target === onboardingModal) closeOnboardingModal();
    });
  }

  // Workspace Selection (Step 1 -> Step 2)
  workspaceOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      workspaceOptions.forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
      const chosen = opt.getAttribute('data-workspace');
      currentWorkspaceTier = chosen || currentWorkspaceTier;

      setTimeout(() => {
        if (step1 && step2) {
          step1.style.display = 'none';
          step2.style.display = 'block';
          if (stepIndicator) stepIndicator.textContent = `Step 2 of 3: Configure ${currentWorkspaceTier}`;
        }
      }, 200);
    });
  });

  // Back to Step 1
  if (backToStep1Btn) {
    backToStep1Btn.addEventListener('click', () => {
      if (step1 && step2) {
        step2.style.display = 'none';
        step1.style.display = 'block';
        if (stepIndicator) stepIndicator.textContent = 'Step 1 of 3: Choose Workspace Scope';
      }
    });
  }

  // Step 2 Form Submission (Step 2 -> Step 3)
  if (step2Form) {
    step2Form.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('onboardingNameInput');
      const teamName = nameInput ? nameInput.value.trim() : 'Engineer';

      if (step2 && step3) {
        step2.style.display = 'none';
        step3.style.display = 'block';
        if (stepIndicator) stepIndicator.textContent = 'Step 3 of 3: Workspace Ready!';
        if (welcomeUserName) welcomeUserName.textContent = teamName || 'Leader';

        // Trigger Confetti
        triggerConfettiAnimation();
        showToast(`🎉 Workspace ready for ${teamName}!`);
      }
    });
  }

  // Confetti Animation
  function triggerConfettiAnimation() {
    if (!confettiContainer) return;
    confettiContainer.innerHTML = '';
    const colors = ['#5e54e0', '#06b6d4', '#9333ea', '#10b981', '#f59e0b', '#ffffff'];

    for (let i = 0; i < 48; i++) {
      const bit = document.createElement('div');
      bit.style.position = 'absolute';
      bit.style.width = `${Math.floor(Math.random() * 8 + 6)}px`;
      bit.style.height = `${Math.floor(Math.random() * 8 + 6)}px`;
      bit.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      bit.style.left = `${Math.random() * 100}%`;
      bit.style.top = `-10px`;
      bit.style.borderRadius = Math.random() > 0.4 ? '50%' : '2px';
      bit.style.opacity = '1';
      bit.style.transform = `rotate(${Math.random() * 360}deg)`;
      bit.style.transition = `all ${Math.random() * 1.6 + 1.2}s cubic-bezier(0.25, 1, 0.5, 1)`;

      confettiContainer.appendChild(bit);

      setTimeout(() => {
        bit.style.top = `${Math.random() * 110 + 30}%`;
        bit.style.left = `${parseFloat(bit.style.left) + (Math.random() * 30 - 15)}%`;
        bit.style.opacity = '0';
        bit.style.transform = `rotate(${Math.random() * 720}deg)`;
      }, 50);
    }
  }

  // --------------------------------------------------------------------------
  // 4. INTERACTIVE DEMO PLAYER MODAL
  // --------------------------------------------------------------------------
  const demoModal = document.getElementById('demoModal');
  const openDemoButtons = document.querySelectorAll('.open-demo-btn, #openDemoBtn');
  const closeDemoButtons = document.querySelectorAll('.close-demo-btn');
  const playPulseBtn = document.getElementById('playPulseBtn');
  const demoStatusText = document.getElementById('demoStatusText');

  openDemoButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (!demoModal) return;
      demoModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  closeDemoButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      if (!demoModal) return;
      demoModal.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  if (demoModal) {
    demoModal.addEventListener('click', (e) => {
      if (e.target === demoModal) {
        demoModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  if (playPulseBtn) {
    playPulseBtn.addEventListener('click', () => {
      playPulseBtn.innerHTML = '❚❚';
      if (demoStatusText) demoStatusText.textContent = 'Simulating Live Multi-Region Deployment...';
      showToast('▶ Streaming 2-min interactive walkthrough');

      setTimeout(() => {
        if (demoStatusText) demoStatusText.textContent = '✓ Deployed 14 edge microservices with zero downtime';
        playPulseBtn.innerHTML = '▶';
      }, 3000);
    });
  }

  // --------------------------------------------------------------------------
  // 5. DESIGN TOKENS SPEC DRAWER & COPY-TO-CLIPBOARD
  // --------------------------------------------------------------------------
  const tokensDrawer = document.getElementById('designTokensDrawer');
  const openTokensBtn = document.getElementById('openTokensBtn');
  const closeTokensBtn = document.getElementById('closeTokensBtn');
  const tokenSwatches = document.querySelectorAll('.token-swatch');

  if (openTokensBtn && tokensDrawer) {
    openTokensBtn.addEventListener('click', () => {
      tokensDrawer.classList.add('open');
    });
  }

  if (closeTokensBtn && tokensDrawer) {
    closeTokensBtn.addEventListener('click', () => {
      tokensDrawer.classList.remove('open');
    });
  }

  // Close drawer with ESC key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      tokensDrawer?.classList.remove('open');
      closeOnboardingModal();
      if (demoModal) {
        demoModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    }
  });

  tokenSwatches.forEach(swatch => {
    swatch.addEventListener('click', () => {
      const hex = swatch.getAttribute('data-token-value');
      if (hex) {
        navigator.clipboard.writeText(hex).then(() => {
          showToast(`Copied ${hex} to clipboard!`);
        }).catch(() => {
          showToast(`Token: ${hex}`);
        });
      }
    });
  });

  // --------------------------------------------------------------------------
  // 6. INTERACTIVE AI AUTOMATION PLAYGROUND (Home Page)
  // --------------------------------------------------------------------------
  const promptChips = document.querySelectorAll('.prompt-chip');
  const terminalLog = document.getElementById('simulatorTerminalLog');

  const simulationPresets = {
    autoscale: `
<span class="term-dim">// [00:00.12] Telemetry hook received: Traffic spike +320% on US-East</span>
<span class="term-cyan">> pulse.scale(target: "web-fleet", strategy: "predictive")</span>
<span class="term-dim">-- Provisioning 12 new worker nodes on AWS & Fly.io</span>
<span class="term-dim">-- Health checks passed across all 12 instances (lat: 8.2ms)</span>
<span class="term-green">✓ Auto-scale completed in 0.42s with ZERO latency degradation.</span>`,
    rollback: `
<span class="term-dim">// [00:00.08] Anomaly caught: Unhandled exception spike in v2.4.1</span>
<span class="term-purple">> pulse.guard.rollback(target: "canary-cluster", safeVersion: "v2.4.0")</span>
<span class="term-dim">-- Traffic rerouted to previous stable revision across 4 regions</span>
<span class="term-dim">-- Memory leak isolated; error rate restored to 0.00%</span>
<span class="term-green">✓ Instant zero-downtime rollback completed in 0.18s.</span>`,
    edge: `
<span class="term-dim">// [00:00.05] Trigger: git push origin main [commit 9c4b2a]</span>
<span class="term-cyan">> pulse.deploy.edge(regions: ["iad", "lhr", "nrt", "syd", "fra"])</span>
<span class="term-dim">-- Static assets uploaded to globally replicated cache</span>
<span class="term-dim">-- WASM edge runtime updated; cold starts eliminated (< 2ms)</span>
<span class="term-green">✓ Worldwide propagation complete in 1.14s. Ready at edge.</span>`
  };

  promptChips.forEach(chip => {
    chip.addEventListener('click', () => {
      promptChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const action = chip.getAttribute('data-action') || 'autoscale';

      if (terminalLog) {
        terminalLog.innerHTML = `<span class="term-dim">Executing pulse pipeline...</span>`;
        setTimeout(() => {
          terminalLog.innerHTML = simulationPresets[action] || simulationPresets.autoscale;
          showToast('⚡ AI pipeline executed successfully');
        }, 220);
      }
    });
  });

  // --------------------------------------------------------------------------
  // 7. PERSONA WORKFLOW TABS (Home Page)
  // --------------------------------------------------------------------------
  const personaTabButtons = document.querySelectorAll('.persona-tab-btn');
  const personaTabContents = document.querySelectorAll('.persona-tab-content');

  personaTabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-persona');
      personaTabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      personaTabContents.forEach(content => {
        if (content.id === `persona-${target}`) {
          content.classList.add('active');
        } else {
          content.classList.remove('active');
        }
      });
    });
  });

  // --------------------------------------------------------------------------
  // 8. FAQ ACCORDION (Home Page)
  // --------------------------------------------------------------------------
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        // Close other items for neat accordion behavior
        faqItems.forEach(i => i.classList.remove('open'));
        if (!isOpen) {
          item.classList.add('open');
        }
      });
    }
  });

  // --------------------------------------------------------------------------
  // 9. CONVERSION BANNER NEWSLETTER FORM
  // --------------------------------------------------------------------------
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = document.getElementById('newsletterEmail');
      const email = emailInput?.value.trim();
      if (email && email.includes('@') && email.includes('.')) {
        showToast(`🎉 You're on the priority access list: ${email}`);
        emailInput.value = '';
      } else {
        showToast('⚠️ Please enter a valid email address');
      }
    });
  }

  // --------------------------------------------------------------------------
  // 10. EXPLORE PAGE SEARCH & FILTERING (explore.html)
  // --------------------------------------------------------------------------
  const filterButtons = document.querySelectorAll('[data-filter]');
  const templateCards = document.querySelectorAll('[data-category]');
  const searchInput = document.getElementById('templateSearch');
  const countIndicator = document.getElementById('workflowCount');
  const emptyState = document.getElementById('emptyState');

  function filterWorkflows() {
    const activeFilter = document.querySelector('[data-filter].active')?.dataset.filter || 'all';
    const query = searchInput?.value.trim().toLowerCase() || '';
    let visibleCount = 0;

    templateCards.forEach((card) => {
      const matchesFilter = activeFilter === 'all' || card.dataset.category === activeFilter;
      const matchesSearch = !query || card.textContent.toLowerCase().includes(query);
      const isVisible = matchesFilter && matchesSearch;
      card.style.display = isVisible ? 'flex' : 'none';
      if (isVisible) visibleCount++;
    });

    if (emptyState) emptyState.style.display = visibleCount > 0 ? 'none' : 'block';
    if (countIndicator) {
      countIndicator.textContent = `Showing ${visibleCount} workflow${visibleCount === 1 ? '' : 's'}`;
    }
  }

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterButtons.forEach((item) => {
        const isActive = item === btn;
        item.classList.toggle('active', isActive);
        item.setAttribute('aria-pressed', String(isActive));
      });
      filterWorkflows();
    });
  });

  searchInput?.addEventListener('input', filterWorkflows);

  // --------------------------------------------------------------------------
  // 11. PRICING BILLING SWITCH (plans.html)
  // --------------------------------------------------------------------------
  const billingToggle = document.getElementById('billingToggle');
  if (billingToggle) {
    billingToggle.addEventListener('click', () => {
      const isYearly = billingToggle.getAttribute('aria-checked') !== 'true';
      billingToggle.setAttribute('aria-checked', String(isYearly));

      document.querySelectorAll('[data-monthly][data-yearly]').forEach((price) => {
        price.textContent = isYearly ? price.dataset.yearly : price.dataset.monthly;
      });

      document.querySelectorAll('.price-note').forEach((note) => {
        note.textContent = isYearly ? 'Billed annually (20% off)' : 'Billed monthly';
      });

      showToast(isYearly ? '🎉 20% Annual savings applied!' : 'Switched to monthly billing');
    });
  }

  // --------------------------------------------------------------------------
  // 12. TELEMETRY BAR HOVER DATA (Home Page)
  // --------------------------------------------------------------------------
  const barCols = document.querySelectorAll('.bar-col');
  const throughputDisplay = document.getElementById('liveThroughputDisplay');

  barCols.forEach((bar) => {
    bar.addEventListener('mouseenter', () => {
      const val = bar.getAttribute('data-val');
      if (throughputDisplay && val) {
        throughputDisplay.textContent = `${val} req/s`;
      }
    });
    bar.addEventListener('mouseleave', () => {
      if (throughputDisplay) {
        throughputDisplay.textContent = '99.98% Success';
      }
    });
  });
});
