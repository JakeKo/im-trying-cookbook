export const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
];

export function formatDate(ms) {
    const date = new Date(ms);
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}
