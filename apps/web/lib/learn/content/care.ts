// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

import type { LearnArticle } from "@/lib/learn/articles";

export const CARE_ARTICLES: LearnArticle[] = [
  {
    slug: "when-to-see-a-doctor",
    category: "care",
    reviewedAt: "2026-10-04",
    sources: [
      { label: "Office on Women's Health — Period problems", href: "https://www.womenshealth.gov/menstrual-cycle/period-problems" },
      { label: "NHS — Period problems", href: "https://www.nhs.uk/conditions/periods/period-problems/" },
      { label: "NHS — Iron deficiency anaemia", href: "https://www.nhs.uk/conditions/iron-deficiency-anaemia/" },
      { label: "NHS — Pelvic pain", href: "https://www.nhs.uk/symptoms/pelvic-pain/" },
      { label: "NHS — Toxic shock syndrome", href: "https://www.nhs.uk/conditions/toxic-shock-syndrome/" },
      { label: "Office on Women's Health — Your menstrual cycle", href: "https://www.womenshealth.gov/menstrual-cycle/your-menstrual-cycle" },
    ],
    related: ["heavy-periods", "tracking-for-doctor", "toxic-shock-syndrome"],
    en: {
      title: "When to see a doctor about your period",
      summary: "Some period changes are worth a routine check-up, and a few need urgent care. Here is how to tell the difference, and what to bring to your appointment.",
      sections: [
        {
          heading: "Knowing your normal",
          body: "Periods vary, so the most useful guide is what is normal for you. Most adult cycles last somewhere between about 21 and 38 days, and a period usually lasts 2 to 7 days. Periods usually come regularly. They stop during pregnancy and after menopause, and often while breastfeeding. Irregular periods are common in the first few years after periods start and in the years before menopause. A clear change from your usual pattern is a good reason to get checked.",
        },
        {
          heading: "Book a routine appointment",
          body: "See a doctor or nurse if your periods become irregular after being regular. Also book if your cycles are regularly shorter than 24 days or longer than 38 days. Go if you have had no period for 3 months and are not pregnant or breastfeeding. Also go if periods have not started by age 15, or within 3 years of breasts starting to grow, or if they started before age 8. Pain is another reason, if painkillers such as ibuprofen do not help or it stops you working or studying. So are premenstrual symptoms or migraines that affect your daily life.",
        },
        {
          heading: "Heavy or unusual bleeding",
          body: "Get checked if your periods are heavy. Signs include changing a pad or tampon every 1 to 2 hours, or needing two products at once. Bleeding for more than 7 days, passing clots larger than about 2.5 cm, or bleeding through to your clothes or bedding are also signs. Bleeding between periods, after sex or after menopause should always be checked by a doctor. Feeling very tired or short of breath with heavy periods can be a sign of low iron (anaemia).",
        },
        {
          heading: "Get help the same day",
          body: "If heavy bleeding makes you feel dizzy, light-headed or weak, contact a doctor or nurse the same day. Do the same if you have pelvic pain with a high temperature, unusual discharge, vomiting, or pain when peeing. If you might be pregnant, even without a positive test, contact a doctor or nurse the same day if you have pain low down on one side of your tummy or any bleeding. Get emergency help for sudden, severe tummy pain, pain in the tip of your shoulder, heavy bleeding, or feeling very dizzy or faint. These can be signs of a pregnancy growing outside the womb (ectopic pregnancy).",
        },
        {
          heading: "Get emergency help",
          body: "Call your local emergency number or go to an emergency department if you are bleeding heavily and you faint or feel about to faint, or you have chest pain or trouble breathing. Do the same for sudden, severe pain in your tummy or pelvis. Toxic shock syndrome (TSS) is a rare but serious illness linked to tampons and cups. If you suddenly get a high fever, vomiting or a rash, or feel dizzy or faint, while using a tampon, cup or disc, take it out and get medical help straight away. If you feel very unwell or confused, or have trouble breathing, call your local emergency number.",
        },
        {
          heading: "Getting the most from your visit",
          body: "Before your appointment, note when each period started and ended, how heavy the bleeding was, how often you changed products, and any pain or other symptoms. A diary or calendar of your periods and symptoms helps a doctor or nurse find the cause of a problem. Ciclo keeps your period dates and logged symptoms in one place, so you can look back before the visit. It also helps to bring a list of any medicines you take and the questions you want to ask.",
        },
      ],
      notice: "This is general information, not a diagnosis. If you are worried about your periods, talk to a doctor or nurse.",
    },
  },
  {
    slug: "cervical-screening",
    category: "care",
    reviewedAt: "2026-10-04",
    sources: [
      { label: "NHS — Cervical screening", href: "https://www.nhs.uk/tests-and-treatments/cervical-screening/" },
      { label: "MedlinePlus — Pap smear", href: "https://medlineplus.gov/lab-tests/pap-smear/" },
      { label: "WHO — Cervical cancer", href: "https://www.who.int/news-room/fact-sheets/detail/cervical-cancer" },
      { label: "Planned Parenthood — What is a pelvic exam?", href: "https://www.plannedparenthood.org/learn/health-and-wellness/wellness-visit/what-pelvic-exam" },
    ],
    related: ["hpv", "gynecology-visit", "gynecologic-cancers"],
    en: {
      title: "Cervical screening (smear or Pap test)",
      summary: "Cervical screening is a quick test that helps prevent cervical cancer by finding cell changes early. Who is invited, and how often, depends on where you live.",
      sections: [
        {
          heading: "What cervical screening is",
          body: "Cervical screening, also called a smear test or Pap test, checks the health of the neck of the womb (cervix). It looks for changes in cervical cells before they turn into cancer, so they can be treated early. Depending on the test, the sample is checked for human papillomavirus (HPV), for abnormal cells, or for both. Screening is for people who have no symptoms, and finding and treating changes early helps prevent cervical cancer. Keep going to screening even if you have had the HPV vaccine.",
        },
        {
          heading: "Who is invited and how often",
          body: "Ages and intervals differ between countries, so follow the advice where you live. The World Health Organization (WHO) recommends a high-performance test, such as an HPV test, every 5 to 10 years from age 30, or every 3 to 5 years from age 25 for women living with HIV. For example, in England the NHS invites women and people with a cervix aged 25 to 64 every 5 years. In the United States, screening usually starts at 21 or 25 and is repeated every 3 or 5 years until 65, depending on the test. If you are over 65, or have had your womb and cervix removed, ask whether you still need screening.",
        },
        {
          heading: "What happens at the test",
          body: "A doctor or nurse does the test, and it takes only a few minutes. You undress from the waist down and lie on your back with your knees bent. A smooth tool called a speculum is gently put into your vagina so the cervix can be seen. Then a small, soft brush collects some cells, which are sent to a lab. You may feel pressure or a cramp, but it does not usually hurt. Breathing slowly can help you relax, and if anything hurts, say so. In some places you can take the sample yourself for an HPV test, which works as well as a sample taken by a doctor or nurse.",
        },
        {
          heading: "Before and after",
          body: "Try to book for a time when you will not have your period, as bleeding can affect the result. About 5 days after a period ends is a good time. For 2 days before the test, avoid sex in the vagina, tampons, and creams or medicines put into the vagina. Some people have very light bleeding afterwards. Ciclo's period predictions can help you choose a date, but they are estimates, so check your log too.",
        },
        {
          heading: "Results and next steps",
          body: "If your result is normal, you will usually not need another test until the usual interval for your country. If changes are found, this usually does not mean cancer. You may be asked to have another test, or a closer look at the cervix with a magnifying instrument (colposcopy). Unclear results can also be linked to pregnancy, menopause or an infection. Screening is not a test for symptoms: if you have bleeding between periods, after sex or after menopause, see a doctor without waiting for your next test.",
        },
      ],
      notice: "This is general information. Screening ages and intervals vary by country, so check what is offered where you live.",
    },
  },
  {
    slug: "gynecology-visit",
    category: "care",
    reviewedAt: "2026-10-04",
    sources: [
      { label: "Planned Parenthood — What is a pelvic exam?", href: "https://www.plannedparenthood.org/learn/health-and-wellness/wellness-visit/what-pelvic-exam" },
      { label: "KidsHealth — Pelvic exams (for teens)", href: "https://kidshealth.org/en/teens/pelvic-exams.html" },
      { label: "MedlinePlus — Pap smear", href: "https://medlineplus.gov/lab-tests/pap-smear/" },
    ],
    related: ["cervical-screening", "tracking-for-doctor", "when-to-see-a-doctor"],
    en: {
      title: "Your gynaecology appointment",
      summary: "Knowing what happens at a gynaecology appointment can make it feel easier. Here is what to expect, how a pelvic exam works, and how to prepare.",
      sections: [
        {
          heading: "Why you might go",
          body: "A gynaecology appointment is a check of your reproductive health with a doctor or nurse. You might go for cervical screening or a routine check, or because of a problem such as heavy bleeding, missed periods, pain or unusual discharge. An internal exam is not always needed. Teens do not usually have one unless there is a problem. In the United States, for example, a routine pelvic exam is usually not needed before age 21 unless there is a problem.",
        },
        {
          heading: "Talking about your health",
          body: "Most appointments start with questions. Expect to be asked about your periods, such as when your last one started, how long periods last and how heavy they are, and about pain or other symptoms. You may also be asked about sex, contraception, pregnancy, medicines and your general health. Honest answers help you get the right care. Bringing your period dates and symptom notes from Ciclo, and a written list of your questions, makes this easier.",
        },
        {
          heading: "What a pelvic exam involves",
          body: "In a pelvic exam, a doctor or nurse checks your vulva and your internal reproductive organs. You are given privacy to undress, usually from the waist down, and a gown to cover yourself. First they look at the vulva and the opening of the vagina. Then they gently insert a speculum to see the vagina and cervix, and may take a sample for cervical screening. They may also put 1 or 2 gloved, lubricated fingers into your vagina while pressing gently on your lower tummy, to feel the womb and ovaries.",
        },
        {
          heading: "How it feels",
          body: "The pelvic exam itself usually takes about 3 to 5 minutes. Some parts may feel uncomfortable or cause pressure, but it should not be painful. If it hurts, say so straight away. Slow, deep breaths can help your body relax. Try to let your tummy and shoulders go loose. You can ask the doctor or nurse to explain each step as they go.",
        },
        {
          heading: "Planning your visit",
          body: "If you can, book for a time when you will not have your period, especially if you are having cervical screening. For 2 days before a screening test, avoid sex in the vagina, tampons, and vaginal creams or medicines. You can ask whether a friend, family member or chaperone can be in the room. If an exam is hard for you, for example because of past experiences, you can tell the clinic in advance and ask what support they offer.",
        },
      ],
      notice: "This is general information. You can ask questions at any point during your appointment.",
    },
  },
  {
    slug: "breast-awareness",
    category: "care",
    reviewedAt: "2026-10-04",
    sources: [
      { label: "NHS — How should I check my breasts?", href: "https://www.nhs.uk/common-health-questions/womens-health/how-should-i-check-my-breasts/" },
      { label: "NHS — Symptoms of breast cancer in women", href: "https://www.nhs.uk/conditions/breast-cancer-in-women/symptoms-of-breast-cancer-in-women/" },
      { label: "NHS — Breast pain", href: "https://www.nhs.uk/conditions/breast-pain/" },
    ],
    related: ["breast-pain", "gynecology-visit"],
    en: {
      title: "Breast awareness",
      summary: "Being breast aware means knowing how your breasts usually look and feel, so you notice changes early. Many changes have other causes, but any new change should be checked.",
      sections: [
        {
          heading: "What breast awareness means",
          body: "Breast awareness means getting to know how your breasts or chest normally look and feel. Checking regularly makes it easier to notice any changes in their size, look or feel. What matters most is knowing what is normal for you, so a change stands out. Try to check about once a month.",
        },
        {
          heading: "Your cycle and your breasts",
          body: "Breasts can look and feel different at different points in the menstrual cycle. Many people find them more tender or swollen in the week or two before a period, and this usually settles once the period ends. Breasts also change after menopause. Because of this, it can help to notice where you are in your cycle each time you check, so you can compare your breasts at the same point in each cycle. Ciclo's period log can help you see this.",
        },
        {
          heading: "How to check",
          body: "Stand in front of a mirror and look at both breasts, first with your arms down, then with your arms up. Next, use your fingers to feel each breast or side of your chest in small circles. Cover the whole area up to your collarbone and into each armpit, including the nipple. Press lightly at first, then more firmly, but never so hard that it hurts. Some people find this easier lying down or in the shower.",
        },
        {
          heading: "Changes to look out for",
          body: "Look out for a lump or swelling in your breast, chest or armpit, or a change in the size or shape of one or both breasts. The skin may dimple, like orange peel. It may also change colour, for example looking darker than usual on black or brown skin, or red on white skin. Also look for a nipple that turns inwards or has a rash, or fluid from the nipple when you are not pregnant or breastfeeding, which may contain blood.",
        },
        {
          heading: "If you notice a change",
          body: "See a doctor or nurse if you notice any of these changes, and do not wait to see if they go away. Many breast changes, including lumps, are common and can be caused by other conditions, but only a check can tell. Breast pain on its own is unlikely to be a sign of cancer. You can also ask a doctor or nurse whether breast screening (a mammogram) is offered for your age where you live.",
        },
      ],
      notice: "This is general information, not a diagnosis. If you notice a change in your breast or chest, see a doctor or nurse.",
    },
  },
  {
    slug: "tracking-for-doctor",
    category: "care",
    reviewedAt: "2026-10-04",
    sources: [
      { label: "Office on Women's Health — Period problems", href: "https://www.womenshealth.gov/menstrual-cycle/period-problems" },
      { label: "NHS — Period problems", href: "https://www.nhs.uk/conditions/periods/period-problems/" },
      { label: "Office on Women's Health — Premenstrual syndrome (PMS)", href: "https://www.womenshealth.gov/menstrual-cycle/premenstrual-syndrome" },
    ],
    related: ["tracking-your-cycle", "when-to-see-a-doctor", "gynecology-visit"],
    en: {
      title: "Using your cycle log at an appointment",
      summary: "A few months of notes about your periods and symptoms can help a doctor or nurse understand what is going on. Here is what to record and how to use it.",
      sections: [
        {
          heading: "Why a record helps",
          body: "It is easy to forget details from one month to the next. A diary or calendar of your periods and symptoms can help a doctor or nurse spot patterns and find the cause of a problem. It can show whether symptoms are linked to your cycle or to something else. For some conditions, such as PMS and PMDD, a daily record kept for at least 2 cycles is part of how they are diagnosed.",
        },
        {
          heading: "Period details to note",
          body: "Note the first and last day of each period, so the doctor can see how long your cycles and periods last. Record how heavy the flow is each day and how often you change pads, tampons or cups. Note any clots or bleeding through to clothes or bedding. Log every day you bleed, not only the first day, and note any spotting or bleeding between periods or after sex.",
        },
        {
          heading: "Pain, symptoms and mood",
          body: "Write down any pain, including where it is, how strong it is and whether painkillers help. Note other symptoms, such as headaches, bloating, breast pain, tiredness, sleep changes and mood, along with how severe they are and on which days they happen. Doing this daily, for a few months, gives a clearer picture than trying to remember later. If symptoms affect work, school or relationships, note that too, as it shows their impact.",
        },
        {
          heading: "Other things to bring",
          body: "Make a list of any medicines you take, including contraception, supplements and painkillers. Note anything that might affect your cycle, such as a recent pregnancy, breastfeeding, a new medicine, stress or illness. Write down your questions beforehand, with the one that matters most to you at the top, so you do not forget them during the visit.",
        },
        {
          heading: "Making the most of your log",
          body: "Records from a few months are more useful than records from one month. Before the visit, look back and pick out the main patterns, such as how long your cycles usually are and when symptoms start. Any diary, calendar or app works. In Ciclo, your logged periods, symptoms and notes are kept in one place, and predictions are marked as estimates. Share as much as you are comfortable with. Your log supports the conversation, but it is not a diagnosis.",
        },
      ],
      notice: "This is general information. A cycle log helps you talk to a doctor or nurse; it cannot diagnose a condition.",
    },
  },
  {
    slug: "gynecologic-cancers",
    category: "care",
    reviewedAt: "2026-10-04",
    sources: [
      { label: "CDC — Symptoms of gynecologic cancers", href: "https://www.cdc.gov/gynecologic-cancer/symptoms/index.html" },
      { label: "NHS — Ovarian cancer: symptoms", href: "https://www.nhs.uk/conditions/ovarian-cancer/symptoms/" },
      { label: "CDC — Reducing risk for gynecologic cancers", href: "https://www.cdc.gov/gynecologic-cancer/prevention/index.html" },
    ],
    related: ["cervical-screening", "postmenopausal-bleeding", "spotting"],
    en: {
      title: "Gynaecological cancers: signs to know",
      summary: "Knowing the signs of gynaecological cancers helps you act early. These symptoms often have other causes, but any that last or are not normal for you should be checked.",
      sections: [
        {
          heading: "What these cancers are",
          body: "Gynaecological cancers start in the reproductive organs. The main types are cervical, ovarian, womb (uterine), vaginal and vulval cancers. Each type has its own signs, and symptoms are not the same for everyone. Many of these symptoms are common and can be caused by other conditions, and the only way to know the cause is to see a doctor. Cervical screening helps find changes in the cervix early, but it does not check for the other types, so knowing the signs matters. The HPV vaccine protects against the types of HPV that cause most cervical, vaginal and vulval cancers.",
        },
        {
          heading: "Unusual bleeding or discharge",
          body: "Unusual bleeding or discharge from the vagina can be a sign of all of these cancers except vulval cancer. This includes bleeding between periods, after sex or after menopause, and periods that are heavier than usual for you. These kinds of bleeding should always be checked by a doctor. Discharge that is unusual for you is also worth getting checked.",
        },
        {
          heading: "Tummy, pelvis and bladder changes",
          body: "Some signs are easy to mistake for everyday problems. Ovarian cancer can cause a swollen tummy or bloating, feeling full quickly or not wanting to eat, and pain in the tummy, pelvis or back. Pelvic pain or pressure can also be a sign of womb cancer. Needing to pee more often or more urgently, and constipation, can happen with ovarian and vaginal cancers. Ovarian cancer can also cause indigestion, diarrhoea, feeling tired all the time and losing weight without trying.",
        },
        {
          heading: "Changes to the vulva",
          body: "Vulval cancer has its own signs. These include itching, burning, pain or tenderness of the vulva, and changes in the colour or skin of the vulva, such as a rash, sores or warts. These changes can have other causes too, but changes that last should be looked at by a doctor or nurse.",
        },
        {
          heading: "When to see a doctor",
          body: "Pay attention to your body and know what is normal for you. See a doctor straight away about any vaginal bleeding that is unusual for you, including any bleeding after menopause. For the other signs, see a doctor if one lasts 2 weeks or longer and is not normal for you. If you have seen a doctor before and your symptoms have not gone away, are worse or happen more often, go back. If a doctor thinks you need more tests, you may be referred urgently to a specialist. Noting when symptoms happen in Ciclo can help you describe them clearly.",
        },
      ],
      notice: "This is general information, not a diagnosis. See a doctor straight away about unusual bleeding, and about other symptoms that last 2 weeks or more.",
    },
  },
  {
    slug: "when-to-seek-care",
    category: "care",
    reviewedAt: "2026-08-18",
    sources: [
      { label: "NHS — Periods", href: "https://www.nhs.uk/conditions/periods/" },
    ],
    es: {
      title: "Cuándo consultar",
      summary: "Ciclo es una app de registro y pronóstico. No sustituye atención sanitaria.",
      sections: [
        {
          heading: "Señales para pedir cita",
          body: "Sangrado que empapa una compresa cada hora, dolor que no mejora, periodos que desaparecen varios meses, sangrado después de la menopausia, o síntomas que te impiden hacer tu vida.",
        },
        {
          heading: "Urgencias",
          body: "Si hay dolor agudo intenso, mareo, desmayo o sangrado muy abundante de forma súbita, busca atención urgente.",
        },
      ],
      notice: "Los tips de Ciclo son orientación general de bienestar, no consejo médico personalizado.",
    },
    en: {
      title: "When to seek care",
      summary: "Ciclo is a logging and forecast app. It does not replace clinical care.",
      sections: [
        {
          heading: "Reasons to book an appointment",
          body: "Bleeding that soaks a pad every hour, pain that does not ease, periods that stop for several months, bleeding after menopause, or symptoms that stop you living your life.",
        },
        {
          heading: "Urgent care",
          body: "If you have sudden severe pain, dizziness, fainting, or very heavy bleeding all at once, seek urgent care.",
        },
      ],
      notice: "Ciclo tips are general wellbeing guidance, not personalised medical advice.",
    },
  },
];
