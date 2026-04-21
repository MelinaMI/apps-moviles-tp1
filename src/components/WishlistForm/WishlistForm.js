import templateHTML from './WishlistForm.html?raw';
import './WishlistForm.css';

let template = null;

function initTemplate() {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = templateHTML;
  template = wrapper.firstElementChild;
}

export function WishlistForm({ game, onSubmit }) {
  if (!template) initTemplate();

  const node = template.cloneNode(true);
  const find = (ref) => node.querySelector(`[data-ref="${ref}"]`);

  const modal         = node;
  const cancelBtn     = find('cancel');
  const submitBtn     = find('submit');
  const priorityInput = find('priority-input');
  const categoryInput = find('category-input');

  // ✅ Montar directamente en body para que se superponga a todo
  document.body.appendChild(modal);

  // ── Chips de prioridad ──────────────────────────────────────────
  const chips = node.querySelectorAll('[data-ref="priority-chips"] .chip');

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('selected'));
      chip.classList.add('selected');
      priorityInput.value = chip.dataset.value;
    });
  });

  // ── Dropdown custom de categoría ────────────────────────────────
  const selectTrigger  = find('select-trigger');
  const selectDropdown = find('select-dropdown');
  const selectLabel    = find('select-label');
  const options        = node.querySelectorAll('.select-option');

  selectTrigger.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = selectDropdown.classList.toggle('open');
    selectTrigger.classList.toggle('open', isOpen);
  });

  options.forEach(option => {
    option.addEventListener('click', () => {
      const value = option.dataset.value;
      options.forEach(o => o.classList.remove('selected'));
      option.classList.add('selected');
      selectLabel.textContent = value;
      categoryInput.value = value;
      selectDropdown.classList.remove('open');
      selectTrigger.classList.remove('open');
    });
  });

  document.addEventListener('click', () => {
    selectDropdown.classList.remove('open');
    selectTrigger.classList.remove('open');
  });

  // ── Open / Close ────────────────────────────────────────────────
  function open() {
    modal.classList.remove('hidden');
  }

  function close() {
    modal.classList.add('hidden');
    reset();
  }

  function reset() {
    chips.forEach(c => c.classList.remove('selected'));
    priorityInput.value = '';
    options.forEach(o => o.classList.remove('selected'));
    selectLabel.textContent = 'Select a category';
    categoryInput.value = '';
    const textarea = node.querySelector('textarea[name="note"]');
    if (textarea) textarea.value = '';
  }

  // ✅ destroy: quitar el modal del DOM cuando ya no se necesite
  function destroy() {
    document.body.removeChild(modal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) close();
  });

  cancelBtn.addEventListener('click', close);

  submitBtn.addEventListener('click', () => {
    const priority = Number(priorityInput.value);
    const category = categoryInput.value.trim();
    const note = node.querySelector('textarea[name="note"]').value.trim();

    if (!priority) {
      alert('Seleccioná una prioridad');
      return;
    }
    if (!category) {
      alert('Seleccioná una categoría');
      return;
    }

    onSubmit({ game, extraData: { priority, category, note } });
    close();
  });

  // ⚠️ Ya NO retornamos element — el modal está en el body, no hace falta montarlo afuera
  return { open, close, destroy };
}