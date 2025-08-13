export class QueryBuilder {
  private query: string;

  constructor(initialQuery: string = "") {
    this.query = initialQuery;
  }

  append(part: string): this {
    if (this.query.length > 0 && !this.query.endsWith(" ")) {
      this.query += " ";
    }
    this.query += part;
    return this;
  }

  toString(): string {
    return this.query.trim();
  }
}
