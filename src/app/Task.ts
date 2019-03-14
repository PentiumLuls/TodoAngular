export class Task {
  id: number;
  name: string;
  list: string;
  checked: boolean;

  constructor(id, name, list, checked) {
    this.checked = checked;
    this.id = id;
    this.name = name;
    this.list = list;
  }
}
