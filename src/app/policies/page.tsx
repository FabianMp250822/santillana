"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "@/hooks/use-translation";
import { CheckCircle } from "lucide-react";

export default function PoliciesPage() {
  const t = useTranslation();

  const policies = {
    delivery: ['policyDelivery_1', 'policyDelivery_2', 'policyDelivery_3', 'policyDelivery_4', 'policyDelivery_5'],
    construction: ['policyConstruction_1', 'policyConstruction_2'],
    services: ['policyService_Water', 'policyService_Gas', 'policyService_Energy', 'policyService_Septic'],
    setbacks: ['policySetbacks_Internal', 'policySetbacks_Front', 'policySetbacks_Back', 'policySetbacks_Sides', 'policySetbacks_Neighboring'],
    clientResp: ['policyClientResp_1', 'policyClientResp_2'],
    changes: ['policyChanges_1', 'policyChanges_2'],
    legal: ['policyLegal_1'],
  };

  return (
    <div className="container mx-auto py-16 px-4">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">{t('policiesTitle')}</h1>
        <p className="mt-2 text-lg text-muted-foreground max-w-3xl mx-auto">
          {t('policiesSubtitle')}
        </p>
      </div>

      <div className="space-y-8 max-w-4xl mx-auto">
        <Card>
          <CardHeader><CardTitle className="font-headline text-2xl">{t('lotDeliveryPolicies')}</CardTitle></CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {policies.delivery.map(key => (
                <li key={key} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                  <span>{t(key as any)}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader><CardTitle className="font-headline text-2xl">{t('constructionPolicies')}</CardTitle></CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {policies.construction.map(key => (
                <li key={key} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                  <span>{t(key as any)}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="font-headline text-2xl">{t('utilityServices')}</CardTitle></CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {policies.services.map(key => (
                <li key={key} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                  <span>{t(key as any)}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="font-headline text-2xl">{t('setbacks')}</CardTitle></CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {policies.setbacks.map(key => (
                <li key={key} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                  <span>{t(key as any)}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="font-headline text-2xl">{t('clientResponsibilities')}</CardTitle></CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {policies.clientResp.map(key => (
                <li key={key} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                  <span>{t(key as any)}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="font-headline text-2xl">{t('commercialPolicyChanges')}</CardTitle></CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {policies.changes.map(key => (
                <li key={key} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                  <span>{t(key as any)}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="font-headline text-2xl">{t('legalCompliance')}</CardTitle></CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {policies.legal.map(key => (
                <li key={key} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                  <span>{t(key as any)}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
