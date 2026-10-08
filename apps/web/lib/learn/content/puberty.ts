// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

import type { LearnArticle } from "@/lib/learn/articles";

export const PUBERTY_ARTICLES: LearnArticle[] = [
  {
    slug: "puberty-changes",
    category: "puberty",
    reviewedAt: "2026-10-04",
    sources: [
      { label: "MedlinePlus — Puberty", href: "https://medlineplus.gov/puberty.html" },
      { label: "KidsHealth — All about puberty (for kids)", href: "https://kidshealth.org/en/kids/puberty.html" },
      { label: "NHS — Starting your periods", href: "https://www.nhs.uk/conditions/periods/starting-periods/" },
      { label: "NICHD — About puberty and precocious puberty", href: "https://www.nichd.nih.gov/health/topics/puberty/conditioninfo" },
      { label: "Office on Women's Health — Your menstrual cycle", href: "https://www.womenshealth.gov/menstrual-cycle/your-menstrual-cycle" },
    ],
    related: ["first-period", "period-products", "body-image"],
    en: {
      title: "Puberty: what changes",
      summary: "Puberty is when your body starts to grow up. For girls it usually starts between ages 8 and 13. Here is what changes in your body and your feelings.",
      sections: [
        {
          heading: "What puberty is",
          body: "Puberty is the time when your body changes from a child's body into an adult's. For girls, it usually starts between ages 8 and 13. For boys, it is usually between 9 and 14. It starts when a small gland at the bottom of your brain sends out hormones. Hormones are chemical messengers in your blood. In girls, they tell the ovaries to make a hormone called oestrogen. This causes many of the changes.",
        },
        {
          heading: "Changes in your body",
          body: "For most girls, the first sign is breasts starting to grow. It begins as a small swelling under each nipple. Often one side starts first, and the area can feel a bit sore. This is normal. Next, hair starts to grow around your genitals (pubic hair) and under your arms. You will also grow taller quickly for about 2 to 3 years. This is called a growth spurt. Your hips get wider and your body gets curvier. Boys change too. Their voice gets deeper, and hair starts to grow on their face.",
        },
        {
          heading: "Discharge and your first period",
          body: "You may notice some white or clear fluid in your underwear. This is called vaginal discharge. It is normal, and it helps keep your vagina clean. It often starts about 6 months to a year before your first period. Periods usually come last, about 2 years after your breasts start to grow. Most girls get their first period at around age 12.",
        },
        {
          heading: "Sweat, smell and spots",
          body: "During puberty, you may sweat more, and your body can start to smell. A shower every day helps. A deodorant helps with smell, and an antiperspirant also reduces sweat. Lots of young people get spots (acne) too. Gently wash your face morning and night with warm water and a mild cleanser. Try not to squeeze or pick your spots.",
        },
        {
          heading: "New feelings",
          body: "Puberty can bring strong new feelings. Your mood may change quickly, and things may upset you more than they used to. At times you may not be sure how you feel. You may also start to feel attracted to other people. This is a normal part of growing up. Talking to someone you trust can help. If you feel low most of the time, or think about hurting yourself, tell an adult you trust or get help straight away.",
        },
        {
          heading: "Everyone grows at their own pace",
          body: "Everyone grows at a different speed. Your friends might start puberty before or after you, and most differences are gone by the end. If you have questions, talk to a parent or carer, a doctor or nurse, a school nurse, a teacher or another adult you trust. See a doctor or nurse if puberty starts before age 8, or if you have no signs of puberty by 13. Also go if your periods have not started by 15, or within 3 years of your breasts starting to grow.",
        },
      ],
      notice: "This is general information. Everyone goes through puberty at their own pace. If you are worried, talk to a parent, carer, doctor or nurse.",
    },
  },
  {
    slug: "first-period",
    category: "puberty",
    reviewedAt: "2026-10-04",
    sources: [
      { label: "NHS — Starting your periods", href: "https://www.nhs.uk/conditions/periods/starting-periods/" },
      { label: "KidsHealth — All about periods (for teens)", href: "https://kidshealth.org/en/teens/menstruation.html" },
      { label: "Office on Women's Health — Your menstrual cycle", href: "https://www.womenshealth.gov/menstrual-cycle/your-menstrual-cycle" },
      { label: "Office on Women's Health — Period problems", href: "https://www.womenshealth.gov/menstrual-cycle/period-problems" },
      { label: "NHS — Toxic shock syndrome", href: "https://www.nhs.uk/conditions/toxic-shock-syndrome/" },
    ],
    related: ["period-products", "teen-period-problems", "puberty-changes"],
    en: {
      title: "Your first period",
      summary: "Most people get their first period at around age 12, about 2 years after their breasts start to grow. Here is what it is like, what to use and how to be ready.",
      sections: [
        {
          heading: "What a period is",
          body: "A period is when a small amount of blood comes out of your vagina for a few days. Each month, the lining of your womb (uterus) gets thicker. This gets your body ready for a possible pregnancy in the future. When there is no pregnancy, the lining comes away and leaves your body. That is your period. It is a normal, healthy part of growing up.",
        },
        {
          heading: "When it might come",
          body: "Most girls get their first period at around age 12. But anywhere from 8 to 15 can be normal. Signs that it is getting close include breasts that started growing about 2 years ago, hair under your arms and around your genitals, and white or clear discharge in your underwear. Discharge often starts 6 months to a year before your first period.",
        },
        {
          heading: "What it is like",
          body: "Your first period might be short. At first there is often only a small red or brown mark on your underwear, not a lot of blood. Period blood can be red or brown. A period usually lasts about 5 days. Over the whole period, you lose only a few tablespoons of blood. Many people get cramps in their lower tummy, mostly in the first days. A heat pad on your tummy can help. So can painkillers such as ibuprofen, but ask a parent, carer or pharmacist first.",
        },
        {
          heading: "Pads and other products",
          body: "Pads, tampons, menstrual cups and period underwear are all safe to use, even for your first period. Many people start with pads, because tampons and cups take practice. Change a pad every few hours. Never leave a tampon in for more than 8 hours, because of the risk of toxic shock syndrome (TSS), a rare but serious illness. If you suddenly get a high fever, vomiting or a rash, or feel dizzy or faint, while using a tampon, cup or disc, take it out and get medical help straight away. If you feel very unwell or confused, or have trouble breathing, call your local emergency number.",
        },
        {
          heading: "Being ready",
          body: "It helps to carry a pad or two in your school bag before your first period starts. If your period starts at school and you have nothing with you, ask a teacher or the school nurse. Talk to a parent, carer or another adult you trust about what you might need. For the first year or two, periods often come at different times. This is normal while your body settles.",
        },
        {
          heading: "When to talk to a doctor",
          body: "Talk to a doctor or nurse if your periods have not started by 15. Also talk to one if they have not started within 3 years of your breasts starting to grow, or if they started before age 8. Go too if your periods are still not regular after 2 years, or if a period lasts more than 7 days. Get checked if you need to change a pad or tampon every 1 to 2 hours, or if cramps are bad and painkillers do not help. Get urgent help if you bleed very heavily and feel dizzy or faint.",
        },
      ],
      notice: "This is general information. Every body has its own timing. If you have questions or worries, talk to a parent, carer, doctor or nurse.",
    },
  },
  {
    slug: "teen-period-problems",
    category: "puberty",
    reviewedAt: "2026-10-04",
    sources: [
      { label: "KidsHealth — PMS, cramps and irregular periods (for teens)", href: "https://kidshealth.org/en/teens/menstrual-problems.html" },
      { label: "KidsHealth — All about periods (for teens)", href: "https://kidshealth.org/en/teens/menstruation.html" },
      { label: "Office on Women's Health — Period problems", href: "https://www.womenshealth.gov/menstrual-cycle/period-problems" },
      { label: "Office on Women's Health — Your menstrual cycle", href: "https://www.womenshealth.gov/menstrual-cycle/your-menstrual-cycle" },
      { label: "CDC — Bleeding disorders in tweens and teens", href: "https://www.cdc.gov/female-blood-disorders/about/information-for-adolescents.html" },
      { label: "KidsHealth — Abnormal uterine bleeding (for teens)", href: "https://kidshealth.org/en/teens/aub.html" },
    ],
    related: ["period-pain", "heavy-periods", "bleeding-disorders"],
    en: {
      title: "Period problems in teens",
      summary: "In the first few years, periods are often irregular and cramps are common. Most of this is normal, but some problems need a doctor. Here is how to tell the difference.",
      sections: [
        {
          heading: "Irregular periods at first",
          body: "For the first couple of years, it is normal for periods to come at different times. Cycles longer than 38 days are common. Most people's cycles settle into the usual adult range, about 21 to 38 days, within about 3 years. Stress and big weight changes can also affect periods. If you have had sex and your period is late, you could be pregnant. Take a pregnancy test or talk to a doctor or nurse.",
        },
        {
          heading: "Cramps and what helps",
          body: "Cramps happen when chemicals called prostaglandins make the muscle of the womb (uterus) tighten. They are most common in the first days of a period. A heat pad on your tummy can help. Painkillers such as ibuprofen or naproxen work best if you take them at the first sign of cramps. Ask a parent, carer or pharmacist which medicine is right for you, and follow the leaflet.",
        },
        {
          heading: "PMS: changes before a period",
          body: "Some people feel different in the days before a period. This is called premenstrual syndrome (PMS). You might feel moody, sad, anxious, irritable or tired. You might also get bloating, backache, sore breasts or spots. Regular exercise, less caffeine and less salt may help. If PMS is so bad that it gets in the way of everyday life, talk to a doctor. If you feel very low or think about harming yourself, tell an adult you trust or get help straight away.",
        },
        {
          heading: "Heavy or long periods",
          body: "Some teens have heavy periods. Signs include needing to change a pad or tampon every 1 to 2 hours, or periods that last more than 7 days. Passing clots bigger than about 2.5 cm, the size of a large coin, is another sign. Heavy bleeding can cause anaemia, which can make you feel tired, weak or dizzy. In teens, heavy periods are often linked to hormone changes. Sometimes they are a sign of a bleeding disorder, such as von Willebrand disease. This is more likely if you also bruise easily, have nosebleeds that are hard to stop, or have a relative with a bleeding disorder.",
        },
        {
          heading: "When to see a doctor or nurse",
          body: "See a doctor or nurse if you are 15 and your periods have not started. Also go if they have not started within 3 years of your breasts starting to grow. Go too if your periods are still not regular after 2 years, or if they were regular and then stop for 3 months. Heavy periods, bleeding between periods and cramps that keep you home from school are other reasons to go. Logging your periods in Ciclo can help you explain what is happening. Get urgent help if you bleed very heavily and feel dizzy or faint. Also get urgent help for sudden, severe pain in your lower tummy, especially if you might be pregnant.",
        },
      ],
      notice: "This is general information. If your periods worry you, talk to a parent, carer, doctor or nurse. They can help.",
    },
  },
  {
    slug: "talking-to-kids",
    category: "puberty",
    reviewedAt: "2026-10-04",
    sources: [
      { label: "KidsHealth — Talking to your child about periods", href: "https://kidshealth.org/en/parents/talk-about-menstruation.html" },
      { label: "NHS — Starting your periods", href: "https://www.nhs.uk/conditions/periods/starting-periods/" },
      { label: "KidsHealth — All about periods (for teens)", href: "https://kidshealth.org/en/teens/menstruation.html" },
      { label: "Office on Women's Health — Period problems", href: "https://www.womenshealth.gov/menstrual-cycle/period-problems" },
      { label: "NICHD — About puberty and precocious puberty", href: "https://www.nichd.nih.gov/health/topics/puberty/conditioninfo" },
      { label: "Office on Women's Health — Your menstrual cycle", href: "https://www.womenshealth.gov/menstrual-cycle/your-menstrual-cycle" },
    ],
    related: ["first-period", "puberty-changes", "period-products"],
    en: {
      title: "Talking with your child about periods",
      summary: "Children as young as 6 or 7 can follow a simple explanation of periods. Small, regular chats make it easier to cover the facts well before a first period arrives.",
      sections: [
        {
          heading: "Start early and keep talking",
          body: "Children as young as 6 or 7 can usually follow a simple explanation of periods. Rather than one big talk, have lots of small conversations and add detail as your child grows. Natural moments make it easier, such as a question about bodies or babies, or buying pads or tampons at the shop. Answer questions in a clear, direct way. If you do not know an answer, it is fine to say so and look it up together.",
        },
        {
          heading: "What to explain",
          body: "Explain that each month the lining of the womb (uterus) gets ready in case of a pregnancy. If there is no pregnancy, the lining comes away and leaves the body through the vagina as a period. A period usually lasts about 5 days, and the amount of blood is small, only a few tablespoons. Cramps are common, especially in the first days, and things like a heat pad can help.",
        },
        {
          heading: "Signs a first period is coming",
          body: "Most children get their first period at around age 12, but anywhere from 8 to 15 can be normal. Every body has its own timing. A first period usually comes about 2 years after breasts start to grow. Underarm and pubic hair are other signs. White or clear discharge in their underwear often starts 6 months to a year before a first period. If you have not talked yet, this is a good time.",
        },
        {
          heading: "Getting ready together",
          body: "Help your child put a pad or two in their school bag before their first period. Pads, tampons, menstrual cups and period underwear are all safe from the start, but many young people begin with pads because tampons and cups take practice. Let them know that if their period starts at school, a teacher or school nurse can help. Explain that periods are often irregular for the first couple of years, and that this is normal.",
        },
        {
          heading: "Include boys, and find what works",
          body: "Boys should learn about periods too, so include sons in these talks. If talking face to face feels awkward for either of you, reading a book or watching a video together can be an easier way in. Once periods start, writing down the dates, on a calendar or in Ciclo, can help your child learn their pattern and notice anything unusual.",
        },
        {
          heading: "When to see a doctor or nurse",
          body: "Book an appointment if your child is 15 and has not started their periods, or has not started within 3 years of breasts starting to grow. Also book one if your child shows signs of puberty, such as breast growth, before age 8, or has a period before 8. Also see a doctor or nurse if their periods are very heavy or still not regular after about 2 years. Severe cramps that ibuprofen does not help are another reason to go. Get urgent help if they are bleeding very heavily and feel dizzy or faint.",
        },
      ],
      notice: "This is general information for parents and carers. If you are worried about your child's development or periods, talk to a doctor or nurse.",
    },
  },
];
