const datetimeToHuman = (datetime) => {
    if (datetime) {
        const months = [
            '',
            'января',
            'февраля',
            'марта',
            'апреля',
            'мая',
            'июня',
            'июля',
            'августа',
            'сентября',
            'октября',
            'ноября',
            'декабря',
        ];

        let raw = datetime.split('T');
        let rawDate = raw[0];
        let date = rawDate.split('-');
        let rawTime = raw[1];
        let time = rawTime.split(':');

        return ((date[2][0] === '0') ? date[2][1] : date[2]) + ' ' + ((date[1][0] === '0') ? months[date[1][1]] : months[date[1]]) + ' ' + date[0] + ' в ' + time[0] + ':' + time[1]
    }
};


const dateToHuman = (passedDate) => {
    if (passedDate) {
        const months = [
            '',
            'января',
            'февраля',
            'марта',
            'апреля',
            'мая',
            'июня',
            'июля',
            'августа',
            'сентября',
            'октября',
            'ноября',
            'декабря',
        ];
        let date = passedDate.split('-');
        return ((date[2][0] === '0') ? date[2][1] : date[2]) + ' ' + ((date[1][0] === '0') ? months[date[1][1]] : months[date[1]]) + ' ' + date[0]
    }
};


const datetimeWithoutWords = (datetime) => {
    if (datetime) {
        let raw = datetime.split('T');
        let rawDate = raw[0];
        let date = rawDate.split('-');
        let rawTime = raw[1];
        let time = rawTime.split(':');

        return date[2] + '.' + date[1] + '.' + date[0] + ' ' + time[0] + ':' + time[1]
    }
};


export {
    datetimeToHuman,
    dateToHuman,
    datetimeWithoutWords,
}