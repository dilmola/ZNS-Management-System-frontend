import React from "react";
import logoBlack from "../../img/logoBlack.png";

const currentDate = new Date();
const formattedDate = `${currentDate.getDate()}/${
  currentDate.getMonth() + 1
}/${currentDate.getFullYear()}`;

const PrintInvoice = React.forwardRef(
  (
    {
      currentTransactionId,
      appointmentsData,
      calculateTotalPrice,
      selectedRow,
    },
    ref
  ) => {
    // Filter appointmentsData based on currentTransactionId
    const filteredAppointments = appointmentsData.filter(
      (appointment) => appointment.transaction_id === currentTransactionId
    );

    return (
      <div ref={ref}>
        <p>
          <img className="mx-16 my-8 w-32" src={logoBlack} alt="Your Image" />
          <h1 className="text-3xl font-semibold mb-1 text-center">
            Z. N. S ENTERPRISE(60764)
          </h1>
          <h2 className="text-lg font-semibold mb-1 text-center">
            ELECTRICAL WORKS
          </h2>
          <h2 className="text-md font-medium mb-1 text-center">
            Tingkat 3,Sub lot 2,Block F,Fasa 3, Demak Laut Commercial Centre{" "}
            <br />
            Jalan Bako,93050, Kuching,Sarawak.
          </h2>
          <h2 className="text-md font-medium mb-2 text-center">
            Tel/Fax:082-442799.H/P:0138249613,Email:znsenter@gmail.com
          </h2>
          <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />

          <div className="py-10 px-16">
            Tarikh : {formattedDate}
            <div className="text-left mb-8">{selectedRow.address}</div>
            <div className="text-left mb-8">
              Tuan, <br />
              PER: SEBUTHARGA
            </div>
            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th className="border p-2">Bil</th>
                  <th className="border p-2">Nama Barang</th>
                  <th className="border p-2">Kuantiti</th>
                  <th className="border p-2">Jumlah (RM)</th>
                </tr>
              </thead>
              <tbody>
                {filteredAppointments.map((appointment, index) => (
                  <tr key={index}>
                    <td className="border p-2">{index + 1}</td>
                    <td className="border p-2">{appointment.name_of_item}</td>
                    <td className="border p-2">1</td>
                    <td className="border p-2">{appointment.price_item}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="3" className=" border p-2">
                    Deposit
                  </td>
                  <td className="border p-2">
                    10.00
                  </td>
                </tr>
                <tr>
                  <td colSpan="3" className=" border p-2">
                    Jumlah
                  </td>
                  <td className="border p-2">
                    {calculateTotalPrice(selectedRow.transaction_id)}.00
                  </td>
                </tr>
              </tfoot>
            </table>
            <div className="text-left my-20">Sekian terima kasih,</div>
            <div className="text-left mb-2">Yang benar,</div>
            <div className="text-left mb-2">
              Pengurus <br />
              Z.N.S Enterprise Electrical work
            </div>
          </div>
        </p>
      </div>
    );
  }
);

export default PrintInvoice;
