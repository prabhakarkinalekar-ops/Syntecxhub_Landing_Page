/**
 * Aura UI/UX Platform - Interactive Scripts
 * Syntecxhub Internship Project 1: Landing Page Design & Prototype
 */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // Navbar background change on scroll
  const navbar = document.getElementById('mainNavbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('bg-slate-950/90', 'shadow-lg', 'border-b', 'border-slate-800/80');
      navbar.classList.remove('bg-transparent');
    } else {
      navbar.classList.remove('bg-slate-950/90', 'shadow-lg', 'border-b', 'border-slate-800/80');
      navbar.classList.add('bg-transparent');
    }
  });

  // Interactive Pricing Toggle (Monthly vs Yearly)
  const billingToggle = document.getElementById('billingToggle');
  const proPrice = document.getElementById('proPrice');
  const teamPrice = document.getElementById('teamPrice');
  const billingPeriodLabels = document.querySelectorAll('.billing-period');

  if (billingToggle && proPrice && teamPrice) {
    billingToggle.addEventListener('change', (e) => {
      const isYearly = e.target.checked;
      if (isYearly) {
        proPrice.textContent = '$23';
        teamPrice.textContent = '$63';
        billingPeriodLabels.forEach(el => el.textContent = '/ month (billed yearly)');
        showToast('🎉 20% annual discount applied!');
      } else {
        proPrice.textContent = '$29';
        teamPrice.textContent = '$79';
        billingPeriodLabels.forEach(el => el.textContent = '/ month');
      }
    });
  }

  // Interactive Workflow Role Tabs
  const roleTabs = document.querySelectorAll('.role-tab-btn');
  const roleContents = document.querySelectorAll('.role-tab-content');

  roleTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetRole = tab.getAttribute('data-role');
      
      roleTabs.forEach(t => {
        t.classList.remove('bg-indigo-600', 'text-white', 'shadow-md');
        t.classList.add('text-slate-400', 'hover:text-slate-200');
      });
      tab.classList.remove('text-slate-400', 'hover:text-slate-200');
      tab.classList.add('bg-indigo-600', 'text-white', 'shadow-md');

      roleContents.forEach(content => {
        if (content.id === `role-${targetRole}`) {
          content.classList.remove('hidden');
          content.classList.add('grid');
        } else {
          content.classList.add('hidden');
          content.classList.remove('grid');
        }
      });
    });
  });

  // Interactive Live Prompt-to-Component Demo in Bento Section
  const promptButtons = document.querySelectorAll('.prompt-suggestion-btn');
  const promptInput = document.getElementById('aiPromptInput');
  const promptPreviewCanvas = document.getElementById('promptPreviewCanvas');
  const generatePromptBtn = document.getElementById('generatePromptBtn');

  const sampleComponents = {
    pricing: `
      <div class="p-5 rounded-xl border border-indigo-500/30 bg-slate-900/90 text-left shadow-xl w-full max-w-xs mx-auto animate-fade-in">
        <span class="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">PRO PLAN</span>
        <div class="mt-3 text-3xl font-bold text-white">$29 <span class="text-xs text-slate-400 font-normal">/mo</span></div>
        <p class="text-xs text-slate-400 mt-1">Unlimited AI layout generation & Figma token sync.</p>
        <button class="w-full mt-4 py-2 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition">Upgrade Now</button>
      </div>`,
    navbar: `
      <div class="p-3 rounded-xl border border-slate-700/60 bg-slate-900/90 w-full max-w-sm mx-auto flex items-center justify-between shadow-xl animate-fade-in">
        <div class="flex items-center space-x-2">
          <div class="w-6 h-6 rounded-md bg-gradient-to-tr from-cyan-400 to-indigo-600 flex items-center justify-center text-white text-xs font-bold">A</div>
          <span class="text-sm font-semibold text-white">Aura</span>
        </div>
        <div class="flex space-x-3 text-xs text-slate-400">
          <span class="hover:text-white cursor-pointer">Product</span>
          <span class="hover:text-white cursor-pointer">Docs</span>
        </div>
        <button class="text-xs px-3 py-1 bg-white/10 hover:bg-white/20 text-white rounded-md border border-white/10">Sign In</button>
      </div>`,
    auth: `
      <div class="p-5 rounded-xl border border-slate-700/60 bg-slate-900/90 text-left shadow-xl w-full max-w-xs mx-auto animate-fade-in">
        <h4 class="text-sm font-bold text-white">Welcome back</h4>
        <p class="text-xs text-slate-400 mb-3">Sign in to your design workspace</p>
        <input type="email" placeholder="name@company.com" class="w-full px-3 py-1.5 text-xs rounded bg-slate-800 border border-slate-700 text-slate-200 mb-2 focus:outline-none focus:border-indigo-500" value="designer@studio.com" readonly />
        <button class="w-full py-2 text-xs font-semibold rounded-lg bg-gradient-to-r from-indigo-500 to-cyan-500 text-white">Continue with SSO</button>
      </div>`
  };

  if (promptButtons && promptInput && promptPreviewCanvas) {
    promptButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const text = btn.getAttribute('data-prompt');
        const type = btn.getAttribute('data-type');
        promptInput.value = text;
        renderComponentPreview(type);
      });
    });

    if (generatePromptBtn) {
      generatePromptBtn.addEventListener('click', () => {
        renderComponentPreview('pricing');
        showToast('✨ Component generated in 0.4s!');
      });
    }
  }

  function renderComponentPreview(type) {
    if (!promptPreviewCanvas) return;
    promptPreviewCanvas.innerHTML = `
      <div class="flex items-center justify-center p-4">
        <div class="animate-spin rounded-full h-6 w-6 border-2 border-indigo-500 border-t-transparent"></div>
      </div>
    `;
    setTimeout(() => {
      promptPreviewCanvas.innerHTML = sampleComponents[type] || sampleComponents.pricing;
    }, 350);
  }

  // CTA Prototype Flow Modal Logic
  const ctaModal = document.getElementById('ctaModal');
  const openCtaButtons = document.querySelectorAll('.open-cta-modal');
  const closeCtaButtons = document.querySelectorAll('.close-cta-modal');
  
  // Modal Steps
  const step1 = document.getElementById('modalStep1');
  const step2 = document.getElementById('modalStep2');
  const step3 = document.getElementById('modalStep3');
  const stepIndicator = document.getElementById('stepIndicator');

  let selectedWorkspace = 'Team';
  let selectedTool = 'Figma';

  openCtaButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  closeCtaButtons.forEach(btn => {
    btn.addEventListener('click', closeModal);
  });

  if (ctaModal) {
    ctaModal.addEventListener('click', (e) => {
      if (e.target === ctaModal) closeModal();
    });
  }

  function openModal() {
    if (!ctaModal) return;
    ctaModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    resetModal();
  }

  function closeModal() {
    if (!ctaModal) return;
    ctaModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  function resetModal() {
    if (step1 && step2 && step3) {
      step1.classList.remove('hidden');
      step2.classList.add('hidden');
      step3.classList.add('hidden');
      if (stepIndicator) stepIndicator.textContent = 'Step 1 of 3: Choose Workspace';
    }
  }

  // Workspace Selection buttons (Step 1 -> Step 2)
  const workspaceOptions = document.querySelectorAll('.workspace-option');
  workspaceOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      selectedWorkspace = opt.getAttribute('data-workspace');
      workspaceOptions.forEach(o => o.classList.remove('border-indigo-500', 'bg-indigo-500/10'));
      opt.classList.add('border-indigo-500', 'bg-indigo-500/10');
      
      setTimeout(() => {
        step1.classList.add('hidden');
        step2.classList.remove('hidden');
        if (stepIndicator) stepIndicator.textContent = 'Step 2 of 3: Design Workflow Setup';
      }, 250);
    });
  });

  // Step 2 Form Submission (Step 2 -> Step 3)
  const step2Form = document.getElementById('step2Form');
  if (step2Form) {
    step2Form.addEventListener('submit', (e) => {
      e.preventDefault();
      const userName = document.getElementById('userNameInput').value || 'Designer';
      
      step2.classList.add('hidden');
      step3.classList.remove('hidden');
      if (stepIndicator) stepIndicator.textContent = 'Step 3 of 3: Workspace Ready!';

      const welcomeUser = document.getElementById('welcomeUserName');
      if (welcomeUser) welcomeUser.textContent = userName;

      // Trigger Confetti effect
      triggerConfetti();
      showToast('🎉 Free trial activated successfully!');
    });
  }

  // Step 2 Back Button
  const backToStep1Btn = document.getElementById('backToStep1Btn');
  if (backToStep1Btn) {
    backToStep1Btn.addEventListener('click', () => {
      step2.classList.add('hidden');
      step1.classList.remove('hidden');
      if (stepIndicator) stepIndicator.textContent = 'Step 1 of 3: Choose Workspace';
    });
  }

  // Video Demo Modal
  const videoModal = document.getElementById('videoModal');
  const openVideoBtn = document.getElementById('openVideoDemoBtn');
  const closeVideoBtn = document.getElementById('closeVideoBtn');

  if (openVideoBtn && videoModal && closeVideoBtn) {
    openVideoBtn.addEventListener('click', (e) => {
      e.preventDefault();
      videoModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });

    closeVideoBtn.addEventListener('click', () => {
      videoModal.classList.remove('active');
      document.body.style.overflow = '';
    });

    videoModal.addEventListener('click', (e) => {
      if (e.target === videoModal) {
        videoModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // UI/UX Design System Inspector Drawer
  const inspectorDrawer = document.getElementById('designSystemDrawer');
  const openInspectorBtn = document.getElementById('openInspectorBtn');
  const closeInspectorBtn = document.getElementById('closeInspectorBtn');

  if (openInspectorBtn && inspectorDrawer && closeInspectorBtn) {
    openInspectorBtn.addEventListener('click', () => {
      inspectorDrawer.classList.add('open');
    });

    closeInspectorBtn.addEventListener('click', () => {
      inspectorDrawer.classList.remove('open');
    });
  }

  // Click-to-copy color token
  const copyColorPills = document.querySelectorAll('.copy-color-pill');
  copyColorPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const hex = pill.getAttribute('data-hex');
      navigator.clipboard.writeText(hex).then(() => {
        showToast(`Copied ${hex} to clipboard!`);
      });
    });
  });

  // Toast Functionality
  const toast = document.getElementById('notificationToast');
  const toastMessage = document.getElementById('toastMessage');

  function showToast(msg) {
    if (!toast || !toastMessage) return;
    toastMessage.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3500);
  }

  // Simple Confetti Animation
  function triggerConfetti() {
    const confettiContainer = document.getElementById('confettiContainer');
    if (!confettiContainer) return;
    confettiContainer.innerHTML = '';
    
    const colors = ['#6366f1', '#06b6d4', '#ec4899', '#f59e0b', '#10b981', '#ffffff'];
    for (let i = 0; i < 40; i++) {
      const bit = document.createElement('div');
      bit.style.position = 'absolute';
      bit.style.width = `${Math.floor(Math.random() * 8 + 6)}px`;
      bit.style.height = `${Math.floor(Math.random() * 8 + 6)}px`;
      bit.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      bit.style.left = `${Math.random() * 100}%`;
      bit.style.top = `-10px`;
      bit.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
      bit.style.opacity = Math.random() + 0.5;
      bit.style.transform = `rotate(${Math.random() * 360}deg)`;
      bit.style.transition = `all ${Math.random() * 1.5 + 1.2}s cubic-bezier(0.25, 1, 0.5, 1)`;
      
      confettiContainer.appendChild(bit);

      setTimeout(() => {
        bit.style.top = `${Math.random() * 120 + 40}%`;
        bit.style.left = `${parseFloat(bit.style.left) + (Math.random() * 40 - 20)}%`;
        bit.style.opacity = '0';
      }, 50);
    }
  }

  // Newsletter form submission
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = document.getElementById('newsletterEmail');
      if (emailInput && emailInput.value) {
        showToast(`🎉 Joined waiting list: ${emailInput.value}`);
        emailInput.value = '';
      }
    });
  }
});
