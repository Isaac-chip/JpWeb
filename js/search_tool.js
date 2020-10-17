function URLencode(str){
    var i, encoded_str, char_code, padded_str;
    encoded_str = "";
    for (i = 0; i < str.length; i++){
        char_code = str.charCodeAt(i);
        if (char_code == 0x20){
            encoded_str += "+";
        }
        else {
            if (((0x30 <= char_code) && (char_code <= 0x39)) || ((0x41 <= char_code) && (char_code <= 0x5a)) || ((0x61 <= char_code) && (char_code <= 0x7a))){
                encoded_str += str.charAt(i);
            }
            else if ((char_code == 0x2a) || (char_code == 0x2e) || (char_code == 0x2d) || (char_code == 0x5f)) {
                encoded_str += str.charAt(i);
            }
            else {
                if ( char_code > 0xffff ) {
                    encoded_str += "%" + ((char_code >> 18) | 0xf0).toString(16).toUpperCase();
                    encoded_str += "%" + (((char_code >> 12) & 0x3f) | 0x80).toString(16).toUpperCase();
                    encoded_str += "%" + (((char_code >> 6) & 0x3f) | 0x80).toString(16).toUpperCase();
                    encoded_str += "%" + ((char_code & 0x3f) | 0x80).toString(16).toUpperCase();
                }
                else if ( char_code > 0x7ff ) {
                    encoded_str += "%" + ((char_code >> 12) | 0xe0).toString(16).toUpperCase();
                    encoded_str += "%" + (((char_code >> 6) & 0x3f) | 0x80).toString(16).toUpperCase();
                    encoded_str += "%" + ((char_code & 0x3f) | 0x80).toString(16).toUpperCase();
                }
                else if ( char_code > 0x7f ) {
                    encoded_str += "%" + (((char_code >> 6) & 0x1f) | 0xc0).toString(16).toUpperCase();
                    encoded_str += "%" + ((char_code & 0x3f) | 0x80).toString(16).toUpperCase();
                }
                else {
                    padded_str = "0" + char_code.toString(16).toUpperCase();
                    encoded_str += "%" + padded_str.substr(padded_str.length - 2, 2);
                }
            }
        }
    }
    return encoded_str;
}

function mysearch(obj){
    url = 'http://nomura-re.dga.jp/?ref='+URLencode(location.href)+'&kw='+URLencode(obj.kw.value)+'&ie='+obj.ie.value+'&by=js&domain='+obj.domain.value;
    document.location.href=url;
    return false;
}
function mysearch(){
    url = 'http://nomura-re.dga.jp?ref='+URLencode(location.href)+'&kw='+URLencode(document.search_form.kw.value)+'&ie='+document.search_form.ie.value+'&by=js&domain='+document.search_form.domain.value;
    document.location.href=url;
    return false;
}
