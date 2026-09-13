/* =========================================================
   PORTFOLIO 2.0
   MUHAMMAD SALMAN TAHIR
   MAIN SCRIPT.JS
   - Typing Animation
   - Theme Toggle
   - Mobile Menu
   - Active Nav
   - Navbar Scroll
   - Scroll Reveal
   - EmailJS Contact Form
   - Back to Top
   - Project Filter
   - Skill Stagger
   - AI Assistant (Gemini API + Smart Fallback)
   - Card Click Glow
   - Blog Auto-Load (Dev.to RSS)
========================================================= */


/* =========================================================
   1. TYPING EFFECT
========================================================= */

const typing = document.getElementById("typing");

if (typing) {

    const roles = [
        "Frontend Web Developer",
        "SEO Engineer",
        "Graphic Designer",
        "Video Editor",
        "UI/UX Web Flow"
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeEffect() {

        let currentText = roles[roleIndex];

        if (!deleting) {

            typing.innerHTML = currentText.substring(0, charIndex++);

            if (charIndex > currentText.length) {
                deleting = true;
                setTimeout(typeEffect, 1500);
                return;
            }

        } else {

            typing.innerHTML = currentText.substring(0, charIndex--);

            if (charIndex === 0) {
                deleting = false;
                roleIndex++;
                if (roleIndex >= roles.length) roleIndex = 0;
            }

        }

        setTimeout(typeEffect, deleting ? 60 : 100);

    }

    typeEffect();

}



/* =========================================================
   2. THEME TOGGLE
========================================================= */

const themeToggle = document.getElementById("themeToggle");

if (themeToggle) {

    const themeIcon = themeToggle.querySelector("i");
    const body = document.body;

    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "light") {

        body.classList.add("light-mode");

        if (themeIcon) {
            themeIcon.classList.remove("fa-moon");
            themeIcon.classList.add("fa-sun");
        }

    }

    themeToggle.addEventListener("click", () => {

        body.classList.toggle("light-mode");

        const isLight = body.classList.contains("light-mode");

        if (themeIcon) {

            if (isLight) {
                themeIcon.classList.remove("fa-moon");
                themeIcon.classList.add("fa-sun");
            } else {
                themeIcon.classList.remove("fa-sun");
                themeIcon.classList.add("fa-moon");
            }

        }

        localStorage.setItem("theme", isLight ? "light" : "dark");

    });

}



/* =========================================================
   3. MOBILE MENU
========================================================= */

const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

if (menuBtn && navLinks) {

    const menuIcon = menuBtn.querySelector("i");

    menuBtn.addEventListener("click", (e) => {

        e.stopPropagation();

        navLinks.classList.toggle("active");

        const isOpen = navLinks.classList.contains("active");

        menuBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");

        if (menuIcon) {

            if (isOpen) {
                menuIcon.classList.remove("fa-bars");
                menuIcon.classList.add("fa-xmark");
            } else {
                menuIcon.classList.remove("fa-xmark");
                menuIcon.classList.add("fa-bars");
            }

        }

    });

    document.querySelectorAll(".nav-links a").forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("active");
            menuBtn.setAttribute("aria-expanded", "false");

            if (menuIcon) {
                menuIcon.classList.remove("fa-xmark");
                menuIcon.classList.add("fa-bars");
            }

        });

    });

    document.addEventListener("click", (e) => {

        if (!navLinks.contains(e.target) && !menuBtn.contains(e.target)) {

            navLinks.classList.remove("active");
            menuBtn.setAttribute("aria-expanded", "false");

            if (menuIcon) {
                menuIcon.classList.remove("fa-xmark");
                menuIcon.classList.add("fa-bars");
            }

        }

    });

}



/* =========================================================
   4. ACTIVE NAV LINK ON SCROLL
========================================================= */

