import html from './test.html';

function render() {
  const div = document.createElement('div');
  div.innerHTML = html;
  div.querySelector('.test').textContent = 'Hello World!';

  document.body.appendChild(div.childNodes[0]);
}

export default render;
