import moment from 'moment'
export default {
  formateDate(time) {
    if (!time) return '';
    // let date = new Date(time);
    return moment(time).format("YYYY-MM-DD HH:mm:ss")
  }
}