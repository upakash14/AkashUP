document.addEventListener("DOMContentLoaded", function () {
    const yearSpan = document.getElementById("year");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    loadProjectsFromXML();
    attachContactFormValidation();
});

// Contact form validation
function attachContactFormValidation() {
    const form = document.getElementById("contactForm");
    const status = document.getElementById("form-status");

    if (!form) return;

    form.addEventListener("submit", function (e) {
        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const subject = form.subject.value.trim();
        const message = form.message.value.trim();

        if (!name || !email || !subject || !message) {
            e.preventDefault();
            status.textContent = "Please fill all required fields.";
            status.style.color = "red";
            return;
        }

        const emailPattern = /\S+@\S+\.\S+/;
        if (!emailPattern.test(email)) {
            e.preventDefault();
            status.textContent = "Please enter a valid email address.";
            status.style.color = "red";
            return;
        }

        status.textContent = "Submitting...";
        status.style.color = "black";
    });
}

// XML + XSLT loader
function loadProjectsFromXML() {
    const container = document.getElementById("projects-container");
    if (!container) return;

    const xmlRequest = new XMLHttpRequest();
    xmlRequest.open("GET", "data/projects.xml", true);

    xmlRequest.onload = function () {
        if (xmlRequest.status === 200) {
            const xml = xmlRequest.responseXML;

            const xslRequest = new XMLHttpRequest();
            xslRequest.open("GET", "data/projects.xsl", true);

            xslRequest.onload = function () {
                if (xslRequest.status === 200) {
                    const xsl = xslRequest.responseXML;

                    if (window.XSLTProcessor) {
                        const processor = new XSLTProcessor();
                        processor.importStylesheet(xsl);
                        const fragment = processor.transformToFragment(xml, document);
                        container.innerHTML = "";
                        container.appendChild(fragment);
                    } else {
                        container.innerHTML = "<p>Your browser does not support XSLT.</p>";
                    }
                } else {
                    container.innerHTML = "<p>Unable to load XSL file.</p>";
                }
            };

            xslRequest.send();
        } else {
            container.innerHTML = "<p>Unable to load projects.</p>";
        }
    };

    xmlRequest.send();
}
