"use strict";

var AsyncStorageErrorType = /*#__PURE__*/function (AsyncStorageErrorType) {
  AsyncStorageErrorType["NativeModuleError"] = "NativeModuleError";
  AsyncStorageErrorType["WebStorageError"] = "WebStorageError";
  AsyncStorageErrorType["SqliteStorageError"] = "SqliteStorageError";
  AsyncStorageErrorType["OtherStorageError"] = "OtherStorageError";
  AsyncStorageErrorType["UnknownError"] = "UnknownError";
  return AsyncStorageErrorType;
}(AsyncStorageErrorType || {});
export class AsyncStorageError extends Error {
  constructor(errorMessage, type) {
    super(errorMessage);
    this.errorMessage = errorMessage;
    this.type = type;
    this.name = this.constructor.name;
  }
  static nativeError(e) {
    // do not override own error
    if (e instanceof AsyncStorageError) {
      throw e;
    }
    const error = getNativeError(e);
    if (!error) {
      return new AsyncStorageError(e?.message ?? `Unknown error ${e}`, AsyncStorageErrorType.UnknownError);
    }
    let errorType = AsyncStorageErrorType.UnknownError;
    switch (error.type) {
      case "SqliteException":
        errorType = AsyncStorageErrorType.SqliteStorageError;
        break;
      case "OtherException":
        errorType = AsyncStorageErrorType.OtherStorageError;
        break;
    }
    return new AsyncStorageError(error.message, errorType);
  }
  static jsError(error, type) {
    return new AsyncStorageError(error, type);
  }
  static Type = AsyncStorageErrorType;
}

// Native module reject promises with special code
function isNativeError(e) {
  if (typeof e !== "object") {
    return false;
  }
  const err = e;
  return !!err.message && err?.code === "AsyncStorageError";
}
function getNativeError(e) {
  if (!isNativeError(e)) {
    return null;
  }
  const errorType = e.userInfo ? e.userInfo["type"] : null;
  switch (errorType) {
    case "SqliteException":
      {
        return {
          type: "SqliteException",
          message: e.message
        };
      }
    case "OtherException":
      {
        return {
          type: "OtherException",
          message: e.message
        };
      }
    case "LegacyStorageException":
      {
        return {
          type: "LegacyStorageException",
          message: e.message
        };
      }
  }
  return null;
}
//# sourceMappingURL=AsyncStorageError.js.map