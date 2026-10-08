// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

import type { LearnArticle } from "@/lib/learn/articles";

export const SYMPTOMS_ARTICLES: LearnArticle[] = [
  {
    slug: "pms",
    category: "symptoms",
    reviewedAt: "2026-10-04",
    sources: [
      { label: "NHS — PMS (premenstrual syndrome)", href: "https://www.nhs.uk/conditions/pre-menstrual-syndrome/" },
      { label: "Office on Women's Health — Premenstrual syndrome (PMS)", href: "https://www.womenshealth.gov/menstrual-cycle/premenstrual-syndrome" },
      { label: "CDC — About sleep", href: "https://www.cdc.gov/sleep/about/index.html" },
    ],
    related: ["pmdd", "mood-and-cycle", "bloating-digestion"],
    en: {
      title: "Premenstrual syndrome (PMS)",
      summary: "PMS is a mix of physical and emotional changes in the week or two before a period. Most people get some symptoms, and there is a lot you can do to feel better.",
      sections: [
        {
          heading: "What PMS is",
          body: "Premenstrual syndrome (PMS) is very common. Symptoms can start up to 2 weeks before a period and usually fade within a few days of it starting, as hormone levels begin to rise again. Over 90% of women say they get at least some premenstrual symptoms. PMS is likely if your symptoms follow a pattern. They start in the 5 days before your period and end within 4 days after bleeding starts. They happen for at least 3 cycles in a row and get in the way of daily life.",
        },
        {
          heading: "Common signs",
          body: "Physical signs include bloating or a gassy feeling, tender or swollen breasts, cramps, headaches or backache, constipation or diarrhoea, spotty skin and greasy hair. Emotional and behaviour changes include mood swings, irritability, feeling low, anxious or tearful, tiredness, and sleeping more or less than usual. Changes in appetite or food cravings, trouble concentrating and less interest in sex are also common. You may notice only a few of these.",
        },
        {
          heading: "Why it happens",
          body: "Experts do not fully understand why PMS happens. It seems to be linked to hormone changes in the cycle. After ovulation, progesterone rises. If you do not get pregnant, oestrogen and progesterone then fall sharply in the days before your period. Symptoms tend to appear in this second half of the cycle. PMS may be more likely if you are under a lot of stress, have had depression or postnatal depression, or have a family history of depression. It is most common in people in their 30s, and it can make migraine, asthma and allergies worse.",
        },
        {
          heading: "Everyday steps that help",
          body: "Regular aerobic exercise through the month can ease tiredness, low mood and poor focus. Try to get at least 7 hours of sleep a night, as poor sleep can make moodiness worse. Some people feel better eating smaller meals every 2 to 3 hours. Cutting down on caffeine, salt and sugar in the 2 weeks before your period may ease many symptoms. Yoga, meditation, talking with friends or writing in a journal can help with stress. Smoking is linked to more and worse PMS, and it helps not to drink too much alcohol.",
        },
        {
          heading: "Painkillers, supplements and treatment",
          body: "Painkillers such as ibuprofen or paracetamol can ease pain. Some studies suggest calcium may help with tiredness, cravings and low mood, and that vitamin B6 or magnesium may help some symptoms. Results for herbal remedies such as chasteberry and evening primrose oil are mixed. If you take other medicines, check with a doctor or pharmacist before starting a supplement. A doctor may suggest the combined pill for physical symptoms, an antidepressant (usually a type called an SSRI) for emotional symptoms, or a talking therapy called cognitive behavioural therapy (CBT).",
        },
        {
          heading: "When to see a doctor or nurse",
          body: "See a doctor or nurse if your symptoms affect your daily life or if lifestyle changes have not helped. Before you go, note your symptoms each day for at least 2 cycles. Logging your mood and symptoms in Ciclo can show clearly when they start and stop. If your symptoms are severe, especially anger, anxiety or low mood, ask about premenstrual dysphoric disorder (PMDD). If you are thinking about harming yourself, get emergency help or contact a crisis line now.",
        },
      ],
      notice: "This is general information, not a diagnosis. If premenstrual symptoms affect your daily life, talk to a doctor or nurse.",
    },
  },
  {
    slug: "pmdd",
    category: "symptoms",
    reviewedAt: "2026-10-04",
    sources: [
      { label: "Office on Women's Health — Premenstrual dysphoric disorder (PMDD)", href: "https://www.womenshealth.gov/menstrual-cycle/premenstrual-syndrome/premenstrual-dysphoric-disorder-pmdd" },
      { label: "IAPMD — What is PMDD?", href: "https://iapmd.org/about-pmdd" },
      { label: "NHS — PMS (premenstrual syndrome)", href: "https://www.nhs.uk/conditions/pre-menstrual-syndrome/" },
    ],
    related: ["pms", "mood-and-cycle", "depression"],
    en: {
      title: "Premenstrual dysphoric disorder (PMDD)",
      summary: "PMDD is a severe form of PMS that mainly affects mood in the week or two before a period. It is a recognised medical condition, and treatment can help.",
      sections: [
        {
          heading: "What PMDD is",
          body: "Premenstrual dysphoric disorder (PMDD) is a severe form of premenstrual syndrome (PMS). It mainly affects mood. It can cause intense low mood, anxiety, irritability or anger in the week or two before a period. Symptoms usually ease 2 to 3 days after bleeding starts. Up to 5% of women of childbearing age have PMDD.",
        },
        {
          heading: "Why it happens",
          body: "PMDD is not a hormone imbalance. People with PMDD have normal hormone levels that rise and fall as usual through the cycle. But their brain reacts strongly to these normal changes. Serotonin, a chemical messenger in the brain whose levels change across the cycle, may also play a part. Some people seem to be more sensitive to these shifts than others.",
        },
        {
          heading: "Signs of PMDD",
          body: "Mood signs include lasting irritability or anger that affects other people, deep sadness or despair, tension or anxiety, panic attacks, mood swings and crying often. You may lose interest in daily life and relationships, find it hard to focus, feel very tired, sleep badly, feel out of control, or have strong food cravings or binge eating. Physical signs such as bloating, tender breasts, headaches and joint or muscle pain can also happen. Some people have thoughts of suicide. The key feature is timing: symptoms build before a period and fade once it starts.",
        },
        {
          heading: "How it is diagnosed",
          body: "There is no blood test for PMDD. Instead, a doctor will usually ask you to record your symptoms every day for at least 2 cycles. This shows whether they follow the pattern of your cycle. A diagnosis needs 5 or more symptoms, including at least one mood symptom. Recording your mood and symptoms each day in Ciclo, alongside your period dates, gives you a clear record to bring to the appointment.",
        },
        {
          heading: "Treatment and support",
          body: "Several treatments can help. Antidepressants called selective serotonin reuptake inhibitors (SSRIs) are one option. Some people are offered certain contraceptive pills. Over-the-counter painkillers can ease physical symptoms. Stress management, such as relaxation techniques and making time for activities you enjoy, can also help. A doctor may also suggest a talking therapy such as cognitive behavioural therapy (CBT). If first treatments do not help, you can be referred to a specialist.",
        },
        {
          heading: "Getting help and staying safe",
          body: "See a doctor or nurse if premenstrual symptoms affect your work, relationships or daily life. PMDD can bring thoughts of suicide, even if you feel well at other times of the month. If you are thinking about harming yourself, get emergency help or contact a crisis line now. If you feel you might act on these thoughts, call your local emergency number or go to an emergency department. It can also help to tell someone you trust how you are feeling.",
        },
      ],
      notice: "This is general information, not a diagnosis. If you are thinking about harming yourself, get emergency help or contact a crisis line now.",
    },
  },
  {
    slug: "breast-pain",
    category: "symptoms",
    reviewedAt: "2026-10-04",
    sources: [
      { label: "NHS — Breast pain", href: "https://www.nhs.uk/conditions/breast-pain/" },
      { label: "NHS — Symptoms of breast cancer in women", href: "https://www.nhs.uk/conditions/breast-cancer-in-women/symptoms-of-breast-cancer-in-women/" },
      { label: "Office on Women's Health — Premenstrual syndrome (PMS)", href: "https://www.womenshealth.gov/menstrual-cycle/premenstrual-syndrome" },
    ],
    related: ["breast-awareness", "pms"],
    en: {
      title: "Cyclical breast pain",
      summary: "Breast pain that comes and goes with your cycle is common and rarely serious. Here is how it feels, what helps and when to get it checked.",
      sections: [
        {
          heading: "What cyclical breast pain is",
          body: "Sore breasts are very common, and the cause is rarely serious. On its own, it is unlikely to be a sign of cancer. Pain that comes and goes with your periods is called cyclical breast pain, and it is linked to the hormone changes of the cycle. Tender or swollen breasts are one of the most common signs of premenstrual syndrome (PMS). Breasts can also get sore during pregnancy and around menopause, when hormones change too.",
        },
        {
          heading: "How it usually feels",
          body: "Cyclical breast pain usually starts up to 2 weeks before a period. It tends to get worse as the period comes closer, and then goes away when the period ends. It usually feels dull, heavy or aching. It often affects both breasts, and the ache can spread into the armpit.",
        },
        {
          heading: "Other causes of breast pain",
          body: "Not all breast pain is linked to periods. Strains or injuries to the neck, shoulder or back can be felt as pain in the breast. Some medicines, including the contraceptive pill and some antidepressants, can cause breast pain. Mastitis (a painful, swollen breast, sometimes caused by an infection), or a collection of pus called a breast abscess, can also cause pain and needs to be checked by a doctor.",
        },
        {
          heading: "What can help",
          body: "Wear a well-fitted bra during the day and a soft bra at night. Painkillers such as paracetamol or ibuprofen, or a painkilling gel rubbed on the breasts, can ease the ache. There is little evidence that vitamin E tablets or evening primrose oil help. Noting breast pain in Ciclo for a few cycles can show whether it follows your period.",
        },
        {
          heading: "When to see a doctor or nurse",
          body: "See a doctor or nurse if breast pain is not improving or painkillers are not helping. Also see one if breast cancer runs in your family or you could be pregnant. Ask for an urgent appointment if you find a hard lump in your breast or armpit, a breast changes shape, the skin looks dimpled like orange peel, the nipple turns inwards or has a rash, or fluid comes from the nipple. Get medical advice the same day if you have breast pain with a very high temperature, or you feel hot, cold or shivery. Do the same if part of your breast is red, hot or swollen.",
        },
      ],
      notice: "This is general information, not a diagnosis. If you find a lump or notice a change in your breast, see a doctor or nurse.",
    },
  },
  {
    slug: "menstrual-migraine",
    category: "symptoms",
    reviewedAt: "2026-10-04",
    sources: [
      { label: "NHS — Migraine", href: "https://www.nhs.uk/conditions/migraine/" },
      { label: "Office on Women's Health — Migraine", href: "https://www.womenshealth.gov/a-z-topics/migraine" },
      { label: "NHS — Who can take the combined pill", href: "https://www.nhs.uk/contraception/methods-of-contraception/combined-pill/who-can-take-it/" },
    ],
    related: ["pms", "cycle-hormones", "the-pill"],
    en: {
      title: "Headaches and migraine around your period",
      summary: "Falling hormone levels before a period can trigger headaches and migraine. Knowing your pattern helps you plan ahead and get the right treatment.",
      sections: [
        {
          heading: "Why periods can trigger migraine",
          body: "Just before a period starts, levels of the hormones oestrogen and progesterone drop sharply. In some people, this fall can trigger a migraine. Attacks that happen just before or during a period are called menstrual migraines. They are often longer and more severe than attacks at other times. About 3 in 4 people with migraine are women, and more than half of migraines in women happen just before, during or after a period. Hormone shifts later in life matter too. For most women, migraine improves or stops from about the third month of pregnancy, and about two-thirds say it improves after menopause.",
        },
        {
          heading: "What a migraine feels like",
          body: "A migraine is usually a throbbing headache, often on one side of the head, and it can be severe. Many people also feel sick or vomit, and become very sensitive to light and sound. An attack usually lasts between 4 hours and 3 days. Some people first get warning signs called aura, such as zigzag lines or flashing lights, numbness or pins and needles, dizziness or difficulty speaking. Aura should not last longer than 1 hour.",
        },
        {
          heading: "Spotting your pattern",
          body: "Other things can trigger attacks too, including stress, tiredness, skipping meals, too much caffeine, anxiety and low mood. A headache diary helps you and your doctor see whether attacks follow your cycle. Note every day of your period, not just the first day, as well as each headache day. In Ciclo you can log your period days and add a tag or note when you get a headache. Eating well, getting enough sleep and being active, ideally for 30 minutes on most days, can also help.",
        },
        {
          heading: "Treatment that can help",
          body: "During an attack, sleeping or lying down in a dark room can help. Painkillers from a pharmacy are an option, but try not to take them on more than 2 days a week, as taking them more often can cause more headaches. A doctor can prescribe medicines called triptans or gepants for attacks, medicine to stop you feeling sick, or daily medicines to prevent attacks. If you take the pill, a doctor may suggest taking only hormone pills for 3 months in a row, without the usual break, which can improve headaches. If you get migraine with aura, the combined pill may not be safe for you, so tell the doctor or nurse who prescribes your contraception.",
        },
        {
          heading: "When to get help",
          body: "See a doctor or nurse if you have several headaches a month that each last hours or days, or if headaches disrupt your home, work or school life. Get advice soon if a migraine lasts longer than 3 days, aura lasts longer than 1 hour, or you get a migraine while pregnant or soon after giving birth. Get emergency help if a headache comes on suddenly and is extremely painful, or comes with a fit, a very high temperature, or a recent head injury. Also get emergency help if you have trouble speaking or remembering, lose your vision or see double, feel drowsy or confused, or have weakness on one side of your face or body.",
        },
      ],
      notice: "This is general information, not a diagnosis. A sudden, extremely painful headache needs emergency help.",
    },
  },
  {
    slug: "hormonal-acne",
    category: "symptoms",
    reviewedAt: "2026-10-04",
    sources: [
      { label: "NHS — Acne", href: "https://www.nhs.uk/conditions/acne/" },
      { label: "MedlinePlus — Acne", href: "https://medlineplus.gov/acne.html" },
      { label: "NHS — PMS (premenstrual syndrome)", href: "https://www.nhs.uk/conditions/pre-menstrual-syndrome/" },
      { label: "NHS — Isotretinoin: a medicine for severe acne", href: "https://www.nhs.uk/medicines/isotretinoin-capsules/" },
    ],
    related: ["pms", "pcos", "body-image"],
    en: {
      title: "Acne and your cycle",
      summary: "Spots that flare before a period are common and linked to normal hormone changes. Gentle skin care helps, and a doctor can offer more if needed.",
      sections: [
        {
          heading: "Why spots can flare with your cycle",
          body: "Acne happens when hair follicles in the skin get blocked with oil and dead skin cells. Changes in hormone levels can trigger it, which is why acne is common during puberty, around periods, in pregnancy and at menopause. Spotty skin and greasy hair are among the most common signs of premenstrual syndrome (PMS), in the week or two before a period. Acne usually affects the face, chest and back.",
        },
        {
          heading: "Types of spots",
          body: "Acne can range from mild to severe. Blackheads are black or brown spots that are usually flat. Whiteheads are small bumps the same colour as your skin. Papules are raised bumps, and pustules are raised bumps filled with pus. Nodules and cysts are larger lumps under the skin, and they can be deep and painful.",
        },
        {
          heading: "Common myths",
          body: "Acne is not caused by dirty skin, and blackheads are not dirt. There is little evidence that foods such as chocolate or greasy food have much effect on acne for most people. Stress is not a cause of acne, though it may make spots worse. Anyone can get acne, though it is common in teenagers and young adults.",
        },
        {
          heading: "Caring for your skin",
          body: "Wash your skin twice a day with a gentle cleanser, and try not to touch it too much. Do not pick or squeeze spots, as this can cause scars. Choose skincare and make-up labelled non-comedogenic, which are made not to block pores. Creams or gels from a pharmacy containing salicylic acid or benzoyl peroxide can help. Try to avoid too much sun. Noting flare-ups in Ciclo for a few cycles can show whether your spots follow your period.",
        },
        {
          heading: "When to see a doctor or nurse",
          body: "See a doctor or nurse if you have tried treating acne yourself and it is not getting better, if you have lots of spots, or if spots are deep, painful or leaving scars. A doctor can prescribe creams or gels (such as retinoids or antibiotics), antibiotic tablets, the combined pill or, for some people, a stronger medicine taken by mouth called isotretinoin. Isotretinoin can seriously harm an unborn baby, so it must not be taken in pregnancy or when trying to get pregnant. If acne is affecting your mood or confidence, that is a reason to see a doctor in itself. Acne can also be linked to polycystic ovary syndrome (PCOS, now also called PMOS), so tell the doctor about any changes in your periods.",
        },
      ],
      notice: "This is general information, not a diagnosis. If acne is painful, scarring or getting you down, talk to a doctor or nurse.",
    },
  },
  {
    slug: "bloating-digestion",
    category: "symptoms",
    reviewedAt: "2026-10-04",
    sources: [
      { label: "Office on Women's Health — Premenstrual syndrome (PMS)", href: "https://www.womenshealth.gov/menstrual-cycle/premenstrual-syndrome" },
      { label: "Mayo Clinic — Water retention: Relieve this premenstrual symptom", href: "https://www.mayoclinic.org/healthy-lifestyle/womens-health/in-depth/water-retention/art-20044983" },
      { label: "BMC Women's Health — Gastrointestinal symptoms before and during menses in healthy women", href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC3901893/" },
      { label: "NHS — Ovarian cancer: symptoms", href: "https://www.nhs.uk/conditions/ovarian-cancer/symptoms/" },
      { label: "NHS — Bloating", href: "https://www.nhs.uk/conditions/bloating/" },
    ],
    related: ["pms", "gynecologic-cancers", "period-pain"],
    en: {
      title: "Bloating and digestion changes",
      summary: "Many people feel bloated or notice bowel changes before or during a period. This is common, and a few simple steps can help. Here is when to get checked.",
      sections: [
        {
          heading: "Common gut changes around a period",
          body: "Bloating, a gassy feeling, tummy pain, constipation and diarrhoea are all common before or during a period. They are recognised signs of premenstrual syndrome (PMS). In one survey of 156 healthy women, nearly 3 in 4 had at least one gut symptom before or during their period. About 6 in 10 felt bloated before their period, and about 1 in 4 had diarrhoea. The survey relied on people's memory, so the exact figures are uncertain, but these changes are clearly common.",
        },
        {
          heading: "Why it happens",
          body: "Before a period, changing hormone levels are thought to make the body hold on to more water, which can leave you feeling puffy or bloated. What you eat may also play a part, and salty food may make you hold more water. During a period, the womb releases chemicals called prostaglandins that make it squeeze. Prostaglandins can also make the muscles of the bowel squeeze and change how it handles fluid, which may explain looser stools for some people.",
        },
        {
          heading: "What can help",
          body: "Eating less salt may reduce water retention. Cutting down on caffeine, salt and sugar in the 2 weeks before your period may ease many PMS symptoms. Regular aerobic exercise, good sleep and relaxation, such as breathing exercises, yoga or massage, may also help. There is some evidence that magnesium may reduce water retention and that vitamin B6 may ease bloating. Ask a pharmacist before taking supplements, especially if you take other medicines.",
        },
        {
          heading: "Medicines and tracking",
          body: "If bloating is a big problem, a doctor may prescribe water tablets (diuretics), which can reduce bloating for some people. Taking diuretics together with anti-inflammatory painkillers such as ibuprofen can damage the kidneys, so only use them with a doctor's advice. Hormonal contraception may also help the physical symptoms of PMS. Logging digestion and bloating in Ciclo for a few months can show whether changes follow your cycle or come from something else.",
        },
        {
          heading: "When to get checked",
          body: "See a doctor or nurse if you feel bloated or have a swollen tummy regularly, or if bloating comes with blood in your poo or losing weight without trying. Also go if you often feel full quickly, lose your appetite, need to pee more often, or have pain in your tummy or pelvis. These have many causes, but rarely they can be a sign of ovarian cancer. Get help the same day if bloating comes with vomiting, a high temperature, a lump in your tummy, or you cannot pee, poo or pass wind. Get emergency help for sudden, severe pain in your tummy or pelvis, or if you are vomiting blood.",
        },
      ],
      notice: "This is general information, not a diagnosis. If bloating or bowel changes happen often or do not follow your cycle, see a doctor or nurse.",
    },
  },
  {
    slug: "fatigue-sleep",
    category: "symptoms",
    reviewedAt: "2026-10-04",
    sources: [
      { label: "Office on Women's Health — Premenstrual syndrome (PMS)", href: "https://www.womenshealth.gov/menstrual-cycle/premenstrual-syndrome" },
      { label: "NHS — Iron deficiency anaemia", href: "https://www.nhs.uk/conditions/iron-deficiency-anaemia/" },
      { label: "Office on Women's Health — Insomnia", href: "https://www.womenshealth.gov/a-z-topics/insomnia" },
      { label: "CDC — About sleep", href: "https://www.cdc.gov/sleep/about/index.html" },
    ],
    related: ["sleep", "anemia", "heavy-periods"],
    en: {
      title: "Tiredness and sleep across the cycle",
      summary: "Feeling more tired or sleeping badly before a period is common. Here is why it happens, what can help, and when tiredness is worth getting checked.",
      sections: [
        {
          heading: "Why you may feel more tired",
          body: "Tiredness and sleep changes are common signs of premenstrual syndrome (PMS). Some people sleep badly before a period, while others sleep more than usual. Many find it harder to fall asleep and stay asleep in the days before a period. Hormone changes are thought to play a part. These sleep problems usually ease within a few days of bleeding starting.",
        },
        {
          heading: "Sleep and PMDD",
          body: "Sleep problems are also common in premenstrual dysphoric disorder (PMDD), a severe form of PMS. Being unable to sleep (insomnia) is a common symptom of PMDD and can sometimes be severe. Lack of sleep is also linked to low mood and anxiety, and it can make premenstrual moodiness worse.",
        },
        {
          heading: "Heavy periods and low iron",
          body: "Tiredness can also have other causes. Heavy periods are a very common cause of iron deficiency anaemia. This is when a lack of iron means your body cannot make enough healthy red blood cells. Signs include tiredness and lack of energy, shortness of breath, noticeable heartbeats (palpitations), paler skin than usual and headaches. A blood test can check for it. If your levels are low, iron tablets are usually recommended.",
        },
        {
          heading: "Habits that help you sleep",
          body: "Try to go to bed and wake up at the same time every day, and keep your bedroom dark, cool and quiet. A calming bedtime routine, such as reading, music or gentle yoga, can help you wind down. Avoid caffeine, alcohol and nicotine for at least 5 hours before bed, and try to avoid bright screens just before you sleep. Most adults need at least 7 hours of sleep a night.",
        },
        {
          heading: "Staying active and easing symptoms",
          body: "Regular aerobic exercise through the month can ease tiredness, low mood and poor focus linked to PMS. Being active during the day helps sleep, but try not to exercise in the 5 to 6 hours before bed. Some studies suggest calcium may help with PMS tiredness. If cramps keep you awake, painkillers such as ibuprofen or paracetamol may help. Noting tiredness and sleep in Ciclo with a tag or note can show whether they follow your cycle.",
        },
        {
          heading: "When to see a doctor or nurse",
          body: "See a doctor or nurse if tiredness or poor sleep affects your daily life, or if lifestyle changes have not helped. Also get checked if your periods are heavy or you have signs of anaemia, such as breathlessness or palpitations. If you feel faint, or have chest pain or trouble breathing, get emergency help. If low mood, anxiety or anger before your period is severe, ask about PMDD. If you are thinking about harming yourself, get emergency help or contact a crisis line now.",
        },
      ],
      notice: "This is general information, not a diagnosis. If tiredness affects your daily life, talk to a doctor or nurse.",
    },
  },
  {
    slug: "cravings-appetite",
    category: "symptoms",
    reviewedAt: "2026-10-04",
    sources: [
      { label: "Nutrition Reviews — Effect of the menstrual cycle on energy intake: a systematic review and meta-analysis", href: "https://academic.oup.com/nutritionreviews/article/83/3/e866/7713894" },
      { label: "Office on Women's Health — Premenstrual syndrome (PMS)", href: "https://www.womenshealth.gov/menstrual-cycle/premenstrual-syndrome" },
      { label: "Office on Women's Health — Premenstrual dysphoric disorder (PMDD)", href: "https://www.womenshealth.gov/menstrual-cycle/premenstrual-syndrome/premenstrual-dysphoric-disorder-pmdd" },
      { label: "NHS — Iron deficiency anaemia", href: "https://www.nhs.uk/conditions/iron-deficiency-anaemia/" },
      { label: "NHS — PMS (premenstrual syndrome)", href: "https://www.nhs.uk/conditions/pre-menstrual-syndrome/" },
    ],
    related: ["pms", "eating-disorders", "healthy-eating"],
    en: {
      title: "Food cravings and appetite",
      summary: "Feeling hungrier or wanting certain foods before a period is common. Here is what research shows, what is still unclear, and gentle ways to look after yourself.",
      sections: [
        {
          heading: "A common premenstrual change",
          body: "Changes in appetite and food cravings are recognised signs of premenstrual syndrome (PMS). Some people feel hungrier in the week or two before a period, and some want particular foods. Like other PMS symptoms, these changes usually settle within a few days of your period starting. They are a normal part of how the cycle can affect your body.",
        },
        {
          heading: "What research shows",
          body: "One review combined 15 sets of results from 330 women. On average, they ate a little more in the second half of the cycle, after ovulation, than in the first half. But the studies were small, used different ways to work out cycle phases, and their results varied a lot. So it is still unclear how big the change is, and who it affects most.",
        },
        {
          heading: "Why it might happen",
          body: "The reasons are not fully understood. One idea is that the hormone oestrogen may help to dampen appetite, while progesterone, which rises after ovulation, may increase it. These are possible explanations, not proven ones, and are still being studied. Because the evidence is limited, be wary of strong claims, special diets or eating plans built around cycle phases.",
        },
        {
          heading: "Gentle ways to handle it",
          body: "You do not need to fight your appetite or ban foods you enjoy. Some people feel steadier eating smaller meals more often, for example every 2 to 3 hours. Regular exercise and enough sleep can help with tiredness and low mood, which are also common before a period. Some studies suggest calcium may help with cravings. Ask a pharmacist before taking a supplement, especially if you take other medicines. Logging symptoms in Ciclo can show whether changes in appetite follow your cycle, so they feel less surprising.",
        },
        {
          heading: "When to talk to someone",
          body: "Talk to a doctor or nurse if changes in eating come with severe low mood, anxiety or anger before your period. This can be a sign of premenstrual dysphoric disorder (PMDD), which can include binge eating. Also get checked if you want to eat things that are not food, such as ice or paper, as this can be a sign of low iron. If you feel your eating is out of control, or you are worried about food, weight or your body, ask for help. If you are thinking about harming yourself, get emergency help or contact a crisis line now.",
        },
      ],
      notice: "This is general information, not a diagnosis. If you are worried about your eating, talk to a doctor or nurse.",
    },
  },
  {
    slug: "common-symptoms",
    category: "symptoms",
    reviewedAt: "2026-08-18",
    sources: [
      { label: "NHS — Period problems", href: "https://www.nhs.uk/conditions/periods/period-problems/" },
    ],
    es: {
      title: "Síntomas habituales",
      summary: "Cólicos, fatiga, cambios de ánimo o hinchazón son frecuentes. Registrarlos ayuda a ver patrones; no sustituye una consulta clínica.",
      sections: [
        {
          heading: "Qué puedes registrar en Ciclo",
          body: "Cólicos, dolor de cabeza, libido alta, sexo, hinchazón, pechos sensibles, fatiga, cambios de ánimo y antojos. Son etiquetas para tu diario, no un diagnóstico.",
        },
        {
          heading: "Patrones, no causas",
          body: "Ver que un síntoma se repite en varios ciclos puede ayudarte a prepararte. Una correlación en tu diario no demuestra por qué ocurre ni qué tratamiento necesitas.",
        },
        {
          heading: "Cuándo pedir ayuda",
          body: "Dolor que no cede, sangrado muy abundante, ausencia de periodos o síntomas que te impiden trabajar o dormir merecen valoración profesional.",
        },
      ],
      notice: "Ciclo no diagnostica endometriosis, SOP ni ninguna otra condición.",
    },
    en: {
      title: "Common symptoms",
      summary: "Cramps, fatigue, mood shifts, and bloating are common. Logging them helps you see patterns; it does not replace clinical care.",
      sections: [
        {
          heading: "What you can log in Ciclo",
          body: "Cramps, headache, high libido, sex, bloating, tender breasts, fatigue, mood swings, and cravings. These are diary labels, not a diagnosis.",
        },
        {
          heading: "Patterns, not causes",
          body: "Seeing a symptom repeat across cycles can help you prepare. A correlation in your diary does not prove why it happens or which treatment you need.",
        },
        {
          heading: "When to seek care",
          body: "Pain that does not ease, very heavy bleeding, missing periods, or symptoms that stop you working or sleeping deserve clinical assessment.",
        },
      ],
      notice: "Ciclo does not diagnose endometriosis, PCOS, or any other condition.",
    },
  },
];
