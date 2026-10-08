// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

import type { LearnArticle } from "@/lib/learn/articles";

export const PERIODS_ARTICLES: LearnArticle[] = [
  {
    slug: "period-basics",
    category: "periods",
    reviewedAt: "2026-10-04",
    sources: [
      { label: "NHS — Periods", href: "https://www.nhs.uk/conditions/periods/" },
      { label: "Office on Women's Health — Your menstrual cycle", href: "https://www.womenshealth.gov/menstrual-cycle/your-menstrual-cycle" },
      { label: "Office on Women's Health — Period problems", href: "https://www.womenshealth.gov/menstrual-cycle/period-problems" },
      { label: "NHS — Vaginal bleeding between periods or after sex", href: "https://www.nhs.uk/symptoms/vaginal-bleeding-between-periods-or-after-sex/" },
      { label: "NHS — Heavy periods", href: "https://www.nhs.uk/conditions/heavy-periods/" },
    ],
    related: ["period-blood", "period-products", "normal-cycle-length"],
    en: {
      title: "Periods: what to expect",
      summary: "A period is when your body sheds the lining of the womb. Here is how long periods usually last, how much blood is typical and how periods change through life.",
      sections: [
        {
          heading: "What a period is",
          body: "Each month, the lining of your womb (uterus) builds up. During a period, your body sheds this lining. The lining comes away as blood and tissue. It passes through the cervix (the neck of the womb) and leaves your body through the vagina. This bleeding is your period. The first day of bleeding is also the first day of a new menstrual cycle.",
        },
        {
          heading: "How long it lasts and how often",
          body: "A period usually lasts about 5 days, but anything from 2 to 7 days is common. Your cycle is the time from the first day of one period to the start of the next. Many people have a period about every 28 days, but it is common to have them more or less often than this. Most adult cycles last somewhere between about 21 and 38 days. A cycle can also be a bit shorter or longer from one month to the next.",
        },
        {
          heading: "How much blood is normal",
          body: "Most people lose about 20 to 90 ml of blood in a whole period, which is roughly 1 to 5 tablespoons. On average, it is about 2 to 3 tablespoons. Some people bleed more than this. The amount usually changes over the days of a period, and it can differ from month to month. Blood is usually red when the flow is heaviest. On lighter days it may look pink or brown.",
        },
        {
          heading: "How periods change through life",
          body: "On average, a first period comes at about age 12, but starting any time from 8 to 15 is within the usual range. For a few years after the first period, cycles are often irregular, and cycles longer than 38 days are common. Periods also tend to be heavier in the teenage years. In your 20s and 30s, cycles are usually more regular. In your 40s, as your body moves towards menopause, cycles may become irregular. Periods can stop for a month or a few months and then start again. Menopause usually happens between the mid-40s and mid-50s.",
        },
        {
          heading: "When to talk to a doctor or nurse",
          body: "Logging your periods in Ciclo can help you notice changes. Talk to a doctor or nurse if your cycles are often shorter than 24 days or longer than 38 days. Also talk to them if you have had no period for 3 months and are not pregnant or breastfeeding. Get checked too if a first period comes before age 8, has not come by 15, or has not come within 3 years of breast growth. If pain or bleeding stops you going to school or work, or doing things you usually do, get help, because it can be treated. Bleeding between periods, after sex or after menopause should always be checked by a doctor or nurse.",
        },
        {
          heading: "When to get urgent help",
          body: "Also see a doctor or nurse if you need to change a pad or tampon every 1 to 2 hours, or if your period lasts more than 7 days. Call your local emergency number or go to an emergency department if you are bleeding heavily and you faint or feel about to faint, or you have chest pain or trouble breathing. If heavy bleeding makes you feel dizzy, light-headed or weak, contact a doctor or nurse the same day. Get emergency help for sudden, severe pain in your tummy.",
        },
      ],
      notice: "This is general information, not a diagnosis. If your periods change or worry you, talk to a doctor or nurse.",
    },
  },
  {
    slug: "period-products",
    category: "periods",
    reviewedAt: "2026-10-04",
    sources: [
      { label: "NHS inform — Choosing period products", href: "https://www.nhsinform.scot/healthy-living/womens-health/girls-and-young-women-puberty-to-around-25/periods-and-menstrual-health/choosing-period-products/" },
      { label: "Office on Women's Health — Your menstrual cycle", href: "https://www.womenshealth.gov/menstrual-cycle/your-menstrual-cycle" },
      { label: "New Jersey Department of Health — Menstrual discs", href: "https://www.nj.gov/health/womenshealth/reproductive-health/periods-menstruation/period-products/menstrual-discs.shtml" },
      { label: "FDA — The facts on tampons and tampon safety", href: "https://www.fda.gov/consumers/consumer-updates/facts-tampons-and-tampon-safety" },
      { label: "Planned Parenthood — How to use menstrual hygiene products", href: "https://www.plannedparenthood.org/learn/health-and-wellness/menstruation/how-to-use-menstrual-hygiene-products" },
    ],
    related: ["toxic-shock-syndrome", "heavy-periods", "period-basics"],
    en: {
      title: "Pads, tampons, cups and period underwear",
      summary: "There is no single best period product. Here is how pads, tampons, cups, discs and period underwear work, how to choose, and how to use them safely.",
      sections: [
        {
          heading: "Pads and period underwear",
          body: "Pads sit inside your underwear and soak up blood, held in place by a sticky strip. They come in different sizes and absorbencies, including overnight pads, so you can match them to your flow. Change a pad every few hours. Disposable pads go in the bin, not down the toilet. Reusable cloth pads can be washed and used again. Period underwear has absorbent layers built in. You will need several pairs and a way to wash them. One pair may last up to about a day on light days, but on heavy days you may need to change every 4 to 6 hours. Check the maker's advice.",
        },
        {
          heading: "Tampons",
          body: "Tampons are worn inside the vagina. They soak up blood there, so it does not reach your underwear. Each pack shows how absorbent the tampons are, so you can match them to your flow. Use the lowest absorbency that works for you, and only use tampons while you are bleeding. Change a tampon every 4 to 8 hours, and never leave one in for more than 8 hours. You can wear one overnight if you will sleep for 8 hours or less. Change it as soon as you get up.",
        },
        {
          heading: "Menstrual cups and discs",
          body: "A menstrual cup is a small, flexible cup, usually made of medical-grade silicone. It sits inside the vagina and holds blood until you empty it, rather than soaking it up. A menstrual disc is a wider, shallower shape. It sits high in the vagina, near the cervix (the neck of the womb), tucked behind the pubic bone. You take out a cup or disc, empty it, rinse it and put it back. Most cups and discs can be worn for up to about 12 hours, but empty them sooner if they are full, which can happen on heavy days. Always follow the instructions for your product. Some discs are disposable.",
        },
        {
          heading: "How to choose",
          body: "The best product is the one that suits your body, your flow and your day. Flow usually changes during a period, so some people use different products on different days, such as a tampon or cup on heavy days and a pad on light days. Think about comfort, whether you can wash reusable products, and how you will throw away disposable ones. It is fine to try a few options before you find what works for you.",
        },
        {
          heading: "Using products safely",
          body: "Wash your hands before you put in or take out a tampon, cup or disc. Anything worn inside the vagina carries a small risk of toxic shock syndrome (TSS), a rare but serious illness, so never leave it in longer than the instructions say. If you suddenly get a high fever, vomiting or a rash, or feel dizzy or faint, while using a tampon, cup or disc, take it out and get medical help straight away. If you feel very unwell or confused, or have trouble breathing, call your local emergency number. If you notice an unpleasant discharge and think you may have forgotten a tampon, see a doctor or nurse as soon as you can.",
        },
      ],
      notice: "This is general information. Always follow the instructions that come with your product, and talk to a doctor or nurse if something feels wrong.",
    },
  },
  {
    slug: "toxic-shock-syndrome",
    category: "periods",
    reviewedAt: "2026-10-04",
    sources: [
      { label: "NHS — Toxic shock syndrome", href: "https://www.nhs.uk/conditions/toxic-shock-syndrome/" },
      { label: "Office on Women's Health — Your menstrual cycle", href: "https://www.womenshealth.gov/menstrual-cycle/your-menstrual-cycle" },
      { label: "FDA — The facts on tampons and tampon safety", href: "https://www.fda.gov/consumers/consumer-updates/facts-tampons-and-tampon-safety" },
    ],
    related: ["period-products", "period-basics"],
    en: {
      title: "Toxic shock syndrome",
      summary: "Toxic shock syndrome (TSS) is rare but can be life-threatening. Know the warning signs, what to do straight away, and how to lower your risk with tampons and cups.",
      sections: [
        {
          heading: "What TSS is",
          body: "Toxic shock syndrome (TSS) is a rare but life-threatening illness. It is caused by poisons (toxins) made by certain bacteria. Many people know it from its link with tampons. It can also happen with menstrual cups, discs, a contraceptive cap or diaphragm, after giving birth, or from an infected cut, burn or boil. It can affect anyone, including children and people who do not have periods. Cases linked to tampons have become much less common over the years.",
        },
        {
          heading: "Signs to watch for",
          body: "Symptoms can start suddenly and may feel like flu. They include a high temperature or feeling hot, cold and shivery, muscle aches, vomiting and diarrhoea. Other signs are severe pain in your arms, legs or all over your body, bright red palms, soles, tongue or whites of the eyes, and swollen or peeling skin. You may get a rash that looks like sunburn or feels like sandpaper. You may feel dizzy, confused or faint, especially when you stand up. Take these signs seriously if you have a tampon, cup or disc in, or have recently used one.",
        },
        {
          heading: "What to do straight away",
          body: "If you have any of these signs while using a tampon, cup or disc, or soon after using one, take it out if it is still in. Then get medical help straight away, the same day. Do not wait to see if it gets better. If you cannot get help quickly, call your local emergency number.",
        },
        {
          heading: "When to call an emergency number",
          body: "Call your local emergency number or go to an emergency department now if someone is confused, has slurred speech or is not making sense. Do the same if they are breathless or breathing very fast, or faint. Blue, grey, pale or blotchy skin, lips or tongue, a rash that does not fade when you press a clear glass on it, or large areas of peeling skin also need emergency help. TSS can get worse quickly, so do not wait.",
        },
        {
          heading: "How TSS is treated",
          body: "TSS needs urgent treatment in hospital. Treatment can include antibiotics, fluids through a drip, medicine to support blood pressure, and oxygen. Some people need an operation to clean out an infected cut or wound. Because TSS can become life-threatening, it is always better to get checked quickly, even if it turns out to be something minor.",
        },
        {
          heading: "How to lower your risk",
          body: "Wash your hands before you put in or take out a tampon, cup or disc, and follow the product instructions. Use the lowest absorbency tampon that handles your flow. Change it every 4 to 8 hours and never wear one for more than 8 hours. Only use tampons when you are bleeding. Do not leave a cup, disc or other device in for longer than the instructions say. Keep cuts and burns clean. TSS is more likely if you have had it before, so ask a doctor whether these products are safe for you.",
        },
      ],
      notice: "This is general information. If you feel very unwell while using a tampon, cup or disc, take it out and get emergency help.",
    },
  },
  {
    slug: "heavy-periods",
    category: "periods",
    reviewedAt: "2026-10-04",
    sources: [
      { label: "NHS — Heavy periods", href: "https://www.nhs.uk/conditions/heavy-periods/" },
      { label: "CDC — About heavy menstrual bleeding", href: "https://www.cdc.gov/female-blood-disorders/about/heavy-menstrual-bleeding.html" },
      { label: "Office on Women's Health — Period problems", href: "https://www.womenshealth.gov/menstrual-cycle/period-problems" },
      { label: "NHS — Vaginal bleeding between periods or after sex", href: "https://www.nhs.uk/symptoms/vaginal-bleeding-between-periods-or-after-sex/" },
    ],
    related: ["anemia", "bleeding-disorders", "fibroids"],
    en: {
      title: "Heavy periods",
      summary: "Heavy periods are common and can be treated. Learn the signs that bleeding is heavy, what can cause it, and the help a doctor or nurse can offer.",
      sections: [
        {
          heading: "Signs your period is heavy",
          body: "Most people lose about 20 to 90 ml of blood in a period, roughly 1 to 5 tablespoons, but some people naturally bleed more. Your period may be heavy if you need to change a pad or tampon every 1 to 2 hours, or empty a cup more often than the instructions say. Other signs are using two products at once, such as a pad and a tampon, or bleeding for more than 7 days. Passing clots larger than about 2.5 cm (the size of a large coin) is another sign. So is blood leaking onto your clothes or bedding.",
        },
        {
          heading: "How it can affect you",
          body: "Heavy bleeding is one of the period problems that doctors hear about most often. It can make you avoid exercise or other activities, or take time off work or school. Losing a lot of blood every month can also lead to anaemia. This can leave you feeling tired, weak, low in energy or short of breath. If heavy periods are getting in the way of your life, that alone is a good reason to get help.",
        },
        {
          heading: "Possible causes",
          body: "Often no clear cause is found, and heavy periods can be normal for some people. Known causes include fibroids, endometriosis, adenomyosis, pelvic inflammatory disease and polycystic ovary syndrome (PCOS, now also called PMOS). Bleeding disorders such as von Willebrand disease can cause heavy periods. So can some medicines, including some blood thinners (anticoagulants) and chemotherapy. Rarely, heavy periods can be a sign of womb cancer.",
        },
        {
          heading: "Treatments that can help",
          body: "Treatment depends on the cause and what suits you. Options include a hormonal IUD (coil), also called an intrauterine system, and the combined contraceptive pill. Medicines without hormones can also help, such as tranexamic acid, or anti-inflammatory painkillers such as naproxen or mefenamic acid. If these do not help, a specialist may suggest a procedure to remove the womb lining (endometrial ablation), removing fibroids, or removing the womb (hysterectomy).",
        },
        {
          heading: "When to see a doctor or nurse",
          body: "See a doctor or nurse if heavy periods are affecting your daily life, if you have had heavy periods for some time, or if you often feel tired or short of breath. Also see them if you have severe pain during your periods, bleeding between periods or after sex, or pain when you pee, poo or have sex. Contact a doctor or nurse the same day if you soak through one or more pads or tampons every hour for several hours in a row. Logging how heavy each day is in Ciclo can help you show a doctor what is happening.",
        },
        {
          heading: "When to get urgent help",
          body: "Call your local emergency number or go to an emergency department if you are bleeding heavily and you faint or feel about to faint, or you have chest pain or trouble breathing. If heavy bleeding makes you feel dizzy, light-headed or weak, contact a doctor or nurse the same day. If you might be pregnant, even without a positive test, contact a doctor or nurse the same day if you have pain low down on one side of your tummy or any bleeding. Get emergency help for sudden, severe tummy pain, pain in the tip of your shoulder, heavy bleeding, or feeling very dizzy or faint. These can be signs of a pregnancy growing outside the womb (ectopic pregnancy).",
        },
      ],
      notice: "This is general information, not a diagnosis. If your bleeding is very heavy or you feel faint, get medical help.",
    },
  },
  {
    slug: "period-pain",
    category: "periods",
    reviewedAt: "2026-10-04",
    sources: [
      { label: "NHS — Period pain", href: "https://www.nhs.uk/conditions/period-pain/" },
      { label: "MedlinePlus — Period pain", href: "https://medlineplus.gov/periodpain.html" },
      { label: "Office on Women's Health — Period problems", href: "https://www.womenshealth.gov/menstrual-cycle/period-problems" },
    ],
    related: ["heavy-periods", "endometriosis", "adenomyosis"],
    en: {
      title: "Period pain and cramps",
      summary: "Cramps are very common, especially in the first days of a period. Here is why they happen, what helps, and when pain is a reason to get checked.",
      sections: [
        {
          heading: "Why periods can hurt",
          body: "During a period, the womb (uterus) squeezes to help push out its lining. Chemicals called prostaglandins, made by the womb, make its muscle tighten and relax, and this is what you feel as cramps. Some people make more prostaglandins than others, which is one reason pain varies so much. More than half of people who have periods get some pain. When there is no other health problem behind it, period pain often starts in the first years after periods begin and tends to ease with age.",
        },
        {
          heading: "What it usually feels like",
          body: "Period pain is usually felt as cramps in the lower tummy that can spread to the lower back and thighs. Some people feel a dull, constant ache; others get sharp waves of pain. It often starts just before or at the start of a period and usually lasts up to 3 days. Having periods that are longer or heavier, starting periods before age 11, smoking and high stress are all linked to more pain.",
        },
        {
          heading: "What helps at home",
          body: "Heat is one of the simplest things to try: a heat pad or hot water bottle on your tummy, or a warm bath or shower. Gentle movement such as walking, swimming, cycling or yoga can ease cramps for some people, even if it is the last thing you feel like doing. A gentle massage of the tummy and lower back, relaxation techniques such as meditation, and cutting down on alcohol and smoking may also help.",
        },
        {
          heading: "Medicines that can help",
          body: "Anti-inflammatory painkillers (NSAIDs) such as ibuprofen or naproxen relieve most period pain. Taking them as soon as your period starts may control pain better than waiting until it is bad. Paracetamol is another option. Read the leaflet and ask a pharmacist if you are not sure a medicine is right for you. If pain is still strong, a doctor can prescribe other anti-inflammatory medicines, or hormonal contraception such as the pill, implant, injection or a hormonal IUD (coil), which thins the womb lining and often makes periods lighter and less painful.",
        },
        {
          heading: "When pain has another cause",
          body: "Sometimes period pain comes from a health condition, such as endometriosis, adenomyosis, fibroids or pelvic inflammatory disease. An IUD (coil) can also make periods more painful for some people. Pain from these causes often gets worse over time instead of better, may start later in life, and can come with other symptoms such as heavy or irregular bleeding or pain during sex. Logging your cramps and bleeding in Ciclo for a few cycles can help you show a doctor when the pain comes and how long it lasts.",
        },
        {
          heading: "When to see a doctor or nurse",
          body: "Book an appointment if painkillers and self-care do not help, if pain stops you working, studying or sleeping, or if your periods become more painful, heavier or irregular. Also get checked if you are over 25 and get severe cramps for the first time, if you have pain when you are not on your period, pain during sex or when you pee, or a fever with period pain. Get urgent medical help the same day if your pain is severe or much worse than usual and painkillers have not helped.",
        },
      ],
      notice: "This is general information, not a diagnosis. If your period pain is severe or changes, talk to a doctor or nurse.",
    },
  },
  {
    slug: "irregular-periods",
    category: "periods",
    reviewedAt: "2026-10-04",
    sources: [
      { label: "NHS — Irregular periods", href: "https://www.nhs.uk/conditions/irregular-periods/" },
      { label: "Office on Women's Health — Period problems", href: "https://www.womenshealth.gov/menstrual-cycle/period-problems" },
      { label: "Office on Women's Health — Your menstrual cycle", href: "https://www.womenshealth.gov/menstrual-cycle/your-menstrual-cycle" },
    ],
    related: ["normal-cycle-length", "pcos", "missed-periods"],
    en: {
      title: "Irregular periods",
      summary: "It is normal for your cycle to vary a little. Learn what can make periods irregular, when it is expected, and when it is worth talking to a doctor or nurse.",
      sections: [
        {
          heading: "What irregular means",
          body: "Your cycle is the time from the first day of one period to the first day of the next. Most adult cycles last somewhere between about 21 and 38 days, and a cycle can be a bit shorter or longer from one month to the next. Periods are called irregular when the gap between them keeps changing, or is often shorter than 24 days or longer than 38 days. Sometimes a period is missed altogether.",
        },
        {
          heading: "Times when it is expected",
          body: "Irregular periods are normal for the first few years after periods start. During this time, cycles longer than 38 days are common. They are also normal in the years leading up to menopause. Menopause usually happens between the mid-40s and mid-50s. Pregnancy stops periods, so a missed period is often an early sign of pregnancy. Some hormonal contraception, such as the progestogen-only pill, the contraceptive injection and the hormonal IUD (coil), can also make bleeding irregular.",
        },
        {
          heading: "Other common causes",
          body: "Stress and anxiety, losing or gaining a lot of weight, and exercising very hard can all affect your cycle. Eating disorders can also disrupt periods. Health conditions that can cause irregular periods include polycystic ovary syndrome (PCOS, now also called PMOS), thyroid problems, high levels of the hormone prolactin, diabetes that is not well controlled, and pelvic inflammatory disease. Another cause is premature ovarian insufficiency (POI), when the ovaries stop working normally before age 40. Some medicines can also play a part.",
        },
        {
          heading: "Finding the cause",
          body: "Irregular periods do not always need treatment. A doctor or nurse will ask about your periods and any other symptoms. They may arrange tests or refer you to a specialist to find the cause. Treatment depends on what is behind it. It might mean treating a condition such as a thyroid problem, or using hormonal contraception. Logging your period dates in Ciclo makes the pattern easier to show, though its predictions are less certain when your cycles vary.",
        },
        {
          heading: "When to see a doctor or nurse",
          body: "Talk to a doctor or nurse if your cycles are often shorter than 24 days or longer than 38 days, if your periods were regular and have become irregular, or if a period lasts more than 7 days. Also get checked if you have had no period for 3 months and are not pregnant or breastfeeding. The same applies if you bleed between periods, or if you are trying to get pregnant and it is not happening. Irregular periods together with weight gain, tiredness, extra hair on your face, or dry or oily skin are also worth checking. If you might be pregnant and have pain low down on one side of your tummy, get medical help the same day.",
        },
      ],
      notice: "This is general information, not a diagnosis. If your cycle changes or worries you, talk to a doctor or nurse.",
    },
  },
  {
    slug: "missed-periods",
    category: "periods",
    reviewedAt: "2026-10-04",
    sources: [
      { label: "NHS — Missed or late periods", href: "https://www.nhs.uk/symptoms/missed-or-late-periods/" },
      { label: "Office on Women's Health — Period problems", href: "https://www.womenshealth.gov/menstrual-cycle/period-problems" },
      { label: "NHS — Irregular periods", href: "https://www.nhs.uk/conditions/irregular-periods/" },
      { label: "NHS — Vaginal bleeding between periods or after sex", href: "https://www.nhs.uk/symptoms/vaginal-bleeding-between-periods-or-after-sex/" },
      { label: "NHS — Ectopic pregnancy", href: "https://www.nhs.uk/conditions/ectopic-pregnancy/" },
    ],
    related: ["pregnancy-tests", "irregular-periods", "stress-and-cycle"],
    en: {
      title: "Missed or late periods",
      summary: "A late or missed period is common and often not serious. Pregnancy is one reason, but stress, weight changes, exercise, contraception and some health conditions can also play a part.",
      sections: [
        {
          heading: "Pregnancy is one possible reason",
          body: "If you have had sex, pregnancy is the first thing to think about, because a missed period is often an early sign of pregnancy. Periods stop during pregnancy. If there is any chance you could be pregnant, take a pregnancy test. Breastfeeding can also keep periods away. For some people they do not return until breastfeeding ends.",
        },
        {
          heading: "Other common reasons",
          body: "Late or missed periods have many causes, and most of the time it is nothing to worry about. Stress is one of them. Severe stress that lasts a long time can upset the signals from your brain that control your cycle. Sudden weight loss, large changes in weight and doing a lot of exercise can also delay or stop periods. Some hormonal contraception, such as the pill, the contraceptive injection and the hormonal IUD (coil), can mean you miss periods.",
        },
        {
          heading: "Health conditions to know about",
          body: "Sometimes missed periods point to a health condition. These include polycystic ovary syndrome (PCOS, now also called PMOS), an overactive or underactive thyroid, diabetes and heart disease. Other hormone problems can also stop periods. Eating disorders, especially anorexia, can stop periods too. Periods can also become less regular and skip months in the years before menopause. Menopause usually happens between the mid-40s and mid-50s.",
        },
        {
          heading: "When to see a doctor or nurse",
          body: "Even when it is nothing serious, it is worth getting checked. See a doctor or nurse if you have missed 3 periods in a row, or have had no period for 3 months, and you are not pregnant or breastfeeding. Also go if your periods have not started by age 15, or if they have become irregular. The same applies if a missed period comes with weight gain or loss, tiredness, extra hair on your face, or dry or oily skin. Logging your periods in Ciclo can help you see exactly how long it has been.",
        },
        {
          heading: "When to get urgent help",
          body: "If you might be pregnant, even without a positive test, contact a doctor or nurse the same day if you have pain low down on one side of your tummy or any bleeding. Get emergency help for sudden, severe tummy pain, pain in the tip of your shoulder, heavy bleeding, or feeling very dizzy or faint. These can be signs of a pregnancy growing outside the womb (ectopic pregnancy).",
        },
      ],
      notice: "This is general information, not a diagnosis. If you have missed periods or could be pregnant, talk to a doctor or nurse.",
    },
  },
  {
    slug: "spotting",
    category: "periods",
    reviewedAt: "2026-10-04",
    sources: [
      { label: "NHS — Vaginal bleeding between periods or after sex", href: "https://www.nhs.uk/symptoms/vaginal-bleeding-between-periods-or-after-sex/" },
      { label: "MedlinePlus Medical Encyclopedia — Vaginal bleeding between periods", href: "https://medlineplus.gov/ency/article/003156.htm" },
      { label: "KidsHealth — Could I get pregnant if I have sex during my period?", href: "https://kidshealth.org/en/teens/sex-during-period.html" },
      { label: "NHS — Ectopic pregnancy", href: "https://www.nhs.uk/conditions/ectopic-pregnancy/" },
    ],
    related: ["periods-on-birth-control", "cervical-screening", "postmenopausal-bleeding"],
    en: {
      title: "Bleeding or spotting between periods",
      summary: "Light bleeding between periods or after sex has many causes and is often not serious, but it should always be checked. Here are the usual causes and the signs that need urgent care.",
      sections: [
        {
          heading: "What spotting is",
          body: "Spotting is light bleeding outside your normal period. You might notice a little blood on your underwear or when you wipe. Doctors may call bleeding between periods intermenstrual bleeding. Bleeding after sex is related and shares some of the same causes. Most of the time the cause is not serious. Even so, bleeding between periods or after sex should always be checked by a doctor or nurse.",
        },
        {
          heading: "Hormones and contraception",
          body: "Changes in hormone levels can cause spotting. Hormonal contraception can cause spotting too, especially if you skip pills, or stop and start the pill, patch or ring. An IUD (coil) can cause occasional spotting. Some people have light bleeding around ovulation, which often happens about 2 weeks before a period. This can be mistaken for a period. Stress and an underactive thyroid can also cause bleeding between periods.",
        },
        {
          heading: "Other possible causes",
          body: "Small growths called polyps, and fibroids, can cause bleeding between periods. Infections, including sexually transmitted infections (STIs) such as chlamydia, can inflame the cervix (the neck of the womb) or the womb and cause bleeding. Bleeding after sex can also come from vaginal dryness or from changes to the surface of the cervix (cervical ectropion). Blood-thinning medicines, a recent pelvic examination or procedure, and pregnancy problems such as miscarriage can also cause bleeding. Sometimes it is a sign of cancer or pre-cancer of the cervix or womb.",
        },
        {
          heading: "What happens at an appointment",
          body: "You can see a doctor or nurse, or go to a sexual health clinic. They will ask about your symptoms and health history, and may examine you. Depending on what they find, they may offer a pregnancy test, STI tests or blood tests. Some people need an ultrasound scan, or a closer look at the cervix (colposcopy) or inside the womb (hysteroscopy). Logging spotting days in Ciclo can help you describe when the bleeding happens.",
        },
        {
          heading: "When to get help",
          body: "Get checked for any bleeding between periods or after sex. Also contact a doctor or nurse if you have any bleeding after menopause, or if bleeding comes with pelvic pain, tiredness or dizziness. If you might be pregnant, even without a positive test, contact a doctor or nurse the same day if you have pain low down on one side of your tummy or any bleeding. Get emergency help for sudden, severe tummy pain, pain in the tip of your shoulder, heavy bleeding, or feeling very dizzy or faint. These can be signs of a pregnancy growing outside the womb (ectopic pregnancy). If bleeding is very heavy and you faint or feel about to faint, call your local emergency number.",
        },
      ],
      notice: "This is general information, not a diagnosis. Bleeding between periods, after sex or after menopause should always be checked by a doctor or nurse.",
    },
  },
  {
    slug: "period-blood",
    category: "periods",
    reviewedAt: "2026-10-04",
    sources: [
      { label: "NHS — Periods", href: "https://www.nhs.uk/conditions/periods/" },
      { label: "KidsHealth — Is period blood always red?", href: "https://kidshealth.org/en/teens/blood-color.html" },
      { label: "NHS — Heavy periods", href: "https://www.nhs.uk/conditions/heavy-periods/" },
      { label: "Mayo Clinic — Vaginal odor: causes", href: "https://www.mayoclinic.org/symptoms/vaginal-odor/basics/causes/sym-20050664" },
    ],
    related: ["heavy-periods", "bacterial-vaginosis", "toxic-shock-syndrome"],
    en: {
      title: "Period blood: colour, clots and smell",
      summary: "Period blood can change colour, contain small clots and have a mild smell, and this is usually normal. Here is what to expect and which changes are worth checking.",
      sections: [
        {
          heading: "How the colour can change",
          body: "Period blood is not always bright red. When your flow is heaviest, it is usually red. On lighter days it may look pink, dark red or brown. Darker red or brown blood is common at the start or end of a period, when the flow is lighter. Bright red is more common on the heaviest days. The colour can change within the same period, and this is normal.",
        },
        {
          heading: "Clots and bits of tissue",
          body: "Period blood is not only blood. It also carries tissue from the womb lining as your body sheds it. So its texture can vary, and it may contain small clots or bits of tissue. Small clots can be part of a normal period. Clots larger than about 2.5 cm, the size of a large coin, can be a sign of heavy periods. So can needing to change a pad or tampon every 1 to 2 hours, or bleeding for more than 7 days.",
        },
        {
          heading: "What a normal smell is",
          body: "It is normal for the vagina to have a light smell. Some people notice almost none. The smell can change a little through your cycle and may be stronger after sweating or sex. A strong, fishy or unpleasant smell is different and may point to a problem. Possible causes include an infection such as bacterial vaginosis or trichomoniasis, or a tampon that has been forgotten. You do not need to wash inside your vagina (douching). It can upset the natural balance of bacteria there.",
        },
        {
          heading: "Changes worth checking",
          body: "See a doctor or nurse if you often pass clots larger than about 2.5 cm, or if your periods are very heavy or last more than 7 days. Also get checked if you notice a strong or unusual smell that does not go away. Itching, burning, soreness or an unusual discharge are also worth checking. If you think a tampon may have been left inside, get checked soon. Adding a note or a custom tag in Ciclo about colour, clots or smell can help you describe what has changed.",
        },
        {
          heading: "When to get urgent help",
          body: "If you suddenly get a high fever, vomiting or a rash, or feel dizzy or faint, while using a tampon, cup or disc, take it out and get medical help straight away. If you feel very unwell or confused, or have trouble breathing, call your local emergency number. These can be signs of toxic shock syndrome, a rare but serious illness. Call your local emergency number or go to an emergency department if you are bleeding heavily and you faint or feel about to faint, or you have chest pain or trouble breathing. If heavy bleeding makes you feel dizzy, light-headed or weak, contact a doctor or nurse the same day.",
        },
      ],
      notice: "This is general information, not a diagnosis. If you notice a change in your period that worries you, talk to a doctor or nurse.",
    },
  },
  {
    slug: "delaying-a-period",
    category: "periods",
    reviewedAt: "2026-10-04",
    sources: [
      { label: "NHS — How can I delay my period?", href: "https://www.nhs.uk/common-health-questions/travel-health/how-can-i-delay-my-period/" },
      { label: "NHS Specialist Pharmacy Service — Choosing a medicine to delay periods", href: "https://sps.nhs.uk/articles/choosing-a-medicine-to-delay-periods/" },
    ],
    related: ["the-pill", "patch-ring-injection", "periods-on-birth-control"],
    en: {
      title: "Delaying or skipping a period",
      summary: "You can delay a period for a holiday or event with hormone tablets or by changing how you take some contraception. A doctor, nurse or pharmacist can help, but you need to plan ahead.",
      sections: [
        {
          heading: "Your options",
          body: "It is possible to delay a period, for example for a holiday or a big event. There are two main ways. If you use the combined pill, the contraceptive patch or the vaginal ring, you may be able to skip the usual break. If you do not use one of these, a doctor can prescribe a tablet that contains a progestogen hormone, such as norethisterone. Talk to a doctor, nurse or pharmacist first, because the right choice depends on your health and the method you use.",
        },
        {
          heading: "With the pill, patch or ring",
          body: "If you take the combined pill, you can usually delay bleeding by starting your next pack straight away instead of having a break. How you do this depends on the type of pill, so check with a pharmacist, doctor or nurse. The bleed you get on the pill is a withdrawal bleed, not a true period. It usually starts about 3 days after you stop. The patch and the ring can also be used without a break. If you do not already take the pill, you would need to start it a few weeks ahead.",
        },
        {
          heading: "Progestogen tablets",
          body: "If you do not want to use the combined pill, a doctor can prescribe a progestogen tablet, such as one called norethisterone. You need to start it at least 3 days before your period is due. It can be taken for up to about 3 to 4 weeks if needed. Your period usually starts within about 3 days of stopping. These tablets do not work as contraception, so use another method, such as condoms, if you need to avoid pregnancy. In some places it is only prescribed for medical reasons, so ask what is available where you live.",
        },
        {
          heading: "Safety and what to expect",
          body: "These medicines are not suitable for everyone. A doctor or nurse will ask about your health, including any past blood clots, migraines or high blood pressure, because these can rule out some options. Norethisterone can raise the risk of blood clots, so a doctor will check your medical history before prescribing it. With some types of pill you can skip breaks for as long as you like, but breakthrough bleeding or spotting becomes more likely the longer you go. The patch can cause skin reactions. How well delaying works varies from person to person, and so does how soon bleeding starts after you stop.",
        },
        {
          heading: "Plan ahead",
          body: "Delaying a period works best with planning. Talk to a doctor, nurse or pharmacist a few weeks before the date you have in mind, especially if you would need to start a new method. Progestogen tablets must be started a few days before your period is due, so it helps to know roughly when that will be. Ciclo's period predictions can give you an idea, but they are estimates. If you already take the pill, check your pack so you know when your break would fall.",
        },
      ],
      notice: "This is general information. Talk to a doctor, nurse or pharmacist before using any medicine or contraception to delay a period.",
    },
  },
  {
    slug: "period-myths",
    category: "periods",
    reviewedAt: "2026-10-04",
    sources: [
      { label: "NHS — Periods", href: "https://www.nhs.uk/conditions/periods/" },
      { label: "KidsHealth — All about periods", href: "https://kidshealth.org/en/teens/menstruation.html" },
      { label: "KidsHealth — Could I get pregnant if I have sex during my period?", href: "https://kidshealth.org/en/teens/sex-during-period.html" },
      { label: "KidsHealth — Can I use a tampon if I'm a virgin?", href: "https://kidshealth.org/en/teens/use-tampon.html" },
    ],
    related: ["period-basics", "period-products", "sex-during-period"],
    en: {
      title: "Period myths and facts",
      summary: "Many things people hear about periods are not true. Here are some common myths about cycles, blood, pregnancy, tampons and exercise, and what health sources say.",
      sections: [
        {
          heading: "Myth: every cycle is 28 days",
          body: "Fact: 28 days is only an average. Many people have a period about every 28 days, but it is common to have them more or less often. Most adult cycles last somewhere between about 21 and 38 days. It is also normal for the length to change a little from one month to the next.",
        },
        {
          heading: "Myth: you lose a lot of blood",
          body: "Fact: period blood can seem like a lot, but the total over a whole period is usually only a few tablespoons. A typical amount is about 20 to 90 ml, roughly 1 to 5 tablespoons. Some people do bleed more heavily than this. If your periods feel very heavy or get in the way of your life, it is worth talking to a doctor or nurse.",
        },
        {
          heading: "Myth: you cannot get pregnant on your period",
          body: "Fact: pregnancy is possible from sex at any point in your cycle, including during a period. Sperm can survive inside the body for up to 7 days after sex. An ovary usually releases an egg (ovulation) around 2 weeks before the next period, but the timing can vary, and sometimes it comes soon after a period ends. Some people also have light bleeding around ovulation and mistake it for a period. If you do not want to get pregnant, use contraception every time. Only condoms also protect against STIs, and some STIs can spread more easily during a period.",
        },
        {
          heading: "Myth: a tampon can get lost",
          body: "Fact: a tampon cannot get lost inside you. The top of the vagina ends at the cervix (the neck of the womb), and the tiny opening in the cervix is far too small for a tampon to get through. The tampon stays in the vagina until you take it out. It can be forgotten, though. If you cannot find or reach it, or you notice an unpleasant discharge, see a doctor or nurse soon.",
        },
        {
          heading: "Myth: tampons affect virginity",
          body: "Fact: using a tampon does not affect virginity. A tampon can sometimes stretch the thin tissue at the opening of the vagina (hymen), but that is not the same as having sex. Anyone who has periods can use tampons, and a slim size can be easier at first.",
        },
        {
          heading: "Myth: you should not swim or do sport",
          body: "Fact: having your period does not mean you need to sit things out. You can keep exercising, playing sport and doing the things you enjoy. For swimming and sport, many people find tampons more convenient than pads. You can choose what feels right for your body on each day of your period.",
        },
      ],
      notice: "This is general information. If you have a question about your own periods, a doctor or nurse can help.",
    },
  },
];
