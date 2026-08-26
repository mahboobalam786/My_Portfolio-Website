/* =====================================================
   PORTFOLIO JAVASCRIPT
===================================================== */


/* =====================================================
   EMAILJS
===================================================== */

if (typeof emailjs !== "undefined") {

    emailjs.init({
        publicKey: "C-aHEYwmP3Y9wuX45"
    });

    console.log("EmailJS initialized");

} else {

    console.error(
        "EmailJS library was not loaded."
    );

}


/* =====================================================
   MOBILE MENU
===================================================== */

const menuBtn =
    document.getElementById("menuBtn");

const navLinks =
    document.getElementById("navLinks");


if (menuBtn && navLinks) {

    menuBtn.addEventListener("click", () => {

        navLinks.classList.toggle("active");

        const icon =
            menuBtn.querySelector("i");

        if (
            navLinks.classList.contains("active")
        ) {

            icon.classList.remove("fa-bars");

            icon.classList.add("fa-xmark");

        } else {

            icon.classList.remove("fa-xmark");

            icon.classList.add("fa-bars");

        }

    });

}


/* Close menu */

document
    .querySelectorAll(".nav-links a")
    .forEach(link => {

        link.addEventListener("click", () => {

            navLinks?.classList.remove("active");

            const icon =
                menuBtn?.querySelector("i");

            if (icon) {

                icon.classList.remove("fa-xmark");

                icon.classList.add("fa-bars");

            }

        });

    });


/* =====================================================
   TYPING EFFECT
===================================================== */

const typing =
    document.getElementById("typing");

const words = [
    "Web Developer",
    "Frontend Developer",
    "UI Designer",
    "Java Developer",
    "Problem Solver"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;


function typeWriter() {

    if (!typing) return;

    const word =
        words[wordIndex];


    if (!deleting) {

        typing.textContent =
            word.substring(
                0,
                charIndex + 1
            );

        charIndex++;


        if (
            charIndex === word.length
        ) {

            deleting = true;

            setTimeout(
                typeWriter,
                1400
            );

            return;
        }


        setTimeout(
            typeWriter,
            90
        );


    } else {

        typing.textContent =
            word.substring(
                0,
                charIndex - 1
            );

        charIndex--;


        if (charIndex === 0) {

            deleting = false;

            wordIndex++;

            if (
                wordIndex >= words.length
            ) {

                wordIndex = 0;

            }

        }


        setTimeout(
            typeWriter,
            55
        );

    }

}


typeWriter();


/* =====================================================
   SCROLL REVEAL
===================================================== */

const revealElements =
    document.querySelectorAll(".reveal");


if (
    "IntersectionObserver" in window
) {

    const observer =
        new IntersectionObserver(

            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "show"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },

            {
                threshold: 0.08
            }

        );


    revealElements.forEach(element => {

        observer.observe(element);

    });


} else {

    revealElements.forEach(element => {

        element.classList.add("show");

    });

}


/* =====================================================
   PROJECT FILTER
===================================================== */

const filterButtons =
    document.querySelectorAll(".filter");

const projectCards =
    document.querySelectorAll(".project-card");


filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => {

            btn.classList.remove("active");

        });


        button.classList.add("active");


        const filter =
            button.dataset.filter;


        projectCards.forEach(card => {

            const categories =
                card.dataset.category || "";


            if (
                filter === "all" ||
                categories.includes(filter)
            ) {

                card.style.display = "";

                requestAnimationFrame(() => {

                    card.classList.add("show");

                });

            } else {

                card.style.display = "none";

            }

        });

    });

});


/* =====================================================
   ACTIVE NAVIGATION
===================================================== */

const sections =
    document.querySelectorAll(
        "section[id]"
    );

const navigationLinks =
    document.querySelectorAll(
        ".nav-links a"
    );


window.addEventListener(
    "scroll",
    () => {

        let current = "";


        sections.forEach(section => {

            const top =
                section.offsetTop - 200;


            if (
                window.scrollY >= top
            ) {

                current =
                    section.getAttribute("id");

            }

        });


        navigationLinks.forEach(link => {

            link.classList.remove("active");


            if (
                link.getAttribute("href") ===
                "#" + current
            ) {

                link.classList.add("active");

            }

        });

    }
);


/* =====================================================
   CONTACT FORM - EMAILJS
===================================================== */

const contactForm =
    document.getElementById(
        "contactForm"
    );

const submitBtn =
    document.getElementById(
        "submitBtn"
    );

const formMessage =
    document.getElementById(
        "formMessage"
    );


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        async event => {

            event.preventDefault();


            /* Check EmailJS */

            if (
                typeof emailjs === "undefined"
            ) {

                formMessage.textContent =
                    "❌ EmailJS is not loaded.";

                formMessage.className =
                    "form-message error";

                return;

            }


            /* Button loading */

            submitBtn.disabled = true;

            submitBtn.innerHTML =
                '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';


            /* Get values */

            const name =
                document
                    .getElementById("name")
                    .value
                    .trim();


            const email =
                document
                    .getElementById("email")
                    .value
                    .trim();


            const subject =
                document
                    .getElementById("subject")
                    .value
                    .trim();


            const message =
                document
                    .getElementById("message")
                    .value
                    .trim();


            /* EmailJS parameters */

            const templateParams = {

                name: name,

                email: email,

                subject: subject,

                message: message

            };


            try {

                const response =
                    await emailjs.send(

                        "service_vm6ix6x",

                        "template_ozgv8qo",

                        templateParams

                    );


                console.log(
                    "Email sent:",
                    response.status,
                    response.text
                );


                /* Success */

                formMessage.textContent =
                    "✅ Message sent successfully!";

                formMessage.className =
                    "form-message success";


                contactForm.reset();


            } catch (error) {

                console.error(
                    "EMAILJS ERROR:",
                    error
                );


                console.error(
                    "STATUS:",
                    error.status
                );


                console.error(
                    "TEXT:",
                    error.text
                );


                formMessage.textContent =
                    "❌ Message not sent. Please try again.";

                formMessage.className =
                    "form-message error";

            }


            /* Restore button */

            submitBtn.disabled = false;

            submitBtn.innerHTML =
                '<i class="fa-solid fa-paper-plane"></i> Send Message';

        }
    );

}


/* =====================================================
   MOUSE PARALLAX BACKGROUND
===================================================== */

document.addEventListener(
    "mousemove",
    event => {

        const x =
            event.clientX /
            window.innerWidth;

        const y =
            event.clientY /
            window.innerHeight;


        const spans =
            document.querySelectorAll(
                ".background span"
            );


        spans.forEach(
            (span, index) => {

                const speed =
                    (index + 1) * 4;


                span.style.marginLeft =
                    `${(x - 0.5) * speed}px`;


                span.style.marginTop =
                    `${(y - 0.5) * speed}px`;

            }
        );

    }
);


/* =====================================================
   SMOOTH BUTTON EFFECT
===================================================== */

document
    .querySelectorAll(".btn")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                button.style.transform =
                    "scale(0.97)";


                setTimeout(() => {

                    button.style.transform =
                        "";

                }, 120);

            }
        );

    });


/* =====================================================
   PAGE LOADED
===================================================== */

window.addEventListener(
    "load",
    () => {

        document.body.classList.add(
            "loaded"
        );

    }
);