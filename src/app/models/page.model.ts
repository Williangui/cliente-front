export class Page<T = any> {
  content: T[] = [];
  pageable?: Pageable;
  last?: boolean;
  totalElements?: number;
  totalPages?: number;
  first?: boolean;
  sort?: Sort;
  number?: number;
  numberOfElements?: number;
  size?: number;
  empty?: boolean;
  data: any;
}

export class Sort {
  sorted?: boolean;
  unsorted?: boolean;
  empty?: boolean;
}

export class Pageable {
  sort?: Sort;
  pageSize?: number;
  pageNumber?: number;
  offset?: number;
  paged?: boolean;
  unpaged?: boolean;
}
