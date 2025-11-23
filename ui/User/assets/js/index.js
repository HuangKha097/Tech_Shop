function initProductDetailPage() {

    const addBtn = document.querySelector(".btn-add");
    const buyBtn = document.querySelector(".btn-buy")


    if ( addBtn && buyBtn) {


        function handleButtonSuccess(button) {
            const originalText = button.textContent;
            button.classList.add("loading");

            setTimeout(() => {
                button.classList.remove("loading");
                button.innerHTML = '<i class="fa fa-check"></i> Success';
                button.classList.add("success");

                setTimeout(() => {
                    button.textContent = originalText;
                    button.classList.remove("success");
                }, 2000);
            }, 1000);
        }

        addBtn.addEventListener("click", () => handleButtonSuccess(addBtn));
        buyBtn.addEventListener("click", () => handleButtonSuccess(buyBtn));
    }
}

function initLoginPage() {
    const container = document.getElementById("container");

    if (container) {
        const registerBtn = document.getElementById("register");
        const loginBtn = document.getElementById("login");

        registerBtn.addEventListener("click", () => {
            container.classList.add("active");
        });

        loginBtn.addEventListener("click", () => {
            container.classList.remove("active");
        });

        const toggleLoginPassword = document.getElementById('toggleLoginPassword');
        const loginPassword = document.getElementById('loginPassword');

        if (toggleLoginPassword && loginPassword) {
            toggleLoginPassword.addEventListener('click', () => {
                if (loginPassword.type === 'password') {
                    loginPassword.type = 'text';
                    toggleLoginPassword.classList.remove('fa-eye-slash');
                    toggleLoginPassword.classList.add('fa-eye');
                } else {
                    loginPassword.type = 'password';
                    toggleLoginPassword.classList.remove('fa-eye');
                    toggleLoginPassword.classList.add('fa-eye-slash');
                }
            });
        }

        const signUpForm = document.getElementById('signUpForm');
        const signupMessage = document.getElementById('signupMessage');

        if (signUpForm && signupMessage) {
            signUpForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const emailInput = document.getElementById('signupEmail');
                const passwordInput = document.getElementById('signupPassword');
                const confirmInput = document.getElementById('signupConfirmPassword');

                const email = emailInput.value.trim();
                const password = passwordInput.value;
                const confirm = confirmInput.value;

                if (email === '' || !email.includes('@') || !email.includes('.')) {
                    signupMessage.textContent = 'Please enter a valid email.';
                    signupMessage.style.color = '#e74c3c';
                    return;
                }
                if (password.length < 6) {
                    signupMessage.textContent = 'Password must be at least 6 characters.';
                    signupMessage.style.color = '#e74c3c';
                    return;
                }
                if (password !== confirm) {
                    signupMessage.textContent = 'Passwords do not match.';
                    signupMessage.style.color = '#e74c3c';
                    return;
                }

                signupMessage.textContent = 'Account created successfully!';
                signupMessage.style.color = '#27ae60';

                localStorage.setItem('user_email', email);
                localStorage.setItem('user_password', password);

                setTimeout(() => {
                    container.classList.remove('active');
                    signupMessage.textContent = '';
                    signUpForm.reset();
                }, 1500);
            });
        }

        const signInForm = document.getElementById('signInForm');
        const signInMessage = document.getElementById('signInMessage');

        if (signInForm && signInMessage) {
            signInForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const email = document.getElementById('signInEmail').value.trim();
                const password = document.getElementById('loginPassword').value;

                const storedEmail = localStorage.getItem('user_email');
                const storedPassword = localStorage.getItem('user_password');

                if (email === storedEmail && password === storedPassword) {
                    signInMessage.textContent = 'Login successful! Redirecting...';
                    signInMessage.style.color = '#27ae60';

                    setTimeout(() => {
                        signInMessage.textContent = '';
                    }, 1500);
                } else {
                    signInMessage.textContent = 'Invalid email or password.';
                    signInMessage.style.color = '#e74c3c';
                }
            });
        }

        const showForgotBtn = document.getElementById('showForgot');
        const backToLoginBtn = document.getElementById('backToLogin');
        const forgotForm = document.getElementById('forgotPasswordForm');
        const sendCodeBtn = document.getElementById('sendCodeBtn');
        const codeSection = document.getElementById('codeSection');
        const resetPassBtn = document.getElementById('resetPassBtn');
        const forgotMessage = document.getElementById('forgotMessage');
        const forgotEmail = document.getElementById('forgotEmail');

        if (showForgotBtn) {
            showForgotBtn.addEventListener('click', (e) => {
                e.preventDefault();
                container.classList.add('show-forgot');
            });
        }

        if (backToLoginBtn) {
            backToLoginBtn.addEventListener('click', () => {
                container.classList.remove('show-forgot');
                forgotMessage.textContent = '';
                codeSection.classList.remove('show');
                forgotForm.reset();
            });
        }

        if (sendCodeBtn) {
            sendCodeBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const email = forgotEmail.value.trim();

                if (email === '' || !email.includes('@')) {
                    forgotMessage.textContent = 'Please enter a valid email.';
                    forgotMessage.style.color = '#e74c3c';
                    return;
                }

                forgotMessage.textContent = `A verification code has been sent to ${email}`;
                forgotMessage.style.color = '#27ae60';
                codeSection.classList.add('show');
            });
        }

        if (forgotForm) {
            forgotForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const code = document.getElementById('verificationCode').value.trim();
                const newPass = document.getElementById('newPassword').value;

                if (code === '' || newPass === '') {
                    forgotMessage.textContent = 'Please fill in all fields.';
                    forgotMessage.style.color = '#e74c3c';
                    return;
                }

                if (newPass.length < 6) {
                    forgotMessage.textContent = 'Password must be at least 6 characters.';
                    forgotMessage.style.color = '#e74c3c';
                    return;
                }

                forgotMessage.textContent = 'Your password has been reset successfully!';
                forgotMessage.style.color = '#27ae60';

                localStorage.setItem('user_password', newPass);

                setTimeout(() => {
                    container.classList.remove('show-forgot');
                    forgotMessage.textContent = '';
                    codeSection.classList.remove('show');
                    forgotForm.reset();
                }, 1500);
            });
        }
    }
}

