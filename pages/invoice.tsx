// pages/index.tsx
import Head from "next/head";
import { useStore } from "@/hooks/useStore";
import { Button } from "@/components/button";
import { TextInput } from "@/components/inputs/text";
import { useState } from "react";

export default function Home() {
  const [components] = useStore('components');

  const [invoiceId, setInvoiceId] = useState('INV-122');
  const [customer, setCustomer] = useState({
    reference: "CUSTOMER-342",
    name: "evg customer",
    email: "evgeni.leonti+customer1@unipaas.com",
  });


  return (
    <div>
      <Head>
        <title>Invoice | UNIPaaS Platform</title>
      </Head>


      {components && <div>
        <h2 className="text-xl font-bold my-4">Invoice</h2>

        {/* customer settings */}
        <div>
          <h3 className="text-lg font-bold">Customer</h3>
          <div className="flex items-baseline space-x-2">
            {/* customer reference */}
            <TextInput label="Reference" value={customer.reference} setValue={(reference => setCustomer({
              ...customer,
              reference,
            }))} />

            {/* customer name */}
            <TextInput label="Name" value={customer.name} setValue={(name => setCustomer({
              ...customer,
              name
            }))} />

            {/* customer email */}
            <TextInput label="Email" value={customer.email} setValue={(email => setCustomer({
              ...customer,
              email
            }))} />
          </div>
        </div>

        <br />
        {/* invoice settings */}
        <div>
          <h3 className="text-lg font-bold">Invoice</h3>
          <div className="flex items-baseline space-x-2">
            {/* invoice reference */}
            <TextInput label="Reference" value={invoiceId} setValue={(reference => setInvoiceId(reference))} />
          </div>
        </div>


        <div className="mt-4 flex items-baseline space-x-2">
          <div>
            <Button onClick={() => {
              const payPortal = components.create("invoice", {
                // todo double check the mandatory/conditional fields
                mode: 'create', // mandatory: create, edit and view
                reference: invoiceId, // conditional - provide if invoice created (edit/view)
                customer, // conditional - provide once customer is selected
              });
              payPortal.mount("#invoice");
            }}>Create</Button>
            <br />
            <br />
            <div id="invoice" className="w-full"/>
          </div>
        </div>
      </div>}
    </div>
  )
}
