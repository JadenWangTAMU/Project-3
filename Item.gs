function Item(name, description, statModifiers) {
  this.name = name;
  this.description = description;
  this.statModifiers = statModifiers; // expects { STR: 2, DEX: -1 }
}
