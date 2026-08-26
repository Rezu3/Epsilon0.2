// static/firebase-messaging-sw.js

importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: "AIzaSyDiL1Cg5FCy1etilDkrvykQCYrqNnzlT4A",
  authDomain: "the-epsilon.firebaseapp.com",
  projectId: "the-epsilon",
  storageBucket: "the-epsilon.firebasestorage.app",
  messagingSenderId: "414449833997",
  appId: "1:414449833997:web:1f41b0c9a74aebad25dd44",
  measurementId: "G-72MGV14V7V"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Background Notification Handler
messaging.onBackgroundMessage((payload) => {
  console.log('📬 Background Notification:', payload);
  
  const notificationTitle = payload.notification?.title || '📢 The Epsilon';
  const notificationOptions = {
    body: payload.notification?.body || 'আপনার জন্য নতুন নোটিফিকেশন!',
    icon: '/static/icon-192.png',
    badge: '/static/icon-192.png',
    vibrate: [200, 100, 200],
    data: payload.data || {}
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Notification Click Handler
self.addEventListener('notificationclick', function(event) {
  console.log('🔔 Notification Clicked');
  event.notification.close();
  
  const urlToOpen = event.notification?.data?.url || '/student_dashboard';
  
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true })
    .then(function(windowClients) {
      for (let i = 0; i < windowClients.length; i++) {
        const client = windowClients[i];
        if (client.url === urlToOpen && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    })
  );
});