document.addEventListener('DOMContentLoaded', () => {
    
    // Mobile Menu Toggle
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.querySelector('.nav-menu');
    
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        });
    });

    // Modals Logic
    const modalOverlay = document.getElementById('modalOverlay');

    window.openModal = function(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modalOverlay.classList.add('active');
            modal.classList.add('active');
            
            // Add a small delay for the animation
            setTimeout(() => {
                modalOverlay.classList.add('show');
                modal.classList.add('show');
            }, 10);
        }
    };

    window.closeAllModals = function() {
        const modals = document.querySelectorAll('.modal.active');
        
        modalOverlay.classList.remove('show');
        modals.forEach(modal => {
            modal.classList.remove('show');
        });

        // Wait for the transition to finish before display: none
        setTimeout(() => {
            modalOverlay.classList.remove('active');
            modals.forEach(modal => {
                modal.classList.remove('active');
            });
        }, 300);
    };

    // Close modal on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeAllModals();
        }
    });

    // Form Submission (Basic feedback, the action already points to Webhook)
    const form = document.getElementById('inscricaoForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent standard redirect
            
            const btnSubmit = form.querySelector('button[type="submit"]');
            const originalText = btnSubmit.innerText;
            
            btnSubmit.innerText = 'Enviando...';
            btnSubmit.disabled = true;

            const formData = new FormData(form);

            fetch(form.action, {
                method: 'POST',
                body: formData
            })
            .then(response => {
                if (response.ok) {
                    openModal('modal-sucesso');
                    form.reset();
                } else {
                    alert('Houve um erro ao enviar sua inscrição. Por favor, tente novamente.');
                }
            })
            .catch(error => {
                console.error('Error submitting form:', error);
                alert('Houve um erro de conexão. Por favor, tente novamente.');
            })
            .finally(() => {
                btnSubmit.innerText = originalText;
                btnSubmit.disabled = false;
            });
        });
    }

});
