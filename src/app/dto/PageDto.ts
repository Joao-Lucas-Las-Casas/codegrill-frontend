export interface PageDto<T> {
  page: number;
  size: number;
  total: number;
  content: T[];
}
