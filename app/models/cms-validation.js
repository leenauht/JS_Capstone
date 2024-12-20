import { getElmId } from "../controllers/cms-main.js";
class Validation {
  checkEmpty(value, spanId, mess) {
    if (value === "") {
      getElmId(spanId).innerHTML = mess;
      getElmId(spanId).style.display = "block";
      return false;
    }
    getElmId(spanId).innerHTML = "";
    getElmId(spanId).style.display = "none";
    return true;
  }

  checkSelect(value, spanId, mess) {
    if (value === "Select brand") {
      getElmId(spanId).innerHTML = mess;
      getElmId(spanId).style.display = "block";
      return false;
    }
    getElmId(spanId).innerHTML = "";
    getElmId(spanId).style.display = "none";
    return true;
  }

  checkSpecialCharacter(value, spanId, mess) {
    const letter =
      "^[a-zA-Z0-9_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
      "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
      "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$";
    if (value.match(letter)) {
      getElmId(spanId).innerHTML = "";
      getElmId(spanId).style.display = "none";
      return true;
    }
    getElmId(spanId).innerHTML = mess;
    getElmId(spanId).style.display = "block";
    return false;
  }

  checkCharacterNumber(value, spanId, mess) {
    const regexNumber = /^[0-9]*\.?[0-9]+$/;
    if (regexNumber.test(value)) {
      getElmId(spanId).innerHTML = "";
      getElmId(spanId).style.display = "none";
      return true;
    }
    getElmId(spanId).innerHTML = mess;
    getElmId(spanId).style.display = "block";
    return false;
  }

  checkUrl(value, spanId, mess) {
    const regexUrl =
      /^(https?:\/\/)?([a-zA-Z0-9.-]+)\.([a-z]{2,})([\/\w .-]*)*\/?$/;
    if (regexUrl.test(value)) {
      getElmId(spanId).innerHTML = "";
      getElmId(spanId).style.display = "none";
      return true;
    }
    getElmId(spanId).innerHTML = mess;
    getElmId(spanId).style.display = "block";
    return false;
  }

  checkLength(value, spanId, mess, min, max) {
    if (value.length >= min && value.length <= max) {
      getElmId(spanId).innerHTML = "";
      getElmId(spanId).style.display = "none";
      return true;
    }
    getElmId(spanId).innerHTML = mess;
    getElmId(spanId).style.display = "block";
    return false;
  }
}
export default Validation;
