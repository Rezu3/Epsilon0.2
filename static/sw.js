const CACHE_NAME = 'epsilon-v2';
const urlsToCache = [
  '/',
  '/static/css/login.css',
  '/static/css/rank.css',
  '/static/manifest.json'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
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
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});



// =============================================
// PUSH NOTIFICATION HANDLER
// =============================================

// Push event - Receive notification
self.addEventListener('push', function(event) {
    console.log('📬 Push Received:', event);
    
    let data = {
        title: '📢 The Epsilon',
        body: 'You have a new notification!',
        icon: '/static/icon-192.png',
        badge: '/static/icon-192.png',
        url: '/student_dashboard'
    };
    
    if (event.data) {
        try {
            const parsed = JSON.parse(event.data.text());
            data = { ...data, ...parsed };
        } catch(e) {
            data.body = event.data.text();
        }
    }
    
    const options = {
        body: data.body,
        icon: data.icon || '/static/icon-192.png',
        badge: data.badge || '/static/icon-192.png',
        vibrate: [200, 100, 200],
        sound: '/static/notification.mp3',
        data: {
            url: data.url || '/student_dashboard',
            noticeId: data.notice_id || null,
            dateOfArrival: Date.now()
        },
        actions: [
            {
                action: 'open',
                title: '📖 View Notice',
                icon: '/static/icon-192.png'
            },
            {
                action: 'close',
                title: '❌ Dismiss',
                icon: '/static/icon-192.png'
            }
        ]
    };
    
    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});

// Notification click event
self.addEventListener('notificationclick', function(event) {
    console.log('🔔 Notification clicked:', event);
    
    event.notification.close();
    
    const urlToOpen = event.notification.data?.url || '/student_dashboard';
    const noticeId = event.notification.data?.noticeId || null;
    
    // If noticeId exists, mark as read
    if (noticeId) {
        // You can send a request to mark as read here
        // But for simplicity, we'll just open the app
    }
    
    event.waitUntil(
        clients.matchAll({
            type: 'window',
            includeUncontrolled: true
        })
        .then(function(windowClients) {
            // Check if there's already a window/tab open
            for (let i = 0; i < windowClients.length; i++) {
                const client = windowClients[i];
                if (client.url === urlToOpen && 'focus' in client) {
                    return client.focus();
                }
            }
            // If not, open a new window
            if (clients.openWindow) {
                return clients.openWindow(urlToOpen);
            }
        })
    );
});
