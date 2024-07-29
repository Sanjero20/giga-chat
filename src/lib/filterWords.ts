import Filter from "bad-words";

const filter = new Filter();

export function filterBadWords(str: string) {
  return filter.clean(str);
}
