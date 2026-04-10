let todos = [];

    const form = document.getElementById('todoForm');
    const input = document.getElementById('todoInput');
    const list = document.getElementById('todoList');
    const counter = document.getElementById('counter');
    const priorityInput = docu
    ]|oment.getElementById('priorityInput');
    const deadlineInput = document.getElementById('deadlineInput');

    function render() {
      list.innerHTML = '';
      

      todos.forEach(todo => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex align-items-center justify-content-between gap-2';

        const left = document.createElement('div');
        left.className = 'd-flex align-items-center gap-2 flex-grow-1 overflow-hidden';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'form-check-input mt-0';
        checkbox.checked = todo.done;
        checkbox.addEventListener('change', () => {
          todo.done = checkbox.checked;
          render();
        });

        const span = document.createElement('span');
        span.textContent = todo.text;
        span.className = todo.done
        const badge = document.createElement('span');
        badge.textContent = todo.priority;

        if (todo.priority === 'high') badge.className = 'badge bg-danger';
        if (todo.priority === 'medium') badge.className = 'badge bg-warning text-dark';
        if (todo.priority === 'low') badge.className = 'badge bg-success';

        const date = document.createElement('small');
        date.className = 'text-muted ms-2';
        date.textContent = todo.deadline ? `📅 ${todo.deadline}` : '';

        left.appendChild(checkbox);
        left.appendChild(span);
        left.appendChild(badge);
        left.appendChild(date);

        const delBtn = document.createElement('button');
        delBtn.type = 'button';
        delBtn.className = 'btn btn-sm btn-outline-danger';
        delBtn.textContent = 'Delete';
        delBtn.addEventListener('click', () => {
          todos = todos.filter(t => t !== todo);
          render();
        });

        li.appendChild(left);
        li.appendChild(delBtn);
        list.appendChild(li);
      });

      const remaining = todos.filter(t => !t.done).length;
      counter.textContent = `${remaining} task${remaining !== 1 ? 's' : ''} left`;
    }

    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const text = input.value.trim();
      if (!text) return;
      todos.push({ text, done: false, priority: priorityInput.value, deadline:   deadlineInput.value });
      input.value = '';
      render();
    });

    render();