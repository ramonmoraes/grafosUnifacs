export type matrix = number[][];

export function getEmptyMatrix(size: number = 1, defaultValue: any = 0): matrix {
  let emptyMatrix: any = [];
  for (let i = 0; i < size; i++) {
    emptyMatrix[i] = [];
    for (let j = 0; j < size; j++) {
      emptyMatrix[i][j] = defaultValue;
    }
  }
  return emptyMatrix;
}

export function multiplyMatrix(m1: matrix, m2: matrix, boolean: boolean = false): matrix {
  const m1Rows = m1.length;
  const m2Rows = m2.length;
  const m1Columns = m1[0].length;
  const m2Columns = m2[0].length;

  if (m1Columns !== m2Rows) {
    console.error("Matrix can not be multiplied");
    return [[0]];
  }

  const m = getEmptyMatrix(m1Rows);

  for (let r = 0; r < m1Rows; ++r) {
    m[r] = new Array(m2Columns);
    for (let c = 0; c < m2Columns; ++c) {
      m[r][c] = 0;
      for (let i = 0; i < m1Columns; ++i) {
        m[r][c] += m1[r][i] * m2[i][c];
      }
    }
  }
  return boolean ? convertToBooleanMatrix(m) : m;
}

export function sumMatrix(m1: matrix, m2: matrix, boolean: boolean = false): matrix {
  const m1Rows = m1.length;
  const m2Rows = m2.length;
  const m1Columns = m1[0].length;
  const m2Columns = m2[0].length;

  if (m1Columns != m2Columns || m1Rows != m2Rows) {
    console.error("Matrix can not be summed");
    return [[0]];
  }

  const m = getEmptyMatrix(m1Rows);
  for (let i = 0; i < m1Rows; i++) {
    for (let j = 0; j < m1Columns; j++) {
      m[i][j] = m1[i][j] + m2[i][j];
    }
  }

  return boolean ? convertToBooleanMatrix(m) : m;
}

export function convertToBooleanMatrix(m: matrix): matrix {
  return m.map(column => column.map(val => (val > 0 ? 1 : 0)));
}

export function warshall(m: matrix, nodesAmount: number): matrix {
  for (let k = 0; k < nodesAmount; k++) {
    for (let i = 0; i < nodesAmount; i++) {
      for (let j = 0; j < nodesAmount; j++) {
        m[i][j] = boolSum(m[i][j], boolMult(m[i][k], m[k][j]));
      }
    }
  }
  return m;
}

function boolSum(n1: number, n2: number): number {
  return n1 > n2 ? n1 : n2;
}

function boolMult(n1: number, n2: number): number {
  return n1 < n2 ? n1 : n2;
}

export function logMatrix(m: matrix) {
  m.forEach(x => console.log(x));
}

export function dijkstra(m: matrix) {
  logMatrix(m);
}