function initGlobalScripts() {
    let lastScrollTop = 0;
    const navbar = document.querySelector(".navbar-wrapper");

    if (navbar) {
        window.addEventListener("scroll", function () {
            const currentScroll =
                window.pageYOffset || document.documentElement.scrollTop;

            if (currentScroll > lastScrollTop && currentScroll > 100) {
                navbar.classList.add("hidden");
            } else {
                navbar.classList.remove("hidden");
            }
            lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
        });
    }
}

function scrollToTop() {
    const buttons = document.querySelectorAll('.pages-number-wrapper button');

    buttons.forEach((button) => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            })
        })
    })
}

function initCheckoutPage() {
    const checkoutForm = document.querySelector('.checkout-wrapper .block-left form');

    if (checkoutForm) {

        const successAlert = document.querySelectorAll('.alert')[0];
        const errorAlert = document.querySelectorAll('.alert')[1];

        checkoutForm.addEventListener('submit', function (event) {

            event.preventDefault();
            if (checkoutForm.checkValidity()) {


                successAlert.style.display = 'block';
                errorAlert.style.display = 'none';

                window.scrollTo({top: 0, behavior: 'smooth'});


                setTimeout(() => {
                    successAlert.style.display = 'none';
                }, 3000);


            } else {
                console.log('Form chưa hợp lệ. Vui lòng điền đủ thông tin.');
            }
        });
    }
}

function initUserInfoPage() {
    const orderHistoryContainer = document.querySelector('.order-list-body');

    if (orderHistoryContainer) {
        const successAlert = document.querySelector('.alert');
        const cancelButtons = document.querySelectorAll('.cancel-btn:not(:disabled)');

        cancelButtons.forEach(button => {
            button.addEventListener('click', function (event) {
                event.preventDefault();

                successAlert.style.display = 'block';
                window.scrollTo({top: 0, behavior: 'smooth'});

                setTimeout(() => {
                    successAlert.style.display = 'none';
                }, 3000);

                const orderCard = button.closest('.order-card');
                const status = orderCard.querySelector('.order-status');

                status.textContent = 'Canceled';
                status.classList.remove('processing');
                status.classList.add('canceled');

                button.disabled = true;
            });
        });
    }
}

