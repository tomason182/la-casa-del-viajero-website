import styles from "./Calendar.module.css";

export default function Calendar() {
  const today = new Date();
  const month = today.getMonth();
  const year = today.getFullYear();
  const monthList = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  return (
    <div className={styles.calendar}>
      <p>Calendario</p>
      <div>
        <button>prev</button>
        <h3>{monthList[month]}</h3>
        <span>-</span>
        <h3>{year}</h3>
        <button>next</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Do</th>
            <th>Lu</th>
            <th>Ma</th>
            <th>Mi</th>
            <th>Ju</th>
            <th>Vi</th>
            <th>Sa</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
