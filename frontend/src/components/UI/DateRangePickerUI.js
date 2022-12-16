import React, { useState } from 'react'
import moment from 'moment'
import DateRangePicker from 'react-bootstrap-daterangepicker'
// you will need the css that comes with bootstrap@3. if you are using
// a tool like webpack, you can do the following:
import 'bootstrap/dist/css/bootstrap.css'
// you will also need the css that comes with bootstrap-daterangepicker
import 'bootstrap-daterangepicker/daterangepicker.css'

function DateRangePickerUI(props) {
  const [state, setState] = useState({
    start: moment(),
    end: moment()
  })
  const { start, end } = state
  const handleCallback = (start, end) => {
    setState({ start, end })
    props.onChange(start, end)
  }

  const width = props.width || '100%'

  const label =
    start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY')
  return (
    <DateRangePicker
      initialSettings={{
        opens: 'right',
        drops: 'down',
        startDate: start.toDate(),
        endDate: end.toDate(),
        locale: {
          direction: 'ltr',
          format: moment.localeData().longDateFormat('L'),
          separator: ' - ',
          applyLabel: 'Aplicar',
          cancelLabel: 'Cancelar',
          weekLabel: 'W',
          customRangeLabel: 'Personalizado',
          daysOfWeek: moment.weekdaysShort(),
          monthNames: moment.months(),
          firstDay: moment.localeData().firstDayOfWeek()
        },
        ranges: {
          Hoje: [moment().toDate(), moment().toDate()],
          Ontem: [
            moment().subtract(1, 'days').toDate(),
            moment().subtract(1, 'days').toDate()
          ],
          'Úlitimos 7 dias': [
            moment().subtract(6, 'days').toDate(),
            moment().toDate()
          ],
          'Úlitimos 30 dias': [
            moment().subtract(29, 'days').toDate(),
            moment().toDate()
          ],
          'Este mês': [
            moment().startOf('month').toDate(),
            moment().endOf('month').toDate()
          ],
          'Mês passado': [
            moment().subtract(1, 'month').startOf('month').toDate(),
            moment().subtract(1, 'month').endOf('month').toDate()
          ]
        }
      }}
      onCallback={handleCallback}
    >
      <div
        id="reportrange"
        className="col-4"
        style={{
          background: '#fff',
          cursor: 'pointer',
          padding: '5px 10px',
          border: '1px solid #ccc',
          width: width
        }}
      >
        <i className="fa fa-calendar"></i>&nbsp;
        <span>{label}</span> <i className="fa fa-caret-down"></i>
      </div>
    </DateRangePicker>
  )
}

export default DateRangePickerUI
