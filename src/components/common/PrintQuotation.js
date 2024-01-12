import React, { useState, useRef } from "react";
import logoBlack from "../../img/logoBlack.png";

const PrintQuotation = React.forwardRef(({ fields }, ref) => {
  const currentDate = new Date().toLocaleDateString();

  // Calculate the total amount
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
      <img className="mx-16 my-8 w-32" src={logoBlack} alt="Your Image" />
      <h1 className="text-3xl font-semibold mb-1 text-center">
        Z. N. S ENTERPRISE(60764)
      </h1>
      <h2 className="text-lg font-semibold mb-1 text-center">
        ELECTRICAL WORKS
      </h2>
      <h2 className="text-md font-medium mb-1 text-center">
        Tingkat 3, Sub lot 2, Block F, Fasa 3, Demak Laut Commercial Centre{" "}
        <br />
        Jalan Bako, 93050, Kuching, Sarawak.
      </h2>
      <h2 className="text-md font-medium mb-2 text-center">
        Tel/Fax: 082-442799. H/P: 0138249613, Email: znsenter@gmail.com
      </h2>
      <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />

      <div className="py-10 px-16">
        <div className="text-left mb-6">Tarikh: {currentDate}</div>
        <div className="text-left mb-8">No 27 tingkat perpaduan 22</div>
        <div className="text-left mb-8">
          Tuan, <br />
          PER: SEBUTHARGA
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
                <td className="border p-2">{field.price_appointment_items}</td>
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
              <td className="border p-2">{totalCalculatedAmount.toFixed(2)}</td>
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
    </div>
  );
});

export default PrintQuotation;
