//src/ap_stocks/pages/Mouvements/index.tsx



import * as s from './index.css';

/* 
export default function Mouvements () {
  return (
    <div>
      <h1>Mouvements</h1>
    </div>
  );
}
 */

export default function Mouvements() {
  return (
    <>
      <div className={s.tableWrapper}>
        <table className={s.table}>
          <thead>
            <tr>
              <th className={s.th}>Col 1</th>
              <th className={s.th}>Col 2</th>
              <th className={s.th}>Col 3</th>
              <th className={s.th}>Col 4</th>
              <th className={s.th}>Col 5</th>
            </tr>
          </thead>

          <tbody>
            {Array.from({ length: 50 }).map((_, i) => (
              <tr key={i}>
                <td className={s.td}>Ligne {i} - 1</td>
                <td className={s.td}>Ligne {i} - 2</td>
                <td className={s.td}>Ligne {i} - 3</td>
                <td className={s.td}>Ligne {i} - 4</td>
                <td className={s.td}>Ligne {i} - 5</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