/* =========================================================
   4. ACTIVE NAV LINK — SAME-PAGE SECTIONS + MULTI-PAGE
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const navLinks = document.querySelectorAll(".nav-links a");
    const currentPath = window.location.pathname.split("/").pop() || "index.html";
    const isHomePage = currentPath === "index.html" || currentPath === "";

    // =========================================================
    // HELPER: Ek link ko active karo (baaki hata do)
    // =========================================================

    function setActiveLink(activeLink) {

        navLinks.forEach(link => link.classList.remove("active"));

        if (activeLink) {
            activeLink.classList.add("active");
        }

    }

    // =========================================================
    // STEP 1: PAGE LOAD PE — Current Page Ka Link Active Karo
    // =========================================================

    function setInitialActive() {

        let foundActive = false;

        // Pehle page match karo
        navLinks.forEach(link => {

            const href = link.getAttribute("href");
            if (!href) return;

            // Same page ka link
            if (href === currentPath) {
                setActiveLink(link);
                foundActive = true;
            }

            // Home page ke liye special case
            if (isHomePage && href === "index.html") {
                setActiveLink(link);
                foundActive = true;
            }

        });

        // Agar koi page match nahi hua — Home ko active karo
        if (!foundActive) {
            const homeLink = document.querySelector('.nav-links a[href="index.html"]');
            if (homeLink) homeLink.classList.add("active");
        }

    }

    setInitialActive();

    // =========================================================
    // STEP 2: SCROLL PE — Home Page Ke Sections Check Karo
    // =========================================================

    if (isHomePage) {

        const sections = document.querySelectorAll("section[id], header[id]");

        window.addEventListener("scroll", () => {

            let current = "";
            const scrollY = window.scrollY;

            sections.forEach(section => {

                const sectionTop = section.offsetTop - 200;
                const sectionHeight = section.offsetHeight;

                if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                    current = section.id;
                }

            });

            // Agar page ke top pe hain — Home active
            if (scrollY < 200) {
                current = "home";
            }

            // Section ke hisaab se link active karo
            if (current) {

                let matched = false;

                navLinks.forEach(link => {

                    const href = link.getAttribute("href");
                    if (!href) return;

                    // Same page ke sections
                    if (href === "#" + current) {
                        setActiveLink(link);
                        matched = true;
                    }

                    // index.html#section format
                    if (href === "index.html#" + current) {
                        setActiveLink(link);
                        matched = true;
                    }

                    // Home page pe "home" section
                    if (current === "home" && (href === "index.html" || href === "#home")) {
                        setActiveLink(link);
                        matched = true;
                    }

                });

            }

        });

    }

    // =========================================================
    // STEP 3: HASH CHANGE PE — Update Active Link
    // =========================================================

    window.addEventListener("hashchange", () => {

        const hash = window.location.hash;

        if (hash) {

            navLinks.forEach(link => {

                const href = link.getAttribute("href");

                if (href === hash || href === currentPath + hash || href === "index.html" + hash) {
                    setActiveLink(link);
                }

            });

        }

    });

});

/* =========================================================
   5. NAVBAR SCROLL SHADOW
========================================================= */

const navbar = document.getElementById("navbar");

if (navbar) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 50) {
            navbar.style.boxShadow = "0 10px 40px rgba(0, 0, 0, 0.3)";
        } else {
            navbar.style.boxShadow = "none";
        }

    });

}



/* =========================================================
   6. SCROLL REVEAL ANIMATION
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const revealElements = document.querySelectorAll(
        ".skill-card, .project-card, .certificate-card, .blog-card, .highlight, .timeline-item"
    );

    if (revealElements.length === 0) return;

    const observer = new IntersectionObserver((entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                observer.unobserve(entry.target);

            }

        });

    }, {

        threshold: 0.1,

        rootMargin: "0px 0px -50px 0px"

    });

    revealElements.forEach((el) => {

        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "opacity 0.6s ease, transform 0.6s ease";

        observer.observe(el);

    });

});



/* =========================================================
   7. EMAILJS SETUP
========================================================= */

if (typeof emailjs !== "undefined") {
    emailjs.init("h0P7aOoSzMjcF2P4O");
}



