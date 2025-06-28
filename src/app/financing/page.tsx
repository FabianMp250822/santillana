"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "@/hooks/use-translation";
import { Banknote, Calendar, Percent, Gift } from "lucide-react";

export default function FinancingPage() {
  const t = useTranslation();

  return (
    <div className="container mx-auto py-16 px-4">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">{t('financingTitle')}</h1>
        <p className="mt-2 text-lg text-muted-foreground max-w-3xl mx-auto">
          {t('financingSubtitle')}
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t('finStep1_Title')}</CardTitle>
                <Banknote className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">$2,000,000 COP</div>
                <p className="text-xs text-muted-foreground">{t('finStep1_Subtitle')}</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t('finStep2_Title')}</CardTitle>
                <Percent className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">25%</div>
                <p className="text-xs text-muted-foreground">{t('finStep2_Subtitle_new')}</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t('finStep3_Title')}</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">75%</div>
                <p className="text-xs text-muted-foreground">{t('finStep3_Subtitle_new')}</p>
            </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        <Card>
            <CardHeader>
            <CardTitle className="font-headline text-3xl">{t('howItWorks')}</CardTitle>
            </CardHeader>
            <CardContent>
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                <AccordionTrigger className="text-lg font-bold">{t('accordionStep1_Title')}</AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">
                    {t('accordionStep1_Desc')}
                </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                <AccordionTrigger className="text-lg font-bold">{t('accordionStep2_Title')}</AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">
                    {t('accordionStep2_Desc_new')}
                </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                <AccordionTrigger className="text-lg font-bold">{t('accordionStep3_Title')}</AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">
                    {t('accordionStep3_Desc_new')}
                </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                <AccordionTrigger className="text-lg font-bold">{t('accordionStep4_Title')}</AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">
                    {t('accordionStep4_Desc')}
                </AccordionContent>
                </AccordionItem>
            </Accordion>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle className="font-headline text-3xl">{t('promotionsAndDiscounts')}</CardTitle>
                <CardDescription>{t('promotionsTitle')}</CardDescription>
            </CardHeader>
            <CardContent>
                <ul className="space-y-4">
                    <li className="flex items-start">
                        <Gift className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                        <span><strong>{t('promo_1').split('y recibe')[0]}</strong> y recibe {t('promo_1').split('y recibe')[1]}</span>
                    </li>
                     <li className="flex items-start">
                        <Gift className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                        <span><strong>{t('promo_2').split('y recibe')[0]}</strong> y recibe {t('promo_2').split('y recibe')[1]}</span>
                    </li>
                     <li className="flex items-start">
                        <Gift className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                        <span><strong>{t('promo_3').split('y recibe')[0]}</strong> y recibe {t('promo_3').split('y recibe')[1]}</span>
                    </li>
                     <li className="flex items-start">
                        <Gift className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                        <span><strong>{t('promo_4').split('y recibe')[0]}</strong> y recibe {t('promo_4').split('y recibe')[1]}</span>
                    </li>
                     <li className="flex items-start">
                        <Gift className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                        <span><strong>{t('promo_5').split('y recibe')[0]}</strong> y recibe {t('promo_5').split('y recibe')[1]}</span>
                    </li>
                </ul>
            </CardContent>
        </Card>

      </div>
    </div>
  );
}
