// service-worker.js

self.addEventListener('fetch', function(event) {
  if (event.request.url.includes('/api/get-random-line')) {
    event.respondWith(
      fetch(event.request)
        .then(response => response.json())
        .then(data => {
          // Perform any necessary transformation on the data here
          return new Response(JSON.stringify(data));
        })
        .catch(err => {
          console.error('Fetch error:', err);
        })
    );
  }
});
