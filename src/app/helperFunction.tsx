export function getTimeFromDateTimeString(dateTimeString : string) : string {
    const tIndex = dateTimeString.indexOf("T");
    const firstColonIndex = dateTimeString.indexOf(":");
    const secondColonIndex = dateTimeString.indexOf(":", firstColonIndex+1);
    return dateTimeString.slice(tIndex+1, secondColonIndex);
}

export function formatCamelCase(camelCaseString: string) {
    let formattedString = camelCaseString[0].toUpperCase();
    for (let i = 1; i < camelCaseString.length; i++) {
        const letter = camelCaseString[i];
        if (letter === letter.toUpperCase()) {
            formattedString += " ";
        }
        formattedString += letter.toLowerCase();
    }
    return formattedString;
}