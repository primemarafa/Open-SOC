import type { SOCScenario } from '../../../types/soc';

export const phishingAnalysisScenario: SOCScenario = {
  id: 'phishing-ceo-fraud',
  module: 'soc',
  category: 'phishing',
  titleKey: 'scenarios.phishing-ceo-fraud.title',
  descriptionKey: 'scenarios.phishing-ceo-fraud.description',
  difficulty: 'medium',
  estimatedTime: 20,
  mitreTechniques: ['T1566'],
  tags: ['Phishing', 'CEO Fraud', 'Email Analysis'],
  evidence: [
    {
      id: 'email-headers',
      type: 'text',
      titleKey: 'Email Content and Headers',
      data: {
        content: `Return-Path: <ceo@c0mpany.com>
Received: from mail.c0mpany.com (mail.c0mpany.com [198.51.100.88])
    by mx.company.com with ESMTP id xyz123;
    Tue, 22 Sep 2026 09:30:15 -0400 (EDT)
Authentication-Results: mx.company.com;
    spf=softfail (domain of transitioning c0mpany.com does not designate 198.51.100.88 as permitted sender) smtp.mailfrom=ceo@c0mpany.com;
    dkim=fail (bad signature) header.d=c0mpany.com;
From: "John Doe (CEO)" <ceo@company.com>
Reply-To: ceo-private@proton.me
To: finance@company.com
Subject: URGENT: Wire Transfer Required - Project X
Date: Tue, 22 Sep 2026 09:30:10 -0400

Hi Team,

I'm currently in a confidential meeting for Project X. We need an urgent wire transfer to secure our acquisition target. Please process a payment of $50,000 immediately.

Details are in the secure document here:
http://company-secure-docs.net/invoice/2026-Q3-Acquisition.pdf

Do not discuss this with anyone as it's highly confidential. Reply directly to this email when it's done.

Regards,
John
CEO, Company Inc.`
      }
    }
  ],
  questions: [
    {
      id: 'q1', type: 'multiple-choice', questionKey: 'scenarios.phishing-ceo-fraud.q1',
      options: [
        { key: 'scenarios.phishing-ceo-fraud.q1_opt1', value: 'spoofed-domain' },
        { key: 'scenarios.phishing-ceo-fraud.q1_opt2', value: 'compromised-account' },
        { key: 'scenarios.phishing-ceo-fraud.q1_opt3', value: 'legitimate' }
      ],
      correctAnswer: 'spoofed-domain',
      explanationKey: 'scenarios.phishing-ceo-fraud.q1_exp',
      points: 30
    },
    {
      id: 'q2', type: 'multiple-choice', questionKey: 'scenarios.phishing-ceo-fraud.q2',
      options: [
        { key: 'scenarios.phishing-ceo-fraud.q2_opt1', value: 'reply-to' },
        { key: 'scenarios.phishing-ceo-fraud.q2_opt2', value: 'subject' },
        { key: 'scenarios.phishing-ceo-fraud.q2_opt3', value: 'to' }
      ],
      correctAnswer: 'reply-to',
      explanationKey: 'scenarios.phishing-ceo-fraud.q2_exp',
      points: 35
    },
    {
      id: 'q3', type: 'multiple-choice', questionKey: 'scenarios.phishing-ceo-fraud.q3',
      options: [
        { key: 'scenarios.phishing-ceo-fraud.q3_opt1', value: 'block-domain' },
        { key: 'scenarios.phishing-ceo-fraud.q3_opt2', value: 'pay-invoice' },
        { key: 'scenarios.phishing-ceo-fraud.q3_opt3', value: 'ignore' }
      ],
      correctAnswer: 'block-domain',
      explanationKey: 'scenarios.phishing-ceo-fraud.q3_exp',
      points: 35
    }
  ],
  socData: {}
};
