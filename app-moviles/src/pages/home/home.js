
const app = document.getElementById('app');

export async function homePage() {
  const res = await fetch('/src/pages/home/home.html');
  app.innerHTML = await res.text();
}