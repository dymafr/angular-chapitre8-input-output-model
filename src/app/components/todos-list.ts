import {
  Component,
  computed,
  effect,
  input,
  output,
  signal,
} from '@angular/core';
import { Todo } from './todo';
import { TodoI } from '../shared/interfaces';
import { TodoFilter } from './todo-filter';

@Component({
  selector: 'app-todos-list',
  imports: [Todo, TodoFilter],
  template: `
    <hr />
    <app-todo-filter [filter]="filter()" (filterChange)="filter.set($event)" />
    <hr />
    <strong>Nombre de todos : {{ todosLength() }}</strong>
    <hr />
    <ul class="flex flex-col gap-12">
      @for(todo of filteredTodosList(); track todo.id ) {
      <app-todo (toggleTodo)="toggleTodo.emit($event)" [todo]="todo" />
      } @empty {
      <li>Il n'y a pas de todo pour l'instant</li>
      }
    </ul>
  `,
  styles: `ul { margin-top: 12px }`,
})
export class TodosList {
  filter = signal<string>('');
  todosList = input<TodoI[]>([]);
  todosLength = computed(() => this.todosList().length);
  filteredTodosList = computed(() =>
    this.todosList().filter((t) => t.name.toLowerCase().includes(this.filter()))
  );
  toggleTodo = output<string>();
}
