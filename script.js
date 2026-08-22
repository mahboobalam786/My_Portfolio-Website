// ==========================================
// EMAILJS INITIALIZATION
// ==========================================

emailjs.init({
    publicKey: "C-aHEYwmP3Y9wuX45"
});


// ==========================================
// MOBILE MENU
// ==========================================

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", function () {
        navLinks.classList.toggle("active");
    });
}

document.querySelectorAll(".nav-links a").forEach(function (link) {
    link.addEventListener("click", function () {
        if (navLinks) {
            navLinks.classList.remove("active");
        }
    });
});


// ==========================================
// CONTACT FORM
// ==========================================

const contactForm = document.getElementById("contactForm");
const submitBtn = document.getElementById("submitBtn");
const formMessage = document.getElementById("formMessage");

if (contactForm) {

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        submitBtn.innerText = "Sending...";
        submitBtn.disabled = true;

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const subject = document.getElementById("subject").value.trim();
        const message = document.getElementById("message").value.trim();

        const templateParams = {
            name: name,
            email: email,
            subject: subject,
            message: message
        };

        emailjs.send(
            "service_vm6ix6x",
            "template_ozgv8qo",
            templateParams
        )
        .then(function (response) {

            console.log("SUCCESS!", response.status, response.text);

            formMessage.innerText = "✅ Message sent successfully!";
            formMessage.style.color = "#00e5ff";

            contactForm.reset();

            submitBtn.innerText = "Send Message";
            submitBtn.disabled = false;

        })
        .catch(function (error) {

            console.error("EMAILJS ERROR:", error);
            console.error("STATUS:", error.status);
            console.error("TEXT:", error.text);

            formMessage.innerText =
                "❌ Error: " + (error.text || "Message not sent");

            formMessage.style.color = "#ff5c5c";

            submitBtn.innerText = "Send Message";
            submitBtn.disabled = false;

        });

    });

}