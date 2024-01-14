import React from "react";
import logoBlack from "../../img/logoBlack.png";
import signature from "../../img/signature.png";

const currentDate = new Date();
const formattedDate = `${currentDate.getDate()}/${
  currentDate.getMonth() + 1
}/${currentDate.getFullYear()}`;

const PrintInvoice = React.forwardRef(
  (
    {
      fields,
      currentTransactionId,
      appointmentsData,
      calculateTotalPrice,
      secAppointmentRowData,
      appointmentRowData,
    },
    ref
  ) => {
    const totalCalculatedAmount = fields.reduce(
      (sum, field) =>
        sum +
        parseFloat(
          (
            parseFloat(field.quantity_appointment_items) *
            parseFloat(field.price_appointment_items)
          ).toFixed(2) || 0
        ),
      0
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
            Tingkat 3, Sub lot 2, Block F, Fasa 3, Demak Laut Commercial Centre
            <br />
            Jalan Bako, 93050, Kuching, Sarawak.
          </h2>
          <h2 className="text-md font-medium mb-2 text-center">
            Tel/Fax: 082-442799.H/P: 0138249613, Email: znsenter@gmail.com
          </h2>
          <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />

          <div className="py-10 px-16">
            Tarikh: {formattedDate}
            <div className="text-left mb-2 mt-8">Alamat:</div>
            <div className="w-52">
              <div className="text-left mb-8">
                {appointmentsData.appointment_address &&
                appointmentsData.address_sec
                  ? `${appointmentsData.appointment_address} || ${appointmentsData.address_sec}`
                  : appointmentsData.appointment_address ||
                    appointmentsData.address_sec}
              </div>
            </div>
            <div className="text-left mb-8">
              Tuan, <br />
              PER: INVOIS
            </div>
            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th className="border p-2">Bil</th>
                  <th className="border p-2">Perkara</th>
                  <th className="border p-2">Kuantiti</th>
                  <th className="border p-2">Harga (per unit)</th>
                  <th className="border p-2">Jumlah (RM)</th>
                </tr>
              </thead>
              <tbody>
                {fields.map((field, index) => (
                  <tr key={index}>
                    <td className="border p-2">{index + 1}</td>
                    <td className="border p-2">
                      {field.details_appointment_items}
                    </td>
                    <td className="border p-2">
                      {field.quantity_appointment_items}
                    </td>
                    <td className="border p-2">
                      {field.price_appointment_items}
                    </td>
                    <td className="border p-2">
                      {(
                        parseFloat(field.quantity_appointment_items) *
                        parseFloat(field.price_appointment_items)
                      ).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="4" className="border p-2">
                    Jumlah
                  </td>
                  <td className="border p-2">
                    {totalCalculatedAmount.toFixed(2)}
                  </td>
                </tr>
              </tfoot>
            </table>
            <div className="mt-12">
              <img className="w-52" src={signature} alt="Your Image" />
            </div>
            <div className="text-left ">Sekian terima kasih,</div>
            <div className="text-left mb-2">Yang benar,</div>
            <div className="">Mohamad Zahiruddin Nasrullah Bin Zameri</div>
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