/* =========================================================
   8. CONTACT FORM
========================================================= */

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const submitBtn = contactForm.querySelector(".form-submit");
        const originalText = submitBtn.innerHTML;

        submitBtn.innerHTML = 'Sending... <i class="fa-solid fa-spinner fa-spin"></i>';
        submitBtn.disabled = true;

        const params = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            message: document.getElementById("message").value
        };

        emailjs.send(
            "service_7hyh6zu",
            "template_dinba4t",
            params
        )
        .then(() => {

            showFormMessage("Message Sent Successfully ✅", "success");

            contactForm.reset();

            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;

        })
        .catch(() => {

            showFormMessage("Message Sending Failed ❌", "error");

            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;

        });

    });


    function showFormMessage(text, type) {

        const existing = contactForm.querySelector(".form-message");
        if (existing) existing.remove();

        const msg = document.createElement("div");
        msg.className = "form-message " + type;
        msg.textContent = text;

        msg.style.cssText = `
            padding: 12px 16px;
            border-radius: 10px;
            font-size: 13px;
            font-weight: 600;
            margin-top: 10px;
            animation: fadeInMsg 0.3s ease;
            ${type === "success"
                ? "background: rgba(53, 229, 140, 0.1); color: #35e58c; border: 1px solid rgba(53, 229, 140, 0.3);"
                : "background: rgba(255, 100, 100, 0.1); color: #ff6464; border: 1px solid rgba(255, 100, 100, 0.3);"
            }
        `;

        contactForm.appendChild(msg);

        setTimeout(() => {

            msg.style.opacity = "0";
            msg.style.transition = "opacity 0.3s ease";

            setTimeout(() => msg.remove(), 300);

        }, 5000);

    }

}



/* =========================================================
   9. BACK TO TOP BUTTON
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    let backToTop = document.getElementById("backToTop");

    if (!backToTop) {

        backToTop = document.createElement("button");
        backToTop.id = "backToTop";
        backToTop.className = "back-to-top";
        backToTop.setAttribute("aria-label", "Back to top");
        backToTop.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';

        document.body.appendChild(backToTop);

    }

    window.addEventListener("scroll", () => {

        if (window.scrollY > 500) {
            backToTop.classList.add("visible");
        } else {
            backToTop.classList.remove("visible");
        }

    });

    backToTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

});



/* =========================================================
   10. PROJECT FILTER (for projects.html)
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const filterBtns = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");

    if (filterBtns.length === 0 || projectCards.length === 0) return;

    filterBtns.forEach((btn) => {

        btn.addEventListener("click", () => {

            filterBtns.forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");

            const filter = btn.getAttribute("data-filter");

            projectCards.forEach((card) => {

                const category = card.getAttribute("data-category") || "";

                if (filter === "all" || category.includes(filter)) {

                    card.classList.remove("hidden");
                    card.style.animation = "fadeInCard 0.4s ease";

                } else {

                    card.classList.add("hidden");

                }

            });

        });

    });

});



/* =========================================================
   11. SKILL CARD STAGGER
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const skillCards = document.querySelectorAll(".skill-card");

    if (skillCards.length === 0) return;

    skillCards.forEach((card, index) => {

        card.style.transitionDelay = (index * 0.05) + "s";

    });

});



/* =========================================================
   12. AI ASSISTANT — GEMINI API + SMART FALLBACK
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const aiBtn = document.getElementById("aiAssistantBtn");
    const aiPanel = document.getElementById("aiPanel");
    const closeAi = document.getElementById("closeAi");
    const aiMessages = document.getElementById("aiMessages");
    const aiForm = document.getElementById("aiForm");
    const aiInput = document.getElementById("aiInput");
    const suggestions = document.querySelectorAll(".ai-suggestions button");

    if (!aiBtn || !aiPanel) return;


    /* -----------------------------------------
       GEMINI API CONFIG
       ⚠️ APNI API KEY YAHAN DAALO
    ----------------------------------------- */

