export class ServerResponse<SUCCESS_RESPONSE> {
  response: SUCCESS_RESPONSE | null;
  exception: string | null;
  isHandled: boolean = false;

  constructor(response: SUCCESS_RESPONSE | null, exception: string | null) {
    this.response = response;
    this.exception = exception;
  }

  get isException() {
    return this.response === null;
  }

  onSuccess(onSuccess: (response: SUCCESS_RESPONSE) => void) {
    if (this.isException) {
      return this;
    }
    this.isHandled = true;
    // 이미 isException method 를 통하여 this.response !== null 이라는 것을 확인 하였으니
    // ! 사용하자(typescript error 방지)
    onSuccess(this.response!);
    return this;
  }

  onException(onException: () => any) {
    if (!this.isException) {
      return this;
    }

    this.isHandled = true;
    onException();
    return this;
  }

  or(onOr: (error: string) => any) {
    if (!this.isHandled) {
      onOr(this.exception!);
    }

    return this;
  }
}
