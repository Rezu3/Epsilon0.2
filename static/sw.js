// static/sw.js
const CACHE_NAME = 'epsilon-v1';
const urlsToCache = [
  '/',
  '/static/css/login.css',
  '/static/css/admin_dashboard.css',
  '/static/css/admin_students.css',
  '/static/css/admin_teachers.css',
  '/static/css/exam.css',
  '/static/css/results.css',
  '/static/css/rank.css',
  '/static/css/student_dashboard.css',
  '/static/css/teacher_dashboard.css',
  '/static/js/login.js',
  '/static/js/admin_dashboard.js',
  '/static/js/admin_students.js',
  '/static/js/admin_teachers.js',
  '/static/js/exam.js',
  '/static/js/results.js',
  '/static/js/rank.js',
  '/static/js/student_dashboard.js',
  '/static/js/teacher_home.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
