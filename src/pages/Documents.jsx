export default function Documents() {
  return (
    <div style={{ padding: '30px' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Show </span>
        <select style={{ margin: '0 8px', padding: '4px 8px', border: '1px solid var(--border-color)', borderRadius: '4px', fontSize: '0.9rem', outline: 'none' }}>
          <option>10</option>
          <option>25</option>
          <option>50</option>
        </select>
        <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}> entries</span>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '800px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
              <th style={{ padding: '16px', color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase' }}>Date</th>
              <th style={{ padding: '16px', color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase' }}>Title</th>
              <th style={{ padding: '16px', color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase' }}>Notes</th>
              <th style={{ padding: '16px', color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase' }}>Page No.</th>
              <th style={{ padding: '16px', color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="5" style={{ padding: '30px 16px', textAlign: 'left', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                No data available in table
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
        <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          Showing 0 to 0 of 0 entries
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button style={{ background: 'transparent', border: 'none', color: 'var(--primary-color)', opacity: 0.5, cursor: 'not-allowed', fontSize: '0.9rem' }}>Previous</button>
          <button style={{ background: 'transparent', border: 'none', color: 'var(--primary-color)', opacity: 0.5, cursor: 'not-allowed', fontSize: '0.9rem' }}>Next</button>
        </div>
      </div>
    </div>
  );
}
