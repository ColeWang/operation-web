namespace Api {
  interface Res<T> {
    actionResult: '1' | '-1' | '-2' | '-3';
    data: T;
    message: string;
  }
}
