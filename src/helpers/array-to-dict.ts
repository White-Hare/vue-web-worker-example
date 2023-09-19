export function arrayToDict<T extends { id: string }>(items: T[]) {
    return items.reduce((acc, item) => ({ ...acc, [item.id]: item }), {} as Record<string, T>);
}
  