function initNewsletter() {

    const newsletterBtn = document.querySelector('.newsletter-btn');
    const newsletterInput = document.querySelector('.newsletter-input');

    const successAlert = document.querySelector('.alert');


    if (newsletterBtn && newsletterInput && successAlert) {

        newsletterBtn.addEventListener('click', function (event) {
            event.preventDefault();

            const email = newsletterInput.value.trim();

            if (email && email.includes('@') && email.includes('.')) {

                successAlert.textContent = 'Subscribed successfully! Please check your email.';
                successAlert.style.backgroundColor = '#2e7d32';
                successAlert.style.display = 'block';
                window.scrollTo({top: 0, behavior: 'smooth'});

                setTimeout(() => {
                    successAlert.style.display = 'none';
                }, 3000);

                newsletterInput.value = '';

            } else {

                console.log('Invalid email');

            }
        });
    }
}

function initAdvancedSearch() {
    const filterOptionsList = document.querySelector('.filter-options-list');
    const activeFiltersContainer = document.querySelector('.active-filters-container');
    const filterTagsDisplay = document.querySelector('.filter-tags-display');
    const clearAllBtn = document.querySelector('.clear-all-tags-btn');

    if (!filterOptionsList || !activeFiltersContainer || !filterTagsDisplay || !clearAllBtn) {
        return;
    }

    filterOptionsList.addEventListener('change', (event) => {
        const target = event.target;
        if (target.matches('input[type="checkbox"]') || target.matches('input[type="radio"]')) {
            updateSearchTags();
        }
    });

    clearAllBtn.addEventListener('click', clearAllFilters);

    function updateSearchTags() {
        filterTagsDisplay.innerHTML = '';
        const checkedInputs = filterOptionsList.querySelectorAll('input:checked');

        checkedInputs.forEach(input => {
            let filterType = input.closest('li').querySelector('h4') ? input.closest('li').querySelector('h4').textContent.trim() : 'Filter';
            const tagTextRaw = input.parentNode.textContent.trim();

            let tagText = tagTextRaw;
            if (input.type === 'radio') {
                tagText = `${filterType}: ${tagTextRaw}`;
            } else if (input.type === 'checkbox') {
                tagText = tagTextRaw;
            }

            const tag = document.createElement('span');
            tag.className = 'filter-tag';
            tag.innerHTML = `${tagText} <i class="fa fa-times-circle" data-filter-value="${input.value}"></i>`;

            tag.querySelector('.fa-times-circle').addEventListener('click', removeTag);
            filterTagsDisplay.appendChild(tag);
        });

        const hasTags = checkedInputs.length > 0;

        // Điều chỉnh hiển thị của container chứa tags và nút Clear All
        if (hasTags) {
            activeFiltersContainer.style.display = 'flex';
            clearAllBtn.style.display = 'block';
        } else {
            activeFiltersContainer.style.display = 'none';
            clearAllBtn.style.display = 'none';
        }
    }

    function removeTag(event) {
        event.stopPropagation();
        const remover = event.target;
        const filterValue = remover.getAttribute('data-filter-value');

        const inputToUncheck = filterOptionsList.querySelector(`input[value="${filterValue}"]`);

        if (inputToUncheck) {
            inputToUncheck.checked = false;
        }

        updateSearchTags();
    }

    function clearAllFilters() {
        // Bỏ chọn tất cả filters
        filterOptionsList.querySelectorAll('input:checked').forEach(input => {
            input.checked = false;
        });

        // Cập nhật Tags và nút X tổng
        updateSearchTags();
    }
}


document.addEventListener("DOMContentLoaded", function () {
    initProductDetailPage();
    initLoginPage();
    initGlobalScripts();
    scrollToTop();
    initCheckoutPage();
    initUserInfoPage();
    initNewsletter();
    initAdvancedSearch();
});