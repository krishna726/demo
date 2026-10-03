/* ==========================================================================
   Shri Hari Academy - Vanilla JavaScript Interactive Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // 1. MOBILE HAMBURGER NAVIGATION TOGGLE
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileDrawer = document.getElementById('mobileDrawer');
    const menuIcon = document.getElementById('menuIcon');

    if (mobileMenuBtn && mobileDrawer) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileDrawer.classList.toggle('hidden');
            if (mobileDrawer.classList.contains('hidden')) {
                menuIcon.classList.replace('fa-xmark', 'fa-bars');
            } else {
                menuIcon.classList.replace('fa-bars', 'fa-xmark');
            }
        });

        // Close drawer when clicking any mobile link
        document.querySelectorAll('.mobile-nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileDrawer.classList.add('hidden');
                menuIcon.classList.replace('fa-xmark', 'fa-bars');
            });
        });
    }

    // 2. HEADER SHADOW ON SCROLL
    const mainHeader = document.getElementById('mainHeader');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            mainHeader.classList.add('shadow-md');
        } else {
            mainHeader.classList.remove('shadow-md');
        }
    });

    // 3. COURSES FILTER TABS LOGIC
    const tabBtns = document.querySelectorAll('.tab-btn');
    const courseCards = document.querySelectorAll('.course-card');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active state from all buttons
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            courseCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    card.classList.add('animate-fade');
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // 4. TESTIMONIAL CAROUSEL SLIDER LOGIC
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prevTestimonial');
    const nextBtn = document.getElementById('nextTestimonial');
    let currentSlide = 0;
    let autoSlideInterval;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            if (i === index) {
                slide.classList.remove('hidden');
                slide.classList.add('block');
            } else {
                slide.classList.remove('block');
                slide.classList.add('hidden');
            }
        });

        dots.forEach((dot, i) => {
            if (i === index) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });

        currentSlide = index;
    }

    function nextSlide() {
        let nextIndex = (currentSlide + 1) % slides.length;
        showSlide(nextIndex);
    }

    function prevSlide() {
        let prevIndex = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(prevIndex);
    }

    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetAutoSlide();
        });

        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetAutoSlide();
        });

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showSlide(index);
                resetAutoSlide();
            });
        });

        function startAutoSlide() {
            autoSlideInterval = setInterval(nextSlide, 5000);
        }

        function resetAutoSlide() {
            clearInterval(autoSlideInterval);
            startAutoSlide();
        }

        startAutoSlide();
    }

    // 5. FAQ ACCORDION LOGIC
    const faqHeaders = document.querySelectorAll('.faq-header');

    faqHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const icon = header.querySelector('i');

            // Close other items
            faqHeaders.forEach(otherHeader => {
                if (otherHeader !== header) {
                    otherHeader.nextElementSibling.classList.add('hidden');
                    otherHeader.querySelector('i').style.transform = 'rotate(0deg)';
                }
            });

            // Toggle current
            content.classList.toggle('hidden');
            if (content.classList.contains('hidden')) {
                icon.style.transform = 'rotate(0deg)';
            } else {
                icon.style.transform = 'rotate(180deg)';
            }
        });
    });

    // 6. FEE & COURSE CALCULATOR LOGIC
    const calcClass = document.getElementById('calcClass');
    const calcGoal = document.getElementById('calcGoal');
    const calcProgramName = document.getElementById('calcProgramName');
    const calcBatchDetails = document.getElementById('calcBatchDetails');

    function updateCalculator() {
        if (!calcClass || !calcGoal) return;

        const classVal = calcClass.value;
        const goalVal = calcGoal.value;

        let program = 'IIT-JEE Integrated Classroom Program';
        let details = 'Batch Schedule: Morning & Evening Slots Available | Duration: 24 Months';

        if (goalVal === 'neet') {
            program = 'NEET-UG Medical Pinnacle Program';
            details = 'Batch Schedule: Morning 8:00 AM - 1:00 PM | Intensive NCERT Focus';
        } else if (goalVal === 'boards') {
            if (classVal === '9' || classVal === '10') {
                program = 'Class ' + classVal + 'th Board Booster & Foundations';
                details = 'Batch Schedule: Evening 4:00 PM - 7:00 PM | Science, Maths & SST';
            } else {
                program = 'Class ' + classVal + 'th Board Excellence Batch (PCMB / Commerce)';
                details = 'Batch Schedule: Daily 3 Hours | Theory Derivations & Test Series';
            }
        } else if (goalVal === 'foundation') {
            program = 'Junior Foundation & Olympiad Advantage (Class ' + classVal + 'th)';
            details = 'Batch Schedule: Weekend Special Batches | Logical Reasoning & Advanced Science';
        }

        if (classVal === 'dropper') {
            program = 'Dropper / Repeater Rank Producer Batch (JEE / NEET)';
            details = 'Full-day Intensive Study | 6 Hours Classroom + Daily 2 Hours Doubt Desk';
        }

        calcProgramName.textContent = program;
        calcBatchDetails.textContent = details;
    }

    if (calcClass && calcGoal) {
        calcClass.addEventListener('change', updateCalculator);
        calcGoal.addEventListener('change', updateCalculator);
    }

    // 7. CONTACT FORM SUBMISSION
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('studentName').value.trim();
            const phone = document.getElementById('studentPhone').value.trim();
            const course = document.getElementById('courseInterest').value;

            if (phone.length !== 10 || isNaN(phone)) {
                showToast('Invalid Phone Number', 'Please enter a valid 10-digit mobile number.');
                return;
            }

            const submitBtn = document.getElementById('submitBtn');
            const origText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Submitting...';
            submitBtn.disabled = true;

            setTimeout(() => {
                showToast('Inquiry Submitted Successfully!', `Thank you ${name}! Our Kanpur counselor will contact you at ${phone}.`);
                contactForm.reset();
                submitBtn.innerHTML = origText;
                submitBtn.disabled = false;
            }, 1200);
        });
    }

    // 8. DEMO MODAL FORM SUBMISSION
    const demoForm = document.getElementById('demoForm');
    if (demoForm) {
        demoForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('demoName').value.trim();
            const branch = document.getElementById('demoBranch').value;

            closeDemoModal();
            demoForm.reset();

            showToast('Demo Class Reserved!', `Congratulations ${name}! Your free demo class pass at ${branch} has been registered.`);
        });
    }

});

// GLOBAL FUNCTIONS FOR MODAL DIALOG
function openDemoModal(prefillCourse = '') {
    const demoModal = document.getElementById('demoModal');
    const modalContainer = document.getElementById('modalContainer');
    const demoCourse = document.getElementById('demoCourse');

    if (prefillCourse && demoCourse) {
        // Try matching prefilled course
        for (let i = 0; i < demoCourse.options.length; i++) {
            if (demoCourse.options[i].value.toLowerCase().includes(prefillCourse.toLowerCase())) {
                demoCourse.selectedIndex = i;
                break;
            }
        }
    }

    if (demoModal && modalContainer) {
        demoModal.classList.remove('hidden');
        setTimeout(() => {
            modalContainer.classList.remove('scale-95', 'opacity-0');
            modalContainer.classList.add('scale-100', 'opacity-100');
        }, 10);
    }
}

function closeDemoModal() {
    const demoModal = document.getElementById('demoModal');
    const modalContainer = document.getElementById('modalContainer');

    if (demoModal && modalContainer) {
        modalContainer.classList.remove('scale-100', 'opacity-100');
        modalContainer.classList.add('scale-95', 'opacity-0');
        setTimeout(() => {
            demoModal.classList.add('hidden');
        }, 200);
    }
}

// GLOBAL TOAST NOTIFICATION FUNCTION
function showToast(title, message) {
    const toast = document.getElementById('toast');
    const toastTitle = document.getElementById('toastTitle');
    const toastMsg = document.getElementById('toastMsg');

    if (toast && toastTitle && toastMsg) {
        toastTitle.textContent = title;
        toastMsg.textContent = message;

        toast.classList.remove('translate-y-20', 'opacity-0', 'pointer-events-none');
        toast.classList.add('translate-y-0', 'opacity-100');

        setTimeout(() => {
            toast.classList.remove('translate-y-0', 'opacity-100');
            toast.classList.add('translate-y-20', 'opacity-0', 'pointer-events-none');
        }, 4500);
    }
}
