function initProductDetailPage() {
    const productImg = document.querySelector(".product-image img");
    const btnLeft = document.querySelector(".next-btn.left");
    const btnRight = document.querySelector(".next-btn.right");
    const addBtn = document.querySelector(".btn-add");
    const buyBtn = document.querySelector(".btn-buy")


    if (productImg && btnLeft && btnRight && addBtn && buyBtn) {
        const images = [
            "https://images.unsplash.com/photo-1590212151175-e58edd96185b?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1171",
            "https://images.unsplash.com/photo-1664454217818-11e5baf60205?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1170",
            "https://images.unsplash.com/photo-1669723008519-3b5043b5b826?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1180",
        ];
        let currentIndex = 0;

        function updateImage() {
            productImg.style.opacity = 0;
            setTimeout(() => {
                productImg.src = images[currentIndex];
                productImg.style.opacity = 1;
            }, 200);
        }

        btnRight.addEventListener("click", () => {
            currentIndex = (currentIndex + 1) % images.length;
            updateImage();
        });

        btnLeft.addEventListener("click", () => {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            updateImage();
        });

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
        const loginBtn = document.querySelector(".btn-login");

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
        const successAlert = document.querySelectorAll('.alert')[0]; // Cái alert màu xanh
        const errorAlert = document.querySelectorAll('.alert')[1];   // Cái alert màu đỏ

        checkoutForm.addEventListener('submit', function (event) {

            event.preventDefault();
            if (checkoutForm.checkValidity()) {

                successAlert.style.display = 'block';
                errorAlert.style.display = 'none';


                window.scrollTo({top: 0, behavior: 'smooth'});

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

                // Hiển thị thông báo
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

document.addEventListener("DOMContentLoaded", function () {
    initProductDetailPage();
    initLoginPage();
    initGlobalScripts();
    scrollToTop();
    initCheckoutPage();
    initUserInfoPage();
    initNewsletter();
});