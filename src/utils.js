
export  const padding = v => (v > 9 ? v : `0${v}`);

export function prettyTime(time) {
    if (!time) {
        return "";
    }

    const date = new Date(time);
    const currTime = `${padding(date.getHours())}:${padding(date.getMinutes())}`;
    return `${date.getFullYear()}/${padding(date.getMonth() + 1)}/${padding(
        date.getDate()
    )} ${currTime}`;
}

export const fieldsValidation = fields => !fields.some(field => !field);



