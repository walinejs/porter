addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
});

async function handleRequest(request) {
  const url = new URL(request.url);
  const imageURL = url.searchParams.get('url');
  if(!imageURL) {
    return new Response(null, {status: 206});
  }

  const imageRequest = new Request(imageURL, {headers: request.headers});
  return fetch(imageRequest);
}
