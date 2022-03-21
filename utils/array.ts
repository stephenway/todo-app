interface IdObj {
  id: number;
}

export const idSort = (arr) => arr.sort((a: IdObj, b: IdObj) => a.id - b.id);
