const inputEl = document.getElementById('title');
const createBtn = document.getElementById('create');
const listEl = document.getElementById('list');

const notes = [
  {
    title: 'Сделать Заметки',
    complet: true,
  },
];

function render() {
  listEl.innerHTML = '';
  for (let i = 0; i < notes.length; i++) {
    listEl.insertAdjacentHTML('beforeend', getNoteTemplate(notes[i], i));
  }
  if (notes.length == 0) {
    listEl.innerHTML = 'Заметки отсутсвуют';
  }
}
render();

function getNoteTemplate(notes, index) {
  return `<li 
    class="list-group-item d-flex justify-content-between align-items-center">
    <span class="${notes.complet ? 'text-decoration-line-through' : ''}">${notes.title}</span>
    <span>
        <span class="btn btn-small btn-${
          notes.complet ? 'waring' : 'success'
        }" data-index="${index}" data-type="toggle">&check;</span>
        <span class="btn btn-small btn-danger" data-index="${index}" data-type="remove">&times;</span>
    </span>
</li>`;
}

createBtn.onclick = function () {
  if (inputEl.value.length === 0) {
    return;
  }
  const newNote = {
    title: inputEl.value,
    complet: true,
  };
  notes.push(newNote);
  inputEl.value = '';
  render();
};
listEl.onclick = function (event) {
  //console.log(event.target)
  if (event.target.dataset.index) {
    const index = Number(event.target.dataset.index);
    const type = event.target.dataset.type;

    if (type === 'toggle') {
      notes[index].complet = !notes[index].complet;
    } else if (type === 'remove') {
      notes.splice(index, 1);
    }
    render();
  }
};