const GEMINI_API_KEY = "AQ.Ab8RN6LKN1nbGXnlduvEPtePpcZBWllZk5nhvWKpo2GAR2Hgxg";
    const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;


    /* -----------------------------------------
       SYSTEM PROMPT — NATURAL, FRIENDLY
    ----------------------------------------- */

    const SYSTEM_PROMPT = `You are Salman AI — Muhammad Salman Tahir's friendly portfolio assistant. You chat naturally with visitors like a helpful human, and you know everything about Salman.

ABOUT SALMAN:
- Full Name: Muhammad Salman Tahir
- Role: Frontend Developer & Software Engineer
- Location: Lahore, Pakistan
- Education: BS Computer Science (Final Year), Lahore Leads University, CGPA 3.63
- Languages: English, Urdu, Punjabi

SKILLS:
- Frontend: HTML5, CSS3, JavaScript, Responsive Design
- Tools: Git, GitHub, VS Code, Debugging
- Design: Graphic Design, Video Editing, UI/UX, Web Flow
- Data & AI: Microsoft Power BI (Certified), AI Using Python
- Other: APIs, SEO, Social Media Marketing, Cloud Computing

EXPERIENCE:
- Frontend Developer Intern at InternGrow (Current)
- SEO Engineer (1 year)
- Social Media Marketer (6 months)

PROJECTS:
- Portfolio Website — HTML, CSS, JS, AI Assistant, dark/light theme
- Live Weather App — Open-Meteo API
- Music Player — playlist & volume controls
- Calculator App — dark/light mode
- Quranic Website — clean template

CONTACT:
- Email: muhammadsalman4674@gmail.com
- GitHub: github.com/king234-coder
- LinkedIn: linkedin.com/in/muhammad-salman-tahir-0aa77a356
- Portfolio: king234-coder.github.io/my-portfolio

AVAILABILITY:
- YES, Salman is AVAILABLE for remote work worldwide ✅
- Open to: internships, freelance projects, full-time roles
- Can work remotely from Lahore, Pakistan
- Comfortable with: video calls, async work, flexible time zones
- Response time: usually within 24 hours

FREELANCE SERVICES:
- Frontend Web Development
- Responsive Website Design
- UI/UX Design
- Basic SEO
- Graphic Design
- Video Editing

PERSONALITY:
- Friendly, warm, professional
- Talk like a helpful human assistant
- Use light emojis (1 max per response)
- Keep answers short and natural (2-4 sentences)

CONVERSATION RULES:
1. ALWAYS greet back warmly if someone says "hi", "hello", "hey", "salam", etc.
2. Chat naturally — don't be robotic
3. If someone asks a general question (like "how are you?"), respond warmly and then guide them to Salman's info
4. If someone asks about Salman — answer confidently from the info above
5. If someone asks about remote work, freelance, or hire — ALWAYS say YES, Salman is available
6. If someone asks something you genuinely don't know — say: "That's a great question! For that, you can reach Salman directly at muhammadsalman4674@gmail.com 📧"
7. If someone asks unrelated questions (math, coding help, etc.) — politely redirect: "I'm here to help with Salman's portfolio! For that question, feel free to email Salman directly. 😊"
8. NEVER say "I'm not sure" for simple greetings or availability questions
9. NEVER be rude or dismissive

EXAMPLES:
- User: "Hello" → You: "Hey there! 👋 Welcome to Salman's portfolio. How can I help you today?"
- User: "How are you?" → You: "I'm doing great, thanks for asking! 😊 What would you like to know about Salman?"
- User: "Can Salman work remotely?" → You: "Yes! Salman is available for remote work worldwide. He works from Lahore, Pakistan and is comfortable with flexible time zones. 🌍"
- User: "Can I hire him?" → You: "Yes! Salman is open to freelance projects, internships, and full-time roles. Feel free to reach out at muhammadsalman4674@gmail.com. 💼"
- User: "What does he do?" → You: "Salman is a Frontend Developer who builds modern, responsive websites using HTML, CSS, and JavaScript. He's also skilled in UI/UX design and SEO. 💻"`;


    /* -----------------------------------------
       ASK GEMINI
    ----------------------------------------- */

    async function askGemini(question) {

        try {

            const response = await fetch(GEMINI_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: SYSTEM_PROMPT + "\n\nUser message: " + question
                        }]
                    }],
                    generationConfig: {
                        temperature: 0.85,
                        maxOutputTokens: 300,
                        topP: 0.9,
                        topK: 40
                    }
                })
            });

            const data = await response.json();

            if (data.candidates && data.candidates[0] && data.candidates[0].content) {
                return data.candidates[0].content.parts[0].text;
            }

            if (data.error) {
                console.error("Gemini Error:", data.error);
                return getFallbackAnswer(question);
            }

            return getFallbackAnswer(question);

        } catch (error) {

            console.error("Gemini API Error:", error);
            return getFallbackAnswer(question);

        }

    }


    /* -----------------------------------------
       SMART FALLBACK — Natural Answers
    ----------------------------------------- */

    function getFallbackAnswer(question) {

        const q = question.toLowerCase().trim();

        // Greetings
        if (q.match(/^(hi|hello|hey|salam|assalam|aoa|hola|sup|yo|good morning|good evening)/)) {
            return "Hey there! 👋 Welcome to Salman's portfolio. How can I help you today?";
        }

        if (q.includes("how are you")) {
            return "I'm doing great, thanks for asking! 😊 What would you like to know about Salman?";
        }

        // Remote work
        if (q.includes("remote") || q.includes("work from home") || q.includes("online") || q.includes("anywhere")) {
            return "Yes! Salman is available for remote work worldwide. He works from Lahore, Pakistan and is comfortable with flexible time zones. 🌍";
        }

        // Freelance / Hire
        if (q.includes("freelance") || q.includes("hire") || q.includes("available") || q.includes("opportunity") || q.includes("job")) {
            return "Yes! Salman is available for freelance projects, internships, and full-time roles. Feel free to reach out at muhammadsalman4674@gmail.com. 💼";
        }

        // Skills
        if (q.includes("skill") || q.includes("tech") || q.includes("know")) {
            return "Salman works with HTML5, CSS3, JavaScript, and responsive design. He also knows Git, GitHub, APIs, UI/UX, and Microsoft Power BI. 💻";
        }

        // Projects
        if (q.includes("project") || q.includes("built") || q.includes("made")) {
            return "Salman has built a Portfolio Website, Live Weather App, Music Player, Calculator, and Quranic Website. 🚀";
        }

        // Contact
        if (q.includes("contact") || q.includes("email") || q.includes("reach")) {
            return "You can reach Salman at muhammadsalman4674@gmail.com or via LinkedIn. 📧";
        }

        // Who / About
        if (q.includes("who") || q.includes("about") || q.includes("yourself")) {
            return "Salman is a Frontend Developer from Lahore, Pakistan, currently studying Computer Science (Final Year) at Lahore Leads University. 💡";
        }

        // Experience
        if (q.includes("experience") || q.includes("intern")) {
            return "Salman is currently a Frontend Developer Intern at InternGrow. He also worked as an SEO Engineer for 1 year. 💼";
        }

        // Education
        if (q.includes("education") || q.includes("study") || q.includes("university") || q.includes("college")) {
            return "Salman is in his final year of BS Computer Science at Lahore Leads University with a CGPA of 3.63. 🎓";
        }

        // Services
        if (q.includes("service") || q.includes("offer") || q.includes("provide")) {
            return "Salman offers Frontend Web Development, UI/UX Design, Responsive Website Design, SEO, Graphic Design, and Video Editing. ✨";
        }

        // Thanks
        if (q.includes("thank") || q.includes("shukriya")) {
            return "You're welcome! 😊 Anything else you'd like to know about Salman?";
        }

        // Bye
        if (q.includes("bye") || q.includes("goodbye") || q.includes("see you") || q.includes("khuda hafiz")) {
            return "Goodbye! 👋 Thanks for visiting Salman's portfolio. Feel free to reach out anytime!";
        }

        // Default
        return "That's a great question! For that, you can reach Salman directly at muhammadsalman4674@gmail.com 📧. Is there anything else about Salman I can help with?";

    }


    /* -----------------------------------------
       ADD MESSAGE
    ----------------------------------------- */

    function addMessage(text, sender) {

        const msg = document.createElement("div");
        msg.className = "ai-message " + sender;
        msg.innerHTML = text;
        aiMessages.appendChild(msg);
        aiMessages.scrollTop = aiMessages.scrollHeight;

    }


    /* -----------------------------------------
       TYPING INDICATOR
    ----------------------------------------- */

    function showTyping() {

        const typing = document.createElement("div");
        typing.className = "ai-message bot typing-indicator";
        typing.innerHTML = '<span class="dot"></span><span class="dot"></span><span class="dot"></span>';
        aiMessages.appendChild(typing);
        aiMessages.scrollTop = aiMessages.scrollHeight;
        return typing;

    }


    /* -----------------------------------------
       HANDLE QUESTION
    ----------------------------------------- */

    async function handleQuestion(question) {

        if (!question.trim()) return;

        addMessage(question, "user");
        const typing = showTyping();

        try {

            let answer;

            if (GEMINI_API_KEY && GEMINI_API_KEY !== "YOUR_GEMINI_API_KEY_HERE") {
                answer = await askGemini(question);
            } else {
                answer = getFallbackAnswer(question);
            }

            typing.remove();
            addMessage(answer, "bot");

        } catch (error) {

            typing.remove();
            addMessage(getFallbackAnswer(question), "bot");

        }

    }


    /* -----------------------------------------
       OPEN / CLOSE PANEL
    ----------------------------------------- */

    aiBtn.addEventListener("click", () => {

        aiPanel.classList.toggle("active");
        aiPanel.setAttribute("aria-hidden", aiPanel.classList.contains("active") ? "false" : "true");

        if (aiPanel.classList.contains("active")) {
            setTimeout(() => aiInput.focus(), 100);
        }

    });


    if (closeAi) {
        closeAi.addEventListener("click", () => {
            aiPanel.classList.remove("active");
            aiPanel.setAttribute("aria-hidden", "true");
        });
    }


    /* -----------------------------------------
       FORM SUBMIT
    ----------------------------------------- */

    if (aiForm) {
        aiForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const question = aiInput.value.trim();
            if (question) {
                handleQuestion(question);
                aiInput.value = "";
            }
        });
    }


    /* -----------------------------------------
       SUGGESTIONS
    ----------------------------------------- */

    suggestions.forEach(btn => {
        btn.addEventListener("click", () => {
            const question = btn.getAttribute("data-question");
            if (question) {
                handleQuestion(question);
            }
        });
    });


    /* -----------------------------------------
       ESCAPE TO CLOSE
    ----------------------------------------- */

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && aiPanel.classList.contains("active")) {
            aiPanel.classList.remove("active");
            aiPanel.setAttribute("aria-hidden", "true");
        }
    });

});



