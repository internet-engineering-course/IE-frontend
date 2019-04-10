
export const ToPersian = (englishNumber:number) =>{
    let en_number = englishNumber.toString();
    let persianDigits = "۰۱۲۳۴۵۶۷۸۹";
    let persianMap = persianDigits.split("");
    let persian_number = en_number.replace(/\d/g, function (m) {
            return persianMap[parseInt(m)];
        });
    return persian_number;
}