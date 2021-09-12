import React, { useState } from 'react';
import { InputsStyle } from './InputsStyle';

const Inputs = (props) => {
  const [values, setValues] = useState({
    groups: 4,
    actualGroup: 3,
    startTime: '00:53',
    duration: 30,
  });

  const [errors, setErrors] = useState({
    groups: false,
    actualGroup: false,
    startTime: false,
    duration: false,
  });

  const [columns, setColumns] = useState([]);

  const valueChangeHandler = (e) => {
    e.preventDefault();
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const checkHour = (hour, min) => {
    if (min >= 60) {
      let aux = Math.floor(min / 60);
      min -= 60 * aux;
      hour += aux;
    }

    if (hour >= 24) {
      hour -= 24;
    }

    return { hour, min };
  };

  const calculateData = () => {
    //duracion en minutos de cada ciclo
    const interval = values.duration * values.groups;
    // console.log('intervalo: ', interval);

    //cantidad de turnos en un dia para el mismo grupo
    const rows = Math.round((24 * 60) / interval);
    // console.log('turnos: ', rows);
    //hora de inicio del grupo actual
    const startHour = +values.startTime.split(':')[0];
    console.log('hora de inicio: ', startHour);
    //minuto de inicio del grupo actual
    const startMinute = +values.startTime.split(':')[1];
    console.log('minuto de inicio: ', startMinute);

    const addHour = Math.floor(interval / 60);
    // console.log('horas entre cada turno:', addHour);

    const addMin = Math.round(((interval / 60) % 1) * 60);
    // console.log('minutos entre cada turno:', addMin);

    let arr = [];
    let activeGroup = +values.actualGroup - 1;

    for (let i = 0; i < +values.groups; i++) {
      let actual = { hour: startHour, min: startMinute };
      // console.log(activeGroup + i);

      arr[i + activeGroup] = [];

      if (i > 0) {
        actual.min += +values.duration * i;
        actual = checkHour(actual.hour, actual.min);
      }

      for (let j = 0; j < rows; j++) {
        if (j === 0) {
          // arr[3].push
          arr[i + activeGroup].push(
            `${actual.hour < 10 ? '0' + actual.hour : actual.hour}:${
              actual.min < 10 ? '0' + actual.min : actual.min
            }`
          );
        } else {
          actual.hour += addHour;
          actual.min += addMin;

          actual = checkHour(actual.hour, actual.min);
          // arr[3].push
          arr[i + activeGroup].push(
            `${actual.hour < 10 ? '0' + actual.hour : actual.hour}:${
              actual.min < 10 ? '0' + actual.min : actual.min
            }`
          );
        }
      }

      if (i + 1 + activeGroup >= +values.groups) {
        activeGroup -= +values.groups;
      }
    }
    console.log(arr);
    setColumns(arr);
  };

  const calcuData = (e) => {
    e.preventDefault();
    calculateData();
  };

  return (
    <InputsStyle>
      <form onSubmit={calcuData}>
        <label htmlFor="groups">Cantidad de grupos</label>
        <input
          type="number"
          name="groups"
          id="groups"
          value={values.groups}
          onChange={(e) => {
            valueChangeHandler(e);
          }}
        />
        <label htmlFor="actualGroup">Grupo actual</label>
        <input
          type="number"
          name="actualGroup"
          id="actualGroup"
          value={values.actualGroup}
          onChange={(e) => {
            valueChangeHandler(e);
          }}
        />
        <label htmlFor="startTime">
          Hora de inicio del grupo actual (formato 24 horas, HH:MM)
        </label>
        <input
          type="text"
          name="startTime"
          id="startTime"
          value={values.startTime}
          onChange={(e) => {
            valueChangeHandler(e);
          }}
        />
        <label htmlFor="duration">duración (En minutos)</label>
        <input
          type="number"
          name="duration"
          id="duration"
          value={values.duration}
          onChange={(e) => {
            valueChangeHandler(e);
          }}
        />
        <button type="submit">Calcular</button>
      </form>

      <div className="schedule-container">
        {columns.map((column, index) => (
          <div key={`col${index}`} className="schedule-column">
            <div className="schedule-group">Grupo {index + 1}</div>
            {column.map((row, rowIndex) => (
              <div className="schedule-row" key={`col${index}-row${rowIndex}`}>
                {row}
              </div>
            ))}
          </div>
        ))}
      </div>
    </InputsStyle>
  );
};

export default Inputs;
