
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Banknote, Calendar, Percent } from "lucide-react";

export default function FinancingPage() {
  return (
    <div className="container mx-auto py-16 px-4">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">Financing & Payment</h1>
        <p className="mt-2 text-lg text-muted-foreground max-w-3xl mx-auto">
          We offer a clear and accessible payment plan to help you secure your piece of paradise at Santillana Del Mar.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Separation</CardTitle>
                <Banknote className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">$2,000,000 COP</div>
                <p className="text-xs text-muted-foreground">Secure your chosen lot today</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Initial Fee</CardTitle>
                <Percent className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">30%</div>
                <p className="text-xs text-muted-foreground">Payable in 24 monthly installments</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Remaining Balance</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">70%</div>
                <p className="text-xs text-muted-foreground">Financed through bank credit</p>
            </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-3xl">How It Works</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-lg font-bold">Step 1: Separation</AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground">
                Reserve the lot of your choice with a separation payment of $2,000,000 COP. This payment guarantees the lot is held in your name while you proceed with the purchase process and is applied towards the initial fee.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-lg font-bold">Step 2: Pay the Initial Fee</AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground">
                The initial 30% of the lot's value is paid over 24 convenient monthly installments. This flexible plan allows you to comfortably cover the down payment without the pressure of a single large disbursement.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-lg font-bold">Step 3: Finance the Balance</AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground">
                The remaining 70% of the value is financed through a bank credit. We can assist you in the process with our partner financial institutions to ensure a smooth and successful transaction.
              </AccordionContent>
            </AccordionItem>
             <AccordionItem value="item-4">
              <AccordionTrigger className="text-lg font-bold">Personalized Assistance</AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground">
                Our sales team is here to guide you through every step of the process, from choosing your lot to securing financing. We are committed to making your dream of owning a property at Santillana del Mar a reality.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
