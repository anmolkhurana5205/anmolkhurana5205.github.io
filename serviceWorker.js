const cacheName = "anmol-khurana-portfolio-v2";
const filesToCache = [
  "/",
  "/index.html",
  "/certificates.html",

  "/assets/Anmol Khurana's resume-v2.pdf",

  "/css/all.min.css",
  "/css/bootstrap.min.css",
  "/css/global.css",
  "/css/responsive.css",
  "/css/style.css",
  "/css/variables.css",

  "/dependencies/github-buttons/githubbuttons.js",
  "/dependencies/imagesloaded/imagesloaded.pkgd.min.js",
  "/dependencies/isotope/isotope.min.js",
  "/dependencies/magnific-popup/dist/jquery.magnific-popup.js",
  "/dependencies/magnific-popup/dist/magnific-popup.css",
  "/dependencies/owl-carousel/css/owl.carousel.min.css",
  "/dependencies/owl-carousel/css/owl.theme.default.min.css",
  "/dependencies/owl-carousel/js/owl.carousel.min.js",
  "/dependencies/Typewriter/typewriter.min.js",

  // "https://fonts.googleapis.com/css2?family=Kodchasan&display=swap",

  "/img/banner/Blogging.json",

  "/img/certificates/Achievement_CyberSecureX.jpg",
  "/img/certificates/anmol-khurana-Introduction-to-MongoDB (For Students)-certificate.png",
  "/img/certificates/AWS_Academy_Graduate___Cloud_Security_Foundations.png",
  "/img/certificates/Azure certificate.png",
  "/img/certificates/Blockchain Developer Training.jpg",
  "/img/certificates/Certificate of Merit (IMO) Maths Olympiad.png",
  "/img/certificates/CertificateOfCompletion_Getting Started with DevOps.png",
  "/img/certificates/Comprehensive Training on Unix and Linux OS Fundamentals.png",
  "/img/certificates/Cybersecurity_Foundation_Student_Certificate.png",
  "/img/certificates/DevOps Foundations.jpg",
  "/img/certificates/HeLa CrossRoadshow Workshop.jpg",
  "/img/certificates/HTML Essential Training.png",
  "/img/certificates/India Today Young Masters Quiz.jpg",
  "/img/certificates/innotech.png",
  "/img/certificates/innotech25.png",
  "/img/certificates/Introduction to SQL simplilearn.jpg",
  "/img/certificates/MLSA Data Analysis.png",
  "/img/certificates/NoSQL Course Training- MongoDB Developer.png",
  "/img/certificates/Participation_CyberSecureX.jpg",
  "/img/certificates/ReactJS for Beginners.jpg",

  "/img/logo/android-chrome-192x192.png",
  "/img/logo/android-chrome-256x256.png",
  "/img/logo/android-chrome-384x384.png",
  "/img/logo/android-chrome-512x512.png",
  "/img/logo/apple-touch-icon.png",
  "/img/logo/favicon-16x16.png",
  "/img/logo/favicon-32x32.png",
  "/img/logo/favicon.ico",
  "/img/logo/favicon.png",

  "/img/skills/bash.svg",
  "/img/skills/bootstrap.svg",
  "/img/skills/c.svg",
  "/img/skills/c++.svg",
  "/img/skills/css.svg",
  "/img/skills/docker.svg",
  "/img/skills/eclipse.svg",
  "/img/skills/expressjs.svg",
  "/img/skills/git.svg",
  "/img/skills/github.svg",
  "/img/skills/html.svg",
  "/img/skills/jasmine.svg",
  "/img/skills/java.svg",
  "/img/skills/javascript.svg",
  "/img/skills/jest.svg",
  "/img/skills/jupyter.svg",
  "/img/skills/mocha.svg",
  "/img/skills/mongodb.svg",
  "/img/skills/mysql.svg",
  "/img/skills/nextjs.svg",
  "/img/skills/nodejs.svg",
  "/img/skills/postman.svg",
  "/img/skills/python.svg",
  "/img/skills/react.svg",
  "/img/skills/redux.svg",
  "/img/skills/remix.svg",
  "/img/skills/solidity.svg",
  "/img/skills/tailwind-css.svg",
  "/img/skills/typescript.svg",
  "/img/skills/wordpress.svg",

  "/img/testimonials/anand-kumar.jpg",
  "/img/testimonials/akshat-shukla.png",
  "/img/testimonials/akshay-kumar-dubey.png",
  "/img/testimonials/akshay-malik.jpg",

  "/img/body-bg.png",
  "/img/client-info-bg.png",
  "/img/cursor.svg",
  "/img/footer-bg.png",

  "/js/all.min.js",
  "/js/bootstrap.min.js",
  "/js/jquery.3.4.1.js",
  "/js/main.js",

  "/manifest.json",
];

// Install phase — cache static files
self.addEventListener("install", (event) => {
  self.skipWaiting(); // activate immediately
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(filesToCache);
    })
  );
});

// Activate phase — clean old caches (if any)
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== cacheName)
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

// Fetch phase — prefer network first, fallback to cache
self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // If response is valid, clone and store it
        const responseClone = response.clone();
        caches.open(cacheName).then((cache) => {
          cache.put(event.request, responseClone);
        });
        return response;
      })
      .catch(() => caches.match(event.request)) // fallback to cache if offline
  );
});
