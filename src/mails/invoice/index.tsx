function InvoiceMail() {
  return (
    <html lang="id">
      <div style={{
        backgroundColor: '#FAFAFA',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
        borderRadius: '0.25rem',
        padding: '0 2rem'
      }}>
        <p style={{
          margin: '0',
          padding: '2.5rem 0 1rem',
          textAlign: 'center'
        }}>
          <img src="cid:jejenjreng_logotype" alt="Logotype Image" style={{
            height: '2rem'
          }} />
        </p>

        <hr />

        <p style={{
          margin: '1rem 0',
          textAlign: 'center'
        }}>
          <img src="cid:check_image" alt="Check Image" style={{
            width: '1.5rem',
            height: '1.5rem',
            backgroundColor: 'rgba(43, 182, 115, 0.2)',
            padding: '0.2rem',
            borderRadius: '50%'
          }} />
        </p>

        <h1 style={{
          margin: 0,
          marginBottom: '1.5rem',
          lineHeight: '2rem',
          textAlign: 'center',
          fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif'
        }}>
          Haloo!
          <br />
          Terima kasih sudah order, ya✨
        </h1>

        <p style={{
          margin: 0,
          marginBottom: '1rem',
          lineHeight: '1.5rem',
          textAlign: 'center',
          fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
          color: 'rgba(0, 0, 0, 0.7)'
        }}>
          Berikut adalah invoice pembayarannya.
          <br />
          Pastikan keseluruhan informasi mengenai nama, nominal dan jumlah barang <b>sudah benar dan sesuai</b>.
          <br />
          <br />
          Jangan lupa untuk <b>reply email ini apabila sudah membayar dengan nominal yang sesuai</b>, bisa berupa bukti foto atau screenshot bukti transaksi 👍
          <br />
          <br />
          Ditunggu paketnya yaa!!
        </p>

        <hr />

        <p style={{
          margin: '0',
          padding: '2rem 0',
          textAlign: 'center'
        }}>
          <img src="cid:invoice_image" alt="Invoice Image" style={{
            width: '100%',
            objectFit: 'contain'
          }} />
        </p>
      </div>
    </html>
  )
}

export default InvoiceMail