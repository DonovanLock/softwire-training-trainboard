export function getTimeFromDateTimeString(dateTimeString: string): string {
    const date = new Date(dateTimeString);
    return date.getHours() + ":" + date.getMinutes();
}

export function formatCamelCase(camelCaseString: string): string {
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