/* =========================================================
   13. CARD CLICK — 2 SECOND GLOW
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const cards = document.querySelectorAll(
        ".skill-card, .project-card, .certificate-card, .blog-card, .education-card, .achievement-card"
    );

    cards.forEach(card => {

        card.addEventListener("click", function (e) {

            if (e.target.closest("a") || e.target.closest("button")) return;

            cards.forEach(c => c.classList.remove("card-active"));
            this.classList.add("card-active");

            setTimeout(() => {
                this.classList.remove("card-active");
            }, 2000);

        });

    });

});



/* =========================================================
   14. BLOG - AUTO LOAD FROM DEV.TO RSS FEED
   - Home page (index.html): 3 articles
   - Blog page (blog.html): 9 articles
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const DEVTO_USERNAME = "salmantahir";
    const RSS_URL = `https://dev.to/feed/${DEVTO_USERNAME}`;
    const API_URL = "https://api.rss2json.com/v1/api.json?rss_url=" + encodeURIComponent(RSS_URL);

    const homeBlogGrid = document.getElementById("homeBlogGrid");
    const blogGrid = document.getElementById("blogGrid");

    if (!homeBlogGrid && !blogGrid) return;

    const loadingHTML = `
        <p style="color: var(--text-muted); text-align: center; grid-column: 1 / -1; padding: 40px 0;">
            <i class="fa-solid fa-spinner fa-spin"></i> Loading articles...
        </p>
    `;

    if (homeBlogGrid) homeBlogGrid.innerHTML = loadingHTML;
    if (blogGrid) blogGrid.innerHTML = loadingHTML;

    fetch(API_URL)
        .then(res => res.json())
        .then(data => {

            if (!data.items || data.items.length === 0) {

                const emptyHTML = `
                    <p style="color: var(--text-muted); text-align: center; grid-column: 1 / -1; padding: 40px 0;">
                        No articles yet. Check back soon!
                    </p>
                `;

                if (homeBlogGrid) homeBlogGrid.innerHTML = emptyHTML;
                if (blogGrid) blogGrid.innerHTML = emptyHTML;
                return;

            }

            // Home page - 3 articles
            if (homeBlogGrid) {
                homeBlogGrid.innerHTML = "";
                data.items.slice(0, 3).forEach(article => {
                    homeBlogGrid.appendChild(createBlogCard(article));
                });
            }

            // Blog page - 9 articles
            if (blogGrid) {
                blogGrid.innerHTML = "";
                data.items.slice(0, 9).forEach(article => {
                    blogGrid.appendChild(createBlogCard(article));
                });
            }

        })
        .catch(err => {

            console.error("Blog RSS Error:", err);

            const errorHTML = `
                <p style="color: var(--text-muted); text-align: center; grid-column: 1 / -1; padding: 40px 0;">
                    Unable to load articles. Visit 
                    <a href="https://dev.to/${DEVTO_USERNAME}" 
                       target="_blank" 
                       style="color: var(--accent); text-decoration: underline;">
                        my Dev.to profile
                    </a>.
                </p>
            `;

            if (homeBlogGrid) homeBlogGrid.innerHTML = errorHTML;
            if (blogGrid) blogGrid.innerHTML = errorHTML;

        });


    function createBlogCard(article) {

        const temp = document.createElement("div");
        temp.innerHTML = article.description;
        let excerpt = temp.textContent || temp.innerText || "";
        excerpt = excerpt.substring(0, 130).trim() + "...";

        const cat = (article.categories && article.categories[0]) || "Blog";
        const icon = getBlogIcon(cat);

        const card = document.createElement("article");
        card.className = "blog-card";
        card.innerHTML = `
            <div class="blog-icon">
                <i class="${icon}"></i>
            </div>
            <span class="blog-date">${cat}</span>
            <h3>${article.title}</h3>
            <p>${excerpt}</p>
            <a href="${article.link}" 
               class="blog-link" 
               target="_blank" 
               rel="noopener noreferrer">
                Read Article
                <i class="fa-solid fa-arrow-right"></i>
            </a>
        `;

        return card;

    }


    function getBlogIcon(category) {

        const cat = category.toLowerCase();

        if (cat.includes("javascript") || cat.includes("js")) return "fa-brands fa-js";
        if (cat.includes("css")) return "fa-brands fa-css3-alt";
        if (cat.includes("html")) return "fa-brands fa-html5";
        if (cat.includes("api")) return "fa-solid fa-cloud";
        if (cat.includes("career")) return "fa-solid fa-rocket";
        if (cat.includes("project")) return "fa-solid fa-code";
        if (cat.includes("debug")) return "fa-solid fa-bug";
        if (cat.includes("react")) return "fa-brands fa-react";
        if (cat.includes("tips")) return "fa-solid fa-lightbulb";
        if (cat.includes("webdev")) return "fa-solid fa-globe";

        return "fa-solid fa-pen";

    }

});