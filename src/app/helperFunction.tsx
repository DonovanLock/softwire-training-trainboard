export type StationNames = { crs: string, name: string, id: string }[]

export function getTimeFromDateTimeString(dateTimeString: string): string {
    let indexT = 0;
    let colons = 0;
    for (let i = 0; i < dateTimeString.length; i++) {
        if (dateTimeString.charAt(i) === "T") {
            indexT = i + 1;
        }
        else if (dateTimeString.charAt(i) === ":") {
            colons++;
            if (colons === 2) {
                return dateTimeString.slice(indexT, i);
            }
        }
    }
    throw new Error("Input dateTimeString is incorrectly formatted.");
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