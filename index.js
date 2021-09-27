addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
});

const cache = caches.default

async function handleRequest(request) {
  const url = new URL(request.url)
  const imageURL = url.searchParams.get('url');
  if(!imageURL) {
    return new Response(null, {status: 206});
  }
  
  let response = await cache.match(imageURL)
  if (!response) {
    const imageRequest = new Request(imageURL, {headers: request.headers});
    response = await fetch(imageRequest)
    response = new Response(response.body,{headers: response.headers})
    response.headers.set("Cache-Control", "max-age=604800")
    cache.put(imageURL, response.clone())
  }
  return response
}
